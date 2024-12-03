import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimalType } from "../types";
import Loading from "../components/Loading";
import { Link } from "react-router";


const fetchAnimals = async () => {
    const res = await axios.get('http://localhost:3000/animals');
    return res.data;
}


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
            <h1 className="text-2xl font-bold text-yellow-500 text-center">Hayvanlar</h1>

            <div className="flex flex-wrap justify-center items-center gap-8 py-8">
                {animals.map((animal: AnimalType) => (
                    <div
                        key={animal._id}
                        className="flex flex-col bg-white shadow-lg rounded-md w-full sm:w-1/3 md:w-1/4 p-4"
                    >
                        <img
                            src={animal.image}
                            alt={animal.species}
                            className="object-cover h-40 rounded-t-md w-full"
                        />
                        <div className="flex flex-col p-4 gap-4">
                            <h2 className="text-xl font-bold text-gray-800">{animal.species}</h2>
                            <p className="text-gray-600 text-sm">{animal.description}</p>
                            <ul className="text-gray-700 text-sm">
                                <li><strong>Cinsiyet:</strong> {animal.gender}</li>
                                <li><strong>Renk:</strong> {animal.color}</li>
                                <li><strong>Sağlık Durumu:</strong> {animal.healthStatus}</li>
                            </ul>
                            <div className="flex gap-2 mt-4">
                                <Link to={`/update/${animal._id}`}>
                                    <button className="bg-blue-500 px-4 py-2 text-white rounded-md shadow-md hover:bg-blue-600">
                                        Güncelle
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => handleDelete(animal)}
                                    className="bg-red-500 px-4 py-2 text-white rounded-md shadow-md hover:bg-red-600"
                                >
                                    Sil
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
