/**
 * Capítulo 3: a virada e o endereço (P11-P13, batidas 44-64). Ver docs/09-diretor/lista-de-planos.md e docs/09-diretor/GUIA-DE-ANIMACAO.md.
 *
 *   P11 (b44-47)  a virada: o contêiner limpo e o primeiro laranja do filme, um traço que nasce no b44 na largura
 *                 da frase e encolhe até ficar sob "recebe" no b46. "Compre onde quiser." (b45) /
 *                 "A gente recebe pra você." (b46, "recebe" em laranja).
 *   P12 (b48-57)  a tela real "Seu endereço para compras" (recorte do print do app, ampliado 1,3x), que rola dentro
 *                 do contêiner no b52. Quatro toques em Copiar (b49, b51, b53, b55): o botão real afunda e o anel
 *                 laranja pula para o cartão do passo. No Complemento a câmera aproxima até o LOKAL12 real e volta.
 *   P13 (b58-63)  o mapa desenhado: a rota de sempre até a casa recolhe e a casa esmaece (b59), o pin da agência
 *                 cai e assenta (b60), a rota laranja vai da loja até o pin (b60-61) e uma caixa percorre a rota (b62).
 *
 * Função pura do tempo: nada guarda estado entre quadros; todas as posições saem de TB(n) e de molas.
 */
(function () {
  'use strict';
  const { cor, tam, fonte, TB } = F;
  const { impulse, track, prog, lerp, easeOut, easeIn, easeInOut, mixHex, rrPts, arcPts, along } = F.M;
  const FORA = [2060, 1220];   // onde o cursor descansa, fora do quadro

  // ================================================================ P11: a virada
  const VIRADA = { cx: 960, cy: 540, w: 1560, h: 520, r: 40, whoosh: 1.4 };
  const T11 = 120;   // corpo do título da virada (DM Sans 800): 22 px num celular de 360 px

  function virada(ctx, t, a) {
    const sai = TB(48) - 0.26;   // o texto sai antes da transformação seguinte
    ctx.font = `800 ${T11}px ${fonte.SANS}`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${(-0.02 * T11).toFixed(1)}px`;
    const wA = ctx.measureText('A gente ').width, wR = ctx.measureText('recebe').width;
    const w2 = ctx.measureText('A gente recebe pra você.').width;
    const x0 = -w2 / 2, y1 = -44, y2 = y1 + Math.round(T11 * 1.16);
    // profundidade: o texto fica um pouco mais perto da câmera que o cartão (paralaxe na respiração)
    const pz = 1 + 0.6 * (F.camera(t).z - 1);
    ctx.save(); ctx.scale(pz, pz);
    a.sobe(t, TB(45) + 0.08, sai, 'Compre onde quiser.', x0, y1, T11, { cor: cor.INK });
    const t2 = TB(46) + 0.08;
    a.sobe(t, t2, sai, 'A gente ', x0, y2, T11, { cor: cor.INK });
    a.sobe(t, t2, sai, 'recebe', x0 + wA, y2, T11, { cor: cor.OR });
    a.sobe(t, t2, sai, ' pra você.', x0 + wA + wR, y2, T11, { cor: cor.INK });
    // O primeiro laranja do filme, no tempo forte da virada (b44): um traço se desenha do meio para as pontas,
    // na largura da frase, enquanto o contêiner se abre.
    // No b46, quando a segunda linha sobe, as duas pontas correm (molas diferentes, como o indicador que estica)
    // até o traço ficar só sob "recebe", a palavra-chave. Sai recolhendo, junto com o texto.
    // nasce quando a pilha do capítulo 2 já saiu (≈ 0,45 s depois do b44): o primeiro laranja num contêiner limpo
    const p = easeOut(prog(t, a.t0 + 0.32, a.t0 + 0.86)), q = easeIn(prog(t, sai, sai + 0.24));
    if (p > q) {
      const yl = y2 + 28, meio = x0 + w2 / 2;
      const esq = lerp(meio, track(t, x0 + 6, [[TB(46), x0 + wA + 4, 3.4]]), p);
      const dir = lerp(meio, track(t, x0 + w2 - 12, [[TB(46), x0 + wA + wR - 10, 2.8]]), p);
      a.pen(cor.OR, 10);
      a.path([[lerp(esq, dir, q), yl], [dir, yl]], 1);
    }
    ctx.restore();
  }

  // ================================================================ P12: o endereço (tela real do app)
  // Retângulos medidos no print (px do arquivo 1080x2000), de assets/09/medidas.json, chave "app-endereco".
  const MED = {
    copiar_cep: [738, 626, 1004, 754], copiar_numero: [738, 880, 1004, 1006],
    copiar_complemento: [736, 1134, 1002, 1260], copiar_nome: [738, 1408, 1004, 1534],
    lokal12: [197, 1152, 384, 1187],
    cartao_cep: [47, 550, 1033, 830], cartao_numero: [47, 848, 1033, 1036],
    cartao_complemento: [46, 1072, 1033, 1321], cartao_nome: [47, 1356, 1033, 1584],
  };
  const END = { cx: 960, cy: 540, w: 1400, h: 960, r: 48 };
  const S12 = 1.3;                        // ampliação do recorte: os valores (CEP, LOKAL12) ficam com 65 px de corpo
  const X0 = 27, X1 = 1053;               // recorte na largura dos cartões (+20 px de margem branca do próprio print)
  const Y0 = 330, Y1 = 1600;              // do título "Seu endereço para compras" ao fim do cartão "Nome"
  const PADX = (END.w - (X1 - X0) * S12) / 2;
  const YA = 330, YB = 940;               // topo da janela no arquivo: título + CEP + Número / Complemento + Nome
  const rolagem = (t) => track(t, YA, [[TB(52), YB, 2.2]]);
  const ex = (fx) => -END.w / 2 + PADX + (fx - X0) * S12;      // x no conteúdo (origem no centro do contêiner)
  const ey = (fy, yv) => -END.h / 2 + (fy - yv) * S12;          // y no conteúdo, com a rolagem yv
  /** A ponta do cursor no quarto inferior direito do botão Copiar, em px da cena (contêiner assentado). */
  const ponta = (r, yv) => [END.cx + ex(r[0] + 0.74 * (r[2] - r[0])), END.cy + ey(r[1] + 0.72 * (r[3] - r[1]), yv)];
  const TOQUES = [[49, MED.copiar_cep], [51, MED.copiar_numero], [53, MED.copiar_complemento], [55, MED.copiar_nome]];
  const CARTOES = [MED.cartao_cep, MED.cartao_numero, MED.cartao_complemento, MED.cartao_nome];
  const IMP = (() => { let m = 0; for (let i = 1; i < 600; i++) m = Math.max(m, impulse(i / 1000, 3.2)); return m; })();
  // o anel: borda da frente (embaixo, desce primeiro) e de trás (em cima) em molas diferentes, como o indicador que estica
  const anelTopo = (t) => track(t, CARTOES[0][1], TOQUES.slice(1).map(([n], i) => [TB(n), CARTOES[i + 1][1], 3.2]));
  const anelBase = (t) => track(t, CARTOES[0][3], TOQUES.slice(1).map(([n], i) => [TB(n), CARTOES[i + 1][3], 4.6]));

  function endereco(ctx, t, a) {
    const yv = rolagem(t);
    // a tela real entra por máscara que abre de cima para baixo, deslizando 60 px para cima
    const e = easeOut(prog(t, a.t0, a.t0 + 0.55));
    ctx.save();
    ctx.beginPath(); ctx.rect(-END.w / 2 - 40, -END.h / 2 - 40, END.w + 80, (END.h + 80) * e); ctx.clip();
    ctx.translate(0, 60 * (1 - e));
    a.img('endereco', ex(X0), ey(Y0, yv), (X1 - X0) * S12, [X0, Y0, X1 - X0, Y1 - Y0]);
    // o toque: o botão real afunda e volta (mesma imagem, só a escala muda; nada de "Copiado")
    for (const [n, r] of TOQUES) {
      const k = impulse(t - TB(n), 3.2) / IMP;
      if (k < 0.003) continue;
      const s = 1 - 0.075 * k, w = (r[2] - r[0]) * S12, h = (r[3] - r[1]) * S12;
      const cx = ex((r[0] + r[2]) / 2), cy = ey((r[1] + r[3]) / 2, yv);
      a.fill(cx - w / 2 - 5, cy - h / 2 - 5, w + 10, h + 10, 0, cor.WHITE);
      ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
      a.img('endereco', -w / 2 - 3 * S12, -h / 2 - 3 * S12, w + 6 * S12, [r[0] - 3, r[1] - 3, r[2] - r[0] + 6, r[3] - r[1] + 6]);
      ctx.restore();
    }
    // o anel laranja: se desenha no primeiro toque e pula de cartão em cartão a cada toque
    const p = easeOut(prog(t, TB(49), TB(49) + 0.42));
    if (p > 0) {
      const m = 14, top = anelTopo(t) - m, base = anelBase(t) + m;
      const x = ex(47 - m), y = ey(top, yv), w = ex(1033 + m) - x, h = ey(base, yv) - y;
      a.pen(cor.OR, 7);
      a.path(rrPts(x, y, w, h, Math.min(56, h / 2)), p, true);
    }
    ctx.restore();
  }

  // ================================================================ P13: o mapa desenhado
  const MAPA = { cx: 1120, cy: 480, w: 1400, h: 760, r: 40 };
  // ruas: o branco entre as quadras (ROAD). [eixo, largura]; a avenida do meio é mais larga porque a rota passa nela
  const RUAS_V = [[-400, 34], [-90, 28], [230, 34], [470, 28]];
  const RUAS_H = [[-200, 28], [60, 50], [270, 30]];
  const QUADRAS = (() => {
    const xs = [[-760, 0], ...RUAS_V, [760, 0]], ys = [[-460, 0], ...RUAS_H, [460, 0]], out = [];
    for (let j = 0; j < ys.length - 1; j++) for (let i = 0; i < xs.length - 1; i++) {
      const x0 = xs[i][0] + xs[i][1] / 2, x1 = xs[i + 1][0] - xs[i + 1][1] / 2;
      const y0 = ys[j][0] + ys[j][1] / 2, y1 = ys[j + 1][0] - ys[j + 1][1] / 2;
      out.push([x0, y0, x1 - x0, y1 - y0]);
    }
    return out;
  })();
  const K = 1.35;                                    // escala dos ícones de traço (legíveis a 360 px)
  const LOJA = [-540, -75], CASA = [350, 172], PIN = [60, 50];
  const ROTA_CASA = [[-462, -75], [-400, -75], [-400, 60], [350, 60], [350, 90]];
  const ROTA_PIN = [[-462, -75], [-400, -75], [-400, 60], [PIN[0], 60]];
  const LEN = (pts) => pts.slice(1).reduce((s, q, i) => s + Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]), 0);
  const SAI = 44 / LEN(ROTA_PIN), CHEGA = (LEN(ROTA_PIN) - 96) / LEN(ROTA_PIN);   // a caixa sai da porta e para ao lado do pin

  function sacola(a, x, y, p, c) {
    a.pen(c, tam.TRACO);
    a.path(rrPts(x - 46 * K, y - 26 * K, 92 * K, 80 * K, 12 * K), p, true);
    a.path(arcPts(x, y - 26 * K, 24 * K, Math.PI, 2 * Math.PI, 16), p);
  }
  function casa(a, x, y, p, c) {
    const k = 1.3;
    a.pen(c, tam.TRACO);
    a.path([[x - 58 * k, y - 4 * k], [x, y - 58 * k], [x + 58 * k, y - 4 * k]], p);
    a.path([[x - 44 * k, y - 16 * k], [x - 44 * k, y + 52 * k], [x + 44 * k, y + 52 * k], [x + 44 * k, y - 16 * k]], p);
    a.path([[x - 13 * k, y + 52 * k], [x - 13 * k, y + 18 * k], [x + 13 * k, y + 18 * k], [x + 13 * k, y + 52 * k]], p);
  }
  function caixa(a, x, y, s, p, c) {
    a.fill(x - 30 * s, y - 26 * s, 60 * s, 52 * s, 6 * s, cor.WHITE);   // tampa a rota por baixo (branco = a rua)
    a.pen(c, tam.TRACO);
    a.path(rrPts(x - 30 * s, y - 26 * s, 60 * s, 52 * s, 6 * s), p, true);
    a.path([[x - 30 * s, y - 10 * s], [x + 30 * s, y - 10 * s]], p);
    a.path([[x, y - 26 * s], [x, y - 10 * s]], p);
  }

  function mapa(ctx, t, a) {
    const t0 = a.t0;
    // as quadras entram por máscara (uma cortina da esquerda para a direita), sem fade
    const e = easeInOut(prog(t, t0, t0 + 0.36));
    ctx.save();
    ctx.beginPath(); ctx.rect(-MAPA.w / 2 - 20, -MAPA.h / 2 - 20, (MAPA.w + 40) * e, MAPA.h + 40); ctx.clip();
    for (const [x, y, w, h] of QUADRAS) a.fill(x, y, w, h, 14, cor.ROAD);
    ctx.restore();
    // profundidade: ícones, rotas e pin (primeiro plano) chegam um pouco mais perto na respiração que as quadras (fundo)
    const pz = 1 + 0.6 * (F.camera(t).z - 1);
    ctx.save(); ctx.scale(pz, pz);
    // a loja e a casa se desenham; a casa esmaece para MUTED no b59
    sacola(a, LOJA[0], LOJA[1], a.entra(t, t0 + 0.1, 0, 0.4), cor.INK);
    const kc = easeOut(prog(t, TB(59), TB(59) + 0.4));
    casa(a, CASA[0], CASA[1], a.entra(t, t0 + 0.1, 2, 0.4), mixHex(cor.INK, cor.MUTED, kc));
    ctx.save(); ctx.setLineDash([20, 16]);
    // a rota de sempre (até a casa), em tinta 2: se desenha com o mapa e no b59 recolhe de volta para a loja
    const pc = easeInOut(prog(t, t0 + 0.04, t0 + 0.4)) * (1 - easeInOut(prog(t, TB(59), TB(59) + 0.4)));
    a.pen(cor.INK2, 6); a.path(ROTA_CASA, pc);
    // a rota nova: laranja, da loja até o pin, depois que ele assenta
    const pr = easeInOut(prog(t, TB(60) + 0.1, TB(61) - 0.04));
    a.pen(cor.OR, 8); a.path(ROTA_PIN, pr);
    ctx.restore();
    // a caixa se desenha na porta da loja e percorre a rota laranja até a agência (b62 -> b63)
    const pb = lerp(SAI, CHEGA, easeInOut(prog(t, TB(62), TB(63))));
    if (t >= TB(62)) {
      const [bx, by] = along(ROTA_PIN, pb);
      caixa(a, bx, by, 1.15, easeOut(prog(t, TB(62), TB(62) + 0.25)), cor.INK);
    }
    // o pin da agência cai (aceleração da gravidade: u²) pela borda de cima e assenta no b60, junto com o pop;
    // 0,42 s de queda: a velocidade final (~45 px por quadro) vira desfoque, não cópias soltas
    const tq = TB(60), u = prog(t, tq - 0.42, tq), f = u * u;
    if (t > tq - 0.42) {
      const y = lerp(-MAPA.h / 2 - 160, PIN[1], f);
      const sb = Math.min(1, Math.max(0, (f - 0.35) / 0.65));   // a sombra no chão só cresce quando o pin chega perto
      if (sb > 0) { ctx.beginPath(); ctx.ellipse(PIN[0], PIN[1], 36 * sb, 11 * sb, 0, 0, 2 * Math.PI); ctx.fillStyle = cor.LINE; ctx.fill(); }
      a.pin(PIN[0], y, 2.5, cor.OR);
    }
    ctx.restore();
  }

  // ================================================================ registro
  if (F.favores) F.favores.assumido = true;   // o P10 para seco na 44; quem desfaz a pilha é a virada
  F.registra({
    nome: 'Capítulo 3: a virada e o endereço',
    planos: [
      { id: 'P11', de: 44, ate: 48, chave: [44.6, 45.5, 46.6, 47.6] },
      { id: 'P12', de: 48, ate: 58, chave: [48.8, 49.6, 51.6, 53.8, 55.6, 57.2] },
      { id: 'P13', de: 58, ate: 64, chave: [58.9, 59.5, 60.5, 62.6, 63.6] },
    ],
    estados: { c3_virada: VIRADA, c3_endereco: END, c3_mapa: MAPA },
    morphs: [[44, 'c3_virada', 1.4], [48, 'c3_endereco'], [58, 'c3_mapa']],
    conteudo: [
      // a virada desfaz em camadas a pilha de pedidos do capítulo 2 (F.favores): a bolha de cima sai primeiro, cada
      // uma subindo dentro da própria máscara, enquanto o contêiner limpa e encolhe (lista de planos, P11)
      { de: 44, ate: 46, atraso: 0, saida: false, desenha(ctx, t, a) {
        if (!F.favores) return;
        ctx.translate(-a.c.cx, -a.c.cy);
        F.favores.desenha(ctx, a, (i, n) => prog(t, TB(44) + (n - 1 - i) * 0.014, TB(44) + (n - 1 - i) * 0.014 + 0.2));
      } },
      { de: 44, ate: 48, desenha: virada },
      { de: 48, ate: 58, desenha: endereco },
      { de: 58, ate: 64, desenha: mapa },
    ],
    legendas: [
      { de: 53, ate: 58, linhas: ['No complemento, só o seu ID.'], estilo: 'pilula' },
      { de: 61, ate: 64, linhas: ['A agência parceira recebe.'], estilo: 'pilula' },
    ],
    cursor: {
      moves: [
        [44, FORA, 2.2],                                 // na virada o cursor do capítulo 2 sai junto com a faixa de baixo
        [48, ponta(MED.copiar_cep, YA), 2.4],
        [50, ponta(MED.copiar_numero, YA), 2.4],
        [52, ponta(MED.copiar_complemento, YB), 2.2],   // junto com a rolagem
        [54, ponta(MED.copiar_nome, YB), 2.4],
        [56, FORA, 2.0],
      ],
      cliques: [49, 51, 53, 55],
    },
    camera: [
      [44, { z: 1, x: 960, y: 540 }, 1.2],               // a câmera estabiliza na virada
      [45, { z: 1.035, x: 960, y: 540 }, 0.3],           // respiração na frase
      [48, { z: 1, x: 960, y: 540 }, 1.0],
      [50, { z: 1.03, x: 960, y: 560 }, 0.35],
      [53, { z: 1.35, x: 960, y: 560 }, 0.9],            // aproxima até o LOKAL12 (terço de cima; "Ana Souza" acima da pílula)
      [54, { z: 1.35, x: 960, y: 670 }, 0.9],            // acompanha o cursor até o Nome (o cartão inteiro acima da pílula)
      [56, { z: 1, x: 960, y: 540 }, 0.9],
      [59, { z: 1.045, x: 1040, y: 520 }, 0.3],          // respiração puxando um pouco para o pin
      [62, { z: 1, x: 960, y: 540 }, 0.8],               // volta a 1,0 antes do b64 (o capítulo 4 começa assentado)
    ],
    deixas: [{ beat: 60, tipo: 'pop', pan: 0.2, rotulo: 'o pin acende' }],
    ativos: { endereco: '../../assets/09/app/app-endereco.jpg' },
  });
})();
