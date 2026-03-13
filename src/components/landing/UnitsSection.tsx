import { motion } from "framer-motion";
import { MapPin, Phone, Navigation } from "lucide-react";
import recifeSkyline from "@/assets/recife-skyline.png";
import recifeBg from "@/assets/recife-bg.png";
import unidadeCasaForte from "@/assets/unidade-casa-forte.png";
import unidadeMadalena from "@/assets/unidade-madalena.png";
import unidadeBoaViagem from "@/assets/unidade-boa-viagem.png";

const units = [
  {
    name: "Casa Forte",
    address: "Estr. do Encanamento, 585 - Casa Forte, Recife - PE, 52070-000",
    phone: "(81) 3126-7555",
    image: unidadeCasaForte,
    mapsLink: "https://share.google/KdGA0GIwjDhWEdQu6",
  },
  {
    name: "Madalena",
    address: "Av. Visc. de Albuquerque, 894 - Madalena, Recife - PE, 50610-090",
    phone: "(81) 3126-7555",
    image: unidadeMadalena,
    mapsLink: "https://share.google/MxoNRPUdrndN78D0M",
  },
  {
    name: "Boa Viagem",
    address: "Av. Eng. Domingos Ferreira, 3628 - Boa Viagem, Recife - PE, 51011-050",
    phone: "(81) 3126-7555",
    image: unidadeBoaViagem,
    mapsLink: "https://share.google/nNducPeQ5eSCLwDwv",
  },
];

const UnitsSection = () => {
  return (
    <section className="relative pt-0 pb-24 overflow-hidden">
      {/* Background image - covers full section including wave area */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${recifeBg})` }}
      />
      <div className="absolute inset-0 bg-background/60" />

      {/* Wave: hero green on top, wave edge reveals the bg image below */}
      <div className="relative w-full overflow-hidden leading-[0] z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="relative block w-full h-[50px] md:h-[70px] lg:h-[100px]"
        >
          {/* Hero green fills from top down to wave curve */}
          <path
            d="M0,0 L1440,0 L1440,50 Q1080,90 720,50 Q360,10 0,50 Z"
            fill="hsl(155, 83%, 22%)"
          />
        </svg>
      </div>

      {/* Marca d'água - Skyline de Recife */}
      <img
        src={recifeSkyline}
        alt=""
        className="absolute bottom-0 left-0 right-0 w-full object-contain pointer-events-none select-none"
        style={{ opacity: 0.06 }}
      />
      <div className="relative z-10 container mx-auto px-6 pt-16">
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
              className="bg-card rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(34,139,34,0.15)] hover:shadow-[0_8px_30px_-4px_rgba(34,139,34,0.25)] transition-all duration-300 border-[3px] border-primary hover:-translate-y-1"
            >
              {/* Satellite map embed */}
              <div className="relative w-full h-48 bg-muted">
                <img
                  src={unit.image}
                  alt={`Unidade ${unit.name}`}
                  className="w-full h-full object-cover"
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

                <div className="flex flex-col gap-3">
                  <a href={`tel:${unit.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline">
                    <Phone className="w-4 h-4" />
                    {unit.phone}
                  </a>
                  <a
                    href={unit.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
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
