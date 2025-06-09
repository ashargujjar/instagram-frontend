import React from "react";
export default function Photo({ image }) {
  return (
    <div className="photo">
      <img className="user-image" src={image} />
    </div>
  );
}
