import {Route, Routes} from "react-router-dom";
import "./styles/index.css";
import Login from "./pages/Auth";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import {Toaster} from "react-hot-toast";
import Layout from "./pages/Layout";

export default function App() {
  console.log(window.matchMedia("(prefers-colr-scheme: dark)"));
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notfound" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
