import { Link } from "react-router-dom";
import { SearchProvider, useSearch } from "../contexts/SearchContext";
import HeaderSearchbar from "../components/HeaderSearchbar";
import infoData from "../services/infoData";
import truck from "../assets/images/icons/truck.svg";

function Informations() {
  const items = infoData; // Récupération des items via le fichier de services
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

      <ul className="info-List">
        {filteredItems.map((info) => (
          <Link to={`/informations/${info.id}`} key={`info ${info.id}`}>
            <li className="info-List-Items">
              <img src={truck} alt="" className="info-List-Icon" />
              <h3>{info.title}</h3>
              <p>{info.subTitle}</p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default Informations;
