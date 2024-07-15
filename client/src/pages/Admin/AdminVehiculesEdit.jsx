import { Form, Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";

function AdminVehiculesEdit() {
  const [cars, setCars] = useState([]);
  console.info(cars);
  const { vehicule, brandData } = useLoaderData();
  const { auth } = useAuth();
  const { trigger, watch, register } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/${vehicule.user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        );
        setCars(response.data.cars);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const watchBrand = watch("brand");
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const brand = brandData.find((b) => b.id === parseInt(watchBrand, 10));
    setSelectedBrand(brand);
  }, [watchBrand]);

  return (
    <>
      <Link to="/administrateur/vehicules">
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
      <h1> Modifier {vehicule.name} </h1>

      <Form method="put">
        {/* eslint-disable react/jsx-props-no-spreading */}
        <div className="profil-user-container">
          <img src={vehicule.image} alt="" className="profil-user-avatar" />
        </div>
        <div className="form-group">
          <label htmlFor="image"> Image </label>{" "}
          <input
            type="text"
            id="image"
            name="image"
            defaultValue={vehicule.image}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nom de la voiture</label>
          <input
            id="name"
            name="name"
            defaultValue={vehicule.name}
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
                <option
                  key={brand.id}
                  value={brand.id}
                  selected={brand.name === vehicule.b_name ? "selected" : ""}
                >
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
                  <option
                    key={model.id}
                    value={model.id}
                    selected={model.name === vehicule.m_name ? "selected" : ""}
                  >
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button type="submit">Modifier</button>
      </Form>
      {cars.length > 1 ? (
        <Form method="delete">
          <button type="submit">Supprimer</button>
        </Form>
      ) : (
        ""
      )}
    </>
  );
}

export default AdminVehiculesEdit;
