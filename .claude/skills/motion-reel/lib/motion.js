/**
 * lib/motion.js - molas, curvas e traços compartilhados pelos filmes (os mesmos dos filmes 07 e 08).
 *
 * Script clássico (o filme abre em file://, onde módulos ES não carregam): define window.Motion.
 * Tudo é função pura do tempo; nada guarda estado entre quadros. Ruído só com semente (mulberry32).
 *
 *   step(tau, f)              resposta de uma mola fechada (zeta 0,85) a um degrau 0 -> 1, f em Hz
 *   impulse(tau, f)           resposta a um impulso: sai do zero e volta ao zero (pulso, clique)
 *   track(t, v0, changes, f)  valor com vários alvos = soma de uma mola por mudança; changes = [[t0, alvo, f?], ...]
 *   easeOut / easeIn / easeInOut / confirm   curvas da marca (cubic-bezier do guia, seção 20)
 *   path(ctx, pts, p, closed) polilinha desenhada até a fração p do comprimento (ícones que "se desenham")
 *   arcPts / rrPts / along    pontos de arco, de retângulo arredondado e o ponto a uma fração de uma polilinha
 */
(function (root) {
  'use strict';
  const ZETA = 0.85;
  const SETTLED = 1e-5;   // abaixo deste envelope a mola vale o alvo exato (o resto seria < 0,02 px)

  function step(tau, f = 2) {
    if (tau <= 0) return 0;
    const w = 2 * Math.PI * f, wd = w * Math.sqrt(1 - ZETA * ZETA), e = Math.exp(-ZETA * w * tau);
    if (e < SETTLED) return 1;
    return 1 - e * (Math.cos(wd * tau) + ((ZETA * w) / wd) * Math.sin(wd * tau));
  }
  function impulse(tau, f = 2.4) {
    if (tau <= 0) return 0;
    const w = 2 * Math.PI * f, wd = w * Math.sqrt(1 - ZETA * ZETA), e = Math.exp(-ZETA * w * tau);
    return e < SETTLED ? 0 : e * Math.sin(wd * tau);
  }
  function track(t, v0, changes, f = 2) {
    let v = v0, prev = v0;
    for (const [t0, alvo, fi] of changes) { v += (alvo - prev) * step(t - t0, fi || f); prev = alvo; }
    return v;
  }
  const clamp = (x, a = 0, z = 1) => Math.min(z, Math.max(a, x));
  const prog = (t, a, z) => (z === a ? (t >= a ? 1 : 0) : clamp((t - a) / (z - a)));
  const lerp = (a, z, k) => a + (z - a) * k;

  function cubicBezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const X = (u) => ((ax * u + bx) * u + cx) * u, Y = (u) => ((ay * u + by) * u + cy) * u, dX = (u) => (3 * ax * u + 2 * bx) * u + cx;
    return (x) => {
      if (!(x > 0)) return 0;
      if (x >= 1) return 1;
      let lo = 0, hi = 1, u = x;
      for (let i = 0; i < 24; i++) {
        const v = X(u) - x;
        if (Math.abs(v) < 1e-6) break;
        if (v > 0) hi = u; else lo = u;
        const d = dX(u);
        u = d > 1e-6 ? u - v / d : (lo + hi) / 2;
        if (u < lo || u > hi) u = (lo + hi) / 2;
      }
      return Y(u);
    };
  }
  const easeOut = cubicBezier(0.22, 1, 0.36, 1);     // entrada (guia: 500 a 600 ms)
  const easeIn = cubicBezier(0.55, 0, 0.75, 0.2);    // saída curta
  const easeInOut = cubicBezier(0.65, 0, 0.35, 1);   // cortina e deslocamentos longos
  const confirm = cubicBezier(0.34, 1.4, 0.64, 1);   // só o que dá certo: check, QR, "chegou"

  function hex(c) { return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)); }
  function mixHex(a, z, k) {
    const x = hex(a), y = hex(z);
    return `rgb(${x.map((v, i) => Math.round(lerp(v, y[i], clamp(k)))).join(',')})`;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Polilinha desenhada até a fração p do comprimento (com p >= 1 e closed, fecha o caminho). */
  function path(ctx, pts, p = 1, closed = false) {
    if (!(p > 0) || pts.length < 2) return;
    const P = closed ? pts.concat([pts[0]]) : pts;
    let total = 0;
    const seg = [];
    for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(l); total += l; }
    let budget = total * Math.min(1, p);
    ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]);
    for (let i = 1; i < P.length; i++) {
      const l = seg[i - 1];
      if (budget >= l) { ctx.lineTo(P[i][0], P[i][1]); budget -= l; continue; }
      const k = l ? budget / l : 0;
      ctx.lineTo(lerp(P[i - 1][0], P[i][0], k), lerp(P[i - 1][1], P[i][1], k));
      break;
    }
    if (closed && p >= 1) ctx.closePath();
    ctx.stroke();
  }
  const arcPts = (cx, cy, r, a0, a1, n = 48) => Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  function rrPts(x, y, w, h, r) {
    const pts = [];
    const c = (cx, cy, a0) => arcPts(cx, cy, r, a0, a0 + Math.PI / 2, 8).forEach((q) => pts.push(q));
    c(x + w - r, y + r, -Math.PI / 2); c(x + w - r, y + h - r, 0); c(x + r, y + h - r, Math.PI / 2); c(x + r, y + r, Math.PI);
    return pts;
  }
  function along(pts, p) {
    let total = 0;
    const seg = [];
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); total += l; }
    let d = total * clamp(p);
    for (let i = 1; i < pts.length; i++) {
      if (d <= seg[i - 1]) { const k = seg[i - 1] ? d / seg[i - 1] : 0; return [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)]; }
      d -= seg[i - 1];
    }
    return pts[pts.length - 1];
  }

  const Motion = {
    ZETA, step, impulse, track, clamp, prog, lerp, cubicBezier, easeOut, easeIn, easeInOut, confirm,
    mixHex, mulberry32, path, arcPts, rrPts, along,
  };
  if (typeof module === 'object' && module.exports) module.exports = Motion;
  else root.Motion = Motion;
})(typeof window !== 'undefined' ? window : globalThis);
