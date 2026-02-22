// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // ← NEW
import "../App.css";

const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE_URL = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ← NEW: get the context setter

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      if (token) {
        login(user, token);
        navigate("/");
      } else {
        alert("Login error: No token received from server.");
        setIsLoggingIn(false);
      }
    } catch (error) {
      const message = error.response?.data?.error || "Invalid Email or Password";
      alert(message);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <div className="logo">
          Smart<span className="logo-highlight">CV</span>
        </div>
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="footer-text">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
