import { useParams } from "react-router";
import { useState, useEffect } from "react";

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
    <main className="page">
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
      </div>
    </main>
  );
}
