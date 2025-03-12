import ProjectCard from "../components/ProjectCard";
import React, { useEffect, useState } from 'react';


function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer les projets
    fetch('http://localhost:5000/api/websites')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des projets:', error);
      });
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center">Mes projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
