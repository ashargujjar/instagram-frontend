import React from "react";
import Link from "./FooterLinks";
export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <Link>Meta</Link>
        <Link>About</Link>
        <Link>Blog</Link>
        <Link>Jobs</Link>
        <Link>Help</Link>
        <Link>Api</Link>
        <Link>Privacy</Link>
        <Link>Terms</Link>
        <Link>Locations</Link>
        <Link>Instagram Lite</Link>
        <Link>Threads</Link>
        <Link>Contact Uploading & Non-Users</Link>
        <Link>Meta verified</Link>
      </ul>
      <div className="last-footer-content">
        <p>English</p>
        <p>© 2025 Instagram from Meta</p>
      </div>
    </footer>
  );
}
