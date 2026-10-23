/**
 * Trilha original do 09-diretor: 120 BPM, 45 s (90 batidas), sintetizada em código (OfflineAudioContext).
 * Escrita na grade teórica (batida n = n x 0,5 s); o filme e as deixas seguem a grade MEDIDA dela (beats.py).
 * Só música: os efeitos de interface vêm do scripts/sfx.mjs. Sem pad de fundo.
 *
 * Arco (docs/guia-de-estilo.md, seção 8):
 *   gancho e ato 1 (b0-23)   lá menor: o "ding-dong" do interfone, relógio, grave e o ostinato da correria
 *   ato 2 (b24-43)           os favores: pergunta que sobe, resposta que desce; o compasso 10 pesa e corta
 *   ato 3 (b44-63)           a virada em dó maior: groove leve, marimba; um brilho em cada "Copiar"
 *   ato 4 (b64-79)           o "ding-dong" volta subindo: chegou
 *   fim (b80-89)             acorde quente; os dois últimos tempos (mi) puxam o lá menor do começo: loop
 */
(function () {
  'use strict';
  const BPM = 120, BEAT = 60 / BPM, E8 = BEAT / 2, S16 = BEAT / 4, DUR = 45;
  const NOTE = (n) => 440 * 2 ** ((n - 69) / 12);
  const T = (n) => n * BEAT;

  window.renderAudio = async (sr) => {
    const ac = new OfflineAudioContext(2, Math.ceil(DUR * sr), sr);
    const rnd = window.Motion.mulberry32(0x909);
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
    /** Pluck curto (quadrada filtrada que fecha rápido): o ostinato da correria e as mensagens. */
    const pluck = (t, n, v = 0.04, d = 0.16, pan = 0) => {
      const o = osc('square', NOTE(n), t, d + 0.05), lp = filt('lowpass', 3000, 3);
      lp.frequency.setValueAtTime(3400, t); lp.frequency.exponentialRampToValueAtTime(420, t + d);
      const g = env(t, 0.002, d, v); o.connect(lp).connect(g); send(g, pan, 0.18);
    };
    /** Carrilhão de interfone: parciais de sino, ataque curto, cauda longa. */
    const bell = (t, n, v = 0.12, d = 1.4, pan = 0) => {
      const f = NOTE(n);
      [[1, 1, d], [2, 0.32, d * 0.6], [3.01, 0.16, d * 0.35], [4.16, 0.07, d * 0.2]].forEach(([m, a, dd]) => {
        const o = osc('sine', f * m, t, dd + 0.05), g = env(t, 0.002, dd, v * a); o.connect(g); send(g, pan, 0.22);
      });
    };
    const ARP = [0, 1, 2, 1, 0, 2, 1, 2];

    // gancho (b0-3): o interfone toca sozinho; relógio e grave em lá
    bell(T(0), 76, 0.16); bell(T(1), 72, 0.15);
    for (let n = 0; n < 4; n++) tick(T(n), n ? 0.035 : 0.05);
    kick(T(0), 0.7); sub(T(0), 33, 3.9, 0.24); marimba(T(0), 57, 0.06, 1.2); rim(T(2), 0.06);

    // ato 1 (b4-23): a correria. Groove em lá menor, ostinato em colcheias, um acorde por compasso
    const ATO1 = [[33, [69, 72, 76]], [29, [69, 72, 77]], [36, [67, 72, 76]], [31, [67, 71, 74]], [28, [68, 71, 76]]];
    ATO1.forEach(([root, tones], k) => {
      const b0 = 4 + k * 4, ultimo = k === 4;
      kick(T(b0), 0.72); if (!ultimo) { kick(T(b0 + 2), 0.55); kick(T(b0 + 3.5), 0.4); }
      rim(T(b0 + 1), 0.07); rim(T(b0 + 3), 0.07);
      for (let n = 0; n < 4; n++) tick(T(b0 + n), 0.028);
      for (let s = 0; s < (ultimo ? 8 : 16); s++) shaker(T(b0) + s * S16, s % 2 ? 0.012 : 0.022);
      sub(T(b0), root, 1.4, 0.24); sub(T(b0 + 2), root + (ultimo ? -2 : 12), 1.6, 0.18);
      for (let i = 0; i < (ultimo ? 4 : 8); i++) pluck(T(b0) + i * E8, tones[ARP[i]], i % 2 ? 0.028 : 0.038, 0.15, i % 2 ? 0.3 : -0.3);
    });

    // ato 2 (b24-43): os favores
    bell(T(24), 76, 0.12); bell(T(25), 72, 0.11);                       // o interfone, de novo sem resposta
    kick(T(24), 0.65); sub(T(24), 33, 3.6, 0.24);
    for (let n = 24; n < 40; n++) tick(T(n), 0.026);
    const ATO2 = [[29, 28], [38, 32], [33, 36]];                         // [grave, compasso] do vizinho, do amigo e da mãe
    ATO2.forEach(([root, b0]) => { kick(T(b0), 0.62); kick(T(b0 + 2), 0.48); rim(T(b0 + 1), 0.06); rim(T(b0 + 3), 0.06); sub(T(b0), root, 3.6, 0.22); });
    const pergunta = (n) => [69, 72, 76].forEach((m, i) => pluck(T(n) + i * S16, m, 0.04, 0.14, 0.25));
    const resposta = (n, base) => [base + 7, base + 3, base].forEach((m, i) => pluck(T(n) + i * S16, m, 0.036, 0.16, -0.25));
    pergunta(29); resposta(30, 69);                                      // vizinho: "Tô viajando, desculpa."
    pergunta(33); [76, 76].forEach((m, i) => pluck(T(34) + i * E8, m, 0.022, 0.1)); // amigo: só os pontinhos; b35 vazio
    pergunta(37); resposta(38, 64);                                      // a mãe, mais grave: do outro lado da cidade
    // compasso 10 (b40-43): pesado demais. Tudo adensa e para na última semicolcheia
    for (let n = 40; n < 44; n++) { kick(T(n), 0.5 + (n - 40) * 0.08); tick(T(n), 0.03); }
    sub(T(40), 28, 3.7, 0.28);
    for (let s = 0; s < 15; s++) {
      pluck(T(40) + s * S16, [64, 67, 69, 71, 72][s % 5] + Math.floor(s / 4) * 2, 0.02 + s * 0.0022, 0.1, s % 2 ? 0.35 : -0.35);
      if (s >= 12) rim(T(40) + s * S16, 0.04 + (s - 12) * 0.03);
    }

    // ato 3 (b44-63): a virada, em dó maior
    kick(T(44), 0.95); sub(T(44), 24, 3.6, 0.3);
    [60, 64, 67, 72].forEach((m, i) => marimba(T(44) + i * 0.04, m, 0.09, 1.3));
    bell(T(44), 84, 0.05, 2);
    const DEPOIS = [[36, [72, 76, 79]], [31, [71, 74, 79]], [33, [69, 72, 76]], [29, [69, 72, 77]], [36, [72, 76, 79]],   // b44-63
      [29, [69, 72, 77]], [36, [72, 76, 79]], [31, [71, 74, 79]], [36, [72, 76, 79]]];                                   // b64-79
    DEPOIS.forEach(([root, tones], k) => {
      const b0 = 44 + k * 4;
      if (k) kick(T(b0), 0.75);
      kick(T(b0 + 1.5), 0.42); kick(T(b0 + 2), 0.62);
      clap(T(b0 + 1)); clap(T(b0 + 3));
      for (let s = 0; s < 16; s++) shaker(T(b0) + s * S16, s % 2 ? 0.014 : 0.026);
      if (k) sub(T(b0), root, 1.4, 0.24);
      sub(T(b0 + 2), root + 7, 0.9, 0.18); sub(T(b0 + 3.5), root + 12, 0.4, 0.13);
      for (let i = 0; i < 8; i++) marimba(T(b0) + i * E8, tones[ARP[i]], i % 2 ? 0.036 : 0.05, 0.45, i % 2 ? 0.25 : -0.25, 0.2);
    });
    [[49, 79], [51, 81], [53, 84], [55, 88]].forEach(([n, m]) => marimba(T(n), m, 0.07, 0.7, 0, 0.25));   // cada "Copiar" sobe um degrau
    marimba(T(60), 84, 0.07, 0.9); marimba(T(60) + S16, 91, 0.04, 0.9);                                // o pin acende

    // ato 4 (b64-79): o "ding-dong" volta subindo: chegou
    bell(T(68), 72, 0.12, 1.2); bell(T(69), 76, 0.12, 1.4);
    marimba(T(73), 76, 0.06, 0.6); marimba(T(75), 79, 0.07, 0.8); marimba(T(75), 84, 0.05, 0.8); marimba(T(77), 88, 0.05, 1);

    // fim (b80-89): o acorde quente, a lista, o endereço e a anacruse do loop
    kick(T(80), 0.9); sub(T(80), 24, 3.6, 0.32);
    [60, 64, 67, 72, 76].forEach((m, i) => marimba(T(80) + i * 0.045, m, 0.085, 1.4));
    bell(T(80), 84, 0.06, 2.2);
    [72, 76, 79, 76].forEach((m, i) => marimba(T(81 + i * 0.75), m, 0.045, 0.7, i % 2 ? 0.2 : -0.2));
    for (let s = 0; s < 16; s++) shaker(T(84) + s * E8, 0.016);
    kick(T(84), 0.6); sub(T(84), 29, 1.9, 0.22); [65, 69, 72, 79].forEach((m, i) => marimba(T(84) + i * E8, m, 0.045, 0.8));
    kick(T(86), 0.6); sub(T(86), 36, 1.9, 0.22); [72, 76, 79].forEach((m, i) => marimba(T(86) + i * E8, m, 0.05, 0.9));
    // anacruse: mi maior puxa o lá menor do primeiro quadro (o "ding" do interfone)
    kick(T(88), 0.5); sub(T(88), 28, 0.9, 0.22); marimba(T(88), 68, 0.06, 0.45); marimba(T(88), 71, 0.05, 0.45);
    tick(T(88), 0.035); tick(T(89), 0.04); marimba(T(89), 76, 0.045, 0.35);
    return ac.startRendering();
  };
})();
