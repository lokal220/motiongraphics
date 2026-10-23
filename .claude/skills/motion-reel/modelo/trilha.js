/**
 * trilha.js - a trilha original, sintetizada em código (OfflineAudioContext), na mesma linha do tempo da imagem.
 *
 * Escrita na grade TEÓRICA (batida n = n x 60/bpm); depois de exportada (render.mjs --som --out audio/music.wav)
 * ela é medida com scripts/beats.py, e a imagem e os efeitos seguem a grade MEDIDA (beats.js).
 * Só música: os efeitos de interface vêm do scripts/sfx.mjs. Mínima e limpa: sem pad de fundo genérico.
 *
 * Arranjo padrão (FILME.trilha): uma abertura curta (relógio, bumbo e um motivo de sino), depois groove leve
 * (bumbo, palma suave, shaker, grave, marimba em colcheias) na progressão por compasso, acentos nos momentos
 * grandes e um fim em anacruse (puxa o loop) ou em acorde. Troque o arranjo para cada filme: os instrumentos
 * ficam prontos logo abaixo.
 */
(function () {
  'use strict';
  const FL = window.FILME, CFG = FL.trilha || {};
  const BPM = FL.bpm, BEAT = 60 / BPM, E8 = BEAT / 2, S16 = BEAT / 4, BATIDAS = FL.batidas, DUR = BATIDAS * BEAT;
  const NOTE = (n) => 440 * 2 ** ((n - 69) / 12);
  const T = (n) => n * BEAT;

  window.renderAudio = async (sr) => {
    const ac = new OfflineAudioContext(2, Math.ceil(DUR * sr), sr);
    const rnd = window.Motion.mulberry32(0x5eed);
    const noise = ac.createBuffer(1, sr * 2, sr);
    { const d = noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = rnd() * 2 - 1; }
    const comp = new DynamicsCompressorNode(ac, { threshold: -16, knee: 6, ratio: 2.5, attack: 0.005, release: 0.15 });
    comp.connect(ac.destination);
    const bus = new GainNode(ac, { gain: 0.7 }); bus.connect(comp);
    const echo = new DelayNode(ac, { delayTime: E8 * 1.5, maxDelayTime: 1 });
    const fb = new GainNode(ac, { gain: 0.2 }), wet = new GainNode(ac, { gain: 0.16 });
    echo.connect(fb).connect(echo); echo.connect(wet).connect(bus);
    const send = (node, pan = 0, fx = 0) => {
      const p = new StereoPannerNode(ac, { pan }); node.connect(p).connect(bus);
      if (fx) p.connect(new GainNode(ac, { gain: fx })).connect(echo);
    };
    const env = (t, a, d, v) => {
      const g = new GainNode(ac, { gain: 0 });
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + a); g.gain.exponentialRampToValueAtTime(1e-4, t + a + d);
      return g;
    };
    const noiseAt = (t, d) => { const s = new AudioBufferSourceNode(ac, { buffer: noise }); s.start(t, (t * 0.37) % 1.5); s.stop(t + d); return s; };
    const osc = (type, f, t, d) => { const o = new OscillatorNode(ac, { type, frequency: f }); o.start(t); o.stop(t + d); return o; };
    const filt = (type, frequency, q = 1) => new BiquadFilterNode(ac, { type, frequency, Q: q });

    // ---------------------------------------------------------------- instrumentos
    const kick = (t, v = 0.8) => { const o = osc('sine', 140, t, 0.45); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(44, t + 0.11); const g = env(t, 0.002, 0.36, v); o.connect(g); send(g); };
    const tick = (t, v = 0.04) => { const g = env(t, 0.0008, 0.016, v); noiseAt(t, 0.03).connect(filt('bandpass', 3400, 5)).connect(g); send(g, 0.18); const o = osc('sine', 1900, t, 0.03), g2 = env(t, 0.0008, 0.012, v * 0.6); o.connect(g2); send(g2, 0.18); };
    const shaker = (t, v = 0.03) => { const g = env(t, 0.008, 0.035, v); noiseAt(t, 0.06).connect(filt('highpass', 7000)).connect(g); send(g, -0.2); };
    const rim = (t, v = 0.1) => { const g = env(t, 0.0008, 0.03, v); noiseAt(t, 0.04).connect(filt('bandpass', 1700, 3)).connect(g); send(g, -0.1, 0.1); const o = osc('triangle', 420, t, 0.04), g2 = env(t, 0.0008, 0.025, v * 0.7); o.connect(g2); send(g2, -0.1); };
    const clap = (t, v = 0.09) => {
      const g = new GainNode(ac, { gain: 0 });
      for (const o of [0, 0.011, 0.022]) { g.gain.setValueAtTime(v, t + o); g.gain.exponentialRampToValueAtTime(v * 0.25, t + o + 0.008); }
      g.gain.setValueAtTime(v * 0.7, t + 0.03); g.gain.exponentialRampToValueAtTime(1e-4, t + 0.18);
      noiseAt(t, 0.22).connect(filt('bandpass', 1500, 0.9)).connect(g); send(g, 0.1, 0.12);
    };
    const sub = (t, n, d, v = 0.26) => {
      const g = new GainNode(ac, { gain: 0 });
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + 0.012); g.gain.setTargetAtTime(v * 0.55, t + 0.05, 0.25); g.gain.setTargetAtTime(0, t + d - 0.08, 0.03);
      const o = osc('sine', NOTE(n), t, d + 0.3), o2 = osc('triangle', NOTE(n), t, d + 0.3);
      const lp = filt('lowpass', 320); o2.connect(lp).connect(g); o.connect(g); send(g);
    };
    const marimba = (t, n, v = 0.1, d = 0.6, pan = 0, fx = 0.15) => {
      const f = NOTE(n);
      [[1, 1, d], [4, 0.22, d * 0.22], [9.9, 0.06, 0.04]].forEach(([m, a, dd]) => {
        const o = osc('sine', f * m, t, dd + 0.05), g = env(t, 0.0015, dd, v * a); o.connect(g); send(g, pan, fx);
      });
    };
    const pluck = (t, n, v = 0.04, d = 0.16, pan = 0) => {
      const o = osc('square', NOTE(n), t, d + 0.05), lp = filt('lowpass', 3000, 3);
      lp.frequency.setValueAtTime(3400, t); lp.frequency.exponentialRampToValueAtTime(420, t + d);
      const g = env(t, 0.002, d, v); o.connect(lp).connect(g); send(g, pan, 0.18);
    };
    /** Sino (parciais de carrilhão): bom para motivo, interfone, "chegou". */
    const bell = (t, n, v = 0.12, d = 1.4, pan = 0) => {
      const f = NOTE(n);
      [[1, 1, d], [2, 0.32, d * 0.6], [3.01, 0.16, d * 0.35], [4.16, 0.07, d * 0.2]].forEach(([m, a, dd]) => {
        const o = osc('sine', f * m, t, dd + 0.05), g = env(t, 0.002, dd, v * a); o.connect(g); send(g, pan, 0.22);
      });
    };

    // ---------------------------------------------------------------- arranjo padrão (troque por filme)
    const PROG = CFG.progressao || [[48, [72, 76, 79]], [43, [71, 74, 79]], [45, [69, 72, 76]], [41, [69, 72, 77]]];
    const INTRO = CFG.intro ?? 1, ACENTOS = CFG.acentos || [], LOOP = (CFG.fim || 'anacruse') === 'anacruse';
    const COMPASSOS = Math.ceil(BATIDAS / 4), ARP = [0, 1, 2, 1, 0, 2, 1, 2];
    for (let bar = 0; bar < COMPASSOS; bar++) {
      const b0 = bar * 4, [root, tones] = PROG[bar % PROG.length], ultimo = bar === COMPASSOS - 1;
      if (bar < INTRO) {
        // abertura: relógio, bumbo no 1, o grave e o motivo (dois sinos)
        for (let n = 0; n < 4; n++) tick(T(b0 + n), n ? 0.035 : 0.05);
        kick(T(b0), 0.7); sub(T(b0), root - 12, 3.8, 0.24);
        if (bar === 0) { bell(T(b0), tones[1] + 12, 0.14); bell(T(b0 + 1), tones[0] + 12, 0.13); }
        continue;
      }
      kick(T(b0), 0.75); kick(T(b0 + 1.5), 0.42); kick(T(b0 + 2), 0.62);
      clap(T(b0 + 1)); clap(T(b0 + 3));
      const passos = ultimo && LOOP ? 8 : 16;
      for (let s = 0; s < passos; s++) shaker(T(b0) + s * S16, s % 2 ? 0.014 : 0.026);
      sub(T(b0), root - 12, 1.4, 0.24); sub(T(b0 + 2), root - 5, 0.9, 0.18);
      for (let i = 0; i < (ultimo && LOOP ? 4 : 8); i++) marimba(T(b0) + i * E8, tones[ARP[i]], i % 2 ? 0.036 : 0.05, 0.45, i % 2 ? 0.25 : -0.25, 0.2);
    }
    // momentos grandes: bumbo forte, acorde rolado e sino agudo
    for (const n of ACENTOS) {
      const [root, tones] = PROG[Math.floor(n / 4) % PROG.length];
      kick(T(n), 0.95); sub(T(n), root - 24, 3.4, 0.3);
      tones.concat([tones[0] + 12]).forEach((m, i) => marimba(T(n) + i * 0.045, m - 12, 0.085, 1.3));
      bell(T(n), tones[0] + 12, 0.06, 2);
    }
    // o fim: anacruse (dominante nos dois últimos tempos, puxa o primeiro acorde do loop) ou acorde que soa
    const nFim = BATIDAS - 2, [r0, t0] = PROG[0];
    if (LOOP) {
      kick(T(nFim), 0.5); sub(T(nFim), r0 - 5, 0.9, 0.22);
      marimba(T(nFim), t0[0] - 1, 0.06, 0.45); marimba(T(nFim), t0[1] - 1, 0.05, 0.45);
      tick(T(nFim), 0.035); tick(T(nFim + 1), 0.04); marimba(T(nFim + 1), t0[2], 0.045, 0.35);
    } else {
      kick(T(nFim), 0.7); sub(T(nFim), r0 - 12, 1, 0.26);
      t0.forEach((m, i) => marimba(T(nFim) + i * 0.04, m, 0.08, 1));
    }
    return ac.startRendering();
  };
})();
