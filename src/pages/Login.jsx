import React, { useState } from "react";
import axios from "axios";
import "./css/Login.css";
import Header from "../components/Header";
import GradientButtonSubmit from "../components/GradienButtonSubmit";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const api_base_url = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${api_base_url}/api/users/login`, {
        email,
        password,
      });

      const data = response.data;
      // console.log("Respuesta del servidor:", data);

      alert("Inicio de sesión exitoso");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userId));
        localStorage.setItem("rol", JSON.stringify(data.rol));
      }

      if (data.rol == 1){
        navigate("/admin/panel");
      } else {
        navigate("/mapa");
      }

    } catch (error) {
      console.error("Error en el login:", error);

      if (error.response) {

        alert(error.response.data.message || "Error al iniciar sesión");
      } else {

        alert("No se pudo conectar con el servidor");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <GradientButtonSubmit
            nombre={loading ? "Cargando..." : "Login"}
            disabled={loading}
          />

          <p>aun no tienes una cuenta?<a href="/registro">Registrate!</a></p>
        </form>
      </div>
    </>
  );
}

export default Login;