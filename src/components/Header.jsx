import React, { useEffect, useState } from "react";
import "./css/Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Cierra el menú al cambiar tamaño o navegar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        {/* Botón menú hamburguesa (solo en móviles) */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <img src="/public/logo.png" className="logoImg" alt="" />

        <div className="desktop-items">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌑"}
          </button>
          <a href="/mapa" className="login-link">Iniciar Sesión</a>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="/mapa" onClick={() => setMenuOpen(false)}>Iniciar Sesión</a>
          <button
            className="theme-toggle"
            onClick={() => {
              setDarkMode(!darkMode);
              setMenuOpen(false);
            }}
          >
            {darkMode ? "☀️ Claro" : "🌑 Oscuro"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;