const express = require("express");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const Home = require("../models/home");
const router = express.Router();

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../mon-site/mon-site/public")); //Dans le dossier public du site React
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueName = `${Date.now()}-${baseName}${ext}`;
    cb(null, uniqueName); // Nom unique
  },
});

const upload = multer({ storage });

/** 🟠 UPDATE (Remplacer la photo ou le CV et modifier la description) **/
router.put("/presentation", authenticateToken, isAdmin, upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "cv", maxCount: 1 }
]), async (req, res) => {
  try {
    const photoName = req.files?.photo?.[0]?.filename;  
    const cvName = req.files?.cv?.[0]?.filename;    
    const { description } = req.body;
    const update = {};
    if (photoName) update.photo = photoName;
    if (cvName) update.cv = cvName;
    if (description) update.description = description;

    const updated = await Home.findOneAndUpdate({}, update, { new: true, upsert: true });

    res.json(updated); // photo et cv seront des noms simples ex: "emma.jpg"
  } catch (err) {
    console.error("❌ Erreur upload :", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
});

/** 🟠 UPDATE (Modifier la Timeline) **/
router.put("/timeline", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { timeline } = req.body;
    const updated = await Home.findOneAndUpdate({}, { timeline }, { new: true, upsert: true });
    res.json(updated); 
  } catch (err) {
    console.error("❌ Erreur dans PUT /admin/timeline :", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la timeline" });
  }
});


module.exports = router;
