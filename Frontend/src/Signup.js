import React, { useState } from "react";
import { UserAddOutlined, LockOutlined, IdcardOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { Link, useNavigate } from "react-router-dom"; // Import Link
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");


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
            <Input size="large" placeholder="Enter your NIC number" value={nicNumber} onChange={(e) => setNicNumber(e.target.value)} prefix={<IdcardOutlined />} />
          </div>
        {/* <div className="form-group">
            <input type="text" placeholder="Enter your NIC number" />
          </div> */}
          <div className="form-group">
            <Input size="large" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} prefix={<UserAddOutlined />} />
          </div>
          {/* <div className="form-group">
            <input type="text" placeholder="Enter your username" />
          </div> */}
          <div className="form-group">
            <Input size="large" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} prefix={<MailOutlined />} />
          </div>
          {/* <div className="form-group">
            <input type="email" placeholder="Enter your email" />
          </div> */}
            <div className="form-group">
              <Input size="large" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} prefix={<LockOutlined />} />
            </div>
          {/* <div className="form-group">
            <input type="password" placeholder="Enter your password" />
          </div> */}
          <div className="form-group">
            <Input size="large" placeholder="Re-enter your password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} prefix={<LockOutlined />} />
          </div>
          {/* <div className="form-group">
            <input type="password" placeholder="Re-enter your password" />
          </div> */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </div>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
