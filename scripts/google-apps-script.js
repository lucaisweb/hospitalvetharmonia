/**
 * ============================================================================
 *  Hospital Harmonia — Webhook para salvar leads no Google Sheets
 * ============================================================================
 *
 * Este arquivo é pra você COPIAR e COLAR no editor do Google Apps Script.
 * Passos completos: ver SETUP_LEADS.md na raiz do projeto.
 *
 * O que ele faz:
 *   1. Recebe um POST com JSON do formulário
 *   2. Abre a planilha ativa (onde você vai colar esse script)
 *   3. Adiciona uma nova linha com os dados do lead
 *   4. Devolve {ok: true}
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
  'Origem',
  'User Agent'
];

/**
 * Inicializa o cabeçalho da planilha (roda 1x manualmente).
 * No editor do Apps Script, selecione a função "setup" e clique em "Executar".
 */
function setup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#0d6b3a')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
}

/**
 * Endpoint POST que recebe os leads.
 * Após publicar como Web App (ver SETUP_LEADS.md), o app responde aqui.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) setup();

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
      data.origem || '',
      data.userAgent || ''
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
        '<p><b>E-mail:</b> ' + (data.email || '—') + '</p>' +
        '<p><b>Pet:</b> ' + (data.petNome || '—') + ' (' + (data.petEspecie || '—') + ')</p>' +
        '<p><b>Motivo:</b> ' + (data.motivo || '') + '</p>' +
        '<p><b>Unidade:</b> ' + (data.unidade || '') + '</p>' +
        '<p><b>Mensagem:</b><br>' + (data.mensagem || '—') + '</p>'
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
 * Você pode abrir a URL no navegador e deve ver "Harmonia leads OK".
 */
function doGet() {
  return ContentService.createTextOutput('Harmonia leads OK');
}
