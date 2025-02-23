import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";

console.log("Navbar:", Navbar);
console.log("Home:", Home);
console.log("Projects:", Projects);
console.log("Contact:", Contact);
console.log("Footer:", Footer);

function App() {
  return (
    <Router> {/* 🚀 Ajout du Router ici */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
