import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Phone } from "lucide-react";
import logoFull from "@/assets/logo-full.png";
import { useLeadCapture } from "@/components/landing/conversion/LeadCaptureDialog";

/* ── Magnetic CTA que abre o modal ── */
const MagneticCta = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  const { open } = useLeadCapture();

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => open({ intent: "urgencia", preselectMotivo: "Urgência / Emergência" })}
      style={{
        x: sx,
        y: sy,
        background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 50%) 100%)",
        boxShadow: "0 4px 16px -4px hsla(12, 76%, 56%, 0.5)",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-bold text-white whitespace-nowrap"
    >
      <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
      <span className="hidden sm:inline">Urgência 24h</span>
      <span className="sm:hidden">Urgência</span>
    </motion.button>
  );
};

const ConversionNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 40);
    setHidden(latest > prev && latest > 200);
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-120%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="px-4 pt-4">
        <motion.div
          animate={{
            backgroundColor: isScrolled ? "hsla(170, 35%, 8%, 0.94)" : "hsla(170, 35%, 8%, 0.35)",
            borderColor: isScrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)",
          }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto rounded-2xl border"
          style={{ backdropFilter: "blur(20px)", boxShadow: isScrolled ? "0 8px 32px -8px rgba(0,0,0,0.4)" : "none" }}
        >
          <motion.div
            animate={{ height: isScrolled ? 58 : 66 }}
            transition={{ duration: 0.3 }}
            className="px-5 md:px-6 flex items-center justify-between"
          >
            <motion.a
              href="#topo"
              animate={{ scale: isScrolled ? 0.93 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <img src={logoFull} alt="Hospital Veterinário Harmonia" className="h-7 md:h-8 brightness-0 invert" />
              <div className="hidden sm:block leading-tight">
                <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "hsl(155 83% 55%)" }}>Hospital Veterinário</p>
                <p className="text-sm font-bold tracking-tight text-white leading-none">Harmonia</p>
              </div>
            </motion.a>

            <MagneticCta />
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default ConversionNav;
