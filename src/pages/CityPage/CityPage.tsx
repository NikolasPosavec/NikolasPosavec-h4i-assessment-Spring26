import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAirQualityByCoordinates } from "../../api/openaqi";
import { AirQualityData, City } from "../../types";
import styles from './CityPage.module.css';
import CityInfoCard from "../../components/CityInfoCard/CityInfoCard";

function CityPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const city = location.state?.city as City; //passed w/ router state
    const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        //if state is missing just redirect so it doesnt give back a broken page
        if(!city) {
            navigate('/');
            return;
        }

        const processSearchForAirQuality = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await fetchAirQualityByCoordinates(city.lat, city.lng);
                setAirQualityData(data);
            } catch (error) {
                console.error("Couldn't get results:", error);
                setError("Couldn't load data.");
            } finally {
                setIsLoading(false);
            }
        };
        processSearchForAirQuality();
    }, [city, navigate]);

    return (
        <div className = {styles.background}>
            <div className = {styles.header}>
                <button
                    className = {styles.backButton}
                    onClick = {() => navigate('/')}
                >
                    {"\u{2190}"} Back to Search
                </button>
            
                <h1 className = {styles.title}>
                    {"\u{1F30F}"} Air Quality Tracker
                </h1>
            </div>
            {isLoading && <p>Loading air quality data...</p>}

            {error && <p>{error}</p>}

            {!isLoading && airQualityData && (
                <CityInfoCard
                    cityName = {city.name}
                    airQualityData = {airQualityData}
                />
            )}
        </div>
    );
}

export default CityPage;