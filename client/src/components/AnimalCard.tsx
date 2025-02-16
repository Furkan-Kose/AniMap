import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AnimalType } from "../types";
import { apiURL } from "../lib/api";
import { useAuth } from "../context/AuthContext";


interface AnimalCardProps {
  animal: AnimalType;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const formattedDate = new Date(animal.createdAt).toLocaleDateString("tr-TR");
  const isOwner = user?._id === String(animal.owner._id);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-102 transition-all duration-300 ease-in-out border border-gray-100">
      <div className="relative" onClick={() =>  navigate(`/animals/${animal._id}`)}>
        <img
          src={`${apiURL}/${animal.image}`}
          alt={animal.species}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
          <p className="text-sm font-medium text-gray-700">{formattedDate}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {animal.species}
          </h2>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            {animal.healthStatus}
          </span>
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {animal.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-500 block">Cinsiyet</span>
            <span className="text-sm font-medium text-gray-800">
              {animal.gender}
            </span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-500 block">Renk</span>
            <span className="text-sm font-medium text-gray-800">
              {animal.color}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {animal.owner.username?.charAt(0).toUpperCase() || "?"}
              </span>
            </div>
            <span className="ml-3 text-sm text-gray-600">
              {animal.owner.username || "Anonim"}
            </span>
          </div>

          {isOwner && (
            <div className="flex gap-4">
              <Link
                to={`/update/${animal._id}`}
                className="text-blue-600 hover:text-blue-800 transition duration-200"
              >
                <FaEdit size={20} />
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 transition duration-200"
              >
                <FaTrash size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
