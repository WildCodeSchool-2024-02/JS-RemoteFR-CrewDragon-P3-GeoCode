import { Form, useLoaderData, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Déclaration d'un composant Content CAR, on a besoin de items pour le state init du filteredItems (qui est dans le context). On peut ainsi l'appeler avec useSearch sans undefined.
function ProfilReservation() {
  const items = useLoaderData();

  const authData = Cookies.get("authData");
  let sub = null;

  if (authData) {
    const authDecoded = jwtDecode(authData);
    sub = authDecoded.sub;
  }

  // Hook pour la navigation
  const navigate = useNavigate();

  const handleDelete = async (reservationId) => {
    try {
      const headers = {
        Authorization: `Bearer ${authData}`,
        credentials: "include",
      };

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/bookings/${reservationId}/`,
        { headers }
      );
      navigate(`/profil/gestion/${sub}/`);
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation :", error);
    }
  };

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
      <p>
        {items.length === 0
          ? "Vous n'avez pas de réservations pour le moment."
          : `${items.length} réservation${items.length === 1 ? "" : "s"}`}
      </p>

      <ul className="admin-users-list">
        {items.map((reservation) => (
          <li className="admin-users-item" key={reservation.id}>
            <img
              src="https://img.icons8.com/?size=100&id=112235&format=png&color=000000"
              alt="terminal icon"
            />
            <div className="admin-bornes-infos">
              <p>
                {" "}
                <strong> Date : </strong>{" "}
                {format(new Date(reservation.date), "dd/MM/yyyy")}
              </p>
              <p>
                {" "}
                <strong> Créneau : </strong> {reservation.slot}
              </p>
              <p>
                {" "}
                <strong> Borne : </strong> {reservation.terminal_id}
              </p>
            </div>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete(reservation.id); // Appel de la fonction de suppression avec l'ID de la réservation
              }}
            >
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
