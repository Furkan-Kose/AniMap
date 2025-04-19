import { Text, ScrollView, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import ImageUploadModal from "../../components/ImageUploadModal";
import LocationModal from "../../components/LocationModal";
import { genderOptions, colorOptions, healthStatusOptions } from "../../constants/data";
import { useAuth } from "@/context/AuthContext";

const AddAnimal = () => {
  const { user } = useAuth();
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const [species, setSpecies] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [healthStatus, setHealthStatus] = useState<string | null>(null);

  const mutation = useMutation<FormData, unknown, FormData>({
    mutationFn: async (newAnimal: FormData) => {
      return axios.post("http://192.168.1.123:3000/animals", newAnimal, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animals"] });
      Alert.alert("Hayvan başarıyla eklendi.");
      router.push("/");
      setSpecies("");
      setDescription("");
      setGender(null);
      setColor(null);
      setHealthStatus(null);
      setLocation({ latitude: null, longitude: null });
      setImage(null);
      setTempImage(null);
    },
    onError: (error: any) => {
      console.error("Error:", error.response || error.message);
      Alert.alert("Hayvan eklenirken bir hata oluştu.");
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("species", species);
    formData.append("description", description);
    if (gender) formData.append("gender", gender);
    if (color) formData.append("color", color);
    if (healthStatus) formData.append("healthStatus", healthStatus);
    if (location.latitude && location.longitude) {
      formData.append("location", JSON.stringify(location));
    }
    if (image) {
      formData.append("image", {
        uri: image,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);
    }

    mutation.mutate(formData);
  };

  const handleSave = (image: string | null, tempImage: string | null) => {
    setImage(image);
    setTempImage(tempImage);
    setImageModalOpen(false);
  };
  
  const handleLocationSave = (position: [number, number]) => {
    const [latitude, longitude] = position;
    setLocation({ latitude, longitude });
    setLocationModalOpen(false); 
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-6">
        <View className="bg-white rounded-xl shadow-lg p-8 mb-6 items-center">
          <Text className="text-lg font-semibold text-gray-600 text-center">
            Hayvan eklemek için giriş yapmalısınız.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="bg-yellow-500 py-2 px-6 rounded-full w-full flex items-center justify-center mt-4"
          >
            <Text className="text-white text-lg font-bold">Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <ScrollView contentContainerClassName="pb-20 pt-5 px-4">
        <Text className="text-2xl font-bold text-center mb-4">Hayvan Ekle</Text>

        <TextInput
          value={species}
          onChangeText={setSpecies}
          placeholder="Tür"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Açıklama"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <View className="border border-gray-400 rounded-md mt-4">
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={{padding: 0}}
          >
            <Picker.Item label="Cinsiyet Seç" value="" style={{fontSize: 12}} />
            {genderOptions.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>

        <View className="border border-gray-400 rounded-md mt-4">
          <Picker
            selectedValue={color}
            onValueChange={(itemValue) => setColor(itemValue)}
          >
            <Picker.Item label="Renk Seç" value="" style={{fontSize: 12}} />
            {colorOptions.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>

        <View className="border border-gray-400 rounded-md mt-4">
          <Picker
            selectedValue={healthStatus}
            onValueChange={(itemValue) => setHealthStatus(itemValue)}
          >
            <Picker.Item label="Sağlık Durumu Seç" value="" style={{fontSize: 12}} />
            {healthStatusOptions.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>

        <View className="flex-row justify-between mt-4 w-full gap-8">
          <TouchableOpacity className="flex-1 items-center justify-center border border-yellow-500 p-3 rounded-md" onPress={() => setImageModalOpen(true)}>
            <Text className="text-yellow-500">Resim Ekle</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 items-center justify-center border border-yellow-500 p-3 rounded-md" onPress={() => setLocationModalOpen(true)}>
            <Text className="text-yellow-500">Konum Ekle</Text>
          </TouchableOpacity>
        </View>

        {tempImage && <Image source={{ uri: tempImage }} className="w-40 h-40 mt-4 self-center" />}

        {location.latitude && location.longitude && (
          <View className="mt-4 p-3 border border-gray-400 rounded-md">
            <Text>Enlem: {location.latitude}</Text>
            <Text>Boylam: {location.longitude}</Text>
          </View>
        )}

        <TouchableOpacity className="bg-yellow-500 p-3 rounded-md mt-6" onPress={handleSubmit} disabled={mutation.isPending}>
          <Text className="text-white text-center font-bold">Ekle</Text>
        </TouchableOpacity>

        {isImageModalOpen && <ImageUploadModal onClose={() => setImageModalOpen(false)} onSave={handleSave} />}
        {isLocationModalOpen && <LocationModal onClose={() => setLocationModalOpen(false)} onSave={handleLocationSave} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAnimal;
