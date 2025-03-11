"use client";

import React, { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion"; 

// Vos données de timeline
const timelineData = [
  {
    date: "2015 - 2018",
    title: "Bachelor en Informatique",
    description: "Formation à l'Université de XYZ, axée sur les bases de la programmation et des systèmes.",
  },
  {
    date: "2018 - 2020",
    title: "Master en Design Web",
    description: "Spécialisation en design interactif et ergonomie web à l'École ABC.",
  },
  {
    date: "2020 - 2023",
    title: "Développeur Front-End",
    description: "Expérience professionnelle chez Entreprise 123, création d'interfaces utilisateur réactives.",
  },
];

function TimelineSlider() {
  // Index de l'élément affiché et direction de la navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Fonction de pagination qui gère le changement d'élément
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
        whileFocus={{ outline: "2px solid #eab308" }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft />
      </motion.button>
      <AnimatePresence custom={direction}>
        <Slide key={currentIndex} item={currentItem} direction={direction} />
      </AnimatePresence>
      <motion.button
        initial={false}
        animate={{ backgroundColor: "#eab308" }}
        aria-label="Suivant"
        style={button}
        onClick={() => paginate(1)}
        whileFocus={{ outline: "2px solid #eab308" }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight />
      </motion.button>
    </div>
  );
}

// Composant Slide qui affiche l'élément de la timeline avec animation
const Slide = forwardRef(function Slide({ item, direction }, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -50 }}
      transition={{ delay: 0.2, type: "tween", duration: 0.3, ease: "easeOut" }}
      style={{ ...box, backgroundColor: "#fff", padding: "1rem" }}
    >
      <p className="text-sm text-gray-500">{item.date}</p>
      <h4 className="text-lg font-semibold">{item.title}</h4>
      <p className="text-gray-700">{item.description}</p>
    </motion.div>
  );
});

/**
 * ==============   Icons   ================
 */
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

/**
 * ==============   Styles   ================
 */
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

export default TimelineSlider;
