import { useParams, Link } from "react-router";
import { FaArrowLeft, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Loading from "../components/Loading";
import { useAnimals } from "../hooks/useAnimals";


const AnimalDetailsPage = () => {
  const { id } = useParams();

  const { animal, isAnimalLoading, animalError } = useAnimals(id);

  if (isAnimalLoading) return <div className="flex items-center justify-center min-h-screen"><Loading /></div>;
  if (animalError) return <p className="text-center text-red-500">Error: {animalError.message}</p>;

  const formattedDate = new Date(animal.createdAt).toLocaleDateString("tr-TR");

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${animal.location.latitude},${animal.location.longitude}`;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="flex items-center text-blue-600 hover:underline mb-6">
          <FaArrowLeft className="mr-2" /> Geri Dön
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Görsel */}
            <div className="h-96 md:h-auto">
              <img
                src={animal.image}
                alt={animal.species}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Bilgiler */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{animal.species}</h2>
                <p className="text-sm text-gray-500 mb-6">Eklenme Tarihi: {formattedDate}</p>

                <p className="text-gray-700 mb-6 leading-relaxed">{animal.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <DetailItem label="Cinsiyet" value={animal.gender} />
                  <DetailItem label="Renk" value={animal.color} />
                  <DetailItem label="Sağlık Durumu" value={animal.healthStatus} />
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">İletişim</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-lg font-bold">
                    {animal.owner.username?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{animal.owner.username || "Anonim"}</p>
                    <div className="flex gap-2 mt-2">
                      <a href={`tel:${animal.owner.phone}`} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                        <FaPhone /> Ara
                      </a>
                      <a href={`mailto:${animal.owner.email}`} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition">
                        <FaEnvelope /> Mail Gönder
                      </a>
                      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-green-700 transition">
                        <FaMapMarkerAlt /> Yol Tarifi Al
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Detay Kartı Bileşeni
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-100 p-4 rounded-xl">
    <span className="text-gray-500 text-xs">{label}</span>
    <p className="font-medium text-gray-800 text-base mt-1">{value}</p>
  </div>
);

export default AnimalDetailsPage;
