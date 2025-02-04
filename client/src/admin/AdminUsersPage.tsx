import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import { fetchUsers } from "../lib/api";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const AdminUsersPage = () => {

  const navigate = useNavigate();
  
  const { isPending, error, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
      mutationFn: async (user: any) => {
        await axios.delete(`http://localhost:3000/users/${user._id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });  
        toast.success("Hayvan başaroyla silindi.");
      },
      onError: () => {
        toast.error("Hayvan silinirken bir hata oluştu.");
      },
  });

  const handleDelete = (user: any) => {
      deleteMutation.mutate(user);
  };

  if (isPending) return <Loading />;

  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Kullanıcılar</h1>

      <div className="flex items-center justify-between">
        {/* Arama */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Kullanıcı ara..."
            className="p-2 border border-gray-300 rounded-l-lg w-80"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg">
            <FaSearch />
          </button>
        </div>
        {/* Yeni Kullanıcı Ekle */}
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={() => navigate("/admin/users/add")}
        >
          Yeni Kullanıcı Ekle
        </button>
      </div>

      {/* Kullanıcılar Tablosu */}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">Adı</th>
            <th className="py-3 px-6 text-left">E-posta</th>
            <th className="py-3 px-6 text-left">Rol</th>
            <th className="py-3 px-6 text-center">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-6">{user.username}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.role}</td>
              <td className="py-3 px-6 text-center">
                <button className="text-blue-500 mr-4" onClick={() => navigate(`/admin/users/update/${user._id}`)}>
                  <FaPencilAlt />
                </button>
                <button className="text-red-500" onClick={() => handleDelete(user)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
