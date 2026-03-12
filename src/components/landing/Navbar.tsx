import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoFull from "@/assets/logo-full.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src={logoFull} alt="Hospital Veterinário Harmonia" className="h-10 brightness-0 invert" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#sobre" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Sobre</a>
          <a href="#unidades" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Unidades</a>
          <a href="#especialidades" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Especialidades</a>
          <Button variant="hero" size="sm" className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/40">
            <Phone className="w-4 h-4 mr-1" /> Emergência 24h
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="#sobre" className="text-primary-foreground/70 hover:text-primary-foreground">Sobre</a>
              <a href="#unidades" className="text-primary-foreground/70 hover:text-primary-foreground">Unidades</a>
              <a href="#especialidades" className="text-primary-foreground/70 hover:text-primary-foreground">Especialidades</a>
              <Button variant="hero" size="sm" className="rounded-full w-fit bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/40">
                <Phone className="w-4 h-4 mr-1" /> Emergência 24h
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
