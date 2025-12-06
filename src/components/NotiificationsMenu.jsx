import ThemeButton from "./ThemeButton";

function NotificationsMenu({ onClose }){

    

    return (
        <div className="full-menu slide-up">
      <div className="menu-header">
        <ThemeButton claro="☀️" oscuro="🌑"/>
        <button className="close-btn" onClick={onClose}> ✕</button>
      </div>

      <div className="menu-body">

        <div className="events-section">
          <h2>Notificaciones</h2>
          {/* <ul className="event-list">
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
                        <GradientButtonOnclick
                          nombre="Unirme al evento"
                          func={() => onjoin(event.id)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
    )
}

export default NotificationsMenu;