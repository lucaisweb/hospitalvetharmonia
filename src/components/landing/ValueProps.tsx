import { motion } from "framer-motion";
import { Clock, Microscope, Heart } from "lucide-react";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

const pillars = [
{
  icon: Clock,
  title: "Infraestrutura 24 Horas",
  description: "UTI moderna, centro cirúrgico completo e internação monitorada por quem entende de verdade."
},
{
  icon: Microscope,
  title: "Pioneirismo Técnico",
  description: "Liderança no Nordeste em procedimentos avançados, como medicina regenerativa (células-tronco) e cirurgias complexas."
},
{
  icon: Heart,
  title: "Dengoterapia",
  description: "Não tratamos apenas o sintoma, cuidamos do bem-estar emocional do pet com protocolos de atendimento gentil."
}];


const ValueProps = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <img
        src={simboloHarmonia}
        alt=""
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] object-contain pointer-events-none select-none brightness-0 invert"
        style={{ opacity: 0.07 }}
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cuidado completo em um só lugar!

            <span className="text-gradient-primary">Harmonia</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Três pilares que fazem a diferença na vida do seu pet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/50">
            
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default ValueProps;