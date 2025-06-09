import React, { useState } from "react";
import "../css/Search.css";
import { Link, useNavigate } from "react-router-dom";
import { token as tokenget } from "../getters/get-token.js";

export default function CreatePost({ onSubmit }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = tokenget();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    username: user?.username || "",
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("image", formData.image);
    postData.append("username", formData.username);

    const response = await fetch(
      `https://instagram-backend-jyvf.onrender.com/uploadImage`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: postData,
      }
    );

    if (response.ok) {
      console.log("Post inserted successfully");
      navigate("/profile");
    } else {
      console.error("Failed to upload post");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <nav className="search-nav">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </nav>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Create Post</button>
    </form>
  );
}
