import { Route, Routes } from "react-router";
import Mailing from "../Views/Client/Mailing";
import Promotion from "../Views/Client/Promotion";
import Scanner from "../Views/Client/Scanner";
import Analytics from "../Views/Data/Analytics";
import Dashboard from "../Views/Home/Dashboard";
import GeneralSettings from "../Views/Settings/GeneralSettings";

export default function Body() {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/mailing" element={<Mailing />} />
        <Route path="/scan" element={<Scanner />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/settings" element={<GeneralSettings />} />
      </Routes>
    </div>
  );
}
