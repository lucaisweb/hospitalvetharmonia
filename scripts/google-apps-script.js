/**
 * ============================================================================
 *  Hospital Harmonia — Webhook para salvar leads no Google Sheets
 * ============================================================================
 *
 * Copie e cole esse arquivo TODO no editor do Google Apps Script.
 * Passos completos: ver SETUP_LEADS.md na raiz do projeto.
 *
 * O que ele faz:
 *   1. Recebe um POST com JSON do formulário (via Vercel Function proxy)
 *   2. Grava uma linha nova na planilha ativa
 *   3. Captura também tracking/atribuição (UTMs, fbclid, gclid, referrer)
 *      pra você saber de onde veio cada lead
 *   4. Devolve {ok: true}
 *
 * IMPORTANTE: depois de atualizar esse script, você precisa:
 *   1. Rodar `setupHeaders()` uma vez pra atualizar o cabeçalho
 *   2. Publicar uma nova versão do Web App (Implantar → Gerenciar implantações)
 */

// Ordem das colunas na planilha. Mantenha igual ao cabeçalho da Sheet.
var HEADERS = [
  'Data/Hora',
  'Nome',
  'WhatsApp',
  'E-mail',
  'Nome do Pet',
  'Espécie',
  'Motivo',
  'Unidade',
  'Mensagem',
  'Intent (CTA)',
  // ── Atribuição / Tracking ──
  'Origem (UTM Source)',
  'Meio (UTM Medium)',
  'Campanha (UTM Campaign)',
  'Conteúdo (UTM Content)',
  'Termo (UTM Term)',
  'Facebook Click ID',
  'Google Click ID',
  'TikTok Click ID',
  'Bing Click ID',
  'Referrer (página anterior)',
  'Landing Path',
  'Landing URL',
  'Primeira visita',
  // ── Técnicos ──
  'Origem descrição',
  'User Agent',
  'IP'
];

/**
 * Inicializa ou atualiza o cabeçalho da planilha.
 * Rode manualmente 1x depois de colar/atualizar o script.
 */
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // Apaga a primeira linha se já existir algo diferente, reescreve tudo
  if (sheet.getLastRow() > 0) {
    sheet.getRange(1, 1, 1, sheet.getLastColumn() || HEADERS.length).clearContent();
  }
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#0d6b3a')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

// Alias antigo pra manter retrocompatibilidade caso alguém rode "setup"
function setup() { setupHeaders(); }

/**
 * Endpoint POST que recebe os leads vindos da Vercel Function.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) setupHeaders();

    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.whatsapp || '',
      data.email || '',
      data.petNome || '',
      data.petEspecie || '',
      data.motivo || '',
      data.unidade || '',
      data.mensagem || '',
      data.intent || '',
      // Tracking
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_content || '',
      data.utm_term || '',
      data.fbclid || '',
      data.gclid || '',
      data.ttclid || '',
      data.msclkid || '',
      data.referrer || '',
      data.landingPath || '',
      data.landingUrl || '',
      data.firstVisit || '',
      // Técnicos
      data.origem || '',
      data.userAgent || '',
      data.ip || ''
    ]);

    // (opcional) notificação por e-mail para a recepção do hospital.
    // Para ativar: descomente o bloco abaixo e troque o e-mail.
    /*
    MailApp.sendEmail({
      to: 'adm@hospitalharmonia.vet.br',
      subject: '🐾 Novo lead — ' + (data.nome || 'sem nome'),
      htmlBody:
        '<h3>Novo lead no site</h3>' +
        '<p><b>Nome:</b> ' + (data.nome || '') + '</p>' +
        '<p><b>WhatsApp:</b> ' + (data.whatsapp || '') + '</p>' +
        '<p><b>Pet:</b> ' + (data.petNome || '—') + '</p>' +
        '<p><b>Motivo:</b> ' + (data.motivo || '') + '</p>' +
        '<p><b>Origem:</b> ' + (data.utm_source || 'direct') + '</p>' +
        '<p><b>Intent:</b> ' + (data.intent || '') + '</p>'
    });
    */

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET usado só para checar se o Web App está no ar.
 */
function doGet() {
  return ContentService.createTextOutput('Harmonia leads OK (v2 — tracking)');
}
