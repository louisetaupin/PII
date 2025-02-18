const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // Autoriser l'accès
    } else {
        res.status(403).json({ error: "Accès interdit : admin uniquement" });
    }
};

module.exports = adminMiddleware;
