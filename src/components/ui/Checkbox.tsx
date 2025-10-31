import { type FC } from "react";
import checkbox_check from "../../assets/svgs/tick.svg";
import type { CheckboxProps } from "../../typesTs/lib";

const Checkbox: FC<CheckboxProps> = (props) => {
  const { checked = false, color, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`border rounded-sm flex justify-center items-center ${checked ? `${color}` : "dark:border-[#787878] border-[#9f9e9e]"}  `}
    >
      <img
        src={checkbox_check}
        alt=""
        className={`w-[12px] mb-[1px] ${checked ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default Checkbox;
