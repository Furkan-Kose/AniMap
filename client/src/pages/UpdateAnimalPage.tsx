import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";

const fetchAnimal = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/animals/${id}`);
  return res.data;
};

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
      return axios.put(`http://localhost:3000/animals/${id}`, updatedAnimal);
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
        image: formData.get("image"),
        species: formData.get("species"),
        description: formData.get("description"),
        gender: formData.get("gender"),
        color: formData.get("color"),
        healthStatus: formData.get("healthStatus"),
    }

    mutation.mutate(data);
  };

    if (isPending) return <Loading />;

    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <h1 className="text-2xl font-bold text-yellow-500 text-center">Hayvan Güncelle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8 w-1/2 mx-auto">
        <input
          name="image"
          type="text"
          defaultValue={animal?.image || ""}
          placeholder="Resim URL"
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
        <input
          name="gender"
          type="text"
          defaultValue={animal?.gender || ""}
          placeholder="Cinsiyet"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
        <input
          name="color"
          type="text"
          defaultValue={animal?.color || ""}
          placeholder="Renk"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />
        <input
          name="healthStatus"
          type="text"
          defaultValue={animal?.healthStatus || ""}
          placeholder="Sağlık Durumu"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
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
