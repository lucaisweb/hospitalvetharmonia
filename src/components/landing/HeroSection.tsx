import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      {/* Marca d'água */}
      <img
        src={simboloHarmonia}
        alt=""
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] object-contain pointer-events-none select-none brightness-0 invert"
        style={{ opacity: 0.07 }} />
      

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm font-medium mb-6 backdrop-blur-sm">
              🐾 Atendimento 24 horas • Recife, PE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            
            Há mais de 30 anos referência em{" "}
            <span className="font-bold text-green-300">Medicina Veterinária</span>{" "}
            no Brasil.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/75 mb-10 max-w-2xl leading-relaxed">
            
            Cuidado, respeito e excelência em cada atendimento. 
          
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center">
            
            <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/40">
              <Phone className="mr-2 h-5 w-5" />
              Falar com Emergência 24h
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        

        
      </div>
    </section>);

};

export default HeroSection;