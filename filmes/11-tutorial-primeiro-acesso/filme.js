/**
 * filme.js - a ficha do filme 11: tutorial de primeiro acesso da VAI DE LOKAL (60 s, 9:16, 120 BPM).
 * Planos: docs/lista-de-planos.md. Estilo: docs/guia-de-estilo.md. Contrato dos capítulos: docs/GUIA-DE-ANIMACAO.md.
 */
window.FILME = {
  nome: '11-tutorial-primeiro-acesso',
  bpm: 120,
  batidas: 120,                // 120 batidas a 120 BPM = 60,0 s (30 compassos)
  formato: 'vertical',         // o filme é só vertical: o tutorial abre dentro do app, no celular
  formatos: {
    // seguro = margens (fração do quadro) onde não vai texto nem logo: a barra de progresso e os botões do player
    vertical: { w: 1080, h: 1920, seguro: { cima: 0.12, baixo: 0.2, lados: 0.07 } },
  },
  // as cores do briefing (as mesmas variáveis do site). UM destaque só: o laranja. Nada de creme.
  cor: {
    TINTA: '#2A1F18', TINTA2: '#6B5C4E', LINHA: 'rgba(42,31,24,0.10)', CLARO: '#FFF0E8', APAGADO: '#6B5C4E',
    DESTAQUE: '#EA6E1A', DESTAQUE_ESCURO: '#EA6E1A', DESTAQUE_CLARO: '#FFF0E8', BRANCO: '#FFFFFF', OK: '#1D9E75',
    FUNDO: '#FFFFFF',
    FUNDO_ANTES: '#FFFFFF',
  },
  // DM Sans (800 nos títulos e na legenda, 700 nos rótulos); DM Mono 500 só no ID e na palavra-chave
  fonte: { TITULO: '"DM Sans"', UI: '"DM Sans"', MONO: '"DM Mono"' },
  pesoTitulo: 800,
  // px no quadro de 1080x1920; o celular de 360 px divide por 3 (legenda de 72 px = 24 px no celular)
  tam: { LEG: 72, UI: 60, MONO: 170, TITULO: 132, TRACO: 6, ROTULO: 72, PRECO: 240, CODIGO: 110, ASSINATURA: 80 },
  virada: null,                // tutorial: sem "antes" (sem faixas de cinema, sem câmera na mão)
  retorno: null,
  faixas: false,
  // trilha (trilha.js): dó maior, I-V-vi-IV por compasso, acentos nos momentos grandes e anacruse que puxa o loop
  trilha: {
    progressao: [[48, [72, 76, 79]], [43, [71, 74, 79]], [45, [69, 72, 76]], [41, [69, 72, 77]]],   // C G Am F
    intro: 1,
    acentos: [4, 18, 24, 56, 74, 84, 94, 100, 112],
    fim: 'anacruse',
  },
};
