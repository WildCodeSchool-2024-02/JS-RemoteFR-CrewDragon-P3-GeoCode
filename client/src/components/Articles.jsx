import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import articlesData from "../assets/data/articles.json";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    setArticles(articlesData);
    setFilteredArticles(articlesData);
  }, []);

  const filterArticles = (query) => {
    setFilteredArticles(
      articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterArticles(event.target.value);
  };

  return (
    <section>
      <h1>Help Center</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="site-search">
          Vous avez des questions ? Parcourez nos ressources, vous trouverez ce
          qu’il vous faut !
        </label>
        <input
          className="searchbar"
          type="search"
          id="site-search"
          name="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Rechercher un article 🔎"
        />
      </form>
      <p>
        {filteredArticles.length === 0
          ? "Aucun article correspondant à la recherche"
          : `${filteredArticles.length} article${filteredArticles.length === 1 ? "" : "s"}`}
      </p>

      <div className="cards-container">
        {filteredArticles.map((article) => (
          <Link
            to={`/aides/articles/${article.id}`}
            key={article.id}
            className="card-link"
          >
            <div className="card">
              <img
                src={article.image}
                alt={article.title}
                className="card-image"
              />
              <div className="card-content">
                <h2 className="card-title">{article.title}</h2>
                <p className="card-description">
                  {article.content.substring(0, 100)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Articles;
