import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAirQualityByCoordinates } from "../../api/openaqi";
import { AirQualityData, City } from "../../types";
import styles from './CityPage.module.css';
import CityInfoCard from "../../components/CityInfoCard/CityInfoCard";

function CityPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const city = location.state?.city as City; //passed w router st
    const [airQualityData, setAirQualityData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!city) {
            navigate('/');
            return;
        }

        const processSearchForAirQuality = async () => {
            try {
                setIsLoading(true);

                const data = await fetchAirQualityByCoordinates(
                    city.lat, city.lng
                );
                setAirQualityData(data);
            } catch (error) {
                console.error("Couldn't get results:", error);
            } finally {
                setIsLoading(false);
            }
        };
        processSearchForAirQuality();
    }, [city, navigate]);

    return (
        <div className = {styles.background}>
            <button
                className = {styles.backButton}
                onClick = {() => navigate('/')}
            >
                {"\u{2197}"} Back to Search
            </button>

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