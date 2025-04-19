import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { FlatList, Text, View, Image } from 'react-native'
import { useCampaigns } from '@/hooks/useCampaigns'

const Campaigns = () => {
  const { isLoading, error, data: campaigns } = useCampaigns()

  if (isLoading) return <Text className="text-center mt-10 text-lg">Yükleniyor...</Text>
  if (error) return <Text className="text-center mt-10 text-red-500">Hata: {error.message}</Text>

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <Text className="text-3xl font-extrabold text-center my-6 text-yellow-500">Kampanyalar</Text>

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
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default Campaigns
