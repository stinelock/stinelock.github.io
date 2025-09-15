import { useParams } from "react-router";
import { useState, useEffect } from "react";
import React from "react";
import arrowIcon from "/img/arrow-up-right.svg";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState({ image: [] });
  const [otherProjects, setOtherProjects] = useState([]);

  useEffect(() => {
    async function fetchProject() {
      const response = await fetch("/projects.json");
      const projectsData = await response.json();

      const currentProject = projectsData.find((project) => project.id === id);
      console.log(currentProject);

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
        <img src={project.image[0]} alt={project.title} />
      </div>
      <section className="project-detail">
        <div className="project-card-heading">
          <h2>{project.title}</h2>
          <div className="project-info">
            <p>ÅR</p>
            <p>{project.year}</p>
          </div>
        </div>
        <div className="project-info-desktop">
          <div className="project-info" id="year">
            <p>ÅR</p>
            <p>{project.year}</p>
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
        </div>
      </section>
      <section className="project-imgs">
        <div className="img-container">
          <img src={project.image[1]} alt={project.title}></img>
        </div>
        <div className="img-container">
          <img src={project.image[2]} alt={project.title}></img>
        </div>
      </section>
      <section className="other-projects">
        <h2>Flere Projekter</h2>
        <ul>
          {otherProjects.map((otherProject, index) => (
            <React.Fragment key={otherProject.id}>
              <li>
                <a href={`/project/${otherProject.id}`}>{otherProject.title}</a>
              </li>
              {index < otherProjects.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </ul>
      </section>
    </main>
  );
}
