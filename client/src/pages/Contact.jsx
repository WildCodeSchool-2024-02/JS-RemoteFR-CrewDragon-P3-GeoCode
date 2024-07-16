import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";

function Contact() {
  const notify = () =>
    toast.success("🚗 Message envoyé !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
    <section>
      <h1>Contactez-nous</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group-50-50">
          <div className="form-group">
            <label htmlFor="firstname">Prénom</label>{" "}
            <input type="text" id="firstname" placeholder="Simon" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Nom</label>
            <input type="text" id="lastname" placeholder="Beget" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="simon.beget@greendrive.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="motif" className="form-label">
            Motif
          </label>
          <select id="subject" name="subject" required>
            <option value="">--Sélectionnez un motif--</option>
            <option value="question">Question générale</option>
            <option value="support">Support technique</option>
            <option value="feedback">Retour d'expérience</option>
            <option value="other">Autre</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button
          type="submit"
          id="submit-bouton"
          style={{ display: "block" }}
          onClick={notify}
        >
          Envoyer ma demande
        </button>
        <ToastContainer />
        <Link to="/aides/" className="btn-secondary">
          Accéder au help center
        </Link>
      </form>
    </section>
  );
}

export default Contact;
