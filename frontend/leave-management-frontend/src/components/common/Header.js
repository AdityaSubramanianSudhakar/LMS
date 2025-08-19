// src/components/common/Header.js
import React from "react";

const Header = ({ onMenuClick, user }) => {
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

      {/* App title or user info */}
      <h2 style={{ margin: 0, fontSize: "18px" }}>
        Leave Management System
      </h2>

      {/* Right side: User */}
      <span>{user?.name} : {user?.role}</span>
    </header>
  );
};

export default Header;
