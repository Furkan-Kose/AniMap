import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminAddCampaignPage = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (campaignData: any) => {
      return axios.post("http://localhost:3000/campaigns", campaignData, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Kampanya başarıyla eklendi.");
      navigate("/admin/campaigns");
    },
    onError: () => {
      toast.error("Kampanya eklenirken bir hata oluştu.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !image || !goalAmount || !endDate || !tags) {
      toast.error("Tüm alanlar doldurulmalı!");
      return;
    }

    const campaignData = {
      title,
      description,
      image,
      goalAmount: Number(goalAmount),
      endDate,
      tags: tags?.split(",").map((tag: string) => tag.trim()),
      organization: user?._id,
    };

    mutation.mutate(campaignData);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin - Kampanya Ekle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-8 w-3/4">
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Kampanya Başlığı"
          className="border p-2 rounded-md"
        />
        <input
          name="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          placeholder="Görsel URL"
          className="border p-2 rounded-md"
        />
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Kampanya Açıklaması"
          className="border p-2 rounded-md h-40 resize-none"
        />
        <input
          name="goalAmount"
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          required
          placeholder="Hedef Tutar (₺)"
          className="border p-2 rounded-md"
        />
        <input
          name="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="border p-2 rounded-md"
        />
        <input
          name="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
          placeholder="Etiket (örn: kedi, barınak, tedavi)"
          className="border p-2 rounded-md"
        />
        <button
          disabled={mutation.isPending}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Ekle
        </button>
      </form>
    </div>
  );
};

export default AdminAddCampaignPage;
