/**
 * Capítulo 3: o preço e o Pix (P10-P14, batidas 56-84, 28-42 s). Ver docs/lista-de-planos.md e docs/GUIA-DE-ANIMACAO.md.
 *
 *   P10 (b56-61)  arrasto b55-b56 sobre o total: o R$ 5,90 do "Total a pagar" se solta do print (com a mesma forma
 *                 do valor do app), voa e cresce até virar o valor do cartão de preço (240 px, laranja sobre
 *                 branco), enquanto uma cortina limpa o resto do print de baixo para cima; os rótulos sobem depois
 *                 (72 px): "Pequeno, Médio ou Grande", "até 60 cm e até 20 kg"
 *   P11 (b61-66)  arrasto b60-b61 pela faixa de baixo do cartão (que acompanha o dedo 10 px): a linha velha sai pela
 *                 boca da máscara e a nova sobe: R$ 9,90, "Extra Grande", "até 1 m e até 30 kg"
 *   P12 (b66-71)  arrasto b65-b66: R$ 19,90, "Duplo Extra Grande", "até 2 m e até 50 kg". Os três preços escalam:
 *                 a câmera vai em degraus, 1,00 (b56), 1,02 (b61) e 1,04 (b66), e o pop do b61,25 (0,8) fica mais
 *                 baixo que os do b56,25 e do b66,25 (1,0). As linhas entram e saem com o desfoque liso
 *   P13 (b71-74)  arrasto b70-b71 até o canto do botão: o cartão de preço perde a sombra junto com a última linha e
 *                 encolhe até o botão real "Pagar R$ 5,90 e gerar QR Code" (0,93x), sozinho, que nasce pela máscara
 *                 da própria forma em TB(71) + 0,10 (0,35 s); câmera em 1,04 em volta dele; o dedo toca dali no b72
 *                 (TF), com o anel na frente
 *   P14 (b74-84)  b74: a pílula real "Pagamento confirmado" (1,4x) nasce do check no lugar do botão, como um disco
 *                 verde-claro que varre o laranja; b76: com a legenda "Com saldo na carteira...", o cartão real da
 *                 carteira (com o R$ 38,20) abre acima da pílula por recorte, de baixo para cima, e a câmera
 *                 empurra até 1,08; b76,5: anel no "Saldo suficiente"; b80: a pílula sobe por trás do cartão, que
 *                 desce para o meio do quadro, e encolhe até o lugar que tem no topo da tela "Retirada" (540, 334,
 *                 468x78, 0,74x), onde o capítulo 4 a assume; o cartão fecha por recorte em TB(83,5), em 0,24 s
 */
(function () {
  'use strict';
  const { cor, tam, TB, M } = F;
  const { step, lerp, easeOut, easeIn, easeInOut, prog } = M;
  const U = F.u;
  const PESO = window.FILME.pesoTitulo;

  // ---------------------------------------------------------------- P10-P12: as linhas de preço (uma por vez)
  const LINHAS = [
    { de: 56, ate: 61, valor: 'R$ 5,90', nome: 'Pequeno, Médio ou Grande', medida: 'até 60 cm e até 20 kg' },
    { de: 61, ate: 66, valor: 'R$ 9,90', nome: 'Extra Grande', medida: 'até 1 m e até 30 kg' },
    { de: 66, ate: 71, valor: 'R$ 19,90', nome: 'Duplo Extra Grande', medida: 'até 2 m e até 50 kg' },
  ];
  // o texto começa em x 116 da cena (o eixo da legenda); o cartão (960x640: com a câmera em 1,04 ele fica com 998 px
  // na tela, a 41 px da borda) vai de y 400 a 1040 e o bloco de texto fica centrado nele pela tinta: 108 px do topo
  // ao "$", 108 px do "g" à base. O R$ 19,90 fica com 56 px de folga à esquerda e 61 à direita dentro do cartão
  const X = -424, Y_VALOR = -22, Y_NOME = 108, Y_MEDIDA = 198, LARG = 960;
  const ROTULO = tam.ROTULO;
  // De onde o R$ 5,90 voa: o valor do "Total a pagar" no fim do capítulo 2 (print [729, 1285, 979, 1352] a 0,9x,
  // centrado no ponto 1252). Medido no print, glifo a glifo: o app desenha o valor em DM Sans 800 com o eixo óptico
  // de 23 px (o corpo em px do CSS do celular), 69,3 px de print (62,4 na cena), sem espaçamento, com o "R" em
  // x 711 e a linha de base em y 801. O voo começa com essa mesma forma (o tamanho que dá forma ao texto vai de
  // 23 a 240 px, e o eixo óptico da fonte variável acompanha) e o espaçamento vai de 0 a -0,03 em.
  const VOO = { x: 711 - 4.5 - 540, y: 801 - 720, tam: 62.4, forma: 23.1 }, F_VOO = 1.5, FIM_VOO = 0.95;
  // A troca começa entre o último subquadro de um quadro e o primeiro do seguinte (TB(56) cai no meio dos
  // subquadros do quadro 1681): nenhum quadro mistura o valor do app com o nosso
  const T_TROCA = TB(56) - 0.0065;
  // A cortina: o print do total (o mesmo do capítulo 2: 0,9x centrado no ponto 1252) fica inteiro e opaco, e um
  // painel branco sobe da base da janela antiga (920x330) até o topo em 0,14 s. Por baixo, o capítulo 2 sai com o
  // alfa do motor; aqui ele fica coberto de branco (o contêiner inteiro), e o que se vê é só a cortina
  const CORTINA = 0.14, JANELA = [-460, -165, 920, 330], TUDO = [-540, -360, 1080, 720];
  const PRINT = { x: (0 - 540) * 0.9, y: (0 - 1252) * 0.9, w: 1080 * 0.9 };
  const VALOR_APP = [160, 20, 245, 80];   // o valor no print redesenhado (cena x 700-945, y 740-820)
  /** Quando cada linha sai e entra: entre duas linhas a troca rola (a velha sobe e sai durante o arrasto, e acaba
   *  de sair no quadro em que a nova começa a subir por baixo: as duas nunca dividem a máscara). */
  const sai = (i) => TB(LINHAS[i].ate) - (i < LINHAS.length - 1 ? 0.22 : 0.26);
  const entra = (i) => (i === 0 ? TB(LINHAS[0].de) : TB(LINHAS[i].de) + 0.02);
  const rot0 = (i) => entra(i) + (i === 0 ? 0.4 : 0.12);   // os rótulos entram depois do valor (no P10, depois do voo)

  /** O a.img do motor, num contexto qualquer (as amostras do desfoque desenham num buffer). */
  function img(c, nome, x, y, w, crop) {
    const [sx, sy, sw, sh] = crop;
    c.imageSmoothingQuality = 'high';
    c.drawImage(F.img[nome], sx, sy, sw, sh, x, y, w, (w * sh) / sw);
  }
  /** O texto do valor num contexto qualquer: forma = o corpo que dá forma aos glifos (o eixo óptico da fonte). */
  function texto(c, s, x, y, size, espaco, forma = size) {
    c.save(); c.translate(x, y); c.scale(size / forma, size / forma);
    c.font = `${PESO} ${forma}px ${F.fonte.TITULO}`;
    c.fillStyle = cor.DESTAQUE; c.textAlign = 'left';
    if ('letterSpacing' in c) c.letterSpacing = `${(espaco * forma).toFixed(2)}px`;
    c.fillText(s, 0, 0);
    c.restore();
  }
  function valorVoando(c, t) {
    const q = step(t - TB(56), F_VOO);
    texto(c, LINHAS[0].valor, lerp(VOO.x, X, q), lerp(VOO.y, Y_VALOR, q), lerp(VOO.tam, tam.PRECO, q), lerp(0, -0.03, q),
      lerp(VOO.forma, tam.PRECO, q));
  }
  /**
   * O valor sobe por dentro de uma máscara e sai subindo (como o a.sobe do motor), mas com a boca de baixo a 0,45 do
   * corpo e a partida a 0,42: a vírgula e o "$" não ficam cortados na subida.
   */
  function sobeValor(c, t, t0, t1, s) {
    const ein = t0 == null ? 1 : easeOut(prog(t, t0, t0 + 0.5)), eout = easeIn(prog(t, t1, t1 + 0.24));
    if (ein <= 0 || eout >= 1) return;
    const P = tam.PRECO;
    c.save(); c.beginPath(); c.rect(X - 20, Y_VALOR - 0.95 * P, 1200, 1.4 * P); c.clip();
    texto(c, s, X, Y_VALOR + 0.42 * P * (1 - ein) - 1.2 * P * eout, P, -0.03);
    c.restore();
  }
  /** Os rótulos: a mesma conta do a.sobe do motor (boca de baixo a 0,42 do corpo, a mesma fonte e o mesmo
   *  espaçamento), num contexto qualquer, para passarem pelo desfoque liso junto com o valor. */
  function sobeRotulo(c, t, t0, t1, s, y, tinta) {
    const ein = easeOut(prog(t, t0, t0 + 0.5)), eout = easeIn(prog(t, t1, t1 + 0.24));
    if (ein <= 0 || eout >= 1) return;
    const lh = ROTULO * 1.37;
    c.save(); c.beginPath(); c.rect(X - 20, y - ROTULO * 0.95, 4820, lh); c.clip();
    c.font = `700 ${ROTULO}px ${F.fonte.UI}`; c.fillStyle = tinta; c.textAlign = 'left';
    if ('letterSpacing' in c) c.letterSpacing = `${(-0.02 * ROTULO).toFixed(1)}px`;
    c.fillText(s, X, y + ROTULO * 0.55 * (1 - ein) - (lh + 0.3 * ROTULO) * eout);
    c.restore();
  }
  // Desfoque de movimento do que anda rápido (o voo do R$ 5,90, as entradas e saídas das linhas de preço, a subida
  // do botão, a pílula, os anéis, a abertura e o fechamento do cartão da carteira). O motor mistura 8 subquadros; a
  // 3600 px/s isso ainda dá cópias separadas a 7 px uma da outra (o valor de 240 px saía em degraus). Aqui cada
  // subquadro soma mais 4 amostras: cada amostra é desenhada inteira num buffer (normal) e somada a outro
  // ('lighter', 1/4). Os dois buffers são do tamanho do quadro e limpos a cada desenho; nada passa de um quadro para
  // outro. Só no render com desfoque (F.SUB > 1); com sub=1 desenha uma vez. Só para formas opacas: a soma em 8 bits
  // põe degraus numa sombra fraca.
  let SOMA = null, AMOSTRA = null;
  const tela = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  function borrado(ctx, t, desenha) {
    const n = F.SUB > 1 ? 4 : 1;
    if (n === 1) { desenha(ctx, t); return; }
    const W = ctx.canvas.width, H = ctx.canvas.height;
    if (!SOMA || SOMA.width !== W || SOMA.height !== H) { SOMA = tela(W, H); AMOSTRA = tela(W, H); }
    const b = SOMA.getContext('2d'), s = AMOSTRA.getContext('2d'), T = ctx.getTransform(), dt = 1 / (60 * F.SUB);
    b.setTransform(1, 0, 0, 1, 0, 0); b.globalCompositeOperation = 'source-over'; b.globalAlpha = 1;
    b.clearRect(0, 0, W, H);
    for (let j = 0; j < n; j++) {
      s.setTransform(1, 0, 0, 1, 0, 0); s.globalCompositeOperation = 'source-over'; s.globalAlpha = 1;
      s.clearRect(0, 0, W, H);
      s.setTransform(T); s.save(); desenha(s, t + ((j + 0.5) / n - 0.5) * dt); s.restore();
      b.globalCompositeOperation = 'lighter'; b.globalAlpha = 1 / n; b.drawImage(AMOSTRA, 0, 0);
    }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(SOMA, 0, 0); ctx.restore();
  }
  const dentro = (t, janelas) => janelas.some(([a, z]) => t > a && t < z);

  /** A troca do b56: o contêiner coberto de branco, o print do total inteiro acima da cortina e sem o valor. */
  function cortina(ctx, t, a) {
    a.fill(...TUDO, 0, cor.BRANCO);
    const y = JANELA[1] + JANELA[3] * (1 - easeIn(prog(t, T_TROCA, T_TROCA + CORTINA)));
    if (y <= JANELA[1]) return;
    ctx.save();
    ctx.beginPath(); ctx.rect(JANELA[0], JANELA[1], JANELA[2], y - JANELA[1]); ctx.clip();
    img(ctx, 'detalhe', PRINT.x, PRINT.y, PRINT.w, [0, 0, 1080, 2000]);
    a.fill(...VALOR_APP, 0, cor.BRANCO);
    ctx.restore();
  }

  /** Uma linha de preço inteira (valor e rótulos) no instante ts. */
  function linhaEm(c, ts, i) {
    const L = LINHAS[i], t0 = entra(i), t1 = sai(i), r0 = rot0(i);
    if (i === 0 && ts < t1) valorVoando(c, ts);   // o valor se solta e cresce até o valor do cartão (mola de 1,5 Hz)
    else sobeValor(c, ts, i === 0 ? null : t0, t1, L.valor);
    sobeRotulo(c, ts, r0, t1, L.nome, Y_NOME, cor.TINTA);
    sobeRotulo(c, ts, r0 + 0.07, t1, L.medida, Y_MEDIDA, cor.TINTA2);
  }
  /** As janelas em que a linha i anda (com o desfoque liso): o voo (P10) ou a subida do valor, a subida dos rótulos
   *  e a saída de tudo. Fora delas a linha está parada e é desenhada uma vez. */
  const JANELAS = LINHAS.map((_, i) => [
    [entra(i) - 0.01, i === 0 ? TB(56) + FIM_VOO : entra(i) + 0.5],
    [rot0(i) - 0.01, rot0(i) + 0.57],
    [sai(i) - 0.01, sai(i) + 0.25],
  ]);
  function precos(ctx, t, a) {
    for (let i = 0; i < LINHAS.length; i++) {
      if (t > sai(i) + 0.3) continue;
      // o capítulo 2 desenha o print até TB(56) + 0,14 s (com o alfa do motor): até lá, a cortina cobre
      if (i === 0 && t < TB(56) + 0.145) cortina(ctx, t, a);
      if (dentro(t, JANELAS[i])) borrado(ctx, t, (c, ts) => linhaEm(c, ts, i)); else linhaEm(ctx, t, i);
    }
  }

  // ---------------------------------------------------------------- P13: o botão real "Pagar R$ 5,90 e gerar QR Code"
  // 0,93x: 919x154, sozinho. Ele fica onde o arrasto b70-b71 termina: o canto do dedo (direita - 32, base + 6) cai em
  // (967, 920), e o dedo toca dali no b72, sem o caminho em V (x 967 e não 987: o círculo começa o arrasto inteiro
  // dentro do cartão de preço, que vai até x 1020, e no botão fica 86 px à direita do "Code"). Com a câmera em 1,04 o
  // botão fica com 956 px na tela, e o anel (10 px de folga) a 49 px da borda.
  const BOTAO = [46, 1712, 988, 166], SB = 0.93;
  const BW = BOTAO[2] * SB, BH = BOTAO[3] * SB, BR = 41 * SB;
  const ALVO = [540 + BW / 2 - 32, 920], BCY = ALVO[1] - 6 - BH / 2;   // BCY 836,8: o botão vai de 760 a 914
  // O botão fica parado no espaço da cena (embaixo do dedo) enquanto o contêiner encolhe em volta dele, e nasce pela
  // máscara da própria forma (o retângulo de cantos redondos do botão: nada de corte reto) só em TB(71) + 0,10, em
  // 0,35 s: a sombra do cartão de preço já foi zerada (morph b70,5, sem som e sem mudar a forma) e o contêiner, branco
  // sem sombra, não aparece em volta
  const B_SOBE = [TB(71) + 0.10, TB(71) + 0.45];
  function botao(ctx, t, a) {
    if (t > TB(74) + REVELA + 0.02) return;   // a pílula já cobriu o botão inteiro
    if (t < TB(74)) {
      const x = 540 - BW / 2 - a.c.cx, y = BCY - BH / 2 - a.c.cy;
      const sobe = (c, ts) => {
        const e = easeOut(prog(ts, B_SOBE[0], B_SOBE[1]));
        if (e <= 0) return;
        c.save(); c.beginPath(); c.roundRect(x, y, BW, BH, BR); c.clip();
        img(c, 'detalhe', x, y + BH * (1 - e), BW, BOTAO);
        c.restore();
      };
      if (dentro(t, [[B_SOBE[0] - 0.01, B_SOBE[1]]])) borrado(ctx, t, sobe); else sobe(ctx, t);
      U.afunda(ctx, a, t, TB(72), 'detalhe', BOTAO, x, y, BW);
    } else {
      // no b74 o botão acompanha o contêiner (mesma proporção da pílula: 5,95 e 5,96) enquanto a pílula o cobre
      a.img('detalhe', -a.c.w / 2, -a.c.h / 2, a.c.w, BOTAO);
    }
  }
  /**
   * O anel do toque fica FORA do botão (o contêiner recorta o conteúdo): vai na camada da frente. Ele acompanha o
   * botão que afunda (sem filete branco entre os dois) e abre e recolhe com o desfoque liso (a ponta não sai em
   * tracinhos). Recolhe antes do b74.
   */
  const ANEL_BOTAO = [[TB(72) - 0.01, TB(72) + 0.41], [TB(74) - 0.37, TB(74) - 0.05]];
  function anelEm(c, ts) {
    const k = 1 - 0.04 * U.pulso(ts - TB(72)), w = BW * k, h = BH * k;
    U.anel(c, ts, TB(72), [540 - w / 2, BCY - h / 2, w, h], BR * k, { pad: 10, dura: TB(74) - 0.36 - TB(72) });
  }
  function anelBotao(ctx, t) { if (dentro(t, ANEL_BOTAO)) borrado(ctx, t, anelEm); else anelEm(ctx, t); }

  // ---------------------------------------------------------------- P14: o cartão real da carteira (b76-b84)
  // Inteiro, acima da pílula, no lugar que tem no print (print [46, 1454, 988, 228] a 0,93x: 919x212, raio 40; 28 px
  // de vão até o botão, que virou a pílula), com a sombra dos cartões: "Saldo da carteira R$ 38,20" e "Saldo
  // suficiente" (o R$ 38,20 é texto da interface, como o R$ 5,90 do botão). Ele só existe a partir do b76, junto com
  // a legenda que o explica: no P13 o botão fica sozinho, e "Paga pelo app, via Pix." não divide o quadro com o saldo.
  //   TB(76) + 0,08: abre por recorte, de baixo para cima (0,4 s, easeOut), como a caixa da legenda; a boca de baixo
  //                  é o topo da pílula, e ele fica atrás dela (camada fundo). A câmera empurra até 1,08.
  //   TB(76,5):      anel no "Saldo suficiente"; recolhe antes do b80.
  //   b80:           passa para a frente (camada frente) e desce 224 px (centro de 626 a 850, mola de 1,2 Hz, a mesma
  //                  da pílula), com a máscara junto, enquanto a pílula sobe por trás dele até o topo: as bordas do
  //                  cartão fazem de máscara, e o meio do quadro não fica vazio até a tela "Retirada" crescer.
  //   TB(83,5):      fecha por recorte, de cima para baixo, em 0,24 s (easeIn): acaba antes do b84.
  const CART = [46, 1454, 988, 228], CW = CART[2] * 0.93, CH = CART[3] * 0.93, CR = 43 * 0.93;
  const CART_X = 540 - CW / 2, CART_Y = BCY - BH / 2 - (BOTAO[1] - (CART[1] + CART[3])) * 0.93 - CH;   // 519,7
  const SALDO = [CART_X + (752 - 46) * 0.93, CART_Y + (1495 - 1454) * 0.93, (991 - 752) * 0.93, (1624 - 1495) * 0.93];
  const PILULA = [224, 196, 632, 106], PS = 1.4, PH = PILULA[3] * PS;   // a pílula real a 1,4x: 885x148,4
  const BOCA = BCY - PH / 2 - CART_Y;                                 // do topo do cartão ao topo da pílula: 242,9
  const RESPIRA = (CART_Y + BCY + PH / 2) / 2;                        // o meio do cartão + pílula (y 715)
  const ABRE = [TB(76) + 0.08, TB(76) + 0.48], FECHA = [TB(83.5), TB(83.5) + 0.24], DESCE = 224;
  const T_ANEL = TB(76.5);
  /** Onde o cartão está em ts e quanto dele aparece: y do topo e o recorte [topo, base] (opaco, sem fade). */
  function geoCartao(ts) {
    const q = step(ts - TB(80), 1.2), y = CART_Y + DESCE * q;
    const base = y + lerp(BOCA, CH + 90, q), alto = base - (y - 40);   // a boca de baixo acompanha o cartão
    const vis = alto * easeOut(prog(ts, ABRE[0], ABRE[1])) * (1 - easeIn(prog(ts, FECHA[0], FECHA[1])));
    return { y, topo: base - vis, base, vis };
  }
  const recorte = (c, g) => { c.beginPath(); c.rect(CART_X - 70, g.topo, CW + 140, g.vis); c.clip(); };
  /** A sombra e o fundo branco do cartão (fora do desfoque liso: a soma em 8 bits põe degraus na sombra fraca). Até o
   *  b80 o cartão fica atrás da pílula, e a sombra passa 80 px da boca (a folga abre com o cartão): sem ela, a sombra
   *  acabava num corte reto no topo da pílula, visível ao lado das pontas redondas por 2 s. A pílula cobre o resto. */
  function cartaoFundo(c, t) {
    const g = geoCartao(t);
    if (g.vis < 0.5) return;
    const folga = t < TB(80) ? 80 * easeOut(prog(t, ABRE[0], ABRE[1])) : 0;
    c.save(); c.beginPath(); c.rect(CART_X - 70, g.topo, CW + 140, g.vis + folga); c.clip();
    c.shadowColor = 'rgba(42,31,24,0.10)'; c.shadowBlur = 44; c.shadowOffsetY = 16;
    c.beginPath(); c.roundRect(CART_X, g.y, CW, CH, CR); c.fillStyle = cor.BRANCO; c.fill();
    c.restore();
  }
  /** O recorte real do cartão (opaco: passa pelo desfoque liso quando a borda do recorte anda rápido). */
  function cartaoPrint(c, ts) {
    const g = geoCartao(ts);
    if (g.vis < 0.5) return;
    c.save(); recorte(c, g);
    c.beginPath(); c.roundRect(CART_X, g.y, CW, CH, CR); c.clip();
    img(c, 'detalhe', CART_X, g.y, CW, CART);
    c.restore();
  }
  /** O anel no "Saldo suficiente" acompanha o cartão e abre e recolhe com o desfoque liso. */
  const anelSaldo = (c, ts) => U.anel(c, ts, T_ANEL, [SALDO[0], SALDO[1] + geoCartao(ts).y - CART_Y, SALDO[2], SALDO[3]],
    24, { pad: 12, dura: TB(80) - 0.36 - T_ANEL });
  // a borda do recorte anda rápido na abertura e no fechamento: ali o recorte real passa pelo desfoque liso
  const ANDA_CARTAO = [[ABRE[0] - 0.01, ABRE[1]], [FECHA[0] - 0.01, FECHA[1] + 0.01]];
  const ANEL_SALDO = [[T_ANEL - 0.01, T_ANEL + 0.41], [TB(80) - 0.37, TB(80) - 0.05]];
  function cartao(ctx, t) {
    if (t < ABRE[0] - 0.01 || t > FECHA[1] + 0.02) return;
    cartaoFundo(ctx, t);
    if (dentro(t, ANDA_CARTAO)) borrado(ctx, t, cartaoPrint); else cartaoPrint(ctx, t);
    if (dentro(t, ANEL_SALDO)) borrado(ctx, t, anelSaldo); else anelSaldo(ctx, t);
  }
  const cartaoAtras = (ctx, t) => { if (t < TB(80)) cartao(ctx, t); };      // b76-b80, atrás da pílula
  const cartaoNaFrente = (ctx, t) => { if (t >= TB(80)) cartao(ctx, t); };  // b80-b84, na frente da pílula

  // ---------------------------------------------------------------- P14: a pílula real "Pagamento confirmado"
  // b74: a pílula nasce do check, no lugar do botão: um disco verde-claro de 60 px de raio (o check com o fundo da
  // pílula em volta, 37 x 1,4 + 8) cobre o ícone do botão, cresce e varre o laranja da esquerda para a direita em
  // 0,45 s, com a borda dura (sem o desfoque liso, a borda não vira faixa degradê).
  const CHECK = (298 - PILULA[0]) / PILULA[2], REVELA = 0.45, R0 = 37 * PS + 8;
  /** A pílula no instante ts (cada amostra do desfoque usa o contêiner do seu instante, relativo ao do subquadro). */
  function pilulaEm(c, ts, a) {
    const C = F.container(ts), dx = C.cx - a.c.cx, dy = C.cy - a.c.cy, w = C.w, h = C.h;
    const p = ts < TB(74) ? -1 : easeInOut(prog(ts, TB(74), TB(74) + REVELA));
    if (p < 0) return;
    c.save();
    if (p < 1) {
      const cx = dx - w / 2 + CHECK * w;
      c.beginPath(); c.arc(cx, dy, lerp(R0, Math.hypot(w * (1 - CHECK), h / 2) + 1, p), 0, Math.PI * 2); c.clip();
    }
    // o recorte ocupa o contêiner inteiro: acompanha a transformação do b74 e a subida do b80
    img(c, 'retirada', dx - w / 2, dy - h / 2, w, PILULA);
    c.restore();
  }
  function pilula(ctx, t, a) {
    // o desfoque liso na subida do b80
    if (t > TB(80) - 0.02 && t < TB(80) + 1.5) borrado(ctx, t, (c, ts) => pilulaEm(c, ts, a)); else pilulaEm(ctx, t, a);
  }

  const DIREITA = (y) => [1260, y];   // fora do quadro, à direita: entrando e saindo por ali, o dedo não cobre a legenda
  F.registra({
    nome: 'Capítulo 3: o preço e o Pix',
    planos: [
      { id: 'P10', de: 56, ate: 61, chave: [55.6, 56.06, 56.2, 57, 58.2, 60.5] },
      { id: 'P11', de: 61, ate: 66, chave: [60.9, 61.1, 61.4, 63.2, 65.5] },
      { id: 'P12', de: 66, ate: 71, chave: [66.1, 66.4, 68.2, 70.5] },
      { id: 'P13', de: 71, ate: 74, chave: [70.6, 71.3, 71.6, 72.15, 73.2] },
      { id: 'P14', de: 74, ate: 84, chave: [74.1, 74.6, 76.3, 76.7, 78, 80.2, 80.6, 81.5, 83.6] },
    ],
    estados: {
      preco: { cx: 540, cy: 720, w: LARG, h: 640, r: 48, cor: 0, sombra: 1 },
      // nos arrastos b60-b61, b65-b66 e b70-b71 o cartão acompanha o dedo 10 px para cima e volta na soltura, com a
      // troca (o whoosh leve da troca de linha é o da volta)
      preco_puxa: { cx: 540, cy: 710, w: LARG, h: 640, r: 48, cor: 0, sombra: 1, whoosh: 0 },
      preco_solta: { cx: 540, cy: 720, w: LARG, h: 640, r: 48, cor: 0, sombra: 1, whoosh: 0.45 },
      // b70,5 (sem som, sem mudar a forma): a sombra do cartão de preço sai junto com a última linha (TB(71) - 0,26),
      // e está zerada quando o botão nasce (TB(71) + 0,10): o botão real aparece sem sombra e sem cartão em volta
      preco_vazio: { cx: 540, cy: 710, w: LARG, h: 640, r: 48, cor: 0, sombra: 0, whoosh: 0 },
      botao: { cx: 540, cy: BCY, w: BW, h: BH, r: BR, cor: 0, sombra: 0 },                                // o botão real
      // a pílula real, sem sombra: nasce no lugar do botão (b74)
      confirma: { cx: 540, cy: BCY, w: PILULA[2] * PS, h: PH, r: PH / 2, cor: 0, sombra: 0 },
      confirmado_topo: { cx: 540, cy: 334, w: 468, h: 78, r: 39, cor: 0, sombra: 0, whoosh: 0.5 },
    },
    // b80: 1,2 Hz, devagar para o texto da pílula, e assenta exata em 1,8 s (41,81 s), antes do b84
    morphs: [[56, 'preco', 2.4], [60, 'preco_puxa', 2.4], [61, 'preco_solta', 2.4], [65, 'preco_puxa', 2.4],
      [66, 'preco_solta', 2.4], [70, 'preco_puxa', 2.4], [70.5, 'preco_vazio', 2.4],
      [71, 'botao', 2.4], [74, 'confirma', 2.4],
      [80, 'confirmado_topo', 1.2]],
    conteudo: [
      { de: 56, ate: 71, atraso: T_TROCA - TB(56), saida: false, desenha: precos },   // começa em T_TROCA
      { de: 71, ate: 75, atraso: 0, saida: false, desenha: botao },                    // fica até a pílula cobrir
      { de: 74, ate: 84, atraso: 0, saida: false, desenha: pilula },
    ],
    fundo: [{ de: 76, ate: 80, atraso: 0, saida: false, desenha: cartaoAtras }],
    frente: [
      { de: 71, ate: 74, atraso: 0, saida: false, desenha: anelBotao },
      { de: 80, ate: 84, atraso: 0, saida: false, desenha: cartaoNaFrente },
    ],
    legendas: [
      { de: 56, ate: 71, linhas: ['Paga uma vez, na retirada,', 'pelo tamanho.'], estilo: 'pilula' },
      { de: 71, ate: 76, linhas: ['Paga pelo app, via Pix.'], estilo: 'pilula' },
      { de: 76, ate: 83, linhas: ['Com saldo na carteira,', 'ela se paga sozinha.'], estilo: 'pilula' },
    ],
    cursor: {
      moves: [
        // arrasto b55-b56: o cap. 2 entrega o dedo parado em (580, 829), 40 px acima da base do total, e ele sobe
        // reto, longe do valor. Na soltura ele sai reto para cima a 1,8 Hz (fora do quadro em 0,25 s): x 580 fica no
        // vão entre "Retirada (Único)" e o "R$ 5,90" da primeira linha, e o valor que voa (para a esquerda) fica
        // abaixo dele. Depois ele dá a volta por fora do quadro (por cima e pela direita, sempre invisível) para
        // entrar pela direita no b58,6
        [55, [580, 745], 3], [56, [580, -200], 1.8], [57.2, [1260, -200], 3], [57.8, DIREITA(1000), 3],
        // arrastos b60-b61 e b65-b66: entra pela direita, chega parado no b59,2 (0,76 batida antes) a 40 px da base
        // do cartão (y 1000), sobe 100 px à direita dos rótulos e sai pela direita
        [58.6, [920, 1000], 2.4], [60, [920, 900], 3], [61.1, DIREITA(900), 1.8],
        [63.6, [920, 1000], 2.4], [65, [920, 900], 3], [66.1, DIREITA(900), 1.8],
        // arrasto b70-b71 pela faixa de baixo do cartão, terminando onde o botão vai estar: o dedo sobe 80 px até o
        // canto do botão (mola de 1,8 Hz: chega parado no b70,8) e toca dali no b72; sai pela direita
        [68.6, [ALVO[0], 1000], 2.4], [70, ALVO, 1.8], [72.3, DIREITA(ALVO[1]), 1.8],
      ],
      cliques: [72],
      arrastos: [[55, 56], [60, 61], [65, 66], [70, 71]],
    },
    // P10-P12: os preços escalam em degraus, em volta do cartão (y 720; y = p + (960 - p) / z): 1,00 no R$ 5,90,
    // 1,02 no R$ 9,90 (b61) e 1,04 no R$ 19,90 (b66), a 0,8 Hz (cada degrau chega em ~1 s e assenta exato em 2,7 s).
    // O cartão de 960 fica com 998 px na tela em 1,04. P13: 1,04 em volta do botão sozinho (y 836,8). P14: no b76
    // empurra até 1,08 em volta do cartão da carteira + pílula (y 715; 919 x 1,08 = 992 px: cabe em 1000) com a
    // frase do saldo (0,55 Hz, assenta exata em 41,94 s) e volta a 1,00 no b80 com a subida da pílula (1,2 Hz,
    // assenta exata em 41,81 s): no b84 a câmera está em 1,00 exato, como o capítulo 4 espera
    camera: [
      [61, { z: 1.02, x: 540, y: 720 + (960 - 720) / 1.02 }, 0.8],
      [66, { z: 1.04, x: 540, y: 720 + (960 - 720) / 1.04 }, 0.8],
      [71, { z: 1.04, x: 540, y: BCY + (960 - BCY) / 1.04 }, 0.6],
      [76, { z: 1.08, x: 540, y: RESPIRA + (960 - RESPIRA) / 1.08 }, 0.55], [80, { z: 1, x: 540, y: 960 }, 1.2],
    ],
    deixas: [
      { beat: 56.25, tipo: 'pop', ganho: 1, rotulo: 'R$ 5,90 (b56)' },
      { beat: 61.25, tipo: 'pop', ganho: 0.8, rotulo: 'R$ 9,90 (b61)' },
      { beat: 66.25, tipo: 'pop', ganho: 1, rotulo: 'R$ 19,90, o maior (b66)' },
      { beat: 74, tipo: 'pop', rotulo: 'Pagamento confirmado (b74)' },
      { beat: 76.5, tipo: 'pop', ganho: 0.55, rotulo: 'anel no Saldo suficiente (b76,5)' },
    ],
  });
})();
