import React from "react";
import "./css/FeaturesGrid.css";
import { FaMapMarkedAlt, FaUsers, FaRunning, FaShareAlt, FaTrophy, FaCalendarAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaMapMarkedAlt />,
    title: "Mapa Interactivo",
    description: "Explora fácilmente eventos deportivos cercanos y visualiza rutas y puntos de encuentro en tiempo real."
  },
  {
    icon: <FaUsers />,
    title: "Conexión con Atletas",
    description: "Conecta con deportistas locales y forma parte de comunidades activas en tu zona."
  },
  {
    icon: <FaRunning />,
    title: "Organiza Tus Propios Eventos",
    description: "Crea, publica y gestiona competencias o entrenamientos directamente desde el mapa."
  },
  {
    icon: <FaShareAlt />,
    title: "Compartir con Amigos",
    description: "Difunde eventos en redes sociales y motiva a otros a unirse fácilmente."
  },
  {
    icon: <FaTrophy />,
    title: "Gamificación",
    description: "Gana insignias por tu participación y esfuerzo en eventos deportivos."
  },
  {
    icon: <FaCalendarAlt />,
    title: "Agenda Inteligente",
    description: "Recibe recordatorios automáticos y sincroniza tus eventos deportivos con tu calendario."
  },
];

export default function FeaturesGrid() {
  return (
    <section className="features-section">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}