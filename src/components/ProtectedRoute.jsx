import { Navigate } from "react-router-dom";
import React from "react";
export default function Protected({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn");
  const isEdited = localStorage.getItem("edited");
  if (isAuthenticated) {
    if (isEdited) {
      return children;
    } else {
      return children;
    }
  } else {
    return isAuthenticated ? children : <Navigate to="/" />;
  }
}
