function ProjectCard({ project }) {
    return (
      <div className="bg-white shadow-md p-4 rounded-lg">
        <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md" />
        <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
        <p className="text-gray-600">{project.description}</p>
        <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">Voir le site</button>
      </div>
    );
  }
  
  export default ProjectCard;
  