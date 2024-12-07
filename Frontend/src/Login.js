import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        onLoginSuccess(data.user); // Pass user details to the parent
      } else {
        setMessage(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <div className="logo-circle">
          <h1>NATIONAL BANK</h1>
        </div>
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <p>Welcome Back!</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
