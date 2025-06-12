import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { token as tokenget } from "../../getters/get-token";

export default function Post({ post, image, fetchPost }) {
  const [profile, setProfile] = useState(null);
  const [isliked, setIsLiked] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = tokenget();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://instagram-backend-jyvf.onrender.com/profile/${post.username}`
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
  useEffect(() => {
    const liked = post.like.likedBy.includes(user._id);
    setIsLiked(liked);
  }, [post.like.likedBy, user._id]);

  async function handleLike(e) {
    e.preventDefault();
    if (isliked) {
      // Implement unlike functionality
      const res = await fetch(
        `https://instagram-backend-jyvf.onrender.com/disLike/${post._id}`,

        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        setIsLiked(false);
        fetchPost();
      }
    } else {
      // Implement like functionality
      const res = await fetch(
        `https://instagram-backend-jyvf.onrender.com/like/${post._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        setIsLiked(true);
        fetchPost();
      }
    }
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="profile-photo">
          <img
            src={profile?.secure_url ? profile?.secure_url : image}
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
        {!isliked ? (
          <svg
            onClick={handleLike}
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
        ) : (
          <svg
            onClick={handleLike}
            width="132px"
            height="132px"
            viewBox="-0.96 -0.96 13.92 13.92"
            enable-background="new 0 0 12 12"
            id="Слой_1"
            version="1.1"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M8.5,1C7.5206299,1,6.6352539,1.4022217,6,2.0504761C5.3648071,1.4022827,4.4793701,1,3.5,1 C1.5670166,1,0,2.5670166,0,4.5S2,8,6,11c4-3,6-4.5670166,6-6.5S10.4329834,1,8.5,1z"
                fill="#1D1D1B"
              ></path>
            </g>
          </svg>
        )}
      </div>
      {/* {/* likes implementation latter */}

      <p className="likes-count">
        {post.like.likes > 0 ? post.like.likes : <p>No Likes yet! </p>}
      </p>
      <Link to={`/view-post/${post._id}`}>
        <a href="#" className="view-comments">
          view all comments
        </a>
      </Link>
    </div>
  );
}
