# Project Progress

## Goal
Redesign completo da landing page do Hospital Veterinário Harmonia (Recife) — visual moderno, animações bidirecionais de scroll, alta interatividade.

## Status
In Progress — Phase 2 (ajustes pós-redesign)

## Completed
- [x] `src/index.css` — tokens, animações CSS base
- [x] `src/components/ui/count-up.tsx` — contador animado
- [x] `src/components/ui/floating-whatsapp.tsx` — botão fixo WhatsApp
- [x] `src/pages/Index.tsx` — scroll progress bar + FloatingWhatsApp
- [x] `src/components/landing/Navbar.tsx` — glass morphism scroll-aware
- [x] `src/components/landing/HeroSection.tsx` — redesign completo (parallax recife-bg.png)
- [x] `src/components/landing/UnitsSection.tsx` — cards com image overlay + Google Maps iframe
- [x] `src/components/landing/ValueProps.tsx` — bento grid + spotlight cards + wide card preenchido (stats + checklist + pills)
- [x] `src/components/landing/SpecialtiesSection.tsx` — marquee + grid stagger + FlowButton
- [x] `src/components/landing/ServicesSection.tsx` — implementado do zero (7 serviços, fundo escuro)
- [x] `src/components/landing/TestimonialsSection.tsx` — Embla carousel + stats
- [x] `src/components/landing/PrideSection.tsx` — WordReveal + HolographicBadge
- [x] `src/components/landing/Footer.tsx` — links reais (Instagram, Facebook, WhatsApp, email)
- [x] `src/components/ui/flow-button.tsx` — criado (substitui StarButton)
- [x] `src/components/ui/word-reveal.tsx` — criado (word-by-word blur animation)
- [x] `src/components/ui/holographic-badge.tsx` — criado (3D tilt + iridescent overlay)
- [x] `public/favicon.svg` — criado (fundo verde #0d6b3a + pata veterinária branca)
- [x] `index.html` — favicon + meta OG/Twitter tags
- [x] `src/App.tsx` — ErrorBoundary adicionado
- [x] Crash "render2 is not a function" — corrigido (removido react-leaflet v5 + WebGLSlide)
- [x] WhatsApp link real atualizado em todo o site

## In Progress
- [ ] Aguardando confirmação visual do ValueProps wide card (Hospital)

## Pending
- [ ] Google Maps com pins reais das 3 unidades (requer API key do Google Maps Embed)
  - URL format: `https://www.google.com/maps/embed/v1/place?key=API_KEY&q=...`
  - Usuário precisa fornecer a chave de API

## Decisions Made
- react-leaflet removido (v5 incompatível com React 18, v4 ainda causou crash) → substituído por Google Maps iframe
- WebGLSlide (THREE.js) removido → substituído por parallax estático com recife-bg.png
- viewport: `once: false` em todas as animações (bidireccional)
- Spring physics como padrão de transição

## Known Issues / Blockers
- Google Maps iframe mostra resultados de busca genérica (sem pins das unidades específicas)
  - Para pins exatos: precisa de Google Maps Embed API key (gratuita, requer conta Google Cloud)

## Resume From Here
Aguardar confirmação do usuário sobre o estado visual atual do site. Se solicitado:
1. Implementar Google Maps com pins reais (user deve fornecer API key)
2. Qualquer ajuste visual adicional nas seções
