import { Link } from "react-router-dom";

function Contact() {
  return (
    <section>
      <h1> Bonjour je suis Contact </h1>
      <Link to="/aides/"> Accéder au help center </Link>
      <button type="submit">Envoyer ma demande</button>
    </section>
  );
}

export default Contact;
