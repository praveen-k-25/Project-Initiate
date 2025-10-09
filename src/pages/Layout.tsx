import { Outlet } from "react-router-dom";
import Sidebar from "../components/partials/Sidebar";

const Layout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex relative">
      <div className="sticky top-0 h-full">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
