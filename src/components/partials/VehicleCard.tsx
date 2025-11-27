import type { FC } from "react";
import type {
  vehicleCardProps,
  vehicleStatusData,
} from "../../typesTs/dashboard";
import dropdown from "../../assets/svgs/dropdown.svg";
import dropdown_dark from "../../assets/svgs/dropdown-dark.svg";
import { Navigation, Pause, Search, ShieldOff } from "lucide-react";
import { useSelector } from "react-redux";
import React from "react";

interface vehicleCardList {
  vehicle: vehicleStatusData;
  handleSelectedVehicle: (data: vehicleStatusData | null) => void;
  selectedVehicle: vehicleStatusData | null;
}

const VehicleCard: FC<vehicleCardProps> = (props) => {
  const { isOpen, changeOpen, theme, handleSelectedVehicle, selectedVehicle } =
    props;
  const { vehicleStatus } = useSelector((state: any) => state.live);

  return (
    <div
      className={`relative h-full transition-[width] duration-300 ease-in-out ${isOpen ? "mr-[2px] w-[290px] sm:w-[320px]" : "w-0"} flex flex-col justify-center items-center bg-[var(--button-sec)] rounded-md`}
    >
      <button
        className={`rounded-md p-[7px] w-[30px] h-[40px] bg-[var(--button)] border-[var(--border)] flex justify-center items-center absolute top-2 right-2 transition-all duration-300 ease-in-out ${!isOpen && "translate-x-[42px] -translate-y-1"} z-[998] shadow-[0_0_3px_0_#7F7F7F]`}
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
      <div className="w-full h-full flex flex-col justify-start gap-2 p-2 overflow-hidden">
        <div className="mr-[35px] p-[2px] rounded-[10px] bg-gradient-to-r from-blue-500 to-pink-600 text-sm bg-[var(--button)]">
          <div className="w-full h-full bg-[var(--button)] rounded-lg flex p-2">
            <label
              htmlFor="vehicle search"
              className="border-r-[1px] border-[#9f9e9e75] border-opacity-50 pr-[6px] mr-[6px]"
            >
              <div className="w-full h-full flex justify-center items-center pb-[2px]">
                {theme === "light" ? (
                  <Search color="#0a0a0a" size={19} strokeWidth={1} />
                ) : (
                  <Search color="#fafafa" size={19} strokeWidth={1} />
                )}
              </div>
            </label>
            <input
              id="vehicle search"
              type="search"
              autoComplete="off"
              placeholder="Search for a vehicle"
              className="flex-1 bg-[var(--button)] outline-none border-none text-[var(--text)] placeholder:text-[var(--text)] placeholder:text-sm placeholder:font-light dark:placeholder:font-extralight placeholder:opacity-90"
            />
          </div>
        </div>

        <section className="flex flex-col gap-2">
          {vehicleStatus.map((vehicle: vehicleStatusData) => (
            <VehiclesList
              key={`vehicleList-${vehicle.user}`}
              vehicle={vehicle}
              handleSelectedVehicle={handleSelectedVehicle}
              selectedVehicle={selectedVehicle}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

const VehiclesList: FC<vehicleCardList> = React.memo(
  function vehicleCard(props) {
    const { vehicle, handleSelectedVehicle, selectedVehicle } = props;

    const handleClick = () => {
      if (!selectedVehicle) {
        handleSelectedVehicle(vehicle);
        return;
      }
      if (selectedVehicle.user === vehicle.user) {
        handleSelectedVehicle(null);
        return;
      }
      handleSelectedVehicle(vehicle);
    };

    return (
      <div
        onClick={handleClick}
        className={`min-w-full overflow-hidden flex flex-col gap-2 p-3 rounded-lg text-[var(--text)] text-xs bg-[var(--button)] border-[var(--border)] ${selectedVehicle?.user === vehicle.user ? "shadow-[0_0_4px_0_#515151] dark:shadow-[0_0_4px_0_#EEEEEE]" : "shadow-[0_0_2px_0_#515151] dark:shadow-[0_0_2px_0_#EEEEEE]"}`}
      >
        <section className="w-full flex justify-between items-center whitespace-nowrap">
          <fieldset className="flex gap-5 items-center">
            {vehicle.status === 1 ? (
              <Navigation
                color="#2B60F0"
                fill="#2B60F0"
                size={22}
                strokeWidth={1}
                className="ml-2 -rotate-90"
              />
            ) : vehicle.status === 2 ? (
              <Pause
                color="#EBD700"
                fill="#EBD700"
                size={24}
                strokeWidth={1}
                className="ml-2"
              />
            ) : (
              <ShieldOff
                color="#5B5B5B"
                fill="#5B5B5B"
                size={28}
                strokeWidth={1}
                className="ml-1"
              />
            )}
            <div className="flex flex-col ">
              <span className="">{vehicle.username}</span>
              <span className="text-[10px]">#{vehicle.user.slice(0, 8)}</span>
            </div>
          </fieldset>
          <p
            className={`p-1 rounded-md text-[10px] flex gap-[6px] items-center px-2 ${
              vehicle.status === 1
                ? "shadow-[0_0_3px_0_#9BB4F8]"
                : vehicle.status === 2
                  ? "shadow-[0_0_3px_0_#EBD700]"
                  : "shadow-[0_0_3px_0_#5B5B5B]"
            }`}
          >
            {vehicle.status === 1
              ? "Moving"
              : vehicle.status === 2
                ? "Idle"
                : "Inactive"}
          </p>
        </section>
        <section className="text-[10px] flex justify-between items-center whitespace-nowrap">
          <fieldset className="">
            <p className="">Last Update :</p>
            <p className="">{vehicle.time}</p>
          </fieldset>
          <div className="flex gap-1">
            <fieldset className="">
              <p className="flex flex-row justify-center items-center gap-1">
                <span className="p-[3px] rounded-full bg-white"></span> Lat
              </p>
              <p className="">{vehicle.lat}</p>
            </fieldset>
            <fieldset className="">
              <p className="flex flex-row justify-center items-center gap-1 ">
                <span className="p-[3px] shadow-[0_0_3px_0_#7F7F7F] rounded-full bg-black"></span>{" "}
                Lng
              </p>
              <p className="">{vehicle.lng}</p>
            </fieldset>
          </div>
        </section>
        <section className="flex flex-row justify-between items-center whitespace-nowrap gap-2 ">
          <fieldset className="w-[55px] flex flex-col items-start justify-start">
            <p className="text-[11px]">Speed :</p>
            <p className="">
              {vehicle.speed} <span className="text-[10px]">km/h</span>{" "}
            </p>
          </fieldset>
          <div className="relative h-full flex-1 p-[2px] bg-transparent overflow-hidden">
            <div
              className={`transition-[width] duration-300 ease-in absolute z-10 inset-0 h-full bg-gradient-to-r ${vehicle.status === 1 ? "from-indigo-400 from-10% via-sky-500 via-30% to-emerald-500 to-90%" : vehicle.status === 2 ? "from-gray-100 via-yellow-200 to-yellow-500" : "from-gray-100 via-gray-300 to-gray-600"}`}
              style={{
                width: vehicle.status === 1 ? `${vehicle.speed}%` : "100%",
                WebkitMaskImage: "linear-gradient(#000 0 0)", // fallback mask
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                maskImage: `repeating-linear-gradient(
                              to right,
                              #000 0 3px,
                              transparent 3px 6px
                            )`,
                maskRepeat: "repeat",
                maskSize: "repeat",
                maskPosition: "center",
              }}
            ></div>
            <div
              className="absolute z-0 inset-0 w-full h-full bg-gray-100"
              style={{
                WebkitMaskImage: "linear-gradient(#000 0 0)", // fallback mask
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                maskImage: `repeating-linear-gradient(
                            to right,
                            #000 0 3px,
                            transparent 3px 6px
                          )`,
                maskRepeat: "repeat",
                maskSize: "repeat",
                maskPosition: "center",
              }}
            ></div>
          </div>
        </section>
      </div>
    );
  }
);

export default VehicleCard;
