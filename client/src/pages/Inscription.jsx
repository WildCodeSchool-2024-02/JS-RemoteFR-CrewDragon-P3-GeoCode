import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Inscription() {
  // Références pour les champs
  const emailRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const addressRef = useRef();
  const zipcodeRef = useRef();
  const cityRef = useRef();

  // États pour le mot de passe et la confirmation du mot de passe
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de changement du mot de passe
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Gestionnaire de changement de la confirmation du mot de passe
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

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
            password,
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
      <form onSubmit={handleSubmit}>
        <div>
          {/* Champ pour l'email */}
          <label htmlFor="email">email</label>{" "}
          <input ref={emailRef} type="email" id="email" />
        </div>
        <div>
          {/* Champ pour le mot de passe */}
          <label htmlFor="password">password</label>{" "}
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />{" "}
          {/* Indicateur de force du mot de passe */}
          {password.length >= 8 ? "✅" : "❌"}{" "}
          {`length: ${password.length} >= 8`}
        </div>
        <div>
          {/* Champ pour la confirmation du mot de passe */}
          <label htmlFor="confirm-password">confirm password</label>{" "}
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />{" "}
          {/* Indicateur de correspondance avec le mot de passe */}
          {password === confirmPassword ? "✅" : "❌"}
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
