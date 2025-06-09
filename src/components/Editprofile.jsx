import React, { useState, useEffect } from "react";
import Field from "./EditprofileComponent/Field";
import "../css/Editprofile.css";
import { Link, useNavigate } from "react-router-dom";
import { token as tokenget } from "../getters/get-token.js";

export default function EditProfile() {
  const [data, setData] = useState({
    image: null,
    name: "",
    bio: "",
  });
  const token = tokenget();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "";
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const username = user.username || "";
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://instagram-backend-jyvf.onrender.com/profile/${username}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const profileData = await response.json();
        setData({
          image: null, // File can't be pre-set from API; handle upload separately
          name: profileData.bio.name || "",
          bio: profileData.bio.bio || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (username) fetchProfile();
  }, [username]);

  function handleChange(identifier, event) {
    const value =
      identifier === "image" ? event.target.files[0] : event.target.value;
    setData((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    formData.append("username", username);
    const response = await fetch(
      "https://instagram-backend-jyvf.onrender.com/updateProfile",
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      navigate("/profile");
    } else {
      console.error("Update failed:", await response.text());
    }
    console.log("Submitting:", data);
  }

  return (
    <>
      <h1 className="editheading">Edit Profile</h1>

      <Link to="/profile" className="Backtoprofile-link">
        <p className="Backtoprofile">Back</p>
      </Link>

      <form onSubmit={handleSubmit} className="Form-top">
        <h2 className="form-heading">SnapNova</h2>
        <div className="Form">
          <Field
            name="image"
            type="file"
            placeholder=""
            onChange={(e) => handleChange("image", e)}
          >
            Profile Image
          </Field>

          <Field
            name="name"
            type="text"
            placeholder="Your Name"
            value={data.name ?? ""}
            onChange={(e) => handleChange("name", e)}
          >
            Name
          </Field>

          <Field
            name="bio"
            type="text"
            placeholder="Your Bio"
            value={data.bio ?? ""}
            onChange={(e) => handleChange("bio", e)}
          >
            Bio
          </Field>

          <button type="submit" className="submitButton">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
