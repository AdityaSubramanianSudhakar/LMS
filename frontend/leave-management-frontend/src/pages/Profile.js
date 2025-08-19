import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "../api/userApi";
import Layout from "../components/common/Layout";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    role: ""
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      getUserById(user.id)
        .then((res) => {
          const data = res.data || res;
          setProfile({
            id: data.id,
            name: data.name || "",
            email: data.email || "",
            role: data.role || ""
          });
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser(profile.id, { name: profile.name })
  .then(res => {
    const updatedProfile = {
      ...profile,
      name: res.data?.name || profile.name
    };
    setProfile(updatedProfile);
    localStorage.setItem("user", JSON.stringify(updatedProfile));
    setEditMode(false);
  })


  };

  return (
    <Layout>
      <h2>My Profile</h2>

      {!editMode ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <button onClick={() => setEditMode(true)}>Edit Name</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
            />

          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={profile.email} disabled />
          </div>
          <div>
            <label>Role:</label>
            <input type="text" value={profile.role} disabled />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      )}
    </Layout>
  );
};

export default Profile;
