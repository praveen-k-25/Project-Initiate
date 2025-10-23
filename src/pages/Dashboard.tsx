import { useEffect } from "react";
import { useSelector } from "react-redux";
import usertracker from "../features/mqtt";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import ZoomControl from "../components/partials/ZoomControl";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    usertracker(user);
  }, []);

  return (
    <div className="flex-1 h-screen bg-[var(--background)] overflow-hidden">
      <div className="h-full w-full p-2 relative">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={13}
          zoomControl={false}
          minZoom={3}
          scrollWheelZoom={true}
          className="h-full w-full rounded-lg z-0"
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Dark">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Light">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Street">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="street map">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="street map2">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>
          </LayersControl>
          <ZoomControl />
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
