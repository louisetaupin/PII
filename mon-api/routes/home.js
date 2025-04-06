const express = require("express");
const router = express.Router();
const Home = require("../models/home");

// Récupérer les données de la page d’accueil
router.get("/", async (req, res) => {
  try {
    const data = await Home.findOne();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des données" });
  }
});

module.exports = router;
