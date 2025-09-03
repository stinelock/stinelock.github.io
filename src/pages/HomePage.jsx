import { useState, useEffect } from "react";
import ProjectCard from "../compotents/ProjectCard";

export default function HomePage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const response = await fetch("/projects.json");
    const data = await response.json();
    setProjects(data);
    console.log(data);
  }

  return (
    <div>
      <h1>Home Page</h1>

        {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
        ))}
    </div>
  );
}
