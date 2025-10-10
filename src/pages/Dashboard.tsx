import { useEffect } from "react";
import { useSelector } from "react-redux";
import usertracker from "../features/mqtt";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    usertracker(user);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
