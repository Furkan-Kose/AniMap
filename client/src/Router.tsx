import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AddAnimalPage from "./pages/AddAnimalPage";
import UpdateAnimalPage from "./pages/UpdateAnimalPage";


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
        }
      ]
    }
  ])