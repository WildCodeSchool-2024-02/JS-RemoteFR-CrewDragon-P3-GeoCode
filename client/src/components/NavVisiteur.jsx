import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavVisiteur() {
  const { auth } = useAuth();

  return (
    <nav className="nav-site">
      <ul className="nav-ul">
        <Link to={`/profil/gestion/${auth.sub}`}>
          <li className="nav-li">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M17 18.597v.403h-10v-.417c-.004-1.112.044-1.747 1.324-2.043 1.402-.324 2.787-.613 2.121-1.841-1.972-3.637-.562-5.699 1.555-5.699 2.077 0 3.521 1.985 1.556 5.699-.647 1.22.688 1.51 2.121 1.841 1.284.297 1.328.936 1.323 2.057zm-1-14.597v2h3v16h-14v-16h3v-2h-5v20h18v-20h-5zm-6-4v6h4v-6h-4zm2 4c-.553 0-1-.448-1-1s.447-1 1-1 1 .448 1 1-.447 1-1 1z"
                fill="white"
              />{" "}
            </svg>
            Profil{" "}
          </li>{" "}
        </Link>
        <Link to="/profil/reservations">
          <li className="nav-li">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 2v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm1 11.729l.855-.791c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64c-2.141 1.869-3.709 3.949-5.967 7.999-1.393-1.64-2.322-2.686-4.033-4.271z"
                fill="white"
              />
            </svg>
            Réservations{" "}
          </li>
        </Link>
        <Link to="/informations">
          {" "}
          <li className="nav-li">
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
            Actualités{" "}
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default NavVisiteur;
