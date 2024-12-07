import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      <aside className="sidebar">
        <ul>
          <li>🏠 Dashboard</li>
          <li>💳 My Wallet</li>
          <li>❤️ Favorites</li>
          <li>🔄 History</li>
          <li>❓ Help Center</li>
          <li>🔔 Notifications</li>
          <li>⚙️ Settings</li>
          <li onClick={toggleDarkMode}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="navbar">
          <div className="language-select">
            <label htmlFor="language">Language: </label>
            <select id="language">
              <option value="en">English</option>
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
        </header>
        <h1>Welcome!</h1>
        <div className="account-info">
          <p>Account Balance (LKR): <strong>500,000</strong></p>
          <p>Account Number: <strong>XXXXXXXXXXXXXX</strong></p>
        </div>
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
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-filters">
            <label htmlFor="date-filter">Date Range: </label>
            <select id="date-filter">
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-year">This Year</option>
            </select>
          </div>
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
                <td>2024-11-20</td>
                <td>John Doe</td>
                <td>5000</td>
                <td>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
