/**
 * sfx.mjs - sintetiza os sons de interface de um filme a partir de um cues.json (regras em CLAUDE.md).
 *
 * Uso: node scripts/sfx.mjs filmes/x/cues.json filmes/x/audio/sfx.wav
 *
 * cues.json (o filme grava com: node render.mjs filme.html --cues cues.json):
 *   { "duracao": 22, "cues": [ { "t": 1.011, "tipo": "click", "ganho": 1, "pan": 0.3, "panFim": 0.5 }, ... ] }
 *
 * Tipos:
 *   click   o clique do cursor: estalo curto e seco, agudo
 *   pop     algo aparece (pin, aviso, botão): bolha com o tom subindo
 *   thump   o logo: grave que cai de tom, com um ataque leve por cima
 *   whoosh  um contêiner se transforma: ar filtrado que abre e fecha, andando de pan a panFim
 *   buzz    o celular vibrando (dois pulsos graves)
 *   shutter uma foto: dois estalos curtos de cortina
 *
 * Tudo em código, sem amostras. Ruído só com semente (mulberry32). Saída: WAV estéreo float 32, 48 kHz,
 * com a duração do filme, para somar com a trilha (render.mjs --audio music.wav --audio sfx.wav).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SR = 48000;
const [src, dst] = process.argv.slice(2);
if (!src || !dst) {
  console.log('Uso: node scripts/sfx.mjs cues.json sfx.wav');
  process.exit(1);
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Biquad (RBJ), com a frequência podendo mudar a cada amostra. */
class Biquad {
  constructor(type) { this.type = type; this.x1 = this.x2 = this.y1 = this.y2 = 0; }
  set(f, q) {
    const w = (2 * Math.PI * Math.min(f, SR * 0.45)) / SR, cos = Math.cos(w), alpha = Math.sin(w) / (2 * q);
    let b0, b1, b2;
    if (this.type === 'lowpass') { b0 = (1 - cos) / 2; b1 = 1 - cos; b2 = b0; }
    else if (this.type === 'highpass') { b0 = (1 + cos) / 2; b1 = -(1 + cos); b2 = b0; }
    else { b0 = alpha; b1 = 0; b2 = -alpha; }              // bandpass, ganho de pico 1
    const a0 = 1 + alpha;
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0; this.a1 = (-2 * cos) / a0; this.a2 = (1 - alpha) / a0;
    return this;
  }
  run(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y;
    return y;
  }
}

const exp = (t, tau) => Math.exp(-t / tau);
/** Cada som devolve uma Float32Array mono; `rnd` é o ruído com semente daquela deixa. */
const SONS = {
  click(rnd) {
    const n = Math.round(0.05 * SR), out = new Float32Array(n), bp = new Biquad('bandpass').set(4200, 2.5);
    for (let i = 0; i < n; i++) {
      const t = i / SR, a = Math.min(1, t / 0.0004);
      out[i] = a * (0.55 * bp.run(rnd() * 2 - 1) * exp(t, 0.004)
        + 0.32 * Math.sin(2 * Math.PI * 2900 * t) * exp(t, 0.006)
        + 0.12 * Math.sin(2 * Math.PI * 1150 * t) * exp(t, 0.011));
    }
    return out;
  },
  pop(rnd) {
    const n = Math.round(0.16 * SR), out = new Float32Array(n);
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const t = i / SR, f = 420 + 700 * (1 - exp(t, 0.012)), a = Math.min(1, t / 0.0015) * exp(t, 0.035);
      ph += (2 * Math.PI * f) / SR;
      out[i] = a * (0.5 * Math.sin(ph) + 0.08 * Math.sin(2 * ph)) + 0.03 * (rnd() * 2 - 1) * exp(t, 0.002);
    }
    return out;
  },
  thump(rnd) {
    const n = Math.round(0.7 * SR), out = new Float32Array(n), lp = new Biquad('lowpass').set(900, 0.7);
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const t = i / SR, f = 44 + 76 * exp(t, 0.045), a = Math.min(1, t / 0.002) * exp(t, 0.16);
      ph += (2 * Math.PI * f) / SR;
      const x = 0.95 * a * Math.sin(ph) + 0.25 * lp.run(rnd() * 2 - 1) * exp(t, 0.006);
      out[i] = Math.tanh(1.4 * x) / Math.tanh(1.4);
    }
    return out;
  },
  whoosh(rnd) {
    const d = 0.42, n = Math.round(d * SR), out = new Float32Array(n);
    const bp = new Biquad('bandpass'), air = new Biquad('highpass').set(5200, 0.7);
    for (let i = 0; i < n; i++) {
      const u = i / n, f = 380 * (3200 / 380) ** Math.sin((Math.PI / 2) * Math.min(1, u / 0.55)) * (u > 0.55 ? 1 - 0.35 * (u - 0.55) / 0.45 : 1);
      if (i % 16 === 0) bp.set(f, 0.9);
      const a = u < 0.4 ? (u / 0.4) ** 2 : ((1 - u) / 0.6) ** 1.5, w = rnd() * 2 - 1;
      out[i] = a * (0.5 * bp.run(w) + 0.06 * air.run(w));
    }
    return out;
  },
  /** O celular vibrando: dois pulsos de um zumbido grave, com um leve chiado de mesa. */
  buzz(rnd) {
    const n = Math.round(0.42 * SR), out = new Float32Array(n), bp = new Biquad('bandpass').set(900, 1.5);
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const t = i / SR, pulso = (t < 0.15 ? 1 : t > 0.22 && t < 0.37 ? 0.85 : 0);
      const a = pulso * Math.min(1, (t % 0.22) / 0.01);
      ph += (2 * Math.PI * (148 + 6 * Math.sin(2 * Math.PI * 31 * t))) / SR;
      out[i] = a * (0.55 * Math.sign(Math.sin(ph)) * 0.5 + 0.35 * Math.sin(ph) + 0.08 * bp.run(rnd() * 2 - 1));
    }
    const lp = new Biquad('lowpass').set(1400, 0.7);
    for (let i = 0; i < n; i++) out[i] = lp.run(out[i]);
    return out;
  },
  /** A foto no balcão: o estalo da cortina e o segundo estalo, curto e mecânico. */
  shutter(rnd) {
    const n = Math.round(0.16 * SR), out = new Float32Array(n);
    const bp1 = new Biquad('bandpass').set(3200, 2), bp2 = new Biquad('bandpass').set(1800, 1.5);
    for (let i = 0; i < n; i++) {
      const t = i / SR, w = rnd() * 2 - 1, t2 = t - 0.062;
      out[i] = 0.7 * bp1.run(w) * exp(t, 0.005)
        + (t2 > 0 ? 0.5 * bp2.run(w) * exp(t2, 0.007) + 0.12 * Math.sin(2 * Math.PI * 520 * t2) * exp(t2, 0.02) : 0);
    }
    return out;
  },
};
const NIVEL = { click: 0.5, pop: 0.55, thump: 0.75, whoosh: 0.42, buzz: 0.4, shutter: 0.55 };   // equilíbrio contra a trilha em -14 LUFS

const { duracao, cues } = JSON.parse(await readFile(src, 'utf8'));
const L = new Float32Array(Math.ceil(duracao * SR)), R = new Float32Array(L.length);
const contagem = {};
cues.forEach((c, k) => {
  const fn = SONS[c.tipo];
  if (!fn) throw new Error(`tipo de som desconhecido: "${c.tipo}" (use ${Object.keys(SONS).join(', ')})`);
  const mono = fn(mulberry32(0x5f3 + k * 7919)), g = NIVEL[c.tipo] * (c.ganho ?? 1);
  const p0 = c.pan ?? 0, p1 = c.panFim ?? p0, start = Math.round(c.t * SR);
  for (let i = 0; i < mono.length && start + i < L.length; i++) {
    if (start + i < 0) continue;
    // pan de potência constante, com o centro em ganho 1
    const p = p0 + (p1 - p0) * (i / mono.length), a = ((p + 1) * Math.PI) / 4;
    L[start + i] += g * mono[i] * Math.cos(a) * Math.SQRT2;
    R[start + i] += g * mono[i] * Math.sin(a) * Math.SQRT2;
  }
  contagem[c.tipo] = (contagem[c.tipo] ?? 0) + 1;
});

// WAV float 32, estéreo intercalado
const data = Buffer.alloc(L.length * 8);
let pico = 0;
for (let i = 0; i < L.length; i++) {
  data.writeFloatLE(L[i], i * 8); data.writeFloatLE(R[i], i * 8 + 4);
  pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
}
const h = Buffer.alloc(44);
h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
h.writeUInt32LE(16, 16); h.writeUInt16LE(3, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24);
h.writeUInt32LE(SR * 8, 28); h.writeUInt16LE(8, 32); h.writeUInt16LE(32, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
await mkdir(path.dirname(path.resolve(dst)), { recursive: true });
await writeFile(dst, Buffer.concat([h, data]));
console.log(`${cues.length} deixas (${Object.entries(contagem).map(([k, v]) => `${v} ${k}`).join(', ')}), `
  + `${duracao} s, pico ${(20 * Math.log10(pico || 1e-9)).toFixed(1)} dBFS → ${dst}`);
