import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Connexion() {
  const { setAuth } = useAuth();

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
        const authData = await Cookies.get("authData");
        setAuth(authData);

        toast.success("🚗 Connection réussie !", {
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
          navigate("/carte");
        }, 1500); // Adjust the delay as needed
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
        toast.error("🚗 Erreur lors de la connexion !", {
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
      <h1>Ravi de vous revoir !</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Votre email</label>{" "}
          <input ref={emailRef} type="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Votre mot de passe</label>{" "}
          <input type="password" id="password" ref={passwordRef} />
        </div>

        <button type="submit">Me connecter</button>
      </form>
      <Link to="/inscription"> Pas encore de compte </Link>
    </section>
  );
}

export default Connexion;
