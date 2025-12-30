import ReportForm from "../../components/ui/ReportForm";
import { userColumns, type User } from "../../functions/columns";

const Parking = () => {
  const data: User[] = Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: "User " + (i + 1),
    age: 20 + (i % 30),
    email: `user${i + 1}@mail.com`,
  }));

  return (
    <div className="w-full h-full p-8 flex flex-col gap-3 justify-start items-start text-[var(--text)] relative overflow-y-auto overflow-x-hidden">
      <p className="font-semibold text-lg ">Travel Report</p>
      <ReportForm />
      {/* <DataTable<User>
        data={data}
        columns={userColumns}
        height={550}
        searchable
      /> */}
    </div>
  );
};

export default Parking;
