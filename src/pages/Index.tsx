import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ValueProps from "@/components/landing/ValueProps";
import SpecialtiesSection from "@/components/landing/SpecialtiesSection";
import UnitsSection from "@/components/landing/UnitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/landing/Footer";
import PrideSection from "@/components/landing/PrideSection";
import WaveDivider from "@/components/landing/WaveDivider";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

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

        {/* Hero (green) → Units (olive) */}
        <WaveDivider topColor="hsl(160, 56%, 35%)" bottomColor="hsl(80, 25%, 85%)" />

        <div id="unidades">
          <UnitsSection />
        </div>

        {/* Units (olive) → ValueProps (background) */}
        <WaveDivider topColor="hsl(80, 25%, 85%)" bottomColor="hsl(40, 33%, 97%)" flip />

        <div id="sobre">
          <ValueProps />
        </div>

        {/* ValueProps (background) → Specialties (background) */}
        <WaveDivider topColor="hsl(40, 33%, 97%)" bottomColor="hsl(40, 33%, 97%)" />

        <SpecialtiesSection />

        {/* Specialties (background) → Services (warm) */}
        <WaveDivider topColor="hsl(40, 33%, 97%)" bottomColor="hsl(40, 30%, 95%)" flip />

        <div id="servicos">
          <ServicesSection />
        </div>

        {/* Services (warm) → Testimonials (warm) */}
        <WaveDivider topColor="hsl(40, 30%, 95%)" bottomColor="hsl(40, 30%, 95%)" />

        <TestimonialsSection />

        {/* Testimonials (warm) → Pride (dark green) */}
        <WaveDivider topColor="hsl(40, 30%, 95%)" bottomColor="hsl(160, 56%, 18%)" flip />

        <PrideSection />

        {/* Pride (dark green) → Footer (dark) */}
        <WaveDivider topColor="hsl(160, 56%, 18%)" bottomColor="hsl(170, 30%, 15%)" />

        <Footer />
      </div>
    </div>
  );
};

export default Index;
