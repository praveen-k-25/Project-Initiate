import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { CheckboxOption, CountValueContainer } from "./CheckboxOptions";
import { useEffect, useRef, useState, type FC } from "react";
import type { ReportFormProps } from "../../typesTs/lib";
import pdfImage from "../../assets/svgs/pdf.svg";
import excelImage from "../../assets/svgs/xls.svg";

const ReportForm: FC<ReportFormProps> = (props) => {
  const {} = props;
  const isMulti = false;
  const [visibleDownloadList, setVisibleDownloadList] =
    useState<boolean>(false);
  const downloadRef = useRef<HTMLFieldSetElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (downloadRef.current && !downloadRef.current.contains(event?.target))
        setVisibleDownloadList(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
    <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-2">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="vehicle-select" className="text-sm pl-2">
            Vehicles <span className="font-extralight text-red-500">*</span>
          </label>
          {isMulti ? (
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
          ) : (
            <Select
              options={options}
              id="vehicle-select"
              className=""
              classNamePrefix="rs"
              onChange={(vehicles) => console.log(vehicles)}
              placeholder="Select Vehicles..."
            />
          )}
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
            className="outline-none font-medium text-xs p-[10px] px-4 text-[var(--text)] rounded-md bg-[var(--button-primary)] focus:shadow-[0_0_1px_2px_var(--box-shadow)]"
          />
        </fieldset>
      </section>

      <section className="flex gap-3">
        <fieldset ref={downloadRef} className="relative flex flex-col gap-1">
          <label htmlFor="export-select" className="text-sm pl-2">
            Exports <span className="font-extralight text-red-500">*</span>
          </label>
          <section
            onClick={() => setVisibleDownloadList(true)}
            className={`p-2 px-4 text-sm rounded-md bg-[var(--button-primary)] cursor-pointer ${visibleDownloadList && "shadow-[0_0_1px_2px_var(--box-shadow)]"}`}
          >
            Download
          </section>
          <ul
            className={`absolute w-[130%] top-16 right-0 transition-all duration-300 ${visibleDownloadList ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 -z-10"} outline-none font-medium text-xs p-1 text-[var(--text)] rounded-md bg-[var(--button-primary)] `}
          >
            <li className="p-2 rounded-md hover:bg-[#2323] flex justify-start items-center gap-1 flex-nowrap cursor-pointer">
              <img src={pdfImage} alt="" className="w-5" />
              PDF
            </li>
            <li className="p-2 rounded-md hover:bg-[#2323] flex justify-start items-center gap-1 flex-nowrap cursor-pointer">
              <img src={excelImage} alt="" className="w-5" />
              Xlsx
            </li>
          </ul>
        </fieldset>
        <fieldset className="flex flex-col justify-end">
          <button className="p-2 text-sm px-8 bg-[var(--primary)] text-[#fff] rounded-md">
            Submit
          </button>
        </fieldset>
      </section>
    </div>
  );
};

export default ReportForm;
