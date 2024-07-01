import { Link } from "react-router-dom";

function Borne() {
  return (
    <>
      <h1> Bonjour je suis Borne </h1>;
      <Link to="/carte" className="accueil-link">
        {" "}
        <button type="button"> Retour à la carte </button>{" "}
      </Link>
    </>
  );
}

export default Borne;
