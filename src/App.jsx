import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 

import Header from "./components/Header";
import HeroSection from "./components/HeroSection.jsx";
import Map from "./components/Map.jsx";
import CreateReport from "./components/CreateReport.jsx";
import Login from "./Login.jsx";
import SignUp from "./components/SignUp.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; 

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} /> 
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/map" element={
          <ProtectedRoute>
            <Map />
          </ProtectedRoute>
        } />
        <Route path="/createReport" element={
          <ProtectedRoute>
            <CreateReport />
          </ProtectedRoute>
        } />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
