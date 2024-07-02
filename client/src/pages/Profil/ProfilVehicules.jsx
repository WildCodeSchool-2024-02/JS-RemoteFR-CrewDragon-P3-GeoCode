import { Link, useLoaderData } from "react-router-dom";

function ProfilVehicules() {
  const user = useLoaderData();

  return (
    <>
      <h1>Coucou je suis la page ProfilVehicules</h1>;
      <Link
        className="profil-user-button"
        to={`/profil/gestion/${user.user_id}/vehicules/edit`}
      >
        Modifier mes véhicules
      </Link>
    </>
  );
}

export default ProfilVehicules;
