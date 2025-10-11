import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/Layout";
import Analytics from "./pages/Analytics";
import Tracking from "./pages/Tracking";
import Settings from "./pages/Settings";
import Parking from "./pages/reports/Parking";
import Playback from "./pages/reports/Playback";
import Inactive from "./pages/reports/Inactive";

export default function App() {
  console.log(window.matchMedia("(prefers-colr-scheme: dark)"));
  return (
    <div className="font-geist">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/parking" element={<Parking />} />
            <Route path="/playback" element={<Playback />} />
            <Route path="/inactive" element={<Inactive />} />
            <Route path="/notfound" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
