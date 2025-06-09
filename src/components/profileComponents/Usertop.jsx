import React from "react";
export default function Usertop({ data, type }) {
  return (
    <ul className="user-top-following-list">
      <li style={{ color: "black" }}> {data}</li>
      <li>{type}</li>
    </ul>
  );
}
