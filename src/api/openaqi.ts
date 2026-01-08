import { AirQualityData, LatestMeasurementResponse, LocationSearchResponse } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "/api";


// Main function that searches by coordinates
export const fetchAirQualityByCoordinates = async (
    lat: number,
    lng: number
): Promise<AirQualityData> => {
    // Step 1: Search for nearby PM2.5 monitors using bounding box
    

    // Step 2: Find the most recently active location
    

    // Find PM2.5 sensor
    

    // Step 3: Get latest measurements
    

    // Match measurement to PM2.5 sensor by sensorsId
    
};

export const fetchAirQuality = fetchAirQualityByCoordinates;