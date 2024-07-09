import { Link, useLoaderData } from "react-router-dom";

function Borne() {
  const terminal = useLoaderData();

  return (
    <>
      <h1>
        {" "}
        Bonjour je suis Borne {terminal.id} {terminal.name}{" "}
      </h1>
      ;
      <Link to="/carte" className="accueil-link">
        {" "}
        <button type="button"> Retour à la carte </button>{" "}
      </Link>
    </>
  );
}

export default Borne;
