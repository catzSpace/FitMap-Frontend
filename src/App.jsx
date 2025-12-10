import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map.jsx";
import "./index.css";
import ProtectedRouteUser from "./components/ProtectedRouteUser.jsx";
import Login from "./pages/Login.jsx";
import SignupForm from "./pages/SignupForm.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin.jsx";
import AdminPanelReport from "./pages/AdminPanelReport.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<SignupForm/>} />
        <Route path="/login" element={<Login/> } />
        <Route path="/nosotros" element={<div className="page">Sobre nosotros</div>} />
        <Route path="/mapa" element={
          <ProtectedRouteUser>
            <Map />
          </ProtectedRouteUser>
          }/>
          <Route path="/admin/panel" element={
            <ProtectedRouteAdmin>
              <AdminPanel />
            </ProtectedRouteAdmin>
          }></Route>
          <Route path="/admin/panel/reports" element={
            <ProtectedRouteAdmin>
              <AdminPanelReport />
            </ProtectedRouteAdmin>
          }></Route>
        </Routes>
    </Router>
  );
};

export default App;
