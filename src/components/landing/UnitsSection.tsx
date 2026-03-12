import { motion } from "framer-motion";
import { MapPin, Phone, Navigation } from "lucide-react";
import recifeSkyline from "@/assets/recife-skyline.png";
import recifeBg from "@/assets/recife-bg.png";
import unidadeCasaForte from "@/assets/unidade-casa-forte.png";

const units = [
  {
    name: "Casa Forte",
    address: "Estrada do Encanamento, Nº 585, Casa Forte, Recife – PE",
    phone: "(81) 3333-0001",
    image: unidadeCasaForte,
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1976.5!2d-34.9267!3d-8.0381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDInMTcuMiJTIDM0wrA1NScyNC4xIlc!5e0!3m2!1spt-BR!2sbr!4v1700000000000",
    mapsLink: "https://www.google.com/maps/search/Estrada+do+Encanamento+585+Casa+Forte+Recife+PE",
  },
  {
    name: "Madalena",
    address: "Av. Visconde de Albuquerque, 894, Madalena, Recife – PE",
    phone: "(81) 3333-0002",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1976.5!2d-34.9167!3d-8.0551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDMnMTguNCJTIDM0wrA1NScwMC4xIlc!5e0!3m2!1spt-BR!2sbr!4v1700000000001",
    mapsLink: "https://www.google.com/maps/search/Av+Visconde+de+Albuquerque+894+Madalena+Recife+PE",
  },
  {
    name: "Boa Viagem",
    address: "Av. Eng. Domingos Ferreira, 3628, Boa Viagem, Recife – PE",
    phone: "(81) 3333-0003",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1976.5!2d-34.8867!3d-8.1181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDcnMDUuMiJTIDM0wrA1MycxMi4xIlc!5e0!3m2!1spt-BR!2sbr!4v1700000000002",
    mapsLink: "https://www.google.com/maps/search/Av+Eng+Domingos+Ferreira+3628+Boa+Viagem+Recife+PE",
  },
];

const UnitsSection = () => {
  return (
    <section className="relative pt-32 pb-24 -mt-16 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${recifeBg})` }}
      />
      <div className="absolute inset-0 bg-background/60" />
      {/* Marca d'água - Skyline de Recife */}
      <img
        src={recifeSkyline}
        alt=""
        className="absolute bottom-0 left-0 right-0 w-full object-contain pointer-events-none select-none"
        style={{ opacity: 0.06 }}
      />
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Onde Estamos?</h2>
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
              className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 hover:-translate-y-1"
            >
              {/* Satellite map embed */}
              <div className="relative w-full h-48 bg-muted">
                <iframe
                  src={unit.mapEmbed + "&maptype=satellite"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa ${unit.name}`}
                  className="w-full h-full"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground">{unit.name}</h3>
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{unit.address}</p>

                <div className="flex flex-col gap-2">
                  <a href={`tel:${unit.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline">
                    <Phone className="w-4 h-4" />
                    {unit.phone}
                  </a>
                  <a
                    href={unit.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary/80 text-sm hover:text-primary hover:underline transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Como chegar
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnitsSection;
