import { Text, ScrollView, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useRouter } from "expo-router"; 

const Profile = () => {
  const { user } = useAuth(); 
  const router = useRouter(); 

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <ScrollView contentContainerClassName="pb-20 pt-5 px-4">
        <Text className="text-2xl font-bold text-center mb-4">Profil</Text>

        {user ? (
          <View className="bg-white rounded-lg shadow-md p-5 mb-4">
            <Text className="text-lg font-semibold">Kullanıcı Bilgileri</Text>
            <Text className="mt-2">Ad: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Rol: {user.role}</Text>
          </View>
        ) : (
          <View className="bg-white rounded-lg shadow-md p-5 mb-4">
            <Text className="text-lg font-semibold">Giriş Yapmadınız</Text>
            <Text className="mt-2 mb-4">Profilinizi görüntülemek için lütfen giriş yapın.</Text>
            <Button title="Giriş Yap" onPress={() => router.push("/login")} color="#0061FF" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
