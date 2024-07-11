import { Navigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

function ProtectedUser({ children }) {
  const authData = Cookies.get("authData");
  const { id } = useParams();

  if (!authData) {
    return <Navigate to="/connexion" />;
  }

  try {
    const decodedToken = jwtDecode(authData);
    const userId = decodedToken.sub;

    if (userId !== parseInt(id, 10)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/connexion" />;
  }
}

ProtectedUser.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedUser;
