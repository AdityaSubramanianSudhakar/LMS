import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/userApi";
import Loader from "../common/Loader";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getUserById(id);
        setEmployee(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) return <Loader />;

  if (!employee) return <div>Employee not found</div>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Role:</strong> {employee.role}</p>
    </div>
  );
};

export default EmployeeDetails;
