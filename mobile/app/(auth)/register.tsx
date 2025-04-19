import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TextInput, Button, Text, Alert, View, TouchableOpacity } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

const Register = () => {
  const { registerFunc } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const RegisterMutation = useMutation({
    mutationFn: async () => {
      await registerFunc({ username, email, password });
    },
    onSuccess: () => {
      Alert.alert("Başarılı", "Kayıt Oldunuz!");
      router.push("/login");
    },
    onError: () => {
      Alert.alert("Hata", "Kayıt başarısız.");
    },
  });

  return (
    <View className='flex-1 justify-center bg-gray-100 p-6'>
      <Text className="text-3xl font-extrabold text-center text-gray-800 mb-6">Kayıt Ol</Text>
      
      <TextInput
        className="border border-gray-300 p-4 mb-4 bg-white shadow-md rounded-lg"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        className="border border-gray-300 p-4 mb-4 bg-white shadow-md rounded-lg"
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        className="border border-gray-300 p-4 mb-4 bg-white shadow-md rounded-lg"
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity className="bg-yellow-500 p-3 rounded-md mt-3" onPress={() => RegisterMutation.mutate()}>
        <Text className="text-white font-bold text-lg text-center">Kayıt Ol</Text>
      </TouchableOpacity>

      <View className="mt-6">
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-center text-blue-600">Zaten üyeliğiniz var mı? Giriş Yapın</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
