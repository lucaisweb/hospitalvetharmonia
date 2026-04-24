import { useEffect, useState } from "react";

/**
 * Parâmetros de tracking que queremos guardar com cada lead.
 * Capturados da URL na primeira visita e persistidos em sessionStorage —
 * mesmo se o usuário navegar entre páginas, a origem continua sendo a mesma.
 */
export type TrackingParams = {
  /* UTM standard */
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;

  /* Click IDs */
  fbclid?: string; // Facebook / Instagram / Meta Ads
  gclid?: string;  // Google Ads
  ttclid?: string; // TikTok Ads
  msclkid?: string; // Microsoft/Bing Ads

  /* Contexto */
  referrer?: string;      // document.referrer — de onde veio
  landingPath?: string;   // path inicial onde caiu
  landingUrl?: string;    // URL completa inicial
  firstVisit?: string;    // ISO timestamp da primeira visita
};

const STORAGE_KEY = "harmonia_tracking_v1";

const TRACKING_KEYS: (keyof TrackingParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
  "msclkid",
];

/**
 * Deduz a fonte quando não há UTM explícita. Exemplos:
 *   - referrer google.com → "organic_google"
 *   - referrer facebook.com → "facebook"
 *   - referrer instagram.com → "instagram"
 *   - sem referrer → "direct"
 */
function inferSourceFromReferrer(referrer: string): string {
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes("google.")) return "organic_google";
    if (host.includes("facebook.com") || host.includes("fb.com")) return "facebook";
    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("bing.com")) return "organic_bing";
    if (host.includes("tiktok.com")) return "tiktok";
    if (host.includes("youtube.com")) return "youtube";
    if (host.includes("linkedin.com")) return "linkedin";
    if (host.includes("twitter.com") || host.includes("x.com")) return "twitter";
    if (host.includes("whatsapp")) return "whatsapp";
    return host;
  } catch {
    return "unknown";
  }
}

function readFromStorage(): TrackingParams | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingParams) : null;
  } catch {
    return null;
  }
}

function writeToStorage(data: TrackingParams) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

/**
 * Hook que captura UTMs / click IDs da URL na primeira visita,
 * persiste em sessionStorage e retorna os dados pra enviar com o lead.
 *
 * Se o usuário chegou direto (sem UTM) e depois navegou pra /contato,
 * a origem persiste como estava na chegada.
 */
export function useTracking(): TrackingParams {
  const [tracking, setTracking] = useState<TrackingParams>({});

  useEffect(() => {
    const existing = readFromStorage();
    if (existing) {
      setTracking(existing);
      return;
    }

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const data: TrackingParams = {};

    for (const key of TRACKING_KEYS) {
      const v = params.get(key);
      if (v) data[key] = v;
    }

    const referrer = document.referrer || "";
    data.referrer = referrer;
    data.landingPath = url.pathname + url.search;
    data.landingUrl = url.href;
    data.firstVisit = new Date().toISOString();

    // Se não veio UTM explícita, infere pela referrer
    if (!data.utm_source) {
      data.utm_source = inferSourceFromReferrer(referrer);
      if (data.fbclid) data.utm_source = "facebook_ads";
      if (data.gclid) data.utm_source = "google_ads";
      if (data.ttclid) data.utm_source = "tiktok_ads";
      if (data.msclkid) data.utm_source = "bing_ads";
    }

    writeToStorage(data);
    setTracking(data);
  }, []);

  return tracking;
}
