import { Form, useLoaderData, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Déclaration d'un composant Content CAR, on a besoin de items pour le state init du filteredItems (qui est dans le context). On peut ainsi l'appeler avec useSearch sans undefined.
function ProfilReservation() {
  const items = useLoaderData(); // Récupération des items via le loader dans main.jsx

  console.info(items);

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
      <h1>Mes réservations</h1>

      <ul className="admin-users-list">
        {items.map((reservation) => (
          <li className="admin-users-item" key={reservation.id}>
            <div className="admin-users-infos">
              <p>{reservation.date}</p>
              <p>{reservation.slot}</p>
              <p>{reservation.terminal_id}</p>
            </div>
            <Form method="delete">
              <button type="submit" className="btn-secondary">
                Annuler ma réservation
              </button>
            </Form>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProfilReservation;
