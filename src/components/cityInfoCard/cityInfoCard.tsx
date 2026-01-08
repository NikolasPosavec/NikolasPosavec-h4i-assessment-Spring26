import { AirQualityData } from "../../types";
import styles from './CityInfoCard.module.css';

interface CityInfoCardProps {
    cityName: string;
    airQualityData: AirQualityData;
}

function CityInfoCard({ cityName, airQualityData}: CityInfoCardProps) {
    const pm25 = airQualityData.pm25;

    let status = "";
    let statusColor = "";

    //vscode kept getting annoyed with me, so had to add condition to check if null
    if(pm25 != null) {
        if(pm25 <= 12) {
            status = "Good";
            statusColor = styles.good;
        } else if(pm25 <= 35) {
            status = "Moderate";
            statusColor = styles.moderate;
        } else if(pm25 <= 55) {
            status = "Unhealthy";
            statusColor = styles.unhealthy;
        } else {
            status = "Very Unhealthy";
            statusColor = styles.veryUnhealthy;
        }
    }

    return (
        <div className = {styles.infoCard}>
            <div className = {styles.topOfCard}>
                <h2>{cityName}</h2>
                <span className = {`${styles.status} ${statusColor}`}>
                    {status}
                </span>
            </div>
            
            <div className = {styles.pmVal}>
                {pm25}
                <span className = {styles.pmUnits}> μg/m³</span>
            </div>

            <div className = {styles.pmValLabel}> PM2.5</div>

            <div className = {styles.meta}>
                <div>
                    <div className = {styles.metaLabel}> Monitor Location</div>
                    <div className = {styles.metaVal}> {airQualityData.locationName}</div>
                </div>
            </div>
        </div>
    )
}

export default CityInfoCard;