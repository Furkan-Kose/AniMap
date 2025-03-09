import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";

const LocationModal = ({ onClose, onSave }: { onClose: () => void; onSave: (position: [number, number]) => void }) => {
  const [location, setLocation] = useState<[number, number] | null>(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Konum izni verilmedi.");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation([currentLocation.coords.latitude, currentLocation.coords.longitude]);
  };

  return (
    <Modal visible animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-white w-11/12 p-6 rounded-2xl shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold">Konum Seç</Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={getLocation} className="bg-yellow-500 py-3 rounded-lg mb-4">
            <Text className="text-white text-center font-medium">Konum Al</Text>
          </TouchableOpacity>
          
          {location && (
            <View className="mb-4">
              <Text className="text-center text-gray-600">
                Enlem: {location[0].toFixed(6)} - Boylam: {location[1].toFixed(6)}
              </Text>
            </View>
          )}
          
          <View className="flex-row justify-between">
            <TouchableOpacity onPress={onClose} className="bg-gray-300 py-3 rounded-lg w-5/12">
              <Text className="text-center text-black">İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!location}
              onPress={() => location && onSave(location)}
              className={`py-3 rounded-lg w-5/12 ${!location ? 'bg-gray-300' : 'bg-yellow-500'}`}
            >
              <Text className="text-center text-white">Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;
