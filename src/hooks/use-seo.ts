import { useEffect } from "react";

type SeoOptions = {
  title: string;
  description: string;
  canonical?: string;
  /** JSON-LD structured data (objeto ou array de objetos) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SCRIPT_ID = "page-jsonld";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Atualiza title, description, OG e JSON-LD da página ao montar.
 * Usado para diferenciar SEO entre a LP institucional e a LP de conversão.
 */
export function useSeo({ title, description, canonical, jsonLd }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    if (canonical) setLinkCanonical(canonical);

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = SCRIPT_ID;
      script.text = JSON.stringify(jsonLd);
      // Remove anterior se houver
      document.getElementById(SCRIPT_ID)?.remove();
      document.head.appendChild(script);
    }

    return () => {
      script?.remove();
    };
  }, [title, description, canonical, jsonLd]);
}
