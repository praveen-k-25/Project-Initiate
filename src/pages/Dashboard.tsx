import React, { useEffect } from "react";
import { usertracker } from "../features/mqtt";

const Dashboard = () => {
  useEffect(() => {
    usertracker();
  }, []);
  return <div className=""></div>;
};

export default Dashboard;
