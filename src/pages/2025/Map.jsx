import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

// Fix default marker icon paths for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).toString(),
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
});

// --- helper to fly smoothly ---
function FlyToLocation({ latLong }) {
  const map = useMap();

  useEffect(() => {
    if (!latLong) return;
    map.flyTo(latLong, 6, { duration: 1.5 });
  }, [latLong, map]);

  return null;
}

export default function Map({ latLong }) {
  return (
    <MapContainer
      center={[39.7392, -75.5398]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; CARTO & OpenStreetMap contributors"
      />

      <FlyToLocation latLong={latLong} />

      {latLong && (
        <Marker position={latLong}>
          <Popup>{`Lat: ${latLong[0]}, Long: ${latLong[1]}`}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
