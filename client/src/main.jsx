import axios from "axios";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider, } from "./contexts/AuthContext";

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
import NotFound from "./pages/NotFound";
import ProfilVehiculesEdit from "./pages/Profil/ProfilVehiculesEdit";

// const withAuth = (Func) => async (Args) => {
//   const auth = useAuth();

//   await Func(Args, auth);
//   return true;
// };

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
                  email: formData.get("email"),
                  password: formData.get("password"),
                  birthday: formData.get("birthday"),
                  address: formData.get("address"),
                  zip_code: formData.get("zipcode"),
                  city: formData.get("city"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}profil/utilisateur/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
              );

              return redirect(`${import.meta.env.VITE_CLIENT_URL}`);
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/profil/gestion/:id/vehicules/",
        element: <ProfilVehicules />,
        loader: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cars`
          );
          return response.data;
        },
      },
      {
        path: "/profil/gestion/:id/vehicules/edit",
        element: <ProfilVehiculesEdit />,
        loader: async ({ params }) => {
          const [carResponse, brandsResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/cars/${params.id}`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/brands/`),
          ]);
          return {
            vehicule: carResponse.data,
            brandData: brandsResponse.data,
          };
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`,
                {
                  name: formData.get("name"),
                  model_id: formData.get("model"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules/`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules/`
              );
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
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
      },
      {
        path: "/administrateur/utilisateurs/:id/edit",
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
                  email: formData.get("email"),
                  address: formData.get("address"),
                  zip_code: formData.get("zip_code"),
                  city: formData.get("city"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/utilisateurs`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/utilisateurs`
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
        path: "/administrateur/vehicules/:id/edit",
        element: <AdminVehiculesEdit />,
        loader: async ({ params }) => {
          const [carResponse, brandsResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/cars/${params.id}`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/brands/`),
          ]);
          return {
            vehicule: carResponse.data,
            brandData: brandsResponse.data,
          };
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`,
                {
                  name: formData.get("name"),
                  model_id: formData.get("model"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules/`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules/`
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

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`,
                {
                  name: formData.get("name"),
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}administrateur/bornes/${params.id}`
              );
            }

            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}administrateur/bornes/`
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
