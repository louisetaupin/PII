import React from "react";
import photo from "../photo_emma.png"; // Assure-toi que le chemin est correct
import { DiJavascript1 } from 'react-icons/di';
import { SiReact } from "react-icons/si";

function Home() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-4">
        {/* Bloc Présentation */}
        <div className="md:w-1/2 p-4 flex flex-col items-center text-center">
  <h1 className="text-3xl font-bold mb-4">Présentation</h1>
  <p className="mb-4 text-gray-700">
    Je suis ... (ta description ici)
  </p>
  <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
    Mon CV
  </button>
</div>
        {/* Rond jaune avec la photo */}
        <div className="md:w-1/2 p-4 flex justify-center mt-9">
          <div className="bg-yellow-500 rounded-full w-48 h-48 flex items-center justify-center">
            <img
              src={photo}
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
        <span className="bg-gray-100 p-2 rounded shadow">
        <DiJavascript1 className="w-8 h-8 text-yellow-500" />
        </span>
        <span className="bg-gray-100 p-2 rounded shadow">
        <SiReact className="w-8 h-8 text-blue-500" />
        </span>
        </div>
      </div>

      {/* Section Mon parcours */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-6">Mon parcours</h2>
        <div className="w-24 h-24 border-2 border-gray-400 mt-2 flex items-center justify-center mx-auto">
          X
        </div>
      </div>
    </>
  );
}

export default Home;
