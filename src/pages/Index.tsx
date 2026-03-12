import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ValueProps from "@/components/landing/ValueProps";
import SpecialtiesSection from "@/components/landing/SpecialtiesSection";
import UnitsSection from "@/components/landing/UnitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/landing/Footer";
import WaveDivider from "@/components/landing/WaveDivider";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

const bg = "hsl(40, 33%, 97%)";
const primary = "hsl(155, 83%, 30%)";
const secondary = "hsl(40, 30%, 92%)";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Marca d'água global */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 flex items-center justify-center">
        <img
          src={simboloHarmonia}
          alt=""
          className="w-[600px] h-[600px] object-contain opacity-[0.03]"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <WaveDivider topColor={primary} bottomColor={bg} variant={1} />
        <div id="unidades">
          <UnitsSection />
        </div>
        <WaveDivider topColor={bg} bottomColor={bg} variant={2} />
        <div id="sobre">
          <ValueProps />
        </div>
        <WaveDivider topColor={bg} bottomColor={bg} variant={3} />
        <SpecialtiesSection />
        <WaveDivider topColor={bg} bottomColor={secondary} variant={1} />
        <div id="servicos">
          <ServicesSection />
        </div>
        <WaveDivider topColor={secondary} bottomColor={secondary} variant={2} />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
