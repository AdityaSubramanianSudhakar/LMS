import React, { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post("/auth/login", { username, password });
    console.log(response);

    localStorage.setItem("token", response.data.token);

    // Store full user details instead of just username
    const user = {
      id: response.data.id,
      name: response.data.username,
      email: response.data.email,
      role: response.data.role
    };
    localStorage.setItem("user", JSON.stringify(user));

    console.log("logged in");
    navigate("/dashboard");
  } catch (err) {
    setError("Invalid username or password");
  }
};


  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {/* 👇 Register option */}
      <p>
        Don’t have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
    
  );
}

export default Login;
