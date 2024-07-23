import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useLoaderData } from "react-router-dom";


function Inscription() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const brandData = useLoaderData();

  const navigate = useNavigate();

  // Surveille le champ de mot de passe pour indiquer ce qu'il manque
  const validatePassword = (value) => {
    if (!/(?=.*[a-z])/.test(value)) {
      return "Il vous manque une lettre minuscule. 🙃";
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Il vous manque une lettre majuscule. 🙃";
    }
    if (!/(?=.*\d)/.test(value)) {
      return "Il vous manque un chiffre. 🙃";
    }
    if (!/(?=.*[\W_])/.test(value)) {
      return "Il vous manque un caractère spécial. 🙃";
    }
    if (!/.{8,}/.test(value)) {
      return "Il vous manque des caractères pour atteindre 8 caractères. 🙃";
    }
    return true;
  };

  // Surveille le champ de mot de passe pour le mot de passe à confirmer
  const password = watch("password");

  // Surveille le champ de marque pour afficher les modèles
  const watchBrand = watch("brand");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const watchModel = watch("model");

  useEffect(() => {
    const brand = brandData.find((b) => b.id === parseInt(watchBrand, 10));
    setSelectedBrand(brand);
  }, [watchBrand]);

  const onSubmit = async (data) => {
    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auths/register`, // change road register
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Data for user table
            avatar: `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 30)}`,
            email: data.email,
            birthday: data.birthday,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            address: data.address,
            zip_code: data.zip_code,
            city: data.city,
            // Data for car table
            name: data.name,
            image: `https://avatar.iran.liara.run/username?username=${data.name.split(" ").join("+")}`,
            model_id: parseInt(watchModel, 10),
          }),
        }
      );
      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        toast.success("🚗 Inscription réussie !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/connexion");
        }, 1500); // Adjust the delay as needed
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
        toast.error("🚗 Erreur lors de l'inscription!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1>Rejoignez la communauté ! </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <details open>
          <summary>Vos informations</summary>

          <div className="form-group-50-50">
            <div className="form-group">
              <label htmlFor="firstname">Prénom</label>{" "}
              <input
                type="text"
                id="firstname"
                placeholder="Simon"
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
                placeholder="Beget"
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
            <label htmlFor="birthday">Date de naissance</label>{" "}
            <input
              type="date"
              id="birthday"
              {...register("birthday", {
                required: "Vous avez oublié votre date de naissance ? 🤭",
              })}
              onBlur={() => trigger("birthday")}
            />
            {errors.birthday && <p role="alert">{errors.birthday.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="simon.beget@greendrive.com"
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
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>{" "}
              <div
                className="password-container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: true,
                    validate: validatePassword,
                  })}
                  onBlur={() => trigger("password")}
                />
                <span
                  aria-hidden="true"
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p role="alert">
                  {errors.password.type === "required" &&
                    "Un mot de passe est obligatoire pour protéger l'accès à votre compte"}
                  {errors.password.type === "validate" &&
                    errors.password.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <div
                className="password-container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
              <input
               type={showPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "La confirmation du mot de passe est obligatoire",
                  validate: (value) =>
                    value === password ||
                    "Les mots de passe ne correspondent pas",
                })}
                onBlur={() => trigger("confirmPassword")}
              />
              <span
                  aria-hidden="true"
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                </div>

              {errors.confirmPassword && (
                <p role="alert">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </details>
        <details>
          <summary>Votre adresse</summary>

          <div className="form-group">
            <label htmlFor="address">Adresse</label>{" "}
            <input
              type="text"
              id="address"
              placeholder="10 Rue de la Mouette Rieuse"
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
                placeholder="44000"
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
                placeholder="Nantes"
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
        </details>
        <details>
          <summary>Votre voiture</summary>

          <div className="form-group">
            <label htmlFor="name">Nom de la voiture</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Le nom de la voiture est obligatoire",
              })}
              onBlur={() => trigger("name")}
            />

            {errors.name && <p role="alert">{errors.name.message}</p>}
          </div>
          <div className="form-group-50-50">
            <div className="form-group">
              <label htmlFor="brand">Marque de la voiture</label>
              <select
                id="brand"
                name="brand"
                {...register("brand", {
                  required: "La marque de la voiture est obligatoire",
                })}
                onBlur={() => trigger("brand")}
              >
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
                <select
                  id="model"
                  name="model"
                  {...register("model", {
                    required: "Le modèle de la voiture est obligatoire",
                  })}
                  onBlur={() => trigger("model")}
                >
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
        </details>

        <button type="submit">Créer mon compte</button>
      </form>

      <Link to="/connexion"> J'ai déjà un compte </Link>
    </section>
  );
}

export default Inscription;
