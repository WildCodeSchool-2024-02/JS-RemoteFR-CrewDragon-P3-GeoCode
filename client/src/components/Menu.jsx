import Cookies from "js-cookie";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Menu() {
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const clearCookies = () => {
    Cookies.remove("authData");
    setAuth({ user: {}, token: "" });
  };

  return (
    <nav className={`menu ${open ? "open" : ""} nav-site`}>
      <div className="button-section">
        <button
          className={`burger ${open ? "open" : ""}`}
          type="button"
          onClick={toggleMenu}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? (
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 18h18v-2h-18v2zm0-5h18v-2h-18v2zm0-7v2h18v-2h-18z"
                fill="white"
              />
            </svg>
          )}
        </button>
      </div>
      <ul className={`styledMenu ${open ? "open" : ""}`}>
        {auth.user.role === 2 && (
          <Link to="/administrateur" onClick={toggleMenu}>
            <li className="menu-li">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
                  fill="white"
                />
              </svg>
              Administrateur
            </li>
          </Link>
        )}
        {auth.token === "" ? (
          <>
            <Link onClick={toggleMenu} to="/connexion">
              <li className="menu-li">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
                    fill="white"
                  />
                </svg>
                Connexion
              </li>
            </Link>
            <Link onClick={toggleMenu} to="/inscription">
              <li className="menu-li">
                {" "}
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                    fill="white"
                  />
                </svg>{" "}
                Inscription
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link onClick={toggleMenu} to={`/profil/gestion/${auth.user.id}`}>
              <li className="menu-li">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 18.597v.403h-10v-.417c-.004-1.112.044-1.747 1.324-2.043 1.402-.324 2.787-.613 2.121-1.841-1.972-3.637-.562-5.699 1.555-5.699 2.077 0 3.521 1.985 1.556 5.699-.647 1.22.688 1.51 2.121 1.841 1.284.297 1.328.936 1.323 2.057zm-1-14.597v2h3v16h-14v-16h3v-2h-5v20h18v-20h-5zm-6-4v6h4v-6h-4zm2 4c-.553 0-1-.448-1-1s.447-1 1-1 1 .448 1 1-.447 1-1 1z"
                    fill="white"
                  />
                </svg>
                Profil
              </li>
            </Link>
            <Link to="/" onClick={clearCookies}>
              <li className="menu-li">
                {" "}
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"
                    fill="white"
                  />
                </svg>
                Déconnexion
              </li>
            </Link>
          </>
        )}

        <Link to="/" onClick={toggleMenu}>
          <li className="menu-li">
            {" "}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 22h-5v-2h3v-5h6v5h2v-7.178l-5.029-4.22-7.769 6.606-2.398-2.521-2.804 2.176v7.137l-2-.001v-7.999l4.989-4.02 2.359 2.481 7.618-6.478 7.034 5.912v10.105h-6v-5h-2v5zm-6-1v1h-5v-1h5zm-5-2h5v1h-5v-1zm0-2h5v1h-5v-1zm12-15l9 7.655-1.338 1.494-7.677-6.489-7.569 6.456-1.428-1.465 9.012-7.651z"
                fill="white"
              />
            </svg>
            Accueil
          </li>
        </Link>
        <Link to="/carte" onClick={toggleMenu}>
          <li className="menu-li">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M6.57 13.41c-.373 0-.741-.066-1.093-.195l.407-1.105c.221.081.451.122.686.122.26 0 .514-.05.754-.148l.447 1.09c-.382.157-.786.236-1.201.236zm8.67-.783l-1.659-.945.583-1.024 1.66.945-.584 1.024zm-6.455-.02l-.605-1.011 1.639-.981.605 1.011-1.639.981zm3.918-1.408c-.243-.101-.5-.153-.764-.153-.23 0-.457.04-.674.119l-.401-1.108c.346-.125.708-.188 1.075-.189.42 0 .83.082 1.217.244l-.453 1.087zm-8.734-.163c-.535 0-.969.433-.969.968 0 .535.434.968.969.968.535 0 .969-.434.969-.968-.001-.535-.434-.968-.969-.968zm13.576-7.036l-5.545-4-5.545 4-6.455-4v20l6.455 4 5.545-4 5.545 4 6.455-4v-20l-6.455 4zm4.455 14.887l-4 2.479v-4.366h-1v4.141l-4-2.885v-4.256h-2v4.255l-4 2.885v-5.14h-1v5.365l-4-2.479v-15.294l4 2.479v2.929h1v-2.927l4-2.886v3.813h2v-3.813l4 2.886v1.927h1v-1.929l4-2.479v15.295zm-1.328-4.871l-1.296-1.274 1.273-1.293-.708-.702-1.272 1.295-1.294-1.272-.703.702 1.296 1.276-1.273 1.296.703.703 1.277-1.298 1.295 1.275.702-.708z"
                fill="white"
              />
            </svg>
            Carte
          </li>
        </Link>

        <Link to="/informations" onClick={toggleMenu}>
          <li className="menu-li">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 16h13v1h-13v-1zm13-3h-13v1h13v-1zm0-6h-5v1h5v-1zm0 3h-5v1h5v-1zm-17-8v17.199c0 .771-1 .771-1 0v-15.199h-2v15.98c0 1.115.905 2.02 2.02 2.02h19.958c1.117 0 2.022-.904 2.022-2.02v-17.98h-21zm19 17h-17v-15h17v15zm-9-12h-6v4h6v-4z"
                fill="white"
              />
            </svg>
            Actualités
          </li>
        </Link>
        <Link to="/aides" onClick={toggleMenu}>
          <li className="menu-li">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8.975 7.617l-2.607 1.485c-.697-1.53-1.928-2.762-3.455-3.462l1.484-2.608c1.988.979 3.601 2.595 4.578 4.585zm-8.975 9.383c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm-4.397-13.968l1.485 2.608c-1.527.701-2.757 1.933-3.455 3.463l-2.608-1.486c.976-1.99 2.59-3.606 4.578-4.585zm-4.578 13.351l2.608-1.485c.697 1.53 1.927 2.762 3.455 3.462l-1.485 2.608c-1.988-.979-3.602-2.595-4.578-4.585zm13.371 4.585l-1.484-2.608c1.527-.701 2.758-1.933 3.455-3.462l2.607 1.485c-.976 1.99-2.589 3.606-4.578 4.585z"
                fill="white"
              />
            </svg>
            Ressources
          </li>
        </Link>
        <Link to="/contact" onClick={toggleMenu}>
          <li className="menu-li">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M20 2c0-1.105-.896-2-2-2h-12c-1.105 0-2 .896-2 2v20c0 1.104.895 2 2 2h12c1.104 0 2-.896 2-2v-20zm-9.501 0h3.001c.276 0 .5.224.5.5s-.224.5-.5.5h-3.001c-.275 0-.499-.224-.499-.5s.224-.5.499-.5zm1.501 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm6-3h-12v-14.024h12v14.024z"
                fill="white"
              />
            </svg>
            Contact
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Menu;
