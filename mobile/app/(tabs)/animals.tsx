import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { apiURL, useAnimals } from "../../hooks/useAnimals";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimalCard from "@/components/AnimalCard";

const Animals = () => {
  const { animals, isLoading, error } = useAnimals();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <ScrollView contentContainerClassName="pb-20 pt-5 px-4">
        
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

      </ScrollView>
    </SafeAreaView>
  );
};

export default Animals;
