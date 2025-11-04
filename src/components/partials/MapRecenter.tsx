import { useEffect, type FC } from "react";
import { useMap } from "react-leaflet";
import recenter from "../../assets/svgs/recenter.svg";
import recenter_dark from "../../assets/svgs/recenter-dark.svg";
import { useSelector } from "react-redux";

interface props {
  vehicleStatus: any;
  selectedVehicle: any;
}

const MapRecenter: FC<props> = (props) => {
  const { vehicleStatus, selectedVehicle } = props;
  const map = useMap();
  const { theme } = useSelector((state: any) => state.auth);

  /*   useEffect(() => {
    if (playbackData?.length > 1) {
      map.flyToBounds(playbackData, {
        animate: true,
        duration: 1.0,
        maxZoom: 18,
      });
    }
  }, [playbackData]); */

  const handleCenter = () => {
    if (selectedVehicle) {
      console.log("selectedVehicle", selectedVehicle);
      map.flyTo([selectedVehicle.lat, selectedVehicle.lng], 17, {
        animate: true,
        duration: 1.0,
      });
    } else {
      let data = vehicleStatus.map((item: any) => [item.lat, item.lng]);
      data.length > 0 &&
        map.flyToBounds(data, {
          animate: true,
          duration: 1.0,
        });
    }
  };

  useEffect(() => {
    handleCenter();
  }, [selectedVehicle, vehicleStatus]);

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
