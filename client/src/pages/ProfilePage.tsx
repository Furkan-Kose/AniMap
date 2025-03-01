import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";



const fetchUser = async () => {
  const response = await axios.get("http://localhost:3000/users/me", { withCredentials: true });
  return response.data;
};

const ProfilePage = () => {
    const { isPending, error, data: user } = useQuery({
      queryKey: ["user"],
      queryFn: () => fetchUser(),
    });

  if (isPending) return <Loading />;

  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">Profil</h1>

      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Kullanıcı Bilgileri</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Kullanıcı Adı:</label>
            <p className="mt-2">{user?.user.username || "Veri bulunamadı"}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">E-posta:</label>
            <p className="mt-2">{user?.user.email || "Veri bulunamadı"}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Rol:</label>
            <p className="mt-2">{user?.user.role || "Veri bulunamadı"}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
