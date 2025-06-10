import React from "react";
import Footer from "../components/LoginComponents/footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";
import { Link } from "react-router-dom";

function Signup() {
  localStorage.removeItem("isLoggedIn");

  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleInput(identifier, event) {
    setUser((prev) => ({
      ...prev,
      [identifier]: event.target.value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `https://instagram-backend-jyvf.onrender.com/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    if (response.ok) {
      setLoading(false);
      const data = await response.json();
      navigate("/", { state: { mesage: data.message } });
    } else {
      console.log("error");
    }
  }
  return (
    <>
      <div className="signup">
        <div className="signup-page">
          <h1 className="heading">SnapNova</h1>
          <h3 className="text">
            Sign up to see photos and videos from your friends.
          </h3>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                handleInput("email", e);
              }}
              required
              value={user.email}
              placeholder="email"
            />

            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={user.password}
              placeholder="password"
              onChange={(e) => {
                handleInput("password", e);
              }}
            />

            <label htmlFor="fullname">full name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              required
              value={user.fullname}
              placeholder="full name"
              onChange={(e) => {
                handleInput("fullname", e);
              }}
            />

            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              required
              placeholder="username"
              onChange={(e) => {
                handleInput("username", e);
              }}
            />

            <p className="text">
              People who use our service may have uploaded your contact
              information to Instagram.
            </p>

            <button
              className="signup-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        <div className="have-account">
          <p>Have an account?</p>
          <Link to="/" className="login-link">
            Login
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
