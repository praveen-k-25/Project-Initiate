import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { CheckboxOption, CountValueContainer } from "./CheckboxOptions";

const ReportForm = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "mango", label: "Mango" },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      <fieldset className="flex flex-col gap-1">
        <label htmlFor="vehicle-select" className="text-sm pl-2">
          Vehicles <span className="font-extralight text-red-500">*</span>
        </label>
        <Select
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          options={options}
          id="vehicle-select"
          className=""
          classNamePrefix="rs"
          onChange={(vehicles) => console.log(vehicles)}
          components={{
            Option: CheckboxOption,
            ValueContainer: CountValueContainer,
          }}
          placeholder="Select Vehicles..."
        />
      </fieldset>

      {/* Start Date for report */}
      <fieldset className="flex flex-col gap-1">
        <label htmlFor="start-date" className="text-sm pl-2">
          Start Date <span className="font-extralight text-red-500">*</span>
        </label>
        <Flatpickr
          id="start-date"
          value={new Date()}
          options={{ dateFormat: "Y-m-d" }}
          onChange={(selectedDates: Date[]) => console.log(selectedDates)}
          className="outline-none font-medium text-xs p-[10px] px-4 text-[var(--text)] rounded-md bg-[var(--button-primary)] focus:shadow-[0_0_1px_2px_var(--box-shadow)]"
        />
      </fieldset>

      {/* End date for report */}
      <fieldset className="flex flex-col gap-1">
        <label htmlFor="end-date" className="text-sm pl-2">
          End Date <span className="font-extralight text-red-500">*</span>
        </label>
        <Flatpickr
          id="end-date"
          value={new Date()}
          options={{ dateFormat: "Y-m-d" }}
          onChange={(selectedDates: Date[]) => console.log(selectedDates)}
          className=" outline-none font-medium text-xs p-[10px] px-4 text-[var(--text)] rounded-md bg-[var(--button-primary)] focus:shadow-[0_0_1px_2px_var(--box-shadow)]"
        />
      </fieldset>
    </div>
  );
};

export default ReportForm;
