import React from "react";
import { Link, useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
const isAdmin = token !== null;

function Footer() {
  const token = localStorage.getItem("token");
  const isAdmin = token !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/"); // Redirige vers l'accueil ou une autre page
  };

  return (
    <div className="relative">
      {/* Définition du clipPath SVG pour deux vagues */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="footerClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.3 C0.25,0, 0.25,0.6, 0.5,0.3 C0.75,0, 0.75,0.6, 1,0.3 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Footer stylisé avec clipPath */}
      <footer
        className="bg-yellow-500 text-white py-8"
        style={{ clipPath: "url(#footerClip)" }}
      >
        <div className="container mx-auto text-center space-y-2">
          <p>© {new Date().getFullYear()} - Mon Portfolio</p>

          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="text-white underline hover:text-yellow-100 text-sm"
            >
              Se déconnecter
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white underline hover:text-yellow-100 text-sm"
            >
              Se connecter en tant qu’administrateur
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
