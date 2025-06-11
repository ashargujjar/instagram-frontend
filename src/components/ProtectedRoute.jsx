import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Protected({ children }) {
  const [bioOk, setBioOk] = useState(false); // null = loading
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`https://instagram-backend-jyvf.onrender.com/profile/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setBioOk(res.ok); // true if 200 OK, false otherwise
      })
      .catch(() => setBioOk(false));
  }, [isAuthenticated, username, token]);
  if (!isAuthenticated || !username || !token) {
    setBioOk(false);
    return;
  }
  if (!isAuthenticated) return <Navigate to="/" />;
  if (!bioOk) return <Navigate to="/editProfile" />;

  return children;
}
