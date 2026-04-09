# Setup — Captura de leads da LP `/contato`

A landing page de conversão (rota `/contato`) tem um formulário que envia os
dados do usuário para uma **planilha Google Sheets** via **Google Apps Script**.
Isso é 100% gratuito — nada de Supabase, nada de custo mensal.

---

## Passo 1 — Criar a planilha

1. Vá em [sheets.google.com](https://sheets.google.com) e crie uma planilha
   nova em branco.
2. Dê um nome, por ex.: **"Harmonia — Leads do site"**.
3. Deixe a aba padrão (`Página1` ou `Sheet1`). Não precisa criar cabeçalho, o
   script faz isso pra você.

---

## Passo 2 — Colar o script no Apps Script

1. Ainda com a planilha aberta, clique em **Extensões → Apps Script**.
2. Vai abrir um editor. Apague o código `function myFunction() {}` que vem por
   padrão.
3. Abra o arquivo [`scripts/google-apps-script.js`](scripts/google-apps-script.js)
   deste repositório, **copie tudo** e cole no editor.
4. Clique no ícone de salvar (ou `Ctrl+S`). Dê um nome ao projeto, por ex.:
   **"Harmonia Leads Webhook"**.

---

## Passo 3 — Rodar o `setup` uma vez

1. No editor do Apps Script, no topo, selecione a função **`setup`** no dropdown
   (ao lado do botão "Executar").
2. Clique em **Executar**.
3. O Google vai pedir autorização — clique em **Revisar permissões**, escolha
   sua conta, clique em **Avançado → Ir para Harmonia Leads Webhook (não
   seguro) → Permitir**.
   > O aviso "não seguro" aparece só porque o script não foi publicado na loja
   > pública do Google. Ele é seu, rodando na sua conta, na sua planilha.
4. Volte para a planilha: a primeira linha deve estar preenchida com o
   cabeçalho verde escuro. Pronto.

---

## Passo 4 — Publicar como Web App

1. No editor do Apps Script, clique em **Implantar → Nova implantação**.
2. No pop-up, clique na engrenagem (ícone de configuração) ao lado de "Selecione
   o tipo" e escolha **Web app**.
3. Preencha:
   - **Descrição:** `Harmonia leads webhook v1`
   - **Executar como:** `Eu (seu@email.com)`
   - **Quem pode acessar:** **Qualquer pessoa** ⚠️ (isso permite que o site
     envie dados sem exigir login — é obrigatório)
4. Clique em **Implantar**.
5. Autorize novamente se pedir.
6. Copie a **URL do aplicativo da Web** que aparece. Ela é algo assim:

   ```
   https://script.google.com/macros/s/AKfyc...LONGO.../exec
   ```

   **Guarde essa URL — é o seu webhook.**

> 💡 **Teste rápido:** cole a URL no navegador. Deve aparecer o texto
> `Harmonia leads OK`. Se aparecer, está no ar.

---

## Passo 5 — Configurar a variável de ambiente no projeto

### Para desenvolvimento local

Crie um arquivo **`.env.local`** na raiz do projeto (na mesma pasta do
`package.json`):

```env
LEADS_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
```

> ⚠️ **Sem o prefixo `VITE_`** — essa env é lida APENAS pela Vercel Function
> em `api/lead.ts` no servidor, e NUNCA vai pro bundle do cliente. Isso
> garante que a URL do Apps Script fica escondida do navegador.

Reinicie o `npm run dev` ou `bun dev`. Em dev, a Vercel Function não roda
localmente com o Vite — pra testar o fluxo end-to-end em dev você precisa de
`vercel dev` (opcional).

### Para produção na Vercel

1. Vá ao dashboard do projeto na Vercel.
2. **Settings → Environment Variables**.
3. Adicione:
   - **Name:** `LEADS_WEBHOOK_URL` ← sem `VITE_`, é server-only
   - **Value:** a URL do webhook que você copiou no passo 4
   - **Environments:** marque `Production`, `Preview` e `Development`
   - **Sensitive:** ✅ marque pra proteger o valor
4. Clique em **Save**.
5. Faça um novo deploy (a env só entra em builds novos).

Ou via CLI:

```bash
vercel env add LEADS_WEBHOOK_URL production --sensitive
```

---

## Passo 6 — Testar o formulário

1. Abra `/contato` no site (ou localmente em `http://localhost:5173/contato`).
2. Preencha o formulário com dados de teste.
3. Clique em **Quero ser contatado**.
4. Abra a planilha — uma nova linha deve aparecer em alguns segundos.

Se não aparecer:
- Confirme que a URL do webhook está correta na env.
- Confirme que publicou como **"Qualquer pessoa"** pode acessar.
- Abra o console do navegador (F12) e veja se há erro.
- No Apps Script, **Executions** (menu lateral) mostra logs de cada POST.

---

## Como funciona o fluxo

```
[Formulário /contato]                    ← browser (React)
       │
       │  POST /api/lead  (JSON, same-origin)
       ▼
[Vercel Function: api/lead.ts]           ← server (Node, Fluid Compute)
       │     • valida campos
       │     • honeypot
       │     • lê LEADS_WEBHOOK_URL do env
       │
       │  POST JSON
       ▼
[Google Apps Script Web App]             ← Google
       │
       │  appendRow()
       ▼
[Google Sheets — "Harmonia Leads"]
```

**Por que uma Vercel Function no meio?**

1. **Esconde a URL do webhook.** Antes, usávamos `VITE_LEADS_WEBHOOK_URL`, que
   o Vite embutia no bundle JS do cliente — qualquer pessoa podia abrir o
   DevTools e pegar a URL. Agora ela vive só no servidor.
2. **Dá pra ler status real.** Antes usávamos `mode: "no-cors"` pra burlar a
   falta de CORS do Apps Script; mas isso esconde falhas. Agora o client fala
   same-origin com `/api/lead` e recebe um JSON real de sucesso/erro.
3. **Validação server-side.** O `api/lead.ts` valida nome mínimo, whatsapp
   mínimo, e descarta requisições com honeypot preenchido (bots).
4. **Base pra evoluir.** Dá pra adicionar rate-limit, Turnstile/reCAPTCHA,
   notificação, etc. sem tocar no front.

---

## Redeploy do script (quando alterar o código)

Cada vez que você editar `scripts/google-apps-script.js` e colar no editor do
Apps Script:

1. `Ctrl+S` para salvar.
2. **Implantar → Gerenciar implantações**.
3. Clique no lápis (editar) da implantação ativa.
4. Em **Versão**, escolha **Nova versão**.
5. Clique em **Implantar**.
6. A URL continua a mesma.

---

## Checklist rápido

- [ ] Planilha criada
- [ ] Script colado no Apps Script
- [ ] Função `setup` executada (cabeçalho aparece na planilha)
- [ ] Web app publicado com acesso "Qualquer pessoa"
- [ ] URL do webhook copiada
- [ ] `LEADS_WEBHOOK_URL` configurada (local e Vercel, **sem** prefixo `VITE_`)
- [ ] Teste enviado, apareceu na planilha
