import { useState, createContext, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: {}, token: "" });

  useEffect(() => {
    let authData = Cookies.get("authData");
    if (authData === undefined) {
      setAuth({ user: {}, token: "" });
    } else {
      if (authData.startsWith("j:")) {
        authData = authData.slice(2);
      }
      const authParsed = JSON.parse(authData);
      setAuth(authParsed);
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
