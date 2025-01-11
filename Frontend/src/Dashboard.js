import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";

const Dashboard = ({onLogout}) => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  //Handle logout
  const handleLogout = async () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li>🏠 Dashboard</li>
          <li>💳 My Wallet</li>
          <li>❤️ Favorites</li>
          <li>🔄 History</li>
          <li>❓ Help Center</li>
          <li>⚙️ Settings</li>
          <li onClick={toggleDarkMode}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </li>
        </ul>
      </aside>

      {/* Top Icons */}
      <div className="top-icons">
        <button className="logout-btn" onClick={() => handleLogout()}>Logout</button>
        <select className="language-select">
          <option value="en">EN</option>
          <option value="si">සිංහල</option>
          <option value="ta">தமிழ்</option>
        </select>
        <button className="notification-btn">🔔</button>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="section account-info">
          <h2>Account Information</h2>
          <p>Account Number: <strong>XXXXXXXXXXXXXX</strong></p>
          <p>Account Balance (LKR): <strong>1,000,000</strong></p>
        </div>

        <div className="section quick-access">
          <h2>Quick Access</h2>
          <div className="actions">
            <button>
              <img src="/icons/send-money.png" alt="Send Money" />
              Send Money
            </button>
            <button>
              <img src="/icons/pay-bills.png" alt="Pay Bills" />
              Pay Bills
            </button>
            <button>
              <img src="/icons/reloads.png" alt="Reloads" />
              Reloads
            </button>
          </div>
        </div>

        <div className="section recent-activity">
          <h2>Recent Activity</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-12-01</td>
                <td>John Doe</td>
                <td>LKR 10,000</td>
                <td>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section favorites">
          <h2>My Favorites</h2>
          <p>No favorites added yet.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
