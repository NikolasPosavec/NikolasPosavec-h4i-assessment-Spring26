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

    //this is here for the last updated date part of the infocard
    const lastUpdatedDate = (dateValue : string) => {
        const date = new Date(dateValue);
        return date.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    return (
        <div className = {styles.infoCard}>
            <div className = {styles.topOfCard}>
                <h2>{cityName}</h2>
                <span className = {`${styles.status} ${statusColor}`}>
                    {status}
                </span>
            </div>
            
            <div className={styles.pmVal}>
                {pm25 !== null ? Number(pm25.toFixed(3)).toString() : "N/A"}
                <span className={styles.pmUnits}> μg/m³</span>
            </div>


            <div className = {styles.pmValLabel}> PM2.5</div>

            <div className = {styles.meta}>
                <div>
                    <div className = {styles.metaLabel}> MONITOR LOCATION</div>
                    <div className = {styles.metaVal}> {airQualityData.locationName}</div>
                </div>
            </div>
            
            <div className = {styles.meta}>
                <div>
                    <div className = {styles.metaLabel}> LAST UPDATED</div>
                    <div className = {styles.metaVal}> {lastUpdatedDate(airQualityData.lastUpdated)}</div>
                </div>
            </div>
        </div>
    )
}

export default CityInfoCard;