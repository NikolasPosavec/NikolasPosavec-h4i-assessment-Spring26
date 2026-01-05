import { BrowserRouter, Routes, Route } from "react-router-dom";
import CityPage from "./pages/CityPage/CityPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<HomePage />} />
                <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;