import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Protected({ children }) {
  const [bioOk, setBioOk] = useState(null); // null = loading, true/false = fetched
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const isEdited = localStorage.getItem("edited") === "true";
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username;
  const token = localStorage.getItem("token"); // Make sure you get the token somewhere

  useEffect(() => {
    if (!isAuthenticated || !isEdited) {
      setBioOk(false);
      return;
    }
    fetch(`https://instagram-backend-jyvf.onrender.com/profile/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setBioOk(res.ok);
      })
      .catch(() => setBioOk(false));
  }, [isAuthenticated, isEdited, username, token]);

  if (!isAuthenticated) return <Navigate to="/" />;
  if (!isEdited) return <Navigate to="/editProfile" />;

  // While waiting for fetch to resolve, you can return null or loading
  if (bioOk === null) return <div>Loading...</div>;

  if ((isAuthenticated && isEdited) || (bioOk && isAuthenticated)) {
    return children;
  } else {
    return <Navigate to="/editProfile" />;
  }
}
