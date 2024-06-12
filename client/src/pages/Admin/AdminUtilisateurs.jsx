import { useLoaderData } from "react-router-dom";

function AdminUtilisateur() {
  const users = useLoaderData();

  return (
    <div>
      <h1>Je suis la page Administrateur Utilisateurs</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstname}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUtilisateur;
