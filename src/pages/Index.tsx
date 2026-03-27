import { useEffect, useRef } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ValueProps from "@/components/landing/ValueProps";
import SpecialtiesSection from "@/components/landing/SpecialtiesSection";
import UnitsSection from "@/components/landing/UnitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/landing/Footer";
import PrideSection from "@/components/landing/PrideSection";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

/* ── Cursor glow: isolated RAF loop, zero React re-renders ── */
const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -400, y: -400 });
  const target = useRef({ x: -400, y: -400 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX - 200, y: e.clientY - 200 };
    };
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.07;
      pos.current.y += (target.current.y - pos.current.y) * 0.07;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed pointer-events-none select-none z-0 w-[400px] h-[400px] rounded-full"
      style={{
        top: 0,
        left: 0,
        willChange: "transform",
        background:
          "radial-gradient(circle, hsl(155 83% 40% / 0.07) 0%, transparent 70%)",
      }}
    />
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
        style={{
          scaleX,
          background: "hsl(155 83% 45%)",
        }}
      />

      {/* Cursor ambient glow */}
      <CursorGlow />

      {/* Global watermark */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 flex items-center justify-center">
        <img
          src={simboloHarmonia}
          alt=""
          className="w-[600px] h-[600px] object-contain opacity-[0.02]"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <div id="unidades">
          <UnitsSection />
        </div>
        <div id="sobre">
          <ValueProps />
        </div>
        <div id="especialidades">
          <SpecialtiesSection />
        </div>
        <div id="servicos">
          <ServicesSection />
        </div>
        <TestimonialsSection />
        <PrideSection />
        <Footer />
      </div>

      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
