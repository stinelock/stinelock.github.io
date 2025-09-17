import { useState, useEffect, useRef } from "react";
import ProjectCard from "../compotents/ProjectCard";
import Signature from "../compotents/Signature";
import SkillSection from "../compotents/SkillSection";
import ContactSection from "../compotents/ContactSection";


export default function HomePage({scrollTo, setActiveSection}) {
  const [projects, setProjects] = useState([]);
   const projectRef = useRef(null);
   const introRef = useRef(null);
   const contactRef = useRef(null);

  useEffect(() => {
    if (scrollTo === "projects" && projectRef.current) {
      const topOffset = 100; // Adjust this value as needed
      const elementPosition = projectRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - topOffset;

      // Ensure the ref is hydrated before scrolling
      if (projectRef.current) {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [scrollTo]);

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
      <div id="top"></div>
      <main className="page">
        <section ref={introRef} className="intro">
          <div className="heading-mobile">
            <h1>Multi</h1>
            <h1>Medie</h1>
            <h1>Designer</h1>
          </div>
          <div className="heading-desktop">
            <h1>Multimedie</h1>
            <h1>Designer</h1>
          </div>
          <div className="signature-container">
            <Signature introRef={introRef} contactRef={contactRef} />
          </div>
        </section>

        <section ref={projectRef} className="project-section">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
        <SkillSection />
        <ContactSection ref={contactRef} page="home" />
      </main>
    </>
  );
}
