import type { FC } from "react";
import type { vehicleCardProps } from "../../typesTs/dashboard";
import dropdown from "../../assets/svgs/dropdown.svg";
import dropdown_dark from "../../assets/svgs/dropdown-dark.svg";
import { Search } from "lucide-react";

const VehicleCard: FC<vehicleCardProps> = (props) => {
  const { isOpen, changeOpen, theme } = props;
  return (
    <div
      className={`relative h-full transition-[width] duration-300 ease-in-out ${isOpen ? "mr-[2px] w-[290px] sm:w-[320px]" : "w-0"} flex flex-col justify-center items-center bg-[var(--button-sec)] rounded-md`}
    >
      <button
        className={`rounded-md p-[7px] w-[30px] h-[40px] bg-[var(--button)] border-[var(--border)] flex justify-center items-center absolute top-2 right-2 transition-all duration-300 ease-in-out ${!isOpen && "translate-x-[42px] -translate-y-1"} z-[9990] shadow-[0_0_3px_0_#7F7F7F]`}
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

        <section className=""></section>
      </div>
    </div>
  );
};

export default VehicleCard;
