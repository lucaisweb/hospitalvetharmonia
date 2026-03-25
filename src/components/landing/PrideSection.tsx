import { motion } from "framer-motion";
import seloPernambucano from "@/assets/selo-pernambucano.png";

const PrideSection = () => {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(160, 56%, 18%) 0%, hsl(155, 50%, 14%) 50%, hsl(160, 56%, 18%) 100%)" }}>
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsla(43, 60%, 55%, 0.12) 0%, transparent 70%)" }}
        />
      </div>

      {/* Subtle gold borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsla(43,60%,60%,0.3)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsla(43,60%,60%,0.3)] to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-8"
        >
          <motion.img
            src={seloPernambucano}
            alt="Pernambucano com Orgulho - Hospital Veterinário Harmonia"
            className="w-64 md:w-72 lg:w-80 h-auto object-contain drop-shadow-[0_0_50px_hsla(43,60%,50%,0.25)]"
            loading="lazy"
            width={1024}
            height={1024}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "hsl(43, 60%, 75%)" }}>
              Nascemos em Pernambuco, crescemos pelo Brasil
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "hsl(160, 15%, 75%)" }}>
              Há mais de 30 anos somos referência em medicina veterinária de alta complexidade.
              Orgulho de nossas raízes pernambucanas, levando excelência e cuidado para todo o país.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrideSection;
