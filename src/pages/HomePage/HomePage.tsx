import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './HomePage.module.css';
import { searchCities } from '../../api/geocoding';
import { GeocodingResult } from '../../types';

function HomePage () {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [cityResults, setCityResults] = useState<GeocodingResult[]>([]);

    useEffect(() => {
        //check if bar is empty
        if(searchTerm.trim() === "") {
            setCityResults([]);
            setIsSearching(false);
            return;
        }
        //if not empty then search
        const fetchCities = async () => {
            setIsSearching(true);

            try {
                const results = await searchCities(searchTerm);

                setCityResults(results);
            } catch (error) {
                console.error("Couldn't fetch results:", error);
            } finally {
                //get rid of the loading placeholder
                setIsSearching(false);
            }
        };

        fetchCities();
    }, [searchTerm]) //this makes it so when the term changes it runs

    return (
        <div className = {styles.pageBackground}>
            <div className = {styles.container}>
                <h1 className = {styles.title}>
                {"\u{1F30F}"} Air Quality Tracker
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
