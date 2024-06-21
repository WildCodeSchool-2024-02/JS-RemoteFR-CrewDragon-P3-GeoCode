import { Link } from "react-router-dom";

function Inscription() {
  return (
    <section>
      <h1> Bonjour je suis l'inscription </h1>
      <Link to="/connexion"> J'ai déjà un compte </Link>
      <Link to=":">Poursuivre</Link>
    </section>
  );
}

export default Inscription;
