import { Outlet } from "react-router-dom";
import { MobileSidebar, Sidebar } from "../components/partials/Sidebar";
import useTheme from "../hooks/useTheme";
import { Suspense, useEffect } from "react";
import usertracker from "../features/mqtt";
import { useSelector } from "react-redux";

const Layout = () => {
  const [] = useTheme();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    usertracker(user);
  }, []);

  return (
    <div className="w-[100dvw] h-[100dvh] md:w-screen md:h-screen flex flex-col sm:flex-row bg-[--background] overflow-y-auto">
      <div className="hidden sm:block sticky top-0 h-full">
        <Sidebar />
      </div>
      <div className="block sm:hidden relative">
        <MobileSidebar />
      </div>
      <div className="w-[100vw] h-[100vh] bg-[var(--background)] relative">
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-center">
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
