import { jwtDecode } from "jwt-decode";

import { useLoaderData, Link } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";

function ProfilUtilisateur() {
  const user = useLoaderData();
  const { auth } = useAuth();

  let sub = null;

  if (auth) {
    const authDecoded = jwtDecode(auth);
    sub = authDecoded.sub;
  }

  const formattedBirthday = format(new Date(user.birthday), "dd/MM/yyyy");

  return (
    <section className="profil-user-container">
      <Link to={`/profil/gestion/${sub}/`}>
        <img
          className="returnPreviousPage"
          src="https://img.icons8.com/?size=100&id=11538&format=png&color=000000"
          alt="retour"
        />
      </Link>
      <h1 className="profil-user-title">
        {user.firstname} {user.lastname}
      </h1>
      <img src={user.avatar} alt="" className="profil-user-avatar" />
      <div className="profil-user-details">
        <div className="profil-user-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <p>
            {user.firstname} {user.lastname}
          </p>
        </div>
        <div className="profil-user-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
            />
          </svg>

          <p>{user.email}</p>
        </div>
        <div className="profil-user-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
            />
          </svg>
          <p>{formattedBirthday}</p>
        </div>
        <div className="profil-user-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
          <p>
            {user.address} <br />
            {user.zip_code} {user.city}{" "}
          </p>
        </div>
      </div>
      <Link
        className="profil-user-button"
        to={`/profil/gestion/${sub}/utilisateur/edit`}
      >
        Modifier mon profil
      </Link>
      <div className="profil-user-details">
        {user.cars.map((car) => (
          <div className="profil-user-info" key={car.id}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 13.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm9 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm4-1c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-17.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2zm19.318 3.168c-.761-1.413-1.699-3.17-2.684-4.812-.786-1.312-1.37-1.938-2.751-2.187-1.395-.25-2.681-.347-4.585-.347s-3.19.097-4.585.347c-1.381.248-1.965.875-2.751 2.187-.981 1.637-1.913 3.382-2.684 4.812-.687 1.273-.98 2.412-.98 3.806 0 1.318.42 2.415 1 3.817v2.209c0 .552.448 1 1 1h1.5c.552 0 1-.448 1-1v-1h13v1c0 .552.448 1 1 1h1.5c.552 0 1-.448 1-1v-2.209c.58-1.403 1-2.499 1-3.817 0-1.394-.293-2.533-.98-3.806zm-15.641-3.784c.67-1.117.852-1.149 1.39-1.246 1.268-.227 2.455-.316 4.231-.316s2.963.088 4.231.316c.538.097.72.129 1.39 1.246.408.681.81 1.388 1.195 2.081-1.456.22-4.02.535-6.816.535-3.048 0-5.517-.336-6.805-.555.382-.686.779-1.386 1.184-2.061zm11.595 10.616h-11.948c-1.671 0-3.026-1.354-3.026-3.026 0-1.641.506-2.421 1.184-3.678 1.041.205 3.967.704 7.816.704 3.481 0 6.561-.455 7.834-.672.664 1.231 1.166 2.01 1.166 3.646 0 1.672-1.355 3.026-3.026 3.026zm5.526-10c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202z"
                fill="#21a89a"
              />
            </svg>

            <p> {car.name}</p>
          </div>
        ))}
      </div>
      <Link
        className="profil-user-button"
        to={`/profil/gestion/${sub}/vehicules/`}
      >
        Modifier mes véhicules
      </Link>
    </section>
  );
}

export default ProfilUtilisateur;
