import React from "react";
import "./css/IslandFullMenu.css";
import ThemeButton from "./ThemeButton";

function IslandFullMenu({ onClose, eventos }) {
  return (
      <div className="full-menu slide-up">
      <div className="menu-header">
        <ThemeButton claro="☀️" oscuro="🌑"/>
        <button className="close-btn" onClick={onClose}> ✕</button>
      </div>

      <div className="menu-body">

        <div className="events-section">
          <h2>Eventos disponibles</h2>
          <ul className="event-list">
            {
              eventos.map((event) => (
              <li key={event.id}>
                {event.nombre} - {event.fecha}
              </li>
            ))}
          </ul>
        </div>

        <div className="user-section">
          <h2>Perfil del usuario</h2>
          <div className="user-card">
            <img
              src="/icons/user.png"
              alt="Usuario"
              className="user-avatar"
            />
            <h3>Juan Pérez</h3>
            <p>Deportista amateur</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IslandFullMenu;