const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const Website = require("../models/website");

// 🟣  Définition correcte d'une route protégée
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Bienvenue sur l'interface admin !" });
});
router.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "Tu as accès à cette route protégée", user: req.user });
});
module.exports = router;


// Seuls les administrateurs connectés peuvent ajouter un site
router.post("/websites", adminMiddleware, async (req, res) => { 
})
// Seuls les admins peuvent supprimer un site
router.delete("/websites/:id", authMiddleware, adminMiddleware, async (req, res) => {
});
// Seuls les admins peuvent modifier un site
router.put("/websites/:id", authMiddleware, adminMiddleware, async (req, res) => {
});

/** 🟢 Ajouter un site **/
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

/** 🔵 Obtenir tous les sites disponibles **/
router.get("/", async (req, res) => {
    try {
        const websites = await Website.find({archived:false});
        res.json(websites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des sites" });
    }
});

    /** 🔵 Obtenir tous les sites archivés **/
    router.get("/archived", authMiddleware, adminMiddleware, async (req, res) => {
        try {
          const archivedWebsites = await Website.find({ archived: true });
          res.json(archivedWebsites);
        } catch (error) {
          res.status(500).json({ error: "Erreur lors de la récupération des projets archivés" });
        }
      });
      

/** 🟠 Modifier un site **/
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

/** 🔴 Supprimer un site **/
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const deletedWebsite = await Website.findByIdAndDelete(req.params.id);
        if (!deletedWebsite) return res.status(404).json({ error: "Site non trouvé" });
        res.json({ message: "Site supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression du site" });
    }
});

/** 🟠 Archiver un site **/
router.patch("/archive/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const updated = await Website.findByIdAndUpdate(
        req.params.id,
        { archived: true },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: "Projet non trouvé" });
      res.json({ message: "Projet archivé avec succès", website: updated });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'archivage du projet" });
    }
  });
  
  /**  🟠 Désarchiver un site **/
router.patch("/unarchive/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const updated = await Website.findByIdAndUpdate(
        req.params.id,
        { archived: false },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: "Projet non trouvé" });
      res.json({ message: "Projet désarchivé avec succès", website: updated });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors du désarchivage du projet" });
    }
  });
  
module.exports = router;
