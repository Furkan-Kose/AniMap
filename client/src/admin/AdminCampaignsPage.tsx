import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";
import { useCampaigns } from "../hooks/useCampaigns";
import { useState } from "react";


const AdminCampaignsPage = () => {
  const navigate = useNavigate();
  const { campaigns, isLoading, error, deleteCampaign } = useCampaigns();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCampaigns = campaigns?.filter((campaign: any) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteCampaign.mutate(id);
  };

  if (isLoading) return <Loading />;
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredCampaigns.map((campaign: any) => (
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
                <button className="text-red-500" onClick={() => handleDelete(campaign._id)}>
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
