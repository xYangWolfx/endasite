import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";
import logo from "./images/logo2.jpeg";

function Header({ loggedInUser, handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <header>
      <Link to="/">
        <img className="logo" src={logo} alt="logo.jpeg" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {loggedInUser && (
            <>
              <li>
                <Link to="/plenarios">Plenários</Link>
              </li>
              <li>
                <Link to="/endapendentes">Endapendentes</Link>
              </li>
              <li></li>
              <li>
                {loggedInUser.userType === "admin" && (
                  <div className="user-info">
                    <span style={{ color: "white" }}>Logged in as Admin</span>
                    <br />
                    <button onClick={handleLogoutClick}>Logout</button>
                  </div>
                )}
                {loggedInUser.userType === "user" && (
                  <div className="user-info">
                    <span style={{ color: "white" }}>Logged in as User</span>
                    <br />
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </>
          )}
          {!loggedInUser && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
