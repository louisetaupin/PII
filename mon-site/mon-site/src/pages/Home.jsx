import React, { useEffect, useState } from 'react';
import { DiJavascript1 } from 'react-icons/di';
import { SiReact } from "react-icons/si";
import Timeline from "../components/Timeline";
import { motion } from "framer-motion";


function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/home")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Erreur de chargement:", err));
  }, []);

  if (!data) {
    return <div>Chargement...</div>;
  }
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-4">
        {/* Bloc Présentation */}
        <div className="md:w-1/2 p-4 flex flex-col items-center text-center">
  <h1 className="text-3xl font-bold mb-4">Présentation</h1>
  <p className="mb-4 text-gray-700">
  {data.description || "Présentation en cours de chargement..."}
</p>
  
  <a href={`/${data.cv}`}download>
  <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
  >        
        Mon CV
      </motion.button></a>
</div>
        {/* Rond jaune avec la photo */}
        <div className="md:w-1/2 p-4 flex justify-center mt-9">
          <div className="bg-yellow-500 rounded-full w-48 h-48 flex items-center justify-center">
            <img
              src={`/${data.photo}`}
              alt="Ma photo"
              className="w-44 h-44 object-cover rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Section Mes compétences */}
      <div className="mt-0 text-center ">
        <h2 className="text-2xl font-semibold mb-6">Mes compétences</h2>
        <div className="flex justify-center space-x-4 mt-2">
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
            >
        <SiReact className="w-8 h-8 text-blue-500" />
        </motion.button></a>
        </div>
      </div>

      {/* Section Mon parcours */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-6">Mon parcours</h2>
        <Timeline />
      </div>
    </>
  );
}

export default Home;
