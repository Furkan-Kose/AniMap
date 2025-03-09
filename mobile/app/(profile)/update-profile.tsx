import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";


const UpdateProfile = () => {
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <View className="flex-1 px-4 pt-6">
        <View className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <View className="items-center mb-4">
            <MaterialIcons name="account-circle" size={100} color="#eab308" />
            <Text className="text-xl font-bold">Profil Güncelle</Text>
          </View>

          <TextInput
            className="border-b-2 border-gray-300 py-2 px-4 mb-4"
            placeholder="Yeni kullanıcı adı"
          />

          <TouchableOpacity
            className="bg-yellow-500 py-2 px-6 rounded-full w-full items-center"
          >
            <Text className="text-white text-lg font-bold">Güncellemeyi Tamamla</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfile;
