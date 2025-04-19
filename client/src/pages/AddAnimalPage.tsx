import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import Select from "react-select";
import { useState } from "react";
import ImageUploadModal from "../components/ImageUploadModal";
import { genderOptions, colorOptions, healthStatusOptions } from "../constants/data";
import LocationModal from "../components/LocationModal";
import { useAuth } from "../context/AuthContext";

const AddAnimalPage = () => {
  const { user } = useAuth();
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const mutation = useMutation<FormData, unknown, FormData>({
    mutationFn: async (newAnimal: FormData) => {
      return axios.post("http://localhost:3000/animals", newAnimal, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      toast.success("Hayvan başarıyla eklendi.");
      navigate("/");
    },
    onError: (error) => {
      console.log("error" + error);
      toast.error("Hayvan eklenirken bir hata oluştu.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
  
    if (location.latitude && location.longitude) {
      formData.append("location", JSON.stringify(location));
    }
  
    if (image) {
      formData.append("image", image);
    }
  
    mutation.mutate(formData);
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

  if(!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center justify-center gap-6 bg-white p-8 rounded-md shadow-md">
          <p className="text-3xl font-bold text-yellow-500">
            Hayvan eklemek için giriş yapmalısınız.
          </p>
          <Link to="/login" className="bg-yellow-500 rounded-md px-8 py-2 text-white">Giriş yap</Link>
        </div>
      </div>
    )
  }
  

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">Hayvan Ekle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8 w-2/3 md:w-1/2 mx-auto">
        <input
          name="species"
          type="text"
          placeholder="Tür"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
        <input
          name="description"
          type="text"
          placeholder="Açıklama"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
        <Select
          name="gender"
          options={genderOptions}
          placeholder="Cinsiyet Seç"
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Select
          name="color"
          options={colorOptions}
          placeholder="Renk Seç"
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Select
          name="healthStatus"
          options={healthStatusOptions}
          placeholder="Sağlık Durumu Seç"
          className="react-select-container"
          classNamePrefix="react-select"
        />

        <div className="flex gap-4">
          <button 
            type="button"
            className="w-1/2 border border-yellow-500 p-2 rounded-md"
            onClick={() => setImageModalOpen(true)}
          >
            Resim Ekle
          </button>

          <button 
            type="button"
            className="w-1/2 border border-yellow-500 p-2 rounded-md"
            onClick={() => setLocationModalOpen(true)}
          >
            Konum Ekle
          </button>
        </div>

        <img src={tempImage || ""} alt="" className={tempImage ? "w-1/3 mx-auto" : ""} />

        {location.latitude && location.longitude && (
          <div className="flex items-center justify-center gap-4">
            <p>Enlem: {location.latitude}</p>
            <p>|</p>
            <p>Boylam: {location.longitude}</p>
          </div>
        )}

        <button disabled={mutation.isPending} className="bg-yellow-500 text-white p-2 rounded-md">
          Ekle
        </button>
      </form>

      {isImageModalOpen && <ImageUploadModal onClose={() => setImageModalOpen(false)} onSave={handleSave} />}
      
      {isLocationModalOpen && <LocationModal 
        onClose={() => setLocationModalOpen(false)} 
        onSave={handleLocationSave}
      />}
    </div>
  );
};

export default AddAnimalPage;
