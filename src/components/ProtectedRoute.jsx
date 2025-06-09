import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Protected({ children }) {
  const [bioOk, setBioOk] = useState(null); // null = loading, true/false = fetched
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const isEdited = localStorage.getItem("edited") === "true";
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username;
  const token = localStorage.getItem("token");
  alert(username);
  useEffect(() => {
    if (!isAuthenticated || !isEdited) {
      setBioOk(false);
      return;
    }
    fetch(`https://instagram-backend-jyvf.onrender.com/profile/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        alert(res);
        setBioOk(res.ok);
      })
      .catch(() => setBioOk(false));
  }, [isAuthenticated, isEdited, username, token]);

  if (!isAuthenticated) return <Navigate to="/" />;
  if (!isEdited) return <Navigate to="/editProfile" />;

  if (bioOk === null) return <div>Loading...</div>;

  if (bioOk) {
    return children;
  } else {
    return <Navigate to="/editProfile" />;
  }
}
