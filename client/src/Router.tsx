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
        }
      ]
    }
  ])