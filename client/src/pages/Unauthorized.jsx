import { Link } from "react-router-dom";
import Visuel from "../assets/images/notfound/Visuel.png";


function Unauthorized() {
  return (
    <>
      <h1> Vous n'avez pas les droits </h1>
      <img src={Visuel} alt="Not Found" className="information-id-image" />
      <Link to="/carte">
        <button type="button" className="btn-secondary">Revenir à la Carte</button>
      </Link>
      <br />
      <Link to="/">
        <button type="button">Revenir à l'accueil</button>
      </Link>
    </>
  );
}

export default Unauthorized;
