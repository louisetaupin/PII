import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const isHomeActive = location.pathname === "/" || location.pathname.startsWith("/admin");   // Activer le soulignement si on est sur / ou /admin

  return (
    <nav className="sticky top-0 z-50 bg-yellow-500 p-4 flex items-center justify-between">
      <div className="text-black font-bold text-xl">
        Emma Tremlet
      </div>
      <ul className="flex space-x-4 font-bold">
        <li>
          <NavLink
            to={isAdmin ? "/admin" : "/"}
            className={
              isHomeActive
                ? "text-black underline"
                : "text-black hover:text-gray-200"
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
                ? "text-black underline"
                : "text-black hover:text-gray-200"
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
                ? "text-black underline"
                : "text-black hover:text-gray-200"
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
