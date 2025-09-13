import { NavLink } from "react-router";

export default function ProjectCard({ project }) {
  return (
    <NavLink to={`/project/${project.id}`} className="project-card">
      <div className="img-container">
        <img src={project.image[0]} alt={project.title} />
      </div>
      <div className="project-card-info">
        <div className="project-card-heading">
          <h2>{project.title}</h2>
          <p>{project.year}</p>
        </div>
        <p> {project.tags.join(", ")} </p>
      </div>
    </NavLink>
  );
}
