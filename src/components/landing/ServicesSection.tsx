import { motion } from "framer-motion";
import {
  Stethoscope, Scissors, BedDouble, Syringe,
  ScanLine, HeartPulse, PawPrint
} from "lucide-react";

const services = [
  { icon: Stethoscope, name: "Clínica Geral" },
  { icon: Scissors, name: "Cirurgia" },
  { icon: BedDouble, name: "Internação" },
  { icon: Syringe, name: "Vacinação" },
  { icon: ScanLine, name: "Diagnóstico por Imagem" },
  { icon: HeartPulse, name: "Especialidades Veterinárias" },
  { icon: PawPrint, name: "Atendimento a Animais Silvestres" },
];

const ServicesSection = () => {
  return (
    <section className="py-24" style={{ background: "var(--warm-gradient)" }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cuidado Completo em{" "}
            <span className="text-primary">Um Só Lugar</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Conheça nossos serviços e descubra tudo o que oferecemos para o seu pet.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-sm font-semibold text-card-foreground text-center">
                {service.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
