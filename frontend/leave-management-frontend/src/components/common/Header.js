// src/components/common/Header.js
import React from "react";
import { useLocation } from "react-router-dom";

const Header = ({ onMenuClick, user }) => {
  const location = useLocation();

  // hide user + menu on login/register pages
  const hideHeaderContent =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#2c3e50",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        zIndex: 1001,
      }}
    >
      {/* Hamburger Button */}
      {!hideHeaderContent && (
        <button
          onClick={onMenuClick}
          style={{
            fontSize: "24px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}

      {/* App title */}
      <h2 style={{ margin: 0, fontSize: "18px" }}>
        Leave Management System
      </h2>

      {/* Right side: User */}
      {!hideHeaderContent && <span>{user?.name} : {user?.role}</span>}
    </header>
  );
};

export default Header;
