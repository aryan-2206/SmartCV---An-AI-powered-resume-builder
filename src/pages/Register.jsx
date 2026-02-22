// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // ← NEW
import "../App.css";

const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE_URL = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ← NEW

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          username: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      if (token) {
        // update global auth state immediately after register too
        login(user, token);
        navigate("/");
      } else {
        alert("Account created! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      alert(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <div className="logo">
          Smart<span className="logo-highlight">CV</span>
        </div>
        <h2>Create Account</h2>
        <p className="subtitle">Start building your AI Resume</p>

        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;