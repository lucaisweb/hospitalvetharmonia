/**
 * Vercel Function — Proxy server-side para gravar leads no Google Sheets.
 *
 * Roda no servidor (Node.js / Fluid Compute). O browser POSTa pra
 * /api/lead (same-origin) e a função repassa pra Apps Script. A URL do
 * Apps Script fica numa env var *sem* prefixo VITE_, então nunca vai pro
 * bundle do cliente.
 *
 * Config esperada na Vercel:
 *   LEADS_WEBHOOK_URL = https://script.google.com/macros/s/.../exec
 */

export const config = {
  runtime: "nodejs",
};

type LeadBody = {
  nome?: string;
  whatsapp?: string;
  email?: string;
  petNome?: string;
  petEspecie?: string;
  motivo?: string;
  unidade?: string;
  mensagem?: string;
  origem?: string;
  userAgent?: string;
  timestamp?: string;
  // Honeypot — campos que humanos não veem. Se preenchido, é bot.
  _hp?: string;
};

const MAX_FIELD = 1000;

function clean(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, MAX_FIELD);
}

export default async function handler(
  req: Request,
): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json(
      { ok: false, error: "method_not_allowed" },
      { status: 405 },
    );
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    console.error("[api/lead] LEADS_WEBHOOK_URL is not set");
    return Response.json(
      { ok: false, error: "server_misconfigured" },
      { status: 500 },
    );
  }

  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return Response.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Honeypot: se preenchido, finge sucesso mas descarta
  if (body._hp && body._hp.trim() !== "") {
    return Response.json({ ok: true });
  }

  // Validação mínima server-side
  const nome = clean(body.nome);
  const whatsapp = clean(body.whatsapp);
  if (nome.length < 2 || whatsapp.length < 10) {
    return Response.json(
      { ok: false, error: "invalid_fields" },
      { status: 400 },
    );
  }

  const payload = {
    nome,
    whatsapp,
    email: clean(body.email),
    petNome: clean(body.petNome),
    petEspecie: clean(body.petEspecie),
    motivo: clean(body.motivo),
    unidade: clean(body.unidade),
    mensagem: clean(body.mensagem),
    origem: clean(body.origem) || "LP Conversão - /contato",
    userAgent: clean(body.userAgent) || req.headers.get("user-agent") || "",
    timestamp: clean(body.timestamp) || new Date().toISOString(),
    ip:
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "",
  };

  try {
    // Apps Script devolve 302 após o POST. fetch() do Node segue redirects
    // automaticamente, e já é um POST com body — mas o Google às vezes
    // re-POSTa, às vezes vira GET. Por isso usamos redirect: "follow" e
    // aceitamos qualquer 2xx/3xx do lado deles.
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!res.ok) {
      console.error("[api/lead] webhook responded with", res.status);
      return Response.json(
        { ok: false, error: "webhook_failed" },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[api/lead] fetch error:", err);
    return Response.json(
      { ok: false, error: "network_error" },
      { status: 502 },
    );
  }
}
