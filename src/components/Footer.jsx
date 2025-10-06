import React from "react";
import "./css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">FitMap</h2>

        <p className="footer-copy">
          © {new Date().getFullYear()} FitMap. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}