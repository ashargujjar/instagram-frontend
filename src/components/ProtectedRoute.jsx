import { Navigate } from "react-router-dom";
import React from "react";
export default function Protected({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const isEdited = localStorage.getItem("edited") === "true";

  if (!isAuthenticated) return <Navigate to="/" />;

  if (!isEdited) return <Navigate to="/editProfile" />;
  if (isAuthenticated && isEdited) {
    return children;
  } else {
    return <Navigate to="/editProfile" />;
  }
}
