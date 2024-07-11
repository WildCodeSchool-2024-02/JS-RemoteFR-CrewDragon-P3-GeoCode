import { useState, createContext, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: {}, token: "" });

  useEffect(() => {
    const authData = Cookies.get("authData");
    if (authData === undefined) {
      setAuth({ user: {}, token: "" });
    } else {
      const authDecoded = jwtDecode(authData);
      setAuth(authDecoded);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth, setAuth]
  ); // Mémorise les valeurs et ne les mets à jours que lorsqu'elles bougent à la manière un UseEffect.

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
