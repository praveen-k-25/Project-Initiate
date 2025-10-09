import { useEffect } from "react";
import { useSelector } from "react-redux";
import usertracker from "../features/mqtt";
import loader from "../assets/svgs/loader.svg";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    usertracker(user);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src={loader} alt="" className="w-10" />
    </div>
  );
};

export default Dashboard;
