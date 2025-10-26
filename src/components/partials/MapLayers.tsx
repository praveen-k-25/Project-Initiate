import { useSelector } from "react-redux";
import layers from "../../assets/svgs/layers.svg";
import layersDark from "../../assets/svgs/layers-dark.svg";
import type { maplayersProps } from "../../typesTs/dashboard";
import { useEffect, useRef, useState, type FC } from "react";
import street from "../../assets/pngs/street.png";
import osm from "../../assets/pngs/osm.png";
import hybrid from "../../assets/pngs/hybrid.png";

const MapLayers: FC<maplayersProps> = (props) => {
  const { handleLayers } = props;
  const [layersOpen, setLayersOpen] = useState<boolean>(false);
  const outsideClick = useRef<HTMLDivElement | null>(null);
  const { theme } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        outsideClick.current &&
        !outsideClick.current.contains(event?.target)
      ) {
        setLayersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMapChange = (map: string) => {
    handleLayers(map);
    setLayersOpen(false);
  };

  return (
    <div
      ref={outsideClick}
      className=" border-1 border-[var(--border)] bg-[var(--button)] absolute top-1 right-1 z-[999] rounded- p-2 rounded-md cursor-pointer shadow-[0_0_1px_0_#fff]"
    >
      <img
        onClick={() => setLayersOpen(true)}
        src={theme === "dark" ? layersDark : layers}
        alt=""
        className="w-5"
      />
      <div className="relative">
        <div
          className={`absolute w-[40px] right-8 -top-7 ${layersOpen ? "flex" : "hidden"}  flex-col gap-2 p-[6px] rounded-md bg-[var(--button)] `}
        >
          <img
            onClick={() => handleMapChange("street")}
            src={street}
            alt=""
            className="w-7 h-7 shadow-[0_0_2px_0_#fff] dark:shadow-[0_0_2px_0_#000] rounded-md"
          />
          <img
            onClick={() => handleMapChange("osm")}
            src={osm}
            alt=""
            className="w-7 h-7 shadow-[0_0_2px_0_#fff] dark:shadow-[0_0_2px_0_#000] rounded-md"
          />
          <img
            onClick={() => handleMapChange("hybrid")}
            src={hybrid}
            alt=""
            className="w-7 h-7 shadow-[0_0_2px_0_#fff] dark:shadow-[0_0_2px_0_#000] rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MapLayers;
