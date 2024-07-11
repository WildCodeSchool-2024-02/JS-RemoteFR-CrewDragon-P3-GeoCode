import { useLoaderData, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Déclaration d'un composant Content CAR, on a besoin de items pour le state init du filteredItems (qui est dans le context). On peut ainsi l'appeler avec useSearch sans undefined.
function ProfilVehicules() {
  const items = useLoaderData(); // Récupération des items via le loader dans main.jsx
  const authData = Cookies.get("authData");
  let sub = null;

  if (authData) {
    const authDecoded = jwtDecode(authData);
    sub = authDecoded.sub;
  }

  return (
    <section>
      <Link to={`/profil/gestion/${sub}/`}>
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
      <h1>Mes véhicules</h1>

      <ul className="admin-users-list">
        {items.map((vehicule) => (
          <Link
            to={`/profil/gestion/${vehicule.id}/vehicules/edit`}
            key={vehicule.id}
          >
            <li className="admin-users-item">
              <img src={vehicule.image} alt={`${vehicule.name}`} />
              <div className="admin-users-infos">
                <p>{vehicule.name}</p>
                <p>{vehicule.n_name}</p>
                <p>{vehicule.b_name}</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                height={20}
                width={20}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" />
              </svg>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default ProfilVehicules;
