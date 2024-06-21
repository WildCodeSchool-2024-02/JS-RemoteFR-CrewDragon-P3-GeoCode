import { useLoaderData, Link } from "react-router-dom";

function ProfilUtilisateur() {
  const user = useLoaderData();
  return (
    <div className="profile-container">
      <img src={user.avatar} alt="" className="profil-Avatar" />

      <h2 className="profil-title">
        <p>
          {user.firstname} {user.lastname}
        </p>
      </h2>
      <div className="profile-header">
        <div className="profile-details">
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Date de naissance:</strong> {user.birthday}
          </div>
          <div>
            <strong>Adresse:</strong> {user.address} {user.zip_code} {user.city}
          </div>
          <Link to={`/profil/utilisateur/edit/${user.user_id}`}>
            <button type="button"> Je veux editer mon profil </button>
          </Link>
          <p> {user.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilUtilisateur;
