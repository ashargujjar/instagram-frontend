import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { token as tokenget } from "../../getters/get-token";

export default function Post({ post, image }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/profile/${post.username}`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProfile(data.bio);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, [post.username]);

  // normalize the post image URL

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="profile-photo">
          <img
            src={profile.secure_url}
            alt={`${post.username}'s avatar`}
            className="profile-image"
          />
        </div>
        <h3>{post.username}</h3>
      </div>

      <div className="post">
        <img src={post.secure_url} alt="User post" className="post-image" />
      </div>

      <div className="icons">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "25px", height: "25px", cursor: "pointer" }}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </div>
      {/* {/* likes implementation latter */}

      <p className="likes-count">
        {post.like.likes > 0 ? post.like.likes : <p>No Likes yet! </p>}{" "}
      </p>
      <Link to={`/view-post/${post._id}`}>
        <a href="#" className="view-comments">
          view all comments
        </a>
      </Link>
    </div>
  );
}
