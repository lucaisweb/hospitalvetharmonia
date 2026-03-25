import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { StarButton } from "@/components/ui/star-button";

const specialties = [
  "Aplicação de Microchip",
  "Cirurgia",
  "Clínica Geral",
  "Inseminação Artificial",
  "Internação",
  "Neonatologia",
  "Obstetrícia",
  "Vacinas",
  "Nefrologia",
  "Dermatologia",
  "Anestesia",
  "Oncologia",
  "Acupuntura",
  "Fisioterapia",
  "Ortopedia",
  "Cardiologia",
  "Neurologia",
  "Oftalmologia",
  "Atendimento de Animais Silvestres",
  "Tratamento com Células-Tronco",
  "Banco de Sangue",
  "Nutricionista",
  "Laboratório Próprio",
  "Diagnóstico por Imagem",
];

const SpecialtiesSection = () => {
  const half = Math.ceil(specialties.length / 2);
  const col1 = specialties.slice(0, half);
  const col2 = specialties.slice(half);

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
            Especialidades & Serviços
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tudo o que seu pet precisa, do diagnóstico ao tratamento, sem sair do hospital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto">
          {[col1, col2].map((col, colIdx) => (
            <ul key={colIdx} className="space-y-3">
              {col.map((name, i) => (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{name}</span>
                </motion.li>
              ))}
            </ul>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href="https://wa.me/558131267555?text=Olá! Gostaria de tirar dúvidas sobre as especialidades do Hospital Harmonia."
            target="_blank"
            rel="noopener noreferrer"
          >
            <StarButton
              lightColor="#16a34a"
              backgroundColor="hsl(155, 83%, 30%)"
              className="rounded-2xl px-6 py-3 h-auto"
            >
              <span className="flex items-center gap-2 text-primary-foreground font-semibold text-base relative z-10 bg-none bg-clip-border [-webkit-text-fill-color:unset]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                Clique aqui e tire suas dúvidas pelo WhatsApp
              </span>
            </StarButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
