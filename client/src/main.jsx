import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/AuthContext";

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

const withAuth = (Func) => async (Args) => {
  const { auth } = useAuth();
  await Func(Args, auth);
  return true;
};

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
        loader: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/terminals`
          );
          return response.data;
        },
      },
      {
        path: "carte/bornes/:id",
        element: <Borne />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
        loader: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/brands/`
          );
          return response.data;
        },
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
        path: "/profil/gestion/:id",
        element: <Profil />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
          );
          return response.data;
        },
      },
      {
        path: "/profil/gestion/:id/utilisateur",
        element: <ProfilUtilisateur />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
          );
          return response.data;
        },
      },
      {
        path: "/profil/gestion/:id/utilisateur/edit/",
        element: <ProfilUtilisateurEdit />,
        loader: withAuth(async ({ params }, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          return response.data;
        }),
        action: async ({ request, params }) => {
          const formData = await request.formData();
          console.info(formData);

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`,
                {
                  firstname: formData.get("firstname"),
                  lastname: formData.get("lastname"),
                  email: formData.get("email"),
                  password: formData.get("password"),
                  birthday: formData.get("birthday"),
                  address: formData.get("address"),
                  zip_code: formData.get("zipcode"),
                  city: formData.get("city"),
                }
              );

              return redirect(
                `${import.meta.env.CLIENT_URL}profil/utilisateur/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
              );

              return redirect(`${import.meta.env.CLIENT_URL}`);
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/profil/gestion/:id/vehicules/",
        element: <ProfilVehicules />,
      },
      {
        path: "/profil/gestion/:id/reservations/",
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
        loader: async () => {
          const response = await axios.get("../assets/data/articles.json");
          return response.data;
        },
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
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users`
          );
          return response.data;
        },
        action: async ({ request }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "post": {
              await axios.post(`${import.meta.env.VITE_API_URL}/api/users/`, {
                firstname: formData.get("firstname"),
                lastname: formData.get("lastname"),
                avatar: "vvvvv",
                email: "michelle@michel.com",
                password: "vvvvv",
                address: "vvvvv",
                zip_code: "vvvvv",
                city: "vvvvv",
                role_id: 3,
              });

              return redirect(
                `${import.meta.env.CLIENT_URL}administrateur/utilisateurs/`
              );
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/administrateur/utilisateurs/:id",
        element: <AdminUtilisateursEdit />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`,
                {
                  firstname: formData.get("firstname"),
                  lastname: formData.get("lastname"),
                }
              );

              return redirect(
                `${import.meta.env.CLIENT_URL}administrateur/utilisateurs/${params.id}`
              );
            }

            case "post": {
              await axios.post(`${import.meta.env.VITE_API_URL}/api/users/`, {
                firstname: formData.get("firstname"),
                lastname: formData.get("lastname"),
              });

              return redirect(
                `${import.meta.env.CLIENT_URL}administrateur/utilisateurs/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
              );

              return redirect(
                `${import.meta.env.CLIENT_URL}administrateur/utilisateurs/`
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
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cars`
          );
          return response.data;
        },
      },
      {
        path: "/administrateur/vehicules/:id",
        element: <AdminVehiculesEdit />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          console.info(formData);

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`,
                {
                  name: formData.get("name"),
                }
              );

              return redirect(
                `${import.meta.env.CLIENT_URL}administrateur/vehicules/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`
              );

              return redirect(
                `${import.meta.env.CLIENT_URL}administrateur/vehicules/`
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
            `${import.meta.env.VITE_API_URL}/api/terminals`
          );
          return response.data;
        },
      },
      {
        path: "/administrateur/bornes/:id",
        element: <AdminBornesEdit />,
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`
          );
          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();
          console.info(formData);

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`,
                {
                  name: formData.get("name"),
                }
              );

              return redirect(
                `${import.meta.env.CLIENT_URL}administrateur/bornes/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`
              );

              return redirect(
                `${import.meta.env.CLIENT_URL}administrateur/bornes/`
              );
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/administrateur/bornes/import",
        element: <AdminBornesAddCsv />,
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
