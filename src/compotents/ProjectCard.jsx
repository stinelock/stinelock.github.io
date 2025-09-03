export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>Technologies: {project.tags}</p>
    </div>
  );
}
