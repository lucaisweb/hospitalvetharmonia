import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ValueProps from "@/components/landing/ValueProps";
import UnitsSection from "@/components/landing/UnitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div id="unidades">
        <UnitsSection />
      </div>
      <div id="sobre">
        <ValueProps />
      </div>
      <div id="servicos">
        <ServicesSection />
      </div>
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
