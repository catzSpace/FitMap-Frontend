import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Header.css";
import ThemeButton from "./ThemeButton";

const Header = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const homeLink = () =>{
      navigate('/');
  }

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
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <img src="/public/logo.png" className="logoImg" alt="logo" 
          onClick={() => homeLink()}
        />

        <div className="desktop-items">
          <ThemeButton claro="☀️" oscuro="🌑"/>
          <a href="/login" className="login-link">Iniciar Sesión</a>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="/login" onClick={() => setMenuOpen(false)}>Iniciar Sesión</a>
          <ThemeButton claro="☀️ Claro" oscuro="🌑 Oscuro"/>
        </div>
      )}
    </header>
  );
};

export default Header;