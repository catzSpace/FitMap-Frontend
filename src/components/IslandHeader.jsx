import React, { useState, useEffect } from "react";
import "./css/IslandHeader.css";
import IslandFullMenu from "./IslanfFullMenu";
import ThemeButton from "./ThemeButton";
import Not from "../icons/Not";
import NotActive from "../icons/NotActive";
import { Search } from "lucide-react";
import SearchMenu from "./SearchMenu";
import Close from "../icons/Close";
import axios from "axios";
import NotificationsMenu from "./NotificationsMenu";

function IslandHeader({ eventos, handleJoinEvent, handleCancelEvent, owner, logUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notMenuOpen, setNotMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const api_base_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // Función para obtener las notificaciones no leídas
  const fetchUnreadNotifications = async () => {

    try {
      const response = await axios.get(`${api_base_url}/api/users/notifications/unread`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUnreadNotifications(response.data.count);
    } catch (error) {
      console.error("Error al obtener notificaciones no leídas:", error);
    }
  };

  // Cargar las notificaciones no leídas cuando el componente se monta
  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  return (
    <>
      <header className="island-header">
        <div className="island-container">
          {unreadNotifications  <= 0 ? (
            <button
              className="island-btn center-btn"
              onClick={() => setNotMenuOpen(!notMenuOpen)}
            >
              <Not />
            </button>
          ) : (
            <button
              className="island-btn center-btn"
              onClick={() => setNotMenuOpen(!notMenuOpen)}
            >
              <NotActive />
            </button>
          )}

          {searchMenuOpen ? (
            <button
              className="island-btn center-btn"
              onClick={() => setSearchMenuOpen(!searchMenuOpen)}
            >
              <Close />
            </button>
          ) : (
            <button
              className="island-btn center-btn"
              onClick={() => setSearchMenuOpen(!searchMenuOpen)}
            >
              <Search />
            </button>
          )}

          <ThemeButton claro="☀️" oscuro="🌑" />

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

      {menuOpen && (
        <IslandFullMenu
          onClose={() => setMenuOpen(false)}
          eventos={eventos}
          onjoin={handleJoinEvent}
          onCancel={handleCancelEvent}
          owner={owner}
          logUser={logUser}
        />
      )}

      {notMenuOpen && (
        <NotificationsMenu
          onClose={() => setNotMenuOpen(false)}
          logUser={logUser}
        />
      )}

      {searchMenuOpen && <SearchMenu />}
    </>
  );
}

export default IslandHeader;