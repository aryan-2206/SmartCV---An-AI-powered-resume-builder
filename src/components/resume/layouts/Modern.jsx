export default function Modern({ data }) {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        color: "#111",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "30%",
          padding: "12px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h1 style={{ fontSize: "18px", marginBottom: "4px" }}>
          {data.name}
        </h1>
        <p style={{ marginTop: 0 }}>{data.title}</p>

        <section style={{ marginTop: "12px" }}>
          <h3 style={sideTitle}>Skills</h3>
          <ul style={{ paddingLeft: "16px" }}>
            {data.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div style={{ width: "70%", padding: "12px" }}>
        <section>
          <h2 style={mainTitle}>Summary</h2>
          <p>{data.summary}</p>
        </section>

        <section>
          <h2 style={mainTitle}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <strong>{exp.role}</strong> – {exp.company}
              <div style={{ fontSize: "11px", color: "#555" }}>
                {exp.year}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 style={mainTitle}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i}>
              <strong>{edu.degree}</strong>, {edu.institute}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

const mainTitle = {
  fontSize: "14px",
  marginBottom: "4px",
  borderBottom: "1px solid #ddd",
};

const sideTitle = {
  fontSize: "13px",
  marginBottom: "4px",
};
