import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCampaign } from "../lib/api";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const CampaignDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { isPending, error, data: campaign } = useQuery({
      queryKey: ["campaign", id],
      queryFn: () => fetchCampaign(id!),
  });

  if (isPending) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-28 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-yellow-500 mb-6">{campaign.title}</h1>
        
        {campaign.image && (
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-72 object-cover mb-6 rounded-lg"
          />
        )}

        <p className="text-lg text-gray-700 mb-6">{campaign.description}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Hedef Tutar: {campaign.goalAmount} ₺</h2>
          <h3 className="text-lg font-medium text-gray-600">Toplanan Tutar: {campaign.currentAmount} ₺</h3>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Etiketler:</h2>
          <ul className="flex flex-wrap gap-2">
            {campaign.tags.map((tag: string) => (
              <li key={tag} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-medium">Son Tarih: {new Date(campaign.endDate).toLocaleDateString()}</h3>
        </div>

        {user?.role === "stk" && (
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
            onClick={() => toast.info("Bağış yapma özelliği yakında geliyor!")}
          >
            Bağış Yap
          </button>
        )}
      </div>
    </div>
  );
};

export default CampaignDetailPage;
