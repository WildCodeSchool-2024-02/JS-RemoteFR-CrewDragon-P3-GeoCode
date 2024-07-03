import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import truck from "../../assets/images/icons/truck.svg";
import users from "../../assets/images/icons/users.svg";
import lightening from "../../assets/images/icons/lightening.svg";
import chart from "../../assets/images/icons/chart.svg";

function Admin() {
  const { auth } = useAuth();

  return (
    <section className="admin-Content">
      <div className="admin-Header">
        <h1>Bonjour {auth.user.firstname} !</h1>
      </div>

      <img src={auth.user.avatar} alt="" className="admin-Avatar" />

      <h2 className="admin-Title">
        <Link to="/administrateur">
          {auth.user.firstname} {auth.user.lastname}
        </Link>
      </h2>
      <nav className="admin-nav">
        <ul className="admin-List">
          <Link to="/administrateur/utilisateurs">
            <li className="admin-List-Items">
              <img src={users} alt="" className="admin-List-Icon" />
              <h3>Utilisateurs</h3>
              <p>
                Retrouvez ici toutes les informations concernant vos
                utilisateurs
              </p>
            </li>
          </Link>
          <Link to="/administrateur/vehicules">
            <li className="admin-List-Items">
              <img src={truck} alt="" className="admin-List-Icon" />
              <h3>Véhicules</h3>
              <p>
                Retrouvez ici toutes les informations concernant vos véhicules
              </p>
            </li>
          </Link>
          <Link to="/administrateur/bornes">
            <li className="admin-List-Items">
              <img src={lightening} alt="" className="admin-List-Icon" />
              <h3>Bornes</h3>
              <p>Retrouvez ici toutes les informations concernant vos bornes</p>
            </li>
          </Link>
          <Link to="/administrateur/">
            <li className="admin-List-Items">
              <img src={chart} alt="" className="admin-List-Icon" />
              <h3>Stats</h3>
              <p>Retrouvez ici toutes vos statistiques</p>
            </li>
          </Link>
        </ul>
      </nav>
    </section>
  );
}

export default Admin;
