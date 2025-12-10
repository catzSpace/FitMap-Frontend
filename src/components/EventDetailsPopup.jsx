import "./css/EventDetailsPopup.css";
import GradientButtonOnclick from "./GradienButtonOnClick";
import CheckIcon from "../icons/Check";

const EventDetailPopup = ({ evento, onClose, onJoin, onCancel, isOwner, isJoined, availableSlots }) => {
  if (!evento) return null;

  const cuposIlimitados = availableSlots === -1;
  const sePuedeUnir = cuposIlimitados || availableSlots > 0;

  return (
    <div className="event-popup-overlay" onClick={onClose}>
      <div className="event-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2>{evento.nombre}</h2>
        <p className="event-sport">{evento.deporte}</p>

        <div className="organizer-info">
          <CheckIcon className="verified-icon" />
          <span className="organizer-name">
            <strong>Organizador:</strong> {evento.nombre_organizador || "Usuario verificado"}
          </span>
        </div>

        <p><strong>Descripción:</strong> {evento.descripcion}</p>
        <p><strong>Cupos:</strong> {(evento.cupos_restantes == -1) ? 'ilimitado' : evento.cupos_restantes}</p>
        <p><strong>Requisitos:</strong> {evento.requisitos}</p>
        <p><strong>Costos:</strong> {evento.costos}</p>
        <p><strong>Fecha:</strong> {evento.fecha}</p>
        <p><strong>Hora:</strong> {evento.hora}</p>
        <p><strong>Dirección:</strong> {evento.direccion}</p>

        <br />

        {/* El organizador nunca puede inscribirse */}
        {!isOwner && (
          <>
            {isJoined ? (
              <GradientButtonOnclick
                nombre="Cancelar inscripción"
                func={() => onCancel(evento.id)}
              />
            ) : sePuedeUnir ? (
              <GradientButtonOnclick
                nombre="Unirme al evento"
                func={() => onJoin(evento.id)}
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
          </>
        )}

      </div>
    </div>
  );
};

export default EventDetailPopup;