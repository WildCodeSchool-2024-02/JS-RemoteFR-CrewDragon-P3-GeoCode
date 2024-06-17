import { Link } from "react-router-dom";

function Accueil() {
  return (
    <section>
      <h1> Bonjour je suis l'accueil </h1>
      <Link to="/connexion"> Créer votre compte </Link>
      <Link to="/inscription">Inscrivez-vous</Link>
      <Link to="/carte"> Accéder directement à la carte </Link>
    </section>
  );
}

export default Accueil;
