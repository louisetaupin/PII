require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Charger les modèles et routes
const websiteRoutes = require("./routes/website");
const userRoutes = require("./models/user"); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Pour traiter le JSON
app.use(cors()); // Permettre les requêtes du front

// Connexion MongoDB
console.log("MONGO_URI:", process.env.MONGO_URI); // Vérifie si la variable est bien lue
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Routes API
app.use("/api/websites", websiteRoutes);
const authRoutes = require("./routes/auth");  // Ajout des routes d'authentification
app.use("/api/auth", authRoutes);
const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

// Route de test pour voir si le serveur fonctionne
app.get("/", (req, res) => {
    res.status(200).json({ message: "🚀 Serveur en ligne !" });
});

// Démarrer le serveur
app.listen(PORT, () => console.log(`✅ Serveur démarré sur le port ${PORT}`));
