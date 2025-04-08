// Middleware pour l'authentification.

const jwt = require("jsonwebtoken"); 

function authMiddleware(req, res, next) {
    const token = req.header("Authorization");    // Récupération du token 
    if (!token) return res.status(401).json({ error: "Accès refusé" });
    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); //Vérifier et décoder le token
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Token invalide" });
    }
}

module.exports = authMiddleware;
