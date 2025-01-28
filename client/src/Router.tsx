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


export const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
            path: "/",
            element: <HomePage />
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
        }
      ]
    }
  ])