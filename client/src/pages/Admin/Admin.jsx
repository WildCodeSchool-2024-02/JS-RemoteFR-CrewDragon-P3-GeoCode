import { Link } from "react-router-dom";
import "./styles/Admin.scss";
import burger from "../../assets/placeholders/burger.png";

function Admin() {
  return (
    <section className="admin-content">
      <div className="admin-header">
        <h1>Page Administrateur</h1>
        <img src={burger} alt="" />
      </div>
      <img
        src="https://img.icons8.com/?size=100&id=7820&format=png&color=000000"
        alt=""
        className="admin-avatar"
      />

      <p>
        <Link to="/administrateur">Admin</Link>
      </p>
      <nav>
        <ul className="Admin-List">
          <Link to="/administrateur/utilisateurs">
            <li className="Admin-List-Items">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" />
              </svg>
              <h2>Utilisateurs</h2>
              <p>
                Retrouvez ici toutes les informations concernant vos
                utilisateurs
              </p>
            </li>
          </Link>
          <Link to="/administrateur/vehicules">
            <li className="Admin-List-Items">
              <img
                src="https://img.icons8.com/?size=100&id=61579&format=png&color=000000"
                alt="arrow"
                className="Admin-Img"
              />
              <h2>Véhicules</h2>
              <p>
                Retrouvez ici toutes les informations concernant vos véhicules
              </p>
            </li>
          </Link>
          <Link to="/administrateur/bornes">
            <li className="Admin-List-Items">
              <img
                src="https://img.icons8.com/?size=100&id=35882&format=png&color=000000"
                alt="arrow"
                className="Admin-Img"
              />
              <h2>Bornes</h2>
              <p>Retrouvez ici toutes les informations concernant vos bornes</p>
            </li>
          </Link>
          <Link to="/administrateur/">
            <li className="Admin-List-Items">
              <img
                src="https://img.icons8.com/?size=100&id=4Kn3gWYlpsPp&format=png&color=000000"
                alt="arrow"
                className="Admin-Img"
              />

              <h2>Stats</h2>
              <p>Retrouvez ici toutes vos statistiques</p>
            </li>
          </Link>
        </ul>
      </nav>
    </section>
  );
}

export default Admin;
