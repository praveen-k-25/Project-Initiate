import { Outlet } from "react-router-dom";
import Sidebar from "../components/partials/Sidebar";

const Layout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex relative bg-[--background]">
      <div className="sticky top-0 h-full">
        <Sidebar />
      </div>
      <div className="flex-1 bg-[var(--background)]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
