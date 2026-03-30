import { Phone, Clock, Instagram, Facebook, MapPin, ExternalLink, Mail } from "lucide-react";
import { motion } from "framer-motion";
import logoFull from "@/assets/logo-full.png";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

const units = [
  { name: "Casa Forte", address: "Estr. do Encanamento, 585", link: "https://share.google/KdGA0GIwjDhWEdQu6" },
  { name: "Madalena", address: "Av. Visc. de Albuquerque, 894", link: "https://share.google/MxoNRPUdrndN78D0M" },
  { name: "Boa Viagem", address: "Av. Eng. Domingos Ferreira, 3628", link: "https://share.google/nNducPeQ5eSCLwDwv" },
];

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "hsl(170 35% 6%)" }}
    >
      {/* Watermark */}
      <img
        src={simboloHarmonia}
        alt=""
        className="absolute right-[-100px] bottom-[-80px] w-[420px] h-[420px] object-contain opacity-[0.035] pointer-events-none select-none"
      />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={logoFull}
              alt="Hospital Veterinário Harmonia"
              className="h-10 brightness-0 invert mb-5 opacity-90"
            />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              Hospital Veterinário referência em medicina de alta complexidade em Recife, PE.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/hospitalveterinarioharmonia" },
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/hospitalveterinarioharmonia/" },
              ].map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border transition-colors"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Unidades */}
          <div>
            <h4
              className="text-sm font-semibold mb-5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Unidades
            </h4>
            <ul className="space-y-4">
              {units.map((u) => (
                <li key={u.name}>
                  <a
                    href={u.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-0.5 transition-colors"
                  >
                    <span
                      className="text-sm font-medium group-hover:text-white transition-colors flex items-center gap-1.5"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {u.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {u.address}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4
              className="text-sm font-semibold mb-5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Contato
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=558131267555&text=Ol%C3%A1!%20vim%20pelo%20site%20e%20tenho%20interesse%20nos%20servi%C3%A7os%20do%20hospital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                  </svg>
                  (81) 3126-7555
                </a>
              </li>
              <li>
                <a
                  href="mailto:adm@hospitalharmonia.vet.br"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
                  adm@hospitalharmonia.vet.br
                </a>
              </li>
            </ul>
          </div>

          {/* Horários */}
          <div>
            <h4
              className="text-sm font-semibold mb-5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Horário
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>
                  Emergência:{" "}
                  <strong style={{ color: "hsl(155 83% 55%)" }}>24 horas</strong>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>
                  Consultas:{" "}
                  <strong style={{ color: "hsl(155 83% 55%)" }}>24 horas</strong>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <span>3 unidades em Recife, PE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            © {new Date().getFullYear()} Hospital Veterinário Harmonia. Todos os direitos reservados.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            CFMV · Medicina Veterinária de Alta Complexidade · Recife, PE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
