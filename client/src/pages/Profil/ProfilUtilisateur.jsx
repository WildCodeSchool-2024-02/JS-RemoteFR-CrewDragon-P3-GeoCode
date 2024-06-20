import { useLoaderData } from "react-router-dom";

function ProfilUtilisateur() {
  const user = useLoaderData();

  return <h1>Coucou je suis la page {user.firstname}</h1>;
}

export default ProfilUtilisateur;
