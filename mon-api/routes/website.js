const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ✅ Définition correcte d'une route protégée
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Bienvenue sur l'interface admin !" });
});
router.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "Tu as accès à cette route protégée", user: req.user });
});
module.exports = router;



const Website = require("../models/website");


router.post("/websites", adminMiddleware, async (req, res) => { 

})
    // Seuls les administrateurs connectés peuvent ajouter un site
router.delete("/websites/:id", authMiddleware, adminMiddleware, async (req, res) => {
        // Seuls les admins peuvent supprimer un site
});
router.put("/websites/:id", authMiddleware, adminMiddleware, async (req, res) => {
    // Seuls les admins peuvent modifier un site
});

/** 🟢 CREATE (Ajouter un site) */
router.post("/", async (req, res) => {
    try {
        const { name, coverImage, link, description, tools } = req.body;
        const newWebsite = new Website({ name, coverImage, link, description, tools });
        await newWebsite.save();
        res.status(201).json({ message: "Site ajouté avec succès", website: newWebsite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'ajout du site" });
    }
});

/** 🔵 READ (Obtenir tous les sites) */
router.get("/", async (req, res) => {
    try {
        const websites = await Website.find();
        res.json(websites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des sites" });
    }
});

/** 🔍 READ (Obtenir un site par ID) */
router.get("/:id", async (req, res) => {
    try {
        const website = await Website.findById(req.params.id);
        if (!website) return res.status(404).json({ error: "Site non trouvé" });
        res.json(website);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du site" });
    }
});

/** 🟠 UPDATE (Modifier un site) */
router.put("/:id", async (req, res) => {
    try {
        const updatedWebsite = await Website.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWebsite) return res.status(404).json({ error: "Site non trouvé" });
        res.json({ message: "Site mis à jour avec succès", website: updatedWebsite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du site" });
    }
});

/** 🔴 DELETE (Supprimer un site) */
router.delete("/:id", async (req, res) => {
    try {
        const deletedWebsite = await Website.findByIdAndDelete(req.params.id);
        if (!deletedWebsite) return res.status(404).json({ error: "Site non trouvé" });
        res.json({ message: "Site supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression du site" });
    }
});

module.exports = router;
