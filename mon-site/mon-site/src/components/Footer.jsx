import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiSmartphone } from "react-icons/gi";
import { IoIosMail } from "react-icons/io";

function Footer() {
  const token = localStorage.getItem("token");
  const isAdmin = token !== null;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/"); // Redirige vers l'accueil 
  };

  return (
    <div className="relative">
      {/* Fond en vague avec clipPath */}
      <div className="relative">
        <svg width="0" height="0">
          <defs>
            <clipPath id="footerClip" clipPathUnits="objectBoundingBox">
              <path d="M0,0.3 C0.25,0, 0.25,0.6, 0.5,0.3 C0.75,0, 0.75,0.6, 1,0.3 L1,1 L0,1 Z" />
            </clipPath>
          </defs>
        </svg>
        <div
          className="bg-yellow-500"
          style={{ clipPath: "url(#footerClip)", height: "80px" }}
        ></div>
      </div>

      {/* Contenu du footer */}
      <footer className="bg-yellow-500 text-black">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-4">
            <p className="flex items-center text-sm">
              {/* Téléphone */}
              <GiSmartphone className="mr-1"/>
              07 89 49 91 02
            </p>

            <p className="flex items-center text-sm">
              {/* Email */}
              <IoIosMail className="mr-1"/>
              <a href="mailto:etremlet@gmail.com" className="underline">
                etremlet@gmail.com
              </a>
            </p>

            <a
              href="https://www.linkedin.com/in/emma-tremlet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.97 0-1.75-.78-1.75-1.75S5.53 4.2 6.5 4.2 8.25 4.98 8.25 5.95 7.47 7.7 6.5 7.7zm13.5 11.3h-3v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.6h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v5.6z" />
              </svg>
            </a>

            <a
              href="https://github.com/Emmatremlet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.834 2.809 1.304 3.495.997.108-.776.42-1.304.762-1.604-2.665-.304-5.467-1.332-5.467-5.931 0-1.312.47-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.47 11.47 0 013-.404c1.02.005 2.04.137 3 .404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.909 1.23 3.221 0 4.61-2.805 5.625-5.475 5.921.435.375.81 1.11.81 2.235 0 1.614-.015 2.915-.015 3.315 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Lien de connexion/déconnexion pour l'admin */}
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="text-black underline hover:text-yellow-100 text-sm"
            >
              Se déconnecter
            </button>
          ) : (
            <Link
              to="/login"
              className="text-black underline hover:text-yellow-100 text-sm"
            >
              Se connecter en tant qu’administrateur
            </Link>
          )}

          {/* Copyright */}
          <p>© {new Date().getFullYear()} - Mon Portfolio</p>

          <p>
            {/* Adresse */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c-2.21 0-4 1.79-4 4 0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4z"
              />
            </svg>
            11 rue David Gradis, Bordeaux, France
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
