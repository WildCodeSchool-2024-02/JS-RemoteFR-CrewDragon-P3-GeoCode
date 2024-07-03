import Cookies from "js-cookie";

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
          credentials: "include", // Need it for cookie
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        let authData = await Cookies.get("authData");

        if (authData.startsWith("j:")) {
          authData = authData.slice(2);
        }

        const auth = JSON.parse(authData);
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
      <h1>Ravi de vous revoir !</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>{" "}
          <input ref={emailRef} type="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>{" "}
          <input type="password" id="password" ref={passwordRef} />
        </div>

        <button type="submit">Me connecter</button>
      </form>
      <Link to="/inscription"> Pas encore de compte </Link>
    </section>
  );
}

export default Connexion;
