import PropTypes from "prop-types";
import { useSearch } from "../contexts/SearchContext";

function HeaderSearchbar({ children }) {
  const { searchQuery, handleSearchInputChange } = useSearch();

  return (
    <>
      <h1>{children.title}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="site-search">
          {children.label}
          {children.title.split(" ")[1]}
        </label>
        <input
          className="searchbar"
          type="search"
          id="site-search"
          name="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder={`Rechercher parmi les ${children.title.split(" ")[1]} 🔎`}
        />
      </form>
    </>
  );
}

HeaderSearchbar.propTypes = {
  children: PropTypes.shape({
    title: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
};

export default HeaderSearchbar;
