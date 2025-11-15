import ReportForm from "../../components/ui/ReportForm";

const Parking = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 justify-start items-start text-[var(--text)] relative overflow-y-auto overflow-x-hidden">
      <p className="font-semibold text-lg ">Travel Report</p>
      <ReportForm />
    </div>
  );
};

export default Parking;
