import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection.jsx";
import Map from "./components/Map.jsx";
import CreateReport from "./components/CreateReport.jsx";
import Login from "./login.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/map" element={<Map />} />
        <Route path="/createReport" element={<CreateReport />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
