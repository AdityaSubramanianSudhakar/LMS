// src/pages/Dashboard/Dashboard.js
import React, { useEffect, useState } from "react";
import { getLeaveBalancesByUserId } from "../../api/leaveBalanceApi";
import { getNotificationsByUserId } from "../../api/notificationApi";
import { ROLE_ADMIN, ROLE_MANAGER, ROLE_EMPLOYEE } from "../../utils/constants";
import Layout from "../../components/common/Layout";

const Dashboard = () => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  getNotificationsByUserId(user.id)
    .then(res => setNotifications(res.data || [])) // default to empty array
    .catch(err => console.error(err));

  getLeaveBalancesByUserId(user.id)
    .then(res => setLeaveBalances(res.data || []))
    .catch(err => console.error(err));
}, [user.id]);


  return (
    <Layout>
      <h2>Welcome, {user?.name}</h2>

      <div className="summary-cards">
        {user.role === ROLE_EMPLOYEE && (
          <div className="card">
            <h3>Leave Balance</h3>
            <p>
              {leaveBalances.reduce((sum, lb) => sum + lb.remainingDays, 0) || 0}{" "}
              days
            </p>
          </div>
        )}

        {(user.role === ROLE_MANAGER || user.role === ROLE_ADMIN) && (
          <div className="card">
            <h3>Pending Approvals</h3>
            <p>5</p>
          </div>
        )}

        <div className="card">
          <h3>Notifications</h3>
          <p>{notifications.filter((n) => !n.read).length}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        {user.role === ROLE_EMPLOYEE && (
          <button onClick={() => (window.location.href = "/apply-leave")}>
            Apply for Leave
          </button>
        )}

        <button onClick={() => (window.location.href = "/leave-requests")}>
          {user.role === ROLE_EMPLOYEE
            ? "My Leave Requests"
            : "View Leave Requests"}
        </button>

        {user.role === ROLE_ADMIN && (
          <button onClick={() => (window.location.href = "/users")}>
            Manage Users
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
