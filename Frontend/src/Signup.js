import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-logo">
        <img 
          src="/logo.png" 
          alt="National Bank Logo" 
          style={{
            width: '150px', 
            height: '150px', 
            objectFit: 'contain', 
            borderRadius: '1%',
          }} 
        />
      </div>
      <div className="signup-form">
        <h2>Signup</h2>
        <p>Create your account</p>
        <form>
        <div className="form-group">
            <input type="text" placeholder="Enter your NIC number" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Re-enter your password" />
          </div>
          <button type="submit" className="signup-btn">Signup</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
