import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExploreUsers from "../components/profileComponents/ExploreUser";
import "../css/Search.css";
import { token as tokenget } from "../getters/get-token.js";

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [followed, setFollowed] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = tokenget();

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    if (username !== user.username) {
      setIsLoading(true);
      const res = await fetch(
        `https://instagram-backend-jyvf.onrender.com/search-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: user.username,
            searchedUsername: username,
          }),
        }
      );

      setIsLoading(false);

      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setFollowed(data.followed);
      setProfile(data.user);
    } else {
      setError("user not found");
    }
  }

  function handleFollow() {
    fetch(`https://instagram-backend-jyvf.onrender.com/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: profile._id, username: user.username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFollowed(true);
        alert(data.message || "Followed successfully");
      })
      .catch(() => alert("Failed to follow user"));
  }

  async function handleUnFollow() {
    fetch(`https://instagram-backend-jyvf.onrender.com/unFollow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: profile._id, username: user.username }),
    });
    setFollowed(false);
  }
  return (
    <div className="search-container">
      <nav className="search-nav">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </nav>

      <form className="search-form">
        <input
          type="text"
          placeholder="Enter username"
          className="search-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="search-error">{error}</p>}

      {/* {profile && (
        <div className="search-profile">
          <h3>{profile.username}</h3>
          <p>{profile.email}</p>
          {followed ? (
            <button
              onClick={handleUnFollow}
              className="follow-button"
              style={{ background: "red" }}
            >
              UnFollow
            </button>
          ) : (
            <button onClick={handleFollow} className="follow-button">
              Follow
            </button>
          )}
        </div>
      )} */}
      {profile ? (
        <ExploreUsers
          profile={profile}
          handleFollow={handleFollow}
          handleUnFollow={handleUnFollow}
          followed={followed}
        />
      ) : (
        "No user found"
      )}
    </div>
  );
}
