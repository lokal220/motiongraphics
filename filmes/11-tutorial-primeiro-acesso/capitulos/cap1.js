/**
 * Capítulo 1: gancho e endereço (P01-P06, batidas 0-31, 0-15,5 s). Ver docs/lista-de-planos.md e docs/GUIA-DE-ANIMACAO.md.
 * Registro da crítica: docs/critica/cap1.md.
 *
 *   P01 (b0-2)    a cartela laranja com a logo branca real (o quadro 0, que é também o último); no b1 o pin solta do
 *                 "O" e cai ~210 px (mola de 1,3 Hz, crescendo 10%) até o LOKAL12, onde a ponta toca no b2; as duas
 *                 linhas da logo sobem e saem, cada uma pela boca da própria máscara, de b1 a b2
 *   P02 (b2-5)    um círculo branco cresce da ponta do pin e abre a tela "Seu endereço para compras" (a 0,84x), com a
 *                 borda em rampa (o desfoque do obturador desenhado, sem degraus); dentro do círculo o pin é o laranja
 *                 real e afunda no LOKAL12; a cor do contêiner troca escondida no b3, e ele vira a janela (972x882),
 *                 baixa (cy 827), porque o plano não tem legenda; no b4 o traço sob o LOKAL12 e o empurrão de 1,02x
 *                 (no b5 a câmera recentra a 1,015, com a mola da janela)
 *   P03 (b5-12)   no b5 a janela sobe para cy 720 junto com a pílula; o dedo toca o "Copiar" do CEP (b8) e desliza
 *                 até o do Número (b10)
 *   P04 (b12-17)  arrasto b11-b12: a tela rola até os cartões 2-4 e a janela encolhe para 640; toque no Nome (b14)
 *   P05 (b17-24)  toque no "Copiar" do Complemento (b17); no b18 o contêiner vira a pílula do LOKAL12 (DM Mono 170),
 *                 a tela rola até centrar o cartão do Complemento e sai por uma máscara que sobe (sem opacidade);
 *                 arrasto b23-b24 pela ponta direita da pílula: o ID sobe e sai devagar (0,4 s) até o b24
 *   P06 (b24-31)  a faixa: a linha real do endereço (1,28x) sobe pela máscara enquanto o ID sai e, no b25, vira texto
 *                 nosso (72 px, o tamanho da legenda, duas linhas); traço sob a linha 2 no b26; sai antes do b30,5
 *
 * O dedo: entre toques a até 2 batidas um do outro ele desliza; fora isso sai pela direita (acima da legenda) logo
 * depois do gesto e volta de meia a uma batida antes do próximo.
 *
 * Exporta F.abertura(ctx, a): a pose da cartela no quadro 0, que o capítulo 4 redesenha no fim (loop exato).
 */
(function () {
  'use strict';
  const { cor, tam, TB, M } = F;
  const { easeOut, easeIn, easeInOut, prog, step, track } = M;
  const U = F.u;
  /** Meio subquadro do obturador (1/480 s com 4 subquadros): uma borda rápida desenhada como rampa de t - MEIO a
   *  t + MEIO; somados os subquadros, a rampa fica contínua, sem os degraus de 4 cópias duras. */
  const MEIO = 1 / (120 * F.SUB);
  const rgba = (hex, a) => `rgba(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',')},${a})`;
  /** easeInOut em seno (pico de inclinação 1,57, contra 2,86 da curva da marca): para o que tem que andar sem correr
   *  no meio (o círculo do b2, a saída do ID). */
  const suave = (p) => 0.5 - 0.5 * Math.cos(Math.PI * p);
  /** Desfoque extra dentro do subquadro, para o que passa rápido por uma boca de máscara: desenha n amostras de
   *  t - MEIO a t + MEIO numa camada à parte, somadas com peso 1/n, e põe a camada no quadro. Com os 4 subquadros
   *  do motor, a borda que cruza a boca vira uma rampa, e não 4 fatias empilhadas. Camada nova a cada chamada. */
  function amostrado(ctx, t, n, desenha) {
    const cv = document.createElement('canvas'); cv.width = ctx.canvas.width; cv.height = ctx.canvas.height;
    const o = cv.getContext('2d'), m = ctx.getTransform();
    o.globalCompositeOperation = 'lighter'; o.globalAlpha = 1 / n; o.imageSmoothingQuality = 'high';
    for (let i = 0; i < n; i++) { o.save(); o.setTransform(m); desenha(o, t + MEIO * ((2 * i + 1) / n - 1)); o.restore(); }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(cv, 0, 0); ctx.restore();
  }

  // ---------------------------------------------------------------- a cartela: logo branca real, 760 px, centro (540, 700)
  // (com a frase da assinatura embaixo, o grupo fica centrado na área segura)
  const ESC = 760 / 989, LW = 760, LH = 440 * ESC, LX = 540 - LW / 2, LY = 700 - LH / 2;
  const PIN = [128, 168, 210, 272];                                   // recorte do pin no arquivo (x, y, w, h)
  const PONTA = [LX + 233 * ESC, LY + 440 * ESC];                    // a ponta do pin na cartela
  /** O pin com a ponta em (x, y), na escala sc (arquivo: o pin branco; o laranja é o mesmo desenho). */
  function pin(ctx, a, x, y, sc, arquivo = 'logoPin') {
    if (sc <= 0.001) return;
    const w = PIN[2] * ESC * sc, h = PIN[3] * ESC * sc;
    a.img(arquivo, x - (233 - PIN[0]) * ESC * sc, y - h, w, PIN);
  }
  /** A pose do quadro 0: a logo inteira e parada (espaço da cena). */
  function abertura(ctx, a) {
    ctx.save(); U.cena(ctx, a);
    a.img('logoSemPin', LX, LY, LW);
    pin(ctx, a, PONTA[0], PONTA[1], 1);
    ctx.restore();
  }
  F.abertura = abertura;
  F.LOGO = { LX, LY, LW, LH, ESC, PIN, PONTA, pin };

  // ---------------------------------------------------------------- a tela "Seu endereço para compras" (0,84x)
  // P02-P03: a janela de 972x882 (882 x 1,02 = 900) mostra o print de y 330 a 1356 (sem o cabeçalho, que acaba em
  // 322, e sem o cartão 4, que começa em 1360), com o ponto 843 do print no centro da janela. 972, e não 980: no
  // empurrão do b4 a câmera vai a 1,02 deslocada 4 px para o LOKAL12, e 980 x 1,02 deixava o fundo a 37 px da
  // lateral (972 x 1,02 = 991: 40 px mesmo com o deslocamento).
  // P02 não tem legenda: a janela fica baixa (cy 827) e sobe para 720 no b5, junto com a pílula. Em 827 a borda de
  // baixo (1268, ou 1271 com o empurrão de 1,02) fica acima do primeiro quadro da pílula (1276); em 883 as duas se
  // cobririam por 4 quadros, logo depois do b5.
  // P04-P05: os cartões 2 a 4 (print 839-1599, janela de 640), sem a fatia do cartão 1, sem a linha do endereço e sem
  // a barra de navegação. P05 (b18): a tela rola até centrar o cartão do Complemento (print 1198) na pílula.
  const S = 0.84, C0 = 843, C1 = 1219.9, C2 = 1198;
  const JY0 = 827, JY1 = 720, JW = 972, JH = 882, BANDA = (1356 - 330) * S / 2;
  const jcy = (t) => track(t, JY0, [[TB(5), JY1, 2.4]]);             // a mesma mola do morph do b5
  const centro = (t) => track(t, C0, [[TB(11.1), C1, 1.6], [TB(18), C2, 2.4]]);   // o arrasto b11-b12 rola a tela
  const projTela = (t) => U.proj(540, centro(t), S, 540, jcy(t));
  const P0 = U.proj(540, C0, S, 540, JY0);
  const ALVO = [P0.x(292), P0.y(1145)];                               // onde a ponta toca: o alto do LOKAL12 (332, 1081)
  const JANELA = { cx: 540, cy: JY0, w: JW, h: JH, r: 44 };
  const JANELA_ALTA = { cx: 540, cy: JY1, w: JW, h: JH, r: 44 };
  const JANELA2 = { cx: 540, cy: JY1, w: JW, h: 640, r: 44 };   // a mesma largura: no b11 só a altura muda
  const BOTOES = {   // os botões "Copiar" do print: c = recorte (medidas.json), borda = o contorno laranja medido no print
    cep: { c: [736, 624, 1008, 760], borda: [738, 626, 1003, 753], toque: 8, dura: 0.5 },          // recolhe antes do b10
    numero: { c: [736, 879, 1007, 1008], borda: [738, 880, 1003, 1005], toque: 10, dura: 0.5 },    // ... e antes do arrasto
    nome: { c: [736, 1407, 1007, 1536], borda: [738, 1408, 1003, 1533], toque: 14, dura: 0.8 },
    complemento: { c: [735, 1120, 1007, 1264], borda: [736, 1134, 1001, 1259], toque: 17, dura: 0.5 },
  };
  /** Onde o dedo mira: o canto de baixo à direita do botão (direita - 12, base + 6), para não cobrir o "Copiar". */
  function mira(nome, c) {
    const [, , x1, y1] = BOTOES[nome].c, P = U.proj(540, c, S);
    return [P.x(x1) - 12, P.y(y1) + 6].map(Math.round);
  }
  /** A janela em volta da tela: recorta o print enquanto o contêiner ainda é maior que ela (b2-b3,6), e a faixa do
   *  print que a janela mostra (y 330-1356 no repouso: nenhuma fatia do cabeçalho nem do cartão 4). */
  function recortaJanela(ctx, t) {
    const cy = jcy(t);
    ctx.beginPath(); ctx.roundRect(540 - JW / 2, cy - JH / 2, JW, JH, 44); ctx.clip();
    ctx.beginPath(); ctx.rect(0, cy - BANDA, 1080, 2 * BANDA); ctx.clip();
  }

  function telaEndereco(ctx, t, a, P) {
    U.tela(ctx, a, 'endereco', P);
    for (const b of Object.values(BOTOES)) {
      const [x0, y0, x1, y1] = b.c, tt = TB(b.toque);
      U.afunda(ctx, a, t, tt, 'endereco', [x0, y0, x1 - x0, y1 - y0], P.x(x0), P.y(y0), (x1 - x0) * S);
      // o anel corre no meio do vão entre o contorno do botão e a borda do cartão (print 1003 -> 1032: 24 px na
      // cena): a 12 px do contorno, com 6 px de traço, sobram 9 px de cada lado (3 px no celular)
      U.anel(ctx, t, tt, P.r(b.borda), 25, { pad: 12, dura: b.dura });
    }
  }

  // ---------------------------------------------------------------- P01-P02: o gancho (pin, letras, círculo)
  // o raio: seno de TB(2) a TB(2) + 0,50, até 1450. Pico de velocidade de ~4.550 px/s, uma rampa de ~75 px por
  // quadro (com o easeInOut da marca em 0,40 s eram ~10.400 px/s e ~170 px, e a borda se lia como halo). O canto
  // mais longe do ALVO (o de cima à direita do quadro, a 1315; o do contêiner, a 1342) fica coberto em TB(2) + 0,41,
  // antes do morph do b3
  const R_MAX = 1450;
  const raio = (u) => suave(prog(u, TB(2), TB(2) + 0.5)) * R_MAX;
  // as duas linhas da logo (no arquivo: "VAI de" de y 0 a 143, "LOKAL" e os traços de velocidade de 180 a 419): cada
  // uma sai pela boca da própria máscara, como as linhas de uma legenda (a.sobe), e só anda a própria altura
  const LINHAS_LOGO = [
    { y0: 0, y1: 162, de: TB(1), ate: TB(1) + 0.42 },           // "VAI de": boca em LY - 24, anda ~150 px
    { y0: 162, y1: 440, de: TB(1) + 0.06, ate: TB(1) + 0.5 },   // "LOKAL": boca entre as linhas (LY + 124), anda ~215 px
  ];
  /** O pin na ponta (x, y), escala sc, desenhado direto num contexto (para as amostras de amostrado()). */
  function pinEm(o, x, y, sc, arquivo) {
    if (sc <= 0.001) return;
    const w = PIN[2] * ESC * sc, h = PIN[3] * ESC * sc;
    o.drawImage(F.img[arquivo], PIN[0], PIN[1], PIN[2], PIN[3], x - (233 - PIN[0]) * ESC * sc, y - h, w, h);
  }
  /** Onde está o pin em u: cai no b1 com mola de 1,3 Hz (97% no b2, quando a ponta toca, junto com o thump),
   *  crescendo de 1,0 a 1,1 (vem para a frente), e só encolhe ao afundar no LOKAL12 (b2,06-b2,4). */
  function pinPose(u) {
    const q = step(u - TB(1), 1.3), afunda = easeIn(prog(u, TB(2) + 0.06, TB(2) + 0.4));
    return [PONTA[0] + (ALVO[0] - PONTA[0]) * q, PONTA[1] + (ALVO[1] - PONTA[1]) * q, (1 + 0.1 * q) * (1 - afunda)];
  }
  function gancho(ctx, t, a) {
    if (t < TB(1)) { abertura(ctx, a); return; }
    ctx.save(); U.cena(ctx, a);
    // as letras sobem e saem, linha por linha (easeInOut; pico de ~16 e ~23 px por quadro), com 8 amostras por
    // subquadro: as bases das letras cruzam a boca como uma rampa, sem fatias
    const im = F.img.logoSemPin, k = im.width / LW;
    for (const L of LINHAS_LOGO) {
      const boca = LY + L.y0 / k - 24 * (L.y0 === 0), alto = (L.y1 - L.y0) / k;
      const sai = (u) => easeInOut(prog(u, L.de, L.ate));
      if (sai(t - MEIO) >= 1) continue;
      amostrado(ctx, t, 8, (o, u) => {
        o.beginPath(); o.rect(LX - 40, boca, LW + 80, LY + L.y1 / k - boca + 4); o.clip();
        o.drawImage(im, 0, L.y0, im.width, L.y1 - L.y0, LX, LY + L.y0 / k - (alto + 12) * sai(u), LW, alto);
      });
    }
    // o círculo branco cresce da ponta do pin (b2) e mostra a tela, já no lugar da janela. A borda é uma rampa de
    // rA (raio em t - MEIO) a rB (raio em t + MEIO): somados os 4 subquadros, ela vira um desfoque contínuo
    const rA = raio(t - MEIO), rB = raio(t + MEIO), rampa = rB - rA > 0.5;
    if (rB > 0.5) {
      // o branco e a tela vão até 3 px além de rB, e a rampa laranja, sem recorte, cobre essa sobra: um recorte só
      // com antisserrilhado (o de rB nos dois desenhos somava branco na borda e deixava um fio claro por subquadro)
      ctx.save();
      ctx.beginPath(); ctx.arc(ALVO[0], ALVO[1], rB + (rampa ? 3 : 0), 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = cor.BRANCO; ctx.fillRect(-100, -100, F.W0 + 200, F.H0 + 200);
      ctx.save(); recortaJanela(ctx, t); telaEndereco(ctx, t, a, projTela(t)); ctx.restore();
      ctx.restore();
      // a rampa: o laranja do contêiner (que até o b3 é o laranja da cartela) volta por cima, de transparente em rA
      // a opaco em rB e além. As paradas seguem o raio no tempo (8 por subquadro), e não uma reta no raio: a borda
      // vira o desfoque exato do obturador, sem quinas de inclinação entre um subquadro e o outro
      if (rampa) {
        const g = ctx.createRadialGradient(ALVO[0], ALVO[1], rA, ALVO[0], ALVO[1], rB);
        for (let i = 0; i <= 8; i++) {
          const ri = raio(t - MEIO + (2 * MEIO * i) / 8);
          g.addColorStop(Math.min(1, Math.max(0, (ri - rA) / (rB - rA))), rgba(cor.DESTAQUE, i / 8));
        }
        ctx.save(); ctx.beginPath(); ctx.arc(ALVO[0], ALVO[1], rB + 8, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); ctx.restore();
      }
    }
    // o pin: branco fora do círculo, laranja dentro (a cor nova entra por dentro, da ponta para cima). A troca de cor
    // vai em 8 amostras por subquadro, com o raio de cada uma: a fronteira vira rampa, sem anéis na ponta
    amostrado(ctx, t, rB > 0.5 ? 8 : 1, (o, u) => {
      const [px, py, ps] = pinPose(u), r = raio(u);
      o.save();
      if (r > 0.5) { o.beginPath(); o.rect(-200, -200, F.W0 + 400, F.H0 + 400); o.arc(ALVO[0], ALVO[1], r, 0, Math.PI * 2, true); o.clip('evenodd'); }
      pinEm(o, px, py, ps, 'logoPin');
      o.restore();
      if (r > 0.5) { o.save(); o.beginPath(); o.arc(ALVO[0], ALVO[1], r, 0, Math.PI * 2); o.clip(); pinEm(o, px, py, ps, 'logoPinLaranja'); o.restore(); }
    });
    ctx.restore();
  }

  // ---------------------------------------------------------------- P02-P05: a tela na janela
  // P05 (b18): o conteúdo da tela não sai pelo alfa do motor (saida: false). Uma máscara cuja borda sobe da base ao
  // topo do contêiner (que encolhe para a pílula) apaga a tela, opaca, em 0,22 s; a borda é uma rampa de branco
  // (o fundo do contêiner), do mesmo jeito que a do círculo. O LOKAL12 sobe por baixo dela.
  const LIMPA0 = TB(18), LIMPA1 = TB(18) + 0.22;
  function borda(u) {
    const c = F.container(u), e = easeInOut(prog(u, LIMPA0, LIMPA1));
    const y0 = c.cy + c.h / 2 + 12, y1 = c.cy - c.h / 2 - 12;
    return y0 + (y1 - y0) * e;
  }
  function tela(ctx, t, a) {
    if (t - MEIO > LIMPA1) return;   // a máscara já passou do topo: a tela não aparece mais
    ctx.save(); U.cena(ctx, a);
    ctx.save();
    recortaJanela(ctx, t);   // b3-b3,6: o contêiner ainda encolhe em volta, e nenhuma fatia do cartão 4 aparece
    const P = projTela(t);
    telaEndereco(ctx, t, a, P);
    // o traço sob o LOKAL12 (b4): o complemento em destaque desde o gancho. 4 px, só na largura da palavra, 7 px
    // abaixo das maiúsculas (o "Sem ele" começa 12 px abaixo); recolhe no b7, antes do primeiro toque
    U.traco(ctx, t, TB(4), P.x(197), P.x(388), P.y(1195) + 7, { t1: TB(7), largura: 4 });
    ctx.restore();
    if (t + MEIO > LIMPA0) {
      const yA = borda(t - MEIO), yB = Math.min(borda(t + MEIO), yA - 0.5);   // yA: antes (mais baixo); yB: depois
      const g = ctx.createLinearGradient(0, yB, 0, yA);
      g.addColorStop(0, rgba(cor.BRANCO, 0)); g.addColorStop(1, rgba(cor.BRANCO, 1));
      ctx.fillStyle = g; ctx.fillRect(0, yB, F.W0, F.H0 - yB);
    }
    ctx.restore();
  }

  // ---------------------------------------------------------------- P05: a pílula do ID
  // o ID fica até TB(24) - 0,26 (2,62 s legível, como na lista) e sai subindo pela máscara em 0,40 s (easeInOut),
  // terminando em TB(24) + 0,14, quando a linha da faixa entra. Ele anda só o que precisa para a base passar a boca
  // (0,95 do corpo + 4 px; LOKAL12 não tem descendentes): assim a saída ocupa os 0,40 s inteiros (pico de ~11 px por
  // quadro) e a pílula não fica vazia antes da troca. O dedo arrasta pela ponta direita da pílula (x 970), a 24 px
  // ou mais da caixa do ID (avanço x 183-897; tinta 196-888).
  // A pílula tem 320 de altura: o ID fica com a base em 772 (maiúsculas de 653 a 772, no centro ótico).
  const SAI_ID = TB(24) - 0.26, DURA_SAI_ID = 0.4, ID_Y = 772;
  // a saída usa a curva suave (seno): ela se espalha pelos 0,40 s, sem correr no meio, e a base do ID só passa a
  // boca no fim (TB(24) + 0,14), quando a linha da faixa já está subindo
  /** O a.sobe do motor, com a saída mais lenta (dura s, easeInOut, só até a base passar a boca): entra pela máscara
   *  em t0 e sai subindo em t1. */
  function sobeLento(ctx, a, t, t0, t1, dura, s, x, y, size, opts) {
    const ein = easeOut(prog(t, t0, t0 + 0.5)), eout = suave(prog(t, t1, t1 + dura));
    if (ein <= 0 || eout >= 1) return;
    const lh = size * 1.2;
    ctx.save();
    ctx.beginPath(); ctx.rect(x - 2400, y - size * 0.95, 4820, lh); ctx.clip();
    a.texto(s, x, y + size * 0.55 * (1 - ein) - (size * 0.95 + 4) * eout, size, opts);
    ctx.restore();
  }
  function id(ctx, t, a) {
    ctx.save(); U.cena(ctx, a);   // no espaço da cena: o ID não anda com o centro do contêiner no b24
    if (t - MEIO < LIMPA1) { ctx.beginPath(); ctx.rect(0, borda(t), F.W0, F.H0); ctx.clip(); }   // só abaixo da máscara
    sobeLento(ctx, a, t, a.t0, SAI_ID, DURA_SAI_ID, 'LOKAL12', 540, ID_Y, tam.MONO, { mono: true, cor: cor.DESTAQUE, alinha: 'center' });
    ctx.restore();
  }

  // ---------------------------------------------------------------- P06: a linha do endereço
  // a linha real (1,28x) sobe pela máscara no começo da faixa e, no b25, sobe e sai; logo depois a mesma linha sobe
  // por baixo em texto nosso: 72 px (F.tam.ROTULO, o tamanho da legenda: um só tamanho de texto nosso no quadro),
  // peso 700, tinta, em duas linhas (a quebra faz o papel do "·"). Medidas: a linha 1 tem 754 px (x 116-870) e a 2,
  // 591 px (116-707), dentro do cartão de 980 (50-1030) e da área segura (até 1004). O texto sai antes do b30,5,
  // quando o cap. 2 entra na faixa.
  const LINHA = [48, 1616, 720, 40], LS = 1.28;
  const FAIXA = { cx: 540, cy: 780, w: 980, h: 320, r: 44 };   // a base em 940: o arrasto do cap. 2 apoia 40 px acima dela
  // o recorte fica uma batida (D0): sobe em TB(24) + 0,06 (enquanto a base do ID passa a boca, mais acima) e sai em
  // TB(25) - 0,04 (0,2 s, easeInOut); o texto nosso sobe em TB(25) + 0,12, quando as pernas do recorte (o "p" e a
  // "/") já passaram a boca dele. Com a saída no b25 exato e o texto em 72 px (o topo das maiúsculas entra 7 px mais
  // alto que em 60), as pernas do recorte riscavam o alto da linha 1 por 2 quadros (12,63-12,65 s)
  const REC_ENTRA = TB(24) + 0.06, REC_SAI = TB(25) - 0.04, TXT_ENTRA = REC_SAI + 0.16;
  // o texto sai durante o arrasto b30-b31 do cap. 2 e termina de passar a boca em TB(30,5) - 0,06, um pouco antes de o
  // recorte "Chegou na agência" do cap. 2 começar a subir dentro da mesma faixa (cap2.js, conteúdo de: 30.5). Com a
  // saída terminando no b30,5 exato, as pernas do "p" e da "/" (as últimas a passar a boca, na parte rápida do
  // easeIn) cruzavam a boca como pontinhos cinza soltos na faixa; assim elas passam junto com o resto da linha
  const SAI_END = TB(30.5) - 0.30;
  const END1 = 'Rua de Exemplo · Centro', END2 = 'Belo Horizonte/MG';
  const OPC_END = { peso: 700, ui: true, cor: cor.TINTA };
  const END_Y1 = -34, END_Y2 = 50, TRACO_Y = 84;   // em relação ao centro da faixa: o bloco (696-867) fica centrado
  function largura(ctx, s, size, peso) {
    ctx.save(); ctx.font = `${peso} ${size}px ${F.fonte.UI}`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${(-0.02 * size).toFixed(1)}px`;
    const w = ctx.measureText(s).width; ctx.restore();
    return w;
  }
  function faixa(ctx, t, a) {
    ctx.save(); U.cena(ctx, a);   // no espaço da cena: o texto fica parado enquanto o contêiner assenta em volta
    const cy = FAIXA.cy, w = LINHA[2] * LS, h = LINHA[3] * LS;
    const ein = easeOut(prog(t, REC_ENTRA, REC_ENTRA + 0.3)), eout = easeInOut(prog(t, REC_SAI, REC_SAI + 0.2));
    if (ein > 0 && eout < 1) {
      ctx.save(); ctx.beginPath(); ctx.rect(540 - w / 2 - 20, cy - h / 2 - 8, w + 40, h + 16); ctx.clip();
      a.img('endereco', 540 - w / 2, cy - h / 2 + (h + 8) * (1 - ein) - (h + 16) * eout, w, LINHA);
      ctx.restore();
    }
    a.sobe(t, TXT_ENTRA, SAI_END, END1, 116, cy + END_Y1, tam.ROTULO, OPC_END);
    a.sobe(t, TXT_ENTRA + 0.07, SAI_END, END2, 116, cy + END_Y2, tam.ROTULO, OPC_END);
    // b26: o traço na largura MEDIDA da linha 2 ("Belo Horizonte/MG"), 34 px abaixo da base dela; recolhe 0,1 s antes
    // de o texto sair, e no b30,5 nenhum resto dele fica sob o recorte do cap. 2
    const wt = largura(ctx, END2, tam.ROTULO, 700);
    U.traco(ctx, t, TB(26), 116, 116 + wt, cy + TRACO_Y, { t1: SAI_END - 0.1 });
    ctx.restore();
  }

  // o dedo sai e volta pela direita, sempre acima da legenda (y < 1250); fora do quadro com x > 1160
  const SAI = (y) => [F.W0 + 160, y];
  const M_CEP = mira('cep', C0), M_NUM = mira('numero', C0), M_NOME = mira('nome', C1), M_COMP = mira('complemento', C1);
  const ROLA = Math.round((C1 - C0) * S);
  F.registra({
    nome: 'Capítulo 1: gancho e endereço',
    inicial: 'abertura',
    planos: [
      { id: 'P01', de: 0, ate: 2, chave: [0, 1.3, 1.8] },
      { id: 'P02', de: 2, ate: 5, chave: [2.3, 3.4, 4.6] },
      { id: 'P03', de: 5, ate: 12, chave: [5.3, 8.3, 10.3] },
      { id: 'P04', de: 12, ate: 17, chave: [11.5, 13.6, 14.3] },
      { id: 'P05', de: 17, ate: 24, chave: [18.2, 19.5, 23.7] },
      { id: 'P06', de: 24, ate: 31, chave: [24.6, 26.8, 29.6] },
    ],
    estados: {
      abertura: { cx: 540, cy: 960, w: 1120, h: 1960, r: 0, cor: 1, sombra: 0 },
      janela: Object.assign({ cor: 0, sombra: 1, whoosh: 0 }, JANELA),           // whoosh do b2 vai nas deixas
      janelaAlta: Object.assign({ cor: 0, sombra: 1, whoosh: 0.4 }, JANELA_ALTA), // a janela sobe com a pílula (b5)
      janela2: Object.assign({ cor: 0, sombra: 1, whoosh: 0 }, JANELA2),          // whoosh da rolagem vai nas deixas
      // 980 de largura: a ponta direita da pílula (x 870-1030) dá lugar ao arrasto em x 970, 24 px ou mais à direita
      // do avanço do ID (até x 897; a tinta do "2" acaba em 888) e por dentro do contorno
      id: { cx: 540, cy: 720, w: 980, h: 320, r: 160, cor: 0, sombra: 1 },
      faixa: Object.assign({ cor: 0, sombra: 1 }, FAIXA),
    },
    morphs: [[3, 'janela', 2.6], [5, 'janelaAlta', 2.4], [11, 'janela2', 1.8], [18, 'id', 2.4], [24, 'faixa', 2.4]],
    conteudo: [
      { de: 0, ate: 3.75, atraso: -1, saida: false, desenha: gancho },
      { de: 3, ate: 18.5, atraso: 0, saida: false, desenha: tela },
      { de: 18, ate: 24, saida: false, desenha: id },
      { de: 24, ate: 31, atraso: 0, desenha: faixa },                 // o recorte controla a própria entrada (REC_ENTRA)
    ],
    legendas: [
      { de: 5, ate: 12, linhas: ['É o endereço da', 'agência parceira', 'que você escolheu.'], estilo: 'pilula' },
      { de: 12, ate: 17, linhas: ['No destinatário,', 'seu nome.'], estilo: 'pilula' },
      { de: 17, ate: 24, linhas: ['No complemento,', 'só o seu ID.'], estilo: 'pilula' },
      { de: 24, ate: 31, linhas: ['Compre em qualquer loja', 'online com esse endereço.'], estilo: 'pilula' },
    ],
    cursor: {
      // [batida em que o dedo começa a ir, alvo, mola]; os toques e arrastos estão na lista de planos
      moves: [
        [0, SAI(900), 2.4],                                   // fora do quadro, à direita (some do canto de baixo)
        [6.6, M_CEP, 2.4],                                    // entra e chega parado ~b7,2 (toque b8)
        [8.5, M_NUM, 2.6],                                    // desliza ao Número (toque b10)
        [11.1, [M_NUM[0], M_NUM[1] - ROLA], 1.6],             // arrasto b11-b12: sobe junto com a tela (a mesma mola)
        [12.6, M_NOME, 2.4],                                  // desliza ao Nome (toque b14)
        [14.4, SAI(1000), 1.8], [15.6, M_COMP, 2.4],          // sai; volta ao Complemento (toque b17)
        [17.4, SAI(820), 1.8],                                // sai
        [21.5, [970, 770], 2.4],                              // entra na ponta direita da pílula (y 595-845 em x 970),
                                                              // à direita do ID (avanço até x 897, tinta até 888)
        [23.3, [970, 680], 3],                                // arrasto b23-b24: sobe 90 px; o ID sai em TB(24) - 0,26
        [24.05, SAI(560), 1.8],                               // sai para cima e à direita, longe da linha do endereço
                                                              // (o cap. 2 o traz de volta no b28,6)
      ],
      cliques: [8, 10, 14, 17],
      arrastos: [[11, 12], [23, 24]],
    },
    // b4 (TF): empurrão de 1,02 para o LOKAL12 (x = 332 + 208 / 1,02; y = 1104 + (960 - 1104) / 1,02), com o traço e
    // o acento; b5: a janela sobe para 720 e a câmera recentra nela a 1,015, com a MESMA mola da janela (2,4 Hz). Com
    // 1,02 e a mola de 0,5 Hz, a câmera chegava 1 s depois da janela, e o topo ia a 265 (b5,7); a 1,015 a janela
    // (882 x 1,015 = 895) fica de 272 a 1168 e sobra folga para o sobressinal de 0,6% da mola. P05 respira até 1,02
    camera: [
      [4, { z: 1.02, x: 536, y: 963 }, 0.9], [5, { z: 1.015, x: 540, y: 956.5 }, 2.4],
      [11, { z: 1 }, 1.2], [18, { z: 1.02 }, 0.3], [24, { z: 1 }, 1.2],
    ],
    deixas: [
      { beat: 1, tipo: 'whoosh', ganho: 0.6, rotulo: 'o pin solta (b1)' },
      { beat: 2, tipo: 'thump', rotulo: 'o pin toca (b2)' },
      { beat: 2, tipo: 'whoosh', ganho: 1.1, rotulo: 'a tela abre (b2)' },
      { beat: 4, tipo: 'pop', rotulo: 'traço sob o LOKAL12 (b4)' },
      { beat: 11, tipo: 'whoosh', ganho: 0.45, rotulo: 'rolagem (b11)' },
      { beat: 18.25, tipo: 'pop', rotulo: 'o ID (b18)' },
      { beat: 26, tipo: 'pop', ganho: 0.6, rotulo: 'traço sob o endereço (b26)' },
    ],
    ativos: Object.assign({}, U.TELAS, { logoPinLaranja: '../../assets/logo/logo-laranja-so-pin.png' }),
  });
})();
