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

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Marca d'água global */}
      <div
        className="fixed inset-0 pointer-events-none select-none z-0 flex items-center justify-center"
      >
        <img
          src={simboloHarmonia}
          alt=""
          className="w-[600px] h-[600px] object-contain opacity-[0.03]"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <WaveDivider fillColor="hsl(var(--background))" bgColor="hsl(var(--primary))" />
        <div id="unidades">
          <UnitsSection />
        </div>
        <WaveDivider fillColor="hsl(var(--background))" bgColor="hsl(var(--background))" flip />
        <div id="sobre">
          <ValueProps />
        </div>
        <WaveDivider fillColor="hsl(var(--background))" bgColor="hsl(var(--background))" />
        <SpecialtiesSection />
        <WaveDivider fillColor="hsl(var(--background))" bgColor="hsl(var(--background))" flip />
        <div id="servicos">
          <ServicesSection />
        </div>
        <WaveDivider fillColor="hsl(var(--background))" bgColor="hsl(var(--background))" />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
