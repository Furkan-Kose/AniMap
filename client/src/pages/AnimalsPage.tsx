import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AnimalCard from "../components/AnimalCard";
import Loading from "../components/Loading";
import { fetchAnimals } from "../lib/api";

const AnimalsPage = () => {
  const { isPending, error, data: animals } = useQuery({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
  });

  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedHealthStatus, setSelectedHealthStatus] = useState("");

  if (isPending) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const speciesOptions = [...new Set(animals.map((animal: any) => animal.species))];
  const genderOptions = ["Erkek", "Dişi"];
  const healthStatusOptions = [...new Set(animals.map((animal: any) => animal.healthStatus))];

  const filteredAnimals = animals.filter((animal: any) => {
    return (
      (selectedSpecies ? animal.species === selectedSpecies : true) &&
      (selectedGender ? animal.gender === selectedGender : true) &&
      (selectedHealthStatus ? animal.healthStatus === selectedHealthStatus : true)
    );
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
      <h1 className="text-3xl font-bold text-center text-yellow-500">Hayvanlar</h1>

      <div className="flex flex-wrap justify-center gap-4 my-6">
        {/* Tür seçimi */}
        <select
          value={selectedSpecies}
          onChange={(e) => setSelectedSpecies(e.target.value)}
          className="p-2 border rounded-lg outline-none"
        >
          <option value="">Tüm Türler</option>
          {speciesOptions.map((species) => (
            <option key={species as string} value={species as string}>
              {species as string}
            </option>
          ))}
        </select>

        {/* Cinsiyet seçimi */}
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="p-2 border rounded-lg outline-none"
        >
          <option value="">Tüm Cinsiyetler</option>
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>

        {/* Sağlık Durumu seçimi */}
        <select
          value={selectedHealthStatus}
          onChange={(e) => setSelectedHealthStatus(e.target.value)}
          className="p-2 border rounded-lg outline-none"
        >
          <option value="">Tüm Sağlık Durumları</option>
          {healthStatusOptions.map((status) => (
            <option key={status as string} value={status as string}>
              {status as string}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map((animal: any) => <AnimalCard key={animal._id} animal={animal} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">Eşleşen hayvan bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default AnimalsPage;
