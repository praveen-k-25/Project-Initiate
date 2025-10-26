import "leaflet/dist/leaflet.css";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import ZoomControl from "../components/partials/ZoomControl";
import MapLayers from "../components/partials/MapLayers";
import { useDispatch, useSelector } from "react-redux";
import { setMaps } from "../store/auth_slice";
import type { rootState } from "../store/store";

const Dashboard = () => {
  const { BaseLayer } = LayersControl;
  const { map } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();

  const handleLayers = (layer: string) => {
    dispatch(setMaps(layer));
  };

  return (
    <div className="flex-1 h-screen bg-[var(--background)] overflow-hidden">
      <div className="h-full w-full p-1 relative">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={15}
          zoomControl={false}
          minZoom={3}
          maxZoom={18}
          scrollWheelZoom={true}
          attributionControl={false}
          className="h-full w-full rounded-lg z-0"
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
          <ZoomControl />
          <MapLayers handleLayers={handleLayers} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
