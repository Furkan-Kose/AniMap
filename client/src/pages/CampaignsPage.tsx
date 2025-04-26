import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useCampaigns } from "../hooks/useCampaigns";

const CampaignsPage = () => {
  const { user } = useAuth();
  const { campaigns, deleteCampaign, isLoading, error } = useCampaigns();

  const handleDelete = (id: string) => {
    deleteCampaign.mutate(id);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Loading /></div>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Kampanyalar</h1>
        {user?.role === "stk" && (
          <Link to="/campaigns/add">
            <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition duration-200 shadow-md">
              + Kampanya Ekle
            </button>
          </Link>
        )}
      </div>

      {campaigns.length === 0 ? (
        <p className="text-gray-500 text-center mt-20 text-lg">
          Henüz kampanya bulunmamaktadır.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign: any) => {
            const isOwner = user?._id === campaign.organization._id;

            return (
              <div
                key={campaign._id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100"
              >
                {campaign.image && (
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {campaign.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {campaign.description}
                  </p>
                  <div className="flex flex-col gap-1 text-sm text-gray-500 mb-4">
                    <span>🎯 Hedef: {campaign.goalAmount ?? "Belirtilmedi"} ₺</span>
                    <span>💰 Toplanan: {campaign.currentAmount} ₺</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/campaigns/${campaign._id}`}
                      className="text-sm font-medium text-emerald-600 hover:underline"
                    >
                      Detayları Gör →
                    </Link>

                    {isOwner && (
                      <div className="flex items-center gap-2">
                        <Link to={`/campaigns/update/${campaign._id}`}>
                          <button className="p-2 rounded-full hover:bg-gray-100 text-emerald-600">
                            <FiEdit size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(campaign._id)}
                          className="p-2 rounded-full hover:bg-gray-100 text-red-500"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
