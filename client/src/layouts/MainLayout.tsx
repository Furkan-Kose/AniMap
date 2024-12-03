import { Outlet } from "react-router"
import Header from "../components/Header"

const MainLayout = () => {
  return (
    <main className="bg-yellow-50 min-h-screen">
        <Header />
        <Outlet />
    </main>
  )
}

export default MainLayout