import { Phone, Clock, Instagram, Facebook, MapPin } from "lucide-react";
import logoFull from "@/assets/logo-full.png";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Marca d'água */}
      <img
        src={simboloHarmonia}
        alt=""
        className="absolute right-[-80px] bottom-[-60px] w-[400px] h-[400px] object-contain opacity-[0.04] pointer-events-none select-none"
      />
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logoFull} alt="Hospital Veterinário Harmonia" className="h-12 brightness-0 invert mb-3" />
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Hospital Veterinário referência em medicina de alta complexidade em Recife.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground/80">Contato</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:08133330001" className="hover:text-primary-foreground transition-colors">(81) 3333-0001</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                WhatsApp: (81) 99999-0001
              </li>
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground/80">Horário</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Emergência: <strong className="text-accent">24 horas</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Consultas: Seg a Sáb, 8h–20h
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground/80">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} Hospital Veterinário Harmonia. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
