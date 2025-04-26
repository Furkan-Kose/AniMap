import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiURL = 'http://localhost:3000';

export const useCampaigns = (id?: string) => {
  const queryClient = useQueryClient();

  // Kampanyaları listele
  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}/campaigns`);
      return response.data;
    },
  });

  // Kampanya detayını getir
  const { data: campaign, isLoading: isCampaignLoading, error: campaignError } = useQuery({
    queryKey: ['campaign', id],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}/campaigns/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  // Kampanya ekle
  const addCampaign = useMutation({
    mutationFn: async (newCampaign) => {
      await axios.post(`${apiURL}/campaigns`, newCampaign, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast.success('Kampanya başarıyla eklendi.');   
    },
    onError: (error: any) => {
      console.error('Error adding campaign:', error);
      toast.error('Kampanya eklenirken bir hata oluştu.');
    },
  });

  // Kampanya güncelle
  const updateCampaign = useMutation({
    mutationFn: async (updatedCampaign: any) => {
      await axios.put(`${apiURL}/campaigns/${updatedCampaign._id}`, updatedCampaign, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast.success('Kampanya başarıyla güncellendi.');
    },
    onError: (error: any) => {
      console.error('Error updating campaign:', error);
      toast.error('Kampanya güncellenirken bir hata oluştu.');
    },
  });

  // Kampanya sil
  const deleteCampaign = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${apiURL}/campaigns/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      toast.success('Kampanya başarıyla silindi.');
    },
    onError: (error: any) => {
      console.error('Error deleting campaign:', error);
      toast.error('Kampanya silinirken bir hata oluştu.');
    },
  });

  return {
    campaigns,
    campaign,
    isLoading,
    error,
    isCampaignLoading,
    campaignError,
    addCampaign,
    updateCampaign,
    deleteCampaign
  };
};
