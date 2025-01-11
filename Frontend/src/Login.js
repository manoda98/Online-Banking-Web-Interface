import React, { useState } from "react";
import { UserAddOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { Link, useNavigate } from "react-router-dom"; // Import Link
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulating successful login
    if (username === "admin" && password === "password") {
      onLoginSuccess(); // Call the function to switch to Dashboard
      navigate('/dashboard');
    } else {
      alert("Invalid credentials. Try 'admin' and 'password'.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
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
      <div className="login-form">
        <h2>Login</h2>
        <p>Welcome Back!</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <Input size="large" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} prefix={<UserAddOutlined />} />
          </div>
          <div className="form-group">
            <Input size="large" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} prefix={<LockOutlined />} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </form>
        <p className="signup-link">
          <Link to="/signup">Forgot password ?</Link>
        </p>
        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
