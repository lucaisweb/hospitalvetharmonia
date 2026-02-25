import { motion } from "framer-motion";
import {
  HeartPulse, Brain, Eye, Bone, Stethoscope, Syringe,
  FlaskConical, ScanLine, Activity, Scissors
} from "lucide-react";

const specialties = [
  { icon: HeartPulse, name: "Cardiologia" },
  { icon: Brain, name: "Neurologia" },
  { icon: Activity, name: "Oncologia" },
  { icon: Eye, name: "Oftalmologia" },
  { icon: Bone, name: "Ortopedia" },
  { icon: Stethoscope, name: "Dermatologia" },
  { icon: Syringe, name: "Acupuntura" },
  { icon: Scissors, name: "Cirurgia" },
  { icon: FlaskConical, name: "Laboratório Próprio" },
  { icon: ScanLine, name: "Diagnóstico por Imagem" },
];

const SpecialtiesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Especialidades & Exames
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tudo o que seu pet precisa, do diagnóstico ao tratamento, sem sair do hospital.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {specialties.map((spec, i) => (
            <motion.div
              key={spec.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <spec.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-card-foreground text-center">{spec.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
