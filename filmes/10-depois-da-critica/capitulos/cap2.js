/**
 * Capítulo 2: os favores (P06-P10, batidas 24-44). Ver docs/09-diretor/lista-de-planos.md e docs/09-diretor/GUIA-DE-ANIMACAO.md.
 *
 * P06  a portaria de novo, em traço: a guarita vazia (cadeira vazia) e o interfone tocando sem resposta.
 * P07  o contêiner vira uma conversa genérica (sem marca): "Vizinho". O polegar envia no b29, a resposta volta no b30.
 * P08  a conversa do vizinho vira um cartão no alto e a do "Amigo" abre embaixo: envia (b33), "digitando" (b34), nada (b35).
 * P09  "Mãe": envia (b37), a resposta desce (b38). Os dois cartões ficam empilhados em cima.
 * P10  pesado demais: pedidos de favor entram pelo alto, um por colcheia e depois por semicolcheia, empurram tudo
 *      para baixo e se apertam; o contêiner cede embaixo, passando da faixa de cinema. Tudo congela na última
 *      semicolcheia do b43 (o corte da música). O capítulo 3 desfaz as bolhas na 44 (F.favores, no fim do arquivo).
 *
 * Camadas: conteúdo (portaria; moldura da conversa = cartões + cabeçalho + barra de digitar; mensagens de cada
 * conversa; a enxurrada) e fundo (a guarita esmaecida que fica à esquerda depois que o contêiner encolhe no b28).
 * Tudo é função pura do tempo; o único ruído é a tabela da enxurrada, feita uma vez com mulberry32(2443).
 */
(function () {
  'use strict';
  const { TB, cor, tam, M } = F;
  const { step, impulse, clamp, prog, easeOut, easeIn, easeInOut, mixHex, mulberry32, rrPts, arcPts } = M;
  const UI = tam.UI, TRACO = tam.TRACO;

  // ================================================================ estados do contêiner
  // As conversas ficam à direita (como as telas do "depois"); a esquerda mostra a guarita vazia esmaecida.
  // A altura cresce a cada conversa (um cartão a mais em cima) e o "pesado" cede só embaixo: o topo fica em y 140.
  const EST = {
    c2_portaria: { cx: 960, cy: 525, w: 1300, h: 660, r: 28 },
    c2_chat1: { cx: 1240, cy: 525, w: 1000, h: 650, r: 44 },
    c2_chat2: { cx: 1240, cy: 525, w: 1000, h: 690, r: 44 },
    c2_chat3: { cx: 1240, cy: 525, w: 1000, h: 770, r: 44 },
    c2_pesado: { cx: 1240, cy: 725, w: 1080, h: 1010, r: 84 },
  };
  /** Centro do botão de enviar na cena e a mira do cursor (ponta no quarto inferior direito do botão). */
  const botao = (e) => [e.cx + e.w / 2 - 78, e.cy + e.h / 2 - 78];
  const mira = (e) => { const [x, y] = botao(e); return [x + 16, y + 18]; };

  // ================================================================ apoio de desenho
  function linha(a, pts, p, c = cor.INK, larg = TRACO, fechado = false) {
    if (!(p > 0)) return;
    a.pen(c, larg); a.path(pts, p, fechado);
  }
  function mede(ctx, s, size, peso) {
    ctx.font = `${peso} ${size}px ${F.fonte.SANS}`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${(-0.02 * size).toFixed(1)}px`;
    return ctx.measureText(s).width;
  }
  /** Bolha de mensagem: cantos redondos, o canto de baixo do lado de quem fala quase reto (sem rabinho desenhado). */
  function bolha(ctx, x, y, w, h, eu, fundo, contorno) {
    const R = Math.min(36, h / 2), r = 10;
    ctx.beginPath(); ctx.roundRect(x, y, w, h, eu ? [R, R, r, R] : [R, R, R, r]);
    ctx.fillStyle = fundo; ctx.fill();
    if (contorno) { ctx.lineWidth = TRACO; ctx.strokeStyle = contorno; ctx.lineJoin = 'round'; ctx.stroke(); }
  }
  const circulo = (cx, cy, r, n = 28) => arcPts(cx, cy, r, -Math.PI / 2, Math.PI * 1.5, n);

  // ================================================================ P06: a portaria (coordenadas do conteúdo, centro em 960,525)
  // papel: 'f' fachada (tinta), 'd' dentro da guarita (tinta 2: fica atrás do vidro), 'a' apoio (linha clara)
  const GUARITA = [
    { i: 1, f: true, p: 'f', pts: rrPts(-648, -258, 424, 30, 8) },                 // laje
    { i: 1, p: 'f', pts: [[-626, -228], [-626, 262]] },                             // parede esquerda
    { i: 1, p: 'f', pts: [[-246, -228], [-246, 262]] },                             // parede direita
    { i: 2, f: true, p: 'f', pts: rrPts(-598, -178, 324, 278, 10) },               // janela
    { i: 2, f: true, p: 'f', pts: rrPts(-614, 100, 356, 22, 8) },                  // peitoril
    { i: 3, p: 'a', pts: [[-626, 168], [-246, 168]] },                              // revestimento
    { i: 3, p: 'a', pts: [[-626, 214], [-246, 214]] },
    { i: 4, p: 'd', pts: [[-473, -178], [-473, -146]] },                            // luminária sobre a cadeira
    { i: 4, f: true, p: 'd', pts: [[-503, -116], [-489, -146], [-457, -146], [-443, -116]] },
    { i: 5, f: true, p: 'd', pts: rrPts(-546, -78, 30, 110, 15) },                 // cadeira de lado, vazia: encosto
    { i: 5, p: 'd', pts: [[-531, 32], [-531, 44]] },
    { i: 5, f: true, p: 'd', pts: rrPts(-542, 40, 128, 20, 10) },                  // assento
    { i: 5, p: 'd', pts: [[-516, 6], [-450, 6], [-450, 40]] },                      // braço
    { i: 5, p: 'd', pts: [[-478, 60], [-478, 82]] },                                // coluna
    { i: 5, p: 'd', pts: [[-526, 84], [-430, 84]] },                                // base
    { i: 5, f: true, p: 'd', pts: arcPts(-520, 92, 6, 0, Math.PI * 2, 12) },       // rodinhas
    { i: 5, f: true, p: 'd', pts: arcPts(-436, 92, 6, 0, Math.PI * 2, 12) },
    { i: 6, p: 'd', pts: [[-396, 12], [-274, 12]] },                                // mesa
    { i: 6, p: 'd', pts: [[-384, 12], [-384, 100]] },
    { i: 6, f: true, p: 'd', pts: [[-372, 12], [-362, -12], [-318, -12], [-308, 12]], fone: true },   // o telefone da portaria: base
    { i: 6, f: true, p: 'd', pts: rrPts(-380, -30, 80, 14, 7), fone: true },                        // fone deitado no gancho
    { i: 6, p: 'd', pts: [[-372, -16], [-372, -10]], fone: true },
    { i: 6, p: 'd', pts: [[-308, -16], [-308, -10]], fone: true },
    { i: 7, p: 'a', pts: [[-584, -112], [-540, -156]] },                            // reflexo no vidro
    { i: 7, p: 'a', pts: [[-584, -80], [-512, -152]] },
  ];
  const PORTA = [
    { i: 0, p: 'f', pts: [[-650, 262], [650, 262]] },                               // chão
    { i: 0, p: 'a', pts: [[-650, 302], [650, 302]] },                               // meio-fio
    { i: 2, f: true, p: 'f', pts: rrPts(-170, -262, 480, 26, 8) },                 // marquise
    { i: 3, p: 'f', pts: [[-120, 262], [-120, -214], [250, -214], [250, 262]] },    // batente
    { i: 4, p: 'f', pts: [[-98, 262], [-98, -192], [56, -192], [56, 262]] },        // folha esquerda (vidro)
    { i: 4, p: 'f', pts: [[74, 262], [74, -192], [228, -192], [228, 262]] },        // folha direita
    { i: 5, p: 'f', pts: [[38, -6], [38, 96]] },                                    // puxadores
    { i: 5, p: 'f', pts: [[92, -6], [92, 96]] },
  ];
  const REFLEXO_PORTA = [[[-74, -70], [-10, -150]], [[-74, -26], [22, -150]], [[100, -70], [164, -150]]];
  const INTERFONE = { x: 330, y: -98, w: 100, h: 200, fala: [380, -56] };
  const DESLOCA = 70;   // o desenho do P06 fica centrado no contêiner (margens de ~75 px dos dois lados)
  /** Os toques do interfone (o "ding" entra com o desenho; o "dong" cai em cima da batida 25). */
  const TOQUES = [TB(24) + 0.1, TB(25)];

  /** Cada toque solta três ondas curtas que andam para fora e afinam até sumir (não é fade); só com o interfone já desenhado. */
  function ondas(a, t, cx, cy, pronto) {
    for (const te of TOQUES) for (let k = 0; k < 3; k++) {
      const u = prog(t, te + k * 0.06, te + k * 0.06 + 0.32);
      if (u <= 0 || u >= 1) continue;
      const r = 58 + 30 * k + 26 * easeOut(u);
      const w = TRACO * (1 - easeIn(u)) * pronto;
      linha(a, arcPts(cx, cy, r, -0.5, 0.5, 14), 1, cor.INK, w);
      linha(a, arcPts(cx, cy, r, Math.PI - 0.5, Math.PI + 0.5, 14), 1, cor.INK, w);
    }
  }
  /** Tremor do fone da guarita quando o interfone toca (ninguém atende). */
  function tremor(t) {
    let dx = 0;
    for (const te of TOQUES) if (t > te) dx += 3.2 * Math.sin(2 * Math.PI * 26 * (t - te)) * Math.exp(-(t - te) * 7);
    return dx;
  }

  function portaria(ctx, t, a) {
    const t0 = a.t0, ent = (i) => a.entra(t, t0, i * 1.1, 0.42);
    const tom = { f: cor.INK, d: cor.INK2, a: cor.LINE };
    const dxf = tremor(t);
    ctx.save(); ctx.translate(DESLOCA, 0);
    for (const s of PORTA) linha(a, s.pts, ent(s.i), tom[s.p], TRACO, s.f);
    for (const s of GUARITA) {
      if (s.fone) { ctx.save(); ctx.translate(dxf, 0); }
      linha(a, s.pts, ent(s.i), tom[s.p], TRACO, s.f);
      if (s.fone) {
        // risquinhos de vibração dos dois lados do fone
        for (const te of TOQUES) {
          const u = prog(t, te, te + 0.42);
          if (u > 0 && u < 1) {
            const p = (1 - easeIn(u)) * clamp(ent(s.i) * 1.5 - 0.5);
            linha(a, [[-384, -24], [-398, -38]], p, cor.INK2, 5);
            linha(a, [[-296, -24], [-282, -38]], p, cor.INK2, 5);
          }
        }
        ctx.restore();
      }
    }
    // reflexos do vidro da porta deslizam devagar (a câmera empurra; o reflexo anda ao contrário)
    const dr = -22 * easeInOut(prog(t, TB(24), TB(28)));
    REFLEXO_PORTA.forEach((pts) => linha(a, pts.map(([x, y]) => [x + dr, y]), ent(6), cor.LINE));
    // o interfone da rua: caixa, grade do alto-falante, teclas e botão
    const I = INTERFONE, pi = a.entra(t, t0, 0, 0.3);
    linha(a, rrPts(I.x, I.y, I.w, I.h, 18), pi, cor.INK, TRACO, true);
    [-74, -58, -42].forEach((y, k) => linha(a, [[I.x + 26, y], [I.x + I.w - 26, y]], a.entra(t, t0, 2 + k * 0.4, 0.3), cor.INK, 5));
    const pt = a.entra(t, t0, 3.4, 0.3);
    if (pt > 0) {
      ctx.fillStyle = cor.INK;
      for (let r = 0; r < 2; r++) for (let k = 0; k < 3; k++) {
        ctx.beginPath(); ctx.arc(I.x + 28 + k * 22, I.y + 116 + r * 22, 5 * pt, 0, Math.PI * 2); ctx.fill();
      }
    }
    linha(a, circulo(I.x + I.w / 2, I.y + 174, 13), a.entra(t, t0, 3.8, 0.35), cor.INK, 5, true);
    ondas(a, t, I.fala[0], I.fala[1], clamp(pi * 1.6 - 0.4));
    ctx.restore();
  }

  // ================================================================ P07-P09: as conversas
  const CONVERSAS = [
    { nome: 'Vizinho', de: 28, ate: 32, envio: 29, digita: 0.62, msgs: [
      { em: 29, eu: true, linhas: ['Pode pegar minha', 'encomenda?'] },
      { em: 30, eu: false, linhas: ['Tô viajando, desculpa.'] },
    ] },
    { nome: 'Amigo', de: 32, ate: 36, envio: 33, digita: 0.42, msgs: [
      { em: 33, eu: true, linhas: ['Tá em casa hoje?'] },
      { em: 34, ate: 35, pontinhos: true },
    ] },
    { nome: 'Mãe', de: 36, ate: 40, envio: 37, digita: 0.5, msgs: [
      { em: 37, eu: true, linhas: ['Mãe, recebe pra mim?'] },
      { em: 38, eu: false, linhas: ['Tô do outro lado da cidade.'] },
    ] },
  ];
  const CLIQUES = CONVERSAS.map((c) => c.envio);
  const PAD = 24, SLOT = 96, CAB = 104, LIN = 80, BOLHA1 = 116, VAO = 20, PONTOS = 116;
  const altura = (m) => (m.pontinhos ? PONTOS : BOLHA1 + LIN * (m.linhas.length - 1));
  /** Medidas da conversa no contêiner de agora (presas às bordas: acompanham a mola da forma). */
  function grade(c) {
    const top = -c.h / 2, bot = c.h / 2, esq = -c.w / 2, dir = c.w / 2;
    const yEnt = bot - 78;                                   // centro da barra de digitar e do botão
    return { top, bot, esq, dir, yEnt, topoEnt: yEnt - 46, chao: yEnt - 46 - 24, xBotao: dir - 78 };
  }
  const slot = (g, i) => g.top + PAD + i * SLOT;
  /** A divisória do cabeçalho desce um cartão a cada conversa nova. */
  const divisoria = (g, t) => slot(g, step(t - TB(32), 3) + step(t - TB(36), 3)) + CAB;

  // ---------------------------------------------------------------- P10: a enxurrada de pedidos
  const ENX = [40, 40.5, 41, 41.5, 42, 42.25, 42.5, 42.75, 43, 43.25, 43.5];   // colcheias, depois semicolcheias
  const CONGELA = TB(43.75);                                                 // a música corta: a imagem para
  const ENXURRADA = (() => {
    const r = mulberry32(2443);
    return ENX.map((b) => {
      const n = r() < 0.45 ? 2 : 1;
      const w = Math.round(440 + r() * 400);
      return { b, n, w, fx: r(), giro: (r() - 0.5) * 0.05, l1: 0.6 + 0.32 * r(), l2: 0.3 + 0.4 * r() };
    });
  })();
  const aperto = (t) => easeInOut(prog(t, TB(41.5), CONGELA));      // 0 solto, 1 espremido
  const altF = (e, q) => (e.n === 1 ? 100 : 146) * (1 - 0.22 * q);
  const vaoF = (q) => 18 - 34 * q;                                    // fica negativo: as bolhas se sobrepõem
  const MOLA_F = 4.5;
  /** Quanto tudo o que está abaixo do pedido k foi empurrado para baixo (k = 0: os cartões). */
  function empurra(t, k = 0) {
    const q = aperto(t);
    let s = 0;
    for (let j = k; j < ENXURRADA.length; j++) s += (altF(ENXURRADA[j], q) + vaoF(q)) * step(t - TB(ENXURRADA[j].b), MOLA_F);
    return s;
  }

  /** Cartões (conversas que já falharam), cabeçalho da conversa ativa e a barra de digitar com o botão. */
  function moldura(ctx, t, a) {
    const c = a.c, g = grade(c), t0 = a.t0, tq = Math.min(t, CONGELA);
    // barra de digitar (presa embaixo: no P10 ela cai junto com o fundo do contêiner)
    const xb0 = g.esq + 32, xb1 = g.dir - 144;
    linha(a, rrPts(xb0, g.topoEnt, xb1 - xb0, 92, 46), a.entra(t, t0, 1, 0.4), cor.LINE, 4, true);
    for (const cv of CONVERSAS) {
      // o texto sendo digitado é uma barra (a frase de verdade só aparece na bolha)
      const te = TB(cv.envio);
      // a conversa abre uma batida antes do envio: digita entre a entrada do cabeçalho e a chegada do polegar
      const k = easeInOut(prog(t, TB(cv.de) + 0.16, te - 0.08)) * (1 - easeOut(prog(t, te, te + 0.08)));
      if (k > 0.002) a.fill(xb0 + 36, g.yEnt - 9, (xb1 - xb0 - 72) * cv.digita * k, 18, 9, cor.INK2);
    }
    // botão de enviar: cresce com mola, afunda no clique
    const press = CLIQUES.reduce((s, n) => s + Math.max(0, impulse(t - TB(n), 4)), 0);
    const rb = 46 * step(t - (t0 + 0.2), 3.2) * (1 - 0.12 * clamp(press));
    if (rb > 0.5) {
      ctx.beginPath(); ctx.arc(g.xBotao, g.yEnt, rb, 0, Math.PI * 2); ctx.fillStyle = cor.INK; ctx.fill();
      const s = rb / 46, pa = a.entra(t, t0 + 0.3, 0, 0.35);
      ctx.save(); ctx.translate(g.xBotao, g.yEnt); ctx.scale(s, s);
      linha(a, [[-18, 0], [16, 0]], pa, cor.WHITE);
      linha(a, [[2, -15], [17, 0], [2, 15]], pa, cor.WHITE);
      ctx.restore();
    }
    // cabeçalhos que viram cartões
    const desce = empurra(tq);
    CONVERSAS.forEach((cv, i) => {
      const tIn = TB(cv.de) + 0.12, tV = TB(cv.ate);
      if (t < tIn) return;
      const y = slot(g, i) + desce;
      const kc = step(t - tV, 3);                                  // 0 cabeçalho, 1 cartão
      if (kc > 0.001) a.fill(g.esq + 20, y + 6 + 84 * (1 - kc), c.w - 40, 84 * kc, 28, cor.LIGHT);   // infla de baixo (da divisória) para cima
      const pch = a.entra(t, tIn, 0, 0.35) * (1 - easeIn(prog(t, tV, tV + 0.18)));
      linha(a, [[g.esq + 62, y + 26], [g.esq + 42, y + 48], [g.esq + 62, y + 70]], pch, cor.INK);
      const cn = mixHex(cor.INK, cor.INK2, prog(t, tV, tV + 0.3));
      a.sobe(t, tIn + 0.05, null, cv.nome, g.esq + 96, y + 72, UI, { peso: 800, cor: cn });
      const kp = easeOut(prog(t, tV + 0.08, tV + 0.5));
      if (kp > 0) {
        const xn = g.esq + 96 + mede(ctx, cv.nome, UI, 800) + 34;
        a.fill(xn, y + 39, Math.min(320, g.dir - 60 - xn) * kp, 18, 9, cor.LINE);   // a prévia (sem texto novo)
      }
    });
    // divisória do cabeçalho ativo
    const pd = a.entra(t, t0, 1, 0.5) * (1 - easeIn(prog(t, TB(40), TB(40) + 0.12)));
    const yd = divisoria(g, t) + desce;
    linha(a, [[g.esq, yd], [g.dir, yd]], pd, cor.LINE, 4);
  }

  /** As mensagens de uma conversa, empilhadas de baixo para cima; no fim rolam para cima e somem sob o cabeçalho. */
  function mensagens(cv) {
    return (ctx, t, a) => {
      const c = a.c, g = grade(c), yd = divisoria(g, t);
      const sai = easeIn(prog(t, TB(cv.ate) - 0.26, TB(cv.ate)));
      ctx.save();
      ctx.beginPath(); ctx.rect(g.esq, yd + 3, c.w, g.topoEnt - 6 - yd); ctx.clip();
      ctx.translate(0, -sai * (g.chao - yd + 40));
      const pres = (m) => step(t - TB(m.em), 3.2) - (m.ate ? step(t - TB(m.ate), 3.2) : 0);
      let acima = 0;
      const fundos = cv.msgs.map(() => 0);
      for (let i = cv.msgs.length - 1; i >= 0; i--) { fundos[i] = g.chao - acima; acima += (altura(cv.msgs[i]) + VAO) * pres(cv.msgs[i]); }
      cv.msgs.forEach((m, i) => {
        const tm = TB(m.em);
        if (t < tm) return;
        const h = altura(m), yb = fundos[i];
        let s = 0.55 + 0.45 * step(t - tm, 3.4), al = 1;
        if (m.ate) { const u = prog(t, TB(m.ate), TB(m.ate) + 0.16); s *= 1 - 0.5 * easeIn(u); al = 1 - u; if (al <= 0) return; }
        const larg = m.pontinhos ? 220 : Math.max(...m.linhas.map((l) => mede(ctx, l, UI, 700))) + 72;
        const x = m.eu ? g.dir - 32 - larg : g.esq + 32;
        const ax = m.eu ? x + larg : x;
        ctx.save(); ctx.globalAlpha *= al;
        ctx.translate(ax, yb + 22 * (1 - step(t - tm, 3.4))); ctx.scale(s, s); ctx.translate(-ax, -yb);
        bolha(ctx, x, yb - h, larg, h, m.eu, m.eu ? cor.INK : cor.LIGHT);
        if (m.pontinhos) {
          for (let k = 0; k < 3; k++) {
            const pul = 0.5 + 0.5 * Math.sin(2 * Math.PI * 2.4 * (t - tm) - k * 1.1);
            ctx.beginPath(); ctx.arc(x + 62 + k * 48, yb - h / 2, 12 + 3 * pul, 0, Math.PI * 2);
            ctx.fillStyle = mixHex(cor.LINE, cor.INK2, pul); ctx.fill();
          }
        } else {
          m.linhas.forEach((l, k) => a.sobe(t, tm + k * 0.07, null, l, x + 36, yb - h + 76 + k * LIN, UI,
            { peso: 700, cor: m.eu ? cor.WHITE : cor.INK2 }));
        }
        ctx.restore();
      });
      ctx.restore();
    };
  }

  /** A pilha do P10 no instante tq, em coordenadas do contêiner c (centro na origem). */
  function pilha(tq, c) {
    const g = grade(c), q = aperto(tq), out = [];
    for (let k = 0; k < ENXURRADA.length; k++) {
      const e = ENXURRADA[k], te = TB(e.b);
      if (tq < te) break;
      const h = altF(e, q), sk = step(tq - te, MOLA_F);
      const y = g.top + PAD + empurra(tq, k + 1) - (h + vaoF(q)) * (1 - sk);
      const x1 = g.dir - 32 - e.fx * (c.w - 64 - e.w);
      out.push({ k, e, x0: x1 - e.w, x1, y, h, q, s: 0.86 + 0.14 * sk, giro: e.giro * (0.4 + 0.6 * q), pb: easeOut(prog(tq, te + 0.03, te + 0.3)) });
    }
    return out;
  }
  /** Uma bolha de pedido: tinta, contorno branco (separa as que se apertam) e o "texto" em barras (sem frase nova). */
  function pedido(ctx, a, b) {
    const { e, x0, x1, y, h, q, pb } = b;
    ctx.save();
    ctx.translate(x1, y); ctx.rotate(b.giro); ctx.scale(b.s, b.s); ctx.translate(-x1, -y);   // cresce ancorada à direita
    bolha(ctx, x0, y, e.w, h, true, cor.INK, cor.WHITE);
    const bh = 18 * (1 - 0.22 * q);
    if (e.n === 1) a.fill(x0 + 36, y + h / 2 - bh / 2, (e.w - 72) * e.l1 * pb, bh, bh / 2, cor.MUTED);
    else {
      a.fill(x0 + 36, y + h * 0.36 - bh / 2, (e.w - 72) * e.l1 * pb, bh, bh / 2, cor.MUTED);
      a.fill(x0 + 36, y + h * 0.64 - bh / 2, (e.w - 72) * e.l2 * pb, bh, bh / 2, cor.MUTED);
    }
    ctx.restore();
  }
  /** P10: os pedidos entram pelo alto (pela boca do "saco"), empurram tudo para baixo e se apertam. */
  function enxurrada(ctx, t, a) {
    if (F.favores.assumido && t >= a.t1) return;                   // o capítulo 3 assumiu a pilha na 44
    for (const b of pilha(Math.min(t, CONGELA), a.c)) pedido(ctx, a, b);
  }

  // ---------------------------------------------------------------- fundo: a guarita vazia esmaecida (P07-P10)
  // Mesmo desenho e mesmo lugar do P06: quando o contêiner encolhe para a direita no b28, ela aparece atrás dele.
  function guaritaFundo(ctx, t, a) {
    const p = 1 - easeIn(prog(t, a.t1, a.t1 + 0.14));            // na 44 o traço recolhe (a virada limpa tudo)
    const cam = F.camera(t);
    // paralaxe: o fundo aproxima metade do que a câmera aproxima e anda um pouco para a esquerda
    const sp = (1 + 0.5 * (cam.z - 1)) / cam.z, dx = -26 * easeInOut(prog(t, TB(28), TB(44)));
    ctx.save();
    ctx.translate(960, 540); ctx.scale(sp, sp); ctx.translate(-960, -540);
    ctx.translate(960 + DESLOCA + dx, 525);                                   // a origem do conteúdo do P06
    for (const s of GUARITA) linha(a, s.pts, p, cor.LINE, TRACO, s.f);
    linha(a, [[-650, 262], [-180, 262]], p, cor.LINE);
    ctx.restore();
  }

  // ================================================================ para o capítulo 3
  /**
   * F.favores: a pilha do P10 como ficou no corte da música (b43.75), para a virada desfazer "em camadas".
   *   F.favores.t                    o instante do congelamento (s)
   *   F.favores.desenha(ctx, a, sai) desenha a pilha em coordenadas da CENA (no conteúdo do cap. 3, faça antes
   *                                  ctx.translate(-a.c.cx, -a.c.cy)); sai(i, n) dá 0..1 por bolha (0 = no lugar,
   *                                  1 = saiu): cada uma sobe dentro da própria máscara e some, sem fade.
   *   F.favores.n                    quantas bolhas (i = 0 é a mais antiga, embaixo; n - 1 é a do alto)
   *   F.favores.assumido = true      (no carregamento do cap. 3) faz o P10 parar seco em TB(44), sem a saída
   *                                  padrão de 0,12 s, para não haver imagem dupla com a pilha do cap. 3
   */
  F.favores = {
    t: CONGELA,
    n: ENXURRADA.length,
    assumido: false,
    desenha(ctx, a, sai = () => 0) {
      const c = EST.c2_pesado;
      ctx.save(); ctx.translate(c.cx, c.cy);
      for (const b of pilha(CONGELA, c)) {
        const u = clamp(sai(b.k, ENXURRADA.length));
        if (u >= 1) continue;
        ctx.save();
        ctx.beginPath(); ctx.rect(b.x0 - 16, b.y - 12, b.e.w + 32, b.h + 24); ctx.clip();
        ctx.translate(0, -(b.h + 28) * easeIn(u));
        pedido(ctx, a, b);
        ctx.restore();
      }
      ctx.restore();
    },
  };

  // ================================================================ registro
  F.registra({
    nome: 'Capítulo 2: os favores',
    planos: [
      { id: 'P06', de: 24, ate: 28, chave: [24.6, 25.5, 26.5, 27.6] },
      { id: 'P07', de: 28, ate: 32, chave: [28.6, 29.5, 30.5, 31.6] },
      { id: 'P08', de: 32, ate: 36, chave: [32.6, 33.5, 34.5, 35.6] },
      { id: 'P09', de: 36, ate: 40, chave: [36.6, 37.5, 38.5, 39.6] },
      { id: 'P10', de: 40, ate: 44, chave: [40.5, 41.5, 42.5, 43.5] },
    ],
    estados: EST,
    morphs: [[24, 'c2_portaria'], [28, 'c2_chat1'], [32, 'c2_chat2'], [36, 'c2_chat3'], [40, 'c2_pesado', 0.9]],
    conteudo: [
      { de: 24, ate: 28, atraso: 0.06, desenha: portaria },   // entra 0,06 s depois: o primeiro toque cola no "ding"
      { de: 28, ate: 44, desenha: moldura },
      ...CONVERSAS.map((cv) => ({ de: cv.de, ate: cv.ate, desenha: mensagens(cv) })),
      { de: 40, ate: 44, atraso: 0, desenha: enxurrada },
    ],
    fundo: [{ de: 28, ate: 44, atraso: 0, saida: false, desenha: guaritaFundo }],
    legendas: [{ de: 25, ate: 28, linhas: ['Sem porteiro.'], estilo: 'faixa' }],
    cursor: {
      moves: [[28, mira(EST.c2_chat1), 2.4], [32, mira(EST.c2_chat2), 2.4], [36, mira(EST.c2_chat3), 2.4], [39, [1760, 1010]]],
      cliques: CLIQUES,
    },
    camera: [[24, { z: 1.03 }, 0.15], [40, { z: 1 }, 0.3]],
    deixas: [
      { beat: 29, tipo: 'pop', pan: 0.3 }, { beat: 30, tipo: 'pop', pan: 0.1 }, { beat: 33, tipo: 'pop', pan: 0.3 },
      { beat: 34, tipo: 'pop', ganho: 0.6 }, { beat: 37, tipo: 'pop', pan: 0.3 }, { beat: 38, tipo: 'pop', pan: 0.1 },
      ...ENX.map((b, i) => ({ beat: b, tipo: 'pop', ganho: 0.5 + i * 0.04, pan: i % 2 ? 0.35 : -0.1 })),
    ],
    ativos: {},
  });
})();
