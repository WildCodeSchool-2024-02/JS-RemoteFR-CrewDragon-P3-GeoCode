// import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import "./styles/AdminUtilisateurs.scss";

const sampleUsers = [
  {
    id: 21,
    image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    email: "Pattie.Strosin77@gmail.com",
    password: "RyhPKgHyQHSBdv5",
    firstname: "Viva",
    lastname: "Alena",
    birthday: "1945-01-16T23:00:00.000Z",
    address: "99730 Garden Close",
    zip_code: "45357-5899",
    city: "Neldastead",
    role_id: 22,
  },
  {
    id: 22,
    image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    email: "Cathrine_Beahan@gmail.com",
    password: "IzrqUdvJQwZIR2y",
    firstname: "Kaleigh",
    lastname: "Kraig",
    birthday: "1957-09-05T23:00:00.000Z",
    address: "5639 Elisa Ford",
    zip_code: "57667",
    city: "Lehigh Acres",
    role_id: 29,
  },
  {
    id: 23,
    image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    email: "Aisha_Will@gmail.com",
    password: "un3pUL9FNyW9x5W",
    firstname: "Easter",
    lastname: "Anjali",
    birthday: "1994-12-29T23:00:00.000Z",
    address: "3262 New Street",
    zip_code: "46888-8919",
    city: "Joanaton",
    role_id: 25,
  },
  {
    id: 24,
    image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    email: "Orie_Mante74@gmail.com",
    password: "dHpK5Wb4YtH3eCV",
    firstname: "Janessa",
    lastname: "Katelynn",
    birthday: "1971-11-04T23:00:00.000Z",
    address: "4699 Memorial Drive",
    zip_code: "02668-2770",
    city: "Lake Brianmouth",
    role_id: 27,
  },
  {
    id: 28,
    image: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
    email: "Bria.Bode@gmail.com",
    password: "9T7AnsWI0z3RRBs",
    firstname: "Donna",
    lastname: "Nayeli",
    birthday: "2002-12-03T23:00:00.000Z",
    address: "83040 Domenick Greens",
    zip_code: "91023",
    city: "Schenectady",
    role_id: 21,
  },
];

function AdminUtilisateur() {
  // const users = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(sampleUsers);

  const filterUsers = (query) => {
    setFilteredUsers(
      sampleUsers.filter(
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
    <div>
      <h1>Mes utilisateurs</h1>
      <p>Trouvez ci-dessous la liste de vos utilisateurs.</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="site-search">Chercher un utilisateur:</label>
        <input
          type="search"
          id="site-search"
          name="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Chercher</button>
      </form>

      <ul className="admin-users-list">
        {filteredUsers.map((user) => (
          <li className="admin-users-item" key={user.id}>
            <img src={user.image} alt={`${user.firstname} ${user.lastname}`} />
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
            <svg
              viewBox="0 0 24 24"
              height={20}
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUtilisateur;
