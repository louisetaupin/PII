import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

function TimelineAdmin() {
  const [timelineData, setTimelineData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.timeline) setTimelineData(data.timeline);
      });
  }, []);

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const saveTimeline = (newTimeline) => {
    console.log("📤 Envoi de la timeline :", newTimeline);
    fetch("http://localhost:5000/api/admin/timeline", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ timeline: newTimeline }),
    })
      .then((res) => res.json())
      .then((saved) => {
        setTimelineData(saved.timeline || []);
        showSuccess("✅ Timeline enregistrée !");
      })
      .catch((err) => {
        alert("❌ Erreur lors de la sauvegarde de la timeline");
        console.error(err);
      });
  };

  const paginate = (newDirection) => {
    const newIndex = wrap(0, timelineData.length, currentIndex + newDirection);
    setCurrentIndex(newIndex);
    setDirection(newDirection);
  };

  const handleChange = (field, value) => {
    setTimelineData((prev) => {
      const updated = [...prev];
      if (!updated[currentIndex]) return prev; // protection
      updated[currentIndex] = { ...updated[currentIndex], [field]: value };
      return updated;
    });
  };

  const confirmDelete = () => {
    const updated = timelineData.filter((_, idx) => idx !== currentIndex);
    setTimelineData(updated);
    setCurrentIndex(0);
    setShowConfirmModal(false); // ❌ ne pas sauvegarder ici
  };
  
  const handleAdd = () => {
    const newItem = {
      date: "",
      title: "Nouvelle Expérience",
      description: "Description...",
    };
    const updated = [...timelineData, newItem];
    setTimelineData(updated);
    setCurrentIndex(updated.length - 1); // pointe sur la nouvelle carte
  };


  const currentItem = timelineData[currentIndex] || {};

  return (
    <div>
    <div style={container}>
      {/* ✅ Animation de succès */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="absolute top-5 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={false}
        animate={{ backgroundColor: "#eab308" }}
        aria-label="Précédent"
        style={button}
        onClick={() => paginate(-1)}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft />
      </motion.button>

      <AnimatePresence custom={direction}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.3 }}
          style={{ ...box, backgroundColor: "#fff", padding: "1rem" }}
        >
          <input
            type="text"
            value={currentItem.date}
            onChange={(e) => handleChange("date", e.target.value)}
            placeholder="Date"
            className="w-full mb-2 border p-1"
          />
          <input
            type="text"
            value={currentItem.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Titre"
            className="w-full mb-2 border p-1"
          />
          <textarea
            value={currentItem.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Description"
            className="w-full border p-1"
          />
          {/* Boutons sous chaque carte */}
<div className="flex justify-between mt-4">
  <button
    onClick={() => setShowConfirmModal(true)}
    className="text-red-500 text-sm underline"
  >
    Supprimer
  </button>
  <button onClick={handleAdd} className="text-blue-500 text-sm underline">
    Ajouter une expérience
  </button>
</div>

        </motion.div>
      </AnimatePresence>
      {showConfirmModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
      <h3 className="text-lg font-bold mb-2">Confirmer la suppression</h3>
      <p className="text-gray-700 mb-4">Souhaitez-vous vraiment supprimer cette expérience ?</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowConfirmModal(false)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Annuler
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
)}

      <motion.button
        initial={false}
        animate={{ backgroundColor: "#eab308" }}
        aria-label="Suivant"
        style={button}
        onClick={() => paginate(1)}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight />
      </motion.button>
      </div>
      <div className="flex justify-center mt-4">
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
          onClick={() => saveTimeline(timelineData)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          💾 Sauvegarder la timeline
        </motion.button>
      </div>
    </div>
  );
  
}

/** === Icônes et styles === */
const iconsProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function ArrowLeft() {
  return (
    <svg {...iconsProps}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg {...iconsProps}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const container = {
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  marginTop: "2rem",
};

const box = {
  width: 1000,
  minHeight: 200,
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const button = {
  backgroundColor: "#eab308",
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  outlineOffset: 2,
};

export default TimelineAdmin;
