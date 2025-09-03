import { useParams } from "react-router";
import { useState, useEffect } from "react";
import ProjectCard from "../compotents/ProjectCard";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    async function fetchProject() {
      const response = await fetch("/projects.json");
      const projectsData = await response.json();
      const project = projectsData.find((project) => project.id === Number(id));

      console.log(project);
      setProject(project);
    }
    fetchProject();
  }, [id]);

  return (
    <div>
      <h1>Project Detail Page: {project.id}</h1>
      <ProjectCard project={project} />
    </div>
  );
}
