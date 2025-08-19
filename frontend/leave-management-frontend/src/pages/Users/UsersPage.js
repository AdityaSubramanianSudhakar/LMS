// src/pages/Users/UsersPage.js
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";
import EmployeeList from "../../components/user/EmployeeList";

const UsersPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setEmployees(res))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div>
      <h2>Employee Management</h2>
      {employees.length > 0 ? (
        <EmployeeList employees={employees} />
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default UsersPage;
