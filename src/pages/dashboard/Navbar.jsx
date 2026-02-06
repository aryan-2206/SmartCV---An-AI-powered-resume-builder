import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Added signOut
import { LogOut } from "lucide-react"; // Nice icon for logout
import "./dashboard.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
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
              {" "}
              {/* New wrapper for hover logic */}
              <div className="user-profile-nav">
                <span className="user-name-label">
                  {user.displayName ||
                    (user.email ? user.email.split("@")[0] : "User")}
                </span>
                <div className="profile-circle-container">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="avatar"
                      className="nav-avatar-img"
                    />
                  ) : (
                    <span className="profile-initial">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              {/* DROPDOWN MENU */}
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
