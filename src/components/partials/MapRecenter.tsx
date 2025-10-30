import { useEffect, type FC } from "react";
import { useMap } from "react-leaflet";
import recenter from "../../assets/svgs/recenter.svg";
import recenter_dark from "../../assets/svgs/recenter-dark.svg";
import { useSelector } from "react-redux";

interface props {
  lat: number;
  lng: number;
  timestamp: number;
  playbackData: any;
}

const MapRecenter: FC<props> = (props) => {
  const { lat, lng, timestamp, playbackData } = props;
  const map = useMap();
  const { theme } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 17, {
        animate: true,
        duration: 1.0,
      });
    }
  }, [lat, lng, timestamp, map]);

  useEffect(() => {
    if (playbackData?.length > 1) {
      map.flyToBounds(playbackData, {
        animate: true,
        duration: 1.0,
        maxZoom:18
      });
    }
  }, [playbackData]);

  const handleCenter = () => {
    map.flyTo([lat, lng], 17, {
      animate: true,
      duration: 1.0,
    });
  };

  return (
    <section className="bg-[var(--button)] rounded-md p-[3px] cursor-pointer absolute top-[115px] right-3 z-[999]">
      <img
        onClick={handleCenter}
        src={theme === "dark" ? recenter_dark : recenter}
        alt=""
        className="w-4"
      />
    </section>
  );
};

export default MapRecenter;
