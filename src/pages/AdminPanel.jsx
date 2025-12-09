import { useEffect, useState } from "react";
import "./css/AdminPanel.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { X, MoreHorizontal } from "lucide-react";
import LogOut from "../components/LogOut";
import axios from "axios";
import GradientButtonOnclick from "../components/GradienButtonOnClick";

const AdminPanel = () => {
  const [openId, setOpenId] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const api_base_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");


  const handleClick = (filename) => {
    filename = filename.replace("uploads/", "")

    window.open(`${api_base_url}/api/users/pdf/${filename}`, "_blank");
  };

  const rejectSolicitude = async (userId, solicitudId) => {
    try {
      const response = await axios.post(
        `${api_base_url}/api/users/verify/reject`,
        {
          user: { id: userId },
          solicitudId: solicitudId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420'
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error al aceptar la solicitud.");
    }
  }
  const acceptSolicitude = async (userId, solicitudId) => {
    try {
      const response = await axios.post(
        `${api_base_url}/api/users/verify`,
        {
          user: { id: userId },
          solicitudId: solicitudId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420'
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error al aceptar la solicitud.");
    }
  };


  useEffect(() => {
    const fetchSolicitudes = async () => {
    try {
        const response = await fetch(`${api_base_url}/api/users/verification`);
        if (response.ok) {
          const data = await response.json();
          setSolicitudes(data);
        } else {
          console.error('Error al obtener solicitudes');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const toggleActions = (id) => {
    setOpenId(openId === id ? null : id);
  };
  

  return (
    <>
      <Header />
      <main className="items-section">
        <div className="post-header">
          <h2>Panel de Administración</h2>
          <LogOut />
        </div>

        <section className="verification-section">
          <h3>Solicitudes de Verificación</h3>
          <div>
            {solicitudes.length === 0 ? (
              <p>No hay solicitudes de verificacion actualmente</p>
            ) : (
              solicitudes.map((req) => (
              <div key={req.id} className="request-item">
                <div className="target-close">
                  <div className="request-info">
                    <p className="username">{req.user_name}</p>
                    <p className="date">Fecha: {req.fecha}</p>
                  </div>

                  <button
                    className="mobile-more-btn"
                    onClick={() => toggleActions(req.id)}
                  >
                    <MoreHorizontal size={22} />
                  </button>
                </div>

                <div
                  className={`request-actions ${openId === req.id ? "open" : ""}`}
                >
                  <button className="view-pdf-btn" onClick={() => handleClick(req.ruta_pdf)}>Ver PDF</button>
                  <GradientButtonOnclick nombre="Aceptar" func={() => acceptSolicitude(req.id_user, req.id)}></GradientButtonOnclick>
                  <button className="reject-btn" onClick={() => rejectSolicitude(req.id_user, req.id)}>
                    <X />
                  </button>
                </div>
              </div>
            ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AdminPanel;