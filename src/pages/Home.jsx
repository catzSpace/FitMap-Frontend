import React from "react";
import GradientButton from "../components/GradientButton";
import "./css/Home.css";
import Header from "../components/Header";
import FeaturesGrid from "../components/FeaturesGrid";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
    <Header />
    <main className="home">
      <div className="home-content">
        <h2>Bienvenido a Fitmap</h2>
        <p>
          Conecta con otras personas con tus mismos intereses deportivos.
          Mide y alcanza tus metas deportivas con ayuda de nuestra comunidad.
        </p>
        <div className="buttons">
          <GradientButton ruta="/registro" nombre="Comenzar Ahora" />
          <GradientButton ruta="/nosotros" nombre="Conócenos" />
        </div>
      </div>
      <FeaturesGrid/>
    </main>
    <Footer/>
    </>
  );
};

export default Home;