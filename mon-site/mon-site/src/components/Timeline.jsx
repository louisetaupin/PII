import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

function Timeline() {
  const [timelineData, setTimelineData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Récupérer la timeline depuis la bdd
  useEffect(() => {
    fetch("http://localhost:5000/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.timeline) {
          const sorted = [...data.timeline].sort((a, b) =>
            a.date.localeCompare(b.date)
          );
          setTimelineData(sorted);
        }
      })
      .catch((err) => console.error("Erreur chargement timeline :", err));
  }, []);

  if (!timelineData) {
    return <div>Chargement...</div>;
  }

  if (timelineData.length === 0) {
    return <div className="text-center text-gray-500">Aucune expérience pour l’instant.</div>;
  }

  const paginate = (newDirection) => {
    const newIndex = wrap(0, timelineData.length, currentIndex + newDirection);
    setCurrentIndex(newIndex);
    setDirection(newDirection);
  };

  const currentItem = timelineData[currentIndex];

  return (
    <div style={container}>
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
          transition={{ delay: 0.2, type: "tween", duration: 0 }}
          style={{ ...box, backgroundColor: "#fff", padding: "1rem" }}
        >
          <p className="text-sm text-gray-500">{currentItem.date}</p>
          <h4 className="text-lg font-semibold">{currentItem.title}</h4>
          <p className="text-gray-700">{currentItem.description}</p>
        </motion.div>
      </AnimatePresence>

      <motion.button
        initial={false}
        animate={{ backgroundColor: "#eab308" }}
        aria-label="Suivant"
        style={button}
        onClick={() => paginate(1)}
        whileTap={{ scale: 0.8 }}
      >
        <ArrowRight />
      </motion.button>
    </div>
  );
}

// Icônes
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

// Styles
const container = {
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
};

const box = {
  width: 1000,
  minHeight: 150,
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

export default Timeline;
