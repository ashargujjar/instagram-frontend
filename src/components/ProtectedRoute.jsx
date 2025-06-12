import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Protected({ children }) {
  const [bioOk, setBioOk] = useState(false); // null = loading, true = bio exists, false = bio missing
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
      .then((res) => {
        if (res.ok) {
          setBioOk(true); // Bio exists, proceed to render children
        } else {
          setBioOk(false); // Bio missing, redirect to editProfile
        }
      })
      .catch(() => setBioOk(false)); // Handle network errors
  }, [isAuthenticated, username, token]);

  // While fetching, show a loading state to prevent premature redirects

  // Redirect to home if not authenticated or missing username/token
  if (!isAuthenticated || !username || !token) {
    return <Navigate to="/" />;
  }

  // Redirect to editProfile if bio is missing
  if (!bioOk) {
    return <Navigate to="/editProfile" />;
  }

  // Render children if all checks pass
  return children;
}
