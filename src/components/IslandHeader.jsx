import React, { useState } from "react";
import "./css/IslandHeader.css";
import IslandFullMenu from "./IslanfFullMenu";
import ThemeButton from "./ThemeButton";

function IslandHeader({eventos}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
        <header className="island-header">
        <div className="island-container">
            <ThemeButton claro="☀️" oscuro="🌑"/>

            <div className="island-center">
            <button
                className="island-btn center-btn"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            </div>
        </div>
        </header>

        {menuOpen && <IslandFullMenu onClose={() => setMenuOpen(false)} eventos={eventos} /> }
    </>
  );
}

export default IslandHeader;