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
      await axios.delete(`${apiURL}/animals/${animal._id}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      toast.success("Hayvan başarıyla silindi.");
    },
    onError: (error: any) => {
      console.error("Error deleting animal:", error);
      toast.error("Hayvan silinirken bir hata oluştu.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const formattedDate = new Date(animal.createdAt).toLocaleDateString("tr-TR");
  const isOwner = user?._id === String(animal.owner._id);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:scale-[1.015] hover:shadow-2xl duration-300 border border-gray-200">
      <div 
        className="relative cursor-pointer group"
        onClick={() => navigate(`/animals/${animal._id}`)}
      >
        <img 
          src={animal.image}
          alt={animal.species}
          className="w-full h-52 object-cover group-hover:brightness-90 transition"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
          {formattedDate}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">{animal.species}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium
            ${animal.healthStatus === "Sağlıklı" 
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
            }`}>
            {animal.healthStatus}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">{animal.description}</p>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col bg-gray-50 p-2 rounded">
            <span className="text-xs text-gray-500">Cinsiyet</span>
            <span className="text-sm font-medium text-gray-800">{animal.gender}</span>
          </div>
          <div className="flex flex-col bg-gray-50 p-2 rounded">
            <span className="text-xs text-gray-500">Renk</span>
            <span className="text-sm font-medium text-gray-800">{animal.color}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3 border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {animal.owner.username?.charAt(0).toUpperCase() || "?"}
              </span>
            </div>
            <span className="text-sm text-gray-600">{animal.owner.username || "Anonim"}</span>
          </div>

          {isOwner && (
            <div className="flex gap-3">
              <Link
                to={`/update/${animal._id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit size={18} />
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
