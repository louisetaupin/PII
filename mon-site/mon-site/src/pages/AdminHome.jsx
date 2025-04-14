import React, { useState, useEffect } from "react";
import { DiJavascript1 } from 'react-icons/di';
import { SiReact, SiYoast, SiMamp, SiRender, SiPhpmyadmin, SiMysql, SiMongodb } from "react-icons/si";
import { FaWordpressSimple, FaNode, FaSymfony, FaStripeS, FaGithubSquare  } from "react-icons/fa";
import { FaElementor, FaBootstrap } from "react-icons/fa6";
import { GrHeroku } from "react-icons/gr";
import TimelineAdmin from "../components/TimelineAdmin";
import { motion, AnimatePresence } from "framer-motion";

function AdminHome() {
  const [description, setDescription] = useState("Je suis ...");
  const [photoFile, setPhotoFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cv, setCv] = useState(null);
  const [token] = useState(localStorage.getItem("token")); 
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
  
// sauvegarde des modifications
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
        showSuccess("📝 Modifications enregistrées !");
      })
      .catch(() => alert("❌ Erreur lors de l'enregistrement"));
  };

  //Modification des fichiers photos et/ou CV
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (photoFile) formData.append("photo", photoFile);
    if (cvFile) formData.append("cv", cvFile);

    try {
      const res = await fetch("http://localhost:5000/api/admin/presentation", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (result.photo) setPhoto(`${result.photo}`);
      if (result.cv) setCv(`${result.cv}`);
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
      <section className="flex flex-col md:flex-row items-center justify-center  min-h-screen bg-white p-4 relative">

        {/* Animation de succès */}
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
  {/* Ligne des deux boutons de modification */}
  <div className="flex justify-center gap-4 flex-wrap mb-4">
    {/* Charger la photo */}
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

    {/* Charger le CV */}
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

      {/* Section Mes compétences (pareil que pour Home.jsx) */}
      <div className="mt-0 text-center ">
        <h2 className="text-2xl font-semibold mb-6">Mes compétences</h2>
        <div className="flex flex-wrap justify-center gap-4 space-x-4 mt-2">
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
>
        <DiJavascript1 className="w-8 h-8 text-yellow-500" />
        </motion.button></a>
        <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <SiReact className="w-8 h-8 text-blue-500" />
        </motion.button></a>
        <a href="https://wordpress.com/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <FaWordpressSimple className="w-8 h-8 text-black-500" />
        </motion.button></a>
        <a href="https://elementor.com/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <FaElementor className="w-8 h-8 text-black-500" />
        </motion.button></a>
        <a href="https://www.elegantthemes.com/gallery/divi/" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="bg-gray-100 p-2 rounded shadow"
            >
              <span className="w-8 h-8 text-purple-500 inline-flex items-center justify-center text-xs font-bold">
                Divi
              </span>
            </motion.button>
          </a>
        <a href="https://yoast.com/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <SiYoast className="w-8 h-8 text-pink-700" />
        </motion.button></a>
        <a href="https://symfony.com/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <FaSymfony className="w-8 h-8 text-black-500" />
        </motion.button></a>
        <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <FaStripeS className="w-8 h-8 text-blue-500" />
        </motion.button></a>
        <a href="https://heroku.dev/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <GrHeroku className="w-8 h-8 text-purple-500" />
        </motion.button></a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <FaGithubSquare className="w-8 h-8 text-black-500" />
        </motion.button></a>
        <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <FaBootstrap className="w-8 h-8 text-purple-500" />
        </motion.button></a>
        <a href="https://www.mamp.info/en/windows/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <SiMamp className="w-8 h-8 text-black-500" />
        </motion.button></a>
        <a href="https://www.phpmyadmin.net/downloads/" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <SiPhpmyadmin className="w-8 h-8 text-black-500" />
        </motion.button></a>
        <a href="https://www.mysql.com" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <SiMysql className="w-8 h-8 text-black-500" />
        </motion.button></a>
        <a href="https://www.mongodb.com" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <SiMongodb className="w-8 h-8 text-green-500" />
        </motion.button></a>
        <a href="https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-green-100 p-2 rounded shadow"
            >
        <FaNode className="w-8 h-8 text-black-500" />
        </motion.button></a>
        <a href="https://render.com" target="_blank" rel="noopener noreferrer">
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-gray-100 p-2 rounded shadow"
            >
        <SiRender className="w-8 h-8 text-black-500" />
        </motion.button></a>
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
