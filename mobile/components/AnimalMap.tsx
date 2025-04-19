import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Linking, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";

import catIcon from "../assets/icons/cat.png";
import dogIcon from "../assets/icons/dog.png";
import birdIcon from "../assets/icons/bird.png";
import defaultIcon from "../assets/icons/animal.png";

const AnimalMap = ({ animals }: any) => {
  const [region, setRegion] = useState({
    latitude: 40.9913,
    longitude: 29.0220,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [userLocation, setUserLocation] = useState<any>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Konum izni verilmedi.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  const handleFindMyLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const filteredAnimals = selectedSpecies
    ? animals.filter(
        (animal: any) => animal.species.toLowerCase() === selectedSpecies.toLowerCase()
      )
    : animals;

  const getIconForSpecies = (species: string) => {
    switch (species.toLowerCase()) {
      case "kedi":
        return catIcon;
      case "köpek":
        return dogIcon;
      case "kuş":
        return birdIcon;
      default:
        return defaultIcon;
    }
  };

  return (
    <View className="w-full h-[500px]">
      <View className="p-4 bg-white">
        <Picker
          selectedValue={selectedSpecies}
          onValueChange={(value) => setSelectedSpecies(value)}
        >
          <Picker.Item label="Tüm Türler" value={null} />
          <Picker.Item label="Kedi" value="Kedi" />
          <Picker.Item label="Köpek" value="Köpek" />
          <Picker.Item label="Kuş" value="Kuş" />
        </Picker>

        <TouchableOpacity
          onPress={handleFindMyLocation}
          className="mt-2 bg-blue-500 py-2 rounded"
        >
          <Text className="text-white text-center">📍 Konumumu Bul</Text>
        </TouchableOpacity>
      </View>

      <MapView
        provider="google"
        style={{ flex: 1 }}
        region={region}
        showsUserLocation={true}
      >
        {filteredAnimals.map((animal: any) => (
          <Marker
            key={animal._id}
            coordinate={{
              latitude: animal.location.latitude,
              longitude: animal.location.longitude,
            }}
          >
            <Image
              source={getIconForSpecies(animal.species)}
              style={{ width: 30, height: 30 }}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default AnimalMap;
