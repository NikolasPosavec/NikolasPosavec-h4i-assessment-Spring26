/*tests that the info card is displaying
the air quality status correctly and is handling
null values well */

import { render, screen } from "@testing-library/react";
import CityInfoCard from "./CityInfoCard";
import { AirQualityData } from "../../types";

const testData: AirQualityData = {
    locationName: "FakeMonitor",
    pm25: 12,
    unit: "µg/m³",
    lastUpdated: "2026-01-11T12:00:00Z"
};

test("shows good status for corresponding good pm2.5 vals", () => {
    render(
        <CityInfoCard
            cityName = "Fake City"
            airQualityData = {{ ...testData, pm25: 12}}
        />
    );

    expect(screen.getByText("Good")).toBeInTheDocument();
});

test("shows n/a when null pm2.5 val", () => {
    render(
        <CityInfoCard
            cityName = "Test City"
            airQualityData = {{ ...testData, pm25: null}}
        />
    );

    expect(screen.getByText("N/A")).toBeInTheDocument();
});