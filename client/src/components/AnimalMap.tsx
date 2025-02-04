import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnimalType } from "../types";
import { districts } from "../constants/data";
import Select from "react-select";



interface AnimalMapProps {
  animals: AnimalType[];
}

// Harita merkezini güncelleyen bileşen
const MapUpdater = ({ center, zoom }: { center: LatLngExpression; zoom: number }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);

  return null;
};

const AnimalMap: React.FC<AnimalMapProps> = ({ animals }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      maxHeight: "300px",
      zIndex: 9999,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    }),
  };

  const districtOptions = districts.map((district) => ({
    value: district.name,
    label: district.name,
  }));

  return (
    <div className="">
      {/* İlçe seçimi dropdown */}
      <div className="my-4 flex items-center justify-center">
        <Select
          value={{ value: selectedDistrict.name, label: selectedDistrict.name }}
          onChange={(selectedOption) => {
            const selected = districts.find(
              (d) => d.name === selectedOption?.value
            );
            if (selected) setSelectedDistrict(selected);
          }}
          options={districtOptions}
          styles={customStyles}
          className="w-[200px]"
        />
      </div>

      {/* Harita */}
      <MapContainer
        center={[selectedDistrict.lat, selectedDistrict.lon]}
        zoom={selectedDistrict.zoom}
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <MapUpdater center={[selectedDistrict.lat, selectedDistrict.lon]} zoom={selectedDistrict.zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Hayvanlar haritada olduğu gibi kalacak */}
        {animals.map((animal: any) => {
          const position: LatLngExpression = [
            animal.location.latitude,
            animal.location.longitude,
          ];

          return (
            <Marker key={animal._id} position={position} icon={new L.Icon.Default()}>
              <Popup>
                <h3>{animal.species}</h3>
                <p>{animal.description}</p>
                <p><strong>Cinsiyet:</strong> {animal.gender}</p>
                <p><strong>Renk:</strong> {animal.color}</p>
                <p><strong>Sağlık Durumu:</strong> {animal.healthStatus}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default AnimalMap;
