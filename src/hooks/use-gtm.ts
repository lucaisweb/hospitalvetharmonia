import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const SCRIPT_ID = "gtm-script";
const NOSCRIPT_ID = "gtm-noscript";

/**
 * Injeta o Google Tag Manager (script no <head> + iframe noscript no <body>)
 * de forma idempotente. Indicado para rotas específicas em SPA.
 */
export function useGtm(containerId: string) {
  useEffect(() => {
    if (!containerId) return;

    window.dataLayer = window.dataLayer || [];

    if (!document.getElementById(SCRIPT_ID)) {
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
      document.head.appendChild(script);
    }

    if (!document.getElementById(NOSCRIPT_ID)) {
      const noscript = document.createElement("noscript");
      noscript.id = NOSCRIPT_ID;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${containerId}`;
      iframe.height = "0";
      iframe.width = "0";
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }, [containerId]);
}
