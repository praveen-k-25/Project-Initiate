import { Outlet } from "react-router-dom";
import { MobileSidebar, Sidebar } from "../components/partials/Sidebar";
import useTheme from "../hooks/useTheme";

const Layout = () => {
  const [] = useTheme();
  return (
    <div className="w-screen h-screen flex flex-col sm:flex-row bg-[--background] overflow-y-auto">
      <div className="hidden sm:block sticky top-0 h-full">
        <Sidebar />
      </div>
      <div className="block sm:hidden relative">
        <MobileSidebar />
      </div>  
      <div className="flex-1 h-screen bg-[var(--background)] relative overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
