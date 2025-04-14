import React, { useEffect, useState } from 'react';
import { DiJavascript1 } from 'react-icons/di';
import { SiReact, SiYoast, SiMamp, SiRender, SiPhpmyadmin, SiMysql, SiMongodb } from "react-icons/si";
import { FaWordpressSimple, FaNode, FaSymfony, FaStripeS, FaGithubSquare  } from "react-icons/fa";
import { FaElementor, FaBootstrap } from "react-icons/fa6";
import { GrHeroku } from "react-icons/gr";
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
        
        {/* Bloc Présentation et CV*/}
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

      {/* Section Mon parcours */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-6">Mon parcours</h2>
        <Timeline />
      </div>
    </>
  );
}

export default Home;
