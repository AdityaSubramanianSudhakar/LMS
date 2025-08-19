import React, { useEffect, useState } from "react";
import { getAllLeaveRequests, updateLeaveStatus } from "../../api/leaveRequestApi";
import Loader from "../common/Loader";
import Layout from "../common/Layout";

const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await getAllLeaveRequests();
      setLeaves(res.data || []);
    } catch (err) {
      console.error("Failed to fetch leave requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      fetchLeaves(); // refresh list
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <Layout>
    <div>
      <h2>Pending Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.employeeId}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === "PENDING" && (
                  <>
                    <button onClick={() => handleStatusChange(leave.id, "APPROVED")}>
                      Approve
                    </button>
                    <button onClick={() => handleStatusChange(leave.id, "REJECTED")}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default LeaveApproval;
