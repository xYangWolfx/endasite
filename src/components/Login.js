import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    const userCredentials = {
      username: "endacoimbra",
      password: "endacoimbra",
    };

    if (
      username === userCredentials.username &&
      password === userCredentials.password
    ) {
      // Clear any previous error and trigger the login as user
      setError("");
      onLogin("user");
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Login Page</h2>
      <div className="formGroup">
        <div className="username">
          <label className="label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
        <div className="password">
          <label className="label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button onClick={handleLoginClick} className="button">
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
