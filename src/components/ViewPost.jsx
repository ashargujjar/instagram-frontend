import React, { useState } from "react";
import "../css/viewPost.css";
import CommentSection from "./ViewpostComponent/CommentSection";
import { useLoaderData } from "react-router";
import { Link, useNavigate } from "react-router";
import { token as tokenget } from "../getters/get-token.js";
import image from "../asssets/simon-maage-tXiMrX3Gc-g-unsplash.jpg";

export default function ViewPost() {
  const { bio, post } = useLoaderData();

  const [posts, setpost] = useState(post);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const token = tokenget();
  let user = null;
  if (userString) {
    user = JSON.parse(userString);
  } else {
    console.log("No user found in localStorage");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(comment);
    if (comment.trim()) {
      try {
        const response = await fetch(
          `https://instagram-backend-jyvf.onrender.com/postComment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              user: user.username,
              text: comment,
              postId: posts._id,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to post comment");
        try {
          const res = await fetch(
            `https://instagram-backend-jyvf.onrender.com/user/post/${posts._id}`
          );
          if (res.ok) {
            const post = await res.json();
            setpost(post.post);
          }
        } catch (err) {
          console.log(err);
        }
        setComment(""); // Clear input on success
      } catch (err) {
        console.error("Error submitting comment:", err);
      }
    }
  };
  async function deletePost() {
    // delete post function
    const postId = posts._id;
    const resp = await fetch(
      `https://instagram-backend-jyvf.onrender.com/userPost/${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }
    );
    if (resp.ok) {
      navigate("/profile");
    } else {
      navigate(`/view-post/${postId}`);
    }
  }
  return (
    <>
      <nav className="vp-navbar">
        <Link to="/home" className="vp-link">
          Home
        </Link>
        <Link to="/profile" className="vp-link">
          Profile
        </Link>
      </nav>

      <main className="vp-wrapper">
        <div className="vp-image-box">
          <img src={post.secure_url} alt="Post" className="vp-main-image" />
        </div>

        <section className="vp-details">
          <div className="vp-user">
            <img
              src={bio.secure_url ? bio.secure_url : image}
              alt="User Profile"
              className="vp-user-img"
            />
            <span className="vp-username">{bio.username}</span>
          </div>

          <div className="vp-comments-box">
            <h3>{posts?.comments?.length ? "Comments" : "No comments yet"}</h3>

            {posts?.comments?.map((comment, idx) => (
              <CommentSection key={idx} comment={comment} />
            ))}
          </div>

          <form className="vp-comment-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </section>
      </main>
      {posts?.username === user?.username ? (
        <div className="vp-footer">
          <button className="vp-delete-btn" onClick={deletePost}>
            Delete Post
          </button>
        </div>
      ) : (
        " "
      )}
    </>
  );
}
