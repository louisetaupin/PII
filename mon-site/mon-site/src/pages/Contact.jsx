import React from "react";

function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Récupérer les données du formulaire
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      const result = await res.json();
      console.log("Succès :", result.message);
      // Affichez un message de succès à l'utilisateur
    } catch (error) {
      console.error("Erreur :", error);
      // Affichez un message d'erreur à l'utilisateur
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center">Contact</h2>
      <form className="max-w-lg mx-auto mt-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          name="message"
          placeholder="Message"
          className="w-full p-2 border rounded mb-4"
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Contact;
