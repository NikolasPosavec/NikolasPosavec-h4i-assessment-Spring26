import { AirQualityData, LatestMeasurementResponse, LocationSearchResponse } from "../types";
  
  const API_KEY = import.meta.env.VITE_API_KEY; /*in a real project i wouldnt push
  the .env file for security reasons but for this assessment it as been pushed as I was told to do */
  const BASE_URL = "/api";
  const PM25_PARAMETER_ID = 2;
  
  // Main function that searches by coordinates
  export const fetchAirQualityByCoordinates = async (lat: number, lng: number): 
  Promise<AirQualityData> => {
    // Step 1: Search for nearby PM2.5 monitors using bounding box
    const change = 0.25;
  
    const minLat = lat - change;
    const maxLat = lat + change;
    const minLng = lng - change;
    const maxLng = lng + change;
  
    const locationsResults = await fetch(
      `${BASE_URL}/locations?bbox=${minLng},${minLat},${maxLng},${maxLat}&parameters_id=${PM25_PARAMETER_ID}&limit=100`,
      { headers: { "X-API-Key": API_KEY } }
    );
  
    const locationsData: LocationSearchResponse = await locationsResults.json();
  
    if (!locationsData.results.length) {
      throw new Error("No monitoring locations found!");
    }
  
    // Step 2: Find the most recently active location
    const recentActiveLocation = locationsData.results.filter(
      loc => loc.datetimeLast !== null
    );
  
    if (!recentActiveLocation.length) {
      throw new Error("No locations with most recent data were found!");
    }
  
    const mostRecentLocation = recentActiveLocation.reduce((a, b) =>
      new Date(b.datetimeLast.utc) > new Date(a.datetimeLast.utc) ? b : a
    );
  
    // Find PM2.5 sensor
    const pmSensor = mostRecentLocation.sensors.find(
      s => s.parameter.id === PM25_PARAMETER_ID
    );
  
    if (!pmSensor) {
      throw new Error("PM2.5 sensor not found");
    }
  
    // Step 3: Get latest measurements
    const latestResults = await fetch(
      `${BASE_URL}/locations/${mostRecentLocation.id}/latest?limit=100`,
      {
        headers: {
          "X-API-Key": API_KEY
        }
      }
    );
  
    const latestData: LatestMeasurementResponse = await latestResults.json();
  
    if (!latestData.results.length) {
      throw new Error("No measurements found");
    }
  
    // Match measurement to PM2.5 sensor by sensorsId
    const pm25Measurement = latestData.results.find(
      m => m.sensorsId === pmSensor.id
    );
  
    if (!pm25Measurement) {
      throw new Error("PM2.5 measurement not found");
    }
  
    return {
      locationName: mostRecentLocation.name,
      pm25: pm25Measurement.value,
      unit: pmSensor.parameter.units,
      lastUpdated: pm25Measurement.datetime.utc
    };
  };
  
  export const fetchAirQuality = fetchAirQualityByCoordinates;
  