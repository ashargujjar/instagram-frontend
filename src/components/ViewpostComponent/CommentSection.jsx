import React from "react";

export default function CommentSection({ comment }) {
  return (
    <div style={{ marginBottom: "0.5rem", fontSize: "0.95rem", color: "#333" }}>
      <strong>{comment.username}</strong>: {comment.text}
    </div>
  );
}
