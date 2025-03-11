import React, { useState } from "react";

function ProjectCard({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <h3
          className="text-xl font-semibold mt-4"
        >
          {project.title}
        </h3>
        <p className="text-gray-600">{project.description}</p>
        <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:underline"
          onClick={() => setIsModalOpen(true)}>
          Voir le site
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <p className="text-gray-700">
              {project.longDescription ||
                "Plus d'informations sur le projet..."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCard;
