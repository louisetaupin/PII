const express = require("express");
const nodemailer = require("nodemailer"); //utilisation de nodemailer pour envoyer un mail
const router = express.Router();

/** 🟢 Envoyer un mail **/
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configuration du transporteur pour l'envoi d'email
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,       //Gmail
      port: process.env.SMTP_PORT,       //Port
      secure: false,                     // Selon le port
      auth: {
        user: process.env.SMTP_USER,     // email à modifier dans .env si besoin de changer le destinataire
        pass: process.env.SMTP_PASS,     // Mot de passe d'application
      },
      tls: {
        rejectUnauthorized: false,         // Ne pas rejeter les certificats auto-signés 
      },
    });

    // Options de l'email
    let mailOptions = {
      from: `${email}`, // l'email de l'expéditeur 
      to: "ltaupin@ensc.fr", // l'email du destinataire
      subject: `Nouveau message de ${name}`,
      text: `Message de ${name} (${email}) :\n\n${message}`,
      replyTo: `${email}`, // Réponse directement à l'expéditeur
    };

    // Envoi du mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

module.exports = router;
