import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Navigation,
  ShieldCheck,
  Star,
  ArrowRight,
} from "lucide-react";
import ConversionNav from "@/components/landing/conversion/ConversionNav";
import ConversionFooter from "@/components/landing/conversion/ConversionFooter";
import LeadForm from "@/components/landing/conversion/LeadForm";
import SeoFaq, { buildFaqJsonLd, type FaqItem } from "@/components/landing/SeoFaq";
import { CountUp } from "@/components/ui/count-up";
import { useSeo } from "@/hooks/use-seo";
import recifeBg from "@/assets/hero-hvh.png";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

/* ── Data ── */

const WA_EMERGENCY =
  "https://wa.me/558131267555?text=" +
  encodeURIComponent("Olá! Estou com uma URGÊNCIA e preciso de atendimento para o meu pet.");

const WA_GENERAL =
  "https://wa.me/558131267555?text=" +
  encodeURIComponent("Olá! Vim pelo site do Hospital Harmonia e gostaria de mais informações.");

const TEL = "tel:558131267555";

const UNITS = [
  {
    name: "Casa Forte",
    area: "Recife Norte",
    address: "Estr. do Encanamento, 585",
    mapsLink: "https://maps.app.goo.gl/1xqdttkc6Avn7BNT8",
  },
  {
    name: "Madalena",
    area: "Zona Oeste",
    address: "Av. Visc. de Albuquerque, 894",
    mapsLink: "https://maps.app.goo.gl/MdBiGuUVSyQ6LTy58",
  },
  {
    name: "Boa Viagem",
    area: "Zona Sul",
    address: "Av. Eng. Domingos Ferreira, 3628",
    mapsLink: "https://maps.app.goo.gl/xt4EtizyvPAiBB538",
  },
];

const TESTIMONIALS = [
  {
    name: "Mariana C.",
    pet: "tutora do Thor",
    text: "Fui atendida de madrugada quando meu cachorro teve uma convulsão. Salvaram a vida dele.",
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
    text: "Levo meus gatos há 8 anos. Nunca trocaria. O cuidado é diferente.",
    stars: 5,
  },
];

/* ── FAQs /contato — termos de busca urgência + geral ── */

const CONTATO_FAQS: FaqItem[] = [
  {
    q: "O Hospital Veterinário Harmonia atende emergências e urgências 24 horas?",
    a: "Sim. O Hospital Veterinário Harmonia funciona 24 horas por dia, 7 dias por semana, incluindo feriados e finais de semana. Nossas três unidades em Recife — Casa Forte, Madalena e Boa Viagem — possuem equipe veterinária de plantão pronta para atender urgências e emergências a qualquer hora do dia ou da noite.",
  },
  {
    q: "Qual o telefone do pronto-socorro veterinário do Hospital Harmonia em Recife?",
    a: "O telefone para urgências e agendamentos é (81) 3126-7555, válido para todas as três unidades. Você também pode chamar pelo WhatsApp no mesmo número. O atendimento é imediato — não é necessário agendar para casos de emergência veterinária.",
  },
  {
    q: "Onde fica o hospital veterinário 24 horas mais perto de mim em Recife?",
    a: "O Hospital Veterinário Harmonia possui três unidades estratégicas em Recife: Casa Forte (Estr. do Encanamento, 585), Madalena (Av. Visc. de Albuquerque, 894) e Boa Viagem (Av. Eng. Domingos Ferreira, 3628). Todas funcionam 24 horas e atendem urgências veterinárias imediatamente.",
  },
  {
    q: "O Hospital Harmonia atende de madrugada e nos finais de semana?",
    a: "Sim, o atendimento veterinário é ininterrupto — 24 horas, inclusive madrugada, sábados, domingos e feriados. Para emergências veterinárias noturnas em Recife, basta ligar para (81) 3126-7555 ou ir diretamente a qualquer uma das nossas unidades.",
  },
  {
    q: "Quais especialidades veterinárias o Hospital Harmonia oferece?",
    a: "Oferecemos 24 especialidades veterinárias: clínica geral, cirurgia, ortopedia, cardiologia, neurologia, oncologia, dermatologia, oftalmologia, endocrinologia, nefrologia, pneumologia, hematologia, gastroenterologia, nutrologia, fisioterapia, acupuntura, reprodução, diagnóstico por imagem (raio-X, ultrassom), laboratório próprio, vacinação, atendimento a animais silvestres, terapia celular, internação e urgência 24h.",
  },
  {
    q: "Preciso agendar ou posso ir direto na emergência veterinária?",
    a: "Para urgências e emergências veterinárias, não é necessário agendamento — basta ir diretamente a qualquer unidade do Hospital Harmonia, 24 horas. Para consultas de rotina, check-ups e especialistas, recomendamos agendar pelo WhatsApp (81) 3126-7555 ou pelo formulário nesta página para garantir o horário.",
  },
  {
    q: "O Hospital Harmonia atende gatos, aves, roedores e animais silvestres?",
    a: "Sim. Além de cães e gatos, o Hospital Veterinário Harmonia atende aves, roedores, répteis e animais silvestres. Temos veterinários especializados em diferentes espécies para garantir o melhor cuidado ao seu pet, seja qual for.",
  },
  {
    q: "O hospital veterinário tem centro cirúrgico, internação e diagnóstico por imagem?",
    a: "Sim, o Hospital Harmonia possui estrutura hospitalar completa: centro cirúrgico equipado, setor de internação com monitoramento, aparelhos de raio-X e ultrassom para diagnóstico por imagem, e laboratório próprio para resultados rápidos de exames de sangue e outros.",
  },
  {
    q: "Como agendar uma consulta veterinária no Hospital Harmonia?",
    a: "Você pode agendar uma consulta de três formas: pelo WhatsApp (81) 3126-7555, ligando para o mesmo número, ou preenchendo o formulário nesta página. Nossa equipe retorna em minutos para confirmar o horário na unidade mais próxima de você.",
  },
  {
    q: "Quanto tempo o Hospital Harmonia tem de experiência em Recife?",
    a: "O Hospital Veterinário Harmonia é referência em medicina veterinária em Recife há mais de 32 anos. Com três unidades na cidade e uma equipe de especialistas altamente qualificados, já cuidamos de milhares de pets e famílias recifenses.",
  },
];

const CONTATO_SEO_TEXT =
  "Hospital Veterinário Harmonia — atendimento veterinário 24 horas em Recife, Pernambuco. " +
  "Pronto-socorro veterinário, emergência veterinária, urgência animal, clínica veterinária 24h. " +
  "Unidades em Casa Forte, Madalena e Boa Viagem. Veterinário de madrugada, veterinário noturno, " +
  "veterinário fim de semana, veterinário feriado em Recife. Especialidades: cardiologia veterinária, " +
  "ortopedia veterinária, neurologia veterinária, oncologia veterinária, dermatologia veterinária, " +
  "cirurgia veterinária, oftalmologia veterinária, endocrinologia veterinária, nefrologia veterinária. " +
  "Diagnóstico por imagem: raio-X veterinário, ultrassom veterinário, laboratório veterinário. " +
  "Veterinário para cachorro, veterinário para gato, veterinário para aves, veterinário para animais silvestres. " +
  "Centro cirúrgico veterinário, internação veterinária, vacinação de cães e gatos, consulta veterinária Recife. " +
  "Melhor hospital veterinário de Recife, hospital veterinário perto de mim, hospital pet 24 horas Recife PE. " +
  "Agende sua consulta pelo WhatsApp (81) 3126-7555 ou preencha o formulário acima.";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

/* ── Magnetic Button ── */
const MagneticButton = ({
  href,
  className,
  style,
  children,
  onClick,
  target,
  rel,
}: {
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}) => {
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
      target={target}
      rel={rel}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

/* ── WhatsApp SVG icon ── */
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════ */

const Contato = () => {
  useSeo({
    title: "Urgência Veterinária 24h em Recife | Hospital Harmonia",
    description:
      "Atendimento veterinário de urgência 24 horas em Recife. 3 unidades, equipe pronta, centro cirúrgico próprio. Ligue agora: (81) 3126-7555 ou agende pelo formulário.",
    canonical: "https://hospitalvetharmonia.com.br/contato",
    jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "VeterinaryCare",
      name: "Hospital Veterinário Harmonia",
      description:
        "Hospital veterinário com atendimento de urgência 24h em Recife. 3 unidades, 24 especialidades, centro cirúrgico e diagnóstico por imagem.",
      url: "https://hospitalvetharmonia.com.br/contato",
      telephone: "+55-81-3126-7555",
      priceRange: "$$",
      openingHours: "Mo-Su 00:00-23:59",
      areaServed: { "@type": "City", name: "Recife" },
      address: [
        { "@type": "PostalAddress", streetAddress: "Estr. do Encanamento, 585", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
        { "@type": "PostalAddress", streetAddress: "Av. Visc. de Albuquerque, 894", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
        { "@type": "PostalAddress", streetAddress: "Av. Eng. Domingos Ferreira, 3628", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "2000",
      },
    },
    buildFaqJsonLd(CONTATO_FAQS),
    ],
  });

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const contentY = useTransform(heroProgress, [0, 1], ["0%", "10%"]);
  const overlayOpacity = useTransform(heroProgress, [0, 0.6], [0.82, 0.95]);

  const { scrollYProgress: pageProgress } = useScroll();
  const scaleX = useSpring(pageProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div id="topo" className="min-h-screen relative" style={{ backgroundColor: "hsl(170 35% 8%)" }}>
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
        style={{ scaleX, background: "hsl(155 83% 45%)" }}
      />

      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 flex items-center justify-center">
        <img src={simboloHarmonia} alt="" className="w-[600px] h-[600px] object-contain opacity-[0.02]" />
      </div>

      <div className="relative z-10">
        <ConversionNav />

        {/* ═══ HERO — Urgência 24h ═══ */}
        <section ref={heroRef} className="relative overflow-hidden min-h-[100dvh] flex flex-col">
          {/* Background parallax */}
          <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 will-change-transform">
            <img src={recifeBg} alt="" className="w-full h-full object-cover" style={{ minHeight: "120%" }} loading="eager" />
            <motion.div
              style={{
                opacity: overlayOpacity,
                background: "linear-gradient(115deg, hsl(170 35% 5%) 0%, hsl(170 35% 8% / 0.92) 45%, hsl(155 60% 12% / 0.55) 100%)",
              }}
              className="absolute inset-0"
            />
          </motion.div>

          {/* Símbolo flutuante */}
          <motion.img
            src={simboloHarmonia}
            alt=""
            className="absolute right-[-80px] top-[25%] w-[480px] h-[480px] object-contain pointer-events-none select-none hidden lg:block z-0"
            style={{
              opacity: 0.14,
              filter: "brightness(0) saturate(100%) invert(56%) sepia(60%) saturate(400%) hue-rotate(101deg) brightness(110%)",
            }}
            animate={{ rotate: [0, 4, 0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />

          {/* Conteúdo hero */}
          <motion.div style={{ y: contentY }} className="relative z-10 flex-1 flex items-center will-change-transform">
            <div className="max-w-6xl mx-auto w-full px-6 lg:px-10 py-28 pt-36 lg:pt-40">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl">
                <div className="md:contents">
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-5 -mx-1 md:bg-transparent md:backdrop-blur-none md:p-0 md:mx-0 md:rounded-none">

                    {/* Badge urgência */}
                    <motion.div variants={itemVariants} className="mb-7">
                      <span
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-semibold"
                        style={{
                          backgroundColor: "hsl(12 76% 56% / 0.15)",
                          borderColor: "hsl(12 76% 56% / 0.4)",
                          color: "hsl(12 90% 72%)",
                        }}
                      >
                        <span className="relative flex w-2 h-2 flex-shrink-0">
                          <span className="absolute inline-flex h-full w-full rounded-full animate-pulse-ring" style={{ backgroundColor: "hsl(12 76% 56%)" }} />
                          <span className="relative w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(12 80% 60%)" }} />
                        </span>
                        Urgência 24 horas &bull; 3 unidades em Recife
                      </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                      variants={itemVariants}
                      className="font-display font-extrabold tracking-tighter leading-[0.92] text-white mb-6"
                      style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
                    >
                      Seu pet precisa
                      <br />
                      de ajuda?{" "}
                      <span style={{ color: "hsl(12 80% 62%)" }}>
                        Agora.
                      </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      variants={itemVariants}
                      className="text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      Atendimento veterinário de urgência <strong className="text-white/80">24 horas</strong>, todos os dias.
                      Equipe pronta, centro cirúrgico próprio, diagnóstico por imagem.{" "}
                      <strong className="text-white/80">Não espere.</strong>
                    </motion.p>

                    {/* CTAs — Urgência (vermelho) + WhatsApp */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
                      {/* Desktop: WhatsApp urgência */}
                      <MagneticButton
                        href={WA_EMERGENCY}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-white text-[15px]"
                        style={{
                          background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 48%) 100%)",
                          boxShadow: "0 12px 32px -8px hsla(12, 76%, 56%, 0.65)",
                        }}
                      >
                        <Phone className="w-4.5 h-4.5" strokeWidth={2.5} />
                        Urgência 24h
                      </MagneticButton>

                      {/* Mobile: tel direto */}
                      <MagneticButton
                        href={TEL}
                        className="inline-flex md:hidden items-center gap-2.5 px-7 py-4 rounded-full font-bold text-white text-[15px]"
                        style={{
                          background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 48%) 100%)",
                          boxShadow: "0 12px 32px -8px hsla(12, 76%, 56%, 0.65)",
                        }}
                      >
                        <Phone className="w-4.5 h-4.5" strokeWidth={2.5} />
                        Ligar agora — Urgência
                      </MagneticButton>

                      {/* Scroll pro formulário */}
                      <MagneticButton
                        href="#formulario"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-white/90 text-sm border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                      >
                        Agendar consulta
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </MagneticButton>
                    </motion.div>

                    {/* Trust strip */}
                    <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 max-w-sm">
                      {[
                        { value: 32, suffix: "+", label: "anos" },
                        { value: 3, suffix: "", label: "unidades" },
                        { value: 24, suffix: "", label: "especialidades" },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <p className="font-display font-black tracking-tighter leading-none mb-1" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)", color: "white" }}>
                            <CountUp to={stat.value} suffix={stat.suffix} duration={2200} />
                          </p>
                          <p className="text-[11px] font-medium text-white/40">{stat.label}</p>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Telefone strip */}
          <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(0,0,0,0.2)" }}>
            <div className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: "hsl(12 80% 62%)" }} strokeWidth={2} />
                <div>
                  <p className="text-white font-bold text-lg tracking-tight">(81) 3126-7555</p>
                  <p className="text-[11px] text-white/40 font-medium">Todas as unidades, 24h</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <ShieldCheck className="w-4 h-4" style={{ color: "hsl(155 83% 55%)" }} />
                <span>CRMV/PE regular</span>
                <span className="opacity-30">•</span>
                <span>Laboratório próprio</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ UNIDADES — Onde estamos ═══ */}
        <section className="relative py-16 md:py-20 border-t" style={{ backgroundColor: "hsl(170 35% 6%)", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className="mb-10"
            >
              <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "hsl(12 80% 62%)" }}>
                Perto de você
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05]">
                3 unidades em Recife.
                <br />
                <span style={{ color: "hsl(155 83% 55%)" }}>Todas 24 horas.</span>
              </h2>
            </motion.div>

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {UNITS.map((u) => (
                <motion.div
                  key={u.name}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 18 } } }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="relative rounded-2xl p-6 border overflow-hidden group"
                  style={{ backgroundColor: "hsl(170 35% 10% / 0.6)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 0%, hsl(12 76% 56% / 0.08) 0%, transparent 60%)" }} />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-xl font-bold text-white">{u.name}</h3>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: "hsl(12 76% 56% / 0.15)", color: "hsl(12 90% 72%)" }}>
                        24h
                      </span>
                    </div>

                    <p className="text-xs font-medium text-white/45 mb-1">{u.area}</p>
                    <div className="flex items-start gap-2 mb-5">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-white/35" strokeWidth={1.75} />
                      <p className="text-sm text-white/60">{u.address}</p>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={TEL}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white"
                        style={{ background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 48%) 100%)" }}
                      >
                        <Phone className="w-3 h-3" strokeWidth={2.5} />
                        Ligar
                      </a>
                      <a
                        href={u.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border border-white/10 text-white/70 bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                      >
                        <Navigation className="w-3 h-3" strokeWidth={2} />
                        Como chegar
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ FORMULÁRIO — mais conciso ═══ */}
        <section
          id="formulario"
          className="relative py-16 md:py-20 border-t scroll-mt-24"
          style={{ backgroundColor: "hsl(170 35% 8%)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">
              {/* Left: copy + testimonials */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
              >
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: "hsl(155 83% 55%)" }}>
                  Agendar atendimento
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05] mb-4">
                  Não é urgência?
                  <br />
                  Deixe seus dados.
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
                  Preencha o formulário ao lado — nossa equipe retorna em minutos pelo seu WhatsApp. Simples e rápido.
                </p>

                {/* Mini testimonials */}
                <div className="space-y-3">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.name} className="rounded-xl p-4 border" style={{ backgroundColor: "hsl(170 35% 10% / 0.5)", borderColor: "rgba(255,255,255,0.06)" }}>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: t.stars }).map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-current" style={{ color: "hsl(43 95% 65%)" }} />
                        ))}
                      </div>
                      <p className="text-xs text-white/55 leading-relaxed mb-2">"{t.text}"</p>
                      <p className="text-[11px] text-white/35 font-medium">{t.name} — {t.pet}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: form */}
              <div className="lg:sticky lg:top-28">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ SEO ═══ */}
        <SeoFaq
          heading="Perguntas frequentes"
          subheading="Dúvidas comuns"
          faqs={CONTATO_FAQS}
          seoText={CONTATO_SEO_TEXT}
        />

        {/* ═══ CTA FINAL ═══ */}
        <section
          className="relative py-20 border-t overflow-hidden"
          style={{ backgroundColor: "hsl(170 35% 6%)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(155 83% 40% / 0.08) 0%, transparent 60%)" }} />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.05]">
                Seu pet não pode esperar?
                <br />
                <span style={{ color: "hsl(12 80% 62%)" }}>Ligue agora.</span>
              </h2>
              <p className="text-white/50 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Atendemos urgências veterinárias 24 horas, 365 dias por ano. Três unidades em Recife prontas para receber seu pet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                {/* Urgência — vermelho */}
                <MagneticButton
                  href={TEL}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-white text-[15px] w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 48%) 100%)",
                    boxShadow: "0 16px 40px -12px hsla(12, 76%, 56%, 0.6)",
                  }}
                >
                  <Phone className="w-4 h-4" strokeWidth={2.5} />
                  (81) 3126-7555
                </MagneticButton>

                {/* WhatsApp — verde */}
                <MagneticButton
                  href={WA_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-sm w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, hsl(155 83% 40%) 0%, hsl(155 83% 24%) 100%)",
                    boxShadow: "0 14px 34px -10px hsla(155, 83%, 40%, 0.55)",
                  }}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Fale conosco
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
