import React from "react";
import "./index.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";

function LandingPage() {
  return (
    <div className="relative">
      <NavBar />
      <Hero />
      <div className="h-[5rem]"></div>
      <InfoSection />
    </div>
  );
}

export default LandingPage;
