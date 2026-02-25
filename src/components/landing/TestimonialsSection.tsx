import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "O atendimento na emergência salvou o meu cachorro. A equipe é impecável e super carinhosa!",
    author: "Mariana S.",
    pet: "Tutora do Thor",
  },
  {
    text: "Minha gatinha passou por uma cirurgia complexa e foi tratada com tanto carinho. Recomendo de olhos fechados.",
    author: "Ricardo L.",
    pet: "Tutor da Luna",
  },
  {
    text: "A dengoterapia fez toda diferença na recuperação do Bob. Ele saiu de lá feliz e saudável!",
    author: "Carolina M.",
    pet: "Tutora do Bob",
  },
];

const stats = [
  { value: "+15", label: "Anos de história" },
  { value: "3", label: "Unidades em Recife" },
  { value: "+2.000", label: "Pets cuidados/mês" },
];

const TestimonialsSection = () => {
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
            O que dizem os tutores
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-card-foreground mb-6 leading-relaxed italic">"{t.text}"</p>
              <div>
                <p className="font-semibold text-card-foreground">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.pet}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
