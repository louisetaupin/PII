import ProjectCard from "../components/ProjectCard";

const projects = [
  { id: 1, title: "Projet 1", description: "Description", image: "image1.jpg", lien: "lien1.com", outils:"Node, Express" },
  { id: 2, title: "Projet 2", description: "Description", image: "image2.jpg", lien: "lien2.com", outils:"Node, Express" },
  { id: 3, title: "Projet 3", description: "Description", image: "image3.jpg", lien: "lien3.com", outils:"Node, Express" }
];

function Projects() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center">Mes projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
