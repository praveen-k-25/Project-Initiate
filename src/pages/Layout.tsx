import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <div className="w-[5vw] bg-red-500"></div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
