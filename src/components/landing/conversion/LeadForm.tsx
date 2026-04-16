import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { submitLead, type LeadPayload } from "@/lib/submit-lead";

/* ── Schema conciso — só o essencial ── */
const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome"),
  whatsapp: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp válido com DDD")
    .regex(/^[\d\s()+-]+$/, "Apenas números, espaços, ( ) + -"),
  motivo: z.string().min(1, "Selecione o motivo"),
  mensagem: z.string().trim().max(600).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const MOTIVOS = [
  "Consulta / Check-up",
  "Urgência / Emergência",
  "Exame ou diagnóstico por imagem",
  "Cirurgia / Pós-operatório",
  "Especialista (ortopedia, cardio, neuro…)",
  "Vacinação",
  "Outro assunto",
];

const WA_NUMBER = "558131267555";

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function buildWaMessage(v: FormValues): string {
  const lines = [
    "Olá! Acabei de preencher o formulário no site do Harmonia.",
    "",
    `*Nome:* ${v.nome}`,
    `*WhatsApp:* ${v.whatsapp}`,
    `*Motivo:* ${v.motivo}`,
  ];
  if (v.mensagem) {
    lines.push(`*Observações:* ${v.mensagem}`);
  }
  lines.push("", "Gostaria de dar sequência ao atendimento!");
  return lines.join("\n");
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

const labelBase = "block text-[11px] font-semibold tracking-wider uppercase mb-1.5 text-white/55";
const errorText = "mt-1.5 text-[11px] font-medium text-[hsl(12_85%_68%)]";

const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", whatsapp: "", motivo: "", mensagem: "" },
  });

  const whatsappValue = watch("whatsapp");

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      const payload: LeadPayload = {
        nome: values.nome,
        whatsapp: values.whatsapp,
        motivo: values.motivo,
        petEspecie: "",
        unidade: "",
        mensagem: values.mensagem || undefined,
      };
      await submitLead(payload);
      setSubmittedData(values);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Não conseguimos enviar agora. Chame no WhatsApp — atendemos na hora.");
    }
  };

  if (submitted && submittedData) {
    const waText = encodeURIComponent(buildWaMessage(submittedData));
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="rounded-2xl p-8 md:p-10 border border-white/10"
        style={{ backgroundColor: "hsl(170 35% 10% / 0.9)" }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(135deg, hsl(155 83% 45%) 0%, hsl(155 83% 28%) 100%)",
            boxShadow: "0 12px 32px -10px hsla(155, 83%, 40%, 0.55)",
          }}
        >
          <Check className="w-7 h-7 text-white" strokeWidth={3} />
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          Recebemos sua solicitação.
        </h3>
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
          Nossa equipe vai entrar em contato em instantes pelo WhatsApp. Se for urgente, fale agora:
        </p>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-white text-sm"
          style={{
            background: "linear-gradient(135deg, hsl(155 83% 38%) 0%, hsl(155 83% 24%) 100%)",
            boxShadow: "0 10px 28px -8px hsla(155, 83%, 40%, 0.55)",
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.325 0-4.47-.754-6.213-2.032l-.354-.27-3.666 1.228 1.228-3.666-.27-.354A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
          </svg>
          Falar agora no WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.15 }}
      className="rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden"
      style={{ backgroundColor: "hsl(170 35% 10% / 0.92)", boxShadow: "0 40px 80px -30px rgba(0,0,0,0.6)" }}
    >
      <div aria-hidden className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(155 83% 40% / 0.22) 0%, transparent 70%)" }} />

      <div className="relative">
        <div className="flex items-center gap-2 mb-5">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase border"
            style={{ backgroundColor: "hsl(155 83% 30% / 0.14)", borderColor: "hsl(155 83% 30% / 0.32)", color: "hsl(155 83% 65%)" }}
          >
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ backgroundColor: "hsl(155 83% 50%)" }} />
              <span className="relative w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(155 83% 55%)" }} />
            </span>
            Resposta em minutos
          </span>
        </div>

        <h2 className="font-display text-2xl md:text-[28px] font-bold text-white mb-1.5 tracking-tight">
          Deixe seus dados
        </h2>
        <p className="text-white/50 text-sm mb-6">
          Preencha — retornamos pelo WhatsApp em minutos.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {/* Nome */}
          <div>
            <label htmlFor="nome" className={labelBase}>Seu nome *</label>
            <input
              id="nome"
              type="text"
              autoComplete="name"
              placeholder="Como podemos te chamar?"
              className={fieldBase}
              {...register("nome")}
            />
            {errors.nome && <p className={errorText}>{errors.nome.message}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className={labelBase}>WhatsApp *</label>
            <input
              id="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(81) 9 0000-0000"
              className={fieldBase}
              value={whatsappValue}
              onChange={(e) => setValue("whatsapp", formatPhone(e.target.value), { shouldValidate: true })}
            />
            {errors.whatsapp && <p className={errorText}>{errors.whatsapp.message}</p>}
          </div>

          {/* Motivo */}
          <div>
            <label htmlFor="motivo" className={labelBase}>Motivo *</label>
            <select
              id="motivo"
              className={fieldBase + " appearance-none cursor-pointer"}
              style={selectChevronStyle}
              autoComplete="off"
              {...register("motivo")}
            >
              <option value="" style={{ backgroundColor: "hsl(170 35% 10%)", color: "white" }}>Selecione</option>
              {MOTIVOS.map((m) => (
                <option key={m} value={m} style={{ backgroundColor: "hsl(170 35% 10%)", color: "white" }}>{m}</option>
              ))}
            </select>
            {errors.motivo && <p className={errorText}>{errors.motivo.message}</p>}
          </div>

          {/* Mensagem (opcional) */}
          <div>
            <label htmlFor="mensagem" className={labelBase}>Observação (opcional)</label>
            <textarea
              id="mensagem"
              rows={2}
              placeholder="Sintomas, dúvidas, horário preferido…"
              className={"w-full px-4 py-3 rounded-xl border bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[hsl(155_83%_50%)] focus:bg-white/[0.06] transition-colors resize-none"}
              {...register("mensagem")}
            />
          </div>
        </div>

        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 px-4 py-3 rounded-xl text-sm border"
              style={{ backgroundColor: "hsl(12 76% 20% / 0.35)", borderColor: "hsl(12 76% 56% / 0.4)", color: "hsl(12 90% 80%)" }}
            >
              {submitError}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.015, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 340, damping: 18 }}
          className="mt-6 relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full font-semibold text-white text-[15px] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, hsl(155 83% 40%) 0%, hsl(155 83% 24%) 100%)",
            boxShadow: "0 14px 34px -10px hsla(155, 83%, 40%, 0.6), inset 0 1px 0 rgba(255,255,255,0.18)",
          }}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full opacity-70" style={{ boxShadow: "0 0 0 0 hsla(155, 83%, 50%, 0.6)", animation: "submit-pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
            <span className="absolute top-0 left-[-60%] w-[55%] h-full skew-x-[-18deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[260%] transition-all duration-[900ms] ease-out" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)" }} />
          </span>
          <span className="relative inline-flex items-center gap-2.5">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Enviando…</>
            ) : (
              <>
                Quero ser contatado
                <motion.span className="inline-flex" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </motion.span>
              </>
            )}
          </span>
        </motion.button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
          <ShieldCheck className="w-3.5 h-3.5" />
          Seus dados são usados só para te retornarmos. Sem spam.
        </p>
      </div>
    </motion.form>
  );
};

export default LeadForm;
