import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Instagram } from "lucide-react";

const testimonials = [
  {
    text: "Gostaria de agradecer a toda a equipe do Hospital Harmonia pelo atendimento maravilhoso ao meu menino Simon. Principalmente ao Dr. Jackson, cirurgião, e Dr. Igor, clínico. Vocês são anjos da guarda dos pets na Terra. O cuidado, a dedicação e o carinho foram únicos. Obrigada de coração por vocês existirem!",
    author: "Giovanna",
    pet: "Tutora do Simon",
    initials: "GI",
    source: "Depoimento",
    color: "hsl(155 83% 30%)",
  },
  {
    text: "Passados 40 dias da cirurgia da nossa Meg, gostaríamos de registrar todo nosso amor. Éramos tutores ansiosos, com muitos receios — e fomos acolhidos com paciência e cuidado em cada detalhe. Tudo correu melhor do que imaginávamos. Imensamente obrigada!",
    author: "Priscila",
    pet: "Tutora da Meg",
    initials: "PR",
    source: "Depoimento",
    color: "hsl(12 76% 55%)",
  },
  {
    text: "Foi a primeira vez na clínica. Fiquei muito satisfeita com o atendimento, desde a recepção à moça da limpeza. A veterinária que realizou o exame, a assistente que fez o RX — todos estão de parabéns!",
    author: "Mamãe do Duke",
    pet: "Cliente HV Harmonia",
    initials: "MD",
    source: "Instagram",
    color: "hsl(200 75% 42%)",
  },
  {
    text: "Profissionais competentes e a Dra. Cintia sempre dando um atendimento diferenciado e humanizado para o nosso cão!",
    author: "Érica Marques",
    pet: "Tutora",
    initials: "EM",
    source: "Instagram",
    color: "hsl(155 83% 30%)",
  },
  {
    text: "Confiança total nos médicos e funcionários deste hospital!",
    author: "Edla Negreiros",
    pet: "Tutora",
    initials: "EN",
    source: "Instagram",
    color: "hsl(12 76% 55%)",
  },
  {
    text: "Foram muito atenciosos, da recepção ao atendimento médico. Super indico!",
    author: "Tatiana Oliveira",
    pet: "Tutora",
    initials: "TO",
    source: "Instagram",
    color: "hsl(200 75% 42%)",
  },
  {
    text: "Estou encantada com a equipe. Todos muito bem capacitados e pacientes. Meu pet não é muito fácil, mas a equipe foi incrível.",
    author: "Carlos",
    pet: "Tutor do Tony",
    initials: "CA",
    source: "Depoimento",
    color: "hsl(155 83% 30%)",
  },
];

/* Duplicate for seamless marquee */
const marqueeItems = [...testimonials, ...testimonials];

const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
  <div
    className="flex-shrink-0 w-[320px] md:w-[380px] rounded-3xl border p-7 flex flex-col gap-5 mx-3"
    style={{
      backgroundColor: "white",
      borderColor: "hsl(40 20% 87%)",
      boxShadow: "0 4px 20px -8px rgba(0,0,0,0.08)",
    }}
  >
    {/* Stars + source badge */}
    <div className="flex items-start justify-between">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "hsl(43 80% 55%)" }} />
        ))}
      </div>
      {t.source === "Instagram" ? (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full" style={{ backgroundColor: "hsl(320 60% 96%)", color: "hsl(320 60% 45%)" }}>
          <Instagram className="w-2.5 h-2.5" strokeWidth={2.5} />
          Instagram
        </span>
      ) : (
        <Quote className="w-5 h-5 opacity-[0.08]" style={{ color: t.color }} />
      )}
    </div>

    {/* Text */}
    <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(170 20% 28%)" }}>
      "{t.text}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "hsl(40 20% 92%)" }}>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ backgroundColor: t.color }}
      >
        {t.initials}
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: "hsl(170 30% 14%)" }}>
          {t.author}
        </p>
        <p className="text-xs" style={{ color: "hsl(170 15% 52%)" }}>
          {t.pet}
        </p>
      </div>
    </div>
  </div>
);

/* ── Draggable infinite marquee ── */
const DraggableMarquee = () => {
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Pointer-based drag (works for mouse + pen) */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    setPaused(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = trackRef.current?.scrollLeft ?? 0;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !trackRef.current) return;
    const delta = dragStartX.current - e.clientX;
    trackRef.current.scrollLeft = dragStartScroll.current + delta;
  };

  const onPointerUp = () => {
    setDragging(false);
    setPaused(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="relative"
    >
      {/* Fade edge masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, white, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, white, transparent)" }}
      />

      {/* Hint label */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-300 flex items-center gap-1.5 text-[10px] font-medium tracking-wide"
        style={{ color: "hsl(155 83% 33%)", opacity: paused ? 1 : 0 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        Pausado — solte para retomar
      </div>

      {/* Scrollable track (CSS animation when not paused, scrollable when dragging) */}
      <div
        ref={trackRef}
        className="overflow-hidden pb-6"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        /* Touch fallback */
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="flex animate-marquee"
          style={{
            width: "max-content",
            "--marquee-duration": "50s",
            animationPlayState: paused ? "paused" : "running",
            userSelect: "none",
          } as React.CSSProperties}
        >
          {marqueeItems.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-28 overflow-hidden" style={{ backgroundColor: "white" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 75, damping: 18 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "hsl(155 83% 33%)" }}
            >
              Depoimentos
            </p>
            <h2
              className="font-display font-black tracking-tighter leading-none"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: "hsl(170 30% 12%)" }}
            >
              O que dizem
              <br />
              <span style={{ color: "hsl(155 83% 30%)" }}>os tutores</span>
            </h2>
          </div>

          <motion.a
            href="https://wa.me/558131267555?text=Olá! Gostaria de agendar uma consulta no Hospital Harmonia."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white text-sm self-start"
            style={{
              background: "linear-gradient(135deg, hsl(155 83% 28%) 0%, hsl(155 83% 22%) 100%)",
              boxShadow: "0 6px 20px -6px hsl(155 83% 28% / 0.5)",
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            Agendar consulta
          </motion.a>
        </motion.div>
      </div>

      {/* Infinite marquee carousel — arrastar para pausar */}
      <DraggableMarquee />
    </section>
  );
};

export default TestimonialsSection;
