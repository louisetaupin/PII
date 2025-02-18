//schéma de la composition du site web dans la bdd
const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coverImage: { type: String, required: true }, // URL de l'image
    link: { type: String, required: true },
    description: { type: String, required: true },
    tools: { type: [String], required: true } // Liste des outils utilisés
});

const Website = mongoose.model("Website", WebsiteSchema);
module.exports = Website;
