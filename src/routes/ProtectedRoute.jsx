import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user == null) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
