import { Form, useLoaderData, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Déclaration d'un composant Content CAR, on a besoin de vehicules pour le state init du filteredvehicules (qui est dans le context). On peut ainsi l'appeler avec useSearch sans undefined.
function ProfilVehicules() {
  const { vehicules, brandData } = useLoaderData();
  const { trigger, watch, register } = useForm();

  const authData = Cookies.get("authData");
  let sub = null;

  if (authData) {
    const authDecoded = jwtDecode(authData);
    sub = authDecoded.sub;
  }

  const watchBrand = watch("brand");
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const brand = brandData.find((b) => b.id === parseInt(watchBrand, 10));
    setSelectedBrand(brand);
  }, [watchBrand]);

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
        {vehicules.map((vehicule) => (
          <Link
            to={`/profil/gestion/${sub}/vehicules/${vehicule.id}/edit`}
            key={vehicule.id}
          >
            <li className="admin-users-item">
              <img src={vehicule.image} alt={`${vehicule.name}`} />
              <div className="admin-bornes-infos" style={{ width: "100%" }}>
                <p>
                  <strong> Nom : </strong>
                  {vehicule.name}
                </p>
                <p>
                  <strong> Modèle: </strong>
                  {vehicule.m_name}
                </p>
                <p>
                  <strong> Marque : </strong>
                  {vehicule.b_name}
                </p>
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
      {/* eslint-disable react/jsx-props-no-spreading */}
      <Form method="post">
        <h2 style={{ marginTop: "2rem" }}>Ajouter un véhicule </h2>
        <div className="form-group">
          <label htmlFor="name">Nom de la voiture</label>
          <input
            id="name"
            name="name"
            // Validation au moment de la perte du focus
            onBlur={() => trigger("name")}
          />
        </div>

        <div className="form-group-50-50">
          <div className="form-group">
            <label htmlFor="brand">Marque de la voiture</label>
            <select
              id="brand"
              name="brand"
              {...register("brand")}
              onBlur={() => trigger("brand")}
            >
              {brandData.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {selectedBrand && (
            <div className="form-group">
              <label htmlFor="model">Modèle de la voiture</label>
              <select
                id="model"
                name="model"
                {...register("model")}
                onBlur={() => trigger("model")}
              >
                {selectedBrand.models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button type="submit">Envoyer</button>
      </Form>
    </section>
  );
}

export default ProfilVehicules;
