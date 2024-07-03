import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

function AdminBornes() {
  const terminals = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredterminals, setFilteredterminals] = useState(terminals);

  const filterterminals = (query) => {
    setFilteredterminals(
      terminals.filter(
        (terminal) =>
          terminal.firstname.toLowerCase().startsWith(query.toLowerCase()) ||
          terminal.lastname.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterterminals(event.target.value);
  };

  return (
    <section>
      <Link to="/administrateur">
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
      <h1>Bornes</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="site-search">
          <Link to="/administrateur/bornes/import">
            <p className="btnBornesImport"> Importer des bornes </p>
          </Link>
          Trouvez ci-dessous la liste de nos bornes.
        </label>
        <input
          className="searchbar"
          type="search"
          id="site-search"
          name="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Rechercher une borne 🔎"
        />
      </form>
      <p>
        {filteredterminals.length === 0
          ? "Aucune borne correpondant à la recherche"
          : `${filteredterminals.length} borne${filteredterminals.length === 1 ? "" : "s"}`}
      </p>

      <ul className="admin-terminals-list">
        {filteredterminals.map((terminal) => (
          <Link to={`/administrateur/bornes/${terminal.id}`} key={terminal.id}>
            <li className="admin-terminals-item">
              <div className="admin-terminals-infos">
                <p>{terminal.name}</p>
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

export default AdminBornes;
