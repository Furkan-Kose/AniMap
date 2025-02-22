import { View, Text, Image } from "react-native";
import React from "react";
import { apiURL } from "../hooks/useAnimals";

interface AnimalCardProps {
  animal: {
    _id: string;
    image: string;
    species: string;
    gender: string;
    color: string;
    healthStatus: string;
    description: string;
    createdAt: string;
  };
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <View className="bg-white rounded-xl shadow-md mb-5 w-[48%] overflow-hidden">
      <Image
        source={{ uri: `${apiURL}/${animal.image}` }}
        className="h-48 w-full object-cover rounded-t-xl"
      />
      <View className="p-4">
        <Text className="text-xl font-bold">{animal.species}</Text>
        <Text className="text-sm text-gray-500 mb-2">
          {animal.gender} | {animal.color} | {animal.healthStatus}
        </Text>
        <Text className="text-base text-gray-700">{animal.description}</Text>
        <Text className="text-xs text-gray-500 mt-2">
          Eklenme Tarihi: {new Date(animal.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default AnimalCard;
