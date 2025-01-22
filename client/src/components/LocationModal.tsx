import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LocationModalProps {
  onClose: () => void;
  onSave: (position: [number, number]) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ onClose, onSave }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([41, 29]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (err) => {
          console.error("Konum alınamadı: ", err);
        }
      );
    } else {
      console.error("Tarayıcı konum hizmetlerini desteklemiyor.");
    }
  }, []);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (err) => {
          console.error("Konum alınamadı: ", err);
        }
      );
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return position ? <Marker position={position} /> : null;
  };

  const CenterMapOnLocation = () => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 13);
      }
    }, [position, map]);

    return null;
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Konum Seç</h2>

        <div className="h-64 rounded-md overflow-hidden">
          <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
            <CenterMapOnLocation />
          </MapContainer>
        </div>

        <div className="mt-4 flex items-center">
          <button
            onClick={handleUseCurrentLocation}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md w-full flex items-center justify-center"
          >
            <FaMapMarkerAlt size={20} className="mr-2" />
            Şu Anki Konumu Kullan
          </button>
        </div>

        <button
            onClick={() => position && onSave(position)}
            className="mt-4 block w-full bg-green-500 text-white py-2 rounded-md"
            disabled={!position}
        >
            Kaydet
        </button>
      </div>
    </div>
  );
};

export default LocationModal;
