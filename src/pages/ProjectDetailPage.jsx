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
    <div className="project-detail">
      <h1>{project.title}</h1>
      <p>
        <strong>År:</strong> {project.year}
      </p>
      <p>{project.description}</p>
    </div>
  );
}
