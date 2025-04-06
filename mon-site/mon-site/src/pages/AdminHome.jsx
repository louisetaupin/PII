import React, { useState, useEffect } from "react";
import { DiJavascript1 } from 'react-icons/di';
import { SiReact } from "react-icons/si";
import TimelineAdmin from "../components/TimelineAdmin";
import { motion, AnimatePresence } from "framer-motion";

function AdminHome() {
  const [description, setDescription] = useState("Je suis ...");
  const [photoFile, setPhotoFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cv, setCv] = useState(null);
  const [token] = useState(localStorage.getItem("token")); // adapte selon ta logique auth
  const [successMessage, setSuccessMessage] = useState("");

  // Charger les infos depuis la BDD
  useEffect(() => {
    fetch("http://localhost:5000/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.photo) setPhoto(`/${data.photo}`);
          if (data.cv) setCv(`/${data.cv}`);
          if (data.description) setDescription(data.description);
        }
      })
      .catch((err) => console.error("Erreur fetch:", err));
  }, []);
  

  const saveChanges = () => {
    const data = { description };
    fetch("http://localhost:5000/api/admin/presentation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        showSuccess("📝 Description enregistrée !");
      })
      .catch(() => alert("❌ Erreur lors de l'enregistrement"));
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (photoFile) formData.append("photo", photoFile);
    if (cvFile) formData.append("cv", cvFile);

    try {
      const res = await fetch("http://localhost:5000/api/admin/home", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (result.photo) setPhoto(`/assets/images/${result.photo}`);
      if (result.cv) setCv(`/assets/pdf/${result.cv}`);
      showSuccess("✅ Fichiers mis à jour !");
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de l'envoi des fichiers");
    }
  };

  // Affiche un message temporaire avec animation
  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000); // cache après 3s
  };

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-4 relative">

        {/* ✅ Animation de succès */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute top-5 bg-green-500 text-white px-4 py-2 rounded shadow-md"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bloc Présentation */}
        <div className="md:w-1/2 p-4 flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mb-4">Présentation</h1>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border mb-4"
          />
          <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
            onClick={saveChanges}
            className="mb-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Sauvegarder la description
          </motion.button>

 


          {/* Bouton de téléchargement CV */}
          {cv && (
            <a href={cv} download>
              <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Télécharger le CV
                </button>
              </motion.button>
            </a>
          )}
        </div>

        {/* Affichage de la photo */}
        <div className="md:w-1/2 p-4 flex justify-center mt-9">
          <div className="bg-yellow-500 rounded-full w-48 h-48 flex items-center justify-center">
            {photo ? (
              <img
                src={photo}
                alt="Ma photo"
                className="w-44 h-44 object-cover rounded-full"
              />
            ) : (
              <span>Photo non chargée</span>
            )}
          </div>
        </div>
        
      </section>

      <form onSubmit={handleFileSubmit} className="mb-6">
  {/* Ligne des deux boutons */}
  <div className="flex justify-center gap-4 flex-wrap mb-4">
    {/* Upload photo */}
    <div className="flex flex-col items-center">
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={(e) => setPhotoFile(e.target.files[0])}
        className="hidden"
      />
      <label
        htmlFor="photo-upload"
        className="cursor-pointer bg-yellow-500 text-white text-sm px-3 py-1.5 rounded hover:bg-yellow-600 transition"
      >
        ➕ Remplacer ma photo
      </label>
      {photoFile && <span className="text-xs mt-1">{photoFile.name}</span>}
    </div>

    {/* Upload CV */}
    <div className="flex flex-col items-center">
      <input
        id="cv-upload"
        type="file"
        accept="application/pdf"
        onChange={(e) => setCvFile(e.target.files[0])}
        className="hidden"
      />
      <label
        htmlFor="cv-upload"
        className="cursor-pointer bg-yellow-500 text-white text-sm px-3 py-1.5 rounded hover:bg-yellow-600 transition"
      >
        ➕ Remplacer mon CV
      </label>
      {cvFile && <span className="text-xs mt-1">{cvFile.name}</span>}
    </div>
  </div>

  {/* Bouton d'envoi centré */}

  <div className="flex justify-center">
              <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" type="submit">
                  Sauvegarder les modifications
                </button>
              </motion.button>
            </div>
</form>

      {/* Section compétences */}
      <div className="mt-0 text-center ">
        <h2 className="text-2xl font-semibold mb-6">Mes compétences</h2>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <button className="bg-gray-100 p-2 rounded shadow">
                <DiJavascript1 className="w-8 h-8 text-yellow-500" />
              </button>
            </motion.button>
          </a>
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <button className="bg-gray-100 p-2 rounded shadow">
                <SiReact className="w-8 h-8 text-blue-500" />
              </button>
            </motion.button>
          </a>
        </div>
      </div>

      {/* Timeline Admin */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-6">Mon parcours</h2>
        <TimelineAdmin />
      </div>
    </>
  );
}

export default AdminHome;
