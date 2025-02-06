const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Accès refusé" });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Token invalide" });
    }
}

module.exports = authMiddleware;

const authMiddleware = require("./middleware/authMiddleware");

app.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "Tu as accès à cette route protégée", user: req.user });
});
