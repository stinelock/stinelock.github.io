import { NavLink } from "react-router";

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>Technologies: {project.tags}</p>
      <NavLink to={`/project/${project.id}`}>Se detaljer</NavLink>
    </div>
  );
}
