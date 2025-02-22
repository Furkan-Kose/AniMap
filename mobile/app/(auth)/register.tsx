import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TextInput, Button, Text, Alert, View } from 'react-native';
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
    <View className='flex-1 justify-center p-4'>
      <Text className="text-2xl font-bold text-center mb-4">Kayıt Ol</Text>
      <TextInput
          className="border border-gray-300 p-2 mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
      />
      <TextInput
          className="border border-gray-300 p-2 mb-4"
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
      />
      <TextInput
          className="border border-gray-300 p-2 mb-4"
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
      />
      <Button title="Kayıt Ol" onPress={() => RegisterMutation.mutate()} />
    </View>
  );
};

export default Register;
