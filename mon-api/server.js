require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Pour traiter le JSON
app.use(express.urlencoded({ extended: true })); //Pour traiter les formulaires FormData
app.use(cors()); // Permettre les requêtes du front

// Connexion MongoDB
console.log("MONGO_URI:", process.env.MONGO_URI); // Vérifie si la variable est bien lue
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Charger les modèles et routes API
const websiteRoutes = require("./routes/website");
app.use("/api/websites", websiteRoutes);
const authRoutes = require("./routes/auth");  
app.use("/api/auth", authRoutes);
const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);
const homeRoute = require("./routes/home");
app.use("/api/home", homeRoute);  


// Route de test pour voir si le serveur fonctionne
app.get("/", (req, res) => {
    res.status(200).json({ message: "🚀 Serveur en ligne !" });
});

// Démarrer le serveur
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
