import React from "react";

function Footer() {
  return (
    <div className="relative">
      {/* Définition du clipPath SVG pour deux vagues */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="footerClip" clipPathUnits="objectBoundingBox">
            {/* 
              Ce path commence à 30% de la hauteur, puis crée deux courbes (de 0 à 0.5, puis de 0.5 à 1)
              - M0,0.3 : point de départ (0% horizontal, 30% vertical)
              - C0.25,0, 0.25,0.6, 0.5,0.3 : première vague
              - C0.75,0, 0.75,0.6, 1,0.3 : deuxième vague
              - L1,1 L0,1 Z : fermeture du path jusqu'au bas du container
            */}
            <path d="M0,0.3 C0.25,0, 0.25,0.6, 0.5,0.3 C0.75,0, 0.75,0.6, 1,0.3 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Footer avec contenu découpé selon le clipPath */}
      <footer
        className="bg-yellow-500 text-white py-8"
        style={{ clipPath: "url(#footerClip)" }}
      >
        <div className="container mx-auto text-center">
          <p>© 2023 - Mon Portfolio</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
