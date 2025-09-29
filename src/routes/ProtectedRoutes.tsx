
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = true;
  if (auth) return <Navigate to={"/"} replace />;
  return <Outlet />;
};

export default ProtectedRoutes;
