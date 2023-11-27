import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Endapendentes from "./components/Endapendentes";
import Login from "./components/Login";
import Plenarios from "./components/Plenarios";
import Home from "./components/Home";

function AppRoutes({ loggedInUser, handleLogin }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/plenarios"
        element={loggedInUser && loggedInUser.isLoggedIn ? <Plenarios userInfo={loggedInUser} /> : <Navigate to="/login" />}
      />
      <Route
        path="/endapendentes"
        element={loggedInUser && loggedInUser.isLoggedIn ? <Endapendentes /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={
          !loggedInUser ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
