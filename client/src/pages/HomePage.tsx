import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import AnimalMap from "../components/AnimalMap";
import { fetchAnimals } from "../lib/api";
import AnimalCard from "../components/AnimalCard";
import { Link } from "react-router";

const HomePage = () => {
  const { isPending, error, data: animals } = useQuery({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
  });

  if (isPending) return <Loading />
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div>

      {/* HERO */}
      <section className="flex flex-col md:flex-row bg-gradient-to-br from-yellow-500 via-yellow-300 to-yellow-100 h-[70vh] md:h-[80vh]">
        {/* HERO LEFT */}
        <div className="flex flex-1 flex-col justify-center items-center md:items-start gap-4 max-md:px-4 md:pl-8 lg:pl-16 xl:pl-32 2xl:pl-64">
          <h1 className="text-center md:text-start text-3xl sm:text-4xl md:text-5xl font-bold text-white">Sokak Hayvanlarına Yardım Et</h1>
          <p className="text-center md:text-start text-base sm:text-lg md:text-xl text-white">
            Sokak hayvanlarının hayatlarını iyileştirmek için bir araya gelin! Hayvan dostlarımızın fotoğraflarını ve bilgilerini paylaşarak onlara daha iyi bir hayat sunalım.
          </p>
          <Link to="/add" className="flex items-center justify-center mt-2 px-6 py-2 w-1/2 sm:w-2/3 md:w-1/2 bg-white text-yellow-500 font-bold rounded-lg shadow-lg hover:bg-yellow-200 transition-all">
            Hayvan Ekle
          </Link>
        </div>

        {/* HERO RIGHT */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center md:pr-8 lg:pr-16 xl:pr-32 2xl:pr-64">
          <img src="https://pngimg.com/uploads/dog/dog_PNG50318.png" alt="Hero" className="w-full h-80 object-contain" />
        </div>
      </section>



      {/* ANIMALS LIST */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-8">
        <h1 className="text-3xl font-bold text-center text-yellow-500">Hayvanlar</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8">
          {animals.map((animal: any) => (
            <AnimalCard key={animal._id} animal={animal} />
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pb-8">
        <h1 className="text-3xl font-bold text-center text-yellow-500 pt-8">Harita</h1>
        <AnimalMap animals={animals} />
      </section>
    </div>
  );
};

export default HomePage;
