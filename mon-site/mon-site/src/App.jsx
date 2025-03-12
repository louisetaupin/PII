import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des composants
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import des pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar toujours visible */}
        <Navbar />

        {/* Routes pour chaque page */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path="admin">
              {/* edit les routes auxquelles l'admin a accès */}
            </Route>
          </Routes>
        </div>

        {/* Footer toujours visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
