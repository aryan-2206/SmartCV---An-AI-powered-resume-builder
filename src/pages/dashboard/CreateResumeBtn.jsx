// src/components/dashboard/CreateResumeBtn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // ← NEW
import { createResume } from "../../services/resumeService";
import "./dashboard.css";

const CreateResumeBtn = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // ← reads from shared context — always up to date
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateClick = async () => {
    if (!user || isCreating) return;

    setIsCreating(true);
    try {
      const newResumeData = {
        title: "Untitled Resume",
        template: "jakes-classic",
        name: user.username || "",
        email: user.email || "",
        experience: [],
        education: [],
        projects: [],
        skills: [],
        customSections: [],
      };

      const savedResume = await createResume(newResumeData);
      navigate(`/templates/${savedResume._id}`);
    } catch (error) {
      console.error("Creation failed:", error);
      alert("Could not create resume. Please check your connection.");
    } finally {
      setIsCreating(false);
    }
  };

  // While auth context is still verifying the stored token, show nothing
  // (prevents the flash of "Login" button for already-logged-in users)
  if (loading) return null;

  return (
    <div className="create-resume-wrapper">
      {user ? (
        <button
          className="create-resume-btn"
          onClick={handleCreateClick}
          disabled={isCreating}
        >
          {isCreating ? (
            <Loader2 className="animate-spin" size={22} />
          ) : (
            <Plus size={22} strokeWidth={2.5} />
          )}
          <span>{isCreating ? "Creating..." : "Create New Resume"}</span>
        </button>
      ) : (
        <div className="login-first-cta">
          <p className="login-first-text">
            Sign in or register to create and manage your resumes
          </p>
          <button className="start-creating-btn" onClick={() => navigate("/login")}>
            <LogIn size={20} strokeWidth={2.5} />
            <span>Start creating</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateResumeBtn;