import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Tag } from "lucide-react";

import imgClinicaGeral from "@/assets/specialties/clinica-geral.jpg";
import imgCirurgia from "@/assets/specialties/cirurgia.jpg";
import imgInternacao from "@/assets/specialties/internacao-uti.jpg";
import imgVacinacao from "@/assets/specialties/vacinacao.jpg";
import imgDiagnostico from "@/assets/specialties/diagnostico-imagem.jpg";
import imgCardiologia from "@/assets/specialties/cardiologia.jpg";
import imgAnimais from "@/assets/specialties/animais-silvestres.jpg";

const WHATSAPP = "https://api.whatsapp.com/send?phone=558131267555&text=Ol%C3%A1!%20vim%20pelo%20site%20e%20tenho%20interesse%20nos%20servi%C3%A7os%20do%20hospital";

const services = [
  {
    name: "Clínica Geral",
    desc: "Consultas, check-ups e acompanhamento preventivo para cães, gatos e animais silvestres.",
    details:
      "Nossa Clínica Geral realiza consultas completas com anamnese detalhada, exame físico sistemático e orientação preventiva. Atendemos cães, gatos e animais silvestres, com médicos veterinários clínicos de ampla experiência. Oferecemos consultas de rotina, acompanhamento de condições crônicas, solicitação de exames complementares e elaboração de plano terapêutico individualizado para cada paciente.",
    img: imgClinicaGeral,
    tag: "Atendimento",
    wide: true,
  },
  {
    name: "Cirurgia Veterinária",
    desc: "Procedimentos cirúrgicos de alta complexidade com equipe especializada e centro cirúrgico completo.",
    details:
      "Nosso centro cirúrgico é equipado com monitores multiparamétricos, aparelhos de anestesia inalatória de última geração e instrumentação especializada. Realizamos procedimentos de alta complexidade nas áreas de tecidos moles e ortopedia, sempre com suporte de anestesiologistas veterinários e equipe de enfermagem dedicada durante todo o perioperatório.",
    img: imgCirurgia,
    tag: "Alta Complexidade",
    wide: false,
  },
  {
    name: "Internação Monitorada",
    desc: "Monitoramento contínuo 24 horas com equipe técnica dedicada ao conforto e recuperação do paciente.",
    details:
      "Nossa internação oferece monitoramento contínuo 24 horas, com avaliação clínica periódica e cuidados de enfermagem especializados. As áreas são separadas por espécie e porte, garantindo o conforto e a segurança de cada paciente. Suporte ventilatório, hemodinâmico e nutricional disponíveis para casos críticos, com equipe presente em tempo integral.",
    img: imgInternacao,
    tag: "24 Horas",
    wide: false,
  },
  {
    name: "Vacinação",
    desc: "Calendário vacinal completo para todas as espécies, com imunobiológicos de primeira linha.",
    details:
      "Protocolo vacinal individualizado para cada paciente, com imunobiológicos de primeira linha armazenados em cadeia de frio rigorosamente controlada. Aplicamos vacinas V8, V10, Antirrábica, Gripe, Giardíase e Leishmaniose, entre outras. Emitimos carteira de vacinação atualizada e enviamos lembretes de reforço para facilitar o acompanhamento preventivo do seu animal.",
    img: imgVacinacao,
    tag: "Preventivo",
    wide: false,
  },
  {
    name: "Diagnóstico por Imagem",
    desc: "Raio-x, ultrassonografia, tomografia e broncoscopia com laudo imediato.",
    details:
      "Nosso setor de imagem — a Inova — realiza Raio-x Geral, Ultrassonografia, Eletrocardiograma, Ecodopolercardiografia, Tomografia, Broncoscopia e Traqueobroncoscopia. Laudos emitidos por médicos veterinários especialistas em diagnóstico por imagem, com resultados disponibilizados em tempo real para agilizar a tomada de decisão clínica.",
    img: imgDiagnostico,
    tag: "Alta Precisão",
    wide: false,
  },
  {
    name: "Cardiologia Veterinária",
    desc: "Ecocardiograma, eletrocardiograma e acompanhamento de cardiopatias com especialistas dedicados.",
    details:
      "Diagnóstico e acompanhamento de cardiopatias com ecocardiografia Doppler colorido, eletrocardiograma, holter e aferição de pressão arterial não invasiva. Atendimento por cardiologista veterinário com ampla experiência em cães e gatos, incluindo elaboração de plano terapêutico e acompanhamento longitudinal para pacientes cardiopatas.",
    img: imgCardiologia,
    tag: "Especialidade",
    wide: false,
  },
  {
    name: "Animais Silvestres",
    desc: "Atendimento especializado para fauna silvestre e exótica — répteis, aves, primatas e mamíferos.",
    details:
      "Atendimento especializado em fauna silvestre e exótica, incluindo répteis, aves, primatas, pequenos mamíferos e animais em reabilitação. Nossa equipe é capacitada em medicina de conservação, com suporte laboratorial, diagnóstico por imagem e instalações específicas para minimizar o estresse do animal durante todo o atendimento.",
    img: imgAnimais,
    tag: "Fauna Silvestre",
    wide: true,
  },
];

/* ── Popup Modal ── */
const ServiceModal = ({
  service,
  onClose,
}: {
  service: typeof services[0];
  onClose: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const whatsappUrl = `https://wa.me/558131267555?text=${encodeURIComponent(
    `Olá! Vim pelo site e gostaria de agendar ${service.name}.`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.78)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 28 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
        style={{
          backgroundColor: "hsl(170 30% 9%)",
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 32px 64px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-52 flex-shrink-0">
          <img src={service.img} alt={service.name} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, hsl(170 30% 9%) 0%, transparent 60%)" }}
          />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
          {/* Tag */}
          <span
            className="absolute top-4 left-4 inline-flex items-center font-semibold rounded-full overflow-hidden select-none"
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              height: "26px",
              paddingLeft: "10px",
              paddingRight: "3px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {service.tag}
            <span
              className="ml-2 flex-shrink-0 flex items-center justify-center rounded-full"
              style={{ width: "18px", height: "18px", backgroundColor: "rgba(255,255,255,0.14)" }}
            >
              <ArrowUpRight style={{ width: "9px", height: "9px", opacity: 0.7 }} />
            </span>
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3
            className="font-display font-bold text-white tracking-tight mb-3 leading-tight"
            style={{ fontSize: "1.55rem" }}
          >
            {service.name}
          </h3>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            {service.details}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, hsl(155 83% 28%) 0%, hsl(155 83% 20%) 100%)",
              boxShadow: "0 4px 20px -4px hsl(155 83% 28% / 0.55)",
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            Agendar via WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 75, damping: 16 } },
};

/* ── Photo-backed service card ── */
const ServiceCard = ({
  service,
  className = "",
  onOpen,
}: {
  service: typeof services[0];
  className?: string;
  onOpen: () => void;
}) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    onClick={onOpen}
    className={`group relative rounded-3xl overflow-hidden cursor-pointer ${className}`}
  >
    {/* Photo zoom */}
    <motion.div
      className="absolute inset-0 z-0"
      variants={{ hover: { scale: 1.06 } }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <img src={service.img} alt={service.name} className="w-full h-full object-cover" />
    </motion.div>

    {/* Dark gradient */}
    <div
      className="absolute inset-0 z-10"
      style={{ background: "linear-gradient(to top, hsl(170 35% 5% / 0.96) 0%, hsl(170 35% 8% / 0.5) 45%, hsl(170 35% 8% / 0.15) 100%)" }}
    />

    {/* Hover wash */}
    <motion.div
      className="absolute inset-0 z-10"
      variants={{ hover: { opacity: 1 } }}
      initial={{ opacity: 0 }}
      style={{ backgroundColor: "hsl(155 83% 18% / 0.18)" }}
      transition={{ duration: 0.35 }}
    />

    {/* Top accent stripe on hover */}
    <motion.div
      className="absolute top-0 left-0 z-20 h-[3px] w-full"
      variants={{ hover: { opacity: 1, scaleX: 1 } }}
      initial={{ opacity: 0, scaleX: 0 }}
      style={{ background: "linear-gradient(to right, hsl(155 83% 50%), hsl(155 83% 30%))", transformOrigin: "left" }}
      transition={{ duration: 0.4 }}
    />

    {/* Content */}
    <div className="relative z-20 h-full p-7 flex flex-col justify-between">
      {/* Tag — button-with-icon style, static */}
      <div>
        <span
          className="relative inline-flex items-center font-semibold rounded-full overflow-hidden select-none"
          style={{
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            height: "28px",
            paddingLeft: "12px",
            paddingRight: "4px",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {service.tag}
          <span
            className="ml-2 flex-shrink-0 flex items-center justify-center rounded-full"
            style={{ width: "20px", height: "20px", backgroundColor: "rgba(255,255,255,0.14)" }}
          >
            <ArrowUpRight style={{ width: "10px", height: "10px", opacity: 0.7 }} />
          </span>
        </span>
      </div>

      {/* Bottom info */}
      <div>
        <h3
          className="font-display font-bold text-white tracking-tight mb-2 leading-tight"
          style={{ fontSize: service.wide ? "1.4rem" : "1.15rem" }}
        >
          {service.name}
        </h3>

        <motion.p
          variants={{ hover: { opacity: 1, y: 0 } }}
          initial={{ opacity: 0.5, y: 6 }}
          transition={{ duration: 0.3 }}
          className="text-sm leading-relaxed mb-5"
          style={{ color: "rgba(255,255,255,0.58)" }}
        >
          {service.desc}
        </motion.p>

        <motion.span
          variants={{ hover: { opacity: 1, x: 0 } }}
          initial={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: "hsl(155 83% 58%)" }}
        >
          Ver detalhes
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
        </motion.span>
      </div>
    </div>
  </motion.div>
);

const ServicesSection = () => {
  const [active, setActive] = useState<typeof services[0] | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <section className="py-28" style={{ backgroundColor: "hsl(170 30% 10%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 75, damping: 18 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14"
          >
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "hsl(155 83% 45%)" }}>
                Serviços Hospitalares
              </p>
              <h2
                className="font-display font-black tracking-tighter leading-none text-white"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)" }}
              >
                Medicina veterinária
                <br />
                <span style={{ color: "hsl(155 83% 48%)" }}>de alta complexidade</span>
              </h2>
            </div>
            <p
              className="text-base leading-relaxed max-w-sm lg:text-right"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Infraestrutura hospitalar completa com equipe multidisciplinar e tecnologia de ponta para o melhor cuidado do seu animal.
            </p>
          </motion.div>

          {/* Bento grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div className="md:col-span-2 lg:col-span-2">
              <ServiceCard service={services[0]} className="min-h-[280px]" onOpen={() => setActive(services[0])} />
            </div>
            <ServiceCard service={services[1]} className="min-h-[280px]" onOpen={() => setActive(services[1])} />
            <ServiceCard service={services[2]} className="min-h-[260px]" onOpen={() => setActive(services[2])} />
            <ServiceCard service={services[3]} className="min-h-[260px]" onOpen={() => setActive(services[3])} />
            <ServiceCard service={services[4]} className="min-h-[260px]" onOpen={() => setActive(services[4])} />
            <ServiceCard service={services[5]} className="min-h-[260px]" onOpen={() => setActive(services[5])} />
            <div className="md:col-span-2 lg:col-span-2">
              <ServiceCard service={services[6]} className="min-h-[260px]" onOpen={() => setActive(services[6])} />
            </div>
          </motion.div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
            className="mt-10 flex items-center gap-3 text-sm"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <div className="w-8 h-[2px] rounded-full flex-shrink-0" style={{ backgroundColor: "hsl(155 83% 35%)" }} />
            <p>
              Todos os serviços disponíveis nas{" "}
              <span className="font-semibold" style={{ color: "hsl(155 83% 45%)" }}>3 unidades em Recife</span>
              {" "}— atendimento de emergência{" "}
              <span className="font-semibold" style={{ color: "hsl(155 83% 45%)" }}>24 horas</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {active && <ServiceModal service={active} onClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default ServicesSection;
