import { useQuery } from "@tanstack/react-query";
import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import { fetchUsers } from "../lib/api";
import Loading from "../components/Loading";

const AdminUsersPage = () => {
  
  const { isPending, error, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  if (isPending) return <Loading />;

  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Kullanıcılar</h1>

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
                <button className="text-blue-500 mr-4">
                  <FaPencilAlt />
                </button>
                <button className="text-red-500">
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
