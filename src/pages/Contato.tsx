import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Stethoscope,
  Heart,
  Building2,
  Star,
} from "lucide-react";
import ConversionNav from "@/components/landing/conversion/ConversionNav";
import ConversionFooter from "@/components/landing/conversion/ConversionFooter";
import LeadForm from "@/components/landing/conversion/LeadForm";
import { CountUp } from "@/components/ui/count-up";
import { useSeo } from "@/hooks/use-seo";
import recifeBg from "@/assets/hero-hvh.png";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

const TRUST_STATS = [
  { value: 32, suffix: "+", label: "anos de história" },
  { value: 24, suffix: "h", label: "atendimento" },
  { value: 3, suffix: "", label: "unidades em Recife" },
  { value: 24, suffix: "", label: "especialidades" },
];

const VALUE_PROPS = [
  {
    icon: Clock,
    title: "Atendimento 24 horas",
    desc: "Urgência todos os dias, a qualquer hora. Nunca deixamos seu pet esperando.",
  },
  {
    icon: Stethoscope,
    title: "24 especialidades",
    desc: "Cardiologia, ortopedia, neurologia, oncologia, dermatologia — especialistas sob o mesmo teto.",
  },
  {
    icon: Building2,
    title: "Centro cirúrgico e diagnóstico",
    desc: "Internação, cirurgia, raio-X, ultrassom e laboratório próprio. Estrutura hospitalar completa.",
  },
  {
    icon: Heart,
    title: "32 anos de Recife",
    desc: "Referência em medicina veterinária de alta complexidade. Milhares de famílias confiam na gente.",
  },
];

const TESTIMONIALS = [
  {
    name: "Mariana C.",
    pet: "tutora do Thor",
    text: "Fui atendida de madrugada quando meu cachorro teve uma convulsão. Salvaram a vida dele. Gratidão eterna.",
    stars: 5,
  },
  {
    name: "Ricardo L.",
    pet: "tutor da Nina",
    text: "Equipe extremamente profissional, explicaram tudo com calma. A estrutura é impressionante.",
    stars: 5,
  },
  {
    name: "Fernanda S.",
    pet: "tutora do Bob",
    text: "Levo meus gatos há 8 anos. Nunca trocaria. O cuidado é diferente, é como se fossem da família deles também.",
    stars: 5,
  },
];

const MARQUEE_SPECIALTIES = [
  "Clínica Geral", "Cirurgia", "Internação", "Ortopedia",
  "Cardiologia", "Neurologia", "Oncologia", "Dermatologia",
  "Acupuntura", "Oftalmologia", "Diagnóstico por Imagem", "Laboratório Próprio",
  "Vacinas", "Animais Silvestres", "Urgência 24h",
  "Reprodução", "Nefrologia", "Endocrinologia", "Hematologia",
  "Nutrologia", "Gastroenterologia",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

/* ── Magnetic Button (port do HeroCta) ── */
const MagneticButton = ({
  href,
  className,
  style,
  children,
  onClick,
  ...rest
}: {
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "onClick" | "style" | "href">) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

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
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
};

const Contato = () => {
  useSeo({
    title:
      "Agende Atendimento Veterinário 24h em Recife | Hospital Harmonia",
    description:
      "Fale agora com o Hospital Veterinário Harmonia. Atendimento 24h em Recife, 24 especialidades e centro cirúrgico próprio. Agende pelo formulário e receba retorno em minutos.",
    canonical: "https://hospitalharmonia.vet.br/contato",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "VeterinaryCare",
      name: "Hospital Veterinário Harmonia",
      description:
        "Hospital veterinário referência em Recife. Atendimento 24h, 24 especialidades, centro cirúrgico e diagnóstico por imagem.",
      url: "https://hospitalharmonia.vet.br/contato",
      telephone: "+55-81-3126-7555",
      priceRange: "$$",
      openingHours: "Mo-Su 00:00-23:59",
      areaServed: { "@type": "City", name: "Recife" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Recife",
        addressRegion: "PE",
        addressCountry: "BR",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "2000",
      },
    },
  });

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const contentY = useTransform(heroProgress, [0, 1], ["0%", "10%"]);
  const symbolY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(heroProgress, [0, 0.6], [0.78, 0.93]);

  const { scrollYProgress: pageProgress } = useScroll();
  const scaleX = useSpring(pageProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      id="topo"
      className="min-h-screen relative"
      style={{ backgroundColor: "hsl(170 35% 8%)" }}
    >
      {/* Scroll progress bar (port do site principal) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
        style={{ scaleX, background: "hsl(155 83% 45%)" }}
      />

      {/* Watermark global sutil */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 flex items-center justify-center">
        <img
          src={simboloHarmonia}
          alt=""
          className="w-[600px] h-[600px] object-contain opacity-[0.02]"
        />
      </div>

      <div className="relative z-10">
        <ConversionNav />

        {/* ── HERO + FORM com parallax ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24"
        >
          {/* Background com parallax */}
          <motion.div
            style={{ y: bgY }}
            className="absolute inset-0 z-0 will-change-transform"
          >
            <img
              src={recifeBg}
              alt=""
              className="w-full h-full object-cover"
              style={{ minHeight: "120%" }}
              loading="eager"
            />
            <motion.div
              style={{
                opacity: overlayOpacity,
                background:
                  "linear-gradient(115deg, hsl(170 35% 5%) 0%, hsl(170 35% 8% / 0.92) 45%, hsl(155 60% 12% / 0.6) 100%)",
              }}
              className="absolute inset-0"
            />
          </motion.div>

          {/* Símbolo flutuante com parallax (port do site principal) */}
          <motion.div
            style={{ y: symbolY }}
            className="absolute right-[-100px] top-[15%] z-0 will-change-transform hidden lg:block"
          >
            <motion.img
              src={simboloHarmonia}
              alt=""
              className="w-[520px] h-[520px] object-contain pointer-events-none select-none"
              style={{
                opacity: 0.16,
                filter:
                  "brightness(0) saturate(100%) invert(56%) sepia(60%) saturate(400%) hue-rotate(101deg) brightness(110%)",
              }}
              animate={{ rotate: [0, 4, 0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            style={{ y: contentY }}
            className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 will-change-transform"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
              {/* ── Left: copy + trust ── */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="pt-2 lg:pt-4"
              >
                {/* Live badge */}
                <motion.div variants={itemVariants} className="mb-6">
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

                <motion.h1
                  variants={itemVariants}
                  className="font-display font-extrabold tracking-tighter leading-[0.93] text-white mb-6"
                  style={{ fontSize: "clamp(2.5rem, 5.4vw, 4.5rem)" }}
                >
                  O cuidado que
                  <br />
                  seu pet precisa,{" "}
                  <span style={{ color: "hsl(155 83% 55%)" }}>
                    quando ele precisa.
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg leading-relaxed mb-8 max-w-xl"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Hospital veterinário de referência em Recife há 32 anos. Fale
                  com a gente pelo formulário ao lado — nossa equipe retorna em
                  minutos pelo seu WhatsApp.
                </motion.p>

                {/* Trust stats com CountUp */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8 max-w-xl"
                >
                  {TRUST_STATS.map((stat) => (
                    <div key={stat.label}>
                      <p
                        className="font-display font-black tracking-tighter leading-none mb-1"
                        style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", color: "white" }}
                      >
                        <CountUp to={stat.value} suffix={stat.suffix} duration={2200} />
                      </p>
                      <p className="text-[11px] font-medium text-white/45">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>

                {/* Selos */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center gap-3 text-xs text-white/40"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" style={{ color: "hsl(155 83% 55%)" }} />
                    CRMV/PE regular
                  </span>
                  <span className="opacity-30">•</span>
                  <span>Centro cirúrgico</span>
                  <span className="opacity-30">•</span>
                  <span>Laboratório próprio</span>
                </motion.div>
              </motion.div>

              {/* ── Right: form ── */}
              <div className="lg:sticky lg:top-28">
                <LeadForm />
              </div>
            </div>
          </motion.div>

          {/* Marquee de especialidades (port do site principal) */}
          <div
            className="relative z-10 mt-12 md:mt-16 overflow-hidden py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              className="flex gap-3 animate-marquee"
              style={{
                width: "max-content",
                "--marquee-duration": "32s",
              } as React.CSSProperties}
            >
              {[...MARQUEE_SPECIALTIES, ...MARQUEE_SPECIALTIES].map((item, i) => (
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
        </section>

        {/* ── VALUE PROPS ── */}
        <section
          className="relative py-20 border-t"
          style={{
            backgroundColor: "hsl(170 35% 6%)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className="max-w-2xl mb-12"
            >
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-3"
                style={{ color: "hsl(155 83% 55%)" }}
              >
                Por que o Harmonia
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05]">
                Estrutura de hospital.
                <br />
                Carinho de família.
              </h2>
            </motion.div>

            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {VALUE_PROPS.map((v) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 90, damping: 18 },
                      },
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="relative rounded-2xl p-6 md:p-7 border overflow-hidden group"
                    style={{
                      backgroundColor: "hsl(170 35% 10% / 0.6)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    {/* Glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 0%, hsl(155 83% 40% / 0.12) 0%, transparent 60%)",
                      }}
                    />
                    <div
                      className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: "hsl(155 83% 30% / 0.18)",
                        color: "hsl(155 83% 60%)",
                      }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <h3 className="relative font-display text-lg md:text-xl font-bold text-white mb-2">
                      {v.title}
                    </h3>
                    <p className="relative text-sm text-white/50 leading-relaxed">
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section
          className="relative py-20 border-t"
          style={{
            backgroundColor: "hsl(170 35% 8%)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className="mb-12 text-center"
            >
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-3"
                style={{ color: "hsl(155 83% 55%)" }}
              >
                Quem já confiou
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                Mais de{" "}
                <CountUp to={2000} suffix="+" duration={2400} className="text-[hsl(155_83%_55%)]" />
                {" "}pets atendidos por mês
              </h2>
            </motion.div>

            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.name}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 90, damping: 18 },
                    },
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-6 border"
                  style={{
                    backgroundColor: "hsl(170 35% 10% / 0.6)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-current"
                        style={{ color: "hsl(43 95% 65%)" }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed mb-5">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(155 83% 40%) 0%, hsl(155 83% 24%) 100%)",
                      }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-white/40">{t.pet}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section
          className="relative py-20 border-t overflow-hidden"
          style={{
            backgroundColor: "hsl(170 35% 6%)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          {/* Glow ambiente */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, hsl(155 83% 40% / 0.08) 0%, transparent 60%)",
            }}
          />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.05]">
                Ainda tem dúvida?
                <br />
                <span style={{ color: "hsl(155 83% 55%)" }}>
                  Fale com a gente.
                </span>
              </h2>
              <p className="text-white/55 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Role até o topo, preencha o formulário e nossa equipe entra em
                contato em minutos. Se preferir, ligue agora.
              </p>
              <div className="flex items-center justify-center">
                <MagneticButton
                  href="#topo"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-[15px]"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(155 83% 40%) 0%, hsl(155 83% 24%) 100%)",
                    boxShadow:
                      "0 16px 40px -12px hsla(155, 83%, 40%, 0.6), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                >
                  Preencher formulário
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        <ConversionFooter />
      </div>
    </div>
  );
};

export default Contato;
