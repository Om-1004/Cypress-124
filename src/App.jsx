import Header from "./components/Header";
import HeroSection from "./components/HeroSection.jsx";
import Map from "./components/Map.jsx";

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <Header />
      <HeroSection />
      <Map />
    </h1>
  );
}