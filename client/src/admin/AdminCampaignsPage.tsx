import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const fetchCampaigns = async () => {
  const res = await axios.get("http://localhost:3000/campaigns", { withCredentials: true });
  return res.data;
};

const AdminCampaignsPage = () => {
  const navigate = useNavigate();

  const { isPending, error, data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (campaign: any) => {
      await axios.delete(`http://localhost:3000/campaigns/${campaign._id}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success("Kampanya başarıyla silindi.");
    },
    onError: () => {
      toast.error("Kampanya silinirken bir hata oluştu.");
    },
  });

  const handleDelete = (campaign: any) => {
    deleteMutation.mutate(campaign);
  };

  if (isPending) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Kampanyalar</h1>

      <div className="flex items-center justify-between">
        {/* Arama */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Kampanya ara..."
            className="p-2 border border-gray-300 rounded-l-lg w-80"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg">
            <FaSearch />
          </button>
        </div>
        {/* Yeni Kampanya Ekle */}
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={() => navigate("/admin/campaigns/add")}
        >
          Yeni Kampanya Ekle
        </button>
      </div>

      {/* Kampanyalar Tablosu */}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">Görsel</th>
            <th className="py-3 px-6 text-left">Başlık</th>
            <th className="py-3 px-6 text-left">Açıklama</th>
            <th className="py-3 px-6 text-left">Hedef Miktar</th>
            <th className="py-3 px-6 text-center">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign: any) => (
            <tr key={campaign._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-6">
                <img src={campaign.image} alt={campaign.title} className="w-16 h-16 object-cover" />
              </td>
              <td className="py-3 px-6">{campaign.title}</td>
              <td className="py-3 px-6">{campaign.description}</td>
              <td className="py-3 px-6">{campaign.goalAmount}₺</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="text-blue-500 mr-4"
                  onClick={() => navigate(`/admin/campaigns/update/${campaign._id}`)}
                >
                  <FaPencilAlt />
                </button>
                <button className="text-red-500" onClick={() => handleDelete(campaign)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCampaignsPage;
