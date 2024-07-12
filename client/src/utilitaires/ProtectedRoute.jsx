import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

function ProtectedRoute({ children, requiredRole }) {
  const authData = Cookies.get("authData");
  if (!authData) {
    return <Navigate to="/connexion" />;
  }

  try {
    const decodedToken = jwtDecode(authData);
    const userRole = decodedToken.role;

    if (userRole !== parseInt(requiredRole, 10)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/connexion" />;
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default ProtectedRoute;
