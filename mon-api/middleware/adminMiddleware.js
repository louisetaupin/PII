function adminMiddleware(req, res, next) {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Accès interdit" });
    next();
}

app.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Bienvenue sur la page admin" });
});
