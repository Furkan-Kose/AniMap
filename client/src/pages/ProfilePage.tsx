import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserCircle, FaEdit, FaPaw, FaArrowAltCircleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";


const ProfilePage = () => {
  const { user, logoutFunc } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: logoutFunc,
    onSuccess: () => {
      toast.success("Successfully logged out!");
      queryClient.resetQueries({ queryKey: ["user"] });
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Logout failed!");
    },
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">Profil</h1>

      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white p-6 shadow-md rounded-lg">

          <div className="mb-4 flex flex-col items-center">
           <FaUserCircle className="text-6xl text-yellow-500" />
            <p className="mt-2 text-gray-700 font-bold text-lg">{user?.username || "Veri bulunamadı"}</p>
            <p className="text-gray-500">{user?.email || "Veri bulunamadı"}</p>
            <p className="text-gray-500">{user?.role || "Veri bulunamadı"}</p>
          </div>

          <Link to="" className="mb-4 flex items-center border-2 border-gray-300 p-3 rounded-xl gap-4 w-2/3 mx-auto hover:bg-gray-100">
            <FaEdit className="text-2xl text-yellow-500" />
            <p className="text-gray-700">Profili Güncelle</p>
          </Link>

          <Link to="/animals" className="mb-4 flex items-center border-2 border-gray-300 p-3 rounded-xl gap-4 w-2/3 mx-auto hover:bg-gray-100">
            <FaPaw className="text-2xl text-yellow-500" />
            <p className="text-gray-700">Hayvanlarımı Gör</p>
          </Link>

          <button onClick={() => logout()} className="flex items-center border-2 border-gray-300 p-3 rounded-xl gap-4 w-2/3 mx-auto hover:bg-gray-100">
            <FaArrowAltCircleRight className="text-2xl text-yellow-500" />
            <p className="text-gray-700">Çıkış Yap</p>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
