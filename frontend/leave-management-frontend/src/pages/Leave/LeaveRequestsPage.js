// src/pages/Leave/LeaveRequestsPage.js
import React, { useState, useEffect } from "react";
import LeaveRequestList from "../../components/leave/LeaveRequestList";
import { getCurrentUser } from "../../utils/auth";

const LeaveRequestsPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser(); // Fetch current user info from token
    setUser(currentUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <h1>Leave Requests</h1>
      <LeaveRequestList userId={user.id} status={null} />
    </div>
  );
};

export default LeaveRequestsPage;
