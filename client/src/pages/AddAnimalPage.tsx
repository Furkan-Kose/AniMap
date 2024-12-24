import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Select from "react-select";

const AddAnimalPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newAnimal) => {
      return axios.post("http://localhost:3000/animals", newAnimal, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      toast.success("Hayvan başarıyla eklendi.");
      navigate("/");
    },
    onError: () => {
      toast.error("Hayvan eklenirken bir hata oluştu.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: any = new FormData(e.target as HTMLFormElement);
    mutation.mutate(formData);
  };

  const genderOptions = [
    { value: "Erkek", label: "Erkek" },
    { value: "Dişi", label: "Dişi" },
    { value: "Bilinmiyor", label: "Bilinmiyor" },
  ];
  
  const healthStatusOptions = [
    { value: "Sağlıklı", label: "Sağlıklı" },
    { value: "Yaralı", label: "Yaralı" },
    { value: "Hasta", label: "Hasta" },
    { value: "Kritik", label: "Kritik Durumda" },
    { value: "Bilinmiyor", label: "Bilinmiyor" },
  ];
  
  const colorOptions = [
    { value: "Beyaz", label: "Beyaz" },
    { value: "Siyah", label: "Siyah" },
    { value: "Gri", label: "Gri" },
    { value: "Kahverengi", label: "Kahverengi" },
    { value: "Sarı", label: "Sarı" },
    { value: "Turuncu", label: "Turuncu" },
    { value: "Tekir", label: "Çizgili (Tekir)" },
    { value: "Alacalı", label: "Benekli (Alacalı)" },
  ];  

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">Hayvan Ekle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8 w-2/3 md:w-1/2 mx-auto">
        <input
          name="image"
          type="file"
          accept="image/*"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
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
        <button disabled={mutation.isPending} className="bg-yellow-500 text-white p-2 rounded-md">
          Ekle
        </button>
      </form>
    </div>
  );
};

export default AddAnimalPage;
