import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { apiURL, fetchAnimals } from "../lib/api";


const AdminAnimalsPage = () => {

    const { isPending, error, data: animals } = useQuery({
        queryKey: ["animals"],
        queryFn: () => fetchAnimals(),
    });

    if (isPending) return <Loading />;

    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Hayvanlar</h1>

      {/* Arama */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Hayvan ara..."
          className="p-2 border border-gray-300 rounded-l-lg w-80"
        />
        <button className="bg-blue-500 text-white p-2 rounded-r-lg">
          <FaSearch />
        </button>
      </div>

      {/* Hayvanlar Tablosu */}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">Fotoğrafı</th>
            <th className="py-3 px-6 text-left">Türü</th>
            <th className="py-3 px-6 text-left">Cinsiyet</th>
            <th className="py-3 px-6 text-left">Renk</th>
            <th className="py-3 px-6 text-left">Sağlık Durumu</th>
            <th className="py-3 px-6 text-center">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal: any) => (
            <tr key={animal._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-6"><img src={`${apiURL}/${animal.image}`} alt={animal.species} className="w-16 h-16 object-cover" /></td>
              <td className="py-3 px-6">{animal.species}</td>
              <td className="py-3 px-6">{animal.gender}</td>
              <td className="py-3 px-6">{animal.color}</td>
              <td className="py-3 px-6">{animal.healthStatus}</td>
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

export default AdminAnimalsPage;
