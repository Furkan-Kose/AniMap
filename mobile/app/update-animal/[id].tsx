import { Text, ScrollView, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import ImageUploadModal from "../../components/ImageUploadModal";
import LocationModal from "../../components/LocationModal";
import { genderOptions, colorOptions, healthStatusOptions } from "../../constants/data";
import { useAuth } from "@/context/AuthContext";
import { useAnimals } from "@/hooks/useAnimals";

const UpdateAnimal = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const { updateAnimal, animal, isAnimalLoading, animalError } = useAnimals(id);
  const { user } = useAuth();
  const router = useRouter();

  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: animal?.location?.latitude || null,
    longitude: animal?.location?.longitude || null,
  });
  const [image, setImage] = useState<string | null>(animal?.image || null);
  const [tempImage, setTempImage] = useState<string | null>(animal?.image || null);
  const [species, setSpecies] = useState(animal?.species || "");
  const [description, setDescription] = useState(animal?.description || "");
  const [gender, setGender] = useState<string | null>(animal?.gender || null);
  const [color, setColor] = useState<string | null>(animal?.color || null);
  const [healthStatus, setHealthStatus] = useState<string | null>(animal?.healthStatus || null);

  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  
  const handleSubmit = () => {
    const formData: any = new FormData();
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

    updateAnimal.mutate({ id: animal._id, data: formData }, {
        onSuccess: () => {
          router.push("/animals");
          setSpecies("");
          setDescription("");
          setGender(null);
          setColor(null);
          setHealthStatus(null);
          setImage(null);
          setTempImage(null);
          setLocation({ latitude: null, longitude: null });
          setImageModalOpen(false);
          setLocationModalOpen(false);
        },
    });
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

    if (isAnimalLoading) return <Text>Loading...</Text>;
    if (animalError) return <Text className="text-center text-red-500">Error: {animalError.message}</Text>;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} className="bg-gray-100 h-full">
      <ScrollView contentContainerClassName="pb-20 pt-5 px-4">
        <Text className="text-2xl font-bold text-center mb-4">Hayvan Güncelle</Text>

        <TextInput
          defaultValue={animal?.species || ""}
          value={species}
          onChangeText={setSpecies}
          placeholder="Tür"
          className="border border-gray-400 p-4 rounded-md mt-4 text-sm"
        />

        <TextInput
          defaultValue={animal?.description || ""}
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

        <TouchableOpacity className="bg-yellow-500 p-3 rounded-md mt-6" onPress={handleSubmit} disabled={updateAnimal.isPending}>
          <Text className="text-white text-center font-bold">Ekle</Text>
        </TouchableOpacity>

        {isImageModalOpen && <ImageUploadModal onClose={() => setImageModalOpen(false)} onSave={handleSave} />}
        {isLocationModalOpen && <LocationModal onClose={() => setLocationModalOpen(false)} onSave={handleLocationSave} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateAnimal;
