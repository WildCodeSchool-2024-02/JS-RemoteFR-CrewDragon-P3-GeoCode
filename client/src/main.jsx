import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import des pages
import Accueil from "./pages/Accueil";
import Carte from "./pages/Carte";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Contact from "./pages/Contact";
import Borne from "./pages/Borne";
import Admin from "./pages/Admin/Admin";
import AdminBornes from "./pages/Admin/AdminBornes";
import AdminUtilisateurs from "./pages/Admin/AdminUtilisateurs";
import AdminVehicules from "./pages/Admin/AdminVehicules";
import AdminReservations from "./pages/Admin/AdminReservations";
import Profil from "./pages/Profil/Profil";
import ProfilUtilisateur from "./pages/Profil/ProfilUtilisateur";
import ProfilVehicules from "./pages/Profil/ProfilVehicules";
import ProfilReservations from "./pages/Profil/ProfilReservations";
import Informations from "./pages/Informations";
import InformationId from "./pages/InformationId";
import Aides from "./pages/Aides";
import AideId from "./pages/AideId";
import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/carte",
        element: <Carte />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/borne/:id",
        element: <Borne />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/profil/utilisateur",
        element: <ProfilUtilisateur />,
      },
      {
        path: "/profil/vehicules",
        element: <ProfilVehicules />,
      },
      {
        path: "/profil/reservations",
        element: <ProfilReservations />,
      },
      {
        path: "/informations",
        element: <Informations />,
      },
      {
        path: "/informations/:id",
        element: <InformationId />,
      },
      {
        path: "/aides/",
        element: <Aides />,
      },
      {
        path: "/aides/:id",
        element: <AideId />,
      },
      {
        path: "/administrateur",
        element: <Admin />,
      },
      {
        path: "/administrateur/utilisateurs",
        element: <AdminUtilisateurs />,
        loader: async () => {
          const response = await axios.get("http://localhost:3310/api/users");
          return response.data;
        },
      },
      {
        path: "/administrateur/vehicules",
        element: <AdminVehicules />,
        loader: async () => {
          const response = await axios.get("http://localhost:3310/api/cars");
          return response.data;
        },
      },
      {
        path: "/administrateur/bornes",
        element: <AdminBornes />,
      },
      {
        path: "/administrateur/reservatuibs",
        element: <AdminReservations />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
