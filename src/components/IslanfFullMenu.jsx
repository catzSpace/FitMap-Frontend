import "./css/IslandFullMenu.css";
import ThemeButton from "./ThemeButton";
import GradientButtonOnclick from "./GradienButtonOnClick";
import CheckIcon from "../icons/Check";
import UserIcon from "../icons/User";
import { useEffect, useState } from "react";
import GradientButtonSubmit from "./GradienButtonSubmit";
import axios from "axios";
import LogOut from "./LogOut";

function IslandFullMenu({ onClose, eventos, onjoin, onCancel, owner, logUser }) {
  const rol = localStorage.getItem("rol");
  let verify = (rol == 2) ? true : false
  const [eventoActivo, setEventoActivo] = useState(null);
  const [eventSelected, setEventSelected] = useState(null);
  const [isVerify, setIsVerify] = useState(verify);
  const [misEventos, setMisEventos] = useState([]);
  const [participantes, setParticipantes] = useState({});

  const toggleEvento = (id) => {
    setEventoActivo(eventoActivo === id ? null : id);
    setEventSelected(eventos.find(event => event.id === id));
  };

  const api_base_url = import.meta.env.VITE_API_URL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type !== "application/pdf") {
      alert("Solo se permiten archivos PDF");
      e.target.value = "";
    }
  };

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${api_base_url}/api/events/user/${logUser.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMisEventos(response.data);
      } catch (err) {
        console.error("Error cargando mis eventos:", err);
      }
    };

    fetchMyEvents();
  }, []);

  const cargarParticipantes = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${api_base_url}/api/events/${eventId}/participantes`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setParticipantes(prev => ({
        ...prev,
        [eventId]: response.data
      }));
    } catch (err) {
      console.error("Error cargando participantes:", err);
    }
  };




  return (
      <div className="full-menu slide-up">
      <div className="menu-header">
        <ThemeButton claro="☀️" oscuro="🌑"/>
        <button className="close-btn" onClick={onClose}> ✕</button>
      </div>

      <div className="menu-body">

        <div className="events-section">
          <h2>Eventos disponibles</h2>
          <ul className="event-list">
            {eventos.map((event) => (
              <li
                key={event.id}
                onClick={() => toggleEvento(event.id)}
                className={`event-item ${eventoActivo === event.id ? "activo" : ""}`}
              >
                <div className="event-header">
                  <strong>{event.nombre}</strong> - {event.fecha}
                </div>

                {eventoActivo === event.id && (
                  <div className="event-details">
                    <p className="event-sport">{event.deporte}</p>

                    <div className="organizer-info">
                      <CheckIcon className="verified-icon"/>
                      <span className="organizer-name"><strong>Organizador:</strong> {event.nombre_organizador || "Usuario verificado"}</span>
                    </div>

                    <p><strong>Descripción:</strong> {event.descripcion}</p>
                    <p><strong>Cupos:</strong> {(event.cupos_restantes == -1) ? 'ilimitado' : event.cupos_restantes}</p>
                    <p><strong>Requisitos:</strong> {event.requisitos}</p>
                    <p><strong>Costos:</strong> {event.costos}</p>
                    <p><strong>Fecha:</strong> {event.fecha}</p>
                    <p><strong>Hora:</strong> {event.hora}</p>
                    <p><strong>Dirección:</strong> {event.direccion}</p>
                    <br />

                    {owner !== event.id_organizador && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {event.estas_inscrito ? (
                          <GradientButtonOnclick
                            nombre="Cancelar inscripción"
                            func={() => onCancel(event.id)}
                          />
                        ) : (event.cupos_restantes > 0 || event.cupos_restantes === -1) ? (
                          <GradientButtonOnclick
                            nombre="Unirme al evento"
                            func={() => onjoin(event.id)}
                          />
                        ) : (
                          <p style={{ 
                            color: "#9a9a9a", 
                            fontSize: "14px", 
                            marginTop: "10px",
                            textAlign: "center" 
                          }}>
                            Sin cupos
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="user-section">
          <h2>Perfil del usuario</h2>
          <div className="user-card">
            <UserIcon />
            <br />
            <h3>{logUser.nombres}</h3>
            <p><strong>Correo:</strong> {logUser.email}</p>
            {!isVerify ? <CheckIcon className="verified-icon"/> : null}
          </div>

          <div className="my-events-section">
            <br />
            <h2>Mis eventos</h2>
            <br />
            <ul className="event-list">

              {misEventos.map(event => (
                <li
                  key={event.id}
                  onClick={() => {
                    toggleEvento(event.id);
                    cargarParticipantes(event.id);
                  }}
                  className={`event-item ${eventoActivo === event.id ? "activo" : ""}`}
                >
                  <div className="event-header">
                    <strong>{event.nombre}</strong> - {event.fecha}
                  </div>

                  {eventoActivo === event.id && (
                    <div className="event-details">
                      <p><strong>Descripción:</strong> {event.descripcion}</p>
                      <p><strong>Lugar:</strong> {event.ubicacion.direccion}</p>

                      <h4>Participantes</h4>
                      <br />
                      <ul>
                        {(participantes[event.id] || []).map(p => (
                          <li key={p.id}>
                            {p.nombres} — {p.email}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}

            </ul>
          </div>



          {isVerify ? 
          <div
            className="verify-section"
            style={{
              marginTop: "2em",
              padding: "2em",
              borderRadius: "0.5em",
              boxShadow: "0px 2px 8px rgba(114, 34, 34, 0.1)",
              display: isVerify ? 'block' : 'none',
            }}
          >
            <h3 style={{ fontSize: "1.5em", marginBottom: "6px" }}>Solicitar Verificación</h3>
            <p>si deseas empezar a crear eventos por favor verifica tu cuenta</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fileInput = e.target.elements.document;
                const file = fileInput.files[0];

                if (!file) {
                  alert("Por favor selecciona un archivo 📎");
                  return;
                }

                const formData = new FormData();
                formData.append("document", file);
                formData.append("user", logUser.nombres)

                try {
                  const token = localStorage.getItem("token");
                  const response = await axios.post(
                    `${api_base_url}/api/upload`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                        'ngrok-skip-browser-warning': '69420'
                      },
                    }
                  );
                  alert("Archivo enviado correctamente ✅");
                  fileInput.value = "";
                } catch (error) {
                  console.error("Error al subir:", error);
                  alert("❌ Error al subir el archivo.");
                }
              }}
            >
              <input
                type="file"
                name="document"
                accept=".pdf"
                style={{
                  fontSize: "12px",
                  marginBottom: "6px",
                  width: "100%",
                }}
                onChange={handleFileChange}
              />
              <GradientButtonSubmit nombre="Solicitar Verificacion"/>
            </form>
          </div>
          : null}
          <div className="cont-logout-btn">
              <LogOut/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IslandFullMenu;