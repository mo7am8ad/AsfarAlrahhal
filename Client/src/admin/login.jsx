import React, { useState } from "react";
import './Css/login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.asfaralrahhal.net/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("token", data.token); // Store token in localStorage
        window.location.href = "/admin/dashboard"; // Redirect to dashboard after login
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="LoginPageContianer">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
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
    </div>
  );
};

export default Login;
