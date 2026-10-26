/**
 * Capítulo 4: retirada e fim (P15-P20, batidas 84-120, 42-60 s). Ver docs/lista-de-planos.md e docs/GUIA-DE-ANIMACAO.md.
 * Registro da crítica: docs/critica/cap4.md.
 *
 *   P15 (b84-88)   arrasto b83,75-b84,6: o dedo apoia parado no canto da pílula e, no b84, puxa a tela para baixo junto
 *                  com a borda de baixo dela (1,5 Hz): a tela real "Retirada" cresce a partir da pílula (0,74x); anel
 *                  no QR (b85); arrasto b86-b87: a tela rola junto com o dedo até a caixa do código, e a janela encolhe
 *                  em volta dela (sem o "Se demorar" e sem o PKG-1031)
 *   P16 (b88-94)   toque na caixa do código (b88, não no "Copiar"), e o dedo sai no b88,2; no b89 a caixa, o anel e a
 *                  linha "Mostre..." sobem 24 px e saem por uma máscara que sobe (0,14 s), o CAIXA.482913 da caixa real
 *                  parte em TB(89) + 0,06, cresce e vira o código grande (DM Mono 110) e o rótulo "Palavra-chave da
 *                  retirada" (72 px, 700, tinta 2) sobe em cima; o arrasto b93-b94 sobe pela direita do código (x 985)
 *   P17 (b94-100)  arrasto b93-b94: "7 dias úteis pra buscar com calma." em 132 px, cartão centrado em y 883 (sem legenda)
 *   P18 (b100-112) arrasto b99-b100: a frase da taxa em 60 px (tinta 2), com o R$ 0,84 em 132 px (D13); no b106 o cartão
 *                  cresce, o texto sobe para dar lugar e entra o teto da taxa (60 px, tinta), separado por um fio; o pop
 *                  leve cai com o teto (b106,5)
 *   P19 (b112-116) arrasto b111-b112: no b112, com o thump, a cortina laranja sobe do pé do quadro (0,07 s na camada
 *                  frente, depois no conteúdo) e a caixa cresce além do quadro; o pin cai (de TB(112) + 0,18) no quadro
 *                  já laranja e vazio e pousa no "O" no b113, com hora marcada; a logo se abre a partir dele e a frase
 *                  sobe embaixo
 *   P20 (b116-120) a frase sai (b119) e fica a cartela idêntica ao quadro 0 (F.abertura, do capítulo 1)
 *
 * O dedo: entre gestos a até 2 batidas um do outro ele desliza (como no capítulo 1); fora isso sai pela direita
 * logo depois do gesto e volta de meia a uma batida antes do próximo. Com legenda (b84-b94), fica acima de y 1250.
 */
(function () {
  'use strict';
  const { cor, tam, TB, M, W0, H0 } = F;
  const { easeOut, easeIn, easeInOut, prog, step, track, lerp } = M;
  const U = F.u;

  // ---------------------------------------------------------------- desfoque liso nos movimentos longos e rápidos
  // Numa rolagem de ~650 px, numa cortina de 2250 px em 0,27 s ou num pin que cai 900 px, os subquadros do motor dão
  // cópias separadas. Aqui cada subquadro soma mais 4 amostras ('lighter', 1/4 cada, num buffer do tamanho do quadro,
  // limpo a cada desenho), e o rastro sai liso (a mesma técnica do capítulo 3). Só com desfoque (F.SUB > 1); com sub=1
  // desenha uma vez. Nada passa de um quadro para outro.
  // Cuidado: no buffer tudo soma. Uma forma desenhada por cima de outra na mesma amostra (um anel sobre a tela branca)
  // satura em branco; por isso cada coisa que se sobrepõe vai no seu próprio borrado.
  let BUF = null;
  const N_AMOSTRAS = () => (F.SUB > 1 ? 4 : 1);
  const amostras = (t, n) => Array.from({ length: n }, (_, j) => t + ((j + 0.5) / n - 0.5) / (60 * F.SUB));
  function borrado(ctx, t, desenha) {
    const n = N_AMOSTRAS();
    if (n === 1) { desenha(ctx, t); return; }
    const cv = ctx.canvas;
    if (!BUF || BUF.width !== cv.width || BUF.height !== cv.height) {
      BUF = document.createElement('canvas'); BUF.width = cv.width; BUF.height = cv.height;
    }
    const b = BUF.getContext('2d');
    b.setTransform(1, 0, 0, 1, 0, 0); b.globalCompositeOperation = 'source-over'; b.globalAlpha = 1;
    b.clearRect(0, 0, BUF.width, BUF.height);
    b.setTransform(ctx.getTransform()); b.globalCompositeOperation = 'lighter'; b.globalAlpha = 1 / n;
    for (const tt of amostras(t, n)) desenha(b, tt);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(BUF, 0, 0); ctx.restore();
  }

  // ---------------------------------------------------------------- P15-P16: a tela "Retirada"
  // o ponto `centro` do print cai no centro do contêiner (540, 720). Com 770,3 e 0,74x a pílula fica em (540, 334),
  // exatamente onde o capítulo 3 a deixou. O arrasto b86-b87 rola a tela junto com o dedo (desde o apoio) até 0,9x,
  // centrada em 1588,5: a janela de 300 mostra do print 1422 ao 1755, ou seja, a caixa do código e a linha "Mostre
  // este código..." inteiras, sem fatia do "Se demorar" (acaba em 1413) nem do PKG-1031 (começa em 1778)
  const ROLA = TB(86) + 0.06;
  const escala = (t) => track(t, 0.74, [[ROLA, 0.9, 1.3]]);
  const centro = (t) => track(t, 770.3, [[ROLA, 1588.5, 1.3]]);
  const projRetirada = (t) => U.proj(540, centro(t), escala(t));
  const CAIXA = [46, 1460, 1034, 1626], QR = [225, 522, 855, 1158], CODIGO_REAL = [80, 1500, 640, 1582];
  const MOSTRE_BASE = 1725;   // o pé da linha "Mostre este código no balcão da agência" no print (as pernas acabam em 1717)
  /** A tela, num contexto qualquer (o mesmo desenho do U.tela; o borrado desenha num buffer). */
  function tela(c, t) {
    const P = projRetirada(t);
    c.imageSmoothingQuality = 'high';
    c.drawImage(F.img.retirada, P.x(0), P.y(0), 1080 * P.s, 2000 * P.s);
  }
  /** O anel do QR Code (abre no b85 e recolhe na rolagem). Fora da tela: no borrado, um anel somado sobre a tela branca
   *  da mesma amostra satura em branco e sumia de um quadro para o outro. */
  const anelQR = (c, t) => U.anel(c, t, TB(85), projRetirada(t).r(QR), 10, { pad: 16, dura: 0.6 });
  // b89: a caixa, o anel e a linha "Mostre..." saem por uma máscara cuja base sobe (easeIn) do pé da linha até acima
  // do anel, e o desenho sobe 24 px junto (a mesma curva): sai subindo, sem fileira de pingos parada no lugar. Nada
  // some pela opacidade (o conteúdo tem saida: false). O código real fica fora do desenho desde o b89 (clip evenodd):
  // quem sai da caixa é o nosso, que cresce. 0,14 s: com o código sozinho a partir de TB(89) + 0,14, ele fica grande e
  // sozinho mais de 2,0 s antes de sair
  const SAI15 = TB(89), DUR_SAI15 = 0.14, SOBE15 = 24;
  function retirada(ctx, t, a) {
    if (t > SAI15 + DUR_SAI15) return;
    ctx.save(); U.cena(ctx, a);
    const P = projRetirada(t);
    if (t >= SAI15) {
      // em cima, o recorte fica na janela do `codigo` (print 1422): o contêiner cresce e mostra só branco, sem o "Se
      // demorar..." que mora logo acima
      const e = easeIn(prog(t, SAI15, SAI15 + DUR_SAI15));
      const [, cy] = P.r(CAIXA), topo = cy - 10 - 9, y0 = P.y(1422);   // topo: o alto do anel da caixa, com folga
      const yb = lerp(P.y(MOSTRE_BASE), topo - SOBE15, e);             // a base acaba acima do anel já subido
      ctx.beginPath(); ctx.rect(-2000, y0, 6000, Math.max(0, yb - y0)); ctx.clip();
      ctx.translate(0, -SOBE15 * e);
      const [x, y, w, h] = P.r(CODIGO_REAL);
      ctx.beginPath(); ctx.rect(-2000, -2000, 6000, 6000); ctx.rect(x, y, w, h); ctx.clip('evenodd');
    }
    if (t > ROLA && t < ROLA + 1.1) { borrado(ctx, t, tela); borrado(ctx, t, anelQR); }   // a rolagem, com o rastro liso
    else { tela(ctx, t); anelQR(ctx, t); }
    U.afunda(ctx, a, t, TB(88), 'retirada', [CAIXA[0], CAIXA[1], CAIXA[2] - CAIXA[0], CAIXA[3] - CAIXA[1]],
      P.x(CAIXA[0]), P.y(CAIXA[1]), (CAIXA[2] - CAIXA[0]) * P.s);                     // a caixa afunda no toque
    U.anel(ctx, t, TB(88), P.r(CAIXA), 40 * P.s, { pad: 10, fica: true });           // e o anel abre em volta dela
    ctx.restore();
  }

  /** O mesmo "sobe" do motor (entra subindo 0,55 do corpo pela máscara e sai subindo 1,67 do corpo), com a boca de
   *  baixo e a duração da saída ajustáveis. */
  function sobeX(a, t, t0, t1, s, x, y, size, opts, { boca = 0.42, sai = 0.24 } = {}) {
    const ein = easeOut(prog(t, t0, t0 + 0.5)), eout = easeIn(prog(t, t1, t1 + sai));
    if (ein <= 0 || eout >= 1) return;
    const ctx = a.ctx;
    ctx.save(); ctx.beginPath(); ctx.rect(x - 20, y - size * 0.95, 4820, size * (0.95 + boca)); ctx.clip();
    a.texto(s, x, y + size * 0.55 * (1 - ein) - size * 1.67 * eout, size, opts);
    ctx.restore();
  }

  // ---------------------------------------------------------------- P16: a palavra-chave
  // o CAIXA.482913 da caixa real (print 88-616, base em 1568; a 0,9x: 475 px de largura, base em y 701,6 da cena)
  // cresce em 0,8 s até o código grande (DM Mono 110, 792 px), com a base em +74 do cartão (y 794 da cena). Ele só
  // parte em TB(89) + 0,06 s, quando a máscara da caixa já começou a comer o campo (não assenta com o campo inteiro).
  // A escala vai em easeInOut (parte e chega parada, sem as cópias do desfoque que a mola deixava nos números) e o
  // lugar vai em easeOut: o código desce primeiro e libera logo a linha do rótulo. O rótulo vem depois (o valor antes do
  // rótulo), a TB(89) + 0,25 s, quando o alto do código já está ~33 px abaixo da máscara dele, e fica 2,0 s até sair
  // (de TB(94) - 0,24 a TB(94)); 72 px, DM Sans 700, tinta 2 (guia §3). O bloco (rótulo + código) fica centrado no
  // cartão de 440; à direita do código (que acaba em x 908) sobra a coluna por onde o dedo arrasta (b93-b94, x 985).
  // O código sai sozinho, em 0,28 s, de TB(94) - 0,32 a - 0,04
  const T_VOO = TB(89) + 0.06, T_ROTULO = TB(89) + 0.25;
  const VOO = { x: 540 + (88 - 540) * 0.9 - 540, y: 720 + (1568 - 1588.5) * 0.9 - 720, k: (528 * 0.9) / 792 };
  const Y_ROTULO = -56, Y_CODIGO = 74;
  function palavra(ctx, t, a) {
    const p = prog(t, T_VOO, T_VOO + 0.8), q = easeOut(p), k = lerp(VOO.k, 1, easeInOut(p));
    ctx.save(); ctx.translate(lerp(VOO.x, -424, q), lerp(VOO.y, Y_CODIGO, q)); ctx.scale(k, k);
    sobeX(a, t, TB(89) - 10, TB(94) - 0.32, 'CAIXA.482913', 0, 0, tam.CODIGO, { mono: true, cor: cor.TINTA }, { sai: 0.28 });
    ctx.restore();
    a.sobe(t, T_ROTULO, TB(94) - 0.24, 'Palavra-chave da retirada', -424, Y_ROTULO, tam.ROTULO, { peso: 700, ui: true, cor: cor.TINTA2 });
  }

  // ---------------------------------------------------------------- P17: o prazo (cartão em y 883, sem legenda)
  // três linhas de 132 px a cada 150: o bloco (da maiúscula da 1ª à base da 3ª) fica centrado no cartão de 620
  function prazo(ctx, t, a) {
    const sai = TB(100) - 0.26;
    [['7 dias úteis', cor.DESTAQUE], ['pra buscar', cor.TINTA], ['com calma.', cor.TINTA]].forEach(([s, c], i) => {
      a.sobe(t, a.t0 + i * 0.07, sai, s, -424, -104 + i * 150, tam.TITULO, { cor: c });
    });
  }

  // ---------------------------------------------------------------- P18: a taxa de guarda (e o teto, no b106)
  // como a lista (D13): "Do 8º dia útil em diante:" / "taxa de guarda de" (60 px, tinta 2) / R$ 0,84 (132 px, laranja) /
  // "por dia no tamanho de R$ 5,90." (60 px; 796 px, cabe). Dois tamanhos só: 60 e 132. O bloco fica centrado no cartão
  // de 580 (respiro de ~100 em cima e embaixo). No b106 o cartão cresce para 730 com mola de 1,6 Hz e o texto sobe 73,5 px
  // com a mesma mola (o bloco continua centrado), para dar lugar ao fio (3 px, tinta a 18%) e ao teto, numa linha, em
  // tinta: "Para de somar no 15º dia útil." acaba em x 840, e o dedo arrasta à direita dele (x 950)
  const SAI18 = TB(112) - 0.26;
  const Y1 = -147, Y2 = -67, YV = 83, Y4 = 178, Y_FIO = 240, Y_TETO = 336, SOBE_TETO = -73.5;
  function taxa(ctx, t, a) {
    const dy = SOBE_TETO * step(t - TB(106), 1.6), Y = (y) => y + dy;
    const o2 = { peso: 700, ui: true, cor: cor.TINTA2 }, o1 = { peso: 700, ui: true, cor: cor.TINTA };
    // o valor antes dos rótulos. A boca de baixo da máscara fica a 0,62 do corpo: a perna da vírgula (0,13 do corpo
    // abaixo da base) só fica cortada no primeiro quadro da entrada, e "R$ 0,84" não passa por "R$ 0.84"
    sobeX(a, t, a.t0, SAI18, 'R$ 0,84', -424, Y(YV), tam.TITULO, { cor: cor.DESTAQUE }, { boca: 0.62 });
    a.sobe(t, a.t0 + 0.07, SAI18, 'Do 8º dia útil em diante:', -424, Y(Y1), tam.UI, o2);
    a.sobe(t, a.t0 + 0.14, SAI18, 'taxa de guarda de', -424, Y(Y2), tam.UI, o2);
    a.sobe(t, a.t0 + 0.21, SAI18, 'por dia no tamanho de R$ 5,90.', -424, Y(Y4), tam.UI, o2);
    U.traco(ctx, t, TB(106) + 0.1, -424, 424, Y(Y_FIO), { t1: SAI18, largura: 3, tinta: 'rgba(42,31,24,0.18)' });
    a.sobe(t, TB(106) + 0.22, SAI18, 'Para de somar no 15º dia útil.', -424, Y(Y_TETO), tam.UI, o1);
  }

  // ---------------------------------------------------------------- P19-P20: a cartela de assinatura e a volta
  // No b112, junto com o thump e o whoosh, a cortina laranja começa a subir, presa no pé do quadro (y 1924 da cena):
  // nunca fica uma faixa solta com branco embaixo. Ela cobre 1,15 x 1964 px em 0,27 s, com easeInOut (a borda passa do
  // alto do quadro ainda com velocidade, sem fresta no fim da curva). Nos primeiros 0,07 s a caixa (mola de 6 Hz) ainda
  // não cobre o pé do quadro: a cortina vai na camada `frente` (espaço da cena, sem o recorte do contêiner); depois,
  // com a caixa já além das bordas, vai no conteúdo, com a mesma borda.
  const CORT0 = TB(112), CORT1 = TB(112) + 0.27, CORT_FRENTE = TB(112) + 0.07, CORT_FIM = TB(112.75) + 0.3, PE = 1924;
  const topoCortina = (t) => PE - 1.15 * 1964 * easeInOut(prog(t, CORT0, CORT1));
  /** A cortina, no espaço do quadro. O trecho que todas as amostras do subquadro cobrem é pintado direto, em
   *  source-over e no #EA6E1A exato; só a faixa da borda, que muda de uma amostra para outra, passa pelo borrado (a soma
   *  de 4 x 1/4 em 'lighter' arredonda o laranja para 236, 112, 28, e o quadro saltava 2 níveis na saída do borrado).
   *  naCena: true na camada `frente` (o contexto já está no espaço da cena); false no conteúdo (origem no contêiner). */
  function cortina(ctx, t, a, naCena) {
    if (t < CORT0 || t > CORT_FIM) return;
    ctx.save(); if (!naCena) U.cena(ctx, a);
    const m = ctx.getTransform(), dev = (y) => m.d * y + m.f;   // a câmera do filme 11 não gira: só escala e desloca
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const W = ctx.canvas.width, pe = Math.max(dev(PE), ctx.canvas.height);
    const n = N_AMOSTRAS(), tops = amostras(t, n).map((tt) => dev(topoCortina(tt)));
    ctx.fillStyle = cor.DESTAQUE;
    if (n === 1) { ctx.fillRect(0, tops[0], W, pe - tops[0]); ctx.restore(); return; }
    const base = Math.ceil(Math.max(...tops) - 1e-6);   // a primeira linha inteira de pixels coberta por todas as amostras
    if (base < pe) ctx.fillRect(0, base, W, pe - base);
    if (Math.min(...tops) < base) {
      borrado(ctx, t, (c, tt) => {
        const y = dev(topoCortina(tt));
        if (y < base) { c.fillStyle = cor.DESTAQUE; c.fillRect(0, y, W, base - y); }
      });
    }
    ctx.restore();
  }
  /** A cortina dos primeiros 0,07 s, na camada `frente` (por cima da caixa que cresce e da sombra dela; o dedo vem por
   *  cima, e sai antes de TB(112) + 0,09 s). */
  function cortinaFrente(ctx, t, a) { if (t < CORT_FRENTE) cortina(ctx, t, a, true); }
  /** O pin cai de fora do quadro, num quadro já laranja e vazio (a borda da cortina passa do alto antes de
   *  TB(112) + 0,18 s), e pousa no "O" exatamente no b113, com o pop: hora marcada (cúbica que chega parada), sem mola e
   *  sem sobressinal. Vem de perto da câmera (1,2x) e pousa no tamanho da logo: a pista de profundidade da cartela
   *  chapada. É o mesmo desenho do F.LOGO.pin (mesmo recorte, mesma conta), num contexto qualquer; assentado, sai
   *  idêntico ao do quadro 0. */
  const T_PIN = TB(112) + 0.18;
  function pinCaindo(c, t) {
    if (t < T_PIN) return;
    const { PIN, ESC, PONTA } = F.LOGO, p = prog(t, T_PIN, TB(113)), q = 1 - (1 - p) * (1 - p) * (1 - p), sc = 1 + 0.2 * (1 - q);
    // as mesmas contas, na mesma ordem, do pin() do capítulo 1 e do a.img do motor (senão a troca do b116 deixa 1 nível de
    // diferença em alguns pixels)
    const w = PIN[2] * ESC * sc, h = PIN[3] * ESC * sc, y = PONTA[1] - 900 * (1 - q);
    c.imageSmoothingQuality = 'high';
    c.drawImage(F.img.logoPin, PIN[0], PIN[1], PIN[2], PIN[3], PONTA[0] - (233 - PIN[0]) * ESC * sc, y - h, w, (w * PIN[3]) / PIN[2]);
  }
  function cartela(ctx, t, a) {
    if (t >= TB(116)) {
      // a logo já assentou (molas e curvas terminam antes do b116): desenha a pose do quadro 0, pixel a pixel
      F.abertura(ctx, a);
    } else {
      // a partir de TB(112) + 0,07 (antes, na camada `frente`); para de ser desenhada depois que a cor troca por baixo
      // (b112,75)
      if (t >= CORT_FRENTE) cortina(ctx, t, a, false);
      ctx.save(); U.cena(ctx, a);
      const { LX, LY, LW, LH, PONTA } = F.LOGO;
      // a logo se abre a partir do pin (b113): uma máscara que se alarga para os dois lados; as letras não se mexem.
      // A logo vem antes do pin, na mesma ordem do F.abertura: as bordas dos dois se tocam, e a troca do b116 fica exata
      const e = easeOut(prog(t, TB(113), TB(113) + 0.55));
      if (e > 0) {
        const esq = PONTA[0] - (PONTA[0] - (LX - 40)) * e, dir = PONTA[0] + (LX + LW + 40 - PONTA[0]) * e;
        ctx.save(); ctx.beginPath(); ctx.rect(esq, LY - 40, dir - esq, LH + 80); ctx.clip();
        a.img('logoSemPin', LX, LY, LW);
        ctx.restore();
      }
      if (t < TB(113) + 0.05) borrado(ctx, t, pinCaindo); else pinCaindo(ctx, t);   // o rastro liso na queda
      ctx.restore();
    }
    // a frase sobe embaixo da logo (b113) e sai subindo no b119
    const o = { cor: cor.BRANCO, alinha: 'center' };
    ctx.save(); U.cena(ctx, a);
    a.sobe(t, TB(113) + 0.08, TB(119) - 0.26, 'Compre onde quiser.', 540, 1020, tam.ASSINATURA, o);
    a.sobe(t, TB(114) + 0.08, TB(119) - 0.26, 'A gente recebe pra você.', 540, 1112, tam.ASSINATURA, o);   // um tempo depois: nada parado mais de 2 s
    ctx.restore();
  }

  const SAI = (y) => [W0 + 160, y];   // fora do quadro, à direita (x > 1160: o motor nem desenha)
  const CHEIO = { cx: 540, cy: 960, w: 1120, h: 1960, r: 0, sombra: 0 };   // igual ao estado inicial do capítulo 1
  // no b112 a caixa cresce para além do quadro (1400x2400) e cobre as bordas em ~0,06 s, enquanto a cortina nasce no pé
  // (na camada `frente`); no b112,75, escondida, volta ao CHEIO (que ainda cobre o quadro inteiro)
  const ALEM = { cx: 540, cy: 960, w: 1400, h: 2400, r: 0, sombra: 0 };
  F.registra({
    nome: 'Capítulo 4: retirada e fim',
    planos: [
      { id: 'P15', de: 84, ate: 88, chave: [84.3, 85.3, 86.4, 87.6] },
      { id: 'P16', de: 88, ate: 94, chave: [88.3, 89.2, 90.6, 93.1] },
      { id: 'P17', de: 94, ate: 100, chave: [94.3, 96, 98.6, 99.4] },
      { id: 'P18', de: 100, ate: 112, chave: [100.4, 103, 106.3, 108.6, 111.4] },
      { id: 'P19', de: 112, ate: 116, chave: [112.15, 112.6, 113.15, 115.2] },
      { id: 'P20', de: 116, ate: 120, chave: [117, 119.3, 119.98] },
    ],
    estados: {
      // 840x880, de y 275 a 1155: com a tela a 0,74x centrada no 770,3, mostra do print 169 ao 1358 (o cartão do QR acaba
      // em 1336; com 890, a base chegava ao 1372 e deixava ver a ponta do ícone e das letras do "Se demorar para ler...")
      retirada: { cx: 540, cy: 715, w: 840, h: 880, r: 44, cor: 0, sombra: 1 },
      codigo: { cx: 540, cy: 720, w: 980, h: 300, r: 44, cor: 0, sombra: 1, whoosh: 0.5 },
      palavra: { cx: 540, cy: 720, w: 1000, h: 440, r: 60, cor: 0, sombra: 1 },   // câmera parada: pode ter 1000
      prazo: { cx: 540, cy: 883, w: 980, h: 620, r: 48, cor: 0, sombra: 1 },
      taxa: { cx: 540, cy: 883, w: 980, h: 580, r: 48, cor: 0, sombra: 1 },
      taxa_teto: { cx: 540, cy: 883, w: 980, h: 730, r: 48, cor: 0, sombra: 1, whoosh: 0 },   // o pop do b106 vai nas deixas
      cartela_branca: Object.assign({ cor: 0, whoosh: 1.2 }, ALEM),
      cartela: Object.assign({ cor: 1, whoosh: 0 }, CHEIO),               // whoosh 0: a cor troca escondida
    },
    // b84 a 1,5 Hz: a borda de baixo da tela que abre anda devagar (os 8 subquadros cortam o QR em degraus finos, que
    // se leem como desfoque), e o dedo acompanha com a mesma mola
    morphs: [[84, 'retirada', 1.5], [86, 'codigo', 2.4], [89, 'palavra', 2.4], [94, 'prazo', 2.4], [100, 'taxa', 2.4],
      [106, 'taxa_teto', 1.6], [112, 'cartela_branca', 6], [112.75, 'cartela', 3]],
    conteudo: [
      { de: 84, ate: 89.3, atraso: 0, saida: false, desenha: retirada },   // sai pela máscara do b89 (sem opacidade)
      { de: 89, ate: 94, atraso: 0, desenha: palavra },
      { de: 94, ate: 100, desenha: prazo },
      { de: 100, ate: 112, desenha: taxa },
      { de: 112, ate: 120, atraso: 0, saida: false, desenha: cartela },
    ],
    // a cortina de TB(112) a TB(112) + 0,07 s, fora do recorte do contêiner (que ainda não cobre o pé do quadro)
    frente: [{ de: 112, ate: 112.14, atraso: 0, saida: false, desenha: cortinaFrente }],
    legendas: [
      { de: 84, ate: 94, linhas: ['Mostre este código no', 'balcão da agência.'], estilo: 'pilula' },
    ],
    cursor: {
      moves: [
        [80, SAI(420), 3],                                    // fora do quadro: passa para a direita, na altura da pílula
        [82.12, [780, 392], 2.4],                             // entra e chega parado no canto de baixo à direita da pílula
                                                              // (fora do "confirmado": acaba em x 740, base em y 345), 0,6
                                                              // batida antes do apoio (b83,75); apoia parado e só desce no
        [84, [850, 1060], 1.5],                               // b84, junto com a borda de baixo da tela que abre (a mesma
                                                              // mola do morph); solta no b84,6, abaixo do QR
        [86, [750, 790], 3],                                  // arrasto b86-b87: a tela rola junto e para na caixa
        [86.98, [700, 742], 3.2],                             // desliza até a caixa do código (toque b88)
        [88.2, [1240, 700], 2.4],                             // sai logo depois do toque, pela direita, na altura da caixa
                                                              // (acima da linha "Mostre este código...", em y ~820)
        [91.6, [985, 900], 2.4],                              // volta: dentro do cartão, à direita do código (acaba em x 908)
        [93, [985, 810], 3],                                  // arrasto b93-b94: sobe 90 px; a borda esquerda do dedo
                                                              // (x 939) fica sempre à direita do fim do código
        [94.05, SAI(820), 1.8],
        [97.35, [900, 1153], 2.4],                            // volta, à direita do "com calma."
        [99, [900, 1053], 3],                                 // arrasto b99-b100
        [100.05, SAI(980), 1.8],
        [109.45, [950, 1208], 2.4],                            // volta, à direita do teto (que acaba em x 840)
        [111, [950, 1108], 3],                                // arrasto b111-b112
        [112.02, [1320, 1100], 4],                            // sai a 4 Hz, mirando além do SAI (o motor para de desenhar
                                                              // em x 1160): a borda do dedo passa de x 1080 antes de
                                                              // TB(112) + 0,08 s, por cima da cortina que já nasce no pé
      ],
      cliques: [88],
      arrastos: [[83.75, 84.6], [86, 87], [93, 94], [99, 100], [111, 112]],
    },
    // respiração no P17 (b94-b99) e no P18 (b104-b111); volta a 1,00 antes de cada troca. 0,4 Hz ou mais: assenta
    // antes do fim (loop exato)
    camera: [[94.2, { z: 1.02 }, 0.5], [98.6, { z: 1 }, 1.4], [104, { z: 1.02 }, 0.4], [111, { z: 1 }, 1.6], [112, { z: 1 }, 2.6]],
    deixas: [
      { beat: 85, tipo: 'pop', ganho: 0.6, rotulo: 'anel no QR (b85)' },
      { beat: 89.25, tipo: 'pop', rotulo: 'a palavra-chave (b89)' },
      { beat: 94.25, tipo: 'pop', rotulo: '7 dias úteis (b94)' },
      { beat: 100.25, tipo: 'pop', rotulo: 'R$ 0,84 (b100)' },
      // o pop leve do teto cai quando a linha "Para de somar..." aparece (TB(106) + 0,22 s), no acerto medido de
      // 53,264 s (b106,5); no b106 o cartão só começa a crescer, sem som
      { beat: 106.5, tipo: 'pop', ganho: 0.5, rotulo: 'o teto da taxa (b106,5)' },
      { beat: 112, tipo: 'thump', rotulo: 'a cartela (b112)' },
      { beat: 113, tipo: 'pop', rotulo: 'o pin assenta e a logo se abre (b113)' },
    ],
  });
})();
