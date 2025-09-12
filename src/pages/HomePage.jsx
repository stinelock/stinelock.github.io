import { useState, useEffect } from "react";
import ProjectCard from "../compotents/ProjectCard";
import Signature from "../compotents/Signature";


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
    <>
      <main>
        <section className="intro">
          <div className="heading-mobile">
            <h1>Multi</h1>
            <h1>Medie</h1>
            <h1>Designer</h1>
          </div>
          <div className="heading-desktop">
            <h1>Multimedie</h1>
            <h1>Designer</h1>
          </div>

          <Signature />
        </section>

        <section className="project-section">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      </main>
    </>
  );
}
