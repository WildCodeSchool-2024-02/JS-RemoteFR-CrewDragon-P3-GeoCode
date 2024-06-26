import { Link, useLoaderData } from "react-router-dom";
import truck from "../../assets/images/icons/truck.svg";
import users from "../../assets/images/icons/users.svg";

function Profil() {
  const user = useLoaderData();

  return (
    <section className="profil-Content">
      <div className="profil-Header">
        <h1>Page profil</h1>
      </div>

      <img src={user.avatar} alt="" className="profil-Avatar" />

      <h2 className="profil-Title">
        <p>
          {user.firstname} {user.lastname}
        </p>
      </h2>
      <nav className="profil-nav">
        <ul className="profil-List">
          <Link to={`/profil/utilisateur/${user.user_id}`}>
            <li className="profil-List-Items">
              <img src={users} alt="" className="profil-List-Icon" />
              <h3>Mes informations</h3>
              <p>Retrouvez et modifiez ici toutes vos informations.</p>
            </li>
          </Link>
          <Link to="/profil/vehicules">
            <li className="profil-List-Items">
              <img src={truck} alt="" className="profil-List-Icon" />
              <h3>Mes véhicules</h3>
              <p>
                Retrouvez ici toutes les informations concernant vos véhicules
              </p>
            </li>
          </Link>
          <Link to="/profil/reservations">
            <li className="profil-List-Items">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="profil-List-Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>

              <h3>Mes réservations</h3>
              <p>
                Retrouvez ici toutes les informations concernant vos
                réservations
              </p>
            </li>
          </Link>
          <Link to="/">
            <li className="profil-List-Items">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="profil-List-Icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                />
              </svg>

              <h3>Mes abonnements</h3>
              <p>
                Retrouvez ici toutes les informations concernant vos abonnements{" "}
              </p>
            </li>
          </Link>
        </ul>
      </nav>
    </section>
  );
}

export default Profil;
