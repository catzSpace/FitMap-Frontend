import { useEffect, useState } from 'react';
import './css/SearchMenu.css'
import axios from "axios";

function SearchMenu(){
    const token = localStorage.getItem("token");
    const api_base_url = import.meta.env.VITE_API_URL;

    const [deportes, setDeportes] = useState([]);
    const [deporteActual, setDeporteActual] = useState("");

    const handleChange = (e) => {
        setDeporteActual(e.target.value);
        localStorage.setItem("selectedSport", e.target.value);
        window.dispatchEvent(new Event("sportFilterChanged"));
    };

    const getSport = async () => {
        try {
            const response = await axios.get(
                `${api_base_url}/api/events/sports`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'ngrok-skip-browser-warning': '69420'
                    },
                }
            );
            setDeportes(response.data[0]);
        } catch (error) {
            console.error("Error al obtener los deportes:", error);
            return null;
        }
    };

    useEffect(() => {
        getSport();
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("selectedSport");
        if (saved) {
            setDeporteActual(saved);
        }
    }, []);

    return(
        <header className="island-search">
            <div className="search-container">
                <select value={deporteActual} name="search-sport" id="select-sport" onChange={handleChange}>
                    <option value="" disabled>Search</option>

                    <option value="all">todos</option>
                    {deportes.map((m, i) => (
                        <option key={i} value={"_" + m.nombre}>
                            {m.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
}

export default SearchMenu;