import { useSelector } from "react-redux";
import layers from "../../assets/svgs/layers.svg";
import layersDark from "../../assets/svgs/layers-dark.svg";
import type { maplayersProps } from "../../typesTs/dashboard";
import type { FC } from "react";

const MapLayers: FC<maplayersProps> = (props) => {
  const { handleLayers } = props;
  const { theme } = useSelector((state: any) => state.auth);
  //const map = useMap();
  return (
    <div className="border-1 border-[var(--border)] bg-[var(--button)] absolute top-1 right-1 z-[999] rounded-md">
      <img
        src={theme === "dark" ? layersDark : layers}
        alt=""
        className="w-10"
      />
    </div>
  );
};

export default MapLayers;
