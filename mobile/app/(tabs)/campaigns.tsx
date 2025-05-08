import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { FlatList, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

const Campaigns = () => {
  const { user } = useAuth();
  const { campaigns, isLoading, error, deleteCampaign } = useCampaigns();
  const router = useRouter();

  if (isLoading) return <Text className="text-center mt-10 text-lg">Yükleniyor...</Text>;
  if (error) return <Text className="text-center mt-10 text-red-500">Hata: {error.message}</Text>;

  const handleUpdate = (id: string) => {
    router.push(`/update-campaign/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteCampaign.mutate(id);
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <Text className="text-3xl font-extrabold text-center my-6 text-yellow-500">Kampanyalar</Text>

      {user?.role === "stk" || user?.role === "admin" ? (
        <TouchableOpacity
          onPress={() => router.push("/add-campaign")}
          className="bg-yellow-500 rounded-full py-2 px-4 mb-6 mx-auto w-[80%]"
        >
          <Text className="text-white text-center font-bold">Kampanya Oluştur</Text>
        </TouchableOpacity>
      ) : null}

      {campaigns.length === 0 ? (
        <Text className="text-center text-gray-600">Şu anda listelenecek kampanya yok.</Text>
      ) : (
        <FlatList
          data={campaigns}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-2xl shadow-md mb-5 overflow-hidden w-[48%]">
              <Image 
                source={{ uri: item.image }}
                className="w-full h-32"
                resizeMode="cover"
              />
              <View className="pt-2 px-3 pb-4">
                <Text className="text-base font-bold mb-1 text-gray-800">{item.title}</Text>
                <Text className="text-sm text-gray-600 mb-2">{item.description}</Text>
                <Text className="text-xs text-gray-500">🎯 {item.goalAmount ?? "Belirtilmedi"} ₺</Text>
                <Text className="text-xs text-gray-500">💰 {item.currentAmount} ₺</Text>

                {item.organization._id === user?._id ? (
                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity onPress={() => handleUpdate(item._id)}>
                      <Text className="text-yellow-500">Güncelle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item._id)}>
                      <Text className="text-red-500">Sil</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Campaigns;
