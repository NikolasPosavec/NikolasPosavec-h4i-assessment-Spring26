import styles from './SearchBar.module.css';

interface SearchBarProps {
    value : string;
    onChange : (newValue : string) => void;
}

/* as previously mentioned in HomePage, this only handles UI.
   SearchBar doesnt actually store state or fetch, makes it reusable also*/
const SearchBar = ({value, onChange} : SearchBarProps) => {
    return (
        <div className = {styles.searchBar}>
            <input
                type = "text"
                placeholder="Search for a city (e.g. Tokyo, Paris, New York)..."
                value = {value}
                onChange = {(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;