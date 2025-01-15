import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Flex, Menu } from "antd";
import { Input, Button, Select, Checkbox  } from 'antd';
import {
  DashboardOutlined,
  WalletOutlined,
  HeartOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  BulbOutlined,
  BankOutlined,
  DollarOutlined,
  NumberOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const Dashboard = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(0);
  const [isAccountSwitching, setIsAccountSwitching] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showSendMoneyForm, setShowSendMoneyForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [sendAmount, setSendAmount] = useState("");
  const [sendBank, setSendBank] = useState("");
  const [sendAccNumber, setSendAccNumber] = useState("");
  const [sendName, setSendName] = useState("");
  const [sendRemarks, setSendRemarks] = useState("");
  const [addToFavorites, setAddToFavorites] = useState(false);
  const [sendSms, setSendSms] = useState(false);

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

  const handleCancelSendMoney = () => {
    // Reset form values
    setSendAmount("");
    setSendBank("");
    setSendAccNumber("");
    setSendName("");
    setSendRemarks("");
  
    // Hide the form
    setShowSendMoneyForm(false);
  };

  const handleCancelConfirmation = () => {
    // Reset form values
    setSendAmount("");
    setSendBank("");
    setSendAccNumber("");
    setSendName("");
    setSendRemarks("");

    setShowConfirmation(false);
    // setCurrentPage("dashboard"); // Go back to the dashboard
  };

  const handleSend = (e) => {
    setShowSendMoneyForm(false);
    setShowConfirmation(true); // Show confirmation window
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowSuccessMessage(true); // Show success message
  };

  const handleSuccessConfirmation = () => {
    setSendAmount("");
    setSendBank("");
    setSendAccNumber("");
    setSendName("");
    setSendRemarks("");
    
    setShowSuccessMessage(false); // Show success message
  };

  const renderSendMoneyForm = () => (
    <div className="send-money-form">
      <h2>Send Money</h2>
      <form  onSubmit={handleSend}>
          <div className="form-group">
            <Select size="large" value={currentAccount ? currentAccount : "none"} onChange={(value) => setCurrentAccount(value)} prefix={<BankOutlined />} >
            <Select.Option value="none">
                 Select Source Account
            </Select.Option>
              {accounts.map((account, index) => (
                <Select.Option key={index} value={account.number}>
                  {account.number} - LKR {account.balance}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <Input size="large" placeholder="Amount" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} prefix={<DollarOutlined />} />
          </div>
          <div className="form-group">
            <Select size="large" value={sendBank ? sendBank : "none"} onChange={(value) => setSendBank(value)} prefix={<BankOutlined />} >
            <Select.Option value="none">
                 Select Receiver Bank
            </Select.Option>
              {banks.map((bank, index) => (
                <Select.Option key={index} value={bank.name}>
                  {bank.name} {/* Display the actual bank name */}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <Input size="large" placeholder="Receiver Account Number" value={sendAccNumber} onChange={(e) => setSendAccNumber(e.target.value)} prefix={<NumberOutlined />} />
          </div>
          <div className="form-group">
            <Input size="large" placeholder="Receiver Name" value={sendName} onChange={(e) => setSendName(e.target.value)} prefix={<UserOutlined />} />
          </div>
          <div className="form-group">
            <Input size="large" placeholder="Remarks" value={sendRemarks} onChange={(e) => setSendRemarks(e.target.value)} prefix={<FileTextOutlined />} />
          </div>

          {/* Add the Checkboxes */}
          <Checkbox onChange={(value) => setAddToFavorites(value)}>Add to Favorites</Checkbox>
          <Checkbox onChange={(value) => setSendSms(value)}> Send SMS to Receiver</Checkbox>
          
          <div className="send-form-buttons">
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button type="primary" htmlType="submit"  >
                Send
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button color="danger" variant="solid"  htmlType="submit" onClick={handleCancelSendMoney}>
                Cancel
              </Button>
            </div>
          </div>
          
        </form>
    </div>
  );

  const renderConfirmation = () => (
    <div className="send-money-form">
      <h2>Payment Confirmation</h2>
      <p>
        <strong>From:</strong> {accounts[currentAccount]?.number}
      </p>
      <p>
        <strong>To:</strong> {sendName} ({sendAccNumber}) - {sendBank}
      </p>
      <p>
        <strong>Amount:</strong> {sendAmount}
      </p>
      <p>
        <strong>Remarks:</strong> {sendRemarks || "None"}
      </p>
      <p>
        <strong>Add to Favorites:</strong> {addToFavorites ? "Yes" : "No"}
      </p>
      <p>
        <strong>Send SMS:</strong> {sendSms ? "Yes" : "No"}
      </p>
      <div className="confirmation-buttons">
        <Button type="primary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button color="danger" variant="solid"  onClick={handleCancelConfirmation}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="send-success-form">
      <h2>Payment Successful</h2>
      <p>Your payment of {sendAmount} to {sendName} was successful!</p>
      <div className="succesful-buttons">
        <Button type="primary" onClick={handleSuccessConfirmation}>
          Back to Dashboard
        </Button>
      </div>
      
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        
        if (showConfirmation) {
          return (
            <div className="main-content">
              {renderConfirmation()}
            </div>
          )
        } else if (showSuccessMessage) {
          return (
            <div className="main-content">
              {renderSuccessMessage()}
            </div>
          )
        } else if (showSendMoneyForm) {
          return (
            <div className="main-content">
              {renderSendMoneyForm()}
            </div>
          )
        } else {
          // Original dashboard content
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
                        <button onClick={switchAccount} className="switch-btn">
                          Next Account
                        </button>
                      </div>
                    </div>
                    <div
                      className={`account-details-box ${
                        isAccountSwitching ? "hide" : "show"
                      }`}
                    >
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
                      <button onClick={() => setShowSendMoneyForm(true)}>
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
                    {transactions.reverse().slice(0,5).map((transaction, index) => (
                      <tr>
                        <td>{transaction.date}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.amount}</td>
                        <td className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          
          )
        }

      case "wallet":
        return (
          <div className="main-content">
            <div className="top">
              <div className="top-left">
                <div className="section account-info">
                  <div className="walltet-title">
                    <h1>My Wallet</h1>
                  </div>
                  <div className="wallet-account-detail-title">
                    <div>
                      <h2>Savings Accounts and Fixed Deposits</h2>
                    </div>

                    <div className="account-switch">
                      <button className="switch-btn">Open Account</button>
                    </div>
                  </div>

                  <div className="wallet-account-container">
                    {accounts.map((account, index) => (
                      <div className="wallet-account-details-box" key={index}>
                        <div className="account-detail">
                          <strong>Account Number:</strong>
                          <p>{account.number}</p>
                        </div>
                        <div className="account-detail">
                          <strong>Account Balance (LKR):</strong>
                          <p>{account.balance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  

                  <div className="account-detail-title">
                    <div>
                      <h2>Cards</h2>
                    </div>
                  </div>

                  <div className="wallet-account-container">
                    {cards.map((card, index) => (
                      <div className="wallet-account-details-box" key={index}>
                        <div className="account-detail">
                          <strong>Card Number:</strong>
                          <p>{card.number}</p>
                        </div>
                        <div className="account-detail">
                          <strong>Expire Date</strong>
                          <p>{card.expire}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      case "favorites":
        return (
          <div className="main-content">
            <div className="top">
              <div className="top-left">
                <div className="section account-info">
                  <div className="walltet-title">
                    <h1>Favorites</h1>
                    <div className="account-switch">
                      <button className="switch-btn">Add to favorites</button>
                    </div>
                  </div>
                  <div className="favorites-content">
                    <div className="favorite-content-box">
                      <h2>Send Money</h2>
                      <div className="actions">
                        <div className="fav-send-money-column">
                          <div className="fav-send-money-row">
                            <button>
                              <img src="/icons/send-money.png" alt="Mother - BOC" />
                              Mother BOC
                            </button>
                            <button>
                              <img src="/icons/send-money.png" alt="Nimal HNB" />
                              Nimal HNB
                            </button>
                            <button>
                              <img src="/icons/send-money.png" alt="Boarding Seylan" />
                              Boarding Seylan
                            </button>
                          </div>
                          <div className="fav-send-money-row">
                            <button>
                              <img src="/icons/send-money.png" alt="Mother - BOC" />
                              My Peoples
                            </button>
                          </div>
                        </div>
                        
                        
                      </div>
                    </div>

                    <div className="favorite-content-box">
                      <h2>Bill Payments</h2>
                      <div className="actions">
                        <button>
                          <img src="/icons/pay-bills.png" alt="Home CEB" />
                          Home CEB
                        </button>
                        <button>
                          <img src="/icons/pay-bills.png" alt="Home Water" />
                          Home Water
                        </button>
                        <button>
                          <img src="/icons/reloads.png" alt="My Mobitel" />
                          My Mobitel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="main-content">
            <div className="top">
              <div className="top-left">
                <div className="section account-info">
                  
                  <div className="section history-recent-activity">
                  <div className="history-walltet-title">
                    <h1>History</h1>
                  </div>
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
                        {transactions.map((transaction, index) => (
                          <tr>
                            <td>{transaction.date}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.amount}</td>
                            <td className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
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

  const cards = [
    {
      number: "2654-xxxx-xxxx-1349",
      expire: "2028/07"
    },
    {
      number: "5678-xxxx-xxxx-9876",
      expire: "2028/07"
    },
  ];

  const banks = [
    { name: "Bank of Ceylon" },
    { name: "People's Bank" },
    { name: "Commercial Bank" },
    { name: "Seylan Bank" },
    { name: "Hatton National Bank" },
  ];

  const transactions = [
    {
        "date": "2024-12-01",
        "type": "Transfer",
        "amount": "LKR 12,348",
        "status": "Completed"
    },
    {
        "date": "2024-12-02",
        "type": "Bill Payment",
        "amount": "LKR 3,278",
        "status": "Completed"
    },
    {
        "date": "2024-12-03",
        "type": "Reload",
        "amount": "LKR 299",
        "status": "Completed"
    },
    {
        "date": "2024-12-04",
        "type": "Transfer",
        "amount": "LKR 45,890",
        "status": "Pending"
    },
    {
        "date": "2024-12-05",
        "type": "Bill Payment",
        "amount": "LKR 4,567",
        "status": "Completed"
    },
    {
        "date": "2024-12-06",
        "type": "Reload",
        "amount": "LKR 480",
        "status": "Completed"
    },
    {
        "date": "2024-12-07",
        "type": "Transfer",
        "amount": "LKR 18,213",
        "status": "Completed"
    },
    {
        "date": "2024-12-08",
        "type": "Bill Payment",
        "amount": "LKR 2,135",
        "status": "Failed"
    },
    {
        "date": "2024-12-09",
        "type": "Reload",
        "amount": "LKR 149",
        "status": "Completed"
    },
    {
        "date": "2024-12-10",
        "type": "Transfer",
        "amount": "LKR 25,750",
        "status": "Completed"
    },
    {
        "date": "2024-12-11",
        "type": "Reload",
        "amount": "LKR 350",
        "status": "Pending"
    },
    {
        "date": "2024-12-12",
        "type": "Bill Payment",
        "amount": "LKR 1,896",
        "status": "Completed"
    },
    {
        "date": "2024-12-13",
        "type": "Transfer",
        "amount": "LKR 60,982",
        "status": "Completed"
    },
    {
        "date": "2024-12-14",
        "type": "Reload",
        "amount": "LKR 220",
        "status": "Failed"
    },
    {
        "date": "2024-12-15",
        "type": "Bill Payment",
        "amount": "LKR 4,394",
        "status": "Completed"
    }
]

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
    navigate("/");
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
        <button className="logout-btn" onClick={() => handleLogout()}>
          Logout
        </button>
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
