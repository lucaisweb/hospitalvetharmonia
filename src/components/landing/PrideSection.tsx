import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, ShieldCheck, MapPin, Stethoscope } from "lucide-react";
import WordReveal from "@/components/ui/word-reveal";
import HolographicBadge from "@/components/ui/holographic-badge";
import seloPernambucano from "@/assets/selo-pernambucano.png";
import recifeSkyline from "@/assets/recife-skyline.png";

const achievements = [
  { icon: Award, label: "30+ Anos", sublabel: "de excelência" },
  { icon: ShieldCheck, label: "CRMV-PE", sublabel: "credenciado" },
  { icon: MapPin, label: "3 Unidades", sublabel: "em Recife" },
  { icon: Stethoscope, label: "25+", sublabel: "especialidades" },
];

const PrideSection = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);
  const sealY = useTransform(scrollYProgress, [0, 1], ["36px", "-36px"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, hsl(160 56% 14%) 0%, hsl(155 50% 10%) 50%, hsl(160 56% 14%) 100%)" }}
    >
      {/* Background skyline image */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <img
          src={recifeSkyline}
          alt=""
          className="w-full h-full object-cover object-bottom"
          style={{ opacity: 0.06 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, hsl(155 50% 10%) 0%, transparent 40%, hsl(155 50% 10%) 100%)" }}
        />
      </motion.div>

      {/* Decorative lines top/bottom */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsla(43,60%,60%,0.3)] to-transparent z-10" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsla(43,60%,60%,0.3)] to-transparent z-10" />

      {/* Animated radial gold pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          className="w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, hsla(43,60%,50%,0.08) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,220,100,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main content — split */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Seal — bigger, parallax */}
          <motion.div
            style={{ y: sealY }}
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.82, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ type: "spring", stiffness: 65, damping: 16 }}
          >
            <HolographicBadge
              src={seloPernambucano}
              alt="Pernambucano com Orgulho — Hospital Veterinário Harmonia"
              className="w-72 md:w-84 lg:w-96"
            />
          </motion.div>

          {/* Text — parallax */}
          <motion.div style={{ y: textY }} className="max-w-xl flex-1">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.08 }}
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "hsl(43 60% 65%)" }}
            >
              Orgulho Pernambucano
            </motion.p>

            <h2
              className="font-display font-black tracking-tighter leading-[1.1] mb-6"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", color: "hsl(43, 60%, 78%)" }}
            >
              <WordReveal text="Nascemos em Pernambuco," delay={0.1} stagger={0.09} />
              <br />
              <span style={{ color: "white" }}>
                <WordReveal text="e nos tornamos referência" delay={0.4} stagger={0.08} />
              </span>
              <br />
              <WordReveal text="no Brasil." delay={0.75} stagger={0.12} />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 75, damping: 18, delay: 0.2 }}
              className="text-base leading-relaxed mb-10"
              style={{ color: "hsl(160, 15%, 65%)" }}
            >
              Há mais de 30 anos somos referência em medicina veterinária de alta
              complexidade. Orgulho de nossas raízes pernambucanas, levando
              excelência e cuidado para todo o país.
            </motion.p>

            {/* Achievement badges grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.15 + i * 0.08 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center cursor-default"
                  style={{
                    backgroundColor: "hsla(155, 50%, 18%, 0.55)",
                    border: "1px solid hsla(43, 60%, 50%, 0.18)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "hsla(43, 60%, 50%, 0.15)" }}
                  >
                    <a.icon className="w-4.5 h-4.5" style={{ color: "hsl(43 60% 68%)" }} strokeWidth={1.75} />
                  </div>
                  <p
                    className="font-display font-black tracking-tighter leading-none"
                    style={{ fontSize: "1.1rem", color: "hsl(43 60% 72%)" }}
                  >
                    {a.label}
                  </p>
                  <p className="text-[11px] leading-tight" style={{ color: "hsl(160 15% 55%)" }}>
                    {a.sublabel}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrideSection;
