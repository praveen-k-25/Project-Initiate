import type { FC } from "react";
import plus from "../../assets/svgs/plus.svg";
import plusDark from "../../assets/svgs/plus-dark.svg";
import minus from "../../assets/svgs/minus.svg";
import minusDark from "../../assets/svgs/minus-dark.svg";
import { useSelector } from "react-redux";
import { useMap } from "react-leaflet";

const ZoomControl: FC = () => {
  const { theme } = useSelector((state: any) => state.auth);
  const map = useMap();
  const handleZoomIn = () => map.zoomIn(1);
  const handleZoomOut = () => map.zoomOut(1);

  return (
    <div className="flex flex-col justify-center items-center gap-[2px] border-1 border-[var(--border)] bg-[var(--button)] absolute top-12 right-2 z-[999] rounded-md">
      <section className="cursor-pointer">
        <img
          onClick={handleZoomIn}
          src={theme === "dark" ? plusDark : plus}
          alt="Zoom in"
          className="w-[26px] p-[6px]"
        />
      </section>
      <section className="w-[15px] border-t border-t-[#e2e1e1] dark:border-t-[#454545]"></section>
      <section className="cursor-pointer">
        <img
          onClick={handleZoomOut}
          src={theme === "dark" ? minusDark : minus}
          alt="Zoom out"
          className="w-[26px] p-[6px]"
        />
      </section>
    </div>
  );
};

export default ZoomControl;
