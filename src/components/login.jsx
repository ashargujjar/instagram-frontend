import React from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/login-media.css";
import { useState, useEffect } from "react";
import Getaap from "../components/LoginComponents/GetApps";
import loginImage from "../asssets/simon-maage-tXiMrX3Gc-g-unsplash.jpg";
import Footer from "../components/LoginComponents/footer";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = JSON.parse(
      localStorage.getItem("isLoggedIn") || "false"
    );
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [navigate]);
  function usernameChange(e) {
    setEmail(e.target.value);
  }
  function passwordChange(e) {
    setPassword(e.target.value);
  }
  const location = useLocation();
  const message = location.state?.message;
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `https://instagram-backend-jyvf.onrender.com/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      }
    );

    if (response.ok) {
      setLoading(false);
      const data = await response.json();

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/profile");
    }
  }
  return (
    <>
      <div className="Login-page">
        {message && <p className="message">{message}</p>}

        <div className="login-image">
          <img className="insta-image" src={loginImage} alt="Login Visual" />
        </div>
        <div className="login-form">
          <div className="form-content">
            <h1 className="heading">SnapNova</h1>
            <div className="form-input">
              <form className="login-form" onSubmit={onSubmit}>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Phone number, username, or email"
                  required
                  value={email}
                  onChange={usernameChange}
                />
                <input
                  className="form-input"
                  type="password"
                  placeholder="password"
                  required
                  onChange={passwordChange}
                  value={password}
                />
                <button type="submit" className="login" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Log in"}
                </button>
                <p className="small-txt">OR</p>
                <div className="facebook">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 474.294 474.294"
                    xmlSpace="preserve"
                    fill="#000000"
                    className="facebook-svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle
                        style={{ fill: "#7678ed" }}
                        cx="237.111"
                        cy="236.966"
                        r="236.966"
                      ></circle>
                      <path
                        style={{ fill: "#7678ed" }}
                        d="M404.742,69.754c92.541,92.541,92.545,242.586-0.004,335.134 c-92.545,92.541-242.593,92.541-335.134,0L404.742,69.754z"
                      ></path>
                      <path
                        style={{ fill: "#7678ed" }}
                        d="M472.543,263.656L301.129,92.238l-88.998,88.998l5.302,5.302l-50.671,50.667l41.474,41.474 l-5.455,5.452l44.901,44.901l-51.764,51.764l88.429,88.429C384.065,449.045,461.037,366.255,472.543,263.656z"
                      ></path>
                      <path
                        style={{ fill: "#ffffff" }}
                        d="M195.682,148.937c0,7.27,0,39.741,0,39.741h-29.115v48.598h29.115v144.402h59.808V237.276h40.134 c0,0,3.76-23.307,5.579-48.781c-5.224,0-45.485,0-45.485,0s0-28.276,0-33.231c0-4.962,6.518-11.641,12.965-11.641 c6.436,0,20.015,0,32.587,0c0-6.623,0-29.481,0-50.592c-16.786,0-35.883,0-44.306,0C194.201,93.028,195.682,141.671,195.682,148.937 z"
                      ></path>
                    </g>
                  </svg>
                  <p>Login With Facebook</p>
                </div>
                <p className="forget-text">Forgot Password?</p>
              </form>
            </div>
          </div>
          <p className="form-text">
            Don't have an account?
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
          <p className="forget-text">Get the app.</p>
          <Getaap />
        </div>
      </div>
      <Footer />
    </>
  );
}
