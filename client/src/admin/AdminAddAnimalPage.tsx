import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { colorOptions, genderOptions, healthStatusOptions } from "../constants/data";
import Select from "react-select";
import ImageUploadModal from "../components/ImageUploadModal";
import LocationModal from "../components/LocationModal";


const AdminAddAnimalPage = () => {
    const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [isLocationModalOpen, setLocationModalOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [tempImage, setTempImage] = useState<string | null>(null);
  
    const mutation = useMutation({
      mutationFn: async (newAnimal) => {
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
        navigate("/admin/animals");
      },
      onError: (error) => {
        console.log("error" + error);
        toast.error("Hayvan eklenirken bir hata oluştu.");
      },
    });
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData: any = new FormData(e.target as HTMLFormElement);
  
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


  return (
    <div className="p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin - Hayvan Ekle</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-8 w-3/4">
        <input name="species" type="text" placeholder="Tür" className="border p-2 rounded-md" />
        <input name="description" type="text" placeholder="Açıklama" className="border p-2 rounded-md" />
        <Select name="gender" options={genderOptions} placeholder="Cinsiyet Seç" className="react-select-container" classNamePrefix="react-select" />
        <Select name="color" options={colorOptions} placeholder="Renk Seç" className="react-select-container" classNamePrefix="react-select" />
        <Select name="healthStatus" options={healthStatusOptions} placeholder="Sağlık Durumu Seç" className="react-select-container" classNamePrefix="react-select" />

        <div className="flex gap-4">
          <button
            type="button"
            className="w-1/2 border border-blue-500 p-2 rounded-md"
            onClick={() => setImageModalOpen(true)}
          >
            Resim Ekle
          </button>

          <button
            type="button"
            className="w-1/2 border border-blue-500 p-2 rounded-md"
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

        <button disabled={mutation.isPending} type="submit" className="bg-blue-500 text-white p-2 rounded-md">Ekle</button>
      </form>

        <div>
            {isImageModalOpen && <ImageUploadModal onClose={() => setImageModalOpen(false)} onSave={handleSave} />}
            
            {isLocationModalOpen && <LocationModal 
                onClose={() => setLocationModalOpen(false)} 
                onSave={handleLocationSave}
            />}
        </div>

    </div>
  )
}

export default AdminAddAnimalPage