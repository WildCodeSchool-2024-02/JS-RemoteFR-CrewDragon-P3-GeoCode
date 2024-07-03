import { Form, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";

function AdminUtilisateursEdit() {
  const user = useLoaderData();

  const {
    register,
    formState: { errors },
    trigger,
  } = useForm();

  return (
    <>
      <h1>
        {user.firstname} {user.lastname}
      </h1>

      <Form method="put">
        {/* eslint-disable react/jsx-props-no-spreading */}
        <div className="form-group-50-50">
          <div className="form-group">
            <label htmlFor="firstname">Prénom</label>{" "}
            <input
              type="text"
              id="firstname"
              defaultValue={user.firstname}
              {...register("firstname", {
                required: true,
              })}
              // Validation au moment de la perte du focus
              onBlur={() => trigger("firstname")}
            />
            {errors.firstname && (
              <p role="alert">
                {errors.firstname.type === "required" &&
                  "Vous avez oublié votre prénom ? 🤭"}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="lastname"
              defaultValue={user.lastname}
              {...register("lastname", {
                required: true,
              })}
              // Validation au moment de la perte du focus
              onBlur={() => trigger("lastname")}
            />
            {errors.lastname && (
              <p role="alert">
                {errors.lastname.type === "required" &&
                  "Vous avez oublié votre nom ? 🤭"}
              </p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            defaultValue={user.email}
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            // Validation au moment de la perte du focus
            onBlur={() => trigger("email")}
          />

          {errors.email && (
            <p role="alert">
              {errors.email.type === "required" &&
                "Vous avez oublié votre email ? 🤭"}

              {errors.email.type === "pattern" &&
                "Êtes-vous sûr d'avoir écrit correctement votre email ? 🤔"}
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="address">Adresse</label>{" "}
          <input
            type="text"
            id="address"
            defaultValue={user.address}
            {...register("address", {
              required: true,
            })}
            // Validation au moment de la perte du focus
            onBlur={() => trigger("address")}
          />
          {errors.address && (
            <p role="alert">
              {errors.address.type === "required" &&
                "Vous avez oublié où vous habitiez ? 🤭"}
            </p>
          )}
        </div>
        <div className="form-group-50-50">
          <div className="form-group">
            <label htmlFor="zip_code">Code Postal</label>{" "}
            <input
              type="text"
              id="zip_code"
              defaultValue={user.zip_code}
              {...register("zip_code", {
                required: true,
              })}
              // Validation au moment de la perte du focus
              onBlur={() => trigger("zip_code")}
            />
            {errors.zip_code && (
              <p role="alert">
                {errors.zip_code.type === "required" &&
                  "Vous avez oublié votre code postal ? 🤭"}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="city">Ville</label>{" "}
            <input
              type="text"
              id="city"
              defaultValue={user.city}
              {...register("city", {
                required: true,
              })}
              // Validation au moment de la perte du focus
              onBlur={() => trigger("city")}
            />
            {errors.city && (
              <p role="alert">
                {errors.city.type === "required" &&
                  "Vous avez oublié votre ville ? 🤭"}
              </p>
            )}
          </div>
        </div>

        <button type="submit">Modifier</button>
      </Form>

      <Form method="delete">
        <button type="submit">Supprimer</button>
      </Form>
    </>
  );
}

export default AdminUtilisateursEdit;
