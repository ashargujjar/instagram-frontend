import React, { useState } from "react";
import "../css/user-home.css";
import "../css/media-home.css";
import Post from "./HomeComponents/Post";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import image from "../asssets/simon-maage-tXiMrX3Gc-g-unsplash.jpg";
import { token as tokenget } from "../getters/get-token.js";

export default function Home() {
  const [UsersPosts, setPost] = useState([]);
  const [message, setMessage] = useState("");
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const token = tokenget();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://instagram-backend-jyvf.onrender.com/get/posts/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const post = await res.json();
          const posts = post.posts;
          setPost(posts);
        } else {
          setMessage("No post found. Try following more users.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setMessage("Something went wrong. Please try again later.");
      }
    };

    fetchData();
  }, [user]);
  useEffect(() => {}, [UsersPosts]);
  return (
    <>
      <div className="container-fluid">
        <nav>
          <div className="side-nav side-nav-first">
            <h1 className="side-nav-heading nav-text-hide">SnapNova</h1>

            <ul className="side-nav-list">
              <Link to="/home" className="side-nav-links nav-text-hide">
                <li>
                  <svg
                    className="profile-svg"
                    viewBox="0 0 24.00 24.00"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(0)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="0.048"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z"
                        fill="#080341"
                      ></path>
                    </g>
                  </svg>
                  <p>Home</p>
                </li>
              </Link>
              <Link to="/search">
                <li>
                  <svg
                    className="profile-svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                  <a href="#" className="side-nav-links nav-text-hide">
                    Search
                  </a>
                </li>
              </Link>
              <Link to="/exploreUsers">
                {" "}
                <li>
                  <svg
                    fill="#000000"
                    className="profile-svg"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 612 612"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="8.568000000000001"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <path d="M306,0C137.272,0,0,137.27,0,305.997C0,474.727,137.272,612,306,612s306-137.273,306-306.003C612,137.27,474.73,0,306,0z M306,576.657c-149.24,0-270.657-121.418-270.657-270.66C35.343,156.759,156.76,35.343,306,35.343 s270.657,121.416,270.657,270.655C576.657,455.24,455.24,576.657,306,576.657z"></path>
                          <path d="M474.47,144.734c-4.623-8.599-15.336-11.818-23.933-7.197L251.64,244.485c-3.053,1.642-5.556,4.144-7.197,7.198 L137.538,450.536c-3.782,7.035-2.309,15.489,3.063,20.861c1.191,1.193,2.574,2.232,4.137,3.07 c5.313,2.857,11.436,2.71,16.428,0.155l0.003,0.004l0.075-0.04c0.072-0.037,0.143-0.077,0.214-0.115l198.995-106.87 c3.054-1.64,5.556-4.142,7.2-7.197l106.477-198.361c0.233-0.401,0.455-0.806,0.655-1.222l0.144-0.267l-0.018-0.006 C477.174,155.671,477.211,149.833,474.47,144.734z M196.403,415.684l67.933-126.361l58.418,58.42L196.403,415.684z M347.76,322.764l-58.421-58.421l126.351-67.94"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <a href="#" className="side-nav-links nav-text-hide">
                    Explore
                  </a>
                </li>
              </Link>
              <li>
                <svg
                  className="profile-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
                <a href="#" className="side-nav-links nav-text-hide">
                  Notifications
                </a>
              </li>
              <Link to="/createpost" className="side-nav-links nav-text-hide">
                <li>
                  <svg
                    className="profile-svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z"
                        stroke="#000000"
                        strokeWidth="2"
                      ></path>
                      <path
                        d="M16.2739 11.1377C16.6644 10.7472 16.6644 10.114 16.2739 9.7235L14.4823 7.9319C14.0918 7.54137 13.4586 7.54138 13.0681 7.9319L8.96106 12.0389L8.34768 15.7477C8.3365 15.8154 8.39516 15.874 8.4628 15.8627L12.1669 15.2448L16.2739 11.1377Z"
                        stroke="#000000"
                        strokeWidth="2"
                      ></path>
                    </g>
                  </svg>
                  <p>Create</p>
                </li>
              </Link>
              <Link
                to="/profile"
                className="side-nav-links nav-text-hide"
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "5px",
                  border: "1px solid #000000",
                  padding: "10px 12px",
                  display: "block",
                  width: "60px",
                }}
              >
                <li>
                  <p>Profile</p>
                </li>
              </Link>
              <li>
                <svg
                  className="profile-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
                <a href="#" className="side-nav-links nav-text-hide">
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="posts-display">
        {UsersPosts && UsersPosts.length > 0 ? (
          UsersPosts.map((u) => (
            <div key={u._id}>
              <Post post={u} image={image} />
            </div>
          ))
        ) : (
          <p>No post found. Try following more</p>
        )}
      </div>
    </>
  );
}
