import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function AddMarker({ onAdd }) {
  useMapEvents({
    click(e) {
      onAdd(e.latlng);
    },
  });
  return null;
}

function Map() {
  const [markers, setMarkers] = useState([
    { lat: 4.0853, lng: -76.1970, title: "Tuluá" },
  ]);

  const handleAddMarker = (latlng) => {
    setMarkers([...markers, { ...latlng, title: "Nuevo punto" }]);
  };

  return (
    <MapContainer
      center={[4.0853, -76.1970]} 
      zoom={18}                  
      maxZoom={18}                
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marcadores */}
      {markers.map((m, i) => (
        <Marker key={i} position={[m.lat, m.lng]} icon={customIcon}>
          <Popup>
            <strong>{m.title}</strong>
            <br />
            Lat: {m.lat.toFixed(4)}, Lng: {m.lng.toFixed(4)}
          </Popup>
        </Marker>
      ))}

      <AddMarker onAdd={handleAddMarker} />
    </MapContainer>
  );
}

export default Map;
