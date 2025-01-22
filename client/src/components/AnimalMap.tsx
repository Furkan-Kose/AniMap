import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnimalType } from "../types";

interface AnimalMapProps {
  animals: AnimalType[];
}

const AnimalMap: React.FC<AnimalMapProps> = ({ animals }) => {
  const defaultCenter: LatLngExpression = [41.0082, 28.9784];
  const defaultZoom = 12;

  return (
    <div className="my-8">
      <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {animals.map((animal: any) => {
          const position: LatLngExpression = [
            animal?.location?.latitude, 
            animal?.location?.longitude
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
