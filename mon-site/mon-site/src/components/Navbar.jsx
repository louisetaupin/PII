import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Emma Tremlet</h1>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Présentation</Link></li>
        <li><Link to="/projects" className="hover:underline">Mes projets</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
