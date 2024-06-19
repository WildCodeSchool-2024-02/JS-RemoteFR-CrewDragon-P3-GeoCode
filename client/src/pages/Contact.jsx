import { Link } from "react-router-dom";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motif: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      nom: "",
      prenom: "",
      email: "",
      motif: "",
      message: "",
    });
  };

  return (
    <section className="contact-section">
      <h1>Contactez-nous</h1>
      <p>Vos coordonnées</p>
      <form onSubmit={handleSubmit} className="formulaire-contact">
        <div id="container">
          <div className="form-group">
            <label htmlFor="nom" className="form-label">
              Nom:
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenom" className="form-label">
              Prénom:
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Votre Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="motif" className="form-label">
            Motif:
          </label>
          <input
            type="text"
            id="motif"
            name="motif"
            value={formData.motif}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea>
            id="message" name="message" value={formData.message}
            onChange={handleChange}
            className="form-textarea" required
          </textarea>
        </div>
        <Link to="/aides/" className="help-center-link">
          Accéder au help center
        </Link>
        <button type="submit" className="form-button">
          Envoyer ma demande
        </button>
      </form>
    </section>
  );
}

export default Contact;
