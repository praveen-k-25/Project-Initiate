import { Outlet } from "react-router-dom";
import { MobileSidebar, Sidebar } from "../components/partials/Sidebar";

const Layout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col sm:flex-row relative bg-[--background]">
      <div className="hidden sm:block sticky top-0 h-full z-0">
        <Sidebar />
      </div>
      <div className="block sm:hidden z-0">
        <MobileSidebar />
      </div>
      <div className="flex-1 bg-[var(--background)]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
