// Middleware pour la vérification des droits d'accès administrateur.

const adminMiddleware = (req, res, next) => { // utilisateur authentifié et rôle "admin".
    if (req.user && req.user.role === "admin") {
        next(); // Autoriser l'accès.
    } else {
        // Sinon, l'accès est refusé.
        res.status(403).json({ error: "Accès interdit : admin uniquement" });
    }
};

module.exports = adminMiddleware;
