import React, { useState } from "react";

function Contact() {
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); //  état de chargement

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      const result = await res.json();
      console.log("Succès :", result.message);

      setIsError(false);
      setStatusMessage("✅ Votre message a bien été envoyé !");
      e.target.reset();
    } catch (error) {
      console.error("Erreur :", error);
      setIsError(true);
      setStatusMessage("❌ Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
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
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          className="w-full p-2 border rounded mb-4"
          required
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex justify-center items-center bg-yellow-500 text-white px-4 py-2 rounded w-full ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            "Envoyer"
          )}
        </button>
      </form>

      {statusMessage && (
        <p
          className={`mt-4 text-center font-semibold ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default Contact;
