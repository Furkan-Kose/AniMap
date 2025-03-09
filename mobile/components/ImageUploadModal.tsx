import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ImageUploadModal = ({ onClose, onSave }: { onClose: () => void; onSave: (image: string | null, tempImage: string | null) => void }) => {
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setTempImage(result.assets[0].uri);
        setImage(result.assets[0].uri);
      }
    } else {
      alert("Kamera izni verilmedi.");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTempImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal visible animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-white w-11/12 p-5 rounded-2xl shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold">Resim Seç</Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {image ? (
            <Image source={{ uri: image }} className="w-40 h-40 rounded-lg mx-auto mb-4" />
          ) : (
            <Text className="text-gray-500 text-center mb-4">Resmi Seçin veya Çekin</Text>
          )}
          <TouchableOpacity onPress={pickImage} className="bg-yellow-500 py-3 rounded-lg mb-3">
            <Text className="text-white text-center font-medium">Galeriden Seç</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera} className="bg-yellow-500 py-3 rounded-lg mb-3">
            <Text className="text-white text-center font-medium">Kamera ile Çek</Text>
          </TouchableOpacity>
          <View className="flex-row justify-between mt-3">
            <TouchableOpacity onPress={onClose} className="bg-gray-300 py-3 rounded-lg w-5/12">
              <Text className="text-center text-black">İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!image}
              onPress={() => onSave(image, tempImage)}
              className={`py-3 rounded-lg w-5/12 ${!image ? 'bg-gray-300' : 'bg-yellow-500'}`}
            >
              <Text className="text-center text-white">Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImageUploadModal;
