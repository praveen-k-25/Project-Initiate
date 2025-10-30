import "leaflet/dist/leaflet.css";
import {
  LayersControl,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
} from "react-leaflet";
import ZoomControl from "../components/partials/ZoomControl";
import MapLayers from "../components/partials/MapLayers";
import { useDispatch, useSelector } from "react-redux";
import { setMaps } from "../store/auth_slice";
import type { rootState } from "../store/store";
import { useEffect, useRef, useState } from "react";
import MapRecenter from "../components/partials/MapRecenter";
import toast from "react-hot-toast";
import { playbackReport, snaps } from "../handler/api_handler";

const Dashboard = () => {
  const { BaseLayer } = LayersControl;
  const { map } = useSelector((state: rootState) => state.auth);
  const { vehicleStatus } = useSelector((state: rootState) => state.live);
  const dispatch = useDispatch();
  const mapRef = useRef<L.Map>(null);
  const [playbackData, setPlaybackData] = useState<any[][]>([]);
  const [data, setData] = useState<any[][]>([]);

  const handleLayers = (layer: string) => {
    dispatch(setMaps(layer));
  };

  useEffect(() => {
    if (vehicleStatus.lat !== 0)
      setData((item) => [...item, [vehicleStatus.lat, vehicleStatus.lng]]);
  }, [vehicleStatus]);

  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        startDate: "2025-10-28 08:36:00",
        endDate: "2025-10-28 08:50:29",
      };

      try {
        const response = await playbackReport(payload);
        console;
        if (response.success) await getActualRoadData(response.data);
        setPlaybackData(
          response.data[0].map((item: any) => [item.lat, item.lng])
        );
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchData();
  }, []);

  const getActualRoadData = async (data: any) => {
    try {
      const response = await snaps({
        points: data[0].map((item: any) => [item.lat, item.lng]),
      });
      if (response.success) {
        const result: any[] = [];
        response.data.forEach((element: any) => {
          if (element !== null) {
            result.push([element.lat, element.lng]);
          }
        });
        setTimeout(() => setPlaybackData(result), 1000);
      }
    } catch (error: any) {
      toast.error(error.message);
      return [];
    }
  };

  return (
    <div className="flex-1 h-screen bg-[var(--background)] overflow-hidden">
      <div className="h-full w-full p-1 relative">
        <MapContainer
          ref={mapRef}
          center={[11.037062, 77.036487]} //{[12.9716, 77.5946]}
          zoom={15}
          zoomControl={false}
          minZoom={3}
          maxZoom={18}
          scrollWheelZoom={true}
          attributionControl={false}
          className="h-full w-full rounded-lg z-0 relative"
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

          {playbackData.length > 0 && (
            <Polyline
              positions={playbackData}
              color="blue"
              weight={5}
              opacity={1}
              lineCap="round"
            />
          )}
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
            playbackData={playbackData}
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
