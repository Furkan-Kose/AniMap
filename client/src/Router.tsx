import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AddAnimalPage from "./pages/AddAnimalPage";
import UpdateAnimalPage from "./pages/UpdateAnimalPage";
import LoginPage from "./pages/LoginPage.";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminUsersPage from "./admin/AdminUsersPage";
import AdminAnimalsPage from "./admin/AdminAnimalsPage";
import AdminUpdateAnimalPage from "./admin/AdminUpdateAnimalPage";
import AdminAddAnimalPage from "./admin/AdminAddAnimalPage";
import AnimalsPage from "./pages/AnimalsPage";
import AdminAddUserPage from "./admin/AdminAddUserPage";
import AdminUpdateUserPage from "./admin/AdminUpdateUserPage";
import AnimalDetailsPage from "./pages/AnimalDetailsPage";
import Settings from "./admin/Settings";
import CampaignsPage from "./pages/CampaignsPage";
import AddCampaignPage from "./pages/AddCampaignPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import UpdateCampaignPage from "./pages/UpdateCampaignPage";
import AdminCampaignsPage from "./admin/AdminCampaignsPage";
import AdminAddCampaignPage from "./admin/AdminAddCampaignPage";
import AdminUpdateCampaignPage from "./admin/AdminUpdateCampaignPage";


export const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "/animals",
            element: <AnimalsPage />
        },
        {
            path: "/animals/:id",
            element: <AnimalDetailsPage />  
        },
        {
            path: "/add",
            element: <AddAnimalPage />
        },
        {
          path: "/update/:id",
          element: <UpdateAnimalPage />
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/register",
          element: <RegisterPage />
        },
        {
          path: "/profile",
          element: <ProfilePage />
        },
        {
          path: "/campaigns",
          element: <CampaignsPage />
        },
        {
          path: "/campaigns/add",
          element: <AddCampaignPage />
        },
        {
          path: "/campaigns/:id",
          element: <CampaignDetailPage />
        },
        {
          path: "/campaigns/update/:id",
          element: <UpdateCampaignPage />
        }
      ]
    },
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <Dashboard />
        },
        {
          path: "/admin/users",
          element: <AdminUsersPage />
        },
        {
          path: "/admin/animals",
          element: <AdminAnimalsPage />
        },
        {
          path: "/admin/animals/update/:id",
          element: <AdminUpdateAnimalPage />
        },
        {
          path: "/admin/animals/add",
          element: <AdminAddAnimalPage />
        },
        {
          path: "/admin/users/add",
          element: <AdminAddUserPage />
        },
        {
          path: "/admin/users/update/:id",
          element: <AdminUpdateUserPage />
        },
        {
          path: "/admin/settings",
          element: <Settings />
        },
        {
          path: "/admin/campaigns",
          element: <AdminCampaignsPage />
        },
        {
          path: "/admin/campaigns/add",
          element: <AdminAddCampaignPage />
        },
        {
          path: "/admin/campaigns/update/:id",
          element: <AdminUpdateCampaignPage />
        }
      ]
    }
  ])