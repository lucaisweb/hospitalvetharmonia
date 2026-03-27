import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Navigation, Clock, MapPin, MousePointer2 } from "lucide-react";
import unidadeCasaForte from "@/assets/unidade-casa-forte.png";
import unidadeMadalena from "@/assets/unidade-madalena.png";
import unidadeBoaViagem from "@/assets/unidade-boa-viagem.png";

const WA_URL =
  "https://api.whatsapp.com/send?phone=558131267555&text=Ol%C3%A1!%20vim%20pelo%20site%20e%20tenho%20interesse%20nos%20servi%C3%A7os%20do%20hospital";
const TEL = "tel:558131267555";

const units = [
  {
    name: "Casa Forte",
    number: "01",
    neighborhood: "Recife Norte",
    address: "Estr. do Encanamento, 585 — Casa Forte",
    phone: "(81) 3126-7555",
    image: unidadeCasaForte,
    mapsLink: "https://share.google/KdGA0GIwjDhWEdQu6",
    hours: "24h",
  },
  {
    name: "Madalena",
    number: "02",
    neighborhood: "Zona Oeste",
    address: "Av. Visc. de Albuquerque, 894 — Madalena",
    phone: "(81) 3126-7555",
    image: unidadeMadalena,
    mapsLink: "https://share.google/MxoNRPUdrndN78D0M",
    hours: "24h",
  },
  {
    name: "Boa Viagem",
    number: "03",
    neighborhood: "Zona Sul",
    address: "Av. Eng. Domingos Ferreira, 3628 — Boa Viagem",
    phone: "(81) 3126-7555",
    image: unidadeBoaViagem,
    mapsLink: "https://share.google/nNducPeQ5eSCLwDwv",
    hours: "24h",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 75, damping: 16 } },
};

/* ── Badge 24h — desktop → WhatsApp, mobile → tel ── */
const Badge24h = ({ unit }: { unit: typeof units[0] }) => (
  <>
    {/* Desktop: WhatsApp */}
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="absolute top-5 right-5 z-20 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
      style={{ backgroundColor: "hsl(155 83% 28% / 0.9)", color: "white", backdropFilter: "blur(8px)" }}
      title="Emergência 24h — Falar pelo WhatsApp"
    >
      <Clock className="w-3 h-3" strokeWidth={2.5} />
      {unit.hours}
    </a>
    {/* Mobile: Phone call */}
    <a
      href={TEL}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-5 right-5 z-20 flex md:hidden items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
      style={{ backgroundColor: "hsl(155 83% 28% / 0.9)", color: "white", backdropFilter: "blur(8px)" }}
      title="Ligar agora"
    >
      <Clock className="w-3 h-3" strokeWidth={2.5} />
      {unit.hours}
    </a>
  </>
);

const UnitCard = ({ unit }: { unit: typeof units[0] }) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    onClick={() => window.open(unit.mapsLink, "_blank", "noopener,noreferrer")}
    className="group relative rounded-3xl overflow-hidden cursor-pointer select-none"
    style={{ height: "440px" }}
  >
    {/* Image zoom */}
    <motion.div
      className="absolute inset-0 z-0"
      variants={{ hover: { scale: 1.07 } }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <img src={unit.image} alt={`Unidade ${unit.name}`} className="w-full h-full object-cover" />
    </motion.div>

    {/* Base gradient */}
    <div
      className="absolute inset-0 z-10"
      style={{ background: "linear-gradient(to top, hsl(170 35% 5% / 0.97) 0%, hsl(170 35% 8% / 0.55) 50%, transparent 100%)" }}
    />

    {/* Hover color wash */}
    <motion.div
      className="absolute inset-0 z-10"
      variants={{ hover: { opacity: 1 } }}
      initial={{ opacity: 0 }}
      style={{ backgroundColor: "hsl(155 83% 20% / 0.18)" }}
      transition={{ duration: 0.35 }}
    />

    {/* Number watermark */}
    <div
      className="absolute bottom-0 right-3 z-10 select-none pointer-events-none leading-none"
      style={{ fontFamily: "var(--font-display)", fontSize: "9rem", fontWeight: 900, color: "rgba(255,255,255,0.035)", letterSpacing: "-0.04em", lineHeight: 1 }}
    >
      {unit.number}
    </div>

    {/* 24h badge — smart link */}
    <Badge24h unit={unit} />

    {/* Left accent stripe */}
    <motion.div
      className="absolute top-0 left-0 z-20 w-[3px] h-full"
      variants={{ hover: { opacity: 1, scaleY: 1 } }}
      initial={{ opacity: 0, scaleY: 0 }}
      style={{ background: "linear-gradient(to bottom, hsl(155 83% 55%), hsl(155 83% 28%))", transformOrigin: "top" }}
      transition={{ duration: 0.35 }}
    />

    {/* Content */}
    <div className="absolute inset-x-0 bottom-0 z-20 p-6">
      <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "hsl(155 83% 62%)" }}>
        {unit.neighborhood}
      </p>

      <h3 className="font-display font-black text-2xl text-white tracking-tight mb-2">{unit.name}</h3>

      <motion.div
        variants={{ hover: { opacity: 1, y: 0 } }}
        initial={{ opacity: 0.55, y: 6 }}
        transition={{ duration: 0.32 }}
      >
        <p className="text-sm text-white/55 mb-4 leading-relaxed">{unit.address}</p>

        <div className="flex items-center justify-between gap-3">
          {/* Phone — stops propagation so card doesn't open maps */}
          <a
            href={`tel:${unit.phone.replace(/\D/g, "")}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={2} />
            {unit.phone}
          </a>

          {/* "Como chegar" button */}
          <motion.a
            href={unit.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, hsl(155 83% 30%) 0%, hsl(155 83% 24%) 100%)",
              boxShadow: "0 4px 14px -4px hsl(155 83% 28% / 0.55)",
            }}
          >
            <Navigation className="w-3.5 h-3.5" strokeWidth={2.5} />
            Como chegar
          </motion.a>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const UnitsSection = () => {
  const [mapActive, setMapActive] = useState(false);

  return (
  <section className="py-28" style={{ backgroundColor: "hsl(40 33% 97%)" }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 75, damping: 18 }}
        className="mb-16"
      >
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "hsl(155 83% 33%)" }}>
          Onde estamos
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <h2
            className="font-display font-black tracking-tighter leading-none"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: "hsl(170 30% 12%)" }}
          >
            3 unidades para
            <br />
            <span style={{ color: "hsl(155 83% 30%)" }}>atender você</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-sm leading-relaxed">
            Sempre perto de você, em qualquer ponto do Recife, com o mesmo padrão de excelência.
          </p>
        </div>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-80px" }}
        className="grid md:grid-cols-3 gap-5"
      >
        {units.map((unit) => (
          <UnitCard key={unit.name} unit={unit} />
        ))}
      </motion.div>

      {/* Map iframe */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.15 }}
        className="mt-10 rounded-3xl overflow-hidden border relative"
        style={{ height: "360px", borderColor: "hsl(40 20% 85%)", boxShadow: "0 8px 32px -8px rgba(0,0,0,0.1)" }}
        onMouseLeave={() => setMapActive(false)}
      >
        {/* Overlay — bloqueia scroll acidental; some ao clicar */}
        {!mapActive && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 cursor-pointer select-none"
            style={{ backgroundColor: "hsl(170 30% 10% / 0.38)", backdropFilter: "blur(1px)" }}
            onClick={() => setMapActive(true)}
          >
            <div
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: "hsl(155 83% 28% / 0.92)", boxShadow: "0 4px 16px -4px hsl(155 83% 28% / 0.6)" }}
            >
              <MousePointer2 className="w-4 h-4" strokeWidth={2} />
              Clique para interagir com o mapa
            </div>
          </div>
        )}

        {/* Wrapper com overflow hidden para cortar a barra superior do embed */}
        <div style={{ position: "relative", height: "calc(100% + 48px)", marginTop: "-48px", overflow: "hidden" }}>
          <iframe
            title="Unidades Hospital Veterinário Harmonia"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/d/u/3/embed?mid=1oJt_p_Vol5PtDQE3QNLnOXIfUfhVNHQ&ehbc=2E312F&noprof=1"
          />
        </div>
      </motion.div>

      {/* Location pills → maps */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
        className="mt-6 flex flex-wrap gap-3"
      >
        {units.map((unit) => (
          <a
            key={unit.name}
            href={unit.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors hover:border-green-600/40 hover:bg-green-50"
            style={{ borderColor: "hsl(40 20% 85%)", color: "hsl(170 30% 18%)" }}
          >
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(155 83% 30%)" }} strokeWidth={2.5} />
            {unit.name} — {unit.address.split(" — ")[0]}
          </a>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
        className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
      >
        <div className="w-8 h-[2px] rounded-full flex-shrink-0" style={{ backgroundColor: "hsl(155 83% 35%)" }} />
        <p>
          Todas as unidades com atendimento de emergência{" "}
          <span className="font-semibold" style={{ color: "hsl(155 83% 30%)" }}>24 horas</span>
        </p>
      </motion.div>
    </div>
  </section>
  );
};

export default UnitsSection;
