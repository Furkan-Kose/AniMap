import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
    owner: {
      _id: string;
      username?: string;
    };
  };
}


const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const { user } = useAuth();
  const isOwner = user?._id === String(animal.owner._id);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${apiURL}/animals/${animal._id}`, 
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      Alert.alert("Hayvan başarıyla silindi.");
    },
    onError: (error: any) => {
      console.error("Error deleting animal:", error);
      Alert.alert("Hayvan silinirken bir hata oluştu.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleUpdate = () => {

  };

  return (
    <View className="bg-white rounded-xl shadow-md border border-gray-200 w-[48%] mb-4">
      <View className="relative">
        <Image
          source={{ uri: animal.image }}
          className="w-full h-40 rounded-t-xl object-cover"
        />
        <View className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded-full">
          <Text className="text-xs font-medium text-gray-700">
            {new Date(animal.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View className="p-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-gray-900">{animal.species}</Text>
          <View className="bg-blue-50 px-2 py-1 rounded-full">
            <Text className="text-xs font-medium text-blue-600">{animal.healthStatus}</Text>
          </View>
        </View>

        <Text className="text-sm text-gray-600 mt-2" numberOfLines={2}>
          {animal.description}
        </Text>

        <View className="flex-row justify-between bg-gray-100 p-2 rounded-lg mt-3">
          <View className="items-center">
            <Text className="text-xs text-gray-500">Cinsiyet</Text>
            <Text className="text-sm font-medium text-gray-800">{animal.gender}</Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-gray-500">Renk</Text>
            <Text className="text-sm font-medium text-gray-800">{animal.color}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Text className="text-blue-600 font-medium text-sm">
                {animal.owner.username?.charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
            <Text className="ml-2 text-sm font-medium text-gray-700">
              {animal.owner.username || "Anonim"}
            </Text>
          </View>

          {isOwner && (
            <View className="flex-row space-x-4">
              <TouchableOpacity onPress={handleUpdate} className="p-[5px]">
                <Feather name="edit" size={18} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} className="p-[5px]">
                <Feather name="trash-2" size={18} color="red" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default AnimalCard;
