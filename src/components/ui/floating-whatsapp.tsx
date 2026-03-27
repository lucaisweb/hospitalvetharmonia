import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=558131267555&text=Ol%C3%A1!%20vim%20pelo%20site%20e%20tenho%20interesse%20nos%20servi%C3%A7os%20do%20hospital";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8, x: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="bg-white rounded-2xl px-4 py-3 shadow-xl border border-border/60 text-sm mr-1 mb-1"
          >
            <p className="font-semibold text-foreground whitespace-nowrap">Fale conosco</p>
            <p className="text-muted-foreground text-xs mt-0.5 whitespace-nowrap">
              Atendimento rápido pelo WhatsApp
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-border/60 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative w-14 h-14 flex items-center justify-center rounded-full shadow-lg shadow-green-500/30 cursor-pointer"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-pulse-ring"
          style={{ backgroundColor: "#25D366" }}
        />
        <MessageCircle className="w-7 h-7 text-white relative z-10" strokeWidth={1.5} fill="white" />
      </motion.a>
    </motion.div>
  );
}
