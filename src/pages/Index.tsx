import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import { LoadingScreen } from "@/components/ui/loading-screen";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ValueProps from "@/components/landing/ValueProps";
import SpecialtiesSection from "@/components/landing/SpecialtiesSection";
import UnitsSection from "@/components/landing/UnitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/landing/Footer";
import PrideSection from "@/components/landing/PrideSection";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import SeoFaq, { buildFaqJsonLd, type FaqItem } from "@/components/landing/SeoFaq";
import { useSeo } from "@/hooks/use-seo";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";

/* ── FAQs site principal — termos gerais + especialidades ── */

const MAIN_FAQS: FaqItem[] = [
  {
    q: "Quais especialidades veterinárias o Hospital Harmonia oferece?",
    a: "O Hospital Veterinário Harmonia oferece 24 especialidades: clínica geral, cirurgia, ortopedia, cardiologia, neurologia, oncologia, dermatologia, oftalmologia, endocrinologia, nefrologia, pneumologia, hematologia, gastroenterologia, nutrologia, fisioterapia, acupuntura, reprodução, diagnóstico por imagem (raio-X digital e ultrassonografia), laboratório próprio com resultados rápidos, vacinação, atendimento a animais silvestres, terapia celular, internação e urgência 24 horas.",
  },
  {
    q: "O Hospital Harmonia faz exames de imagem e laboratoriais em pets?",
    a: "Sim. Temos equipamentos de raio-X digital e ultrassonografia para diagnóstico por imagem veterinário, além de laboratório próprio para hemograma, bioquímica, urinálise e outros exames. Os resultados ficam prontos rapidamente, agilizando o diagnóstico e o tratamento do seu pet.",
  },
  {
    q: "Como agendar uma consulta veterinária no Hospital Harmonia?",
    a: "Você pode agendar uma consulta pelo WhatsApp (81) 3126-7555, por telefone no mesmo número, ou acessando hospitalvetharmonia.com.br/contato e preenchendo o formulário. Nossa equipe retorna em minutos pelo seu WhatsApp para confirmar o melhor horário e unidade.",
  },
  {
    q: "O Hospital Veterinário Harmonia funciona 24 horas?",
    a: "Sim. Todas as três unidades do Hospital Harmonia em Recife funcionam 24 horas por dia, todos os dias do ano, incluindo feriados, sábados e domingos. Atendemos urgências veterinárias, emergências, consultas agendadas e internação durante todo o período.",
  },
  {
    q: "Onde ficam as unidades do Hospital Veterinário Harmonia em Recife?",
    a: "Temos três unidades estrategicamente localizadas em Recife: Casa Forte (Estr. do Encanamento, 585 — Recife Norte), Madalena (Av. Visc. de Albuquerque, 894 — Zona Oeste) e Boa Viagem (Av. Eng. Domingos Ferreira, 3628 — Zona Sul). Todas funcionam 24h com estacionamento.",
  },
  {
    q: "O Hospital Harmonia atende gatos, aves e animais silvestres?",
    a: "Sim. Além de cães, atendemos gatos, aves, roedores, répteis e animais silvestres. Nossos veterinários são especializados em diferentes espécies e preparados para oferecer o melhor cuidado a cada tipo de animal.",
  },
  {
    q: "O Hospital Harmonia tem centro cirúrgico veterinário?",
    a: "Sim. Contamos com centro cirúrgico completo e equipado para cirurgias de pequeno, médio e grande porte. Realizamos cirurgias ortopédicas, neurológicas, oftalmológicas, oncológicas, de tecidos moles e procedimentos minimamente invasivos, sempre com acompanhamento anestésico e monitoramento completo.",
  },
  {
    q: "Quais vacinas para cães e gatos são oferecidas no Hospital Harmonia?",
    a: "Oferecemos todas as vacinas recomendadas para cães (V8/V10, antirrábica, gripe canina, giárdia, leishmaniose) e gatos (V3/V4/V5, antirrábica, leucemia felina). O protocolo vacinal é personalizado conforme a idade, estilo de vida e saúde do pet. Agende pelo (81) 3126-7555.",
  },
  {
    q: "O Hospital Harmonia é referência em medicina veterinária em Recife?",
    a: "Sim. Com mais de 32 anos de história, o Hospital Veterinário Harmonia é uma das referências em medicina veterinária de alta complexidade em Recife e Pernambuco. São 3 unidades, 24 especialidades, equipe altamente qualificada e mais de 2.000 pets atendidos por mês.",
  },
  {
    q: "Qual o valor de uma consulta veterinária no Hospital Harmonia?",
    a: "O valor da consulta depende da especialidade e do tipo de atendimento. Para informações sobre valores, entre em contato pelo WhatsApp (81) 3126-7555 ou preencha o formulário em hospitalvetharmonia.com.br/contato. Respondemos rapidamente com as informações detalhadas.",
  },
];

const MAIN_SEO_TEXT =
  "Hospital Veterinário Harmonia — referência em medicina veterinária em Recife, Pernambuco, há mais de 32 anos. " +
  "Clínica veterinária 24 horas, hospital pet Recife, veterinário em Recife PE. " +
  "Consulta veterinária, check-up veterinário, vacinação de cães e gatos, castração, exames veterinários. " +
  "Especialidades: cardiologista veterinário Recife, ortopedista veterinário, neurologista veterinário, " +
  "oncologista veterinário, dermatologista veterinário, oftalmologista veterinário, endocrinologista veterinário. " +
  "Diagnóstico por imagem veterinário: raio-X digital, ultrassom, ecocardiograma. Laboratório veterinário com resultados rápidos. " +
  "Centro cirúrgico veterinário, cirurgia ortopédica em cães e gatos, internação veterinária. " +
  "Fisioterapia veterinária, acupuntura veterinária, nutrologia veterinária, terapia celular veterinária. " +
  "Veterinário para cachorro, gato, ave, roedor, réptil, animais silvestres e exóticos. " +
  "Unidades: veterinário Casa Forte, veterinário Madalena, veterinário Boa Viagem. " +
  "Pronto-socorro veterinário, emergência veterinária 24h, veterinário de madrugada, veterinário noturno Recife. " +
  "Melhor hospital veterinário Recife, hospital veterinário perto de mim, clínica veterinária perto de mim Recife. " +
  "Agende: (81) 3126-7555 ou hospitalvetharmonia.com.br/contato.";

/* ── Cursor glow: isolated RAF loop, zero React re-renders ── */
const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -400, y: -400 });
  const target = useRef({ x: -400, y: -400 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX - 200, y: e.clientY - 200 };
    };
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.07;
      pos.current.y += (target.current.y - pos.current.y) * 0.07;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed pointer-events-none select-none z-0 w-[400px] h-[400px] rounded-full"
      style={{
        top: 0,
        left: 0,
        willChange: "transform",
        background:
          "radial-gradient(circle, hsl(155 83% 40% / 0.07) 0%, transparent 70%)",
      }}
    />
  );
};

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useSeo({
    title: "Hospital Veterinário Harmonia | Atendimento 24h em Recife",
    description:
      "Hospital Veterinário Harmonia — referência em medicina veterinária de alta complexidade em Recife há 32 anos. Atendimento 24h, 24 especialidades, 3 unidades. Ligue: (81) 3126-7555.",
    canonical: "https://hospitalvetharmonia.com.br",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "VeterinaryCare",
        name: "Hospital Veterinário Harmonia",
        description:
          "Hospital veterinário referência em Recife com atendimento 24h, 24 especialidades, centro cirúrgico, diagnóstico por imagem e laboratório próprio.",
        url: "https://hospitalvetharmonia.com.br",
        telephone: "+55-81-3126-7555",
        priceRange: "$$",
        openingHours: "Mo-Su 00:00-23:59",
        areaServed: { "@type": "City", name: "Recife" },
        address: [
          { "@type": "PostalAddress", streetAddress: "Estr. do Encanamento, 585", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
          { "@type": "PostalAddress", streetAddress: "Av. Visc. de Albuquerque, 894", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
          { "@type": "PostalAddress", streetAddress: "Av. Eng. Domingos Ferreira, 3628", addressLocality: "Recife", addressRegion: "PE", addressCountry: "BR" },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "2000",
        },
      },
      buildFaqJsonLd(MAIN_FAQS),
    ],
  });

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />
    <div className="min-h-screen relative" style={{ visibility: loading ? "hidden" : "visible" }}>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
        style={{
          scaleX,
          background: "hsl(155 83% 45%)",
        }}
      />

      {/* Cursor ambient glow */}
      <CursorGlow />

      {/* Global watermark */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 flex items-center justify-center">
        <img
          src={simboloHarmonia}
          alt=""
          className="w-[600px] h-[600px] object-contain opacity-[0.02]"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <div id="unidades">
          <UnitsSection />
        </div>
        <div id="sobre">
          <ValueProps />
        </div>
        <div id="especialidades">
          <SpecialtiesSection />
        </div>
        <div id="servicos">
          <ServicesSection />
        </div>
        <TestimonialsSection />
        <PrideSection />
        <SeoFaq
          heading="Perguntas frequentes"
          subheading="Tire suas dúvidas"
          faqs={MAIN_FAQS}
          seoText={MAIN_SEO_TEXT}
        />
        <Footer />
      </div>

      <FloatingWhatsApp />
    </div>
    </>
  );
};

export default Index;
