import axios from "axios";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/index.scss";

// Import des pages
import Accueil from "./pages/Accueil";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Contact from "./pages/Contact";
import Borne from "./pages/Borne";
import Admin from "./pages/Admin/Admin";
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
import App from "./App";
import AdminUtilisateursEdit from "./pages/Admin/AdminUtilisateursEdit";
import AdminVehiculesEdit from "./pages/Admin/AdminVehiculesEdit";
import AdminBornesEdit from "./pages/Admin/AdminBornesEdit";
import AdminBornesAddCsv from "./pages/Admin/AdminBornesAddCsv";
import ProfilUtilisateurEdit from "./pages/Profil/ProfilUtilisateurEdit";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ProfilVehiculesEdit from "./pages/Profil/ProfilVehiculesEdit";
import ProtectedRoute from "./utilitaires/ProtectedRoute";
import UserProtectedRoute from "./utilitaires/ProtectedUser";
import Loading from "./utilitaires/Loading";

const Carte = lazy(() => import("./pages/Carte"));
const AdminBornes = lazy(() => import("./pages/Admin/AdminBornes"));

const withAuth =
  (Func) =>
  async (Args = {}) => {
    const authData = Cookies.get("authData");
    if (!authData) {
      throw new Response("Unauthorized", { status: 401 });
    }
    // eslint-disable-next-line no-return-await
    return await Func(Args, authData);
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

        element: (
          <Suspense fallback={<Loading />}>
            <Carte />
          </Suspense>
        ),
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
        loader: async ({ params }) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`
          );
          return response.data;
        },
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
        element: (
          <UserProtectedRoute>
            <Profil />
          </UserProtectedRoute>
        ),
      },
      {
        path: "/profil/gestion/:id/utilisateur",
        element: (
          <UserProtectedRoute>
            <ProfilUtilisateur />
          </UserProtectedRoute>
        ),
        loader: withAuth(async ({ params }, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
      },
      {
        path: "/profil/gestion/:id/utilisateur/edit/",
        element: (
          <UserProtectedRoute>
            <ProfilUtilisateurEdit />
          </UserProtectedRoute>
        ),
        loader: withAuth(async ({ params }, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
        action: withAuth(async ({ request, params }, auth) => {
          const formData = await request.formData();
          const authDecoded = jwtDecode(auth);
          const roleId = authDecoded.role;
          const id = authDecoded.sub;
          const headers = {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          };
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
                  avatar: formData.get("avatar"),
                  role_id: roleId,
                  sub: id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${auth}`,
                  },
                  withCredentials: true, // Cela inclut les cookies dans la requête
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/profil/gestion/${params.id}/utilisateur/`
              );
            }
            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/users/${params.id}`,
                headers
              );

              return redirect(`${import.meta.env.VITE_CLIENT_URL}`);
            }
            default:
              throw new Response("", { status: 405 });
          }
        }),
      },
      {
        path: "/profil/gestion/:id/vehicules/",
        element: (
          <UserProtectedRoute>
            <ProfilVehicules />
          </UserProtectedRoute>
        ),
        loader: withAuth(async ({ params }, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cars/${params.id}/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
      },
      {
        path: "/profil/gestion/:id/vehicules/edit",
        element: (
          <UserProtectedRoute>
            <ProfilVehiculesEdit />
          </UserProtectedRoute>
        ),
        loader: withAuth(async ({ params }, auth) => {
          const [carResponse, brandsResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/cars/${params.id}`, {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }),
            axios.get(`${import.meta.env.VITE_API_URL}/api/brands/`),
          ]);
          return {
            vehicule: carResponse.data,
            brandData: brandsResponse.data,
          };
        }),
        action: withAuth(async ({ request, params }, auth) => {
          const formData = await request.formData();
          const headers = {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          };

          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`,
                {
                  name: formData.get("name"),
                  model_id: formData.get("model"),
                  image: `https://avatar.iran.liara.run/username?username=${formData.get("name").split(" ").join("+")}`,
                },
                headers
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/profil/gestion/${params.id}/vehicules/`
              );
            }
            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`,
                headers
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules/`
              );
            }
            default:
              throw new Response("", { status: 405 });
          }
        }),
      },
      {
        path: "/profil/gestion/:id/reservations/",
        element: (
          <UserProtectedRoute>
            <ProfilReservations />
          </UserProtectedRoute>
        ),
        loader: withAuth(async ({ params }, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/bookings/${params.id}/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
        action: withAuth(async ({ request, params }, auth) => {
          const headers = {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          };

          switch (request.method.toLowerCase()) {
            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/bookings/${params.id}/`,
                headers
              );

              return redirect(`/`);
            }
            default:
              throw new Response("", { status: 405 });
          }
        }),
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
        path: "/administrateur",
        element: (
          <ProtectedRoute requiredRole="2">
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/administrateur/utilisateurs",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminUtilisateurs />
          </ProtectedRoute>
        ),
        loader: withAuth(async (args, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
      },
      {
        path: "/administrateur/utilisateurs/edit/:id",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminUtilisateursEdit />
          </ProtectedRoute>
        ),
        loader: withAuth(async ({ params }, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${params.id}/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
        action: withAuth(async ({ request, params: { id } }, auth) => {
          const formData = await request.formData();
          const authDecoded = jwtDecode(auth);
          const roleId = authDecoded.role;
          const headers = {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          };
          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                // eslint-disable-next-line spaced-comment
                /*Modifiction du endpoint ?*/

                `${import.meta.env.VITE_API_URL}/api/users/${id}/user`,
                {
                  firstname: formData.get("firstname"),
                  lastname: formData.get("lastname"),
                  email: formData.get("email"),
                  password: formData.get("password"),
                  birthday: formData.get("birthday"),
                  address: formData.get("address"),
                  zip_code: formData.get("zip_code"),
                  city: formData.get("city"),
                  avatar: formData.get("avatar"),
                  role_id: roleId,
                  sub: id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${auth}`,
                  },
                  withCredentials: true, // Cela inclut les cookies dans la requête
                }
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/utilisateurs`
              );
            }
            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/users/${id}`,
                headers
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/utilisateurs`
              );
            }
            default:
              throw new Response("", { status: 405 });
          }
        }),
      },
      {
        path: "/administrateur/vehicules",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminVehicules />
          </ProtectedRoute>
        ),
        loader: withAuth(async (args, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cars/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
      },
      {
        path: "/administrateur/vehicules/edit/:id",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminVehiculesEdit />
          </ProtectedRoute>
        ),
        loader: withAuth(async ({ params }, auth) => {
          const [carResponse, brandsResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/cars/${params.id}`, {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }),
            axios.get(`${import.meta.env.VITE_API_URL}/api/brands/`),
          ]);
          return {
            vehicule: carResponse.data,
            brandData: brandsResponse.data,
          };
        }),
        action: withAuth(async ({ request, params }, auth) => {
          const formData = await request.formData();
          const headers = {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          };
          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`,
                {
                  name: formData.get("name"),
                  model_id: formData.get("model"),
                  image: formData.get("image"),
                },
                headers
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules`
              );
            }
            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/cars/${params.id}`,
                headers
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/vehicules`
              );
            }
            default:
              throw new Response("", { status: 405 });
          }
        }),
      },
      {
        path: "/administrateur/bornes",
        element: (
          <ProtectedRoute requiredRole="2">
            <Suspense fallback={<Loading />}>
              <AdminBornes />
            </Suspense>
          </ProtectedRoute>
        ),
        loader: withAuth(async (args, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/terminals/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
      },
      {
        path: "/administrateur/bornes/edit/:id",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminBornesEdit />
          </ProtectedRoute>
        ),
        loader: withAuth(async ({ params }, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
        action: withAuth(async ({ request, params }, auth) => {
          const formData = await request.formData();
          const headers = {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          };
          switch (request.method.toLowerCase()) {
            case "put": {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`,
                {
                  name: formData.get("name"),
                  address: formData.get("address"),
                  cood: formData.get("cood"),
                  power: formData.get("power"),
                  plug_type: formData.get("plug_type"),
                  chain_name: formData.get("chain_name"),
                  accessibility: formData.get("accessibility"),
                },
                headers
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/bornes`
              );
            }
            case "delete": {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/terminals/${params.id}`,
                headers
              );

              return redirect(
                `${import.meta.env.VITE_CLIENT_URL}/administrateur/bornes`
              );
            }
            default:
              throw new Response("", { status: 405 });
          }
        }),
      },
      {
        path: "/administrateur/bornes/csv",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminBornesAddCsv />
          </ProtectedRoute>
        ),
      },
      {
        path: "/administrateur/reservations",
        element: (
          <ProtectedRoute requiredRole="2">
            <AdminReservations />
          </ProtectedRoute>
        ),
        loader: withAuth(async (args, auth) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/bookings/`,
            {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            }
          );
          return response.data;
        }),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
