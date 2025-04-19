import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const UpdateCampaignPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    image: "",
    goalAmount: "",
    endDate: "",
    tags: "",
  });

  const { data: campaign, isLoading, error } = useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/campaigns/${id}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (campaign) {
      setFormData({
        ...campaign,
        tags: campaign.tags?.join(", ") || "",
      });
    }
  }, [campaign]);

  const mutation = useMutation({
    mutationFn: async (updatedData: any) => {
      return axios.put(`http://localhost:3000/campaigns/${id}`, updatedData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Kampanya başarıyla güncellendi.");
      navigate("/campaigns");
    },
    onError: (err) => {
      console.error("Güncelleme hatası:", err);
      toast.error("Kampanya güncellenirken bir hata oluştu.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      goalAmount: parseFloat(formData.goalAmount),
      tags: formData.tags?.split(",").map((tag: string) => tag.trim()),
      organization: user?._id,
    };

    mutation.mutate(data);
  };

  if (isLoading) return <p className="text-center pt-28">Yükleniyor...</p>;
  if (error) return <p className="text-center pt-28 text-red-500">Kampanya getirilemedi.</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">Kampanyayı Güncelle</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8 w-2/3 md:w-1/2 mx-auto">
        <input
          name="title"
          placeholder="Başlık"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
          required
        />

        <textarea
          name="description"
          placeholder="Açıklama"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
          required
        />

        <input
          name="image"
          placeholder="Resim URL"
          value={formData.image}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />

        <input
          name="goalAmount"
          placeholder="Hedef Tutar (₺)"
          type="number"
          value={formData.goalAmount}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />

        <input
          name="endDate"
          type="date"
          value={formData.endDate?.slice(0, 10)} // ISO tarih formatından kırp
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />

        <input
          name="tags"
          placeholder="Etiketler (Mama, Tedavi...)"
          value={formData.tags}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-yellow-500 text-white p-2 rounded-md mt-2"
        >
          {mutation.isPending ? "Güncelleniyor..." : "Kampanyayı Güncelle"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaignPage;
