import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Protected({ children }) {
  const [bioOk, setBioOk] = useState(null);
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated || !username || !token) {
      setBioOk(false);
      return;
    }

    fetch(`https://instagram-backend-jyvf.onrender.com/profile/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setBioOk(!!data.bio);
        } else {
          setBioOk(false);
        }
      })
      .catch(() => setBioOk(false));
  }, [isAuthenticated, username, token]);

  if (bioOk === true) {
    return children;
  }

  if (bioOk === false) {
    if (!isAuthenticated || !username || !token) {
      return <Navigate to="/" />;
    }
    return <Navigate to="/editProfile" />;
  }

  // bioOk === null => don't return anything, just let it sit until useEffect runs
}
