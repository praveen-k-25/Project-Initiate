import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usertracker from "../features/mqtt";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import ZoomControl from "../components/partials/ZoomControl";
import MapLayers from "../components/partials/MapLayers";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { BaseLayer } = LayersControl;
  const [selectedLayer, setSelectedLayer] = useState("Dark");
  useEffect(() => {
    usertracker(user);
  }, []);

  const handleLayers = (layer: string) => setSelectedLayer(layer);

  return (
    <div className="flex-1 h-screen bg-[var(--background)] overflow-hidden">
      <div className="h-full w-full p-2 relative">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={13}
          zoomControl={false}
          minZoom={3}
          maxZoom={20}
          scrollWheelZoom={true}
          attributionControl={false}
          className="h-full w-full rounded-lg z-0"
        >
          <LayersControl position="topright">
            <BaseLayer checked={selectedLayer === "osm"} name="OSM">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>
            <BaseLayer checked={selectedLayer === "hybrid"} name="Hybrid">
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer checked={selectedLayer === "street"} name="Street">
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer checked={selectedLayer === "Dark"} name="Dark">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            </BaseLayer>
          </LayersControl>
          <ZoomControl />
          <MapLayers handleLayers={handleLayers} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
