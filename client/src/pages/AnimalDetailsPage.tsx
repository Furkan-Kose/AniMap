import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, Link } from "react-router";
import { FaArrowLeft, FaPhone, FaEnvelope } from "react-icons/fa";
import Loading from "../components/Loading";
import { apiURL } from "../lib/api";

const fetchAnimal = async (id: any) => {
  const res = await axios.get(`${apiURL}/animals/${id}`);
  return res.data;
};

const AnimalDetailsPage = () => {
  const { id } = useParams();

  const { data: animal, isPending, error } = useQuery({
    queryKey: ["animal", id],
    queryFn: () => fetchAnimal(id),
  });

  if (isPending) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const formattedDate = new Date(animal.createdAt).toLocaleDateString("tr-TR");

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
        <h1 className="text-3xl font-bold text-center text-yellow-500">Hayvan Detayları</h1>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-6">
        <Link to="/" className="flex items-center text-blue-600 hover:underline mb-4">
            <FaArrowLeft className="mr-2" /> Geri Dön
        </Link>
        
        <div className="flex flex-col md:flex-row gap-6">
            <img
            src={`${apiURL}/${animal.image}`}
            alt={animal.species}
            className="w-full md:w-1/2 h-80 object-cover rounded-lg"
            />
            <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">{animal.species}</h2>
            <p className="text-sm text-gray-500 mb-4">İlan Tarihi: {formattedDate}</p>
            <p className="text-gray-600 mb-4">{animal.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 p-3 rounded-lg">
                <span className="text-gray-500">Cinsiyet</span>
                <p className="font-medium text-gray-800">{animal.gender}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                <span className="text-gray-500">Renk</span>
                <p className="font-medium text-gray-800">{animal.color}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                <span className="text-gray-500">Sağlık Durumu</span>
                <p className="font-medium text-gray-800">{animal.healthStatus}</p>
                </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                {animal.owner.username?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                <p className="text-sm text-gray-600">Sahip: <span className="font-medium text-gray-800">{animal.owner.username || "Anonim"}</span></p>
                <div className="flex gap-3 mt-2">
                    <a href={`tel:${animal.owner.phone}`} className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
                    <FaPhone className="mr-2" /> Ara
                    </a>
                    <a href={`mailto:${animal.owner.email}`} className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm hover:bg-gray-300 transition">
                    <FaEnvelope className="mr-2" /> Mail Gönder
                    </a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default AnimalDetailsPage;