import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
const apiURL = 'http://localhost:3000';

export const useAnimals = (id?: string) => {
  const queryClient = useQueryClient();

  // Hayvanları listele
  const { data: animals, isLoading, error } = useQuery({
    queryKey: ['animals'],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}/animals`);
      return response.data;
    },
  });

  // Hayvan detayını getir
  const { data: animal, isLoading: isAnimalLoading, error: animalError } = useQuery({
    queryKey: ['animal', id],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}/animals/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
  

  // Hayvan ekle
  const addAnimal = useMutation({
    mutationFn: async (newAnimal) => {
      await axios.post(`${apiURL}/animals`, newAnimal, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      toast.success('Hayvan başarıyla eklendi.');
    },
    onError: (error: any) => {
      console.error('Error adding animal:', error);
      toast.error('Hayvan eklenirken bir hata oluştu.');
    },
  });

  // Hayvan güncelle
  const updateAnimal = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: FormData }) => {
      await axios.put(`${apiURL}/animals/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      toast.success('Hayvan başarıyla güncellendi.');
    },
    onError: (error: any) => {
      console.error('Error updating animal:', error);
      toast.error('Hayvan güncellenirken bir hata oluştu.');
    },
  });

  // Hayvan sil
  const deleteAnimal = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${apiURL}/animals/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      toast.success('Hayvan başarıyla silindi.');
    },
    onError: (error: any) => {
      console.error('Error deleting animal:', error);
      toast.error('Hayvan silinirken bir hata oluştu.');
    },
  });

  return {
    animals,
    animal,
    isLoading,
    error,
    isAnimalLoading,
    animalError,
    addAnimal,
    updateAnimal,
    deleteAnimal
  };
};
