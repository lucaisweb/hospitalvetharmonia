import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Phone } from "lucide-react";
import logoFull from "@/assets/logo-full.png";

const TEL_EMERGENCY = "tel:558131267555";

/**
 * Navbar minimal para a LP de conversão.
 * Sem links de navegação — apenas logo + CTA de urgência.
 * O objetivo é não distrair o usuário do formulário.
 */
const ConversionNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="px-4 pt-4">
        <motion.div
          animate={{
            backgroundColor: isScrolled
              ? "hsla(170, 35%, 8%, 0.94)"
              : "hsla(170, 35%, 8%, 0.35)",
            borderColor: isScrolled
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.05)",
          }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto rounded-2xl border"
          style={{
            backdropFilter: "blur(20px)",
            boxShadow: isScrolled ? "0 8px 32px -8px rgba(0,0,0,0.4)" : "none",
          }}
        >
          <div
            className="px-5 md:px-6 flex items-center justify-between"
            style={{ height: "62px" }}
          >
            <div className="flex items-center gap-3">
              <img
                src={logoFull}
                alt="Hospital Veterinário Harmonia"
                className="h-7 md:h-8 brightness-0 invert"
              />
              <div className="hidden sm:block leading-tight">
                <p
                  className="text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: "hsl(155 83% 55%)" }}
                >
                  Hospital Veterinário
                </p>
                <p className="text-sm font-bold tracking-tight text-white leading-none">
                  Harmonia
                </p>
              </div>
            </div>

            <a
              href={TEL_EMERGENCY}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold text-white whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 50%) 100%)",
                boxShadow: "0 6px 18px -6px hsla(12, 76%, 56%, 0.55)",
              }}
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="hidden sm:inline">Ligar agora</span>
              <span className="sm:hidden">Ligar</span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default ConversionNav;
