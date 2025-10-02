import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { rootState } from "../store/store";

const ProtectedRoutes = () => {
  const auth = useSelector((state: rootState) => state.auth);
  
  if (!auth.auth) return <Navigate to={"/"} replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
