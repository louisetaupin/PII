import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  // Activer le soulignement si on est sur / ou /admin
  const isHomeActive = location.pathname === "/" || location.pathname.startsWith("/admin");

  return (
    <nav className="sticky top-0 z-50 bg-yellow-500 p-4 flex items-center justify-between">
      <div className="text-white font-bold text-xl">
        Emma Tremlet
      </div>
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to={isAdmin ? "/admin" : "/"}
            className={
              isHomeActive
                ? "text-white underline"
                : "text-white hover:text-gray-200"
            }
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "text-white underline"
                : "text-white hover:text-gray-200"
            }
          >
            Projets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-white underline"
                : "text-white hover:text-gray-200"
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
