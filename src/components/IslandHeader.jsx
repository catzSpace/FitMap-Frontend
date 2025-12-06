import React, { useState, useEffect } from "react";
import "./css/IslandHeader.css";
import IslandFullMenu from "./IslanfFullMenu";
import ThemeButton from "./ThemeButton";
import Not from "../icons/Not";
import NotActive from "../icons/NotActive";
import NotificationsMenu from "./NotiificationsMenu";
import { Search } from "lucide-react";
import SearchMenu from "./SearchMenu";
import Close from "../icons/Close";

function IslandHeader({eventos, handleJoinEvent, owner, logUser}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notMenuOpen, setNotMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  return (
    <>
        <header className="island-header">
        <div className="island-container">
            {0 ? <button
                className="island-btn center-btn"
                onClick={() => setNotMenuOpen(!notMenuOpen)}
            >
                <NotActive/>
            </button> : 
            <button
                className="island-btn center-btn"
                onClick={() => setNotMenuOpen(!notMenuOpen)}
            >
                <Not/>
            </button>}

            {searchMenuOpen ? 
              <button
                className="island-btn center-btn"
                onClick={() => setSearchMenuOpen(!searchMenuOpen)}
              >
                <Close/>
              </button>   :
              <button
                className="island-btn center-btn"
                onClick={() => setSearchMenuOpen(!searchMenuOpen)}
              >
                  <Search/>
              </button> 
          
            }

            
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

        {menuOpen && <IslandFullMenu onClose={() => setMenuOpen(false)} 
          eventos={eventos} 
          onjoin={handleJoinEvent}
          owner={owner}
          logUser={logUser}
        /> }

        {notMenuOpen && <NotificationsMenu onClose={() => setNotMenuOpen(false)} 
          
        /> }

        {searchMenuOpen && <SearchMenu />}
    </>
  );
}

export default IslandHeader;