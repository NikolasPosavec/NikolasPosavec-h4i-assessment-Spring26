import { AirQualityData, LatestMeasurementResponse, LocationSearchResponse } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "/api";


// Main function that searches by coordinates
export const fetchAirQualityByCoordinates = async (lat: number, lng: number): 
Promise<AirQualityData> => {
    // Step 1: Search for nearby PM2.5 monitors using bounding box
    const locationsResponse = await fetch (
        `${BASE_URL}/locations?limit=15&coordinates=${lat},${lng}&radius=25000&parameter=pm25`,
        { headers: {Authorization: `Bearer ${API_KEY}`}}
    );

    const locationsResponseData: LocationSearchResponse = await locationsResponse.json();

    if(!locationsResponseData.results || locationsResponseData.results.length === 0) {
        throw new Error("No locations found!")
    }
    // Step 2: Find the most recently active location
    const updatedPastWeek = new Date();
    updatedPastWeek.setDate(updatedPastWeek.getDate() - 7);

    const activeLocation = locationsResponseData.results.find((location) => {
        const mostRecentlyUpdated = new Date(location.datetimeLast.utc);
        return mostRecentlyUpdated >= updatedPastWeek;
    });

    if(!activeLocation) {
        throw new Error("No active stations found!")
    }
    // find PM2.5 sensor
    const pm25Sensor = activeLocation.sensors.find((sensor =>
        sensor.parameter.name.toLowerCase() == "pm25"
    ));

    if(!pm25Sensor) {
        throw new Error("No sensor found!")
    }

    // Step 3: Get latest measurements
    const measurementsResponse = await fetch(
        `${BASE_URL}/measurements?sensor_id=${pm25Sensor.id}&limit=1&sort=desc`,
        { headers: {Authorization: `Bearer ${API_KEY}`}}
    );

    const measurementsResponseData = await measurementsResponse.json();

    if(!measurementsResponseData.results || measurementsResponseData.results.length === 0) {
        throw new Error("No measurements found!")
    }

    const latestMeasurement = measurementsResponseData.results[0];
    // Match measurement to PM2.5 sensor by sensorsId
    return {
        locationName: activeLocation.name,
        pm25: latestMeasurement.value,
        unit: "μg/m³",
        lastUpdated: latestMeasurement.datetime.utc
    };
};

export const fetchAirQuality = fetchAirQualityByCoordinates;