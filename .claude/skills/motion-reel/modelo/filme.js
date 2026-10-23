/**
 * filme.js - a ficha do filme: tudo o que muda de um filme para outro. O motor (index.html) lê window.FILME.
 * Edite aqui (e os capítulos); não edite o motor.
 */
window.FILME = {
  nome: 'exemplo',
  bpm: 120,
  batidas: 32,                 // duração = batidas x 60 / bpm (32 batidas a 120 BPM = 16 s); múltiplo de 4 fecha o compasso
  formato: 'horizontal',       // o padrão; o render troca com --formato vertical | quadrado
  formatos: {
    // seguro = margens (fração do quadro) onde não vai texto nem logo: a interface da plataforma fica ali
    horizontal: { w: 1920, h: 1080, seguro: { cima: 0.06, baixo: 0.08, lados: 0.06 } },
    vertical: { w: 1080, h: 1920, seguro: { cima: 0.12, baixo: 0.2, lados: 0.07 } },   // Reels / Stories / TikTok
    quadrado: { w: 1080, h: 1080, seguro: { cima: 0.06, baixo: 0.08, lados: 0.06 } },
  },
  // as cores da marca (do site: assets/inventario.json). UM destaque só, a não ser que o briefing diga outra coisa.
  cor: {
    TINTA: '#2A1F18', TINTA2: '#6B5C4E', LINHA: '#CFC6BD', CLARO: '#F1EDE9', APAGADO: '#B5AA9F',
    DESTAQUE: '#EA6E1A', DESTAQUE_ESCURO: '#C05810', DESTAQUE_CLARO: '#FFF0E8', BRANCO: '#FFFFFF', OK: '#137456',
    FUNDO: '#F5F3F0',          // fundo neutro e quente
    FUNDO_ANTES: '#ECE7E1',    // o fundo do "antes" (só se houver virada)
  },
  // uma fonte de título e uma de interface (declare os @font-face no <style> do index.html)
  fonte: { TITULO: '"DM Sans"', UI: '"DM Sans"', MONO: '"DM Mono"' },
  pesoTitulo: 800,
  // px no espaço do formato. Legenda de 84 px num quadro de 1920 vira 16 px num celular de 360: o mínimo confortável
  tam: { LEG: 84, UI: 68, MONO: 64, TITULO: 96, TRACO: 6 },
  // "antes / depois" (opcional): até a batida da virada, faixas de cinema + câmera na mão + FUNDO_ANTES;
  // no retorno tudo isso volta até o último quadro (o loop fecha com o primeiro). null desliga.
  virada: null,
  retorno: null,
  faixas: true,                // faixas de cinema no "antes" (só no horizontal)
  // trilha (trilha.js): progressão por compasso [grave MIDI, [notas do acorde]], acentos (batidas) e o fim
  trilha: {
    progressao: [[48, [72, 76, 79]], [43, [71, 74, 79]], [45, [69, 72, 76]], [41, [69, 72, 77]]],   // C G Am F
    intro: 1,                  // compassos de abertura, só com relógio, bumbo e o motivo
    acentos: [16],             // batidas de momento grande (a cartela, o logo): bumbo + acorde + sino
    fim: 'anacruse',           // 'anacruse' (puxa o loop de volta ao primeiro tempo) ou 'acorde' (fecha e soa)
  },
};
