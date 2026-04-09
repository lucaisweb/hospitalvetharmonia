/**
 * Footer minimal — SEM links externos, SEM mapa, SEM redes sociais.
 * Objetivo: não tirar o usuário da página. Apenas copyright + CRMV + contato.
 */
const ConversionFooter = () => {
  return (
    <footer
      className="relative py-10 border-t"
      style={{
        backgroundColor: "hsl(170 35% 6%)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-[11px] uppercase tracking-widest font-semibold mb-2" style={{ color: "hsl(155 83% 55%)" }}>
          Hospital Veterinário Harmonia
        </p>
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
          Atendimento 24 horas • Recife, PE • (81) 3126-7555
        </p>
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2026 Hospital Veterinário Harmonia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default ConversionFooter;
