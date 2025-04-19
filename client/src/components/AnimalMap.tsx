import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnimalType } from "../types";
import { districts } from "../constants/data";
import Select from "react-select";


const MapUpdater = ({ center, zoom }: { center: LatLngExpression; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
};

interface AnimalMapProps {
  animals: AnimalType[];
}

const AnimalMap: React.FC<AnimalMapProps> = ({ animals }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([selectedDistrict.lat, selectedDistrict.lon]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

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

  const speciesOptions = [
    { value: "Kedi", label: "Kedi" },
    { value: "Köpek", label: "Köpek" },
    { value: "Kuş", label: "Kuş" },
    { value: "", label: "Diğer" },
  ];

  const handleFindMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(userCoords);
          setMapCenter(userCoords);
        },
        () => {
          alert("Konum alınamadı.");
        }
      );
    } else {
      alert("Tarayıcınız konum desteği sağlamıyor.");
    }
  };

  useEffect(() => {
    setMapCenter([selectedDistrict.lat, selectedDistrict.lon]);
  }, [selectedDistrict]);

  const getAnimalIcon = (species: string) => {
    let iconUrl = "";

    if (species.toLowerCase() === "kedi") {
      iconUrl = "/icons/cat.png";
    } else if (species.toLowerCase() === "köpek") {
      iconUrl = "/icons/dog.png";
    } else if (species.toLowerCase() === "kuş") {
      iconUrl = "/icons/bird.png";
    } else {
      iconUrl = "/icons/animal.png";
    }

    return new Icon({
      iconUrl,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -35],
    });
  };

  const getUserIcon = () =>
    new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });


  const filteredAnimals = selectedSpecies
    ? animals.filter((animal) => animal.species.toLowerCase() === selectedSpecies.toLowerCase())
    : animals;

  return (
    <div>
      {/* Seçimler */}
      <div className="my-4 flex flex-wrap items-center justify-center gap-4">
        {/* İlçe Seçimi */}
        <Select
          value={{ value: selectedDistrict.name, label: selectedDistrict.name }}
          onChange={(selectedOption) => {
            const selected = districts.find((d) => d.name === selectedOption?.value);
            if (selected) setSelectedDistrict(selected);
          }}
          options={districtOptions}
          styles={customStyles}
          className="w-[200px]"
        />

        {/* Tür Filtre */}
        <Select
          value={selectedSpecies ? { value: selectedSpecies, label: selectedSpecies } : null}
          onChange={(selectedOption) => setSelectedSpecies(selectedOption?.value || null)}
          options={speciesOptions}
          styles={customStyles}
          placeholder="Tür Seç"
          isClearable
          className="w-[200px]"
        />

        {/* Konum Bul */}
        <button
          onClick={handleFindMyLocation}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📍 Konumumu Bul
        </button>
      </div>

      {/* Harita */}
      <MapContainer
        center={mapCenter}
        zoom={selectedDistrict.zoom}
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <MapUpdater center={mapCenter} zoom={selectedDistrict.zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Kullanıcı konumu */}
        {userLocation && (
          <Marker position={userLocation} icon={getUserIcon()}>
            <Popup>Benim Konumum</Popup>
          </Marker>
        )}

        {/* Hayvanlar */}
        {filteredAnimals.map((animal: any) => {
          const position: LatLngExpression = [
            animal.location.latitude,
            animal.location.longitude,
          ];
          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${animal.location.latitude},${animal.location.longitude}`;

          return (
            <Marker
              key={animal._id}
              position={position}
              icon={getAnimalIcon(animal.species)}
            >
              <Popup className="w-48">
                <div className="flex flex-col">
                  {/* Hayvan Resmi */}
                  {animal.image && (
                    <img
                      src={animal.image}
                      alt={animal.species}
                      className="w-16 h-16 object-cover rounded-full mb-2 mx-auto"
                    />
                  )}
                  <h3 className="text-sm text-center font-semibold text-gray-800">{animal.species}</h3>
                  <div className="text-xs text-gray-600">
                    <p>{animal.description}</p>
                    <p><strong>Cinsiyet:</strong> {animal.gender}</p>
                    <p><strong>Renk:</strong> {animal.color}</p>
                    <p><strong>Sağlık Durumu:</strong> {animal.healthStatus}</p>
                  </div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-xs hover:underline"
                  >
                    Yol Tarifi Al
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default AnimalMap;
