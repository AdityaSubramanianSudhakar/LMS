// src/pages/Dashboard/Dashboard.js
import React, { useEffect, useState } from "react";
import { getNotificationsByUserId } from "../../api/notificationApi";
import { getAllLeaveRequests, getLeaveRequestsByEmployee } from "../../api/leaveRequestApi";
import LeaveCalendar from "../../components/dashboard/LeaveCalendar";
import { ROLE_ADMIN, ROLE_MANAGER, ROLE_EMPLOYEE } from "../../utils/constants";
import Layout from "../../components/common/Layout";
import { parseISO, differenceInDays } from "date-fns"; // ✅ for date calculation


const Dashboard = () => {
  const [, setNotifications] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  getNotificationsByUserId(user.id)
    .then(res => setNotifications(res.data || [])) // default to empty array
    .catch(err => console.error(err));

  getLeaveRequestsByEmployee(user.id)
      .then((res) => {
        const leaves = res.data || [];

        // take only approved leaves
        const approvedLeaves = leaves.filter(
          (leave) => leave.status === "APPROVED"
        );

        // calculate days for each leave request
        const totalDays = approvedLeaves.reduce((sum, leave) => {
          const start = parseISO(leave.startDate);
          const end = parseISO(leave.endDate);
          return sum + (differenceInDays(end, start) + 1); // +1 because inclusive
        }, 0);

        setTotalLeaves(totalDays);
      })
      .catch((err) => console.error(err));

    if (user.role === ROLE_MANAGER || user.role === ROLE_ADMIN) {
    getAllLeaveRequests()
      .then((res) => {
        const pending = res.data.filter((lr) => lr.status === "PENDING");
        setPendingApprovals(pending.length);
      })
      .catch((err) => console.error(err));
  }
}, [user.id, user.role]);


  return (
    <Layout>
      <h2>Welcome, {user?.name}</h2>

      <div className="summary-cards">
        {user.role === ROLE_EMPLOYEE && (
          <div className="card">
            <h3>Total Leaves Taken</h3>
            <p>{totalLeaves} days</p>
          </div>
        )}

        {(user.role === ROLE_MANAGER || user.role === ROLE_ADMIN) && (
          <div className="card">
            <h3>Pending Approvals</h3>
            <p>{pendingApprovals}</p>
          </div>
        )}

        {/* <div className="card"> */}
          {/* <h3>Notifications</h3>
          <p>{notifications.filter((n) => !n.read).length}</p>
        </div> */}
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        {user.role === ROLE_EMPLOYEE && (
          <button onClick={() => (window.location.href = "/apply-leave")}>
            Apply for Leave
          </button>
        )}

        <button
            onClick={() =>
              (window.location.href =
                user.role === ROLE_EMPLOYEE ? "/leave-requests" : "/leave-approvals")
            }
          >
            {user.role === ROLE_EMPLOYEE
              ? "My Leave Requests"
              : "View Leave Requests"}
          </button>


        {user.role === ROLE_ADMIN && (
          <button onClick={() => (window.location.href = "/users")}>
            Manage Users
          </button>
        )}
        {user?.role === ROLE_EMPLOYEE && (
        <LeaveCalendar employeeId={user.id} />
      )}
      </div>
    </Layout>
  );
};

export default Dashboard;
