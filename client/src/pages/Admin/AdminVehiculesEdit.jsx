import { Form, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function AdminVehiculesEdit() {
  const { vehicule, brandData } = useLoaderData();

  console.info(brandData);

  const {
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const watchBrand = watch("brand");
  const [selectedBrand, setSelectedBrand] = useState(null);

  console.info(selectedBrand);

  useEffect(() => {
    const brand = brandData.find((b) => b.id === parseInt(watchBrand, 10));
    setSelectedBrand(brand);
  }, [watchBrand]);

  return (
    <>
      <h1> {vehicule.name} </h1>
      <Form method="put">
        <div className="form-group">
          <label htmlFor="name">Nom de la voiture</label>
          <input type="text" id="name" onBlur={() => trigger("name")} />
        </div>
        <div className="form-group-50-50">
          <div className="form-group">
            <label htmlFor="brand">Marque de la voiture</label>
            <select id="brand" name="brand" onBlur={() => trigger("brand")}>
              <option value="">Choisissez une marque</option>
              {brandData.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>

            {errors.name && <p role="alert">{errors.name.message}</p>}
          </div>

          {selectedBrand && (
            <div className="form-group">
              <label htmlFor="model">Modèle de la voiture</label>
              <select id="model" name="model">
                <option value="">Choisissez un modèle</option>
                {selectedBrand.models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>

              {errors.name && <p role="alert">{errors.name.message}</p>}
            </div>
          )}
        </div>

        <button type="submit">Modifier</button>
      </Form>

      <Form method="delete">
        <button type="submit">Supprimer</button>
      </Form>
    </>
  );
}

export default AdminVehiculesEdit;
