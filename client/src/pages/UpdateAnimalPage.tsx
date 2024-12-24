import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";
import Select from "react-select";

const fetchAnimal = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/animals/${id}`);
  return res.data;
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

const UpdateAnimalPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: animal, isPending, error } = useQuery({
    queryKey: ["animal", id],
    queryFn: () => fetchAnimal(id!),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedAnimal: any) => {
      return axios.put(`http://localhost:3000/animals/${id}`, updatedAnimal, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      queryClient.invalidateQueries({ queryKey: ["animal", id] });
      toast.success("Hayvan başarıyla güncellendi.");
      navigate("/");
    },
    onError: () => {
      toast.error("Hayvan güncellenirken bir hata oluştu.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    mutation.mutate(formData);
  };

  if (isPending) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">Hayvan Güncelle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8 w-1/2 mx-auto">
        <input
          name="image"
          type="file"
          accept="image/*"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
        <input
          name="species"
          type="text"
          defaultValue={animal?.species || ""}
          placeholder="Tür"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
        <input
          name="description"
          type="text"
          defaultValue={animal?.description || ""}
          placeholder="Açıklama"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
        
        {/* Gender Select */}
        <Select
          name="gender"
          options={genderOptions}
          defaultValue={genderOptions.find(option => option.value === animal?.gender)}
          className="react-select-container"
        />

        {/* Color Select */}
        <Select
          name="color"
          options={colorOptions}
          defaultValue={colorOptions.find(option => option.value === animal?.color)}
          className="react-select-container"
        />

        {/* Health Status Select */}
        <Select
          name="healthStatus"
          options={healthStatusOptions}
          defaultValue={healthStatusOptions.find(option => option.value === animal?.healthStatus)}
          className="react-select-container"
        />

        <button
          disabled={mutation.isPending}
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default UpdateAnimalPage;
