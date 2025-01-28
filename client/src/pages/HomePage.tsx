import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimalType } from "../types";
import Loading from "../components/Loading";
import { Link } from "react-router";
import AnimalMap from "../components/AnimalMap";
import { useAuth } from "../context/AuthContext";
import { apiURL, fetchAnimals } from "../lib/api";



const HomePage = () => {

    const { isPending, error, data: animals } = useQuery({
        queryKey: ["animals"],
        queryFn: () => fetchAnimals(),
    });

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async (animal: AnimalType) => {
          await axios.delete(`http://localhost:3000/animals/${animal._id}`);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["animals"] });  
          toast.success("Hayvan başaroyla silindi.");
        },
        onError: () => {
          toast.error("Hayvan silinirken bir hata oluştu.");
        },
      });

      const handleDelete = (animal: AnimalType) => {
        deleteMutation.mutate(animal);
      };

    if (isPending) return <Loading />;

    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
            <h1 className="text-3xl font-bold text-center text-yellow-500">Hayvanlar</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
                {animals.map((animal: AnimalType) => (
                    <div
                        key={animal._id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        <img
                            src={`${apiURL}/${animal.image}`}
                            alt={animal.species}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800">{animal.species}</h2>
                            <p className="text-gray-500 mt-2 text-sm">{animal.description}</p>
                            <ul className="mt-4 text-gray-700 text-sm">
                                <li><strong>Cinsiyet:</strong> {animal.gender}</li>
                                <li><strong>Renk:</strong> {animal.color}</li>
                                <li><strong>Sağlık Durumu:</strong> {animal.healthStatus}</li>
                            </ul>
                            <div className="flex gap-4 mt-6">
                                <Link to={`/update/${animal._id}`} className="w-full">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm w-full transition duration-200 ease-in-out transform hover:scale-105">
                                        Güncelle
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => handleDelete(animal)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm w-full transition duration-200 ease-in-out transform hover:scale-105"
                                >
                                    Sil
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            

            <h1 className="text-3xl font-bold text-center text-yellow-500 pt-8">Harita</h1>
            <AnimalMap animals={animals} />
        </div>
    );
    
    
};

export default HomePage;
