import { useState } from "react";
import GradientButton from "../components/GradientButton";
import "./css/AdminPanel.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { X, MoreHorizontal } from "lucide-react";

const mockRequests = [
  { id: 1, username: "juanperez", date: "2025-12-03", document: "DocumentoIdentidad.pdf" },
  { id: 2, username: "maria23", date: "2025-12-02", document: "Cedula.pdf" },
  { id: 3, username: "andres_dev", date: "2025-12-01", document: "Pasaporte.pdf" },
];

const AdminPanel = () => {
  const [openId, setOpenId] = useState(null);

  const toggleActions = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Header />
      <main className="items-section">
        <h2>Panel de Administración</h2>

        <section className="verification-section">
          <h3>Solicitudes de Verificación</h3>

          <div>
            {mockRequests.map((req) => (
              <div key={req.id} className="request-item">
                <div className="target-close">
                    <div className="request-info">
                        <p className="username">{req.username}</p>
                        <p className="date">Fecha: {req.date}</p>
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
                  <button className="view-pdf-btn">Ver PDF</button>
                  <GradientButton nombre="✓ Aceptar"></GradientButton>
                  <button className="reject-btn">
                    <X />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AdminPanel;