import React, { useState } from "react";
import { createLeaveRequest } from "../../api/leaveRequestApi";
import Layout from "../common/Layout";

const LeaveRequestForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "PENDING",
  });
  const [loading, setLoading] = useState(false);

  const leaveTypes = ["Sick", "Vacation", "Personal"]; // hardcoded

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { ...form, employeeId: user.id };

    createLeaveRequest(payload)
      .then(() => {
        alert("Leave request submitted successfully!");
        setForm({ leaveType: "", startDate: "", endDate: "", reason: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit leave request");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Leave Type:</label>
          <select name="leaveType" value={form.leaveType} onChange={handleChange} required>
            <option value="">Select Type</option>
            {leaveTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Reason:</label>
          <textarea name="reason" value={form.reason} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
      </form>
    </Layout>
  );
};

export default LeaveRequestForm;
