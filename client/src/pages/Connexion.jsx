import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Connexion() {
  const { setAuth } = useAuth();
  // Références pour les champs email et mot de passe

  const emailRef = useRef();
  const passwordRef = useRef();

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auths`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        const auth = await response.json();
        setAuth(auth);
        navigate("/carte");
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
      <form onSubmit={handleSubmit}>
        <div>
          {/* Champ pour l'email */}
          <label htmlFor="email">email</label>{" "}
          <input ref={emailRef} type="email" id="email" />
        </div>
        <div>
          {/* Champ pour le mot de passe */}
          <label htmlFor="password">password</label>{" "}
          <input type="password" id="password" ref={passwordRef} />
        </div>
        {/* Bouton de soumission du formulaire */}
        <button type="submit">Send</button>
      </form>
      <Link to="/inscription"> Pas encore de compte </Link>
      <button type="submit">Me connecter</button>
    </section>
  );
}

export default Connexion;
