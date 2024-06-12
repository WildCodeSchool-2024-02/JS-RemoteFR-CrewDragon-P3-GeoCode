import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        children: [
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
        ],
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
        children: [
          {
            path: "/administrateur/utilisateurs",
            element: <AdminUtilisateurs />,
          },
          {
            path: "/administrateur/vehicules",
            element: <AdminVehicules />,
          },
          {
            path: "/administrateur/bornes",
            element: <AdminBornes />,
          },
          {
            path: "/administrateur/reservations",
            element: <AdminReservations />,
          },
        ],
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
