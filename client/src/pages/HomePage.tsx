import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import AnimalMap from "../components/AnimalMap";
import { fetchAnimals } from "../lib/api";
import AnimalCard from "../components/AnimalCard";

const HomePage = () => {
  const { isPending, error, data: animals } = useQuery({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
  });

  if (isPending) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <h1 className="text-3xl font-bold text-center text-yellow-500">Hayvanlar</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
        {animals.map((animal: any) => (
          <AnimalCard key={animal._id} animal={animal} />
        ))}
      </div>

      <h1 className="text-3xl font-bold text-center text-yellow-500 pt-8">Harita</h1>
      <AnimalMap animals={animals} />
    </div>
  );
};

export default HomePage;
