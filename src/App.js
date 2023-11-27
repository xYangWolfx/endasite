import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");
    if (isLoggedIn === "true") {
      // If the user is logged in, set the user in the state
      setLoggedInUser({ userType, isLoggedIn: true });
    }
  }, []);

  const handleLogin = (userType) => {
    setLoggedInUser({ userType, isLoggedIn: true });
    // Save authentication status in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", "admin");
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    // Remove authentication status from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
  };

  return (
    <div className="App">
      <Router>
        <div>
          <Header loggedInUser={loggedInUser} handleLogout={handleLogout} />
          <main>
            <AppRoutes loggedInUser={loggedInUser} handleLogin={handleLogin} />
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
