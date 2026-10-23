/**
 * Capítulo 4: a agência recebe e o fim (P14-P19, batidas 64-90). Ver docs/lista-de-planos.md e docs/GUIA-DE-ANIMACAO.md.
 *
 *   P14 (b64-67) o balcão da agência em traço; a caixa chega deslizando para dentro da moldura de câmera,
 *                que fotografa no b65 (shutter): a foto é o instante congelado e vai para a parede.
 *   P15 (b68-71) a notificação real "Sua encomenda chegou!" desliza do topo (b68, buzz + pop); o celular da personagem
 *                (traço + a tela inicial real do app) sobe e vibra embaixo à direita; o cursor vai ao "Pagar para retirar".
 *   P16 (b72-75) a tela real "Detalhe da encomenda": a câmera chega no botão, o toque (b73) afunda o botão e o anel
 *                laranja o contorna; o contêiner vira a tela real "Retirada" (b74) e o anel pula para o
 *                "Pagamento confirmado" (b75, pop).
 *   P17 (b76-79) o celular com o QR encosta no balcão, check (b77, a curva confirm só aqui); o braço leva a caixa.
 *   P18 (b80-87) cartela laranja: logo branco (b80), frase (b81), lista real rolando (b82, 2 s na tela), endereço (b86).
 *   P19 (b88-89) volta ao gancho: o F.gancho do capítulo 1 se desenha e para (contrato do loop, GUIA seção 5).
 *
 * Conteúdo: px da cena com a origem no centro do contêiner. Fundo e frente: px da cena. Tudo é função pura do tempo.
 */
(function () {
  'use strict';
  const { cor, TB } = F;
  const M = F.M;
  const { clamp, prog, lerp, easeOut, easeIn, easeInOut, impulse, confirm, rrPts, arcPts } = M;
  const BRANCO = cor.WHITE;

  // ------------------------------------------------------------------ ajudantes
  /** Traço entre as frações q e p da polilinha: entra se desenhando (p sobe) e sai se recolhendo (q sobe). */
  function trecho(ctx, pts, q, p) {
    q = clamp(q); p = clamp(p);
    if (p <= q + 1e-4) return;
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const tot = L[L.length - 1];
    const em = (d) => {
      for (let i = 1; i < pts.length; i++) {
        if (d <= L[i]) { const k = (d - L[i - 1]) / (L[i] - L[i - 1] || 1); return [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]; }
      }
      return pts[pts.length - 1];
    };
    const d0 = q * tot, d1 = p * tot, s = em(d0), e = em(d1);
    ctx.beginPath(); ctx.moveTo(s[0], s[1]);
    for (let i = 1; i < pts.length - 1; i++) if (L[i] > d0 && L[i] < d1) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.lineTo(e[0], e[1]); ctx.stroke();
  }
  function preenche(ctx, pts, c) {
    ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
    ctx.fillStyle = c; ctx.fill();
  }
  /** Retângulo arredondado começando no canto de baixo à direita (o anel nasce perto da ponta do cursor). */
  const anelPts = (x, y, w, h, r) => { const p = rrPts(x, y, w, h, r); return p.slice(9).concat(p.slice(0, 9)); };

  // ------------------------------------------------------------------ o balcão da agência (P14 e P17)
  const TAMPO = 190;                         // a linha do tampo do balcão (y do conteúdo)
  const CAIXA = { w: 360, h: 236, d: 56 };   // frente 360 x 236, profundidade desenhada 56
  const BX = -198;                           // a caixa no balcão (canto de baixo à esquerda da frente), centrada sob o pin
  const PRAT = [[-730, -250, -175], [-730, -250, 0], [250, 730, -175], [250, 730, 0]];
  const CX_PRAT = [   // as caixas guardadas nas prateleiras: [x, base, w, h]
    [-700, -175, 150, 104], [-532, -175, 104, 136], [-410, -175, 138, 82],
    [-706, 0, 124, 120], [-562, 0, 176, 88], [-368, 0, 98, 112],
    [276, -175, 122, 112], [416, -175, 168, 84], [602, -175, 106, 128],
    [282, 0, 156, 96], [456, 0, 104, 132], [578, 0, 136, 80],
  ];
  /** Paralaxe: a parede (fundo) anda menos que o balcão (primeiro plano). Velocidade constante no plano. */
  const deriva = (t, b0) => { const u = (t - TB(b0)) / 2; return [-12 * u, -44 * u]; };

  /** A caixa de papelão em traço, sem marca: frente, tampa e lateral; a fita e uma etiqueta em branco. */
  function caixa(ctx, a, x, yb, p = 1) {
    const { w, h, d } = CAIXA, yt = yb - h;
    const sil = [[x, yb], [x, yt], [x + d, yt - d], [x + w + d, yt - d], [x + w + d, yb - d], [x + w, yb]];
    preenche(ctx, sil, BRANCO);
    a.pen(cor.INK);
    a.path(sil, p, true);
    a.path([[x, yt], [x + w, yt], [x + w + d, yt - d]], p);
    a.path([[x + w, yt], [x + w, yb]], p);
    a.path([[x + w / 2, yt], [x + w / 2 + d, yt - d]], p);
    a.path([[x + w / 2, yt], [x + w / 2, yt + 66]], p);
    a.pen(cor.LINE);
    a.path(rrPts(x + 34, yb - 106, 116, 66, 8), p, true);
  }
  /** A parede do fundo: prateleiras com caixas guardadas (linha clara) e o pin laranja da agência, que aponta a caixa. */
  function parede(ctx, a, t, t0, dx) {
    a.pen(cor.LINE);
    PRAT.forEach(([x0, x1, y], i) => a.path([[x0 + dx, y], [x1 + dx, y]], a.entra(t, t0, i * 0.6, 0.28)));
    CX_PRAT.forEach(([x, yb, w, h], i) => {
      const p = a.entra(t, t0, 1 + (i % 3) * 0.7, 0.28);
      a.path(rrPts(x + dx, yb - h, w, h, 6), p, true);
      a.path([[x + dx + w / 2, yb - h], [x + dx + w / 2, yb - h + 24]], p);
    });
    const ep = easeOut(prog(t, t0 + 0.08, t0 + 0.42));
    if (ep > 0) a.pin(dx, -196, 2.1 * ep);
  }
  /** O balcão em primeiro plano: tampo em tinta e as juntas do painel em linha clara. */
  function balcao(ctx, a, t, t0, dx) {
    a.pen(cor.INK);
    a.path([[-820 + dx, TAMPO], [820 + dx, TAMPO]], a.entra(t, t0, 0, 0.3));
    a.path([[-820 + dx, TAMPO + 38], [820 + dx, TAMPO + 38]], a.entra(t, t0, 0.6, 0.3));
    a.pen(cor.LINE);
    [-520, -260, 0, 260, 520].forEach((x, i) => a.path([[x + dx, TAMPO + 38], [x + dx, 420]], a.entra(t, t0, 1 + i * 0.4, 0.26)));
  }
  /** O braço da personagem (sem rosto, sem mão à mostra): a manga vem do primeiro plano (embaixo, à direita) até o
   *  punho C, logo fora do objeto; dali o pulso, mais fino, entra por trás do objeto (que é desenhado depois e o cobre).
   *  u = direção do braço (do ombro para a mão), k = alcance (0 fora do quadro, 1 no lugar). */
  const U_BRACO = (() => { const x = -0.56, y = -0.83, n = Math.hypot(x, y); return [x / n, y / n]; })();
  function braco(ctx, a, C, k = 1) {
    const [ux, uy] = U_BRACO, nx = -uy, ny = ux, recua = 900 * (1 - k);
    const P = (s, v) => [C[0] + ux * (s - recua) + nx * v, C[1] + uy * (s - recua) + ny * v];
    const manga = [P(-900, 64), P(0, 50), P(0, -50), P(-900, -64)];
    const pulso = [P(-4, 30), P(150, 30), ...arcPts(0, 0, 30, Math.PI / 2, -Math.PI / 2, 10).map(([x, y]) => P(150 + x, y)), P(-4, -30)];
    preenche(ctx, pulso, BRANCO);
    a.pen(cor.INK);
    a.path(pulso);
    preenche(ctx, manga, BRANCO);
    a.path([manga[0], manga[1], manga[2], manga[3]]);
    a.path([P(-18, 52), P(-18, -52)]);   // a barra do punho da manga
  }

  // ------------------------------------------------------------------ P14: registrado com foto
  /** A moldura de câmera em volta do lugar onde a caixa para (caixa + 46 px de folga). */
  const quadro14 = (bx) => ({ x: bx - 46, y: TAMPO - CAIXA.h - CAIXA.d - 46, w: CAIXA.w + CAIXA.d + 92, h: CAIXA.h + CAIXA.d + 92 });
  function cena14(ctx, a, t, t0) {
    const [dF, dP] = deriva(t, 64);
    parede(ctx, a, t, t0, dF);
    balcao(ctx, a, t, t0, dP);
    // a caixa chega deslizando pelo tampo e para dentro da moldura no b65
    const chega = easeOut(prog(t, TB(64) + 0.14, TB(65) - 0.02));
    caixa(ctx, a, lerp(-1180, BX, chega) + dP, TAMPO);
  }
  function p14(ctx, t, a) {
    const tf = TB(65);
    cena14(ctx, a, t, a.t0);
    const [dF, dP] = deriva(t, 64);
    // a moldura de câmera: cantoneiras que se desenham, fecham sobre o lugar da caixa e estalam no shutter
    const tb0 = TB(64) + 0.16;
    const pb = easeOut(prog(t, tb0, tb0 + 0.24)) * (1 - easeIn(prog(t, tf + 0.1, tf + 0.34)));
    if (pb > 0) {
      const R = quadro14(BX + dP), sc = 1 + 0.2 * (1 - easeOut(prog(t, tb0, tf))) - 0.22 * impulse(t - tf, 4);
      const cx = R.x + R.w / 2, cy = R.y + R.h / 2, hw = (R.w / 2) * sc, hh = (R.h / 2) * sc, L = 66 * pb;
      a.pen(cor.INK);
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        const X = cx + sx * hw, Y = cy + sy * hh;
        a.path([[X, Y - sy * L], [X, Y], [X - sx * L, Y]]);
      }
    }
    // a foto: no b65 a área enquadrada vira foto (fundo tingido, margem branca e borda), congelada no instante,
    // e se solta para a parede da direita (sem flash, sem brilho)
    if (t >= tf) {
      const R = quadro14(BX + deriva(tf, 64)[1]), mg = 18;
      const borda = easeOut(prog(t, tf, tf + 0.2));
      // a foto se solta (cresce 5%, vindo para a frente) e vai em diagonal para a parede da direita, por fora do pin
      const solta = easeOut(prog(t, tf + 0.12, tf + 0.36));
      const mv = easeInOut(prog(t, tf + 0.3, tf + 0.96)), my = mv;
      const sc = lerp(1 + 0.05 * solta, 0.56, mv);
      const c0 = [R.x + R.w / 2, R.y + R.h / 2], c1 = [500 + dF, -176];
      const cx = lerp(c0[0], c1[0], mv), cy = lerp(c0[1], c1[1], my);
      const w = (R.w + 2 * mg) * sc, h = (R.h + 2 * mg) * sc;
      ctx.save();
      ctx.beginPath(); ctx.roundRect(cx - w / 2, cy - h / 2, w, h, 16); ctx.fillStyle = BRANCO; ctx.fill();
      ctx.translate(cx, cy); ctx.scale(sc, sc);
      ctx.beginPath(); ctx.roundRect(-R.w / 2, -R.h / 2, R.w, R.h, 6); ctx.fillStyle = cor.LIGHT; ctx.fill(); ctx.clip();
      ctx.translate(-c0[0], -c0[1]);
      cena14(ctx, a, tf, a.t0);
      ctx.restore();
      a.pen(cor.INK);
      a.path(rrPts(cx - w / 2, cy - h / 2, w, h, 16), borda, true);
    }
  }

  // ------------------------------------------------------------------ P15: chegou
  const AVISO = { w: 1362, h: 252 };   // aviso-chegou.png (681 x 126) a 2x: o texto fica com 84 px, o corpo da legenda
  function p15(ctx, t, a) {
    const e = easeOut(prog(t, a.t0, a.t0 + 0.5));
    // revisão do diretor (animático): a b70 ficava morta; agora o cursor toca na notificação no b71 e ela afunda
    const s = 1 - 0.05 * Math.max(0, impulse(t - TB(71), 4));
    ctx.save(); ctx.scale(s, s);
    a.img('aviso', -AVISO.w / 2, -AVISO.h / 2 - (AVISO.h + 70) * (1 - e), AVISO.w);
    ctx.restore();
  }
  /** O celular da personagem em traço, embaixo à direita (a legenda fica à esquerda), com a tela inicial real do app.
   *  O botão "Pagar para retirar" da tela ocupa x 1435-1685, y ~915: o cursor vai até ele (1480, 912) no b71 e, no b72,
   *  o botão do "Detalhe da encomenda" chega embaixo do cursor. O corpo se revela de cima para baixo junto com o traço. */
  const CEL15 = { cx: 1560, y: 662, w: 330, r: 52, m: 12 };
  function celular15(ctx, t, a) {
    const e = easeOut(prog(t, TB(68), TB(68) + 0.5));
    // o buzz sacode o celular de leve (2 a 5 px, 0,4 s); em primeiro plano ele sobe devagar (paralaxe)
    const tau = t - TB(68), sacode = tau > 0 ? 5 * Math.sin(2 * Math.PI * 26 * tau) * Math.exp(-7 * tau) : 0;
    const { w, r, m } = CEL15, cx = CEL15.cx + sacode;
    const y0 = CEL15.y + 170 * (1 - e) - 22 * prog(t, TB(68), TB(72)), x0 = cx - w / 2, x1 = cx + w / 2;
    ctx.save();
    ctx.beginPath(); ctx.rect(x0 - 10, y0 - 10, w + 20, 20 + e * (1160 - y0)); ctx.clip();
    a.fill(x0, y0, w, 760, r, BRANCO);
    ctx.beginPath(); ctx.roundRect(x0 + m, y0 + m, w - 2 * m, 760, r - m); ctx.clip();
    a.img('inicio', x0 + m, y0 + m + 60 * (1 - e), w - 2 * m, [0, 0, 1080, 1500]);   // a tela real entra deslizando
    ctx.restore();
    const dir = [[cx, y0], [x1 - r, y0], ...arcPts(x1 - r, y0 + r, r, -Math.PI / 2, 0, 10), [x1, 1160]];
    const esq = dir.map(([x, y]) => [2 * cx - x, y]);
    a.pen(cor.INK);
    a.path(dir, e); a.path(esq, e);
  }
  /** O buzz: ondas finas dos dois lados do celular, que se desenham e se recolhem. */
  function vibra(ctx, t, a) {
    const t0 = TB(68), cy = CEL15.y + 110;
    a.pen(cor.INK);
    [44, 78].forEach((r, k) => {
      const p = easeOut(prog(t, t0 + 0.04 + k * 0.06, t0 + 0.26 + k * 0.06));
      const q = easeIn(prog(t, t0 + 0.44 + k * 0.06, t0 + 0.7 + k * 0.06));
      for (const lado of [-1, 1]) {
        const cx = CEL15.cx + lado * (CEL15.w / 2 + 6), a0 = lado > 0 ? -0.6 : Math.PI - 0.6;
        trecho(ctx, arcPts(cx, cy, r, a0, a0 + 1.2, 16), q, p);
      }
    });
  }

  // ------------------------------------------------------------------ P16: pagar e QR
  // "Detalhe da encomenda" a 2,35x, linhas 544-952 do arquivo: o botão fica com 47 px de texto e a câmera (1,2x) leva a 56.
  const ENC = { s: 2.35, y0: 544, btn: [23, 856, 517, 938] };
  const enc = (fx, fy) => [(fx - 270) * ENC.s, (fy - ENC.y0) * ENC.s - 480];
  function p16pagar(ctx, t, a) {
    const e = easeOut(prog(t, a.t0, a.t0 + 0.45));
    ctx.save(); ctx.translate(0, 170 * (1 - e));   // a tela real entra por máscara deslizante
    const [x0, y0] = enc(0, 500);
    a.img('encomenda', x0, y0, 540 * ENC.s, [0, 500, 540, 500]);
    // o toque: o botão real afunda (impulso) e volta
    const imp = impulse(t - TB(73), 3);
    if (imp !== 0) {
      const [b0, b1, b2, b3] = ENC.btn, [x1, y1] = enc(b0 - 2, b1 - 2), [x2, y2] = enc(b2 + 2, b3 + 2);
      a.fill(x1, y1, x2 - x1, y2 - y1, 0, BRANCO);
      const s = 1 - 0.26 * imp, cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
      a.img('encomenda', x1 - cx, y1 - cy, x2 - x1, [b0 - 2, b1 - 2, b2 - b0 + 4, b3 - b1 + 4]);
      ctx.restore();
    }
    // o anel laranja contorna o botão a partir do toque
    const p = easeOut(prog(t, TB(73) + 0.03, TB(73) + 0.4));
    if (p > 0) {
      const [x1, y1] = enc(ENC.btn[0], ENC.btn[1]), [x2, y2] = enc(ENC.btn[2], ENC.btn[3]), g = 18;
      a.pen(cor.OR);
      a.path(anelPts(x1 - g, y1 - g, x2 - x1 + 2 * g, y2 - y1 + 2 * g, 19 * ENC.s + g), p, true);
    }
    ctx.restore();
  }
  // "Retirada": entra a 2,8x (o "Pagamento confirmado" com 56 px de texto e a metade de cima do QR) e respira
  // devagar até 2,55x, mostrando mais QR. No b75 (pop, a confirmação) o anel laranja pula do botão para o "confirmado".
  const CONF = [129, 99, 412, 144];
  const vistaRet = (t) => { const s = lerp(2.8, 2.55, easeInOut(prog(t, TB(74) + 0.12, TB(76)))); return { s, fy: 86 + 480 / s }; };
  function p16qr(ctx, t, a) {
    const e = easeOut(prog(t, a.t0, a.t0 + 0.45)), dy = 170 * (1 - e);
    const v = vistaRet(t), X = (fx) => (fx - 270) * v.s, Y = (fy) => (fy - v.fy) * v.s + dy;
    a.img('retirada', X(0), Y(84), 540 * v.s, [0, 84, 540, 556]);   // do "confirmado" para baixo (sem o título no deslize)
    const p = easeOut(prog(t, TB(75), TB(75) + 0.36));
    if (p > 0) {
      const g = 16, h = (CONF[3] - CONF[1]) * v.s;
      a.pen(cor.OR);
      a.path(anelPts(X(CONF[0]) - g, Y(CONF[1]) - g, (CONF[2] - CONF[0]) * v.s + 2 * g, h + 2 * g, h / 2 + g), p, true);
    }
  }

  // ------------------------------------------------------------------ P17: retira, tranquila
  const CEL = { w: 236, h: 418, r: 36, m: 12 };
  /** O celular em traço com a tela real "Retirada" (o QR) dentro. cx = centro, yb = base. */
  function celular(ctx, a, cx, yb) {
    const x = cx - CEL.w / 2, y = yb - CEL.h;
    a.fill(x, y, CEL.w, CEL.h, CEL.r, BRANCO);
    ctx.save();
    ctx.beginPath(); ctx.roundRect(x + CEL.m, y + CEL.m, CEL.w - 2 * CEL.m, CEL.h - 2 * CEL.m, CEL.r - 12); ctx.clip();
    a.img('retirada', x + CEL.m, y + CEL.m, CEL.w - 2 * CEL.m);
    ctx.restore();
    a.pen(cor.INK);
    a.path(rrPts(x, y, CEL.w, CEL.h, CEL.r), 1, true);
  }
  function p17(ctx, t, a) {
    const t0 = a.t0, b76 = TB(76), b77 = TB(77), b78 = TB(78), b79 = TB(79);
    const [dF, dP] = deriva(t, 76);
    parede(ctx, a, t, t0, dF);
    balcao(ctx, a, t, t0, dP);
    // a personagem leva a caixa: o braço alcança (b78), ergue e sai pela direita (b79, whoosh)
    const alcanca = easeOut(prog(t, b78 + 0.06, b78 + 0.4));
    const ergue = easeOut(prog(t, b78 + 0.34, b78 + 0.52));
    const sai = easeInOut(prog(t, b78 + 0.46, b79 + 0.46));   // mais rápida no b79, onde cai o whoosh
    const bx = BX + dP + 1300 * sai, yb = TAMPO - 30 * ergue - 60 * sai;
    if (alcanca > 0) braco(ctx, a, [bx + CAIXA.w + CAIXA.d + 26, yb - 34], alcanca);
    caixa(ctx, a, bx, yb, a.entra(t, t0, 1, 0.32));
    // o celular com o QR vem da personagem (embaixo, à direita), encosta no balcão no b77 e volta
    const vem = easeOut(prog(t, b76 + 0.12, b77 - 0.02));
    const vai = easeIn(prog(t, b77 + 0.24, b77 + 0.56));
    if (vem > 0 && vai < 1) {
      const px = lerp(1000, 470, vem) + 560 * vai + dP, pb = lerp(820, TAMPO, vem) + 640 * vai;
      braco(ctx, a, [px + CEL.w / 2 + 30, pb + 26]);
      celular(ctx, a, px, pb);
    }
    // o check entre a caixa e o celular (b77): a curva de confirmação só aqui
    const ck = prog(t, b77, b77 + 0.42), some = easeIn(prog(t, b78, b78 + 0.24));
    if (ck > 0 && some < 1) {
      const s = confirm(ck) * (1 - some), cx = 286 + dP, cy = -206;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
      ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2); ctx.fillStyle = BRANCO; ctx.fill();
      a.pen(cor.OR); a.path(arcPts(0, 0, 58, -Math.PI / 2, Math.PI * 1.5, 40), easeOut(prog(t, b77, b77 + 0.3)));
      a.pen(cor.INK); a.path([[-26, 2], [-8, 20], [27, -17]], easeOut(prog(t, b77 + 0.1, b77 + 0.34)));
      ctx.restore();
    }
  }

  // ------------------------------------------------------------------ P18: a assinatura
  const LOGO_R = 440 / 989, LOGO_0 = 998, LOGO_1 = 640;   // 52% da largura na entrada; 1/3 no bloco
  const LISTA = [['Alguém sempre lá', 'pra receber'], ['Aviso no WhatsApp', 'quando chega'], ['7 dias úteis pra', 'buscar com calma'], ['Retirada protegida', 'por QR Code']];
  const ASS = { cor: BRANCO, espaco: '-2.9px' };   // DM Sans 800, -0,03 em
  function p18(ctx, t, a) {
    // revisão do diretor: a lista ficava inteira na tela só ~0,3 s; agora a frase vem no b81 e a lista no b82 (2 s)
    const b81 = TB(81), b82 = TB(82), b86 = TB(86), fim = TB(88) - 0.26;
    const ent = easeOut(prog(t, a.t0, a.t0 + 0.65));                                       // logo: 96% -> 100% e opacidade
    const sobe = easeInOut(prog(t, b81, b81 + 0.5));                                       // o logo sobe para o bloco
    // o bloco desliza para a esquerda no whoosh (sai rápido e assenta) e volta ao centro no b86 (cortina)
    const desl = easeOut(prog(t, b82, b82 + 0.55)) - easeInOut(prog(t, b86, b86 + 0.6));
    const cresce = easeInOut(prog(t, b86, b86 + 0.6));                                     // o bloco ganha o endereço
    const left = -350 - 470 * desl, top = lerp(-262, -322, cresce);
    const w = lerp(LOGO_0, LOGO_1, sobe), h = w * LOGO_R;
    const x = lerp(-LOGO_0 / 2, left, sobe), y = lerp((-LOGO_0 * LOGO_R) / 2, top, sobe);
    ctx.save();
    ctx.globalAlpha *= ent;
    const s = 0.96 + 0.04 * ent;
    ctx.translate(x + w / 2, y + h / 2); ctx.scale(s, s);
    a.img('logoBranco', -w / 2, -h / 2, w);
    ctx.restore();
    const yf = top + LOGO_1 * LOGO_R + 52 + 72;
    a.sobe(t, b81 + 0.34, fim, 'Chega de perder', left, yf, F.tam.ASS, ASS);   // entra quando o logo já liberou o lugar
    a.sobe(t, b81 + 0.41, fim, 'encomendas.', left, yf + 106, F.tam.ASS, ASS);
    a.sobe(t, b86 + 0.22, fim, 'vaidelokal.com.br', left, yf + 106 + 116, F.tam.LEG, { cor: BRANCO });
    // a lista real do site rola de baixo para cima à direita (b82), acelerando e freando, e sai subindo antes de o bloco voltar (b86)
    const rola = 24 - 48 * easeInOut(prog(t, b82, b86));
    LISTA.forEach((linhas, i) => {
      const yb = -333 + i * 206 + rola, ti = b82 + 0.12 + i * 0.08, to = b86 - 0.13 + i * 0.03;
      linhas.forEach((s, j) => a.sobe(t, ti + j * 0.07, to, s, 130, yb + j * 90, F.tam.LEG, { cor: BRANCO }));
      const p = easeOut(prog(t, ti, ti + 0.3)), q = easeIn(prog(t, to, to + 0.24));
      a.pen(BRANCO);
      trecho(ctx, [[40, yb - 30], [60, yb - 10], [96, yb - 52]], q, p);
    });
  }

  // ------------------------------------------------------------------ P19: o contrato do loop
  /** A API que o F.gancho recebe no t = 0 (t0/t1 da camada do P01 no capítulo 1), para a pose ser a mesma. */
  function apiDoGancho(a) {
    const c1 = F.capitulos.find((c) => c.inicial);
    const L = c1 && (c1.conteudo || []).find((x) => x.de === 0);
    if (!L) return a;
    return Object.assign(Object.create(a), { t0: TB(L.de) + (L.atraso ?? 0.12), t1: TB(L.ate), k: 1 });
  }
  function p19(ctx, t, a) {
    if (typeof F.gancho !== 'function') return;
    const p = easeOut(prog(t, a.t0, TB(88) + 0.69));   // o traço se desenha e para inteiro em ~44,7 s
    // a pose do primeiro quadro: parada em t = 0 até o fim; no último quadro os subquadros caem exatamente nos
    // mesmos instantes que o motor usa em t = 0 (desfoque de movimento idêntico na emenda)
    const q = 120 * F.SUB, lo = -(F.SUB - 1) / q, d = t - F.DUR;
    const tg = d <= lo ? lo : Math.round(d * q) / q;
    F.gancho(ctx, tg, apiDoGancho(a), p);
  }

  F.registra({
    nome: 'Capítulo 4: a agência recebe e o fim',
    planos: [
      { id: 'P14', de: 64, ate: 68, chave: [64.4, 65.1, 65.8, 67.6] },
      { id: 'P15', de: 68, ate: 72, chave: [68.3, 69.2, 70.5, 71.7] },
      { id: 'P16', de: 72, ate: 76, chave: [72.7, 73.2, 74.6, 75.8] },
      { id: 'P17', de: 76, ate: 80, chave: [76.6, 77.3, 78.5, 79.2] },
      { id: 'P18', de: 80, ate: 88, chave: [80.6, 81.9, 84.2, 86.9, 87.6] },
      { id: 'P19', de: 88, ate: 90, chave: [88.3, 88.9, 89.97] },
    ],
    estados: {
      c4_balcao: { cx: 960, cy: 540, w: 1560, h: 760, r: 32 },
      c4_aviso: { cx: 960, cy: 330, w: AVISO.w, h: AVISO.h, r: 84 },   // a própria notificação real, a 2x
      c4_pagar: { cx: 960, cy: 540, w: 540 * ENC.s, h: 960, r: 48 },     // a tela real a 2,25x, recortada no botão
      c4_qr: { cx: 960, cy: 540, w: 860, h: 960, r: 48 },
      c4_retira: { cx: 960, cy: 540, w: 1560, h: 760, r: 32 },
      c4_cartela: { cx: 960, cy: 540, w: 1960, h: 1120, r: 0, cor: 1, sombra: 0, whoosh: 1.3 },
    },
    morphs: [[64, 'c4_balcao'], [68, 'c4_aviso'], [72, 'c4_pagar'], [74, 'c4_qr'], [76, 'c4_retira'], [80, 'c4_cartela', 1.4], [88, 'c1_gancho', 2.6]],
    conteudo: [
      { de: 64, ate: 68, desenha: p14 },
      { de: 68, ate: 72, desenha: p15 },
      { de: 72, ate: 74, desenha: p16pagar },
      { de: 74, ate: 76, desenha: p16qr },
      { de: 76, ate: 80, desenha: p17 },
      { de: 80, ate: 88, atraso: 0.08, desenha: p18 },   // o logo entra 80 ms depois do thump, com a cartela já laranja
      { de: 88, ate: 90, saida: false, desenha: p19 },
    ],
    // o celular fica em primeiro plano: sobe já no b68, junto do buzz, na frente do contêiner que ainda encolhe
    // revisão do diretor: o celular pequeno no canto não se lia a 360 px e parecia etiqueta de canto; saiu do P15
    frente: [],
    legendas: [
      { de: 65, ate: 68, linhas: ['Registrado com foto.'], estilo: 'pilula' },
      { de: 69, ate: 72, linhas: ['A gente te avisa no WhatsApp.'], estilo: 'pilula' },
      { de: 77, ate: 80, linhas: ['Retire quando puder.', { txt: 'Sem pedir favor a ninguém.', em: 78 }], estilo: 'pilula' },
    ],
    cursor: {
      // b64: some o cursor que o capítulo 3 deixou no canto; b71: vai ao "Pagar" (ponta no quarto de baixo à direita);
      // b74: sai do quadro e fica parado fora (o b87 do contrato do loop vira só confirmação)
      // b70: vai à notificação (ponta à direita do texto) e toca no b71; b72: desce até o botão de pagar e toca no b73
      moves: [[64, [2060, 1220], 2.2], [70, [1560, 402], 2.4], [72, [1480, 912], 2.4], [74, [2060, 1220], 1.6], [87, [2060, 1220], 2.6]],
      cliques: [71, 73],
    },
    camera: [
      [64, { z: 1, x: 960, y: 540 }, 1.2],      // P14 parada
      [65, { z: 1.035, x: 960, y: 520 }, 0.35], // leve aproximação depois da foto
      [68, { z: 1.02, x: 960, y: 500 }, 0.6],   // P15 respiração
      [72, { z: 1.2, x: 960, y: 720 }, 1.3],    // P16 zoom no botão (com o "Total a pagar R$ 5,90" inteiro em cima)
      [74, { z: 1, x: 960, y: 540 }, 2.2],      // recua junto com a transformação para a "Retirada"
      [80, { z: 1, x: 960, y: 540 }, 1.4],      // P18 parada
      [88, { z: 1, x: 960, y: 540 }, 2.6],      // P19: o enquadramento do primeiro quadro
    ],
    deixas: [
      { beat: 65, tipo: 'shutter', pan: 0.05 }, { beat: 68, tipo: 'buzz', pan: 0.55 }, { beat: 68, tipo: 'pop' },
      { beat: 75, tipo: 'pop', rotulo: 'pagamento confirmado (o anel pula)' }, { beat: 77, tipo: 'pop', pan: 0.3, rotulo: 'check no balcão' },
      { beat: 79, tipo: 'whoosh', ganho: 0.5, pan: 0.3, panFim: 0.8, rotulo: 'a caixa sai pela direita' },
      { beat: 80, tipo: 'thump', rotulo: 'logo' }, { beat: 82, tipo: 'whoosh', ganho: 0.8, pan: 0, panFim: -0.4, rotulo: 'o bloco desliza' },
    ],
    ativos: {
      inicio: '../../assets/09/app/app-inicio.jpg',
      encomenda: '../../assets/09/app-tela-encomenda.jpg', retirada: '../../assets/09/app-tela-retirada.jpg',
      aviso: '../../assets/09/aviso-chegou.png', logoBranco: '../../assets/09/app/logo-branco.png',
    },
  });
})();
