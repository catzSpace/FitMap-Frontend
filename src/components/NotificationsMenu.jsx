import React, { useEffect, useState } from "react";
import ThemeButton from "./ThemeButton";
import axios from "axios";
import "./css/IslandFullMenu.css";

function NotificationsMenu({ onClose, logUser }) {
  const [notificaciones, setNotificaciones] = useState([]);
  const api_base_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  
  const fetchNotifications = async () => {

    try {
      const response = await axios.get(`${api_base_url}/api/users/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotificaciones(response.data);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="full-menu slide-up">
      <div className="menu-header">
        <ThemeButton claro="☀️" oscuro="🌑" />
        <button className="close-btn" onClick={onClose}> ✕</button>
      </div>

      <div className="menu-body">
        <div className="events-section">
          <h2>Notificaciones</h2>
          <ul className="event-list">
            {notificaciones.length === 0 ? (
              <li>No tienes notificaciones</li>
            ) : (
              notificaciones.map((noti) => (
                <li
                  key={noti.id}
                  className={`event-item`}
                >
                  <div className="event-header">
                    <strong>{noti.mensaje}</strong>
                  </div>

                  <p><strong>Enviado por:</strong> {noti.id_user_register ? noti.id_user_register : "admin"}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotificationsMenu;