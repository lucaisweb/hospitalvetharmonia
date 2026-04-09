import { motion } from "framer-motion";
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
import { useSeo } from "@/hooks/use-seo";
import recifeBg from "@/assets/hero-hvh.png";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

const TRUST_STATS = [
  { value: "32+", label: "anos de história" },
  { value: "24h", label: "atendimento" },
  { value: "3", label: "unidades em Recife" },
  { value: "24", label: "especialidades" },
];

const VALUE_PROPS = [
  {
    icon: Clock,
    title: "Atendimento 24 horas",
    desc: "Urgência e emergência todos os dias, a qualquer hora. Nunca deixamos seu pet esperando.",
  },
  {
    icon: Stethoscope,
    title: "24 especialidades",
    desc: "Cardiologia, ortopedia, neurologia, oncologia, dermatologia — especialistas sob o mesmo teto.",
  },
  {
    icon: Building2,
    title: "UTI, centro cirúrgico e imagem",
    desc: "Estrutura hospitalar completa: internação, cirurgia, raio-X, ultrassom e laboratório próprio.",
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

const Contato = () => {
  useSeo({
    title:
      "Agende Atendimento Veterinário 24h em Recife | Hospital Harmonia",
    description:
      "Fale agora com o Hospital Veterinário Harmonia. Atendimento 24h em Recife, 24 especialidades, UTI e centro cirúrgico. Agende pelo formulário e receba retorno em minutos.",
    canonical: "https://hospitalharmonia.vet.br/contato",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "VeterinaryCare",
      name: "Hospital Veterinário Harmonia",
      description:
        "Hospital veterinário referência em Recife. Atendimento 24h, 24 especialidades, UTI, centro cirúrgico e diagnóstico por imagem.",
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

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "hsl(170 35% 8%)" }}
    >
      <ConversionNav />

      {/* ── HERO + FORM ── */}
      <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={recifeBg}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, hsl(170 35% 5% / 0.96) 0%, hsl(170 35% 8% / 0.92) 45%, hsl(155 60% 12% / 0.7) 100%)",
            }}
          />
        </div>

        {/* Símbolo watermark */}
        <img
          src={simboloHarmonia}
          alt=""
          aria-hidden
          className="absolute right-[-120px] top-[10%] w-[520px] h-[520px] object-contain pointer-events-none select-none hidden lg:block"
          style={{
            opacity: 0.05,
            filter:
              "brightness(0) saturate(100%) invert(56%) sepia(60%) saturate(400%) hue-rotate(101deg) brightness(110%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
            {/* ── Left: copy + trust ── */}
            <div className="pt-2 lg:pt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 20 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium mb-6"
                  style={{
                    backgroundColor: "hsl(155 83% 30% / 0.14)",
                    borderColor: "hsl(155 83% 30% / 0.32)",
                    color: "hsl(155 83% 65%)",
                  }}
                >
                  <span className="relative flex w-1.5 h-1.5">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full animate-ping"
                      style={{ backgroundColor: "hsl(155 83% 50%)" }}
                    />
                    <span
                      className="relative w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "hsl(155 83% 55%)" }}
                    />
                  </span>
                  Atendimento 24h • Recife, PE
                </span>

                <h1
                  className="font-display font-extrabold tracking-tighter leading-[0.95] text-white mb-6"
                  style={{ fontSize: "clamp(2.5rem, 5.2vw, 4.25rem)" }}
                >
                  O cuidado que
                  <br />
                  seu pet precisa,{" "}
                  <span style={{ color: "hsl(155 83% 55%)" }}>
                    quando ele precisa.
                  </span>
                </h1>

                <p className="text-lg text-white/55 leading-relaxed max-w-xl mb-8">
                  Hospital veterinário de referência em Recife há 32 anos. Fale
                  com a gente pelo formulário ao lado — nossa equipe retorna em
                  minutos pelo seu WhatsApp.
                </p>

                {/* Trust stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8 max-w-xl">
                  {TRUST_STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <p
                        className="font-display font-black text-2xl md:text-3xl leading-none mb-1"
                        style={{ color: "white" }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-[11px] font-medium text-white/45">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Selos */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" style={{ color: "hsl(155 83% 55%)" }} />
                    CRMV/PE regular
                  </span>
                  <span className="opacity-30">•</span>
                  <span>UTI veterinária</span>
                  <span className="opacity-30">•</span>
                  <span>Laboratório próprio</span>
                </div>
              </motion.div>
            </div>

            {/* ── Right: form ── */}
            <div className="lg:sticky lg:top-28">
              <LeadForm />
            </div>
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
            viewport={{ once: true }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUE_PROPS.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 90 }}
                  className="relative rounded-2xl p-6 md:p-7 border overflow-hidden group"
                  style={{
                    backgroundColor: "hsl(170 35% 10% / 0.6)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: "hsl(155 83% 30% / 0.18)",
                      color: "hsl(155 83% 60%)",
                    }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
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
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="text-[11px] font-semibold tracking-widest uppercase mb-3"
              style={{ color: "hsl(155 83% 55%)" }}
            >
              Quem já confiou
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Mais de 2.000 pets atendidos por mês
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 90 }}
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
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="relative py-20 border-t"
        style={{
          backgroundColor: "hsl(170 35% 6%)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <a
                href="#topo"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-white text-sm w-full sm:w-auto"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(155 83% 40%) 0%, hsl(155 83% 24%) 100%)",
                  boxShadow: "0 12px 32px -10px hsla(155, 83%, 40%, 0.55)",
                }}
              >
                Preencher formulário
              </a>
              <a
                href="tel:558131267555"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm border border-white/15 bg-white/[0.04] w-full sm:w-auto hover:bg-white/[0.08] transition-colors"
              >
                (81) 3126-7555
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ConversionFooter />
    </div>
  );
};

export default Contato;
