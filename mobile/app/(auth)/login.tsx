import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
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
    <View className="flex-1 justify-center p-4">
        <Text className="text-2xl font-bold text-center mb-4">Giriş Yap</Text>
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Giriş Yap" onPress={() => loginMutation.mutate()} />
    </View>
  );
};

export default Login;
