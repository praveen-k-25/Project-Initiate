import L from "leaflet";
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
import VehicleCard from "../components/partials/VehicleCard";
import ZoomControl from "../components/partials/ZoomControl";
import { dashboardVehicles } from "../handler/api_handler";
import { setMaps } from "../store/auth_slice";
import { setVehicleStatusUser } from "../store/live_data_slice";
import type { rootState } from "../store/store";
import type { vehicleData } from "../typesTs/dashboard";
import VehicleMarker from "../components/partials/VehicleMarker";

type polylineData = [number, number][];
type selectedVehicle = vehicleData | null;

const Dashboard = () => {
  const { BaseLayer } = LayersControl;
  const dispatch = useDispatch();
  const mapRef = useRef<L.Map>(null);
  const { map, theme, user } = useSelector((state: rootState) => state.auth);
  const { vehicleStatus } = useSelector((state: rootState) => state.live);
  const [selectedVehicle, setSelectedVehicle] = useState<selectedVehicle>(null);
  const [selectedPolyline, setSelectedPolyline] = useState<polylineData>([]);

  // Vehicle Card States
  const [isVehicleCardOpen, setIsVehicleCardOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVehicleCardOpen(true);
    }, 1000);
    handleDashboardData();
  }, []);

  useEffect(() => {
    if (selectedVehicle) {
      setSelectedPolyline((prev) => [
        [selectedVehicle.lat, selectedVehicle.lng],
        ...prev,
      ]);
    } else {
      setSelectedPolyline([]);
    }
  }, [selectedVehicle]);

  const handleLayers = (layer: string) => dispatch(setMaps(layer));

  const handleDashboardData = async () => {
    const payload = {
      user: user.id,
    };
    try {
      const response = await dashboardVehicles(payload);
      dispatch(setVehicleStatusUser(response.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  /*   const VehicleMarker = (status: string, direction: number) => {
    const icon = L.divIcon({
      className: "plane-icon",
      html: `<div style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:60px;
      height:60px;
      border-radius:100%;
      background-color:${status === "moving" ? "#0000ff1a" : status === "idle" ? "#fff7001a" : "#5b5b5b1c"};
      transform: rotate(${direction}deg);
    ">
      <svg fill="${status === "moving" ? "#0000FF" : status === "idle" ? "#FFBB00" : "#5B5B5B"}"
        viewBox="0 0 256 256" width="24" height="24">
        <path d="M230.251,103.83008A15.76842,15.76842,0,0,1,218.96,118.8457l-76.55664,23.55567-23.55566,76.55468a15.76424,15.76424,0,0,1-15.01465,11.292c-.09863.00195-.19922.00293-.29785.00293a15.75666,15.75666,0,0,1-15.09961-10.76563L29.83105,50.18164A15.99955,15.99955,0,0,1,50.18457,29.82812L219.4873,88.43359A15.76429,15.76429,0,0,1,230.251,103.83008Z"/>
      </svg>
    </div>`,
      iconSize: [60, 60],
      iconAnchor: [30, 30], // ⬅️ Centers the marker perfectly
    });

    return icon;
  }; */

  const handleSelectedVehicle = () => setSelectedVehicle(null);

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
          className="h-full flex-1 rounded-md relative"
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

          {selectedVehicle ? (
            <VehicleMarker
              selectedVehicle={selectedVehicle}
              handleSelectedVehicle={handleSelectedVehicle}
            />
          ) : (
            vehicleStatus.map((item) => (
              <Marker
                key={item.user}
                position={[item.lat, item.lng]}
                eventHandlers={{
                  click: () => {
                    !selectedVehicle
                      ? setSelectedVehicle(item)
                      : setSelectedVehicle(null);
                  },
                }}
              />
            ))
          )}

          {selectedVehicle && (
            <Polyline
              positions={selectedPolyline}
              color="blue"
              weight={5}
              opacity={1}
              lineCap="round"
            />
          )}

          <ZoomControl />
          <MapLayers handleLayers={handleLayers} />

          <MapRecenter
            vehicleStatus={vehicleStatus}
            selectedVehicle={selectedVehicle}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
