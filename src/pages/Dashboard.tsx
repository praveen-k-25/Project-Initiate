import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import MapLayers from "../components/partials/MapLayers";
import MapRecenter from "../components/partials/MapRecenter";
import ZoomControl from "../components/partials/ZoomControl";
import { setMaps } from "../store/auth_slice";
import type { rootState } from "../store/store";
import VehicleCard from "../components/partials/VehicleCard";

const Dashboard = () => {
  const { BaseLayer } = LayersControl;
  const dispatch = useDispatch();
  const { map, theme } = useSelector((state: rootState) => state.auth);
  const { vehicleStatus } = useSelector((state: rootState) => state.live);

  const mapRef = useRef<L.Map>(null);
  const [data, setData] = useState<any[][]>([]);

  // Vehicle Card States
  const [isVehicleCardOpen, setIsVehicleCardOpen] = useState(false);

  const handleLayers = (layer: string) => {
    dispatch(setMaps(layer));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVehicleCardOpen(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (vehicleStatus.lat !== 0)
      setData((item) => [...item, [vehicleStatus.lat, vehicleStatus.lng]]);
  }, [vehicleStatus]);

  return (
    <div className="flex-1 h-screen bg-[var(--background)]">
      <div className="h-full w-full p-1 relative flex ">
        <VehicleCard
          isOpen={isVehicleCardOpen}
          theme={theme || "light"}
          changeOpen={() => setIsVehicleCardOpen(!isVehicleCardOpen)}
        />
        <MapContainer
          ref={mapRef}
          center={[11.037062, 77.036487]} //{[12.9716, 77.5946]}
          zoom={15}
          zoomControl={false}
          minZoom={3}
          maxZoom={18}
          scrollWheelZoom={true}
          attributionControl={false}
          className="h-full flex-1 rounded-md relative overflow-hidden"
        >
          <LayersControl position="topright">
            <BaseLayer checked={map === "osm"} name="OSM">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>
            <BaseLayer checked={map === "hybrid"} name="Hybrid">
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer checked={map === "street"} name="Street">
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
          </LayersControl>

          <Marker position={[vehicleStatus.lat, vehicleStatus.lng]} />

          {data.length > 0 && (
            <Polyline
              positions={data}
              color="blue"
              weight={5}
              opacity={1}
              lineCap="round"
            />
          )}

          <ZoomControl />
          <MapLayers handleLayers={handleLayers} />
          <MapRecenter
            lat={vehicleStatus.lat}
            lng={vehicleStatus.lng}
            timestamp={vehicleStatus.timestamp}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
