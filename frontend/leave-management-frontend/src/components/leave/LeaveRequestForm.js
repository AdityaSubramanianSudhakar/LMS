import React, { useState, useEffect } from "react";
import { createLeaveRequest } from "../../api/leaveRequestApi";
import Layout from "../common/Layout";

const LeaveRequestForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const leaveTypes = ["Sick", "Vacation", "Personal"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  // Validate: start and end date should not be in the past
  const today = new Date();
  const start = new Date(form.startDate);
  const end = new Date(form.endDate);

  if (start < today.setHours(0,0,0,0) || end < today.setHours(0,0,0,0)) {
    setError("Cannot apply leave for past dates.");
    setLoading(false);
    return;
  }

  if (end < start) {
    setError("End date cannot be before start date.");
    setLoading(false);
    return;
  }

  try {
    await createLeaveRequest({ ...form, employeeId: user.id, status: "PENDING" });
    setSuccess("Leave request submitted successfully.");
    setForm({ leaveType: "", startDate: "", endDate: "", reason: "" });
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      setError(err.response.data.error);
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  // Clear success/error after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <Layout>
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Leave Type:</label>
          <select
            name="leaveType"
            value={form.leaveType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            {leaveTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </Layout>
  );
};

export default LeaveRequestForm;
