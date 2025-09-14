import { useParams } from "react-router";
import { useState, useEffect } from "react";
import arrowIcon from "/img/arrow-up-right.svg";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    async function fetchProject() {
      const response = await fetch("/projects.json");
      const projectsData = await response.json();

      const project = projectsData.find((project) => project.id === id);

      console.log(project);
      setProject(project);
    }
    fetchProject();
  }, [id]);

  return (
    <main className="page detailpage">
      <div className="img-container">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-detail">
        <div className="project-card-heading">
          <h1>{project.title}</h1>
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
              <img src={arrowIcon}/>
            </a>
          ))}
        </div>
      </div>
      <div className="img-container">
        <img src={project.image} alt={project.title}></img>
      </div>
      <div className="img-container">
        <img src={project.image} alt={project.title}></img>
      </div>
    </main>
  );
}
