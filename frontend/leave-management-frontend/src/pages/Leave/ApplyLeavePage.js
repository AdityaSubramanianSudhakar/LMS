// src/pages/Leave/ApplyLeavePage.js
import React from "react";
import LeaveRequestForm from "../../components/leave/LeaveRequestForm";
import Layout from "../../components/common/Layout";

const ApplyLeavePage = () => {
  return (
    <Layout>
    <div className="page-container">
      <LeaveRequestForm />
    </div>
    </Layout>
  );
};

export default ApplyLeavePage;
