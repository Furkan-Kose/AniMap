import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import React from "react";
import { useAnimals, apiURL } from "../../hooks/useAnimals";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimalCard from "../../components/AnimalCard";
import AnimalMap from "@/components/AnimalMap";

const Index = () => {
  const { isLoading, error, data: animals } = useAnimals();
  const router = useRouter();

  if (isLoading) return <ActivityIndicator size="large" color="#000" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <ScrollView contentContainerClassName="pb-24 pt-5 px-4"> 
        {/* ✅ GİRİŞ BÖLÜMÜ */}
        <View className="bg-yellow-500 p-6 rounded-xl shadow-lg mb-6">
          <Text className="text-white text-3xl font-bold text-center">
            Sokak Hayvanlarına Destek Ol!
          </Text>
          <Text className="text-white text-center mt-2">
            Bu platform ile yardıma muhtaç hayvanları listeleyebilir ve onlara
            yardım edebilirsiniz.
          </Text>

          <TouchableOpacity
            className="mt-4 bg-white py-3 px-6 rounded-full shadow-lg mx-auto"
            onPress={() => router.push("/add-animal")}
          >
            <Text className="text-yellow-500 font-bold text-lg">Hayvan Ekle</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ HAYVAN LİSTESİ */}
        <Text className="text-2xl font-bold text-center mb-4">Hayvanlar</Text>

        {animals.length === 0 ? (
          <Text className="text-center text-gray-600">Şu anda listelenecek hayvan yok.</Text>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {animals.map((animal: any) => (
              <AnimalCard key={animal._id} animal={animal} />
            ))}
          </View>
        )}

        {/* ✅ HARİTA BÖLÜMÜ */}
        <Text className="text-2xl font-bold text-center mb-4">Harita</Text>
        <AnimalMap animals={animals} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
