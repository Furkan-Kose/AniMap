import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const AnimalMap = ({ animals }: any) => {

  return (
    <View style={{ width: "100%", height: 400 }}>
      <MapView
        provider="google"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.9913, 
          longitude: 29.0220,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {animals.map((animal: any) => (
          <Marker
            key={animal._id}
            coordinate={{
              latitude: animal.location.latitude,
              longitude: animal.location.longitude,
            }}
            title={animal.species}
            description="Bu hayvana yardım edebilirsin!"
          />
        ))}
      </MapView>
    </View>
  );
};

export default AnimalMap;
