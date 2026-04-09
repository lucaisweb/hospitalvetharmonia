/**
 * Envia um lead para a Vercel Function /api/lead, que repassa ao Google
 * Sheets via Apps Script. A URL do Apps Script fica apenas no servidor
 * (env var LEADS_WEBHOOK_URL) e NUNCA é enviada ao browser — sem prefixo
 * VITE_, portanto não entra no bundle do cliente.
 *
 * Vantagens sobre chamar o Apps Script direto:
 *   - URL do webhook fica escondida
 *   - Dá pra ler o status real da resposta (sem `no-cors`)
 *   - Validação, rate-limit e honeypot rodam server-side
 */

export type LeadPayload = {
  nome: string;
  whatsapp: string;
  email?: string;
  petNome?: string;
  petEspecie: string;
  motivo: string;
  unidade: string;
  mensagem?: string;
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
