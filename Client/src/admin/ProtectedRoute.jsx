import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // Check if token exists

  return token ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
