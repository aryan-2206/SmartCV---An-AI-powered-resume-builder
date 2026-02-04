export default function JakesClassic({ data }) {
  return (
    <div
      style={{
        fontFamily: "Times New Roman, serif",
        fontSize: "12px",
        lineHeight: "1.4",
        color: "#000",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <h1 style={{ fontSize: "20px", margin: 0 }}>{data.name}</h1>
        <p style={{ margin: 0 }}>{data.title}</p>
      </div>

      <hr style={{ border: "0.5px solid black", margin: "6px 0" }} />

      {/* SUMMARY */}
      <section>
        <h2 style={sectionTitle}>Summary</h2>
        <p>{data.summary}</p>
      </section>

      {/* EXPERIENCE */}
      <section>
        <h2 style={sectionTitle}>Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: "4px" }}>
            <strong>{exp.role}</strong>, {exp.company}
            <div style={{ fontStyle: "italic" }}>{exp.year}</div>
          </div>
        ))}
      </section>

      {/* EDUCATION */}
      <section>
        <h2 style={sectionTitle}>Education</h2>
        {data.education.map((edu, i) => (
          <div key={i}>
            <strong>{edu.degree}</strong>, {edu.institute}
          </div>
        ))}
      </section>

      {/* SKILLS */}
      <section>
        <h2 style={sectionTitle}>Skills</h2>
        <p>{data.skills.join(", ")}</p>
      </section>
    </div>
  );
}

const sectionTitle = {
  fontSize: "14px",
  marginBottom: "2px",
  borderBottom: "1px solid black",
};
