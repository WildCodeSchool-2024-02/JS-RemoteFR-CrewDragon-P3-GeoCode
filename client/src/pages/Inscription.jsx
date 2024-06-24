import { useForm } from "react-hook-form";

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Inscription() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const navigate = useNavigate();

  // Références pour les champs
  const emailRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const addressRef = useRef();
  const zipcodeRef = useRef();
  const cityRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const onSubmit = async () => {
    // async request which may result error
    try {
      // Appel à l'API pour créer un nouvel utilisateur
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            avatar: "https://via.placeholder.com/64x64",
            email: emailRef.current.value,
            password: passwordRef.current.value,
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            address: addressRef.current.value,
            zip_code: zipcodeRef.current.value,
            city: cityRef.current.value,
            role_id: 3,
          }),
        }
      );
      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        navigate("/connexion");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <section>
      <h1> Bonjour je suis l'inscription </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable react/jsx-props-no-spreading */}

        <div>
          {/* Champ pour l'email */}
          <label htmlFor="email">Email</label>{" "}
          <input
            ref={emailRef}
            type="email"
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            onBlur={() => trigger("email")} // Validation au moment de la perte du focus
          />{" "}
          {errors.email && (
            <p role="alert">
              {errors.email.type === "required" && "L'email est obligatoire"}

              {errors.email.type === "pattern" && "C'est pas bon le format"}
            </p>
          )}
        </div>
        <div>
          {/* Champ pour le mot de passe */}
          <label htmlFor="password">Mot de passe</label>{" "}
          <input
            type="password"
            id="password"
            ref={passwordRef}
            {...register("password", {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            })}
            onBlur={() => trigger("password")} // Validation au moment de la perte du focus
          />
          {errors.password && (
            <p role="alert">
              {errors.password.type === "required" &&
                "Le mot de passe est obligatoire"}
              {errors.password.type === "pattern" && "C'est pas bon le format"}
            </p>
          )}
        </div>
        <div>
          {/* Champ pour la confirmation du mot de passe */}
          <label htmlFor="confirm-password">
            Confirmer le mot de passe
          </label>{" "}
          <input
            ref={confirmPasswordRef}
            type="password"
            id="confirm-password"
            {...register("confirm-password", {
              required: true,
            })}
            onBlur={() => trigger("confirm-password")}
          />
          {errors.password && (
            <p role="alert">
              {errors.password.type === "required" &&
                "Le mot de passe est obligatoire"}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="firstname">Prénom</label>{" "}
          <input ref={firstnameRef} type="text" id="firstname" />
        </div>

        <div>
          <label htmlFor="lastname">Nom</label>{" "}
          <input ref={lastnameRef} type="text" id="lasname" />
        </div>

        <div>
          <label htmlFor="address">Adresse</label>{" "}
          <input ref={addressRef} type="text" id="address" />
        </div>

        <div>
          <label htmlFor="zipcode">Code Postal</label>{" "}
          <input ref={zipcodeRef} type="text" id="zipcode" />
        </div>

        <div>
          <label htmlFor="city">Ville</label>{" "}
          <input ref={cityRef} type="text" id="city" />
        </div>

        {/* Bouton de soumission du formulaire */}
        <button type="submit">Send</button>
      </form>
      <Link to="/connexion"> J'ai déjà un compte </Link>
      <Link to=":">Poursuivre</Link>
    </section>
  );
}

export default Inscription;
