import { motion } from "framer-motion";
import FlowButton from "@/components/ui/flow-button";

import imgClinicaGeral from "@/assets/specialties/clinica-geral.jpg";
import imgCirurgia from "@/assets/specialties/cirurgia.jpg";
import imgInternacao from "@/assets/specialties/internacao-uti.jpg";
import imgVacinacao from "@/assets/specialties/vacinacao.jpg";
import imgDiagnostico from "@/assets/specialties/diagnostico-imagem.jpg";
import imgCardiologia from "@/assets/specialties/cardiologia.jpg";
import imgOftalmologia from "@/assets/specialties/oftalmologia.jpg";
import imgOrtopedia from "@/assets/specialties/ortopedia.jpg";
import imgOncologia from "@/assets/specialties/oncologia.jpg";
import imgAnimais from "@/assets/specialties/animais-silvestres.jpg";
import imgDermatologia from "@/assets/specialties/dermatologia.jpg";
import imgNeurologia from "@/assets/specialties/neurologia.jpg";

const imageRow1 = [
  { label: "Clínica Geral", img: imgClinicaGeral },
  { label: "Cirurgia", img: imgCirurgia },
  { label: "Internação", img: imgInternacao },
  { label: "Vacinação", img: imgVacinacao },
  { label: "Diagnóstico por Imagem", img: imgDiagnostico },
  { label: "Cardiologia", img: imgCardiologia },
];

const imageRow2 = [
  { label: "Oftalmologia", img: imgOftalmologia },
  { label: "Ortopedia", img: imgOrtopedia },
  { label: "Oncologia", img: imgOncologia },
  { label: "Animais Silvestres", img: imgAnimais },
  { label: "Dermatologia", img: imgDermatologia },
  { label: "Neurologia", img: imgNeurologia },
];

const allSpecialties = [
  "Aplicação de Microchip", "Cirurgia", "Clínica Geral", "Inseminação Artificial",
  "Internação", "Neonatologia", "Obstetrícia", "Vacinas", "Nefrologia",
  "Dermatologia", "Anestesia", "Oncologia", "Acupuntura", "Fisioterapia",
  "Ortopedia", "Cardiologia", "Neurologia", "Oftalmologia", "Animais Silvestres",
  "Nutricionista", "Laboratório Próprio", "Diagnóstico por Imagem",
];

const WA_URL = "https://api.whatsapp.com/send?phone=558131267555&text=Ol%C3%A1!%20vim%20pelo%20site%20e%20tenho%20interesse%20nos%20servi%C3%A7os%20do%20hospital";

/* ── Single image card in the marquee ── */
const ImageCard = ({ label, img }: { label: string; img: string }) => (
  <div
    className="relative flex-shrink-0 rounded-2xl overflow-hidden mx-2.5"
    style={{ width: "320px", height: "200px" }}
  >
    <img src={img} alt={label} className="w-full h-full object-cover" />
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(to top, hsl(170 35% 5% / 0.92) 0%, hsl(170 35% 8% / 0.3) 55%, transparent 100%)" }}
    />
    <div className="absolute bottom-0 inset-x-0 p-4">
      <p className="text-white font-display font-bold tracking-tight leading-tight" style={{ fontSize: "1rem" }}>
        {label}
      </p>
    </div>
    <div
      className="absolute top-0 left-0 right-0 h-[2px]"
      style={{ background: "linear-gradient(to right, hsl(155 83% 40%), transparent)" }}
    />
  </div>
);

const ImageMarqueeRow = ({
  items,
  reverse = false,
  duration = "40s",
}: {
  items: typeof imageRow1;
  reverse?: boolean;
  duration?: string;
}) => {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div
        className={reverse ? "animate-marquee-reverse" : "animate-marquee"}
        style={{ display: "flex", width: "max-content", "--marquee-duration": duration } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <ImageCard key={i} label={item.label} img={item.img} />
        ))}
      </div>
    </div>
  );
};

const SpecialtiesSection = () => (
  <section className="py-24 overflow-hidden" style={{ backgroundColor: "hsl(170 35% 8%)" }}>
    {/* Header */}
    <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 75, damping: 18 }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
      >
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "hsl(155 83% 50%)" }}>
            Especialidades Médico-Veterinárias
          </p>
          <h2
            className="font-display font-black tracking-tighter leading-none text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}
          >
            25+ especialidades
            <br />
            <span style={{ color: "hsl(155 83% 48%)" }}>em um só lugar</span>
          </h2>
        </div>
        <p className="text-base leading-relaxed max-w-sm lg:text-right" style={{ color: "rgba(255,255,255,0.45)" }}>
          Equipe multidisciplinar com formação especializada, dedicada ao diagnóstico preciso e tratamento eficaz do seu animal.
        </p>
      </motion.div>
    </div>

    {/* Marquees */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.7 }}
      className="mb-3"
    >
      <ImageMarqueeRow items={imageRow1} duration="42s" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="mb-16"
    >
      <ImageMarqueeRow items={imageRow2} reverse duration="36s" />
    </motion.div>

    {/* All specialties list */}
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 h-px origin-left"
        style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
      />

      {/* Title row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 75, damping: 18 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8"
      >
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "hsl(155 83% 40%)" }}>
            Todas as especialidades disponíveis
          </p>
          <p className="text-white font-display font-bold text-xl mt-1">
            {allSpecialties.length} especialidades
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0"
          style={{ borderColor: "hsl(155 83% 30% / 0.3)", backgroundColor: "hsl(155 83% 28% / 0.1)" }}
        >
          <span className="text-xs font-bold" style={{ color: "hsl(155 83% 50%)" }}>
            {allSpecialties.length}
          </span>
        </div>
      </motion.div>

      {/* Pills */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 75, damping: 18, delay: 0.05 }}
        className="flex flex-wrap gap-2.5 mb-12"
      >
        {allSpecialties.map((s, i) => (
          <span
            key={s}
            className="px-4 py-2 rounded-full text-sm font-medium border"
            style={{
              background: i % 5 === 0 ? "hsl(155 83% 28% / 0.18)" : "rgba(255,255,255,0.03)",
              borderColor: i % 5 === 0 ? "hsl(155 83% 30% / 0.35)" : "rgba(255,255,255,0.07)",
              color: i % 5 === 0 ? "hsl(155 83% 58%)" : "rgba(255,255,255,0.5)",
              letterSpacing: "0.01em",
            }}
          >
            {s}
          </span>
        ))}
      </motion.div>

      {/* CTA — centrado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className="flex flex-col items-center gap-5"
      >
        <p className="text-sm font-medium text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
          Disponível nas 3 unidades — Casa Forte, Madalena e Boa Viagem
        </p>
        <FlowButton href={WA_URL}>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            Agendar consulta pelo WhatsApp
          </span>
        </FlowButton>
      </motion.div>
    </div>
  </section>
);

export default SpecialtiesSection;
