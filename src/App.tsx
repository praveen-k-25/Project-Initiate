import { Route, Routes } from "react-router-dom";
import "./styles/index.css";
import Login from "./pages/Auth";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import {Toaster} from "react-hot-toast"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/notfound" element={<NotFound />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
