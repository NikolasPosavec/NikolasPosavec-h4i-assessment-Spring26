import { useState } from 'react';
import SearchBar from "../components/SearchBar";
import styles from './HomePage.module.css';

function HomePage () {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className = {styles.pageBackground}>
            <div className = {styles.container}>
                <h1 className = {styles.title}>
                    Air Quality Tracker
                </h1>
                <p className = {styles.subtitle}>
                    Search for any city to see PM2.5 air quality data
                </p>

                {/*SearchBar is not actually processing anything,
                thats why all that I passed is the current value 
                and a way to update it */}
                <SearchBar
                    value = {searchTerm}
                    onChange = {setSearchTerm}
                />
                
                <div className = {styles.searchExplanationCard}>
                    <h3>Search for a city to get started</h3>
                    <p>Enter a city name above to see its air quality data</p>
                </div>
            </div>
        </div>
    );
}
export default HomePage;
