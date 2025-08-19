// src/components/leave/LeaveRequestList.js
import React, { useEffect, useState } from "react";
import { getLeavesByUser } from "../../api/leaveApi"; // make sure this matches your API
import { useNavigate } from "react-router-dom"; 
import Loader from "../common/Loader";
import { getCurrentUser } from "../../utils/auth";
import Layout from "../common/Layout";

const LeaveRequestList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const currentUser = getCurrentUser();
        const response = await getLeavesByUser(currentUser.id);
        // Backend response is usually under response.data
        setLeaves(response.data || []);
      } catch (error) {
        console.error("Failed to fetch leave requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  if (loading) return <Loader />;

  if (!leaves.length) return <p>No leave requests found.</p>;

  return (
    <Layout>
    <div>
      <h2>My Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              {/* Clicking ID navigates to details page */}
              <td
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => navigate(`/leave/${leave.id}`)}
              >
                {leave.id}
              </td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default LeaveRequestList;
