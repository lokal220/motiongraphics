/**
 * Capítulo de exemplo (skill motion-reel): 32 batidas, 16 s a 120 BPM, nos três formatos. Mostra cada mecanismo
 * do motor e serve de molde. Troque pelo roteiro do filme (docs/lista-de-planos.md), um capítulo por bloco.
 *
 *   P01 (b0-3)    abertura: o ícone já desenhado no primeiro quadro; a frase sobe pela máscara
 *   P02 (b4-7)    o contêiner vira um botão; o cursor chega e toca no b6 (o botão afunda, o anel abre)
 *   P03 (b8-15)   uma lista: cada linha sobe na sua batida e ganha um check que se desenha (pílula de legenda)
 *   P04 (b16-27)  a cartela: o contêiner cresce branco e o destaque SOBE por dentro como cortina (sem passar
 *                 pela cor intermediária); a cor do contêiner troca escondida atrás dela. Algo novo a cada
 *                 2 batidas no máximo: a marca (b17), o traço sob ela (b20), o endereço (b22) e o pin (b24)
 *   P05 (b28-31)  a volta ao primeiro quadro (loop): a cartela encolhe ainda no destaque, uma cortina branca desce
 *                 por dentro, e a abertura se desenha de novo até ficar igual ao t = 0
 *
 * Tudo é função pura do tempo; batidas sempre por F.TB(n). Regras: referencia/guia-de-animacao.md.
 */
(function () {
  'use strict';
  const { cor, tam, TB, M, W0, H0 } = F;
  const { easeOut, easeIn, easeInOut, prog, impulse, rrPts, arcPts } = M;
  const CX = W0 / 2, CY = H0 / 2;
  const est = (dims) => Object.assign({ cx: CX, cy: CY }, F.porFormato(dims));

  // ---------------------------------------------------------------- estados do contêiner (por formato)
  const ABERTURA = est({ horizontal: { w: 1180, h: 480, r: 40 }, vertical: { w: 880, h: 760, r: 44 }, quadrado: { w: 880, h: 700, r: 40 } });
  const BOTAO = est({ horizontal: { w: 860, h: 190, r: 95 }, vertical: { w: 820, h: 190, r: 95 }, quadrado: { w: 820, h: 190, r: 95 } });
  const LISTA = est({ horizontal: { w: 1000, h: 640, r: 44 }, vertical: { w: 900, h: 900, r: 44 }, quadrado: { w: 900, h: 760, r: 44 } });
  const CHEIO = { cx: CX, cy: CY, w: W0 + 40, h: H0 + 40, r: 0, sombra: 0 };

  // ---------------------------------------------------------------- P01: a abertura (também o último quadro do loop)
  // no horizontal, ícone à esquerda e frase ao lado; no vertical e no quadrado, empilhados (a frase não cabe ao lado)
  const empilha = F.formato !== 'horizontal';
  const ICONE = empilha ? { x: -ABERTURA.w / 2 + 190, y: -ABERTURA.h / 2 + 200, s: 1.1 } : { x: -ABERTURA.w / 2 + 170, y: 0, s: 1 };
  const TXT = empilha ? { x: -ABERTURA.w / 2 + 90, y: ABERTURA.h / 2 - 210 } : { x: -ABERTURA.w / 2 + 330, y: -26 };
  /** O conteúdo da abertura na pose t; p (0..1) = o traço se desenhando (1 = inteiro). */
  function abertura(ctx, t, a, p = 1) {
    const { x, y, s } = ICONE;
    a.pen(cor.TINTA);
    a.path(rrPts(x - 90 * s, y - 50 * s, 180 * s, 130 * s, 12 * s), M.clamp(p * 1.4), true);   // uma caixa em traço
    a.path([[x - 104 * s, y - 50 * s], [x - 80 * s, y - 104 * s], [x + 80 * s, y - 104 * s], [x + 104 * s, y - 50 * s]], M.clamp(p * 1.4 - 0.2));
    a.path([[x, y - 104 * s], [x, y - 50 * s]], M.clamp(p * 1.4 - 0.4));
    // a frase sobe pela máscara depois do primeiro tempo (no t = 0 ela ainda não está: a pose do loop é a mesma)
    a.sobe(t, TB(0) + 0.1, TB(4) - 0.26, 'Um contêiner', TXT.x, TXT.y, tam.TITULO);
    a.sobe(t, TB(0) + 0.17, TB(4) - 0.26, 'que nunca corta.', TXT.x, TXT.y + tam.TITULO * 1.12, tam.TITULO, { cor: cor.TINTA2 });
  }

  // ---------------------------------------------------------------- P02: o botão e o toque
  const TOQUE = TB(6);
  function botao(ctx, t, a) {
    const k = 1 - 0.05 * Math.max(0, impulse(t - TOQUE, 4));
    ctx.save(); ctx.scale(k, k);
    a.sobe(t, a.t0 + 0.05, TB(8) - 0.26, 'Toque aqui', 0, tam.UI * 0.36, tam.UI, { peso: 700, ui: true, alinha: 'center' });
    ctx.restore();
    // o anel de destaque abre a partir do toque (contorno, sem brilho)
    const u = easeOut(prog(t, TOQUE, TOQUE + 0.5));
    if (u > 0) { a.pen(cor.DESTAQUE, 6); a.path(rrPts(-BOTAO.w / 2 + 12, -BOTAO.h / 2 + 12, BOTAO.w - 24, BOTAO.h - 24, BOTAO.r - 12), u, true); }
  }

  // ---------------------------------------------------------------- P03: a lista
  const ITENS = [['Interface real.', 9], ['Molas, sem quique.', 10], ['Som na batida.', 11]];
  function lista(ctx, t, a) {
    const passo = 150, y0 = -passo, x0 = -LISTA.w / 2 + 90;
    ITENS.forEach(([s, n], i) => {
      const y = y0 + i * passo, tc = TB(n);
      a.sobe(t, tc + 0.04, TB(16) - 0.26, s, x0 + 110, y + 24, tam.UI, { peso: 700, ui: true });
      const p = easeOut(prog(t, tc, tc + 0.3));
      if (p > 0) { a.pen(cor.DESTAQUE, 7); a.path([[x0, y], [x0 + 24, y + 24], [x0 + 64, y - 26]], p); }   // o check se desenha
    });
  }

  /** Largura de um texto com a mesma fonte e o mesmo espaçamento que a.texto usa para desenhá-lo. */
  function mede(ctx, s, size) {
    ctx.font = `${window.FILME.pesoTitulo} ${size}px ${F.fonte.TITULO}`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${(-0.02 * size).toFixed(1)}px`;
    return ctx.measureText(s).width;
  }

  // ---------------------------------------------------------------- P04: a cartela (cortina de destaque)
  function cartela(ctx, t, a) {
    const c = easeInOut(prog(t, TB(16), TB(16) + 0.42));
    a.fill(-W0, H0 / 2 + 40 - (H0 + 120) * c, W0 * 2, (H0 + 120) * c, 0, cor.DESTAQUE);   // sobe de baixo para cima
    const x = -W0 / 2 + W0 * F.seguro.lados + 30, sai = TB(28) - 0.26;
    a.sobe(t, TB(17), sai, 'Sua marca aqui.', x, -10, tam.TITULO, { cor: cor.BRANCO });
    // o traço sob a marca se desenha (b20) e recolhe junto com o texto
    const largura = mede(ctx, 'Sua marca aqui.', tam.TITULO);
    const p = easeOut(prog(t, TB(20), TB(20) + 0.5)), q = easeIn(prog(t, sai, sai + 0.24));
    if (p > q) { a.pen(cor.BRANCO, 8); a.path([[x + largura * q, 26], [x + largura * p, 26]], 1); }
    a.sobe(t, TB(22), sai, 'seusite.com.br', x, tam.TITULO * 0.9 + 40, tam.LEG, { cor: cor.BRANCO });
    // o pin cai ao lado do endereço (b24) e assenta com mola, sem quicar
    if (t >= TB(24) && t < sai + 0.24) {
      const xp = x + mede(ctx, 'seusite.com.br', tam.LEG) + 70, cai = M.step(t - TB(24), 2.6);
      a.pin(xp, tam.TITULO * 0.9 + 40 - 70 * (1 - cai) - 120 * easeIn(prog(t, sai, sai + 0.24)), 0.9, cor.BRANCO);
    }
  }

  // ---------------------------------------------------------------- P05: a volta ao primeiro quadro (loop exato)
  function volta(ctx, t, a) {
    const c = easeInOut(prog(t, TB(28) + 0.08, TB(28) + 0.5));
    // a cortina branca só é desenhada até a cor do contêiner trocar por baixo (b28.75): assim as bordas
    // antisserrilhadas do último quadro ficam iguais às do primeiro
    if (t < TB(28.75) + 0.3) a.fill(-W0, -H0, W0 * 2, (H0 * 2) * c, 0, cor.BRANCO);
    abertura(ctx, 0, a, easeOut(prog(t, TB(28) + 0.36, TB(28) + 0.86)));
  }

  F.registra({
    nome: 'Exemplo',
    inicial: 'abertura',
    planos: [
      { id: 'P01', de: 0, ate: 4, chave: [0, 1, 2.5] },
      { id: 'P02', de: 4, ate: 8, chave: [5, 6.2, 7.5] },
      { id: 'P03', de: 8, ate: 16, chave: [9.5, 11.5, 14] },
      { id: 'P04', de: 16, ate: 28, chave: [16.3, 18, 24] },
      { id: 'P05', de: 28, ate: 32, chave: [28.3, 29, 31.9] },
    ],
    estados: {
      abertura: ABERTURA, botao: BOTAO, lista: LISTA,
      cartela_branca: Object.assign({ cor: 0, whoosh: 1.3 }, CHEIO),
      cartela: Object.assign({ cor: 1, whoosh: 0 }, CHEIO),          // whoosh 0: troca escondida, sem som
      volta: Object.assign({}, ABERTURA, { cor: 1, whoosh: 1.2 }),
      fim: Object.assign({}, ABERTURA, { whoosh: 0 }),
    },
    morphs: [[4, 'botao'], [8, 'lista'], [16, 'cartela_branca', 2.6], [16.5, 'cartela', 3], [28, 'volta', 2.6], [28.75, 'fim', 3]],
    conteudo: [
      { de: 0, ate: 4, atraso: -1, desenha: (ctx, t, a) => abertura(ctx, t, a) },   // atraso -1: já está no t = 0
      { de: 4, ate: 8, desenha: botao },
      { de: 8, ate: 16, desenha: lista },
      { de: 16, ate: 28.75, atraso: 0, saida: false, desenha: cartela },
      { de: 28, ate: 32, atraso: 0, saida: false, desenha: volta },
    ],
    legendas: [{ de: 12, ate: 16, linhas: ['Exemplo da skill motion-reel.'], estilo: 'pilula' }],
    cursor: {
      // a ponta para no quarto de baixo à direita do botão (a seta não cobre o rótulo); sai do quadro e para
      moves: [[5, [CX + BOTAO.w * 0.3, CY + 40], 2.4], [7, [W0 + 140, H0 + 140], 1.8]],
      cliques: [6],
    },
    camera: [[8, { z: 1.03 }, 0.4], [16, { z: 1 }, 1.2]],
    deixas: [
      { beat: 6, tipo: 'pop' },
      ...ITENS.map(([, n]) => ({ beat: n, tipo: 'pop', ganho: 0.6 })),
      { beat: 16, tipo: 'thump', rotulo: 'a cartela' },
      { beat: 24, tipo: 'pop', rotulo: 'o pin' },
    ],
    ativos: {},   // imagens reais: { nome: '../../assets/arquivo.png' } e depois a.img(nome, x, y, largura, recorte)
  });
})();
