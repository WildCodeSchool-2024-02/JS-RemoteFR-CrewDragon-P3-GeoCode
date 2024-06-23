import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import "./styles/index.scss";

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
import AdminUtilisateursEdit from "./pages/Admin/AdminUtilisateursEdit";
import AdminVehiculesEdit from "./pages/Admin/AdminVehiculesEdit";
import AdminBornesEdit from "./pages/Admin/AdminBornesEdit";
import AdminBornesAddCsv from "./pages/Admin/AdminBornesAddCsv";
import ProfilUtilisateurEdit from "./pages/Profil/ProfilUtilisateurEdit";

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
        path: "/profil/:id",
        element: <Profil />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `http://localhost:3310/api/users/${params.id}`
          );
          return response.data;
        },
      },
      {
        path: "/profil/utilisateur/:id",
        element: <ProfilUtilisateur />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `http://localhost:3310/api/users/${params.id}`
          );
          return response.data;
        },
      },
      {
        path: "/profil/utilisateur/edit/:id",
        element: <ProfilUtilisateurEdit />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `http://localhost:3310/api/users/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          console.info(formData);

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(`http://localhost:3310/api/users/${params.id}`, {
                firstname: formData.get("firstname"),
                lastname: formData.get("lastname"),
                email: formData.get("email"),
                password: formData.get("password"),
                birthday: formData.get("birthday"),
                address: formData.get("address"),
                zip_code: formData.get("zipcode"),
                city: formData.get("city"),
              });

              return redirect(
                `http://localhost:3000/profil/utilisateur/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `http://localhost:3310/api/users/${params.id}`
              );

              return redirect(`http://localhost:3000/`);
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
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
        path: "/administrateur/utilisateurs/:id",
        element: <AdminUtilisateursEdit />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `http://localhost:3310/api/users/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(`http://localhost:3310/api/users/${params.id}`, {
                firstname: formData.get("firstname"),
                lastname: formData.get("lastname"),
              });

              return redirect(
                `http://localhost:3000/administrateur/utilisateurs/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `http://localhost:3310/api/users/${params.id}`
              );

              return redirect(
                `http://localhost:3000/administrateur/utilisateurs/`
              );
            }

            default:
              throw new Response("", { status: 405 });
          }
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
        path: "/administrateur/vehicules/:id",
        element: <AdminVehiculesEdit />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `http://localhost:3310/api/cars/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          console.info(formData);

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(`http://localhost:3310/api/cars/${params.id}`, {
                name: formData.get("name"),
              });

              return redirect(
                `http://localhost:3000/administrateur/vehicules/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(`http://localhost:3310/api/cars/${params.id}`);

              return redirect(
                `http://localhost:3000/administrateur/vehicules/`
              );
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/administrateur/bornes",
        element: <AdminBornes />,
        loader: async () => {
          const response = await axios.get(
            "http://localhost:3310/api/terminals"
          );
          return response.data;
        },
      },
      {
        path: "/administrateur/bornes/:id",
        element: <AdminBornesEdit />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `http://localhost:3310/api/terminals/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          console.info(formData);

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `http://localhost:3310/api/terminals/${params.id}`,
                {
                  name: formData.get("name"),
                }
              );

              return redirect(
                `http://localhost:3000/administrateur/bornes/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `http://localhost:3310/api/terminals/${params.id}`
              );

              return redirect(`http://localhost:3000/administrateur/bornes/`);
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/administrateur/bornes/import",
        element: <AdminBornesAddCsv />,
        action: async ({ request }) => {
          const formData = await request.formData();
          console.info(formData);

          const file = formData.get("file");

          await axios.post("/api/terminals", { file });
          return false; // test mode
        },
      },

      {
        path: "/administrateur/reservations",
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
