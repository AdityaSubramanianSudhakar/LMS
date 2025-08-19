// src/components/common/Layout.js
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ display: "flex" }}>
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} user={user} />

      {/* Sidebar */}
      <Sidebar user={user} isOpen={sidebarOpen} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
            zIndex: 900,
          }}
        ></div>
      )}

      {/* Page content */}
      <main
        style={{
          flex: 1,
          padding: "80px 20px 20px 20px", // push down for header
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
