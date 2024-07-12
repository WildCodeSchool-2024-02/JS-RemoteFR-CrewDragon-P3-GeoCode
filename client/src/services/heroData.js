import random from "../assets/images/heros/default.png";
import administrateur from "../assets/images/heros/administrateur.png";
import connexion from "../assets/images/heros/connexion.png";
import profil from "../assets/images/heros/profil.png";
import aides from "../assets/images/heros/aides.png";
import informations from "../assets/images/heros/informations.png";

const heroData = [
  {
    id: 1,
    name: "default",
    img: random,
  },
  {
    id: 2,
    name: "administrateur",
    img: administrateur,
  },
  {
    id: 3,
    name: "connexion",
    img: connexion,
  },
  {
    id: 4,
    name: "profil",
    img: profil,
  },
  {
    id: 5,
    name: "informations",
    img: informations,
  },
  {
    id: 6,
    name: "aides",
    img: aides,
  },
];

export default heroData;
