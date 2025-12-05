import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/GradientButton.css";

const GradientButton = ({ ruta, nombre }) => {
  const navigate = useNavigate();

  return (
    <button className="gradient-btn" onClick={() => navigate(ruta)}>
      {nombre}
    </button>
  );
};

export default GradientButton;