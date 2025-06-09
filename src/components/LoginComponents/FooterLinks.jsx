import React from "react";
export default function Link({ children }) {
  return (
    <li>
      <a href="#">{children}</a>
    </li>
  );
}
