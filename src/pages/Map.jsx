import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import IslandHeader from "../components/IslandHeader";
import "./css/EventMenu.css";
import GradientButtonSubmit from "../components/GradienButtonSubmit";
import GradientButtonOnclick from "../components/GradienButtonOnClick";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function AddMarkerEvent({ onAdd }) {
  useMapEvents({
    click(e) {
      onAdd(e.latlng);
    },
  });
  return null;
}

function Map() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [markers, setMarkers] = useState([
    { lat: 4.0853, lng: -76.197, title: "Tuluá" },
  ]);

  const [showMenu, setShowMenu] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    deporte: "",
    fecha: "",
    hora: "",
    direccion: "",
  });

  const handleJoinEvent = async (id_evento) => {
    try {
      const response = await axios.post(
        "http://localhost:5111/api/events/join",
        { id_evento },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Inscripción exitosa ✅");
    } catch (error) {
      console.error("Error al unirse al evento:", error);
      alert(error.response?.data?.message || "Error al unirse al evento");
    }
  };

    useEffect(() => {
      const fetchEvents = async () => {
        if (!token) return;

        try {
          const response = await axios.get("http://localhost:5111/api/events/all", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const events = response.data.map((ev) => {
            const ubicacion = JSON.parse(ev.ubicacion);
            return {
              id: ev.id,
              lat: ubicacion.lat,
              lng: ubicacion.lng,
              nombre: ev.nombre,
              descripcion: ev.descripcion,
              deporte: ev.deporte,
              fecha: ev.fecha,
              hora: ev.hora,
              direccion: ubicacion.direccion,
              id_organizador: ev.id_organizador,
            };
          });

          setMarkers(events);
          setEventos(events);


        } catch (error) {
          console.error("Error al obtener eventos:", error);
        }
      };

      fetchEvents();
    }, []);


  const handleAddMarker = (latlng) => {
    setSelectedLocation(latlng);
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
    setFormData({
      nombre: "",
      descripcion: "",
      deporte: "",
      fecha: "",
      hora: "",
      direccion: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLocation) return;

    if (!user) {
      alert("Error: no hay usuario logueado");
      return;
    }

    const nuevoEvento = {
      nombre: formData.nombre,
      id_organizador: user,
      fecha: formData.fecha,
      hora: formData.hora,
      descripcion: formData.descripcion,
      deporte: formData.deporte,
      ubicacion: JSON.stringify({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        direccion: formData.direccion,
      }),
    };

    try {
      const response = await axios.post(
        "http://localhost:5111/api/events/create",
        nuevoEvento,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Evento creado:", response.data);
      alert("Evento creado con éxito 🎉");

      setMarkers([
        ...markers,
        { lat: selectedLocation.lat, lng: selectedLocation.lng, title: formData.nombre},
      ]);

      

      handleCloseMenu();
    } catch (error) {
      console.error("Error al crear evento:", error);
      alert("Error al crear evento");
    }
  };


  return (
    <>
      <IslandHeader eventos={eventos}/>

      <MapContainer
        center={[4.0853, -76.197]}
        zoom={18}
        maxZoom={18}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]} icon={customIcon}>
            <Popup>
              <div>
                <h3>{m.nombre}</h3>
                <p><strong>Deporte:</strong> {m.deporte}</p>
                <p><strong>Descripción:</strong> {m.descripcion}</p>
                <p><strong>Fecha:</strong> {m.fecha}</p>
                <p><strong>Hora:</strong> {m.hora}</p>
                <p><strong>Dirección:</strong> {m.direccion}</p>
                {(m.id_organizador !== user) && 
                <GradientButtonOnclick nombre={"Unirme"} func={() => handleJoinEvent(m.id)}/>}
              </div>
            </Popup>
          </Marker>
        ))}


        <AddMarkerEvent onAdd={handleAddMarker} />
      </MapContainer>

      {/* Menú inferior */}
      {showMenu && (
        <div className="event-menu">
          <div className="menu-header">
            <button className="close-btn" onClick={handleCloseMenu}>
              ✕
            </button>
            <h2>Crear evento</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Nombre del evento</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <label>Deporte</label>
            <input
              type="text"
              name="deporte"
              value={formData.deporte}
              onChange={handleChange}
              required
            />

            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
            />

            <div className="double-input">
              <div>
                <label>Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Hora</label>
                <input
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label>Dirección (opcional)</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />

            <p>
              📍 Lat: {selectedLocation.lat.toFixed(4)} | Lng:{" "}
              {selectedLocation.lng.toFixed(4)}
            </p>

            <GradientButtonSubmit nombre="crear evento"/>
          </form>
        </div>
      )}
    </>
  );
}

export default Map;