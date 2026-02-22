// src/components/dashboard/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // ← NEW
import "./dashboard.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ← reads from shared context — always up to date

  const handleLogout = () => {
    logout();          // clears localStorage + resets context user to null
    navigate("/login");
  };

  return (
    <nav className="navbarDashboard">
      <div className="nav-containerDashboard">
        <div
          className="logoDashboard"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Smart<span>CV</span>
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-profile-wrapper">
              <div className="user-profile-nav">
                <span className="user-name-label">
                  {user.username || (user.email ? user.email.split("@")[0] : "User")}
                </span>
                <div className="profile-circle-container">
                  <span className="profile-initial">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;