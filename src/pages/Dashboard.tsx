import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
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
  const polylineRef = useRef<L.Polyline>(null);
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
    if (!mapRef.current) return;

    // Initialize polyline once
    if (!polylineRef.current) {
      polylineRef.current = L.polyline([], {
        color: "blue",
        weight: 4,
        opacity: 1,
        lineCap: "round",
        smoothFactor: 1,
      }).addTo(mapRef.current);
    }

    // Only update when a vehicle is selected
    if (selectedVehicle) {
      selectedPolyline;
      const newPoint: [number, number] = [
        selectedVehicle.lat,
        selectedVehicle.lng,
      ];

      // Append point only if it's new (avoid duplicate redraws)
      setSelectedPolyline((prev) => {
        const last = prev[prev.length - 1];
        if (
          !last ||
          last[0] !== newPoint[0] ||
          last[1] !== newPoint[1] ||
          selectedVehicle.status === "inactive"
        ) {
          polylineRef.current?.addLatLng(newPoint);
          return [...prev, newPoint];
        }
        return prev;
      });
    } else {
      // Reset when no vehicle selected
      polylineRef.current?.setLatLngs([]);
      setSelectedPolyline([]);
    }
  }, [selectedVehicle]);

  useEffect(() => {
    if (selectedVehicle) {
      let vehicle = vehicleStatus.find(
        (item: any) => item.user === selectedVehicle.user
      );

      if (vehicle) {
        setSelectedVehicle(vehicle);
      }
    }
  }, [vehicleStatus]);

  const handleDashboardData = async () => {
    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Fetches vehicle status data from the backend and updates the redux store.
     *
     * @throws {Error} - If there is an error while fetching the data.
     */
    /*******  233656fa-16e5-4c2d-8d11-f68db97a2c52  *******/ const payload = {
      user: user.id,
    };
    try {
      const response = await dashboardVehicles(payload);
      dispatch(setVehicleStatusUser(response.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSelectedVehicle = () => setSelectedVehicle(null);
  const handleLayers = (layer: string) => dispatch(setMaps(layer));

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
