import React, { useEffect, useState } from "react";
import { getAllLeaveRequests } from "../../api/leaveRequestApi";
import Loader from "../../components/common/Loader";
import Layout from "../../components/common/Layout";

const AllLeavesPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllLeaveRequests()
      .then((res) => setLeaves(res.data || []))
      .catch((err) => console.error("Failed to fetch leave requests", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  if (!leaves.length) return <p>No leave requests found.</p>;

  return (
    <Layout>
    <div>
      <h2>All Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td className={`status-text ${leave.status}`}>{leave.status}</td>
              <td>{leave.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default AllLeavesPage;
