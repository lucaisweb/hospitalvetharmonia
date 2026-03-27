import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import recifeBg from "@/assets/hero-hvh.png";
import logoFull from "@/assets/logo-full.png";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

const stats = [
  { to: 30, suffix: "+", label: "Anos de história" },
  { to: 3, suffix: "", label: "Unidades em Recife" },
  { to: 2000, prefix: "+", suffix: "", label: "Pets cuidados/mês" },
];

const marqueeSpecialties = [
  "Clínica Geral", "Cirurgia", "UTI 24h", "Internação", "Ortopedia",
  "Cardiologia", "Neurologia", "Oncologia", "Dermatologia", "Fisioterapia",
  "Acupuntura", "Oftalmologia", "Diagnóstico por Imagem", "Laboratório Próprio",
  "Banco de Sangue", "Células-Tronco", "Neonatologia", "Vacinação",
];

/* ── Magnetic CTA inside Hero ── */
const HeroCta = ({ href, style: ctaStyle, className, children }: {
  href: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14 });
  const sy = useSpring(y, { stiffness: 200, damping: 14 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy, ...ctaStyle }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const symbolY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.78, 0.93]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ backgroundColor: "hsl(170 35% 8%)" }}
    >
      {/* Background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 will-change-transform">
        <img
          src={recifeBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ minHeight: "120%" }}
        />
        <motion.div
          style={{
            opacity: overlayOpacity,
            background:
              "linear-gradient(115deg, hsl(170 35% 5%) 0%, hsl(170 35% 8% / 0.88) 42%, hsl(155 60% 12% / 0.45) 100%)",
          }}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Floating symbol — right side */}
      <motion.div
        style={{ y: symbolY }}
        className="absolute right-[12%] top-[35%] z-0 will-change-transform hidden lg:block"
      >
        <motion.img
          src={simboloHarmonia}
          alt=""
          className="w-[560px] h-[560px] object-contain pointer-events-none select-none"
          style={{
            opacity: 0.2,
            filter:
              "brightness(0) saturate(100%) invert(56%) sepia(60%) saturate(400%) hue-rotate(101deg) brightness(110%)",
          }}
          animate={{ rotate: [0, 4, 0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex-1 flex items-center will-change-transform"
      >
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-28 pt-36 lg:pt-40">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Live badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium"
                style={{
                  backgroundColor: "hsl(155 83% 30% / 0.14)",
                  borderColor: "hsl(155 83% 30% / 0.32)",
                  color: "hsl(155 83% 65%)",
                }}
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full animate-pulse-ring"
                    style={{ backgroundColor: "hsl(155 83% 50%)" }} />
                  <span className="relative w-2 h-2 rounded-full"
                    style={{ backgroundColor: "hsl(155 83% 55%)" }} />
                </span>
                Atendimento 24 horas &bull; Recife, PE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-extrabold tracking-tighter leading-[0.92] text-white mb-6"
              style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }}
            >
              Há 30 anos,
              <br />
              cuidando de
              <br />
              <span style={{ color: "hsl(155 83% 55%)" }}>
                quem você ama.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              Excelência em medicina veterinária com 25+ especialidades,
              UTI 24h, diagnóstico por imagem e equipe altamente qualificada.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <HeroCta
                href="tel:08131267555"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 50%) 100%)",
                  boxShadow: "0 8px 24px -6px hsla(12, 76%, 56%, 0.6)",
                }}
              >
                <Phone className="w-4 h-4" strokeWidth={2.5} />
                Emergência 24h
              </HeroCta>

              <HeroCta
                href="#especialidades"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm border"
                style={{
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.82)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              >
                Ver Especialidades
              </HeroCta>
            </motion.div>

            {/* Logo */}
            <motion.div variants={itemVariants} className="mt-12">
              <img
                src={logoFull}
                alt="Hospital Veterinário Harmonia"
                className="h-7 brightness-0 invert opacity-35"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Specialty marquee strip */}
      <div
        className="relative z-10 overflow-hidden py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="flex gap-3 animate-marquee"
          style={{
            width: "max-content",
            "--marquee-duration": "28s",
          } as React.CSSProperties}
        >
          {[...marqueeSpecialties, ...marqueeSpecialties].map((item, i) => (
            <span
              key={i}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border"
              style={{
                background: i % 5 === 0
                  ? "hsl(155 83% 30% / 0.14)"
                  : "rgba(255,255,255,0.03)",
                borderColor: i % 5 === 0
                  ? "hsl(155 83% 30% / 0.28)"
                  : "rgba(255,255,255,0.06)",
                color: i % 5 === 0
                  ? "hsl(155 83% 60%)"
                  : "rgba(255,255,255,0.38)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="relative z-10 border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(0,0,0,0.15)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
          <div className="grid grid-cols-3 gap-4 max-w-md">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.13, type: "spring", stiffness: 100 }}
                className="text-left"
              >
                <p
                  className="font-display font-black tracking-tighter leading-none mb-1"
                  style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", color: "white" }}
                >
                  <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} duration={2200} />
                </p>
                <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-[100px] right-8 z-10 hidden lg:flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: "rgba(255,255,255,0.25)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
