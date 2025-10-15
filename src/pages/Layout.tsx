import { Outlet } from "react-router-dom";
import { MobileSidebar, Sidebar } from "../components/partials/Sidebar";
import useTheme from "../hooks/useTheme";

const Layout = () => {
  const [] = useTheme();

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col sm:flex-row relative bg-[--background]">
      <div className="hidden sm:block sticky top-0 h-full">
        <Sidebar />
      </div>
      <div className="block sm:hidden relative">
        <MobileSidebar />
      </div>
      <div className="flex-1 bg-[var(--background)] relative">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
