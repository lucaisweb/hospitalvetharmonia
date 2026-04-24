import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, ShieldCheck, X } from "lucide-react";
import { submitLead, type LeadPayload } from "@/lib/submit-lead";
import { useTracking } from "@/hooks/use-tracking";

/* ══════════════════════════════════════════════════════════════════════
   Tipos
   ══════════════════════════════════════════════════════════════════════ */

export type DialogIntent = "urgencia" | "consulta" | "agendar" | "whatsapp";

type OpenOptions = {
  intent: DialogIntent;
  /** Pré-seleciona o motivo no form (opcional) */
  preselectMotivo?: string;
};

type CtxValue = {
  open: (opts: OpenOptions) => void;
};

const LeadCaptureContext = createContext<CtxValue | null>(null);

export function useLeadCapture() {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) {
    throw new Error("useLeadCapture deve ser usado dentro de <LeadCaptureProvider>");
  }
  return ctx;
}

/* ══════════════════════════════════════════════════════════════════════
   Schema + valores
   ══════════════════════════════════════════════════════════════════════ */

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome"),
  whatsapp: z
    .string()
    .trim()
    .min(10, "WhatsApp inválido")
    .regex(/^[\d\s()+-]+$/, "Apenas números, ( ) + -"),
  petNome: z.string().trim().max(60).optional().or(z.literal("")),
  motivo: z.string().min(1, "Selecione o motivo"),
});

type FormValues = z.infer<typeof schema>;

const MOTIVOS = [
  "Urgência / Emergência",
  "Consulta / Check-up",
  "Exame ou diagnóstico por imagem",
  "Cirurgia / Pós-operatório",
  "Especialista (cardio, ortopedia, neuro…)",
  "Vacinação",
  "Outro assunto",
];

const WA_NUMBER = "558131267555";

/* ══════════════════════════════════════════════════════════════════════
   Headline contextual por intent
   ══════════════════════════════════════════════════════════════════════ */

function dialogCopy(intent: DialogIntent) {
  switch (intent) {
    case "urgencia":
      return {
        badge: "Urgência 24h",
        badgeColor: "hsl(12 90% 72%)",
        badgeBg: "hsl(12 76% 56% / 0.15)",
        badgeBorder: "hsl(12 76% 56% / 0.4)",
        title: "Preencha para agilizar o atendimento",
        sub: "Nossa equipe já vai receber seus dados e responder em segundos no WhatsApp.",
        submit: "Ir para o WhatsApp",
      };
    case "consulta":
      return {
        badge: "Agendamento",
        badgeColor: "hsl(155 83% 65%)",
        badgeBg: "hsl(155 83% 30% / 0.14)",
        badgeBorder: "hsl(155 83% 30% / 0.32)",
        title: "Preencha para agendar",
        sub: "Mandamos pro WhatsApp com seus dados e o atendimento começa na hora.",
        submit: "Agendar no WhatsApp",
      };
    case "agendar":
    case "whatsapp":
    default:
      return {
        badge: "Fale conosco",
        badgeColor: "hsl(155 83% 65%)",
        badgeBg: "hsl(155 83% 30% / 0.14)",
        badgeBorder: "hsl(155 83% 30% / 0.32)",
        title: "Deixe seus dados",
        sub: "Adiantamos o atendimento — a equipe já vai te receber pronta pra te ajudar.",
        submit: "Falar no WhatsApp",
      };
  }
}

/* ══════════════════════════════════════════════════════════════════════
   Mensagem WhatsApp contextual
   ══════════════════════════════════════════════════════════════════════ */

function buildWaMessage(intent: DialogIntent, v: FormValues): string {
  const pet = v.petNome ? ` (pet: ${v.petNome})` : "";
  const isUrgencia =
    intent === "urgencia" || v.motivo === "Urgência / Emergência";

  if (isUrgencia) {
    return (
      `🚨 *URGÊNCIA* — precisa de atendimento agora!\n\n` +
      `*Nome:* ${v.nome}\n` +
      `*WhatsApp:* ${v.whatsapp}${pet}\n` +
      `*Motivo:* ${v.motivo}\n\n` +
      `Por favor, me atendam o mais rápido possível!`
    );
  }

  const greeting =
    intent === "consulta"
      ? "Olá! Gostaria de agendar uma consulta."
      : "Olá! Vim pelo site e gostaria de atendimento.";

  return (
    `${greeting}\n\n` +
    `*Nome:* ${v.nome}\n` +
    `*WhatsApp:* ${v.whatsapp}${pet}\n` +
    `*Motivo:* ${v.motivo}\n\n` +
    `Quando podem me atender?`
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════════════════════════════ */

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const fieldBase =
  "w-full h-12 px-4 rounded-xl border bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 " +
  "focus:outline-none focus:border-[hsl(155_83%_50%)] focus:bg-white/[0.06] transition-colors";

const selectChevronStyle: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23ffffff66' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 10 13 14 9'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  backgroundSize: "16px",
  paddingRight: "40px",
};

const labelBase =
  "block text-[11px] font-semibold tracking-wider uppercase mb-1.5 text-white/55";

const errorText = "mt-1.5 text-[11px] font-medium text-[hsl(12_85%_68%)]";

/* ══════════════════════════════════════════════════════════════════════
   Provider + Dialog
   ══════════════════════════════════════════════════════════════════════ */

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState<DialogIntent>("agendar");
  const [preselectMotivo, setPreselectMotivo] = useState<string | undefined>();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const tracking = useTracking();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const open = useCallback((opts: OpenOptions) => {
    setIntent(opts.intent);
    setPreselectMotivo(opts.preselectMotivo);
    setSubmitError(null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // ESC fecha
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Lock scroll quando aberto
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [isOpen]);

  const copy = useMemo(() => dialogCopy(intent), [intent]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", whatsapp: "", petNome: "", motivo: "" },
  });

  // Pré-seleciona motivo quando o dialog abre
  useEffect(() => {
    if (isOpen && preselectMotivo) {
      setValue("motivo", preselectMotivo);
    }
  }, [isOpen, preselectMotivo, setValue]);

  // Reset ao fechar
  useEffect(() => {
    if (!isOpen) {
      // pequeno delay pra não piscar conteúdo durante fade-out
      const t = setTimeout(() => reset(), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen, reset]);

  const whatsappValue = watch("whatsapp");

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      const payload: LeadPayload = {
        nome: values.nome,
        whatsapp: values.whatsapp,
        petNome: values.petNome || undefined,
        motivo: values.motivo,
        petEspecie: "",
        unidade: "",
        // Campos extras de tracking — o api/lead.ts vai repassar pra planilha
        ...(tracking as Record<string, string | undefined>),
        intent,
      } as LeadPayload & Record<string, unknown>;

      // 1. Envia lead pro Google Sheets via Vercel Function
      await submitLead(payload);

      // 2. Monta msg WhatsApp e redireciona imediatamente
      const waText = encodeURIComponent(buildWaMessage(intent, values));
      const waUrl = `https://wa.me/${WA_NUMBER}?text=${waText}`;

      // Fecha o modal e abre o WhatsApp numa nova aba
      setIsOpen(false);
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Não conseguimos registrar agora, mas vamos te levar ao WhatsApp assim mesmo.",
      );
      // Mesmo com erro no Sheets, ainda redireciona pro WhatsApp —
      // o objetivo primário é não perder o lead
      setTimeout(() => {
        const waText = encodeURIComponent(buildWaMessage(intent, values));
        window.open(`https://wa.me/${WA_NUMBER}?text=${waText}`, "_blank", "noopener,noreferrer");
        setIsOpen(false);
      }, 1500);
    }
  };

  return (
    <LeadCaptureContext.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm"
            />

            {/* Dialog */}
            <motion.div
              key="dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-dialog-title"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] w-[92vw] max-w-md rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: "hsl(170 35% 9%)",
                borderColor: "rgba(255,255,255,0.1)",
                boxShadow: "0 40px 100px -20px rgba(0,0,0,0.8)",
              }}
            >
              {/* Glow top */}
              <div
                aria-hidden
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-48 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top, hsl(155 83% 40% / 0.3) 0%, transparent 70%)",
                }}
              />

              {/* Close */}
              <button
                ref={closeBtnRef}
                onClick={close}
                aria-label="Fechar"
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative p-6 md:p-8">
                {/* Badge */}
                <div className="mb-4">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border"
                    style={{
                      backgroundColor: copy.badgeBg,
                      borderColor: copy.badgeBorder,
                      color: copy.badgeColor,
                    }}
                  >
                    <span className="relative flex w-1.5 h-1.5">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full animate-ping"
                        style={{ backgroundColor: copy.badgeColor }}
                      />
                      <span
                        className="relative w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: copy.badgeColor }}
                      />
                    </span>
                    {copy.badge}
                  </span>
                </div>

                <h2
                  id="lead-dialog-title"
                  className="font-display text-xl md:text-2xl font-bold text-white tracking-tight leading-tight mb-1.5"
                >
                  {copy.title}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed mb-5">
                  {copy.sub}
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                  {/* Honeypot — invisível, se preenchido é bot */}
                  <input
                    type="text"
                    name="_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", height: 0, width: 0 }}
                  />

                  <div>
                    <label htmlFor="ld-nome" className={labelBase}>Nome do tutor *</label>
                    <input
                      id="ld-nome"
                      type="text"
                      autoComplete="name"
                      autoFocus
                      placeholder="Como podemos te chamar?"
                      className={fieldBase}
                      {...register("nome")}
                    />
                    {errors.nome && <p className={errorText}>{errors.nome.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="ld-whatsapp" className={labelBase}>WhatsApp *</label>
                    <input
                      id="ld-whatsapp"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(81) 9 0000-0000"
                      className={fieldBase}
                      value={whatsappValue}
                      onChange={(e) =>
                        setValue("whatsapp", formatPhone(e.target.value), { shouldValidate: true })
                      }
                    />
                    {errors.whatsapp && <p className={errorText}>{errors.whatsapp.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="ld-pet" className={labelBase}>Nome do pet</label>
                    <input
                      id="ld-pet"
                      type="text"
                      placeholder="Opcional"
                      autoComplete="off"
                      className={fieldBase}
                      {...register("petNome")}
                    />
                  </div>

                  <div>
                    <label htmlFor="ld-motivo" className={labelBase}>Motivo *</label>
                    <select
                      id="ld-motivo"
                      className={fieldBase + " appearance-none cursor-pointer"}
                      style={selectChevronStyle}
                      autoComplete="off"
                      {...register("motivo")}
                    >
                      <option value="" style={{ backgroundColor: "hsl(170 35% 10%)", color: "white" }}>
                        Selecione
                      </option>
                      {MOTIVOS.map((m) => (
                        <option key={m} value={m} style={{ backgroundColor: "hsl(170 35% 10%)", color: "white" }}>
                          {m}
                        </option>
                      ))}
                    </select>
                    {errors.motivo && <p className={errorText}>{errors.motivo.message}</p>}
                  </div>

                  {submitError && (
                    <div
                      className="px-3.5 py-2.5 rounded-xl text-xs border"
                      style={{
                        backgroundColor: "hsl(12 76% 20% / 0.35)",
                        borderColor: "hsl(12 76% 56% / 0.4)",
                        color: "hsl(12 90% 80%)",
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 340, damping: 18 }}
                    className="mt-1 relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-white text-[15px] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: intent === "urgencia"
                        ? "linear-gradient(135deg, hsl(12 76% 56%) 0%, hsl(8 80% 48%) 100%)"
                        : "linear-gradient(135deg, hsl(155 83% 40%) 0%, hsl(155 83% 24%) 100%)",
                      boxShadow: intent === "urgencia"
                        ? "0 14px 34px -10px hsla(12, 76%, 56%, 0.6)"
                        : "0 14px 34px -10px hsla(155, 83%, 40%, 0.6)",
                    }}
                  >
                    <span className="relative inline-flex items-center gap-2.5">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          {/* WhatsApp icon */}
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                          </svg>
                          {copy.submit}
                          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                        </>
                      )}
                    </span>
                  </motion.button>

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-white/35 pt-1">
                    <ShieldCheck className="w-3 h-3" />
                    Seus dados só são usados pra te retornarmos. Sem spam.
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LeadCaptureContext.Provider>
  );
}
