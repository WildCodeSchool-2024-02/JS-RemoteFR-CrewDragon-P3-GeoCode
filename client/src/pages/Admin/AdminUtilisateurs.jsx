import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

function AdminUtilisateur() {
  const users = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const filterUsers = (query) => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.firstname.toLowerCase().startsWith(query.toLowerCase()) ||
          user.lastname.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterUsers(event.target.value);
  };

  return (
    <section>
      <h1>Mes utilisateurs</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="site-search">
          Trouvez ci-dessous la liste de vos utilisateurs.
        </label>
        <input
          className="searchbar"
          type="search"
          id="site-search"
          name="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Rechercher un utilisateur 🔎"
        />
      </form>
      <p>
        {filteredUsers.length === 0
          ? "Aucun utilisateur correpondant à la recherche"
          : `${filteredUsers.length} utilisateur${filteredUsers.length === 1 ? "" : "s"}`}
      </p>

      <ul className="admin-users-list">
        {filteredUsers.map((user) => (
          <Link to={`/administrateur/utilisateurs/${user.id}`} key={user.id}>
            <li className="admin-users-item">
              <img
                src={user.image}
                alt={`${user.firstname} ${user.lastname}`}
              />
              <div className="admin-users-infos">
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
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

export default AdminUtilisateur;
