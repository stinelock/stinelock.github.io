import { useParams } from "react-router";
import { useState, useEffect } from "react";
import arrowIcon from "/img/arrow-up-right.svg";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [otherProjects, setOtherProjects] = useState([]);

  useEffect(() => {
    async function fetchProject() {
      const response = await fetch("/projects.json");
      const projectsData = await response.json();

      const currentProject = projectsData.find((project) => project.id === id);

      console.log(project);
      setProject(currentProject);

      const filteredProjects = projectsData.filter(
        (project) => project.id !== id
      );
      setOtherProjects(filteredProjects);
    }
    fetchProject();
  }, [id]);

  return (
    <main className="page detailpage">
      <div className="img-container">
        <img src={project.image} alt={project.title} />
      </div>
      <section className="project-detail">
        <div className="project-card-heading">
          <h2>{project.title}</h2>
          <div className="project-info">
            <p>ÅR</p>
            <p>{project.year}</p>
          </div>
        </div>
        <p>{project.description}</p>
        <div className="project-info" id="fokus">
          <p>FOKUS</p>
          <ul className="tags-list">
            {project.tags?.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="project-links">
          {project.links?.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noreferrer">
              {link.text}
              <img src={arrowIcon} />
            </a>
          ))}
        </div>
      </section>
      <div className="img-container">
        <img src={project.image} alt={project.title}></img>
      </div>
      <div className="img-container">
        <img src={project.image} alt={project.title}></img>
      </div>
      <section className="other-projects">
        <h2>Flere Projekter</h2>
        <ul>
          {otherProjects.map((otherProject) => (
            <li key={otherProject.id}>
              <a href={`/project/${otherProject.id}`}>{otherProject.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
