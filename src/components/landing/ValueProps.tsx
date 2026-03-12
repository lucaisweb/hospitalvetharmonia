import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Microscope, Heart } from "lucide-react";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";
import logoHarmonia from "@/assets/logo-symbol.png";
import logoInnova from "@/assets/logo-innova.png";
import logoNeolab from "@/assets/logo-neolab.png";

const pillars = [
  {
    icon: Clock,
    title: "Infraestrutura 24 Horas",
    description: "UTI moderna, centro cirúrgico completo e internação monitorada por quem entende de verdade.",
    logo: logoHarmonia,
    logoAlt: "Hospital Harmonia",
    balloon: "O Hospital Veterinário Harmonia oferece infraestrutura completa 24h, com UTI, centro cirúrgico e internação para cuidar do seu pet a qualquer momento.",
    whatsappMsg: "Olá! Gostaria de saber mais sobre a infraestrutura 24h do Hospital Harmonia.",
  },
  {
    icon: Microscope,
    title: "Pioneirismo Técnico",
    description: "Liderança no Nordeste em procedimentos avançados, como medicina regenerativa (células-tronco) e cirurgias complexas.",
    logo: logoInnova,
    logoAlt: "Innova Imagem Veterinária",
    balloon: "A Innova Imagem Veterinária é referência em diagnóstico por imagem avançado, oferecendo exames de alta precisão como tomografia, ressonância e ultrassonografia.",
    whatsappMsg: "Olá! Gostaria de saber mais sobre os serviços da Innova Imagem Veterinária.",
  },
  {
    icon: Heart,
    title: "Dengoterapia",
    description: "Não tratamos apenas o sintoma, cuidamos do bem-estar emocional do pet com protocolos de atendimento gentil.",
    logo: logoNeolab,
    logoAlt: "Neolab",
    balloon: "O Neolab é o laboratório de análises clínicas veterinárias que garante resultados rápidos e precisos para o diagnóstico do seu pet.",
    whatsappMsg: "Olá! Gostaria de saber mais sobre os serviços do Neolab.",
  },
];

const PillarCard = ({ pillar, i }: { pillar: typeof pillars[0]; i: number }) => {
  const [showBalloon, setShowBalloon] = useState(false);

  const whatsappLink = `https://wa.me/558131267555?text=${encodeURIComponent(pillar.whatsappMsg)}`;

  return (
    <motion.div
      key={pillar.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/50 flex flex-col items-center justify-center"
    >
      {/* Logo com hover/touch */}
      <div
        className="relative w-full"
        onMouseEnter={() => setShowBalloon(true)}
        onMouseLeave={() => setShowBalloon(false)}
      >
        <div
          className="w-full flex items-center justify-center p-6 rounded-xl bg-muted/50 cursor-pointer border border-border/30 hover:border-primary/40 transition-all duration-300 min-h-[120px]"
          onClick={() => setShowBalloon(!showBalloon)}
        >
          <img
            src={pillar.logo}
            alt={pillar.logoAlt}
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* Balão informativo */}
        <AnimatePresence>
          {showBalloon && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-3 z-20 bg-popover border border-border rounded-xl p-4 shadow-lg"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-popover border-l border-t border-border" />
              <p className="text-popover-foreground text-sm leading-relaxed mb-4 relative z-10">
                {pillar.balloon}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
                Saiba mais
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ValueProps = () => {
  return (
    <section className="pt-24 pb-40 bg-background relative overflow-visible">
      <img
        src={simboloHarmonia}
        alt=""
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] object-contain pointer-events-none select-none"
        style={{ opacity: 0.07, filter: "brightness(0) saturate(100%) invert(38%) sepia(91%) saturate(487%) hue-rotate(101deg) brightness(95%) contrast(92%)" }}
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cuidado completo em um só lugar!
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Três pilares que fazem a diferença na vida do seu pet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
