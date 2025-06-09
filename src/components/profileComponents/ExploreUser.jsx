import React from "react";
export default function ExploreUsers({
  profile,
  handleFollow,
  followed,
  handleUnFollow,
}) {
  return (
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
  );
}
