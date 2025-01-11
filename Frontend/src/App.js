import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn("true");
    localStorage.setItem('isLoggedIn', true);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn("false");
    localStorage.setItem('isLoggedIn', false);
  };

  function isSetToTrue(variable) {
    console.log("isSetToTrue ", variable)
    return variable && variable === "true"
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isSetToTrue(isLoggedIn) ? < Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={isSetToTrue(isLoggedIn) ? <Dashboard onLogout={handleLogoutSuccess} replace /> : < Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
