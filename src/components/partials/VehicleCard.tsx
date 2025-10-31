import type { FC } from "react";
import type { vehicleCardProps } from "../../typesTs/dashboard";
import dropdown from "../../assets/svgs/dropdown.svg";
import dropdown_dark from "../../assets/svgs/dropdown-dark.svg";

const VehicleCard: FC<vehicleCardProps> = (props) => {
  const { isOpen, changeOpen, theme } = props;
  return (
    <div
      className={`relative h-full transition-[width] duration-300 ease-in-out ${isOpen ? "w-[290px] sm:w-[320px]" : "w-0"} flex justify-center items-center bg-white rounded-md`}
    >
      <button
        className={`rounded-md p-[7px] w-[30px] h-[40px] bg-[var(--button)] border-[var(--border)] flex justify-center items-center absolute top-1 right-2 transition-all duration-300 ease-in-out ${!isOpen && "translate-x-[40px]"} z-[9999] shadow-[0_0_3px_0_#7F7F7F]`}
        type="button"
        onClick={changeOpen}
      >
        <img
          src={theme === "light" ? dropdown : dropdown_dark}
          alt="open vehicle card"
          aria-label="open vehicle card"
          className={`transition-all delay-100 duration-300 ease-in-out w-4 ${isOpen ? "rotate-90" : "-rotate-90"}`}
        />
      </button>
    </div>
  );
};

export default VehicleCard;
