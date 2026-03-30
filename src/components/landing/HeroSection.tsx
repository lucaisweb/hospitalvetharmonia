import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Phone, ChevronDown, ChevronRight } from "lucide-react";
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
  { to: 32, suffix: "+", label: "Anos de história" },
  { to: 3, suffix: "", label: "Unidades em Recife" },
  { to: 2000, prefix: "+", suffix: "", label: "Pets cuidados/mês" },
];

const marqueeSpecialties = [
  "Clínica Geral", "Cirurgia", "Internação", "Ortopedia",
  "Cardiologia", "Neurologia", "Oncologia", "Dermatologia", "Fisioterapia",
  "Acupuntura", "Oftalmologia", "Diagnóstico por Imagem", "Laboratório Próprio",
  "Vacinas", "Animais Silvestres", "Urgência 24h",
  "Reprodução", "Nefrologia", "Endocrinologia", "Pneumologia",
  "Hematologia", "Nutrologia", "Gastroenterologia", "Terapia Celular",
];

const WA_EMERGENCY =
  "https://wa.me/558131267555?text=Olá!%20Estou%20com%20uma%20EMERGÊNCIA%20e%20preciso%20de%20atendimento%20urgente%20para%20o%20meu%20pet.";

/* ── Magnetic CTA inside Hero ── */
const HeroCta = ({ href, style: ctaStyle, className, children, target }: {
  href: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  target?: string;
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
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
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
            {/* Glass wrapper — mobile only */}
            <div className="md:contents">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-5 -mx-1 md:bg-transparent md:backdrop-blur-none md:p-0 md:mx-0 md:rounded-none">

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
                    <span className="relative flex w-2 h-2 flex-shrink-0">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full animate-pulse-ring"
                        style={{ backgroundColor: "hsl(155 83% 50%)" }}
                      />
                      <span
                        className="relative w-2 h-2 rounded-full"
                        style={{ backgroundColor: "hsl(155 83% 55%)" }}
                      />
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
                  Há 32 anos,
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
                  Excelência em medicina veterinária com 24 especialidades,
                  diagnóstico por imagem e equipe altamente qualificada.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  {/* Emergência — Desktop → WhatsApp */}
                  <HeroCta
                    href={WA_EMERGENCY}
                    target="_blank"
                    className="hidden md:inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white text-sm"
                    style={{
                      background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 50%) 100%)",
                      boxShadow: "0 8px 24px -6px hsla(12, 76%, 56%, 0.6)",
                    }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                    </svg>
                    Urgência 24h
                  </HeroCta>

                  {/* Emergência — Mobile → tel */}
                  <HeroCta
                    href="tel:558131267555"
                    className="inline-flex md:hidden items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white text-sm"
                    style={{
                      background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 50%) 100%)",
                      boxShadow: "0 8px 24px -6px hsla(12, 76%, 56%, 0.6)",
                    }}
                  >
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                    Urgência 24h
                  </HeroCta>

                  {/* Ver Especialidades — GetStarted style */}
                  <motion.a
                    href="#especialidades"
                    whileHover="hover"
                    initial="rest"
                    className="relative overflow-hidden inline-flex items-center justify-center rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      color: "rgba(255,255,255,0.88)",
                      minWidth: "184px",
                      height: "48px",
                      paddingLeft: "24px",
                      paddingRight: "8px",
                    }}
                  >
                    <motion.span
                      className="whitespace-nowrap"
                      style={{ marginRight: "32px" }}
                      variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
                      transition={{ duration: 0.25 }}
                    >
                      Ver Especialidades
                    </motion.span>
                    <motion.i
                      className="absolute right-1 top-1 bottom-1 rounded-full z-10 grid place-items-center"
                      style={{
                        backgroundColor: "hsl(155 83% 28%)",
                        color: "white",
                      }}
                      variants={{
                        rest: { width: "36px" },
                        hover: { width: "calc(100% - 8px)" },
                      }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <ChevronRight size={16} strokeWidth={2.5} />
                    </motion.i>
                  </motion.a>
                </motion.div>

                {/* Logo */}
                <motion.div variants={itemVariants} className="mt-12">
                  <img
                    src={logoFull}
                    alt="Hospital Veterinário Harmonia"
                    className="h-7 brightness-0 invert opacity-35"
                  />
                </motion.div>

              </div>
            </div>
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
