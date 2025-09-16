import { useState, useEffect, useRef } from "react";
import ProjectCard from "../compotents/ProjectCard";
import Signature from "../compotents/Signature";
import SignatureTest from "../compotents/SignatureTest";
import SkillSection from "../compotents/SkillSection";
import ContactSection from "../compotents/ContactSection";


export default function HomePage({scrollTo}) {
  const [projects, setProjects] = useState([]);
   const projectRef = useRef(null);

  useEffect(() => {
    if (scrollTo === "projects" && projectRef.current) {
      const topOffset = 100; // justér dette tal som du vil
      const elementPosition = projectRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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

          <SignatureTest />

          {/* <Signature /> */}
        </section>

        <section ref={projectRef} className="project-section">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
       <SkillSection />
       <ContactSection page="home"/>
      </main>
    </>
  );
}
