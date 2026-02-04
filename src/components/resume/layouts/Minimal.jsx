export default function Minimal({ data }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "11.5px",
        lineHeight: "1.4",
        color: "#000",
      }}
    >
      {/* HEADER */}
      <div>
        <strong style={{ fontSize: "16px" }}>{data.name}</strong>
        <div>{data.title}</div>
      </div>

      <br />

      {/* SUMMARY */}
      <section>
        <strong>SUMMARY</strong>
        <p>{data.summary}</p>
      </section>

      {/* EXPERIENCE */}
      <section>
        <strong>EXPERIENCE</strong>
        {data.experience.map((exp, i) => (
          <p key={i}>
            {exp.role}, {exp.company} ({exp.year})
          </p>
        ))}
      </section>

      {/* EDUCATION */}
      <section>
        <strong>EDUCATION</strong>
        {data.education.map((edu, i) => (
          <p key={i}>
            {edu.degree}, {edu.institute}
          </p>
        ))}
      </section>

      {/* SKILLS */}
      <section>
        <strong>SKILLS</strong>
        <p>{data.skills.join(", ")}</p>
      </section>
    </div>
  );
}
