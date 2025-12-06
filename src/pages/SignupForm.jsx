import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import necesario
import "./css/SignupForm.css";
import Header from "../components/Header";
import GradientButtonSubmit from "../components/GradienButtonSubmit";

function SignupForm() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const navigate = useNavigate();
  const api_base_url = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !nombres || !apellidos || !cedula || !fechaNacimiento) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const datos = {
      nombres,
      apellidos,
      cedula,
      email,
      password,
      fechaNacimiento,
    };

    try {
      const response = await axios.post(`${api_base_url}/api/users/create`, datos);
      const data = response.data;
      console.log("Respuesta del servidor:", data);

      alert("Registro exitoso");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userId));
        localStorage.setItem("rol", JSON.stringify(data.rol));
      }

      navigate("/mapa");
    } catch (error) {
      console.error("Error en el registro:", error);

      if (error.response) {
        alert(error.response.data.message || "Error al registrar el usuario");
      } else {
        alert("No se pudo conectar con el servidor");
      }
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} autoComplete="off" className="signup-form">
        <div className="signup-form__group">
          <p className="signup-form__title">Signup</p>

          <div className="signup-form__nombre">
            <label className="label">
              <input
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                required
              />
              <span>Nombres</span>
            </label>

            <label className="label">
              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                required
              />
              <span>Apellidos</span>
            </label>
          </div>

          <label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
            <span>Cédula</span>
          </label>

          <label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
            />
          </label>

          <label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span>Email</span>
          </label>

          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Contraseña</span>
          </label>

          <label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span>Confirmar Contraseña</span>
          </label>

          <br />
          <GradientButtonSubmit nombre="Regístrate" />

          <p className="signup-form__signin">
            ¿Ya tienes una cuenta?
            <a href="/login"> Inicia sesión</a>
          </p>
        </div>
      </form>
    </>
  );
}

export default SignupForm;