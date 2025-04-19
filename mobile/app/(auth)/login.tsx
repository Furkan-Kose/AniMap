import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const Login = () => {
  const { loginFunc } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async () => {
      await loginFunc({ email, password });
    },
    onSuccess: () => {
      Alert.alert("Başarılı", "Giriş yaptınız!");
      router.push("/");
    },
    onError: () => {
      Alert.alert("Hata", "Giriş başarısız.");
    },
  });

  return (
    <View className="flex-1 justify-center bg-gray-100 p-6">
      <Text className="text-3xl font-extrabold text-center text-gray-800 mb-6">Giriş Yap</Text>
      
      <TextInput
        className="border border-gray-300 p-4 mb-4 bg-white shadow-md rounded-lg"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-300 p-4 mb-4 bg-white shadow-md rounded-lg"
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity className="bg-yellow-500 p-3 rounded-md mt-3" onPress={() => loginMutation.mutate()}>
        <Text className="text-white font-bold text-lg text-center">Giriş Yap</Text>
      </TouchableOpacity>

      <View className="mt-6">
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text className="text-center text-blue-600">Hesabınız yok mu? Kayıt Olun</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
