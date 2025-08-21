// src/pages/Users/UsersPage.js
import React, { useEffect, useState } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "../../api/userApi";
import Loader from "../../components/common/Loader";
import Layout from "../../components/common/Layout";

const UsersPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formEmployee, setFormEmployee] = useState({ name: "", email: "", role: "EMPLOYEE", password: "" });
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users
  const fetchUsers = () => {
    setLoading(true);
    getAllUsers()
      .then((res) => setEmployees(res.data || []))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const handleAdd = () => {
    if (!formEmployee.name || !formEmployee.email || !formEmployee.password) return;
    createUser(formEmployee)
      .then(() => {
        setFormEmployee({ name: "", email: "", role: "EMPLOYEE", password: "" });
        fetchUsers();
      })
      .catch((err) => console.error("Error creating user:", err));
  };

  // Edit user
  const handleEdit = (employee) => {
    setEditingEmployeeId(employee.id);
    setFormEmployee({
      name: employee.name || "",
      email: employee.email || "",
      role: employee.role || "EMPLOYEE",
      password: "" // do not prefill password
    });
  };

  const handleUpdate = () => {
    const updateData = { ...formEmployee };
    delete updateData.password; // remove password field when updating
    updateUser(editingEmployeeId, updateData)
      .then(() => {
        setEditingEmployeeId(null);
        setFormEmployee({ name: "", email: "", role: "EMPLOYEE", password: "" });
        fetchUsers();
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  // Delete user
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    deleteUser(id)
      .then(() => fetchUsers())
      .catch((err) => console.error("Error deleting user:", err));
  };

  // Filter employees by search term
  const filteredEmployees = employees.filter((emp) =>
    (emp.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.role || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <Layout>
    <div>
      <h2>Employee Management</h2><br></br>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", width: "300px", padding: "5px" }}
      />

      

      {/* Employee Table */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length ? (
            filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>
                  <button onClick={() => handleEdit(emp)} style={{ marginRight: "5px" }}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <br></br><br></br><br></br>
    </div>
    {/* Add/Edit Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={formEmployee.name}
          onChange={(e) => setFormEmployee({ ...formEmployee, name: e.target.value })}
          style={{ marginRight: "5px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={formEmployee.email}
          onChange={(e) => setFormEmployee({ ...formEmployee, email: e.target.value })}
          style={{ marginRight: "5px" }}
        />
        {!editingEmployeeId && (
          <input
            type="password"
            placeholder="Password"
            value={formEmployee.password}
            onChange={(e) => setFormEmployee({ ...formEmployee, password: e.target.value })}
            style={{ marginRight: "5px" }}
          />
        )}
        <select
          value={formEmployee.role}
          onChange={(e) => setFormEmployee({ ...formEmployee, role: e.target.value })}
          style={{ marginRight: "5px" }}
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="MANAGER">Manager</option>
          <option value="ADMIN">Admin</option>
        </select>
        {editingEmployeeId ? (
          <>
            <button onClick={handleUpdate} style={{ marginRight: "5px" }}>Update</button>
            <button
              onClick={() => {
                setEditingEmployeeId(null);
                setFormEmployee({ name: "", email: "", role: "EMPLOYEE", password: "" });
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
    </Layout>
  );
};

export default UsersPage;
