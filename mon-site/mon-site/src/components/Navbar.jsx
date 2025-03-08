import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-yellow-500 p-4 flex items-center justify-between">
      <div className="text-white font-bold text-xl">
        Emma Tremlet
      </div>
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
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
