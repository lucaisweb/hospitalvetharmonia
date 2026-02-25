import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

const units = [
  { name: "Casa Forte", address: "Rua Padre Carapuceiro, 123", phone: "(81) 3333-0001" },
  { name: "Madalena", address: "Av. Caxangá, 456", phone: "(81) 3333-0002" },
  { name: "Boa Viagem", address: "Av. Conselheiro Aguiar, 789", phone: "(81) 3333-0003" },
];

const UnitsSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nossas Unidades</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Sempre perto de você, em qualquer ponto do Recife, com a mesma qualidade e padrão de atendimento.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {units.map((unit, i) => (
            <motion.div
              key={unit.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2">{unit.name}</h3>
              <p className="text-muted-foreground mb-4">{unit.address}</p>
              <a href={`tel:${unit.phone}`} className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                <Phone className="w-4 h-4" />
                {unit.phone}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnitsSection;
