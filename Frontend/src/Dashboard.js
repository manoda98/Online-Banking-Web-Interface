import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import { Flex, Menu } from "antd";
import {
  DashboardOutlined,
  WalletOutlined,
  HeartOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const Dashboard = ({onLogout}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(0);
  const [isAccountSwitching, setIsAccountSwitching] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: <DashboardOutlined /> },
    { label: "My Wallet", key: "wallet", icon: <WalletOutlined /> },
    { label: "Favorites", key: "favorites", icon: <HeartOutlined /> },
    { label: "History", key: "history", icon: <HistoryOutlined /> },
    { label: "Help Center", key: "help", icon: <QuestionCircleOutlined /> },
    { label: "Settings", key: "settings", icon: <SettingOutlined /> },
    {
      label: darkMode ? "Light Mode" : "Dark Mode",
      key: "darkMode",
      icon: <BulbOutlined />,
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "darkMode") {
      setDarkMode((prevMode) => !prevMode);
    } else {
      setCurrentPage(key);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div className="main-content">
            <div className="top">
              <div className="top-left">
                <div className="section account-info">

                <div className="account-detail-title">
                  <div>
                    <h2>Account Information</h2>
                  </div>
                  
                  <div className="account-switch">
                    <button onClick={switchAccount} className="switch-btn">Next Account</button>
                  </div>
                </div>
                <div className={`account-details-box ${isAccountSwitching ? 'hide' : 'show'}`}>
                  <div className="account-detail">
                    <strong>Account Number:</strong>
                    <p>{accounts[currentAccount].number}</p>
                  </div>
                  <div className="account-detail">
                    <strong>Account Balance (LKR):</strong>
                    <p>{accounts[currentAccount].balance}</p>
                  </div>
                  </div>
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
              </div>

              <div className="section favorites">
                <h2>My Favorites</h2>
                <p>No favorites added yet.</p>
              </div>
            </div>

            <div className="section recent-activity">
              <h2>Recent Activity</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Activity</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-12-01</td>
                    <td>Transfer</td>
                    <td>LKR 10,000</td>
                    <td className="status completed">Completed</td>
                  </tr>
                  <tr>
                    <td>2024-12-01</td>
                    <td>Bill Payment</td>
                    <td>LKR 2,234</td>
                    <td className="status completed">Completed</td>
                  </tr>
                  <tr>
                    <td>2024-12-01</td>
                    <td>Reload</td>
                    <td>LKR 299</td>
                    <td className="status completed">Completed</td>
                  </tr>
                  <tr>
                    <td>2024-12-01</td>
                    <td>Reload</td>
                    <td>LKR 299</td>
                    <td className="status failed">Failed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "wallet":
        return (
          <div>
            <h2>My Wallet</h2>
            <p>Wallet functionality is under construction.</p>
          </div>
        );
      case "favorites":
        return (
          <div>
            <h2>Favorites</h2>
            <p>Favorites functionality is under construction.</p>
          </div>
        );
      case "history":
        return (
          <div>
            <h2>History</h2>
            <p>History functionality is under construction.</p>
          </div>
        );
      case "help":
        return (
          <div>
            <h2>Help Center</h2>
            <p>Help Center functionality is under construction.</p>
          </div>
        );
      case "settings":
        return (
          <div>
            <h2>Settings</h2>
            <p>Settings functionality is under construction.</p>
          </div>
        );
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  const accounts = [
    {
      number: "2001238901",
      balance: "1,000,000",
    },
    {
      number: "2009876543",
      balance: "500,000",
    },
  ];

  const switchAccount = () => {
    setIsAccountSwitching(true);
    setTimeout(() => {
      setCurrentAccount((prevAccount) => (prevAccount + 1) % accounts.length); // Switch account
      setIsAccountSwitching(false); // Start the showing animation
    }, 200);
  };

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
      

      {/* Top Icons */}
      <div className="top-icons">
        <div className="logo-container">
          <img src="/logo_icon.png" alt="Bank Logo" className="bank-logo" />
        </div>
        <button className="notification-btn">🔔</button>
        <select className="language-select">
          <option value="en">English</option>
          <option value="si">සිංහල</option>
          <option value="ta">தமிழ்</option>
        </select>
        <button className="logout-btn" onClick={() => handleLogout()}>Logout</button>
      </div>

      <div className="content">
        {/* Sidebar */}
        <aside className="sidebar">
          <Menu
            onClick={handleMenuClick}
            mode="inline"
            selectedKeys={[currentPage]}
            items={menuItems}
            theme={darkMode ? "dark" : "light"}
          />
        </aside>

        {/* Main Content */}
        <main className="main-content-container">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
