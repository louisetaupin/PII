// contact.js (votre route API)
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Stockez les données dans votre base de données si nécessaire
    // Exemple : await YourModel.create({ name, email, message });

    // Configurez le transporteur pour l'envoi d'email
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,       // par exemple: smtp.gmail.com
      port: process.env.SMTP_PORT,       // par exemple: 587
      secure: false,                     // true pour 465, false pour les autres ports
      auth: {
        user: process.env.SMTP_USER,     // votre email
        pass: process.env.SMTP_PASS,     // votre mot de passe ou un mot de passe d'application
      },
      tls: {
        // Ne pas rejeter les certificats auto-signés ça peut être dangereux donc à  modifier peut être pour des questions de sécurité
        rejectUnauthorized: false,
      },
    });

    // Définissez les options de l'email
    let mailOptions = {
      from: email, // l'email de l'expéditeur (celui qui remplit le formulaire)
      to: "ltaupin@ensc.fr", // remplacez par l'adresse de destination souhaitée
      subject: `Nouveau message de ${name}`,
      text: message,
      // Optionnel : html: `<p>${message}</p>`
    };

    // Envoyez l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

module.exports = router;
