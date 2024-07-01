import { useState, createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

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
