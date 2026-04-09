/**
 * Envia um lead para o Google Sheets via Apps Script Web App.
 *
 * Setup: ver SETUP_LEADS.md na raiz do projeto.
 * A URL do webhook é definida em .env como VITE_LEADS_WEBHOOK_URL.
 *
 * Usa `mode: "no-cors"` + Content-Type text/plain porque o Apps Script
 * não devolve headers CORS em POST. Isso significa que não conseguimos
 * ler a resposta, mas o request é entregue ao Google. O Apps Script
 * parseia o body como JSON.
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
  /** preenchido automaticamente */
  origem?: string;
  userAgent?: string;
  timestamp?: string;
};

const WEBHOOK_URL = import.meta.env.VITE_LEADS_WEBHOOK_URL as string | undefined;

export async function submitLead(data: LeadPayload): Promise<void> {
  if (!WEBHOOK_URL) {
    // Em dev sem webhook configurado: apenas logamos e seguimos.
    // Isso permite testar a UI sem precisar do Apps Script rodando.
    console.warn(
      "[submitLead] VITE_LEADS_WEBHOOK_URL não configurada. Lead não foi enviado:",
      data,
    );
    return;
  }

  const payload: LeadPayload = {
    ...data,
    origem: "LP Conversão - /contato",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    timestamp: new Date().toISOString(),
  };

  await fetch(WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
}
