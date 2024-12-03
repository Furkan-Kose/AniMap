import { RouterProvider } from "react-router"
import { router } from "./Router"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position='top-right' theme="colored" autoClose={2000} />
      </QueryClientProvider>
    </>
  )
}

export default App