import { Navigate } from "react-router-dom";
import React from "react";
export default function Protected({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  return isAuthenticated ? children : <Navigate to="/" />;
}
