import { NavLink } from "react-router";

export default function ProjectCard({ project }) {
  return (
    <NavLink to={`/project/${project.id}`} className="project-card">
        <div className="img-container">
          <img src={project.image} alt={project.title} />
        </div>
        <h2>{project.title}</h2>
        <p>{project.year}</p>
        <p>[ {project.tags.join(", ")} ]</p>
    </NavLink>
  );
}
