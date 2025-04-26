import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";
import { useAnimals } from "../hooks/useAnimals";
import { useState } from "react";


const AdminAnimalsPage = () => {
    const navigate = useNavigate();

    const { animals, isLoading, error, deleteAnimal } = useAnimals();
    
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAnimals = animals?.filter((animal: any) =>
      animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        deleteAnimal.mutate(id);
    };

    if (isLoading) return <Loading />;

    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Hayvanlar</h1>

      <div className="flex items-center justify-between">
        {/* Arama */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Hayvan ara..."
            className="p-2 border border-gray-300 rounded-l-lg w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="bg-blue-500 text-white p-2 rounded-r-lg">
            <FaSearch />
          </button>
        </div>
        {/* Yeni Hayvan Ekle */}
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={() => navigate("/admin/animals/add")}
        >
          Yeni Hayvan Ekle
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
          {filteredAnimals.map((animal: any) => (
            <tr key={animal._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-6"><img src={animal.image} alt={animal.species} className="w-16 h-16 object-cover" /></td>
              <td className="py-3 px-6">{animal.species}</td>
              <td className="py-3 px-6">{animal.gender}</td>
              <td className="py-3 px-6">{animal.color}</td>
              <td className="py-3 px-6">{animal.healthStatus}</td>
              <td className="py-3 px-6 text-center">
                <button className="text-blue-500 mr-4" onClick={() => navigate(`/admin/animals/update/${animal._id}`)}>
                  <FaPencilAlt />
                </button>
                <button className="text-red-500" onClick={() => handleDelete(animal._id)}>
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
