/**
 * Envia um lead para a Vercel Function /api/lead, que repassa ao Google
 * Sheets via Apps Script. A URL do Apps Script fica apenas no servidor.
 */

export type LeadPayload = {
  nome: string;
  whatsapp: string;
  email?: string;
  petNome?: string;
  petEspecie?: string;
  motivo: string;
  unidade?: string;
  mensagem?: string;

  /* Tracking / atribuição — preenchido por useTracking */
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  ttclid?: string;
  msclkid?: string;
  referrer?: string;
  landingPath?: string;
  landingUrl?: string;
  firstVisit?: string;

  /* Intent do CTA que abriu o modal (urgencia, consulta, agendar...) */
  intent?: string;
};

export async function submitLead(data: LeadPayload): Promise<void> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      timestamp: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    let reason = "unknown";
    try {
      const j = (await res.json()) as { error?: string };
      if (j?.error) reason = j.error;
    } catch {
      /* ignore */
    }
    throw new Error(`lead_submit_failed:${reason}`);
  }
}
