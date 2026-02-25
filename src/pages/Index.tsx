import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ValueProps from "@/components/landing/ValueProps";
import UnitsSection from "@/components/landing/UnitsSection";
import SpecialtiesSection from "@/components/landing/SpecialtiesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div id="sobre">
        <ValueProps />
      </div>
      <div id="unidades">
        <UnitsSection />
      </div>
      <div id="especialidades">
        <SpecialtiesSection />
      </div>
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
