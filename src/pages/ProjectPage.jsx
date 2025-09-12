import React, { useState, useEffect } from "react";
import ProjectCard from "../compotents/ProjectCard";
import NavBar from "../compotents/NavBar";

export default function Project() {
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
    <>
    <NavBar/>
      <main className="page">
        <h1>Project Page</h1>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </main>
    </>
  );
}
