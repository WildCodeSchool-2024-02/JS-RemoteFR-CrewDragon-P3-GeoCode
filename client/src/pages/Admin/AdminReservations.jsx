import { useLoaderData, Link } from "react-router-dom";
import { format } from "date-fns";
import { SearchProvider, useSearch } from "../../contexts/SearchContext";
import HeaderSearchbar from "../../components/HeaderSearchbar";

function AdminReservations() {
  const items = useLoaderData(); // Récupération des items via le loader dans main.jsx

  return (
    // Import du provider ICI booking on fait remonter les items dans le Contexte
    <SearchProvider items={items}>
      <Content />
    </SearchProvider>
  );
}

// Déclaration d'un composant Content booking, on a besoin de items pour le state init du filteredItems (qui est dans le context). On peut ainsi l'appeler avec useSearch sans undefined.
function Content() {
  const { filteredItems } = useSearch();

  return (
    <section>
      <Link to="/administrateur">
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
      <HeaderSearchbar>
        {{
          title: "Les réservations enregistrées",
          label: "Trouvez ci-dessous la liste des ",
        }}
      </HeaderSearchbar>

      <p>
        {filteredItems.length === 0
          ? "Aucun résultat correspondant à la recherche"
          : `${filteredItems.length} résultat${filteredItems.length === 1 ? "" : "s"}`}
      </p>

      <ul className="admin-users-list">
        {filteredItems.map((booking) => (
          <li className="admin-users-item" key={booking.id}>
            <img
              src="https://img.icons8.com/?size=100&id=112235&format=png&color=000000"
              alt="terminal icon"
            />
            <div className="admin-bornes-infos" style={{ width: "100%" }}>
              <p>
                {" "}
                <strong> Date : </strong>{" "}
                {format(new Date(booking.date), "dd/MM/yyyy")}
              </p>
              <p>
                {" "}
                <strong> Créneau : </strong> {booking.slot}
              </p>
              <p>
                {" "}
                <strong> Borne : </strong> {booking.terminal_id}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AdminReservations;
