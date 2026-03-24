import { motion } from "framer-motion";
import seloPernambucano from "@/assets/selo-pernambucano.png";

const PrideSection = () => {
  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "hsl(40, 30%, 95%)" }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-8"
        >
          <img
            src={seloPernambucano}
            alt="Pernambucano com Orgulho - Hospital Veterinário Harmonia"
            className="w-64 md:w-80 lg:w-96 h-auto object-contain"
          />
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Nascemos em Pernambuco, crescemos pelo Brasil
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Há mais de 30 anos somos referência em medicina veterinária de alta complexidade. 
              Orgulho de nossas raízes pernambucanas, levando excelência e cuidado para todo o país.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrideSection;
