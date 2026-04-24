# Playbook — LP de Captação de Tráfego Pago

Modelo replicável pra landing pages de hospitais / clínicas / qualquer negócio
que rode tráfego pago (Meta Ads, Google Ads, TikTok) e queira **capturar
leads no site e mandar pro WhatsApp com dados prontos**.

Feito originalmente pra Hospital Veterinário Harmonia. Aplica-se a qualquer
negócio B2C de alto ticket que vende por contato/agendamento.

---

## 1. Filosofia — o funil em 3 etapas

```
[Tráfego pago / orgânico]
  ↓
[Landing page] — objetivo ÚNICO: levar pro modal
  ↓
[Modal de captura] — 4 campos obrigatórios
  ↓
[Grava na planilha + redireciona WhatsApp com msg pronta]
  ↓
[Equipe comercial recebe chat já sabendo tudo]
```

### Princípios que norteiam todas as decisões

1. **Atrito mínimo, dados essenciais.** Não peça email se WhatsApp resolve. Não peça endereço se a equipe pode perguntar no chat. **4 campos é o teto.**

2. **Zero links de saída antes de capturar.** Nada de `tel:` direto, Google Maps, redes sociais, "voltar ao site principal". Se o usuário sair sem preencher, é lead perdido.

3. **WhatsApp com msg pronta.** Quando a equipe abre o chat, já tem: nome, WhatsApp, pet (ou produto/serviço), motivo. A conversa começa no "vamos resolver", não no "me conta quem é você".

4. **Tracking é tão importante quanto o lead.** Sem saber de onde veio o lead, você não otimiza nenhuma campanha. UTM + fbclid + gclid é obrigatório.

5. **Intenção contextualiza a conversa.** Urgência ≠ agendamento. Mesma LP, mensagens de WhatsApp diferentes pra cada CTA.

---

## 2. Stack técnico

| Camada | Tecnologia | Por quê |
|---|---|---|
| Frontend | Vite + React 18 + React Router | Rápido, sem overhead de Next.js pra SPA estático |
| Animação | Framer Motion | Parallax, magnético, stagger |
| Forms | React Hook Form + Zod | Validação client-side robusta |
| UI | Tailwind CSS + shadcn/ui | Componentes acessíveis prontos |
| Backend mínimo | Vercel Function (`api/lead.ts`) | Proxy pra esconder URL do webhook |
| Persistência | **Google Sheets via Apps Script** | **Zero custo mensal**, acessível pra equipe não-técnica |
| Hospedagem | Vercel | Deploy automático via GitHub |

**Por que Google Sheets e não Supabase/Firebase?**
- R$ 0 de custo mensal
- Equipe comercial já sabe usar
- Dá pra filtrar, ordenar, exportar sem precisar de tela custom
- Integração fácil com Google Workspace do cliente

---

## 3. Arquitetura de arquivos

```
projeto/
├── api/
│   └── lead.ts                    # Vercel Function — proxy server-side
├── scripts/
│   └── google-apps-script.js      # Cole no Apps Script do Sheets do cliente
├── src/
│   ├── components/landing/
│   │   ├── conversion/
│   │   │   ├── ConversionNav.tsx        # Navbar minimal (só logo + CTA)
│   │   │   ├── ConversionFooter.tsx     # Footer minimal (só copyright)
│   │   │   └── LeadCaptureDialog.tsx    # ⭐ MODAL — coração do funil
│   │   └── SeoFaq.tsx                   # FAQ + JSON-LD pra rich snippets
│   ├── hooks/
│   │   ├── use-seo.ts             # Atualiza meta tags dinamicamente
│   │   └── use-tracking.ts        # ⭐ Captura UTM/fbclid/gclid
│   ├── lib/
│   │   └── submit-lead.ts         # Client → POST /api/lead
│   └── pages/
│       └── Contato.tsx            # LP de captação (rota /contato)
├── .env.local                     # LEADS_WEBHOOK_URL (dev)
├── SETUP_LEADS.md                 # Guia passo-a-passo do setup
└── PLAYBOOK_CAPTACAO.md           # Este arquivo
```

---

## 4. Fluxo técnico detalhado

### 4.1. Usuário chega no site

```typescript
// src/hooks/use-tracking.ts
// Na PRIMEIRA visita da sessão, captura todos os parâmetros de origem
useTracking()
  // 1. Lê da URL: utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  //    fbclid, gclid, ttclid, msclkid
  // 2. Captura document.referrer + landingPath + landingUrl + firstVisit
  // 3. Deduz utm_source quando não veio explícita:
  //    - referrer google.com → "organic_google"
  //    - referrer facebook.com → "facebook"
  //    - fbclid presente → "facebook_ads"
  //    - gclid presente → "google_ads"
  //    - sem referrer → "direct"
  // 4. Persiste em sessionStorage — sobrevive a navegação no site
```

### 4.2. Usuário clica qualquer CTA

Todos os botões da LP (hero, unidades, CTA final, navbar) são
`<MagneticCtaButton intent="...">`. Nenhum é `<a href="tel:...">` ou
`<a href="wa.me/...">`.

```tsx
// Qualquer CTA abre o modal com contexto:
<MagneticCtaButton
  intent="urgencia"                       // muda cor (vermelho) + mensagem
  preselectMotivo="Urgência / Emergência" // pré-seleciona no dropdown
>
  Urgência 24h
</MagneticCtaButton>
```

**3 intents disponíveis:**
- `urgencia` — vermelho, mensagem "🚨 URGÊNCIA"
- `consulta` — verde, mensagem "gostaria de agendar uma consulta"
- `agendar` / `whatsapp` — verde, mensagem genérica de contato

### 4.3. Modal abre, usuário preenche

`LeadCaptureDialog.tsx` — 4 campos:
1. **Nome do tutor** (obrigatório, min 2 chars)
2. **WhatsApp** (obrigatório, formato com DDD, máscara automática)
3. **Nome do pet** (opcional)
4. **Motivo** (dropdown pré-selecionado pelo intent)

**Honeypot invisível:** campo `_hp` escondido com `position: absolute; left: -9999px`. Se vier preenchido, é bot → servidor finge sucesso mas descarta.

### 4.4. Submit dispara 2 ações em sequência

```typescript
// 1. POST /api/lead com todos os dados + tracking
await submitLead({
  nome, whatsapp, petNome, motivo,
  ...tracking, // utm_*, fbclid, gclid, referrer, etc.
  intent,
});

// 2. Redireciona pro WhatsApp com mensagem pré-montada
const waText = encodeURIComponent(buildWaMessage(intent, values));
window.open(`https://wa.me/${WA_NUMBER}?text=${waText}`, "_blank");
```

**Mensagens por intent:**

```
[URGÊNCIA]
🚨 *URGÊNCIA* — precisa de atendimento agora!

*Nome:* {nome}
*WhatsApp:* {whats} (pet: {petNome})
*Motivo:* {motivo}

Por favor, me atendam o mais rápido possível!

─────────

[CONSULTA]
Olá! Gostaria de agendar uma consulta.

*Nome:* {nome}
*WhatsApp:* {whats} (pet: {petNome})
*Motivo:* {motivo}

Quando podem me atender?
```

**Fallback gracioso:** se `/api/lead` falhar (rede, server down), ainda redireciona pro WhatsApp. Objetivo primário é NÃO perder o lead.

### 4.5. Vercel Function recebe e repassa

`api/lead.ts` roda no servidor (Node 24 / Fluid Compute):

1. Valida método POST
2. Lê env `LEADS_WEBHOOK_URL` (server-only, **nunca** vai pro cliente)
3. Parseia body JSON
4. Rejeita honeypot preenchido (200 OK falso)
5. Valida server-side: nome ≥ 2 chars, whatsapp ≥ 10 chars
6. Captura IP do `X-Forwarded-For`
7. Repassa TUDO (incluindo tracking) pro Apps Script
8. Timeout de 12s no fetch (pra não travar função)

**Por que uma função proxy em vez de POSTar direto do cliente?**
- Esconde a URL do Apps Script (senão ficaria no bundle JS público)
- Permite ler resposta real (Apps Script não envia CORS em POST)
- Adiciona validação server-side e IP
- Facilita adicionar rate limit / Turnstile / reCAPTCHA depois

### 4.6. Apps Script grava na planilha

`scripts/google-apps-script.js` — **26 colunas**:

| # | Coluna | Origem |
|---|---|---|
| 1 | Data/Hora | servidor |
| 2 | Nome | form |
| 3 | WhatsApp | form |
| 4 | E-mail | form (opcional) |
| 5 | Nome do Pet | form |
| 6 | Espécie | form |
| 7 | Motivo | form |
| 8 | Unidade | form |
| 9 | Mensagem | form |
| 10 | Intent (CTA) | qual botão foi clicado |
| 11 | UTM Source | URL / inferido |
| 12 | UTM Medium | URL |
| 13 | UTM Campaign | URL |
| 14 | UTM Content | URL |
| 15 | UTM Term | URL |
| 16 | Facebook Click ID | URL (`fbclid`) |
| 17 | Google Click ID | URL (`gclid`) |
| 18 | TikTok Click ID | URL (`ttclid`) |
| 19 | Bing Click ID | URL (`msclkid`) |
| 20 | Referrer | `document.referrer` |
| 21 | Landing Path | `/contato?utm=...` |
| 22 | Landing URL | URL completa |
| 23 | Primeira visita | ISO timestamp |
| 24 | Origem descrição | "LP Conversão - /contato" |
| 25 | User Agent | `navigator.userAgent` |
| 26 | IP | `X-Forwarded-For` |

Com essas 26 colunas você responde perguntas como:
- "Qual o CPL (custo por lead) do Meta Ads vs Google Ads?" → filtra `UTM Source`
- "Qual campanha trouxe mais urgências?" → filtra `UTM Campaign` + `Motivo = Urgência`
- "Qual criativo vem convertendo melhor?" → filtra `UTM Content`
- "Leads direct são realmente orgânicos?" → cruzando `Referrer` + `UTM Source`

---

## 5. SEO — FAQ + JSON-LD FAQPage

Componente `SeoFaq.tsx` — 10 perguntas visíveis (accordion) + texto semântico
com palavras-chave + JSON-LD FAQPage pra rich snippets no Google.

**Estratégia:**

- Perguntas em **linguagem natural**, exatamente como o usuário digita no Google ("Qual o telefone do pronto-socorro veterinário em Recife?", "Preciso agendar ou posso ir direto?")
- Respostas com **long-tail keywords** embutidas naturalmente
- JSON-LD `FAQPage` faz cada pergunta virar **rich snippet expandível** na SERP — triplica CTR
- Texto semântico extra (text-xs, opacity 25%) com variações das keywords — Google lê, humano nem repara

**Template de perguntas por vertical:**

- [Negócio] atende X?
- Qual o [canal de contato] de [negócio]?
- Onde fica [negócio] perto de mim em [cidade]?
- [Negócio] atende de [horário pouco usual, madrugada/fim de semana]?
- Quais [especialidades/serviços] [negócio] oferece?
- Preciso [agendar/marcar] ou posso [ação imediata]?
- [Negócio] atende [nicho específico]?
- [Negócio] tem [estrutura/diferencial]?
- Como [agendar/contratar] em [negócio]?
- Quanto tempo [negócio] tem de [experiência/mercado]?

---

## 6. Navegação visual — o que REMOVER

A LP tem visual rico (parallax, animações, logos), mas é POBRE em links de saída:

| Seção | O que a LP institucional tem | O que a LP de captação tem |
|---|---|---|
| Navbar | 4 links internos + CTA | Só logo + 1 CTA |
| Hero | 2 CTAs (1 vai pro form, 1 institucional) | 2 CTAs, ambos abrem modal |
| Unidades | Card com Ligar + Como chegar (Maps) | Card com 1 CTA: Agendar |
| Testimonials | Carousel | Lista estática (menor) |
| Footer | Links: Instagram, Facebook, unidades, horários | Só copyright + telefone |
| Outros | Redes sociais, blog, sobre, serviços | Nenhum |

**Regra prática:** se um elemento não leva pro modal, ele compete com o modal. Remove.

---

## 7. Setup pra replicar num cliente novo

### Passo 1 — Clonar a estrutura

Copiar para o projeto do novo cliente:
- `api/lead.ts`
- `scripts/google-apps-script.js`
- `src/hooks/use-tracking.ts`
- `src/hooks/use-seo.ts`
- `src/lib/submit-lead.ts`
- `src/components/landing/SeoFaq.tsx`
- `src/components/landing/conversion/` (pasta toda)
- `src/pages/Contato.tsx` (adaptar dados)
- `SETUP_LEADS.md`

### Passo 2 — Customizar `Contato.tsx`

Trocar:
- `WA_NUMBER` no `LeadCaptureDialog.tsx` pelo WhatsApp do cliente
- Dados de unidades (endereço, bairro)
- Testimonials
- FAQs (10 perguntas específicas do nicho)
- Texto SEO semântico
- Cores da marca (tailwind + estilo inline)
- Logo + nome no hero
- Metadados SEO (`useSeo`)

### Passo 3 — Criar a planilha do cliente

1. Google Sheets → nova planilha → nomeia (ex: "Cliente X — Leads site")
2. **Extensões → Apps Script**
3. Apaga código padrão, cola `scripts/google-apps-script.js`
4. Seleciona função `setupHeaders` → Executar → autoriza
5. **Implantar → Nova implantação → Tipo: Web app**
   - Executar como: Eu
   - Quem pode acessar: **Qualquer pessoa** ⚠️ (obrigatório)
6. Copia a URL

### Passo 4 — Vercel

1. Deploy do projeto (via CLI ou dashboard)
2. **Settings → Environment Variables**:
   - Name: `LEADS_WEBHOOK_URL`
   - Value: URL do Apps Script (passo 3.6)
   - Environments: Production + Preview + Development
   - Sensitive: ✅
3. Redeploy pra env entrar em vigor

### Passo 5 — Configurar tráfego

Em cada anúncio, **sempre** use UTMs nas URLs finais:

```
https://dominio-cliente.com.br/contato?utm_source=facebook_ads&utm_medium=cpc&utm_campaign={{nome_da_campanha}}&utm_content={{nome_do_criativo}}
```

Parâmetros recomendados por plataforma:

**Meta Ads (Facebook/Instagram)**
- `utm_source=facebook_ads` ou `instagram_ads`
- `utm_medium=cpc` / `cpm` / `social_paid`
- `utm_campaign={{campaign.name}}` (dinâmico)
- `utm_content={{ad.name}}` (dinâmico)
- `fbclid` — vem automático, não precisa adicionar

**Google Ads**
- `utm_source=google_ads`
- `utm_medium=cpc` / `display`
- `utm_campaign={campaignid}` (dinâmico)
- `utm_term={keyword}` (pra search ads)
- `utm_content={creative}` (dinâmico)
- `gclid` — vem automático com auto-tagging ativo

**TikTok Ads**
- `utm_source=tiktok_ads`
- `utm_medium=paid_social`
- `utm_campaign=__CAMPAIGN_NAME__` (dinâmico)
- `ttclid` — vem automático

**Google Meu Negócio / orgânico**
- `utm_source=gmn` / `organico`
- `utm_medium=organic`
- `utm_campaign=gmn_bio` / `gmn_post`

### Passo 6 — Teste end-to-end

```bash
# 1. GET do webhook deve responder OK
curl https://script.google.com/macros/s/SEU-ID/exec
# → "Harmonia leads OK (v2 — tracking)"

# 2. POST simulado via /api/lead
curl -X POST https://www.site-cliente.com.br/api/lead \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","whatsapp":"(81) 99999-0000","motivo":"Consulta","utm_source":"test"}'
# → {"ok":true}

# 3. Conferir que a linha caiu na planilha
```

### Passo 7 — Monitorar

**Dashboards mínimos pra equipe de tráfego:**

No próprio Google Sheets, crie abas com fórmulas:

```
=COUNTIFS(Leads!K:K, "facebook_ads")     // leads de Meta
=COUNTIFS(Leads!K:K, "google_ads")       // leads de Google Ads
=COUNTIFS(Leads!K:K, "direct")           // leads direct (ruim — melhorar atribuição)
=COUNTIFS(Leads!G:G, "Urgência*")        // % urgências (conversão mais quente)
```

Ou importe pro Looker Studio (gratuito) → Google Sheets connector → dashboards visuais.

---

## 8. Checklist de qualidade antes de ir ao ar

- [ ] Todos os CTAs abrem modal (nenhum `tel:`, `mailto:`, `wa.me` direto)
- [ ] Modal valida campos client-side (Zod) e server-side (api/lead)
- [ ] Honeypot `_hp` presente no form
- [ ] `LEADS_WEBHOOK_URL` configurada na Vercel **sem** prefixo `VITE_`
- [ ] Teste de POST retorna `{"ok":true}`
- [ ] Linha de teste aparece na planilha com TODAS as colunas preenchidas
- [ ] GET do webhook retorna "v2 — tracking"
- [ ] JSON-LD FAQPage validado em https://search.google.com/test/rich-results
- [ ] Meta tags OG/Twitter validadas em https://www.opengraph.xyz
- [ ] Site mobile e desktop testados (modal abre, scroll travado, ESC fecha)
- [ ] Botão WhatsApp abre com mensagem pré-preenchida
- [ ] Mensagem de urgência usa 🚨 e bold
- [ ] Sem console errors no DevTools
- [ ] Lighthouse ≥ 85 em Performance / ≥ 95 em SEO e Accessibility

---

## 9. Erros comuns e soluções

| Sintoma | Causa | Fix |
|---|---|---|
| Leads não chegam na planilha | Apps Script não publicado como "Qualquer pessoa" | Republicar com permissão correta |
| `/api/lead` retorna 500 | Env `LEADS_WEBHOOK_URL` faltando | Setar na Vercel + redeploy |
| UTMs não aparecem na planilha | Apps Script antigo (v1) | Rodar `setupHeaders` e republicar |
| Lead chega sem tracking | Usuário navegou DEPOIS da primeira visita sem preservar sessionStorage | Normal se abriu em aba anônima nova — tracking só vale pra mesma sessão |
| Modal trava scroll depois de fechar | `body.style.overflow` não restaurado | Já tratado — cleanup do useEffect |
| Build falha na Vercel (hobby plan) | Commit de autor externo em repo privado | Tornar repo público ou usar repo no mesmo owner |
| GET do webhook cachê errado | CDN ou browser cache | Adicionar `?v=2` ou esperar TTL (~10min) |

---

## 10. Próximas iterações possíveis

Quando a base estiver estável, dá pra evoluir pra:

1. **Meta Conversions API** — mandar evento `Lead` direto pro Meta server-side
   (melhor tracking pós-iOS 14.5)
2. **Google Ads Conversion Tracking** — disparar conversão no submit
3. **Rate limit** — proteger `/api/lead` de spam (Upstash Redis grátis até 10k req/day)
4. **Cloudflare Turnstile** — CAPTCHA invisível quando honeypot não basta
5. **Webhook Telegram/Slack** — notificação em tempo real pra equipe quando cai lead
6. **Retry queue** — se Apps Script cair, salvar em Vercel KV e reenviar
7. **A/B test** — duas versões do headline/CTA no mesmo domínio, split 50/50
8. **Pixel de remarketing** — Meta Pixel + Google Tag Manager na page (tag por intent)

---

## 11. Resumo executivo (pra vender o modelo)

Esta LP transforma tráfego pago em conversa no WhatsApp **sem fricção** e
**com atribuição completa**. Custo de infra: **R$ 0/mês** (Vercel free tier +
Google Sheets). Tempo de implementação em cliente novo: **4-6 horas**.

Diferenciais sobre um formulário comum:
- 📊 Tracking por UTM/fbclid/gclid em cada lead
- ⚡ Equipe recebe WhatsApp com dados prontos (reduz tempo de 1º contato)
- 🎯 Mensagem contextual por intenção (urgência ≠ consulta)
- 🔒 URL do webhook escondida (não vaza em DevTools)
- 🛡️ Anti-spam (honeypot + validação server-side)
- 🔍 SEO rich snippets (FAQ expandível na SERP)
- 💸 Sem custo de banco de dados
