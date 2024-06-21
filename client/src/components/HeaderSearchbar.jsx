import PropTypes from "prop-types";

function HeaderSearchbar({ children }) {
  return <h1>{children.title}</h1>;
}

HeaderSearchbar.propTypes = {
  children: PropTypes.shape({
    title: PropTypes.string,
  }),
};

HeaderSearchbar.defaultProps = {
  children: PropTypes.shape({
    title: "Items",
  }),
};

export default HeaderSearchbar;
