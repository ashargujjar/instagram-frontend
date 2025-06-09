import React, { useState, useEffect } from "react";
import "../css/Search.css";
import ExploreUser from "./profileComponents/ExploreUser";
import { Link } from "react-router-dom";
import { token, token as tokenget } from "../getters/get-token.js";

export default function ExploreUsers() {
  const [userlist, setUserList] = useState([]);
  const [unfowllowedList, setUnFollowedList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = tokenget();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const us = await fetch(
          `https://instagram-backend-jyvf.onrender.com/explore-user-notFollow/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const res = await fetch(
          `https://instagram-backend-jyvf.onrender.com/explore-users/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        const Udata = await us.json();
        console.log(Udata);
        console.log("API response:", data);
        // Extract Alreadyfollowed array or default to empty array
        const users = Array.isArray(data.Alreadyfollowed)
          ? data.Alreadyfollowed
          : [];
        const uUsers = Array.isArray(Udata.notFollowing)
          ? Udata.notFollowing
          : [];
        setUnFollowedList(uUsers);

        setUserList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  function handleFollow(targetUser) {
    fetch(`https://instagram-backend-jyvf.onrender.com/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: targetUser._id,
        username: user.username,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        changeState(targetUser, "follow");

        setUserList((prev) =>
          prev.map((u) =>
            u._id === targetUser._id ? { ...u, followed: true } : u
          )
        );
      })
      .catch((error) => console.error("Error following user:", error));
  }

  function handleUnFollow(targetUser) {
    fetch(`https://instagram-backend-jyvf.onrender.com/unFollow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: targetUser._id,
        username: user.username,
      }),
    })
      .then(() => {
        changeState(targetUser, "unfollow");

        setUserList((prev) =>
          prev.map((u) =>
            u._id === targetUser._id ? { ...u, followed: false } : u
          )
        );
      })
      .catch((error) => console.error("Error unfollowing user:", error));
  }
  function changeState(targetUser, action) {
    if (action === "follow") {
      // Move user from unfollowedList to userlist
      setUnFollowedList((prev) => prev.filter((u) => u._id !== targetUser._id));
      setUserList((prev) => [...prev, { ...targetUser, followed: true }]);
    } else if (action === "unfollow") {
      // Move user from userlist to unfollowedList
      setUserList((prev) => prev.filter((u) => u._id !== targetUser._id));
      setUnFollowedList((prev) => [
        ...prev,
        { ...targetUser, followed: false },
      ]);
    }
  }
  console.log(userlist, unfowllowedList);

  return (
    <>
      <nav className="search-nav" style={{ fontSize: "1.5rem" }}>
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </nav>
      {userlist.length > 0 || unfowllowedList.length > 0 ? (
        <>
          {userlist.map((user) => (
            <ExploreUser
              key={user._id}
              profile={user}
              handleFollow={() => handleFollow(user)}
              handleUnFollow={() => handleUnFollow(user)}
              followed={true}
            />
          ))}
          {unfowllowedList.map((user) => (
            <ExploreUser
              key={user._id}
              profile={user}
              handleFollow={() => handleFollow(user)}
              handleUnFollow={() => handleUnFollow(user)}
              followed={false}
            />
          ))}
        </>
      ) : (
        <p>No User Found</p>
      )}
    </>
  );
}
