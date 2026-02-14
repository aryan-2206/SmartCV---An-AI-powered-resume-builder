export default function JakesClassic({ data }) {
  return (
    <div
      style={{
        fontFamily: "Times New Roman, serif",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#000",
        padding: "0 4px",
      }}
    >
      {/* HEADER - always show so user knows where to put what */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h1 style={{ fontSize: "22px", margin: "0 0 4px 0", fontWeight: "bold" }}>
          {data.name || "Your Name"}
        </h1>
        <div style={{ fontSize: "11px", marginBottom: "2px" }}>
          {data.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
          <span>{data.phone || "Phone"}</span>
          <span> | </span>
          <span>{data.email || "Email"}</span>
          <span> | </span>
          <span>{data.linkedin || "LinkedIn"}</span>
          <span> | </span>
          <span>{data.github || "GitHub"}</span>
        </div>
        {data.location && (
          <div style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>{data.location}</div>
        )}
      </div>

      <hr style={{ border: "0.5px solid black", margin: "8px 0" }} />

      {/* SUMMARY - always show heading */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={sectionTitle}>Summary</h2>
        <p style={{ margin: "4px 0", textAlign: "justify", color: data.summary ? "#000" : "#666" }}>
          {data.summary || "Brief professional summary..."}
        </p>
      </section>

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <section style={{ marginBottom: "10px" }}>
          <h2 style={sectionTitle}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div>
                <strong>{edu.degree}</strong>
                {edu.institute && <span>, {edu.institute}</span>}
                {edu.location && <span> — {edu.location}</span>}
              </div>
              <div style={{ fontSize: "11px", fontStyle: "italic" }}>
                {edu.year}
                {edu.gpa && <span> | GPA: {edu.gpa}</span>}
                {edu.honors && <span> | {edu.honors}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <section style={{ marginBottom: "10px" }}>
          <h2 style={sectionTitle}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ marginBottom: "2px" }}>
                <strong style={{ fontSize: "12px" }}>{exp.role}</strong>
                {exp.company && <span>, {exp.company}</span>}
                {exp.location && <span> — {exp.location}</span>}
              </div>
              <div style={{ fontStyle: "italic", fontSize: "11px", marginBottom: "4px" }}>
                {exp.year}
              </div>
              {exp.description && Array.isArray(exp.description) && (
                <ul style={{ margin: "4px 0 0 0", paddingLeft: "20px" }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginBottom: "2px", fontSize: "11px" }}>
                      {desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <section style={{ marginBottom: "10px" }}>
          <h2 style={sectionTitle}>Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div>
                <strong>{proj.name}</strong>
                {proj.year && <span> ({proj.year})</span>}
              </div>
              {proj.description && (
                <div style={{ fontSize: "11px", marginTop: "2px" }}>
                  {proj.description}
                </div>
              )}
              {proj.tech && proj.tech.length > 0 && (
                <div style={{ fontSize: "10px", fontStyle: "italic", marginTop: "2px" }}>
                  Technologies: {proj.tech.join(", ")}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS - always show heading */}
      <section style={{ marginBottom: "10px" }}>
        <h2 style={sectionTitle}>Skills</h2>
        <p style={{ margin: "4px 0", color: (data.skills && data.skills.length) ? "#000" : "#666" }}>
          {(data.skills && data.skills.length) ? data.skills.join(", ") : "e.g. React, Node.js, Python"}
        </p>
      </section>

      {/* ACHIEVEMENTS */}
      {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title || a.description) && (
        <section style={{ marginBottom: "10px" }}>
          <h2 style={sectionTitle}>Achievements</h2>
          {data.achievements.map((ach, i) => (
            (ach.title || ach.description) && (
              <div key={i} style={{ marginBottom: "6px" }}>
                <strong>{ach.title}</strong>
                {ach.year && <span> ({ach.year})</span>}
                {ach.description && <div style={{ fontSize: "11px", marginTop: "2px" }}>{ach.description}</div>}
              </div>
            )
          ))}
        </section>
      )}

      {/* CERTIFICATIONS (optional) */}
      {(data.certifications && data.certifications.length > 0 && data.certifications.some(c => c.name || c.issuer || c.year)) ? (
        <section>
          <h2 style={sectionTitle}>Certifications</h2>
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: "4px" }}>
              <strong>{cert.name || "Certification Name"}</strong>
              {cert.issuer && <span>, {cert.issuer}</span>}
              {cert.year && <span> ({cert.year})</span>}
            </div>
          ))}
        </section>
      ) : (
        <section>
          <h2 style={sectionTitle}>Certifications <span style={{ fontSize: "10px", fontWeight: "normal", color: "#666" }}>(optional)</span></h2>
          <div style={{ color: "#666", fontSize: "11px" }}>Certification name, Issuer, Year</div>
        </section>
      )}
    </div>
  );
}

const sectionTitle = {
  fontFamily: "Times New Roman, serif",
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "4px",
  marginTop: "8px",
  borderBottom: "1px solid black",
  paddingBottom: "2px",
  color: "#000",
};