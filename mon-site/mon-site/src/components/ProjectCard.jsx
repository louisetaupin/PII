import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

function ProjectCard({ project, onDelete, onArchive, onEdit, onUnarchive }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToolsModal, setShowToolsModal] = useState(false);
  const [editData, setEditData] = useState({ ...project });
  
  const token = localStorage.getItem("token");
  const isAdmin = token !== null;

  // Supprimer un projet (après confirmation)
  const handleDeleteConfirmed = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/websites/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        onDelete(id);
      } else {
        throw new Error("Erreur de suppression");
      }
    } catch (err) {
      console.error(err);
    }
    setShowDeleteModal(false);
  };

  // Archiver un projet
  const handleArchive = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/websites/archive/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        onArchive(id);
      } else {
        throw new Error("Erreur d’archivage");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Désarchiver un projet
  const handleUnarchive = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/websites/unarchive/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        onUnarchive(id);
      } else {
        throw new Error("Erreur de désarchivage");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Sauvegarder les modifications
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/websites/${project._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        const updated = await res.json();
        onEdit(updated.website); 
        setShowEditModal(false);
      } else {
        throw new Error("Erreur de modification");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <img
          src={project.coverImage}
          alt={project.name}
          className="w-full h-40 object-cover rounded-md"
        />
        <h3 className="text-xl font-semibold mt-4">{project.name}</h3>
        <p className="text-gray-600 h-14 sm:h-20 md:h-24 overflow-y-auto">{project.description}</p>

        <div className="mt-4 flex space-x-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-white px-4 py-2 rounded w-1/2 text-center hover:bg-yellow-600"
          >
            Voir le site
          </a>
          <button
            onClick={() => setShowToolsModal(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded w-1/2 hover:bg-yellow-600"
          >
            Outils utilisés
          </button>
        </div>

        {isAdmin && (
          <div className="flex space-x-2 mt-2">
            {/* Bouton pour modifier */}
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-blue-400 text-white text-sm px-3 py-1 w-1/3 rounded hover:bg-blue-600"
            >
              Modifier
            </button>

            {/* Bouton pour archiver ou désarchiver */}
            {project.archived ? (
              <button
                onClick={() => handleUnarchive(project._id)}
                className="bg-green-400 text-white text-sm px-3 py-1 w-1/3 rounded hover:bg-green-600"
              >
                Désarchiver
              </button>
            ) : (
              <button
                onClick={() => handleArchive(project._id)}
                className="bg-orange-400 text-white text-sm px-3 py-1 w-1/3 rounded hover:bg-yellow-500"
              >
                Archiver
              </button>
            )}

            {/* Bouton pour supprimer */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-400 text-white text-sm px-3 py-1 w-1/3 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer ce projet ?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeleteConfirmed(project._id)}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Modifier le projet</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                name="name"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                name="description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                name="coverImage"
                value={editData.coverImage}
                onChange={(e) =>
                  setEditData({ ...editData, coverImage: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              />
              <input
                name="link"
                value={editData.link}
                onChange={(e) =>
                  setEditData({ ...editData, link: e.target.value })
                }
                className="w-full p-2 border rounded mb-4"
              />
              <input
                name="tools"
                value={editData.tools.join(", ")}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    tools: e.target.value.split(",").map((t) => t.trim()),
                  })
                }
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded border"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal d'affichage des outils utilisés */}
      {showToolsModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-2xl w-11/12 md:w-1/2"
    >
      <h3 className="text-2xl font-bold mb-4 border-b pb-2 flex items-center gap-2">
        <FaTools  className="text-yellow-500" size={22} /> Outils utilisés
      </h3>
      <ul className="flex flex-wrap gap-2">
        {project.tools && project.tools.length > 0 ? (
          project.tools.map((tool, index) => (
            <li
              key={index}
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-4 py-1 rounded-full shadow-md text-sm"
            >
              {tool}
            </li>
          ))
        ) : (
          <li className="text-gray-500">Aucun outil renseigné.</li>
        )}
      </ul>
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setShowToolsModal(false)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          Fermer
        </button>
      </div>
    </motion.div>
  </div>
)}
    </>
  );
}

export default ProjectCard;
