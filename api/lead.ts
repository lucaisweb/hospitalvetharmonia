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

import type { IncomingMessage, ServerResponse } from "node:http";

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

function sendJson(
  res: ServerResponse,
  status: number,
  data: Record<string, unknown>,
): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

async function readJsonBody<T>(req: IncomingMessage): Promise<T> {
  // Em Vercel Functions (Node), o body já vem parseado em req.body se for
  // Content-Type: application/json. Mas nem sempre — depende da versão.
  // Então lemos stream como fallback.
  const anyReq = req as IncomingMessage & { body?: unknown };
  if (anyReq.body !== undefined && anyReq.body !== null) {
    if (typeof anyReq.body === "string") {
      return JSON.parse(anyReq.body) as T;
    }
    return anyReq.body as T;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : (chunk as Buffer));
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {} as T;
  return JSON.parse(raw) as T;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    console.error("[api/lead] LEADS_WEBHOOK_URL is not set");
    sendJson(res, 500, { ok: false, error: "server_misconfigured" });
    return;
  }

  let body: LeadBody;
  try {
    body = await readJsonBody<LeadBody>(req);
  } catch {
    sendJson(res, 400, { ok: false, error: "invalid_json" });
    return;
  }

  // Honeypot: se preenchido, finge sucesso mas descarta
  if (body._hp && body._hp.trim() !== "") {
    sendJson(res, 200, { ok: true });
    return;
  }

  // Validação mínima server-side
  const nome = clean(body.nome);
  const whatsapp = clean(body.whatsapp);
  if (nome.length < 2 || whatsapp.length < 10) {
    sendJson(res, 400, { ok: false, error: "invalid_fields" });
    return;
  }

  const fwd = req.headers["x-forwarded-for"];
  const ip = Array.isArray(fwd)
    ? fwd[0]
    : typeof fwd === "string"
    ? fwd.split(",")[0].trim()
    : "";

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
    userAgent:
      clean(body.userAgent) || (req.headers["user-agent"] as string) || "",
    timestamp: clean(body.timestamp) || new Date().toISOString(),
    ip,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!r.ok) {
      console.error("[api/lead] webhook responded with", r.status);
      sendJson(res, 502, { ok: false, error: "webhook_failed" });
      return;
    }

    sendJson(res, 200, { ok: true });
  } catch (err) {
    console.error("[api/lead] fetch error:", err);
    sendJson(res, 502, { ok: false, error: "network_error" });
  }
}
