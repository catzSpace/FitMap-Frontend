import React from "react";
import "./css/GradientButton.css";

const GradientButtonSubmit = ({ nombre }) => {

  return (
    <button className="gradient-btn" type="submit">
      {nombre}
    </button>
  );
};

export default GradientButtonSubmit;