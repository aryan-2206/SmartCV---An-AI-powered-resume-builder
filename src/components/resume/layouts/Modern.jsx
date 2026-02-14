export default function Modern({ data }) {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        color: "#111",
        minHeight: "100%",
      }}
    >
      {/* LEFT SIDEBAR - always show structure */}
      <div
        style={{
          width: "30%",
          padding: "16px 12px",
          borderRight: "1px solid #ddd",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h1 style={{ fontSize: "20px", marginBottom: "6px", fontWeight: "bold" }}>
          {data.name || "Your Name"}
        </h1>
        <p style={{ marginTop: 0, marginBottom: "8px", fontSize: "11px", color: "#555" }}>
          {data.title || "Professional Title"}
        </p>

        {/* Contact: phone, email, linkedin, github */}
        <section style={{ marginTop: "12px", marginBottom: "12px" }}>
          <h3 style={sideTitle}>Contact</h3>
          <div style={contactItem}>{data.phone || "Phone"}</div>
          <div style={contactItem}>{data.email || "Email"}</div>
          <div style={contactItem}>{data.linkedin || "LinkedIn"}</div>
          <div style={contactItem}>{data.github || "GitHub"}</div>
          {data.location && <div style={contactItem}>{data.location}</div>}
        </section>

        {/* Skills - always show */}
        <section style={{ marginTop: "12px" }}>
          <h3 style={sideTitle}>Skills</h3>
          <ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
            {data.skills && data.skills.length > 0 ? (
              data.skills.map((skill, i) => (
                <li key={i} style={{ marginBottom: "4px", fontSize: "11px" }}>{skill}</li>
              ))
            ) : (
              <li style={{ marginBottom: "4px", fontSize: "11px", color: "#666" }}>e.g. React, Python</li>
            )}
          </ul>
        </section>

        {/* Certifications - always show heading */}
        <section style={{ marginTop: "12px" }}>
          <h3 style={sideTitle}>Certifications</h3>
          {data.certifications && data.certifications.length > 0 ? (
            data.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: "6px", fontSize: "10px" }}>
                <strong>{cert.name || "Certification"}</strong>
                {cert.issuer && <div style={{ color: "#666" }}>{cert.issuer}</div>}
                {cert.year && <div style={{ color: "#666" }}>{cert.year}</div>}
              </div>
            ))
          ) : (
            <div style={{ fontSize: "10px", color: "#666" }}>Name, Issuer, Year</div>
          )}
        </section>
      </div>

      {/* RIGHT MAIN CONTENT - always show section headings */}
      <div style={{ width: "70%", padding: "16px 12px" }}>
        {/* Summary */}
        <section style={{ marginBottom: "16px" }}>
          <h2 style={mainTitle}>Summary</h2>
          <p style={{ marginTop: "4px", textAlign: "justify", lineHeight: "1.6", color: data.summary ? "#111" : "#666" }}>
            {data.summary || "Brief professional summary..."}
          </p>
        </section>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section style={{ marginBottom: "16px" }}>
            <h2 style={mainTitle}>Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div>
                  <strong>{edu.degree || "Degree"}</strong>
                  {(edu.institute || edu.location) && (
                    <span>, {edu.institute || "Institute"} {edu.location ? `— ${edu.location}` : ""}</span>
                  )}
                </div>
                <div style={{ fontSize: "11px", color: "#555" }}>
                  {edu.year || "Year"}
                  {edu.gpa && <span> | GPA: {edu.gpa}</span>}
                  {edu.honors && <span> | {edu.honors}</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: "16px" }}>
            <h2 style={mainTitle}>Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div style={{ marginBottom: "4px" }}>
                  <strong style={{ fontSize: "12px" }}>{exp.role || "Role"}</strong>
                  {(exp.company || exp.location) && (
                    <span> – {exp.company || "Company"}{exp.location ? `, ${exp.location}` : ""}</span>
                  )}
                </div>
                <div style={{ fontSize: "11px", color: "#555", marginBottom: "4px" }}>
                  {exp.year || "Year"}
                </div>
                {exp.description && Array.isArray(exp.description) && (
                  <ul style={{ margin: "4px 0 0 0", paddingLeft: "20px" }}>
                    {exp.description.map((desc, idx) => (
                      <li key={idx} style={{ marginBottom: "3px", fontSize: "11px", lineHeight: "1.5" }}>
                        {desc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section style={{ marginBottom: "16px" }}>
            <h2 style={mainTitle}>Projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div>
                  <strong>{proj.name || "Project Name"}</strong>
                  {proj.year && <span> ({proj.year})</span>}
                </div>
                <div style={{ fontSize: "11px", marginTop: "3px", lineHeight: "1.5", color: proj.description ? "#111" : "#666" }}>
                  {proj.description || "Description"}
                </div>
                {proj.tech && proj.tech.length > 0 && (
                  <div style={{ fontSize: "10px", color: "#666", marginTop: "3px", fontStyle: "italic" }}>
                    {proj.tech.join(" • ")}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title || a.description) && (
          <section>
            <h2 style={mainTitle}>Achievements</h2>
            {data.achievements.map((ach, i) => (
              (ach.title || ach.description) && (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <strong>{ach.title}</strong>
                  {ach.year && <span> ({ach.year})</span>}
                  {ach.description && <div style={{ fontSize: "11px", marginTop: "3px", lineHeight: "1.5" }}>{ach.description}</div>}
                </div>
              )
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

const mainTitle = {
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "6px",
  marginTop: "8px",
  borderBottom: "2px solid #06B6D4",
  paddingBottom: "4px",
  color: "#06B6D4",
};

const sideTitle = {
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: "6px",
  marginTop: "8px",
  color: "#333",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const contactItem = {
  fontSize: "10px",
  marginBottom: "4px",
  color: "#555",
  wordBreak: "break-word",
};