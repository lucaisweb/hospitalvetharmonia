import { useRef, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
} from "framer-motion";
import logoFull from "@/assets/logo-full.png";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#unidades", label: "Unidades" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#servicos", label: "Serviços" },
];

/* ── Magnetic CTA — isolated to avoid parent re-renders ── */
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
      href="tel:08131267555"
      style={{
        x: sx,
        y: sy,
        background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 50%) 100%)",
        boxShadow: "0 4px 16px -4px hsla(12, 76%, 56%, 0.5)",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
    >
      <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
      Emergência 24h
    </motion.a>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 60);
    setHidden(latest > prev && latest > 200);
    if (open && latest > 100) setOpen(false);
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
              : "hsla(170, 35%, 8%, 0.40)",
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
            className="px-6 flex items-center justify-between"
            style={{ height: isScrolled ? "58px" : "66px", transition: "height 0.3s ease" }}
          >
            {/* Logo */}
            <motion.a
              href="#"
              animate={{ scale: isScrolled ? 0.93 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={logoFull}
                alt="Hospital Veterinário Harmonia"
                className="h-8 brightness-0 invert"
              />
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-white/50 transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              ))}
              <MagneticCta />
            </div>

            {/* Mobile toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="md:hidden text-white p-1.5"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-6 h-6" />
                  </motion.span>
                ) : (
                  <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden max-w-6xl mx-auto mt-1 rounded-2xl border"
              style={{
                background: "hsla(170, 35%, 8%, 0.97)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                  hidden: {},
                }}
                className="px-6 py-5 flex flex-col gap-1"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
                    }}
                    onClick={() => setOpen(false)}
                    className="py-3 text-white/75 hover:text-white font-medium border-b border-white/5 last:border-0 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="tel:08131267555"
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
                  }}
                  className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 50%) 100%)" }}
                  onClick={() => setOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  Emergência 24h
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
