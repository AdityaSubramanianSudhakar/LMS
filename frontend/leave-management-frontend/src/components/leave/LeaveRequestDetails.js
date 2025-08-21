import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLeaveRequestById } from "../../api/leaveRequestApi";
import Layout from "../common/Layout";

const LeaveRequestDetails = ({ onClose }) => {
  const { leaveId } = useParams(); // Read leaveId from URL
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeave = async () => {
      if (!leaveId) return;
      setLoading(true);
      setError("");
      try {
        const response = await getLeaveRequestById(leaveId);
        setRequest(response.data);
      } catch (err) {
        console.error("Failed to fetch leave request", err);
        setError("Failed to load leave request details.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeave();
  }, [leaveId]);
  
  if (!leaveId) return <p>No leave selected.</p>;

  return (
    <Layout>
    <div className="leave-details">
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {request && (
          <div className="leave-details">
            <h3>Leave Request #{request.id}</h3>
            <p><strong>Type:</strong> {request.leaveType}</p>
            <p><strong>Start Date:</strong> {request.startDate}</p>
            <p><strong>End Date:</strong> {request.endDate}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  request.status === "APPROVED"
                    ? "approved"
                    : request.status === "REJECTED"
                    ? "rejected"
                    : "pending"
                }
              >
                {request.status}
              </span>
            </p>
            <p><strong>Reason:</strong> {request.reason || "Not provided"}</p>
            {request.status === "REJECTED" && (
              <p><strong>Rejection Reason:</strong> {request.rejectionReason || "Not provided"}</p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
    </Layout>
  );
};

export default LeaveRequestDetails;
