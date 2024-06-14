import { useLoaderData } from "react-router-dom";
import { useState } from "react";

function AdminVehicule() {
  const cars = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);

  const filterCars = (query) => {
    setFilteredCars(
      cars.filter((car) =>
        car.name.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterCars(event.target.value);
  };

  return (
    <div>
      <h1>Vehicules</h1>
      <p>Trouvez ci-dessous la liste de des vehicules.</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="site-search">Chercher un vehicule:</label>
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
        {filteredCars.map((car) => (
          <li className="admin-users-item" key={car.id}>
            <img src={car.image} alt={car.name} />
            <div className="admin-users-infos">
              <p>{car.name}</p>
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

export default AdminVehicule;
