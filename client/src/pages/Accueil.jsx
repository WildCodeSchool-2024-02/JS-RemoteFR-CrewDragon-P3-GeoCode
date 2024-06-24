import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Accueil1 from "../assets/images/carrousel/1.png";
import Accueil2 from "../assets/images/carrousel/2.png";
import Accueil3 from "../assets/images/carrousel/11.png";
import Accueil4 from "../assets/images/carrousel/13.png";

const items = [
  {
    id: 1,
    src: Accueil1,
    alt: "Icone voiture électrique",
    text: `Accédez à toutes les informations des bornes proches de vous.`,
  },
  {
    id: 2,
    src: Accueil2,
    alt: "Icone borne électrique",
    text: `Réservez une borne depuis votre téléphone ou votre ordinateur en toute simplicité. `,
  },
  {
    id: 3,
    src: Accueil3,
    alt: "Icone voiture électrique et tablette",
    text: `Rejoignez la communauté dynamique des utilisateurs de véhicules électriques.`,
  },
  {
    id: 4,
    src: Accueil4,
    alt: "Icone tablette, points de recharge",
    text: `Retrouvez toutes vos réservations en quelques clics. `,
  },
];

function Accueil() {
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    setCurrentItem(0);
  }, []);

  const handleDotClick = (index) => {
    setCurrentItem(index);
  };

  const prevImage = () => {
    setCurrentItem(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const nextImage = () => {
    setCurrentItem((prevIndex) => (prevIndex + 1) % items.length);
  };

  const numberOfDots = items.length;

  return (
    <section className="accueil-section">
      <h1>
        Restez <span className="blue"> branchés </span> à GéoCode
      </h1>
      <div className="accueil-container">
        <div className="accueil-scroll">
          {items.length > 0 && (
            <div className="accueil-image">
              <img
                src={items[currentItem]?.src}
                alt={items[currentItem]?.alt}
              />
            </div>
          )}

          <div className="accueil-buttons">
            <button
              className="navigation-buttons"
              type="button"
              onClick={prevImage}
            >
              Précédent
            </button>
            <div className="accueil-dots">
              {Array.from({ length: numberOfDots }).map((_, index) => (
                <button
                  aria-label="dots"
                  key={items.id}
                  className={`dot ${currentItem === index ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                  tabIndex={0}
                  type="button"
                />
              ))}
            </div>
            <button
              className="navigation-buttons"
              type="button"
              onClick={nextImage}
            >
              Suivant
            </button>
          </div>
          {items.length > 0 && (
            <div className="accueil-bottom-text">
              <p>{items[currentItem]?.text}</p>
            </div>
          )}
        </div>
        <div className="accueil-bottom-buttons">
          <div className="accueil-bottom-buttons-web">
            <Link to="/connexion" className="accueil-connexion">
              Connectez-vous
            </Link>
            <Link to="/inscription" className="accueil-inscription">
              Inscrivez-vous
            </Link>
          </div>
          <Link to="/carte" className="accueil-link">
            Accéder directement à la carte
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Accueil;
