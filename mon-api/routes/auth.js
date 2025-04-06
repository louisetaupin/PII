const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Assure-toi que ce modèle est correct
const router = express.Router();

/** 🔐 Inscription */
router.post("/register", async (req, res) => {
    try {
        const { username, password, role = "user" } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: "✅ Utilisateur créé avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "❌ Erreur lors de l'inscription" });
    }
});

/** 🔑 Connexion */
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "❌ Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "❌ Mot de passe incorrect" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "✅ Connexion réussie",
            token,
            user: {
              username: user.username,
              role: user.role
            }
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "❌ Erreur lors de la connexion" });
    }
});

module.exports = router;
