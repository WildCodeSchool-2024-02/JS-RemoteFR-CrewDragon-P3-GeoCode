import { Link } from "react-router-dom";

function NavAdmin() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/administrateur">Général</Link>
        </li>
        <li>
          <Link to="/administrateur/utilisateurs">Utilisateurs</Link>
        </li>
        <li>
          <Link to="/administrateur/vehicules">Vehicules</Link>
        </li>
        <li>
          <Link to="/administrateur/bornes">Bornes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavAdmin;
