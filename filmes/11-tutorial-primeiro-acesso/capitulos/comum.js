/**
 * comum.js - ajudantes de desenho compartilhados pelos quatro capítulos do filme 11 (F.u). Não registra capítulo:
 * os arquivos reais ficam em F.u.TELAS e o capítulo 1 os registra em `ativos`.
 *
 * Coordenadas: o conteúdo do contêiner desenha com a origem no centro do contêiner. F.u.cena(ctx, a) troca para o
 * espaço da cena (1080x1920), para o desenho ficar parado enquanto o contêiner se transforma em volta dele.
 * Telas reais: F.u.proj(...) projeta um ponto do print (1080x2000) na cena; nunca redesenhe a interface.
 */
(function () {
  'use strict';
  const { M, cor } = F;
  const { easeOut, easeIn, prog, clamp, rrPts, arcPts } = M;

  const TELAS = {
    endereco: '../../assets/telas/tela-app-seu-endereco-para-compras.jpg',
    lojas: '../../assets/telas/tela-app-endereco-lojas-e-agencia.jpg',
    detalhe: '../../assets/telas/tela-app-detalhe-da-encomenda.jpg',
    retirada: '../../assets/telas/tela-app-retirada-qr.jpg',
    logoSemPin: '../../assets/logo/logo-branco-sem-pin.png',
    logoPin: '../../assets/logo/logo-branco-so-pin.png',
  };

  /** Pulso de toque normalizado (0..1): o impulse(τ, 4) tem pico de ~0,21. */
  const pulso = (tau) => clamp(Math.max(0, M.impulse(tau, 4)) / 0.21);

  /** Desenha a polilinha pts só entre as frações p0 e p1 do comprimento (o anel que abre e depois recolhe). */
  function trecho(ctx, pts, p0, p1) {
    if (!(p1 > p0) || pts.length < 2) return;
    const seg = [];
    let total = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); total += l; }
    const a = total * p0, z = total * Math.min(1, p1);
    let d = 0, aberto = false;
    ctx.beginPath();
    for (let i = 1; i < pts.length; i++) {
      const l = seg[i - 1], [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      const ponto = (dd) => { const k = l ? (dd - d) / l : 0; return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k]; };
      if (d + l >= a && d <= z) {
        if (!aberto) { const [x, y] = ponto(Math.max(a, d)); ctx.moveTo(x, y); aberto = true; }
        const [x, y] = ponto(Math.min(z, d + l)); ctx.lineTo(x, y);
      }
      d += l;
      if (d > z) break;
    }
    ctx.stroke();
  }

  F.u = {
    TELAS,
    pulso,
    trecho,
    /** Passa a desenhar no espaço da cena (use dentro de ctx.save/restore, no desenha de um conteúdo). */
    cena(ctx, a) { ctx.translate(-a.c.cx, -a.c.cy); },
    /** Projeção de um print na cena: o ponto (px0, py0) do print cai em (cx, cy) da cena, com escala s. */
    proj(px0, py0, s, cx = 540, cy = 720) {
      const x = (px) => cx + (px - px0) * s, y = (py) => cy + (py - py0) * s;
      return { s, x, y, r: ([x0, y0, x1, y1]) => [x(x0), y(y0), (x1 - x0) * s, (y1 - y0) * s] };
    },
    /** O print inteiro projetado (o contêiner recorta). */
    tela(ctx, a, nome, P) { a.img(nome, P.x(0), P.y(0), 1080 * P.s); },
    /**
     * Anel laranja de contorno (6 px, sem brilho) em volta de um retângulo [x, y, w, h]: abre em 0,4 s a partir de
     * t0 e recolhe depois de `dura` segundos (com fica: true, não recolhe).
     */
    anel(ctx, t, t0, rect, r, { pad = 12, dura = 1.4, fica = false, largura = 6, tinta = cor.DESTAQUE } = {}) {
      const p1 = easeOut(prog(t, t0, t0 + 0.4));
      if (p1 <= 0) return;
      const p0 = fica ? 0 : easeIn(prog(t, t0 + dura, t0 + dura + 0.3));
      if (p0 >= 1) return;
      const [x, y, w, h] = rect, H = h + 2 * pad;
      const pts = rrPts(x - pad, y - pad, w + 2 * pad, H, Math.max(0, Math.min(r + pad, H / 2)));
      ctx.save(); ctx.strokeStyle = tinta; ctx.lineWidth = largura; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      trecho(ctx, pts.concat([pts[0]]), p0, p1);
      ctx.restore();
    },
    /** Anel circular (em volta de um check, de um ícone). */
    anelCirculo(ctx, t, t0, cx, cy, r, { dura = 1.4, fica = false, largura = 6, tinta = cor.DESTAQUE } = {}) {
      const p1 = easeOut(prog(t, t0, t0 + 0.4));
      if (p1 <= 0) return;
      const p0 = fica ? 0 : easeIn(prog(t, t0 + dura, t0 + dura + 0.3));
      if (p0 >= 1) return;
      ctx.save(); ctx.strokeStyle = tinta; ctx.lineWidth = largura; ctx.lineCap = 'round';
      trecho(ctx, arcPts(cx, cy, r, -Math.PI / 2, Math.PI * 1.5, 64), p0, p1);
      ctx.restore();
    },
    /** O botão real afunda 4% no toque: pinta o fundo do cartão e redesenha o mesmo recorte, menor. */
    afunda(ctx, a, t, tToque, nome, crop, x, y, w, fundo = cor.BRANCO) {
      const k = 1 - 0.04 * pulso(t - tToque);
      if (k > 0.9995) return;
      const h = (w * crop[3]) / crop[2];
      ctx.fillStyle = fundo; ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
      ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); a.img(nome, -w / 2, -h / 2, w, crop); ctx.restore();
    },
    /** Traço laranja que se desenha da esquerda para a direita (sublinhado) e recolhe a partir de t1. */
    traco(ctx, t, t0, x0, x1, y, { t1 = null, largura = 6, tinta = cor.DESTAQUE } = {}) {
      const p = easeOut(prog(t, t0, t0 + 0.45)), q = t1 == null ? 0 : easeIn(prog(t, t1, t1 + 0.24));
      if (p <= q) return;
      ctx.save(); ctx.strokeStyle = tinta; ctx.lineWidth = largura; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x0 + (x1 - x0) * q, y); ctx.lineTo(x0 + (x1 - x0) * p, y); ctx.stroke();
      ctx.restore();
    },
  };
})();
