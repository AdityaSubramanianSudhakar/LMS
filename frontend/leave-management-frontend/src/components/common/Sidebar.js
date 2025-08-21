// src/components/common/Sidebar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROLE_ADMIN, ROLE_MANAGER, ROLE_EMPLOYEE } from "../../utils/constants";

const Sidebar = ({ user, isOpen }) => {
  const navigate = useNavigate();
  if (!user) return null;

  // Base link: Dashboard always visible
  const links = [];

  // Role-based links
  if (user.role === ROLE_EMPLOYEE) {
    links.push(
      { to: "/profile", label: "Profile" },
      { to: "/apply-leave", label: "Apply Leave" },
      { to: "/leave-requests", label: "My Leave Requests" }
    );
  }

  if (user.role === ROLE_MANAGER) {
    links.push(
      { to: "/profile", label: "Profile" },
      { to: "/leave-approvals", label: "Leave Requests" }
    );
  }

  if (user.role === ROLE_ADMIN) {
    links.push(
      { to: "/profile", label: "Profile" },
      { to: "/users", label: "Manage Employees" },
      { to: "/all-leaves", label: "Leave Requests" }
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>

         {/* Dashboard at the top */}
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
        </li>

        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.label}
            </NavLink>
          </li>
        ))}

        {/* Logout always at bottom */}
        <li style={{ marginTop: "20px" }}>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "red",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
