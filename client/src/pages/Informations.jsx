import { Link } from "react-router-dom";
import { SearchProvider, useSearch } from "../contexts/SearchContext";
import HeaderSearchbar from "../components/HeaderSearchbar";
import helpData from "../services/helpData";
import truck from "../assets/images/icons/truck.svg";

function Informations() {
  const items = helpData; // Récupération des items via le fichier de services
  console.info(items);

  return (
    // Import du provider ICI car on fait remonter les items dans le Contexte
    <SearchProvider items={items}>
      <Content />
    </SearchProvider>
  );
}

// Déclaration d'un composant Content CAR, on a besoin de items pour le state init du filteredItems (qui est dans le context). On peut ainsi l'appeler avec useSearch sans undefined.
function Content() {
  const { filteredItems } = useSearch();
  return (
    <section>
      <HeaderSearchbar>
        {{
          title: "Mes informations",
          label: "Trouvez ci-dessous la liste des ",
        }}
      </HeaderSearchbar>

      <p>
        {filteredItems.length === 0
          ? "Aucun résultat correspondant à la recherche"
          : `${filteredItems.length} résultat${filteredItems.length === 1 ? "" : "s"}`}
      </p>

      <ul className="help-List">
        {filteredItems.map((help) => (
          <Link to={`/aides/${help.id}`} key={`help ${help.id}`}>
            <li className="help-List-Items">
              <img src={truck} alt="" className="help-List-Icon" />
              <h3>{help.title}</h3>
              <p>{help.subTitle}</p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default Informations;
