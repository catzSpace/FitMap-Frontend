import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  const rol = JSON.parse(localStorage.getItem("rol"));

  if (rol == 1) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }

  
};

export default ProtectedRouteAdmin;