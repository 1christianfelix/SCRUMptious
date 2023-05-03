import React from "react";
import "./index.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";

function LandingPage() {
  return (
    <div className="relative">
      <NavBar />
      <Hero />
      <div className="h-[5rem]"></div>
      <InfoSection />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default LandingPage;
