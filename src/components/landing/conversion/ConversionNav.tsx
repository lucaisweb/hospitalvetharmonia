import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import logoFull from "@/assets/logo-full.png";

const WA_LINK =
  "https://wa.me/558131267555?text=" +
  encodeURIComponent(
    "Olá! Vim pelo site do Hospital Harmonia e gostaria de mais informações.",
  );

/* ── Magnetic CTA — port do Navbar principal ── */
const MagneticCta = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        x: sx,
        y: sy,
        background: "linear-gradient(135deg, hsl(155 83% 40%) 0%, hsl(155 83% 24%) 100%)",
        boxShadow: "0 4px 16px -4px hsla(155, 83%, 40%, 0.55)",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -1 }}
      className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold text-white whitespace-nowrap"
    >
      <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
      </svg>
      <span className="hidden sm:inline">Falar conosco</span>
      <span className="sm:hidden">Falar</span>
    </motion.a>
  );
};

/**
 * Navbar minimal para a LP de conversão.
 * Sem links de navegação — apenas logo + CTA de urgência.
 * O objetivo é não distrair o usuário do formulário.
 */
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
            </motion.a>

            <MagneticCta />
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default ConversionNav;
