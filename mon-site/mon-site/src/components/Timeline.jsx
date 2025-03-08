import React from "react";
import { motion } from "framer-motion";

// Exemple de données pour la frise chronologique
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

const TimelineItem = ({ item, index, isLast }) => (
  <div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.3 }}
    className="flex items-start mb-8"
  >
    {/* Point et ligne verticale */}
    <div className="flex flex-col items-center mr-4">
      <div className="w-4 h-4 bg-yellow-500 rounded-full" />
      {!isLast && (
        <div className="flex-1 w-px bg-gray-300 mt-1" style={{ height: "2rem" }} />
      )}
    </div>
    {/* Contenu de l'item */}
    <div>
      <p className="text-sm text-gray-500">{item.date}</p>
      <h4 className="text-lg font-semibold">{item.title}</h4>
      <p className="text-gray-700">{item.description}</p>
    </div>
  </div>
);

function Timeline() {
  return (
    <div className="p-4">
      {timelineData.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
          index={index}
          isLast={index === timelineData.length - 1}
        />
      ))}
    </div>
  );
}

export default Timeline;
