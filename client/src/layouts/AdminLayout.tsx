import { Outlet } from "react-router";
import Sidebar from "../admin/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, loading } = useAuth(); 

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login");
    } else if (user?.role !== "admin") {
      navigate("/"); 
    }
  }, [user, loading, navigate]);

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100 z-10">
        <Loading />
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div
        className={`transition-all ${isCollapsed ? "ml-20" : "ml-64"} flex-1 p-4`}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
