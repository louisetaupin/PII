import ProjectCard from "../components/ProjectCard";
import React, { useEffect, useState } from "react";

function Projects() {
  // État pour les projets
  const [projects, setProjects] = useState([]);
  // État pour afficher les projets archivés ou actifs
  const [viewArchived, setViewArchived] = useState(false);
  // État pour le formulaire d'ajout de projet
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    coverImage: "",
    link: "",
    tools: "",
  });
  // État pour afficher/masquer le modal d'ajout
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");
  const isAdmin = token !== null;

  // Récupérer les projets (actifs ou archivés) selon viewArchived
  useEffect(() => {
    const url = viewArchived
      ? "http://localhost:5000/api/websites/archived"
      : "http://localhost:5000/api/websites";

    const options = viewArchived
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched projects:", data);
        setProjects(Array.isArray(data) ? data : []);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des projets:", error)
      );
  }, [viewArchived, token]);

  // Gestion des inputs du formulaire d'ajout
  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  // Ajout d'un projet via la route POST
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/websites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newProject,
          tools: newProject.tools.split(",").map((t) => t.trim()),
        }),
      });

      if (!res.ok) throw new Error("Erreur d'ajout");

      const result = await res.json();
      setProjects([...projects, result.website]);
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
    }
  };

  // Fonctions de mise à jour pour ProjectCard
  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p._id !== id));
  };

  const handleArchive = (id) => {
    setProjects(projects.filter((p) => p._id !== id));
  };

  const handleUnarchive = (id) => {
    setProjects(projects.filter((p) => p._id !== id));
  };

  // Pour l'édition, on met à jour le projet dans le tableau
  const handleEdit = (updatedProject) => {
    setProjects(
      projects.map((p) => (p._id === updatedProject._id ? updatedProject : p))
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Mes projets</h2>

      {isAdmin && (
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setViewArchived(false)}
            className={`px-4 py-2 rounded w-1/2 ${
              !viewArchived ? "bg-yellow-500 text-black" : "bg-gray-300"
            }`}
          >
            Projets actifs
          </button>
          <button
            onClick={() => setViewArchived(true)}
            className={`px-4 py-2 rounded w-1/2 ${
              viewArchived ? "bg-yellow-500 text-black" : "bg-gray-300"
            }`}
          >
            Projets archivés
          </button>
        </div>
      )}

      {isAdmin && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-500 text-black px-4 py-2 rounded w-full hover:bg-yellow-600"
          >
            + Ajouter un projet
          </button>
        </div>
      )}

      {/* Modal d'ajout de projet */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Ajouter un projet</h3>
            <form onSubmit={handleAddProject}>
              <input
                name="name"
                placeholder="Nom du projet"
                value={newProject.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                name="description"
                placeholder="Description"
                value={newProject.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                name="coverImage"
                placeholder="URL de l’image"
                value={newProject.coverImage}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-4"
              />
              <input
                name="link"
                placeholder="Lien vers le projet"
                value={newProject.link}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-4"
              />
              <input
                name="tools"
                placeholder="Outils utilisés (ex : HTML, CSS)"
                value={newProject.tools}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600"
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onUnarchive={handleUnarchive}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
