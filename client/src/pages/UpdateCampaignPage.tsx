import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCampaigns } from "../hooks/useCampaigns";

const UpdateCampaignPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { campaign, isLoading, error, updateCampaign } = useCampaigns(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    image: "",
    goalAmount: "",
    endDate: "",
    tags: "",
  });

  useEffect(() => {
    if (campaign) {
      setFormData({
        ...campaign,
        tags: campaign.tags?.join(", ") || "",
      });
    }
  }, [campaign]);

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

    updateCampaign.mutate(data, {
      onSuccess: () => {
        navigate("/campaigns");
      },
    });
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
          disabled={updateCampaign.isPending}
          className="bg-yellow-500 text-white p-2 rounded-md mt-2"
        >
          {updateCampaign.isPending ? "Güncelleniyor..." : "Kampanyayı Güncelle"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaignPage;
