import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimalType } from "../types";
import { apiURL } from "../lib/api";

interface AnimalCardProps {
  animal: AnimalType;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${apiURL}/animals/${animal._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      toast.success("Hayvan başarıyla silindi.");
    },
    onError: () => {
      toast.error("Hayvan silinirken bir hata oluştu.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
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
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm w-full transition duration-200 ease-in-out transform hover:scale-105"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
