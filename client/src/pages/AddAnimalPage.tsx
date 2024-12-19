import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddAnimalPage = () => {

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newAnimal) => {
      return axios.post("http://localhost:3000/animals", newAnimal);
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data: any = {
      image: formData.get("image"),
      species: formData.get("species"), 
      description: formData.get("description"), 
      gender: formData.get("gender"),
      color: formData.get("color") ,
      healthStatus: formData.get("healthStatus")
    };

    mutation.mutate(data);
  };

  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8'>
        <h1 className='text-2xl font-bold text-yellow-500 text-center '>Hayvan Ekle</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 py-8 w-2/3 md:w-1/2 mx-auto'>
            <input name='image' type="text" placeholder='Resim URL' className='border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500'/>
            <input name='species' type="text" placeholder='Tür' className='border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500'/>
            <input name='description' type="text" placeholder='Açıklama' className='border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500'/>
            <input name='gender' type="text" placeholder='Cinsiyet' className='border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500'/>
            <input name='color' type="text" placeholder='Renk' className='border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500'/>
            <input name='healthStatus' type="text" placeholder='Sağlık Durumu' className='border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500'/>
            <button disabled={mutation.isPending} className='bg-yellow-500 text-white p-2 rounded-md'>Ekle</button>
        </form>
    </div>
  )
}

export default AddAnimalPage