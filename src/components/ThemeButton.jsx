import React, { useEffect, useState } from "react";
import './css/ThemeButton.css'

const ThemeButton = ({ claro, oscuro }) => {

    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? claro : oscuro}
        </button>
    )
}

export default ThemeButton