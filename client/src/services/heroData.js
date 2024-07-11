import random from "../assets/images/heros/default.svg";
import administrateur from "../assets/images/heros/administrateur.svg";
import connexion from "../assets/images/heros/connexion.svg";
import profil from "../assets/images/heros/profil.svg";
import aides from "../assets/images/heros/aides.svg";
import informations from "../assets/images/heros/informations.svg";

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
