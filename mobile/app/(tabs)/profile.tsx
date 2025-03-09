import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
  const { user, logoutFunc } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <View className="flex-1 px-4 pt-6">
        <View className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <View className="items-center mb-4">
            <MaterialIcons name="account-circle" size={100} color="#eab308" />
            {user ? (
              <Text className="text-xl font-bold">{user.username}</Text>
            ) : (
              <Text className="text-lg font-semibold text-gray-600">Giriş Yapmadınız</Text>
            )}
          </View>

          {user ? (
            <>
              <TouchableOpacity
                onPress={() => router.push("/update-profile")}
                className="flex-row items-center p-3 border-2 border-gray-300 rounded-xl mb-3"
              >
                <MaterialIcons name="edit" size={24} color="#4A90E2" />
                <Text className="text-lg text-gray-700 ml-4">Profilimi Güncelle</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/animals")}
                className="flex-row items-center p-3 border-2 border-gray-300 rounded-xl mb-3"
              >
                <MaterialIcons name="pets" size={24} color="#4A90E2" />
                <Text className="text-lg text-gray-700 ml-4">Hayvanlarımı Gör</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => logoutFunc()}
                className="flex-row items-center p-3 border-2 border-gray-300 rounded-xl"
              >
                <MaterialIcons name="exit-to-app" size={24} color="#E74C3C" />
                <Text className="text-lg text-gray-700 ml-4">Çıkış Yap</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View className="items-center">
              <TouchableOpacity
                onPress={() => router.push("/login")}
                className="bg-yellow-500 py-2 px-6 rounded-full w-full flex items-center justify-center"
              >
                <Text className="text-white text-lg font-bold">Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
