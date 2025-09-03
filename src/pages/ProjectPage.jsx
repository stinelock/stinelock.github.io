import React, { useState, useEffect } from "react";

export default function Project({ project }) {
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
      <h1>Project Page</h1>
    </div>
  );
}
