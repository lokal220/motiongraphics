/**
 * Capítulo 1: gancho e correria (P01-P05, batidas 0-24). Ver docs/lista-de-planos.md e docs/GUIA-DE-ANIMACAO.md.
 *
 *   P01 (b0-3)   o gancho: o contêiner largo é dois lugares ao mesmo tempo. À esquerda, a portaria sem porteiro:
 *                o interfone toca sozinho ("ding" b0, "dong" b1, já na música). À direita, o bolso da jaqueta:
 *                o celular vibra (b2) e a notificação sobe do bolso. Sem cursor. F.gancho desenha este plano.
 *   P02-P04      a correria: o fundo corta seco a cada tempo forte (metrô b4, trabalho b8, rua b12); o contêiner
 *   (b4-15)      é a pilha de notificações, que cresce para baixo (a mais nova embaixo: a pilha se lê como a
 *                história, de cima para baixo). O polegar toca em cada uma (b6, b10, b14) e ela fica "lida".
 *   P05 (b16-23) o contêiner vira a rua de lado: a caixa volta para a van, a porta fecha e a van vai embora
 *                pela faixa tracejada (a rua acompanha e para). As três notificações saem do contêiner e se
 *                comprimem no lugar, em camadas, acima da van: o problema acumulando (não é etiqueta de canto).
 *
 * Tudo é função pura do tempo. Ruído só com mulberry32 de semente fixa (tabela no carregamento).
 * Nada laranja neste capítulo: o laranja só entra na batida 44.
 */
(function () {
  'use strict';
  const { cor, tam, TB, M } = F;
  const { clamp, prog, lerp, easeOut, easeIn, easeInOut, step, impulse, mixHex, arcPts, rrPts } = M;
  const TR = tam.TRACO, PI = Math.PI;

  // ================================================================ ajudantes de traço
  /** Pontos de uma cúbica de Bézier (curvas orgânicas: costas, carroceria). */
  function bez(p0, p1, p2, p3, n = 14) {
    return Array.from({ length: n + 1 }, (_, i) => {
      const u = i / n, v = 1 - u, A = v * v * v, B = 3 * v * v * u, C = 3 * v * u * u, D = u * u * u;
      return [A * p0[0] + B * p1[0] + C * p2[0] + D * p3[0], A * p0[1] + B * p1[1] + C * p2[1] + D * p3[1]];
    });
  }
  const circ = (x, y, r, n = 44) => arcPts(x, y, r, -PI / 2, 1.5 * PI, n);
  const rr = (x, y, w, h, r) => rrPts(x, y, w, h, r);
  /** Traço em tinta que se desenha até a fração p (pontas e cantos redondos). */
  function tr(a, pts, p = 1, c = cor.INK, w = TR, fechado = false) {
    if (p > 0) { a.pen(c, w); a.path(pts, p, fechado); }
  }
  /** Preenche um polígono, sem traço. */
  function preenche(ctx, pts, c) {
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath(); ctx.fillStyle = c; ctx.fill();
  }
  /** Forma fechada com miolo: o miolo só entra quando o traço fecha (miolo da cor do que está atrás). */
  function forma(a, ctx, pts, p, miolo, c = cor.INK, w = TR) {
    if (p >= 1 && miolo) preenche(ctx, pts, miolo);
    tr(a, pts, p, c, w, true);
  }
  /** Membro (braço, alça) em traço: um tubo de miolo claro com contorno de 6 px. */
  function tubo(a, pts, p, larg, miolo, c = cor.INK) {
    if (p <= 0) return;
    a.pen(c, larg + 2 * TR); a.path(pts, p);
    a.pen(miolo, larg); a.path(pts, p);
  }
  /** Progresso do elemento i de n, em cascata, a partir de um progresso geral p (p = 1: tudo inteiro). */
  const fase = (p, i, n, s = 0.05) => { const v = clamp(p * (1 + s * (n - 1)) - s * i); return v > 0.9999 ? 1 : v; };
  /** Vibração do celular (os dois pulsos do "buzz" do sfx.mjs: 0-0,15 s e 0,22-0,37 s). */
  function vibra(tau) {
    if (tau < 0 || tau > 0.37) return 0;
    const pulso = tau < 0.15 ? 1 : tau > 0.22 ? 0.85 : 0;
    return pulso * Math.sin(2 * PI * 31 * tau);
  }

  /** Caixa de papelão em traço, de frente, sem marca: corpo, tampa e a fita. Centro (x, y), largura w. */
  function caixa(a, ctx, x, y, w, p = 1, c = cor.INK, lw = TR, miolo = cor.WHITE) {
    const h = w * 0.8, tp = h * 0.28;
    forma(a, ctx, rr(x - w / 2, y - h / 2 + tp * 0.6, w, h - tp * 0.6, w * 0.05), fase(p, 0, 3), miolo, c, lw);
    forma(a, ctx, rr(x - w * 0.56, y - h / 2, w * 1.12, tp, w * 0.05), fase(p, 1, 3), miolo, c, lw);
    tr(a, [[x, y - h / 2 + tp], [x, y + h * 0.08]], fase(p, 2, 3), c, lw);
  }
  /** O ícone da notificação: quadrado de app com a caixa dentro. Centro (x, y), lado s. */
  function icone(a, ctx, x, y, s, p = 1, c = cor.INK) {
    tr(a, rr(x - s / 2, y - s / 2, s, s, s * 0.28), fase(p, 0, 2), c, TR, true);
    caixa(a, ctx, x, y + s * 0.04, s * 0.5, fase(p, 1, 2), c, 5);
  }
  /**
   * As costas da personagem (nunca o rosto): cabeça lisa com coque em cima, ombros e a gola.
   * (x, y) = centro da cabeça, s = escala. Desenha o tronco até bem abaixo do quadro.
   */
  function costas(a, ctx, x, y, s, p = 1, miolo = cor.BG_ANTES, c = cor.INK) {
    const L = bez([x - 175 * s, y + 520 * s], [x - 178 * s, y + 260 * s], [x - 160 * s, y + 118 * s], [x - 58 * s, y + 96 * s]);
    const R = bez([x + 58 * s, y + 96 * s], [x + 160 * s, y + 118 * s], [x + 178 * s, y + 260 * s], [x + 175 * s, y + 520 * s]);
    const tronco = L.concat(R);
    forma(a, ctx, tronco, fase(p, 0, 4), miolo, c);
    tr(a, bez([x - 70 * s, y + 92 * s], [x - 30 * s, y + 150 * s], [x + 30 * s, y + 150 * s], [x + 70 * s, y + 92 * s], 10), fase(p, 1, 4), c);   // gola
    forma(a, ctx, circ(x + 8 * s, y - 64 * s, 25 * s, 28), fase(p, 2, 4), miolo, c);   // coque
    forma(a, ctx, circ(x, y, 64 * s), fase(p, 3, 4), miolo, c);                       // cabeça (por cima do coque)
  }

  // ================================================================ P01: o gancho (F.gancho)
  // Coordenadas com origem no centro do contêiner c1_gancho (1640 x 650): x -820..820, y -325..325.
  const G = {
    divisa: [[-92, -330], [-132, 330]],        // a borda da jaqueta (o zíper): de um lado a portaria, do outro o bolso
    chao: 255,
    botao: [-410, 62],                         // o botão do interfone, de onde saem as ondas
    bolso: { x0: 196, x1: 564, y: 100 },        // o bolso chapado: a boca reta em y, os lados descem para fora do quadro
    cel: { x: 282, y: -46, w: 196, r: 34 },
    card: { x: 380, y: -192, w: 772, h: 214 }, // a notificação, já pousada (acima do celular)
  };
  const TECIDO = cor.LINE;                     // a jaqueta: um neutro médio, para os dois lugares se separarem
  /** x da borda da jaqueta na altura y (mais um deslocamento para a direita). */
  const zx = (y, off = 0) => lerp(G.divisa[0][0], G.divisa[1][0], (y - G.divisa[0][1]) / 660) + off;
  /** Uma onda do interfone: arco à direita do botão que cresce e se recolhe pelas pontas (sem fade). */
  function onda(a, tau) {
    if (tau <= 0 || tau >= 0.85) return;
    const r = 70 + 172 * easeOut(prog(tau, 0, 0.85));
    const abre = easeOut(prog(tau, 0, 0.14)) * (1 - easeIn(prog(tau, 0.45, 0.85)));
    if (abre <= 0.01) return;
    const [bx, by] = G.botao, m = 0.62 * abre;
    tr(a, arcPts(bx, by, r, -m, m, 20), 1, cor.INK, TR);
  }

  /**
   * O conteúdo do P01 no instante t; p (0..1) é o progresso do traço se desenhando (1 = inteiro).
   * Em t = 0 está inteiro e parado: as ondas começam no "ding" (TB(0)), a vibração e a notificação no b2.
   * O capítulo 4 chama F.gancho(ctx, 0, a, p) nas batidas 88-90, com p subindo até 1: chega neste quadro.
   */
  F.gancho = (ctx, t, a, p = 1) => {
    const N = 16, e = (i) => fase(p, i, N, 0.04);
    const { INK, INK2, LINE, LIGHT, WHITE } = cor;
    const [d0, d1] = G.divisa;

    // ---------- direita: a jaqueta (o tecido entra por máscara deslizante, da borda para a direita)
    // ela está andando do outro lado da cidade: o bolso sobe e desce no passo (um por batida), a partir do "ding";
    // começa do repouso (1 - cos), então o primeiro quadro e o último do loop são iguais e sem salto
    const tb0 = TB(0), passo = t > tb0 ? 6 * (1 - Math.cos((2 * PI * (t - tb0)) / F.BEAT)) / 2 : 0;
    ctx.save(); ctx.translate(0, -passo);
    ctx.save();
    ctx.beginPath(); ctx.rect(-180, -340, 1020 * easeInOut(e(0)), 680); ctx.clip();
    preenche(ctx, [d0, [840, -340], [840, 340], d1], TECIDO);
    ctx.restore();
    // o zíper: a borda, a fita e os dentes
    tr(a, [d0, d1], e(0));
    tr(a, [[d0[0] + 30, d0[1]], [d1[0] + 30, d1[1]]], e(1), INK, 5);
    for (let k = 0, y = -318; y < 330; y += 20, k++) {
      if (k / 33 > e(2)) break;
      const o = k % 2 ? 12 : 3;
      tr(a, [[zx(y, o + 3), y], [zx(y, o + 15), y]], 1, INK2, 5);
    }
    // o puxador do zíper
    tr(a, rr(zx(-178, 2), -178, 26, 64, 10), e(3), INK, 5, true);
    tr(a, [[zx(-170, 15), -170], [zx(-160, 15), -152]], e(3), INK, 5);
    // o recorte do peito (a "pala" da jaqueta) com o pesponto
    tr(a, bez([zx(-246, 30), -246], [200, -250], [520, -262], [840, -280], 16), e(3), INK2, 5);
    ctx.save(); ctx.setLineDash([12, 14]);
    tr(a, bez([zx(-224, 30), -224], [200, -228], [520, -240], [840, -258], 16), e(4), LIGHT, 5);
    ctx.restore();

    // o celular no bolso: a parte de cima para fora; vibra no b2 e a tela acende
    const tb2 = F.hit(TB(2)), tv = t - tb2, vib = vibra(tv);
    const { x: cx0, y: cy0, w: cw, r: crr } = G.cel;
    const cx = cx0 + 7 * vib;
    const corpo = rr(cx, cy0, cw, 380, crr);
    ctx.save();   // o celular nunca aparece abaixo da boca do bolso (nem enquanto o traço se desenha)
    ctx.beginPath(); ctx.rect(-200, -400, 1100, 400 + G.bolso.y); ctx.clip();
    if (e(6) >= 1) preenche(ctx, corpo, WHITE);
    const acesa = tv >= 0;   // a tela acende seco quando a notificação chega, como uma tela de verdade
    ctx.save();
    ctx.beginPath(); ctx.rect(cx - 10, cy0 - 10, cw + 20, 400 * easeOut(e(7))); ctx.clip();
    a.fill(cx + 15, cy0 + 15, cw - 30, 340, crr - 12, acesa ? LIGHT : INK);
    ctx.restore();
    if (!acesa) tr(a, [[cx + cw / 2 - 24, cy0 + 32], [cx + cw / 2 + 24, cy0 + 32]], e(8), LINE, 6);   // o alto-falante
    else icone(a, ctx, cx + cw / 2, cy0 + 84, 64, 1, INK2);                     // acesa: o mesmo ícone da notificação
    tr(a, corpo, e(6), INK, TR, true);
    ctx.restore();
    // a vibração: traços curtos dos dois lados do celular, só durante os dois pulsos
    if (tv > 0 && (tv < 0.15 || (tv > 0.22 && tv < 0.37))) {
      for (const lado of [-1, 1]) {
        const x = lado < 0 ? cx - 30 : cx + cw + 30, c0 = lado < 0 ? PI : 0;
        for (const r of [26, 50]) tr(a, arcPts(x - lado * 40, cy0 + 60, r + 14, c0 - 0.45, c0 + 0.45, 8), 1, INK, 5);
      }
    }
    // o bolso chapado por cima do celular: frente de tecido, bainha, pesponto e os rebites
    const { x0: bx0, x1: bx1, y: by0 } = G.bolso;
    const frente = [[bx0, 340], [bx0, by0], [bx1, by0], [bx1, 340]];
    if (e(5) >= 1) preenche(ctx, frente, TECIDO);
    tr(a, frente, e(5), INK, TR);
    tr(a, [[bx0, by0 + 34], [bx1, by0 + 34]], e(6), INK2, 5);
    ctx.save(); ctx.setLineDash([12, 14]);
    tr(a, [[bx0 + 22, 340], [bx0 + 22, by0 + 58], [bx1 - 22, by0 + 58], [bx1 - 22, 340]], e(7), LIGHT, 5);
    ctx.restore();
    for (const x of [bx0 + 22, bx1 - 22]) tr(a, circ(x, by0 + 17, 7, 14), e(8), INK, 5);
    ctx.restore();   // fim do passo da jaqueta

    // ---------- esquerda: a portaria sem porteiro (porta de vidro fechada e o interfone)
    tr(a, [[-800, G.chao], [-190, G.chao]], e(2));                                // a calçada
    tr(a, rr(-804, -252, 336, 34, 12), e(3), INK, TR, true);                      // a marquise
    tr(a, [[-780, G.chao], [-780, -200], [-492, -200], [-492, G.chao]], e(4));    // o batente
    tr(a, [[-760, G.chao], [-760, -180], [-512, -180], [-512, G.chao]], e(5), INK, 5);
    tr(a, [[-636, -180], [-636, G.chao]], e(6), INK, 5);                          // as duas folhas
    tr(a, [[-656, -6], [-656, 92]], e(7));                                        // os puxadores
    tr(a, [[-616, -6], [-616, 92]], e(7));
    for (const [x0, y0, x1, y1] of [[-740, -66, -688, -128], [-740, -14, -670, -98], [-596, -66, -544, -128], [-596, -14, -526, -98]]) {
      tr(a, [[x0, y0], [x1, y1]], e(8), LINE, TR);                                // o reflexo do vidro
    }
    // atrás do vidro: a cadeira vazia (não tem porteiro), em linha clara, longe
    tr(a, rr(-736, 72, 70, 66, 14), e(9), LINE, 5, true);
    tr(a, [[-744, 148], [-658, 148]], e(9), LINE, 5);
    tr(a, [[-701, 148], [-701, 204], [-734, 228]], e(10), LINE, 5);
    tr(a, [[-701, 204], [-668, 228]], e(10), LINE, 5);

    // o interfone
    const [bx, by] = G.botao;
    tr(a, rr(bx - 52, -92, 104, 198, 18), e(9), INK, TR, true);
    tr(a, circ(bx, -58, 10, 20), e(10), INK, 5);                                  // a câmera
    for (const y of [-24, -6, 12]) tr(a, [[bx - 24, y], [bx + 24, y]], e(11), INK, 5);   // a grade do alto-falante
    // o botão fica "aceso" (cheio de tinta) enquanto toca sozinho, do "ding" até a cauda do "dong"
    if (t >= TB(0) && t < TB(1) + 0.8) { ctx.beginPath(); ctx.arc(bx, by, 20, 0, 2 * PI); ctx.fillStyle = INK; ctx.fill(); }
    tr(a, circ(bx, by, 20, 24), e(12), INK, TR);
    // as ondas: três no "ding" (b0) e três no "dong" (b1), saindo do botão
    for (const b of [0, 1]) for (let k = 0; k < 3; k++) onda(a, t - TB(b) - k * 0.1);

    // ---------- a notificação sobe do bolso (b2): sai da tela do celular, cresce e pousa no alto
    if (tv > 0) {
      const k = easeOut(prog(tv, 0, 0.5)), sc = lerp(0.24, 1, k);
      const x = lerp(cx0 + cw / 2, G.card.x, k), y = lerp(cy0 + 70 - passo, G.card.y, k);   // sai de onde o celular está agora
      const { w, h } = G.card;
      ctx.save();
      ctx.translate(x, y); ctx.scale(sc, sc);
      a.fill(-w / 2, -h / 2, w, h, 34, WHITE);
      tr(a, rr(-w / 2, -h / 2, w, h, 34), 1, INK, TR / sc, true);
      const x0 = -w / 2 + 40;
      icone(a, ctx, x0 + 30, -h / 2 + 60, 60, easeOut(prog(tv, 0.08, 0.5)), INK);
      a.sobe(t, tb2 + 0.14, null, 'Tentativa de entrega', x0 + 82, -h / 2 + 84, tam.UI, { peso: 700, cor: INK2 });
      a.sobe(t, tb2 + 0.21, null, 'Ninguém em casa.', x0, h / 2 - 46, tam.LEG, { cor: INK });
      ctx.restore();
    }
  };

  // ================================================================ P02-P04: a pilha de notificações
  // O contêiner tem o topo fixo em y = 200 (cy - h/2) e cresce para baixo: uma linha de 180 px por notificação.
  const NOTIF = [
    { txt: 'Saiu para entrega', abre: 4, chega: 5, toque: 6 },
    { txt: 'Ninguém para receber', abre: 8, chega: 9, toque: 10 },
    { txt: 'Nova tentativa amanhã', abre: 12, chega: 13, toque: 14 },
  ];
  const LINHA = 180, X_ICONE = -488, X_TXT = -400;
  /** Centro (y da cena) da notificação i na pilha. */
  const yNotif = (i) => 300 + LINHA * i;
  /** Estado de "lida" da notificação i no instante t (0 nova, 1 lida: o polegar tocou). */
  const lida = (n, t) => easeOut(prog(t, TB(n.toque) + 0.04, TB(n.toque) + 0.24));

  /** Uma notificação da pilha, com centro em (0, yc) no espaço em que for desenhada. */
  function notificacao(a, ctx, t, n, yc, pIcone) {
    const l = lida(n, t);
    const tinta = mixHex(cor.INK, cor.INK2, l);
    icone(a, ctx, X_ICONE, yc, 104, pIcone, l > 0.5 ? cor.INK2 : cor.INK);
    a.sobe(t, F.hit(TB(n.chega)), null, n.txt, X_TXT, yc + 30, tam.LEG, { cor: tinta });
  }

  function pilha(ctx, t, a) {
    if (t >= TB(16)) return;   // no b16 as notificações saem do contêiner (a frente as leva para a pilha comprimida)
    const cy = a.c.cy;
    NOTIF.forEach((n, i) => {
      const t0 = TB(n.abre) + 0.12;
      if (t < t0) return;
      const yc = yNotif(i) - cy;
      // a divisória entre as notificações se desenha quando a pilha cresce
      if (i > 0) tr(a, [[-540, yc - LINHA / 2], [540, yc - LINHA / 2]], a.entra(t, t0, 0, 0.5), cor.LINE, 4);
      ctx.save();
      // chega vibrando (o buzz) e afunda no toque do polegar (impulso, sem quique)
      const dx = 6 * vibra(t - F.hit(TB(n.chega)));
      const imp = t > TB(n.toque) ? impulse(t - TB(n.toque), 4) : 0;
      const s = 1 - 0.03 * imp;
      ctx.translate(dx, yc); ctx.scale(s, s); ctx.translate(0, -yc);
      notificacao(a, ctx, t, n, yc, a.entra(t, t0, 1, 0.45));
      ctx.restore();
    });
  }

  // ================================================================ P02-P04: os fundos (cortes secos no tempo forte)
  const fundoBase = (a) => a.fill(-120, -120, 2160, 1320, 0, cor.BG_ANTES);
  /** Paralaxe do primeiro plano: ele balança mais que o resto com a câmera na mão (passa mais rápido). */
  const perto = (t) => { const c = F.camera(t); return [0.7 * c.jx, 0.7 * c.jy]; };
  /** Impulso a partir da batida n (zero antes dela). */
  const pulso = (t, n, f) => (t > TB(n) ? impulse(t - TB(n), f) : 0);

  // faixas de luz do túnel (tabela fixa, semente fixa)
  const rnd = M.mulberry32(0x0c1a);
  const LUZES = Array.from({ length: 8 }, (_, i) => ({ x: i * 300 + rnd() * 140, w: 24 + rnd() * 80 }));
  const PER_LUZ = 2400;

  function metro(ctx, t, a) {
    const { INK, INK2, LINE, LIGHT, MUTED, BG_ANTES } = cor;
    fundoBase(a);
    // o tranco do vagão no b7 (no aro da música): as alças e o corpo dela balançam juntos, sem quique
    const tranco = pulso(t, 7, 1.1);
    // as janelas do outro lado do vagão: túnel escuro com faixas de luz passando depressa
    for (const x of [80, 540, 1000, 1460]) {
      ctx.save();
      ctx.beginPath(); ctx.roundRect(x, 430, 380, 210, 40); ctx.clip();
      ctx.fillStyle = MUTED; ctx.fillRect(x, 430, 380, 210);
      for (const L of LUZES) {
        const X = ((((L.x - 2300 * t) % PER_LUZ) + PER_LUZ) % PER_LUZ) - 200;
        preenche(ctx, [[X + 70, 420], [X + 70 + L.w, 420], [X + L.w, 650], [X, 650]], LIGHT);
      }
      ctx.restore();
      tr(a, rr(x, 430, 380, 210, 40), 1, INK2, TR, true);
    }
    // o banco comprido embaixo das janelas
    tr(a, rr(470, 700, 980, 70, 22), 1, INK2, TR, true);
    tr(a, [[440, 790], [1480, 790]], 1, INK2, TR);
    for (const x of [560, 1360]) tr(a, [[x, 790], [x, 880]], 1, INK2, TR);
    tr(a, [[-120, 884], [2040, 884]], 1, INK2, TR);                         // o piso
    // o corrimão do teto e as alças balançando (cada uma no seu passo)
    tr(a, [[-120, 168], [2040, 168]], 1, INK2, TR);
    const alca = (x, fase0, amp = 0.11) => {
      const th = amp * Math.sin(2 * PI * 0.85 * t + fase0) + 0.04 * Math.sin(2 * PI * 1.9 * t + fase0 * 2) + 0.22 * tranco;
      const fim = [x + 116 * Math.sin(th), 168 + 116 * Math.cos(th)];
      tr(a, [[x, 168], fim], 1, INK2, TR);
      tr(a, circ(fim[0] + 26 * Math.sin(th), fim[1] + 26 * Math.cos(th), 26, 24), 1, INK2, TR);
      return [fim[0] + 52 * Math.sin(th), fim[1] + 52 * Math.cos(th)];
    };
    alca(130, 0.4); alca(1610, 2.1); alca(1800, 3.3);
    tr(a, [[1700, 168], [1700, 884]], 1, INK2, TR);                         // o pega-mão vertical
    // primeiro plano: ela de costas, segurando a alça (a mão vai com a alça; o corpo tem a paralaxe)
    const [px0, py] = perto(t), px = px0 + 16 * tranco;
    const mao = alca(352, 1.2, 0.035);
    tubo(a, [[392 + px, 700 + py], [418 + px * 0.6, 530 + py * 0.6], mao], 1, 34, BG_ANTES, INK);   // o braço erguido
    ctx.save(); ctx.translate(px, py);
    costas(a, ctx, 300, 560, 1.05, 1, BG_ANTES);
    ctx.restore();
  }

  function trabalho(ctx, t, a) {
    const { INK, INK2, LINE, WHITE, BG_ANTES } = cor;
    fundoBase(a);
    // o relógio de parede: o ponteiro anda dez minutos a cada batida (o tique da música)
    const [rx, ry, R] = [230, 330, 96];
    tr(a, circ(rx, ry, R), 1, INK2, TR);
    for (let h = 0; h < 12; h++) {
      const an = (h / 12) * 2 * PI, r0 = h % 3 ? R - 16 : R - 26;
      tr(a, [[rx + r0 * Math.sin(an), ry - r0 * Math.cos(an)], [rx + (R - 8) * Math.sin(an), ry - (R - 8) * Math.cos(an)]], 1, h % 3 ? LINE : INK2, 5);
    }
    let passo = 0;
    for (let b = 8; b < 12; b++) passo += step(t - TB(b), 6);
    const min = (passo * PI) / 3, hora = (9 / 12) * 2 * PI + min / 12;
    tr(a, [[rx, ry], [rx + 50 * Math.sin(hora), ry - 50 * Math.cos(hora)]], 1, INK, 9);
    tr(a, [[rx, ry], [rx + 76 * Math.sin(min), ry - 76 * Math.cos(min)]], 1, INK, TR);
    // a janela com persiana, à direita
    tr(a, rr(1610, 200, 240, 420, 16), 1, INK2, TR, true);
    for (let y = 236; y < 610; y += 30) tr(a, [[1630, y], [1830, y]], 1, LINE, 5);
    tr(a, [[1810, 236], [1810, 560]], 1, INK2, 4);
    // a mesa, o notebook, a caneca e os papéis
    tr(a, [[-120, 800], [2040, 800]], 1, INK2, TR);
    tr(a, [[-120, 832], [2040, 832]], 1, INK2, TR);
    for (const x of [1000, 1620]) tr(a, [[x, 832], [x, 960]], 1, INK2, TR);
    forma(a, ctx, rr(840, 610, 380, 176, 16), 1, WHITE, INK2);               // a tela do notebook
    for (const [y, w] of [[656, 230], [690, 290], [724, 170]]) tr(a, [[884, y], [884 + w, y]], 1, LINE, 8);
    tr(a, [[800, 800], [826, 786], [1234, 786], [1260, 800]], 1, INK2, TR);
    forma(a, ctx, rr(1360, 710, 76, 90, 12), 1, WHITE, INK2);               // a caneca
    tr(a, arcPts(1436, 755, 22, -PI / 2, PI / 2, 12), 1, INK2, TR);
    for (const [y, x0] of [[778, 1500], [788, 1512], [798, 1504]]) tr(a, [[x0, y], [x0 + 150, y]], 1, LINE, 6);
    // primeiro plano: ela de costas, sentada na frente do notebook (maior: está mais perto de nós)
    const [px, py] = perto(t);
    ctx.save(); ctx.translate(px, py);
    costas(a, ctx, 560, 690, 1.3, 1, BG_ANTES);
    ctx.restore();
  }

  function rua(ctx, t, a) {
    const { INK, INK2, LINE, WHITE, BG_ANTES } = cor;
    if (t >= TB(16)) return;   // o corte seco é no b16, junto com o whoosh da transformação
    fundoBase(a);
    // longe: os prédios em linha clara
    const predios = [[-60, 300, 230], [190, 220, 250], [460, 340, 220], [700, 250, 260], [980, 300, 240], [1240, 200, 270], [1530, 320, 230], [1780, 240, 260]];
    for (const [x, y, w] of predios) {
      tr(a, [[x, 610], [x, y], [x + w, y], [x + w, 610]], 1, LINE, TR);
      for (let yy = y + 50; yy < 580; yy += 70) tr(a, [[x + 40, yy], [x + w - 40, yy]], 1, LINE, 5);
    }
    tr(a, [[-120, 610], [2040, 610]], 1, INK2, TR);                         // a guia do outro lado
    // a faixa de pedestres no chão, perto de nós
    for (let k = -1; k < 13; k++) {
      const x = 40 + k * 170;
      preenche(ctx, [[x + 30, 864], [x + 120, 864], [x + 100, 960], [x - 2, 960]], WHITE);
    }
    // o ônibus passa da direita para a esquerda, atrás da pilha (a frente dele aparece entre a pilha e o semáforo)
    const bx = 1990 - 1250 * (t - TB(12)), BW = 1180;
    if (bx < 1960 && bx > -BW - 40) {
      forma(a, ctx, rr(bx, 520, BW, 330, 46), 1, BG_ANTES, INK2);
      tr(a, rr(bx + 26, 552, 150, 190, 24), 1, INK2, TR, true);             // o para-brisa
      tr(a, rr(bx + 210, 548, 300, 36, 10), 1, INK2, 5, true);              // o letreiro (vazio: sem marca)
      for (let k = 0; k < 4; k++) tr(a, rr(bx + 210 + k * 236, 606, 206, 116, 16), 1, INK2, 5, true);
      tr(a, [[bx + 24, 770], [bx + BW - 24, 770]], 1, LINE, 6);
      tr(a, circ(bx + 52, 800, 14, 16), 1, INK2, 5);                        // o farol
      for (const wx of [bx + 250, bx + BW - 230]) {
        forma(a, ctx, circ(wx, 850, 52), 1, BG_ANTES, INK2);
        const giro = (1990 - bx) / 52;
        tr(a, [[wx + 32 * Math.cos(giro), 850 - 32 * Math.sin(giro)], [wx - 32 * Math.cos(giro), 850 + 32 * Math.sin(giro)]], 1, INK2, 5);
        tr(a, circ(wx, 850, 14, 16), 1, INK2, 5);
      }
    }
    // o semáforo, à direita, na frente do ônibus (sem cor: a luz não importa aqui)
    tr(a, [[1736, 470], [1736, 900]], 1, INK2, TR);
    forma(a, ctx, rr(1698, 300, 76, 170, 18), 1, BG_ANTES, INK2);
    for (const y of [338, 385, 432]) tr(a, circ(1736, y, 15, 18), 1, LINE, 5);
    // primeiro plano: ela de costas, andando (um passo por batida; a cabeça sobe e desce no passo)
    const [px, py] = perto(t);
    const passo = (t - TB(12)) / F.BEAT;
    const sobe = -10 * Math.abs(Math.sin(PI * passo)), lado = 5 * Math.sin(PI * passo);
    ctx.save(); ctx.translate(px + lado, py + sobe);
    costas(a, ctx, 250, 650, 1.1, 1, BG_ANTES);
    tr(a, [[380, 790], [110, 1010]], 1, INK, TR);                           // a alça da bolsa atravessada
    ctx.restore();
  }

  // ================================================================ P05: a rua de lado, a caixa volta e a van vai embora
  // Coordenadas com origem no centro do contêiner c1_rua (1700 x 660): x -850..850, y -330..330.
  const RUA = { calcada: 100, guia: 140, faixa: 290 };
  const VAN0 = 230;   // onde a van está parada (x local)
  /** Quanto a van andou: parte devagar depois que a porta fecha (b17 + 0,35 s) e acelera pela faixa. */
  const vanX = (t) => { const tau = t - TB(17) - 0.35; return tau > 0 ? 180 * tau * tau : 0; };
  /** A rua acompanha a van e para: anda até 40% do que a van anda e satura em 240 px (sem ultrapassar a van). */
  const panRua = (t) => -240 * (1 - Math.exp(-vanX(t) / 600));

  /** A van do entregador, sem marca nenhuma, de lado e virada para a direita. Origem no meio dela. */
  function van(a, ctx, t, e, gira) {
    const { INK, INK2, WHITE } = cor;
    const corpo = [
      [-330, 205], ...bez([-330, -36], [-330, -52], [-322, -64], [-304, -64], 6), [150, -64], [262, 28],
      ...bez([268, 34], [290, 44], [318, 52], [332, 66], 6), [340, 100], [340, 205],
      ...arcPts(225, 205, 56, 0, -PI, 16), ...arcPts(-210, 205, 56, 0, -PI, 16),
    ];
    forma(a, ctx, corpo, e(0), WHITE, INK);
    // o vão da porta de correr: o escuro de dentro e a caixa sendo empurrada para dentro
    if (e(2) >= 1) a.fill(-112, -40, 224, 180, 10, INK2);
    tr(a, rr(-112, -40, 224, 180, 10), e(2), INK, 5, true);
    const entra = easeInOut(prog(t, TB(16) + 0.3, TB(16) + 0.62));
    caixa(a, ctx, -46 + 46 * entra, 46, 136, e(3), INK, TR, WHITE);
    // a porta: aberta sobre a traseira, fecha no b17; a janela vazada deixa ver a caixa lá dentro
    const porta = -214 + 214 * easeInOut(prog(t, TB(17) + 0.04, TB(17) + 0.34));
    if (e(4) >= 1) {
      ctx.beginPath(); ctx.roundRect(porta - 112, -40, 224, 180, 10); ctx.roundRect(porta - 84, -20, 168, 120, 16);
      ctx.fillStyle = WHITE; ctx.fill('evenodd');
    }
    tr(a, rr(porta - 112, -40, 224, 180, 10), e(4), INK, TR, true);
    tr(a, rr(porta - 84, -20, 168, 120, 16), e(5), INK, 5, true);
    tr(a, [[porta + 62, 118], [porta + 92, 118]], e(5), INK, TR);
    // a janela do motorista, com o motorista sem rosto (só a silhueta da cabeça com boné)
    tr(a, [[136, -44], [172, -44], [238, 24], [136, 24]], e(6), INK, 5, true);
    tr(a, circ(186, 2, 22, 20), e(7), INK2, 5);
    tr(a, [[162, -14], [216, -14]], e(7), INK2, 5);
    // as rodas, com o raio girando conforme a van anda
    for (const wx of [-210, 225]) {
      forma(a, ctx, circ(wx, 205, 44), e(1), WHITE, INK);
      tr(a, circ(wx, 205, 14, 16), e(8), INK, 5);
      for (let k = 0; k < 3; k++) {
        const an = gira + (k * 2 * PI) / 3;
        tr(a, [[wx + 16 * Math.cos(an), 205 + 16 * Math.sin(an)], [wx + 34 * Math.cos(an), 205 + 34 * Math.sin(an)]], e(8), INK2, 5);
      }
    }
  }

  function ruaLateral(ctx, t, a) {
    const { INK, INK2, LINE, LIGHT, ROAD } = cor;
    const t0 = a.t0, e = (i) => easeOut(prog(t, t0 + i * 0.025, t0 + i * 0.025 + 0.28));
    const vx = vanX(t);
    ctx.save(); ctx.translate(panRua(t), 0);
    // o chão: calçada, guia, asfalto e a faixa tracejada (pintura da rua) por onde a van vai embora
    ctx.save();
    ctx.beginPath(); ctx.rect(-900, RUA.calcada, 2600 * easeOut(e(2)), 300); ctx.clip();
    a.fill(-900, RUA.calcada, 2600, RUA.guia - RUA.calcada, 0, LIGHT);
    a.fill(-900, RUA.guia, 2600, 260, 0, ROAD);
    ctx.restore();
    tr(a, [[-900, RUA.calcada], [1700, RUA.calcada]], e(2), INK2, 5);
    tr(a, [[-900, RUA.guia], [1700, RUA.guia]], e(3), INK, TR);
    ctx.save(); ctx.setLineDash([62, 46]);
    tr(a, [[-900, RUA.faixa], [1700, RUA.faixa]], e(4), INK2, TR);
    ctx.restore();
    // o prédio dela, à esquerda: a mesma portaria do gancho (porta de vidro e interfone), sem ninguém
    tr(a, [[-870, -340], [-870, RUA.calcada]], e(5), INK2, TR);
    tr(a, [[-400, -340], [-400, RUA.calcada]], e(5), INK2, TR);
    for (const y of [-290, -210]) for (const x of [-820, -650]) tr(a, rr(x, y, 130, 50, 10), e(6), LINE, 5, true);
    tr(a, rr(-800, -128, 300, 26, 10), e(7), INK, 5, true);                  // a marquise
    tr(a, [[-770, RUA.calcada], [-770, -90], [-530, -90], [-530, RUA.calcada]], e(7), INK, TR);
    tr(a, [[-650, -90], [-650, RUA.calcada]], e(8), INK, 5);
    tr(a, [[-670, 0], [-670, 50]], e(8), INK, 5); tr(a, [[-630, 0], [-630, 50]], e(8), INK, 5);
    tr(a, [[-740, -20], [-690, -70]], e(9), LINE, 5); tr(a, [[-620, -20], [-570, -70]], e(9), LINE, 5);
    tr(a, rr(-490, -40, 50, 84, 10), e(9), INK, 5, true);                    // o interfone
    tr(a, circ(-465, 22, 8, 14), e(10), INK, 4);
    // o poste, à direita (a van passa na frente dele)
    tr(a, [[800, RUA.calcada + 6], [800, -250]], e(6), INK2, TR);
    tr(a, bez([800, -250], [800, -300], [760, -312], [700, -312], 10), e(7), INK2, TR);
    tr(a, rr(650, -318, 74, 22, 10), e(8), INK2, 5, true);
    // a van: a caixa entra, a porta fecha no b17 e ela vai embora pela faixa tracejada
    ctx.save(); ctx.translate(VAN0 + vx, 0);
    van(a, ctx, t, (i) => easeOut(prog(t, t0 + i * 0.015, t0 + i * 0.015 + 0.22)), vx / 44);
    ctx.restore();
    ctx.restore();
  }

  // ================================================================ P05: a pilha comprimida (frente, espaço da cena)
  // No b16 as três notificações saem do contêiner que se abre na rua e se apertam no lugar, em camadas:
  // a mais nova na frente, as mais velhas atrás e acima (só a borda delas aparece). No b20 apertam mais.
  const PILHA = { cx: 1000, cy: 322, s: 0.78, passo: 32 };   // centro da carta da frente (cena), escala, degrau
  function pilhaComprimida(ctx, t, a) {
    const t16 = TB(16), aperta = step(t - TB(20), 2.2);
    const w0 = 1160, h0 = LINHA, degrau = lerp(PILHA.passo, 20, aperta);
    for (let i = 0; i < 3; i++) {                          // de trás (a mais velha) para a frente (a mais nova)
      const d = 2 - i;                                     // profundidade: 0 é a carta da frente
      const k = step(t - t16 - 0.04 * i, 2.2);
      const sAlvo = PILHA.s * (1 - 0.05 * d) * (1 - 0.04 * aperta);
      const cx = lerp(960, PILHA.cx, k), cy = lerp(yNotif(i), PILHA.cy - d * degrau, k), s = lerp(1, sAlvo, k);
      const w = w0 * s, h = h0 * s;
      a.fill(cx - w / 2, cy - h / 2, w, h, 40 * s, cor.WHITE);
      tr(a, rr(cx - w / 2, cy - h / 2, w, h, 40 * s), easeOut(prog(t, t16, t16 + 0.4)), cor.INK, TR, true);
      ctx.save();
      ctx.translate(cx, cy); ctx.scale(s, s);
      ctx.beginPath(); ctx.rect(-w0 / 2, -h0 / 2, w0, h0); ctx.clip();
      notificacao(a, ctx, t, NOTIF[i], 0, 1);
      ctx.restore();
    }
  }

  // ================================================================ registro
  F.registra({
    nome: 'Capítulo 1: gancho e correria',
    inicial: 'c1_gancho',
    planos: [
      { id: 'P01', de: 0, ate: 4, chave: [0.3, 1.2, 2.4, 3.5] },
      { id: 'P02', de: 4, ate: 8, chave: [4.6, 5.6, 6.6, 7.6] },
      { id: 'P03', de: 8, ate: 12, chave: [8.6, 9.6, 10.6, 11.6] },
      { id: 'P04', de: 12, ate: 16, chave: [12.6, 13.6, 14.6, 15.6] },
      { id: 'P05', de: 16, ate: 24, chave: [16.8, 18.5, 20.5, 22.5, 23.6] },
    ],
    // o topo do contêiner fica em y = 200 do gancho até a pilha de três (cy - h/2): a pilha cresce para baixo
    estados: {
      c1_gancho: { cx: 960, cy: 525, w: 1640, h: 650, r: 36 },
      c1_notif1: { cx: 960, cy: 300, w: 1160, h: 200, r: 40 },
      c1_notif2: { cx: 960, cy: 390, w: 1160, h: 380, r: 40 },
      c1_notif3: { cx: 960, cy: 480, w: 1160, h: 560, r: 40 },
      c1_rua: { cx: 960, cy: 525, w: 1700, h: 660, r: 28 },
    },
    morphs: [[4, 'c1_notif1'], [8, 'c1_notif2'], [12, 'c1_notif3'], [16, 'c1_rua', 1.6]],
    conteudo: [
      { de: 0, ate: 4, atraso: -1, desenha: (ctx, t, a) => F.gancho(ctx, t, a, 1) },
      { de: 4, ate: 16, desenha: pilha },
      { de: 16, ate: 24, desenha: ruaLateral },
    ],
    fundo: [
      { de: 4, ate: 8, saida: false, atraso: 0, desenha: metro },
      { de: 8, ate: 12, saida: false, atraso: 0, desenha: trabalho },
      { de: 12, ate: 16, saida: false, atraso: 0, desenha: rua },
    ],
    frente: [
      { de: 16, ate: 24, desenha: pilhaComprimida },
    ],
    // o polegar toca à direita e abaixo de cada frase (a ponta no quarto de baixo, à direita do texto)
    cursor: { moves: [[5, [1462, 346], 2.2], [9, [1462, 526], 2.4], [13, [1462, 706], 2.4], [15, [1760, 1000]]], cliques: [6, 10, 14] },
    camera: [[0, { z: 1.06 }, 0.12], [16, { z: 1, x: 960, y: 540 }, 0.7]],
    deixas: [
      { beat: 2, tipo: 'buzz', pan: 0.35 }, { beat: 2, tipo: 'pop', pan: 0.3 },
      { beat: 5, tipo: 'buzz' }, { beat: 5, tipo: 'pop' }, { beat: 9, tipo: 'buzz' }, { beat: 9, tipo: 'pop' },
      { beat: 13, tipo: 'buzz' }, { beat: 13, tipo: 'pop' },
      { beat: 17, tipo: 'whoosh', ganho: 1.2, pan: 0.1, panFim: 0.7, rotulo: 'a van sai' },
    ],
    ativos: {},
  });
})();
