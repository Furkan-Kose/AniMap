import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCampaigns } from "../hooks/useCampaigns";
import { useNavigate } from "react-router";

const AddCampaignPage = () => {
  const { user } = useAuth();
  const { addCampaign } = useCampaigns();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
  
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    data.goalAmount = parseFloat(data.goalAmount);
    data.tags = data.tags?.split(",").map((tag: string) => tag.trim());
    data.organization = user?._id;
  
    addCampaign.mutate(data, {
      onSuccess: () => {
        navigate("/campaigns");
      }
    });
  };
  

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">Kampanya Ekle</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8 w-2/3 md:w-1/2 mx-auto">
        <input
          name="title"
          placeholder="Başlık"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
          required
        />

        <textarea
          name="description"
          placeholder="Açıklama"
          rows={5}
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
          required
        />

        <input
          name="image"
          placeholder="Resim URL"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />

        <input
          name="goalAmount"
          placeholder="Hedef Tutar (₺)"
          type="number"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />

        <input
          name="endDate"
          type="date"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />

        <input
          name="tags"
          placeholder="Etiketler (Mama, Tedavi...)"
          className="border border-gray-400 p-2 rounded-md outline-1 outline-yellow-500"
        />

        <button
          type="submit"
          disabled={addCampaign.isPending}
          className="bg-yellow-500 text-white p-2 rounded-md mt-2"
        >
          {addCampaign.isPending ? "Ekleniyor..." : "Kampanya Ekle"}
        </button>
      </form>
    </div>
  );
};

export default AddCampaignPage;
