import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import { useCampaigns } from "../hooks/useCampaigns";

const AdminUpdateCampaignPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { campaign, isLoading, error, updateCampaign } = useCampaigns(id);

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
          navigate("/admin/campaigns");
        },
      });
    };

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center pt-28 text-red-500">Kampanya getirilemedi.</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin - Kampanya Güncelle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-8 w-3/4">
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Kampanya Başlığı"
          className="border p-2 rounded-md"
        />
        <input
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
          required
          placeholder="Görsel URL"
          className="border p-2 rounded-md"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Kampanya Açıklaması"
          className="border p-2 rounded-md h-40 resize-none"
        />
        <input
          name="goalAmount"
          type="number"
          value={formData.goalAmount}
          onChange={handleChange}
          required
          placeholder="Hedef Tutar (₺)"
          className="border p-2 rounded-md"
        />
        <input
          name="endDate"
          type="date"
          value={formData.endDate?.slice(0, 10)}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />
        <input
          name="tag"
          type="text"
          value={formData.tags}
          onChange={handleChange}
          required
          placeholder="Etiket (örn: kedi, köpek, tedavi)"
          className="border p-2 rounded-md"
        />
        <button
          disabled={updateCampaign.isPending}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateCampaignPage;
