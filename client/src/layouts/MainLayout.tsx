import { Outlet } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"

const MainLayout = () => {
  return (
    <main className="bg-yellow-50 min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
    </main>
  )
}

export default MainLayout