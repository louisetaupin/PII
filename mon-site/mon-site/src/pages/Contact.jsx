function Contact() {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center">Contact</h2>
        <form className="max-w-lg mx-auto mt-6">
          <input type="text" placeholder="Nom" className="w-full p-2 border rounded mb-4" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" />
          <textarea placeholder="Message" className="w-full p-2 border rounded mb-4"></textarea>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded w-full">Envoyer</button>
        </form>
      </div>
    );
  }
  
  export default Contact;
  