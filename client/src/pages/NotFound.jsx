import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1> Vous semblez perdu </h1>
      <Link to="/carte">
        <button type="button">Revenir à la Carte</button>
      </Link>
      <br />
      <Link to="/">
        <button type="button">Revenir à l'accueil</button>
      </Link>
    </>
  );
}

export default NotFound;
