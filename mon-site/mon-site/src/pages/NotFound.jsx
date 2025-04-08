import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-200 text-black-500 px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl font-medium mb-2">Mince, tu t'es perdu·e !</p>
      <p className="text-md mb-6 max-w-md">
        Pas de panique ! <br />
        Cette page n'existe pas (ou plus), mais je suis là pour t’aider à retrouver ton chemin.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-yellow-400 text-yellow-900 font-semibold rounded-full shadow-md hover:bg-yellow-300 transition"
      >
        Retour à l’accueil
      </a>
    </div>
  );
};

export default NotFound;
