export default function SkillPill({ skill, rotation }) {
  return (
    <span
      className="skill-pill"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {skill}
    </span>
  );
}
