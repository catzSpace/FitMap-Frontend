import "./css/EventDetailsPopup.css";
import GradientButtonOnclick from "./GradienButtonOnClick";
import CheckIcon from "../icons/Check";


const EventDetailPopup = ({ evento, onClose, onJoin, isOwner }) => {
  if (!evento) return null;

  return (
    <div className="event-popup-overlay" onClick={onClose}>
      <div className="event-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2>{evento.nombre}</h2>
        <p className="event-sport">{evento.deporte}</p>

        <div className="organizer-info">
          <CheckIcon className="verified-icon"/>
          <span className="organizer-name"><strong>Organizador:</strong> {evento.nombre_organizador || "Usuario verificado"}</span>
        </div>

        <p><strong>Descripción:</strong> {evento.descripcion}</p>
        <p><strong>Fecha:</strong> {evento.fecha}</p>
        <p><strong>Hora:</strong> {evento.hora}</p>
        <p><strong>Dirección:</strong> {evento.direccion}</p>

        <br />
        {!isOwner && (
          <GradientButtonOnclick nombre="Unirme al evento" func={() => onJoin(evento.id)} />
        )}
      </div>
    </div>
  );
};

export default EventDetailPopup;