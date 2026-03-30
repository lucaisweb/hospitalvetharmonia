import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Microscope, Heart, ArrowUpRight, CheckCircle2 } from "lucide-react";
import logoHarmonia from "@/assets/logo-symbol.png";
import logoInnova from "@/assets/logo-innova.png";
import logoNeolab from "@/assets/neolab-logo.png";

const pillars = [
  {
    icon: Clock,
    title: "Infraestrutura 24 Horas",
    shortDesc:
      "Centro cirúrgico de alta complexidade e internação monitorada 24h. Emergência sempre disponível, sem necessidade de agendamento.",
    description:
      "O Hospital Veterinário Harmonia opera ininterruptamente com equipe multidisciplinar disponível a qualquer hora. Do pronto-atendimento às cirurgias eletivas e de urgência, oferecemos o mesmo padrão de excelência 24 horas por dia, todos os dias do ano.",
    logo: logoHarmonia,
    logoAlt: "Hospital Harmonia",
    tag: "Hospital",
    whatsappMsg: "Olá! Gostaria de saber mais sobre a infraestrutura 24h do Hospital Harmonia.",
    accent: "hsl(155, 83%, 28%)",
    accentLight: "hsl(155, 60%, 96%)",
    features: ["Centro Cirúrgico", "Internação Monitorada", "Emergência 24h", "Oncologia Clínica", "Medicina Preventiva"],
    checklist: [
      "Equipe veterinária especializada presente 24h",
      "Centro cirúrgico com monitoração multiparamétrica",
      "Internação separada por espécie e porte",
      "Atendimento de emergência sem agendamento",
      "Anestesiologia e medicina intensiva dedicadas",
    ],
    stats: [
      { value: "32+", label: "Anos de história" },
      { value: "3", label: "Unidades Recife" },
      { value: "25+", label: "Especialidades" },
    ],
    wide: true,
  },
  {
    icon: Heart,
    title: "Neolab — Laboratório Clínico",
    shortDesc: "Resultados precisos e rápidos com tecnologia de ponta para diagnóstico veterinário.",
    description:
      "O Neolab é o laboratório de análises clínicas veterinárias integrado ao hospital, com resultados em tempo real para hemograma, bioquímica, urinálise, culturas e muito mais.",
    logo: logoNeolab,
    logoAlt: "Neolab",
    tag: "Laboratório",
    whatsappMsg: "Olá! Gostaria de saber mais sobre os serviços do Neolab.",
    accent: "hsl(12, 76%, 52%)",
    accentLight: "hsl(12, 80%, 97%)",
    features: ["Hemograma completo", "Bioquímica sérica", "Urinálise", "Culturas"],
    wide: false,
  },
  {
    icon: Microscope,
    title: "Inova — Diagnóstico por Imagem",
    shortDesc: "Raio-x, ultrassonografia, tomografia e broncoscopia com laudo imediato.",
    description:
      "A Inova Imagem Veterinária realiza Raio-x Geral, Ultrassonografia, Eletrocardiograma, Ecodopolercardiografia, Tomografia, Broncoscopia e Traqueobroncoscopia com laudo imediato por especialistas.",
    logo: logoInnova,
    logoAlt: "Inova Imagem Veterinária",
    tag: "Diagnóstico por Imagem",
    whatsappMsg: "Olá! Gostaria de saber mais sobre os serviços da Inova Imagem Veterinária.",
    accent: "hsl(200, 75%, 40%)",
    accentLight: "hsl(200, 60%, 97%)",
    features: ["Raio-x Geral", "Ultrassonografia", "Eletrocardiograma", "Ecodopolercardiografia", "Tomografia", "Broncoscopia", "Traqueobroncoscopia"],
    wide: false,
  },
] as const;

/* ── WhatsApp SVG ── */
const WaIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
  </svg>
);

/* ── Expandable CTA row ── */
const CtaRow = ({
  accent,
  description,
  whatsappMsg,
}: {
  accent: string;
  description: string;
  whatsappMsg: string;
}) => {
  const [open, setOpen] = useState(false);
  const link = `https://wa.me/558131267555?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="pt-4 border-t" style={{ borderColor: "hsl(40 20% 91%)" }}>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium transition-colors"
          style={{ color: accent }}
        >
          {open ? "Fechar" : "Saiba mais"}
        </button>
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.12, rotate: 12 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
        </motion.a>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: accent }}
              >
                <WaIcon />
                Falar pelo WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Hospital card — full-width horizontal layout ── */
const HospitalCard = ({ pillar }: { pillar: typeof pillars[0] }) => (
  <div
    className="rounded-3xl border overflow-hidden"
    style={{ backgroundColor: "white", borderColor: "hsl(40 20% 87%)" }}
  >
    <div className="flex flex-col lg:flex-row">
      {/* Left panel: branding + stats */}
      <div
        className="lg:w-[38%] flex flex-col p-8 gap-6"
        style={{
          backgroundColor: pillar.accentLight,
          borderBottom: "1px solid hsl(40 20% 90%)",
        }}
      >
        {/* Accent stripe */}
        <div className="h-0.5 rounded-full -mt-2" style={{ background: pillar.accent }} />

        {/* Tag + icon */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{ backgroundColor: `color-mix(in srgb, ${pillar.accent} 12%, transparent)`, color: pillar.accent }}
          >
            {pillar.tag}
          </span>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `color-mix(in srgb, ${pillar.accent} 10%, transparent)` }}
          >
            <pillar.icon className="w-5 h-5" style={{ color: pillar.accent }} strokeWidth={2} />
          </div>
        </div>

        {/* Logo — centered */}
        <div className="flex-1 flex items-center justify-center py-4 min-h-[120px]">
          <img src={pillar.logo} alt={pillar.logoAlt} className="max-h-24 max-w-[200px] w-auto object-contain" />
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-3 rounded-2xl p-4"
          style={{
            backgroundColor: `color-mix(in srgb, ${pillar.accent} 6%, transparent)`,
            border: `1px solid color-mix(in srgb, ${pillar.accent} 16%, transparent)`,
          }}
        >
          {pillar.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-display font-black tracking-tighter leading-none"
                style={{ fontSize: "1.5rem", color: pillar.accent }}
              >
                {s.value}
              </p>
              <p className="text-[11px] font-medium mt-0.5" style={{ color: "hsl(170 15% 48%)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: content */}
      <div className="flex-1 p-8 flex flex-col gap-5">
        <div>
          <h3
            className="font-display font-bold tracking-tight mb-2"
            style={{ fontSize: "1.35rem", color: "hsl(170 30% 12%)" }}
          >
            {pillar.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{pillar.shortDesc}</p>
        </div>

        {/* Checklist + pills side by side */}
        <div className="grid sm:grid-cols-2 gap-5">
          <ul className="space-y-2">
            {pillar.checklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "hsl(170 20% 30%)" }}>
                <CheckCircle2
                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                  style={{ color: pillar.accent }}
                  strokeWidth={2}
                />
                {item}
              </li>
            ))}
          </ul>

          <div>
            <p
              className="text-[11px] font-semibold tracking-wider uppercase mb-2"
              style={{ color: pillar.accent, opacity: 0.7 }}
            >
              Serviços
            </p>
            <div className="flex flex-wrap gap-1.5">
              {pillar.features.map((f) => (
                <span
                  key={f}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${pillar.accent} 8%, transparent)`,
                    color: pillar.accent,
                    border: `1px solid color-mix(in srgb, ${pillar.accent} 18%, transparent)`,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <CtaRow
          accent={pillar.accent}
          description={pillar.description}
          whatsappMsg={pillar.whatsappMsg}
        />
      </div>
    </div>
  </div>
);

/* ── Narrow card for Neolab / Innova ── */
const NarrowCard = ({ pillar }: { pillar: typeof pillars[1] | typeof pillars[2] }) => (
  <div
    className="rounded-3xl border overflow-hidden h-full flex flex-col"
    style={{ backgroundColor: "white", borderColor: "hsl(40 20% 87%)" }}
  >
    {/* Accent stripe */}
    <div className="h-[3px]" style={{ background: pillar.accent }} />

    <div className="p-7 flex flex-col gap-4 flex-1">
      {/* Tag + icon */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
          style={{ backgroundColor: `color-mix(in srgb, ${pillar.accent} 10%, transparent)`, color: pillar.accent }}
        >
          {pillar.tag}
        </span>
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in srgb, ${pillar.accent} 8%, transparent)` }}
        >
          <pillar.icon className="w-5 h-5" style={{ color: pillar.accent }} strokeWidth={2} />
        </div>
      </div>

      {/* Logo */}
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{ backgroundColor: pillar.accentLight, padding: "1.25rem", minHeight: "88px" }}
      >
        <img src={pillar.logo} alt={pillar.logoAlt} className="max-h-14 max-w-[80%] w-auto object-contain" />
      </div>

      {/* Title + desc */}
      <div>
        <h3 className="font-display font-bold text-lg tracking-tight mb-1.5" style={{ color: "hsl(170 30% 12%)" }}>
          {pillar.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{pillar.shortDesc}</p>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-1.5">
        {pillar.features.map((f) => (
          <span
            key={f}
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              backgroundColor: `color-mix(in srgb, ${pillar.accent} 8%, transparent)`,
              color: pillar.accent,
              border: `1px solid color-mix(in srgb, ${pillar.accent} 16%, transparent)`,
            }}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="flex-1" />

      <CtaRow
        accent={pillar.accent}
        description={pillar.description}
        whatsappMsg={pillar.whatsappMsg}
      />
    </div>
  </div>
);

/* ── Section ── */
const ValueProps = () => (
  <section className="py-28" style={{ backgroundColor: "white" }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Header */}
      <div className="grid lg:grid-cols-2 gap-10 mb-12 items-end">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 75, damping: 18 }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "hsl(155 83% 33%)" }}>
            Por que a Harmonia
          </p>
          <h2
            className="font-display font-black tracking-tighter leading-none"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: "hsl(170 30% 12%)" }}
          >
            Cuidado completo
            <br />
            <span style={{ color: "hsl(155, 83%, 28%)" }}>em um só lugar</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 75, damping: 18, delay: 0.1 }}
          className="text-base text-muted-foreground leading-relaxed max-w-sm lg:ml-auto"
        >
          Estrutura completa com laboratório, diagnóstico por imagem e atendimento especializado para cuidar do seu pet com excelência.
        </motion.p>
      </div>

      {/* Hospital — full-width horizontal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 75, damping: 16 }}
        className="mb-5"
      >
        <HospitalCard pillar={pillars[0]} />
      </motion.div>

      {/* Neolab + Innova — 2 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {([pillars[1], pillars[2]] as const).map((pillar, i) => (
          <motion.div
            key={pillar.title}
            className="flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 75, damping: 16, delay: (i + 1) * 0.1 }}
          >
            <NarrowCard pillar={pillar} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProps;
