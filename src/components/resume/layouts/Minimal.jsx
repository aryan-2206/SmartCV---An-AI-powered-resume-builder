export default function Minimal({ data }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "11px",
        lineHeight: "1.5",
        color: "#000",
        padding: "0 4px",
      }}
    >
      {/* NAME */}
      <div style={{ marginBottom: "12px" }}>
        <strong style={{ fontSize: "16px", fontWeight: "bold" }}>{data.name || "Your Name"}</strong>
        {data.title && (
          <div style={{ fontSize: "11px", marginTop: "2px", color: "#666" }}>{data.title}</div>
        )}
        {/* Contact: phone, email, linkedin, github */}
        <div style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}>
          {data.phone || "Phone"} • {data.email || "Email"} • {data.linkedin || "LinkedIn"} • {data.github || "GitHub"}
        </div>
        {data.location && (
          <div style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>{data.location}</div>
        )}
      </div>

      {/* SUMMARY */}
      <section style={{ marginBottom: "10px" }}>
        <strong style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          SUMMARY
        </strong>
        <p style={{ margin: "4px 0", textAlign: "justify", color: data.summary ? "#000" : "#666" }}>{data.summary || "Brief professional summary..."}</p>
      </section>

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <section style={{ marginBottom: "10px" }}>
          <strong style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            EDUCATION
          </strong>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginTop: "4px" }}>
              <div>
                <strong>{edu.degree || "Degree"}</strong>
                {(edu.institute || edu.location) && <span>, {edu.institute || "Institute"} {edu.location ? `— ${edu.location}` : ""}</span>}
              </div>
              <div style={{ fontSize: "10px", color: "#555" }}>
                {edu.year || "Year"}
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
          <strong style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            EXPERIENCE
          </strong>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginTop: "6px" }}>
              <div style={{ marginBottom: "2px" }}>
                <strong>{exp.role || "Role"}</strong>
                {(exp.company || exp.location) && <span>, {exp.company || "Company"} {exp.location ? `— ${exp.location}` : ""}</span>}
                {exp.year && <span> ({exp.year})</span>}
              </div>
              {exp.description && Array.isArray(exp.description) && (
                <ul style={{ margin: "3px 0 0 0", paddingLeft: "18px" }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginBottom: "2px", fontSize: "10px" }}>
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
          <strong style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            PROJECTS
          </strong>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginTop: "4px" }}>
              <div>
                <strong>{proj.name || "Project Name"}</strong>
                {proj.year && <span> ({proj.year})</span>}
              </div>
              <div style={{ fontSize: "10px", marginTop: "2px", color: proj.description ? "#000" : "#666" }}>
                {proj.description || "Description"}
              </div>
              {proj.tech && proj.tech.length > 0 && (
                <div style={{ fontSize: "9px", color: "#666", marginTop: "2px", fontStyle: "italic" }}>
                  {proj.tech.join(", ")}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      <section style={{ marginBottom: "10px" }}>
        <strong style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          SKILLS
        </strong>
        <p style={{ margin: "4px 0", color: (data.skills && data.skills.length) ? "#000" : "#666" }}>
          {(data.skills && data.skills.length) ? data.skills.join(", ") : "e.g. React, Node.js, Python"}
        </p>
      </section>

      {/* ACHIEVEMENTS */}
      {data.achievements && data.achievements.length > 0 && data.achievements.some(a => a.title || a.description) && (
        <section style={{ marginBottom: "10px" }}>
          <strong style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            ACHIEVEMENTS
          </strong>
          {data.achievements.map((ach, i) => (
            (ach.title || ach.description) && (
              <div key={i} style={{ marginTop: "4px" }}>
                <strong>{ach.title}</strong>
                {ach.year && <span> ({ach.year})</span>}
                {ach.description && <div style={{ fontSize: "10px", marginTop: "2px" }}>{ach.description}</div>}
              </div>
            )
          ))}
        </section>
      )}

      {/* CERTIFICATIONS (optional) */}
      {(data.certifications && data.certifications.length > 0 && data.certifications.some(c => c.name || c.issuer || c.year)) ? (
        <section>
          <strong style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            CERTIFICATIONS
          </strong>
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ marginTop: "4px" }}>
              <strong>{cert.name || "Certification"}</strong>
              {cert.issuer && <span>, {cert.issuer}</span>}
              {cert.year && <span> ({cert.year})</span>}
            </div>
          ))}
        </section>
      ) : (
        <section>
          <strong style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            CERTIFICATIONS <span style={{ fontSize: "9px", fontWeight: "normal", color: "#666" }}>(optional)</span>
          </strong>
          <div style={{ marginTop: "4px", color: "#666", fontSize: "10px" }}>Name, Issuer, Year</div>
        </section>
      )}
    </div>
  );
}