import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResumePreview from "../components/resume/ResumePreview";
import { setTemplate } from "../services/resumeService";

const TEMPLATES = [
  {
    id: "jakes-classic",
    name: "Jake’s Resume",
    desc: "Industry-standard academic & SWE resume",
  },
  {
    id: "modern",
    name: "Modern Professional",
    desc: "Two-column layout for industry roles",
  },
  {
    id: "minimal",
    name: "Minimal ATS",
    desc: "Clean, compact, ATS-friendly format",
  },
];

export default function TemplateSelect() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleContinue = async () => {
    await setTemplate(resumeId, selectedTemplate);
    navigate(`/builder/${resumeId}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      
      {/* HEADER */}
      <header style={{ marginBottom: "2rem" }}>
        <h1>Choose a Resume Template</h1>
        <p style={{ color: "#555" }}>
          Preview how your resume will look. You can change this later as per your details.
        </p>
      </header>

      {/* MAIN CONTENT */}
      <div style={{ display: "flex", gap: "2rem" }}>
        
        {/* LEFT: Template list */}
        <div style={{ width: "30%" }}>
          {TEMPLATES.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;

            return (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                style={{
                  border: isSelected ? "2px solid #000" : "1px solid #ccc",
                  padding: "1rem",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  background: isSelected ? "#f9f9f9" : "#fff",
                }}
              >
                <h3>{tpl.name}</h3>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  {tpl.desc}
                </p>

                {isSelected && (
                  <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                    ✓ Selected
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT: Live Preview */}
        <div
          style={{
            flex: 1,
            background: "#e5e5e5",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "1rem",
              minHeight: "80vh",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <ResumePreview template={selectedTemplate} />
          </div>
        </div>

      </div>

      {/* FOOTER ACTION */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          disabled={!selectedTemplate}
          onClick={handleContinue}
          style={{
            padding: "0.75rem 1.5rem",
            cursor: selectedTemplate ? "pointer" : "not-allowed",
          }}
        >
          Continue →
        </button>
      </div>

    </div>
  );
}
