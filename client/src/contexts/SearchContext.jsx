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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const filterItems = useCallback(
    (query) => {
      setFilteredItems(
        items.filter(
          (item) =>
            item.firstname.toLowerCase().startsWith(query.toLowerCase()) ||
            item.lastname.toLowerCase().startsWith(query.toLowerCase())
        )
      );
    },
    [items]
  );

  const handleSearchInputChange = useCallback(
    (event) => {
      setSearchQuery(event.target.value);
      filterItems(event.target.value);
    },
    [filterItems]
  );

  const contextValue = useMemo(
    () => ({
      handleSearchInputChange,
      searchQuery,
      filteredItems,
    }),
    [handleSearchInputChange, searchQuery, filteredItems]
  );

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
