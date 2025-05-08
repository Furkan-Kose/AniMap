import Loading from "../components/Loading";
import Select from "react-select";
import { colorOptions, genderOptions, healthStatusOptions } from "../constants/data";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import ImageUploadModal from "../components/ImageUploadModal";
import LocationModal from "../components/LocationModal";
import { useAnimals } from "../hooks/useAnimals";


const AdminUpdateAnimalPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { animal, isAnimalLoading, animalError, updateAnimal } = useAnimals(id);

  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: animal?.location?.latitude || null,
    longitude: animal?.location?.longitude || null,
  });

  const [image, setImage] = useState<File | null>(animal?.image || "");
  const [, setTempImage] = useState<string | null>(animal?.image || "");
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (location.latitude && location.longitude) {
      formData.append("location", JSON.stringify(location));
    }

    if (image) {
      formData.append("image", image);
    }

    updateAnimal.mutate({ id: animal._id, data: formData }, {
      onSuccess: () => {
        navigate("/admin/animals");
      },
    });
  };

  const handleSave = (file: File | null, tempImage: string | null) => {
    setImage(file);
    setTempImage(tempImage);
    setImageModalOpen(false);
  };

  const handleLocationSave = (position: [number, number]) => {
    const [latitude, longitude] = position;
    setLocation({ latitude, longitude });
    setLocationModalOpen(false);
  };

  if (isAnimalLoading) return <Loading />;
  if (animalError) return <p className="text-center text-red-500">Error: {animalError.message}</p>;


  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin - Hayvan Güncelle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-8 w-3/4">
        <input name="species" type="text" defaultValue={animal?.species || ""} placeholder="Tür" className="border p-2 rounded-md" />
        <input name="description" type="text" defaultValue={animal?.description || ""} placeholder="Açıklama" className="border p-2 rounded-md" />
        <Select name="gender" options={genderOptions} defaultValue={genderOptions.find(o => o.value === animal?.gender)} className="react-select-container" />
        <Select name="color" options={colorOptions} defaultValue={colorOptions.find(o => o.value === animal?.color)} className="react-select-container" />
        <Select name="healthStatus" options={healthStatusOptions} defaultValue={healthStatusOptions.find(o => o.value === animal?.healthStatus)} className="react-select-container" />

        <div className="flex gap-4">
          <button
            type="button"
            className="w-1/2 border border-blue-500 p-2 rounded-md"
            onClick={() => setImageModalOpen(true)}
          >
            Resim Güncelle
          </button>

          <button
            type="button"
            className="w-1/2 border border-blue-500 p-2 rounded-md"
            onClick={() => setLocationModalOpen(true)}
          >
            Konum Güncelle
          </button>
        </div>

        <img src={animal.image} alt="" className="w-1/3 mx-auto" />

        {location.latitude && location.longitude && (
          <div className="flex items-center justify-center gap-4">
            <p>Enlem: {location.latitude}</p>
            <p>|</p>
            <p>Boylam: {location.longitude}</p>
          </div>
        )}

        <button disabled={updateAnimal.isPending} type="submit" className="bg-blue-500 text-white p-2 rounded-md">Güncelle</button>
      </form>

        <div>
            {isImageModalOpen && <ImageUploadModal onClose={() => setImageModalOpen(false)} onSave={handleSave} />}
            {isLocationModalOpen && (
                <LocationModal onClose={() => setLocationModalOpen(false)} onSave={handleLocationSave} />
            )}
        </div>


    </div>
  );
};

export default AdminUpdateAnimalPage;
