// src/components/leave/LeaveRequestDetails.js
import React, { useState } from "react";

const LeaveRequestDetails = ({ request }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>View</button>
      {show && (
        <div className="modal">
          <h3>Leave Request #{request.id}</h3>
          <p><strong>Type:</strong> {request.leaveTypeName}</p>
          <p><strong>Start:</strong> {request.startDate}</p>
          <p><strong>End:</strong> {request.endDate}</p>
          <p><strong>Status:</strong> {request.status}</p>
          <p><strong>Reason:</strong> {request.reason}</p>
          {request.status === "REJECTED" && <p><strong>Rejection Reason:</strong> {request.rejectionReason}</p>}
          <button onClick={() => setShow(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default LeaveRequestDetails;
