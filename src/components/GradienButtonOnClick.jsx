import React from "react";
import "./css/GradientButton.css";

const GradientButtonOnclick = ({ nombre, func }) => {

  return (
    <button className="gradient-btn" onClick={func}>
      {nombre}
    </button>
  );
};

export default GradientButtonOnclick;