import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type FaqItem = {
  q: string;
  a: string;
};

/**
 * Seção de FAQ rica em SEO. Cada pergunta é um <h3> e cada resposta
 * é um <p> — o Google indexa ambos. O JSON-LD FAQPage é gerado
 * separadamente no useSeo.
 */
const SeoFaq = ({
  heading,
  subheading,
  faqs,
  /** Texto semântico adicional que aparece abaixo das FAQs */
  seoText,
}: {
  heading: string;
  subheading?: string;
  faqs: FaqItem[];
  seoText?: string;
}) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="relative py-16 md:py-20 border-t"
      style={{
        backgroundColor: "hsl(170 35% 8%)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className="mb-10"
        >
          {subheading && (
            <p
              className="text-[11px] font-semibold tracking-widest uppercase mb-3"
              style={{ color: "hsl(155 83% 55%)" }}
            >
              {subheading}
            </p>
          )}
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05]">
            {heading}
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border overflow-hidden"
                style={{
                  backgroundColor: isOpen
                    ? "hsl(170 35% 10% / 0.8)"
                    : "hsl(170 35% 10% / 0.4)",
                  borderColor: isOpen
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.05)",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-sm md:text-[15px] font-semibold text-white/85 group-hover:text-white transition-colors leading-snug">
                    {faq.q}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className="w-4 h-4"
                      style={{ color: "hsl(155 83% 55%)" }}
                    />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-white/50 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Texto semântico — visível mas discreto. Google indexa tudo. */}
        {seoText && (
          <div className="mt-12 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p className="text-xs text-white/25 leading-relaxed max-w-3xl">
              {seoText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeoFaq;

/**
 * Gera o JSON-LD FAQPage a partir de um array de FaqItems.
 * Use junto com useSeo({ jsonLd: [veterinaryCare, buildFaqJsonLd(faqs)] })
 */
export function buildFaqJsonLd(faqs: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
