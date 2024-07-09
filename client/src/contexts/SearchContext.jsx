import {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

export function SearchProvider({ children, items }) {
  const [searchQuery, setSearchQuery] = useState(""); // Requete dans la barre de recherche par l'utilisateur
  const [filteredItems, setFilteredItems] = useState(items); // filtre de la recherche pour matcher avec sa requête

  const filterItems = useCallback(
    (query) => {
      setFilteredItems(
        items.filter((item) =>
          Object.values(item).find(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(query.toLowerCase())
          )
        ) // Vérifier les valeurs de l'objet et si String les passer en lowercase
      );
    },
    [items]
  ); // Mémorise la fonction et ne la recréé que lorsque une dépendance change à la manière un UseEffect.

  const handleSearchInputChange = useCallback(
    (event) => {
      setSearchQuery(event.target.value);
      filterItems(event.target.value);
    },
    [filterItems]
  ); // Mémorise la fonction et ne la recréé que lorsque une dépendance change à la manière un UseEffect.

  const contextValue = useMemo(
    () => ({
      handleSearchInputChange,
      searchQuery,
      filteredItems,
    }),
    [handleSearchInputChange, searchQuery, filteredItems]
  ); // Mémorise les valeurs et ne les mets à jours que lorsqu'elles bougent à la manière un UseEffect.

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.func.isRequired, // Ajout de la validation des types pour items
};

export const useSearch = () => useContext(SearchContext);
