import { Marker, useMap } from "react-leaflet";
import { useEffect, useRef, useState, type FC } from "react";
import L from "leaflet";
import type { vehicleStatusData } from "../../typesTs/dashboard";
import "leaflet.marker.slideto";

interface vehiclemarker {
  selectedVehicle: vehicleStatusData;
  handleSelectedVehicle: (data: vehicleStatusData | null) => void;
}

type layLng = { lat: number; lng: number };

const VehicleMarker: FC<vehiclemarker> = (props) => {
  const { selectedVehicle, handleSelectedVehicle } = props;
  const [positions, setpositions] = useState<layLng | null>(null);
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());
  const scale = Math.max(0.2, Math.min(1, (zoomLevel - 8) / 4)); // 0.2–1 scale range
  const size = 60 * scale;
  const markerRef = useRef<L.Marker & { slideTo?: Function }>(null);

  useEffect(() => {
    const handleZoom = () => setZoomLevel(map.getZoom());
    map.on("zoomend", handleZoom);
    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map]);

  const isDotView = zoomLevel < 10; // 👈 threshold (you can adjust)

  const icon = L.divIcon({
    className: "plane-icon",
    html: isDotView
      ? `<div style="
      width:${size}px;height:${size}px;
      border-radius:50%;
      background-color:${
        selectedVehicle.status === 1
          ? "#0000FF"
          : selectedVehicle.status === 2
            ? "#FFBB00"
            : "#5B5B5B"
      };
      box-shadow:0 0 4px rgba(0,0,0,0.4);
    "></div>`
      : `<div style="
      position: relative;
      display:flex;
      align-items:center;
      justify-content:center;
      width:${size}px;height:${size}px;
      border-radius:100%;
      background-color:${
        selectedVehicle.status === 1
          ? "#0000ff1a"
          : selectedVehicle.status === 2
            ? "#fff7001a"
            : "#5b5b5b1c"
      };
    ">
      <svg
        fill="${
          selectedVehicle.status === 1
            ? "#0000FF"
            : selectedVehicle.status === 2
              ? "#FFBB00"
              : "#5B5B5B"
        }"
        viewBox="0 0 256 256" width="24" height="24">
        <path d="M230.251,103.83008A15.76842,15.76842,0,0,1,218.96,118.8457l-76.55664,23.55567-23.55566,76.55468a15.76424,15.76424,0,0,1-15.01465,11.292c-.09863.00195-.19922.00293-.29785.00293a15.75666,15.75666,0,0,1-15.09961-10.76563L29.83105,50.18164A15.99955,15.99955,0,0,1,50.18457,29.82812L219.4873,88.43359A15.76429,15.76429,0,0,1,230.251,103.83008Z"/>
      </svg>
    </div>`,

    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

  useEffect(() => {
    if (selectedVehicle) {
      if (positions === null) {
        setpositions({ lat: selectedVehicle.lat, lng: selectedVehicle.lng });
      } else if (markerRef.current) {
        markerRef?.current?.slideTo?.(
          [selectedVehicle.lat, selectedVehicle.lng],
          { duration: 1000 } // time in ms
        );
      }
    } else {
      setpositions(null);
    }
  }, [selectedVehicle]);

  return (
    <Marker
      ref={markerRef}
      eventHandlers={{
        click: () => handleSelectedVehicle(null),
      }}
      position={[positions?.lat || 0, positions?.lng || 0]}
      icon={icon}
    />
  );
};

export default VehicleMarker;
