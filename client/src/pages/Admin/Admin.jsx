import { Link } from "react-router-dom";
import "./styles/Admin.scss";

function Admin() {
  return (
    <div className="admin-content">
      <h1> Page Administrateur</h1>
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
              <img
                src="https://img.icons8.com/?size=100&id=23264&format=png&color=000000"
                alt="arrow"
                className="Admin-Img"
              />
              <h2>Utilisateurs</h2>
              <p>infos</p>
            </li>
          </Link>
          <Link to="/administrateur/vehicules">
            <li className="Admin-List-Items">
              <img
                src="https://img.icons8.com/?size=100&id=61579&format=png&color=000000"
                alt="arrow"
                className="Admin-Img"
              />
              <h2>Vehicules</h2>
              <p>infos</p>
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
              <p>infos</p>
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
              <p>infos</p>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Admin;
