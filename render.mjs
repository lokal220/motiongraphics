/**
 * render.mjs - renderiza um filme HTML quadro a quadro (regras em CLAUDE.md).
 *
 * Contrato da página:
 *   window.FILM = { width, height, fps = 30, duration, beats? }   px e segundos
 *   window.seek(t)           desenha o quadro do instante t (pode ser async). Função pura do tempo.
 *   window.renderAudio(sr)   opcional: trilha sintetizada em código; devolve um AudioBuffer
 *                            (ex.: de um OfflineAudioContext) ou [Float32Array, ...] por canal.
 *   window.__RENDER__        é true durante o render. Nesse modo requestAnimationFrame, setTimeout,
 *                            setInterval e Math.random são proibidos e o render para se forem usados.
 *
 * Uso:
 *   node render.mjs filmes/02-delivery/index.html                  MP4 em resultados/02-delivery.mp4
 *   node render.mjs filmes/02-delivery/index.html --sheet          folha de contato (1 quadro por batida)
 *   node render.mjs filmes/02-delivery/index.html --frames 0,2.5   PNGs desses instantes
 *   node render.mjs filmes/02-delivery/index.html --som            só a trilha, já em -14 LUFS (para medir as batidas)
 *
 * Opções:
 *   --out arquivo.mp4     destino do MP4
 *   --beats beats.json    grade de batidas (padrão: beats.json na pasta do filme, senão FILM.beats)
 *   --audio musica.mp3    usa essa música em vez de window.renderAudio
 *   --formato vertical    abre o filme com ?formato=vertical (a página monta FILM e a composição
 *                         para esse formato) e acrescenta "-vertical" ao nome da saída
 *   --param chave=valor   passa ?chave=valor para a página, sem mudar o nome (pode repetir);
 *                         ex.: --som --param trilha=musica para medir a grade só com a música
 *
 * Saída: H.264 yuv420p CRF 16, BT.709, áudio AAC normalizado em -14 LUFS (pico -1 dBTP).
 * Folhas de contato e quadros soltos vão para .render-tmp/<nome>/.
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import puppeteer from 'puppeteer';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CRF = 16;
const SAMPLE_RATE = 48000;
const LUFS = -14;
const TRUE_PEAK = -1;

const { values: opt, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: 'string' },
    sheet: { type: 'boolean' },
    frames: { type: 'string' },
    som: { type: 'boolean' },
    beats: { type: 'string' },
    audio: { type: 'string' },
    formato: { type: 'string' },
    param: { type: 'string', multiple: true },
    help: { type: 'boolean', short: 'h' },
  },
});

const rel = (p) => path.relative(process.cwd(), p) || '.';
const secs = (t) => `${t.toFixed(2).replace('.', ',')} s`;

// --- ffmpeg -------------------------------------------------------------------

let FFMPEG;

function findFfmpeg() {
  const candidates = [
    process.env.FFMPEG,
    'ffmpeg',
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Links', 'ffmpeg.exe'),
  ].filter(Boolean);
  for (const c of candidates) {
    if (spawnSync(c, ['-version'], { stdio: 'ignore' }).status === 0) return c;
  }
  throw new Error('ffmpeg não encontrado. Instale com "winget install Gyan.FFmpeg" ou defina FFMPEG=caminho\\ffmpeg.exe');
}

/** Roda o ffmpeg até o fim e devolve o stderr (onde ele escreve as medições). */
function ff(args) {
  return new Promise((resolve, reject) => {
    const p = spawn(FFMPEG, ['-hide_banner', '-y', ...args], { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('error', reject);
    p.on('close', (code) =>
      code === 0 ? resolve(err) : reject(new Error(`ffmpeg saiu com código ${code}\n${err.slice(-2000)}`)));
  });
}

// --- som ----------------------------------------------------------------------

function wavFloat32(bytes, channels, sampleRate) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + bytes.length, 4);
  h.write('WAVE', 8);
  h.write('fmt ', 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(3, 20); // IEEE float
  h.writeUInt16LE(channels, 22);
  h.writeUInt32LE(sampleRate, 24);
  h.writeUInt32LE(sampleRate * channels * 4, 28);
  h.writeUInt16LE(channels * 4, 32);
  h.writeUInt16LE(32, 34);
  h.write('data', 36);
  h.writeUInt32LE(bytes.length, 40);
  return Buffer.concat([h, bytes]);
}

async function measureLoudness(file, duration) {
  const err = await ff(['-t', String(duration), '-i', file,
    '-af', `loudnorm=I=${LUFS}:TP=${TRUE_PEAK}:LRA=11:print_format=json`, '-f', 'null', '-']);
  return JSON.parse(err.slice(err.lastIndexOf('{'), err.lastIndexOf('}') + 1));
}

/**
 * Leva a trilha a -14 LUFS: ganho + limitador de pico, medindo e corrigindo o ganho a cada passada.
 * (O loudnorm sozinho não chega lá em trilhas percussivas: o limite de pico segura o ganho.)
 */
async function normalizeLoudness(src, dst, duration) {
  const m = await measureLoudness(src, duration);
  const input = Number(m.input_i);
  const encode = (af) => ff(['-t', String(duration), '-i', src, '-af', af,
    '-ar', String(SAMPLE_RATE), '-ac', '2', '-c:a', 'pcm_s24le', dst]);
  if (!Number.isFinite(input) || input < -70) {
    console.warn('  ⚠ a trilha está em silêncio; nada para normalizar.');
    await encode('anull');
    return dst;
  }
  let gain = LUFS - input;
  let limit = 10 ** ((TRUE_PEAK - 0.5) / 20); // margem: o alimiter mede pico de amostra, não true peak
  let out;
  for (let pass = 0; pass < 6; pass++) {
    await encode(`aresample=${SAMPLE_RATE},volume=${gain.toFixed(2)}dB,`
      + `alimiter=limit=${limit.toFixed(4)}:attack=1:release=60:level=0:latency=1`);
    out = await measureLoudness(dst, duration);
    const offI = LUFS - Number(out.input_i);
    const overTP = Number(out.input_tp) - TRUE_PEAK;
    if (Math.abs(offI) <= 0.3 && overTP <= 0) break;
    gain += offI;
    if (overTP > 0) limit *= 10 ** (-(overTP + 0.1) / 20);
  }
  console.log(`  som: ${m.input_i} → ${out.input_i} LUFS, pico ${out.input_tp} dBTP`);
  return dst;
}

async function buildAudio(page, film, tmp) {
  let src;
  if (opt.audio) {
    src = path.resolve(opt.audio);
    if (!existsSync(src)) throw new Error(`Música não encontrada: ${opt.audio}`);
    console.log(`  som: usando ${rel(src)}`);
  } else if (film.hasAudio) {
    const b64 = await page.evaluate(async (sr) => {
      const r = await window.renderAudio(sr);
      let ch;
      if (r && typeof r.getChannelData === 'function') {
        ch = Array.from({ length: r.numberOfChannels }, (_, i) => r.getChannelData(i));
      } else if (Array.isArray(r)) {
        ch = r;
      } else {
        throw new Error('renderAudio(sr) deve devolver um AudioBuffer ou [Float32Array, ...]');
      }
      if (ch.length === 1) ch = [ch[0], ch[0]];
      const n = ch[0].length;
      const inter = new Float32Array(n * 2);
      for (let i = 0; i < n; i++) {
        inter[2 * i] = ch[0][i];
        inter[2 * i + 1] = ch[1][i];
      }
      const bytes = new Uint8Array(inter.buffer);
      let s = '';
      for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
      return btoa(s);
    }, SAMPLE_RATE);
    src = path.join(tmp, 'trilha.wav');
    await writeFile(src, wavFloat32(Buffer.from(b64, 'base64'), 2, SAMPLE_RATE));
  } else {
    console.warn('  ⚠ sem som: o filme não define window.renderAudio(sr) e nenhuma --audio foi passada.');
    return null;
  }
  return normalizeLoudness(src, path.join(tmp, 'trilha-14lufs.wav'), film.duration);
}

// --- página e contrato --------------------------------------------------------

/** Injetado antes de qualquer script da página: marca o modo de render e vigia o que é proibido. */
function renderGuard() {
  window.__RENDER__ = true;
  const v = (window.__violations = []);
  const flag = (msg) => v.includes(msg) || v.push(msg);
  Math.random = () => (flag('Math.random(); use mulberry32 com semente'), 0.5);
  for (const name of ['requestAnimationFrame', 'setTimeout', 'setInterval']) {
    window[name] = () => (flag(`${name}() no modo de render`), 0);
  }
}

async function checkContract(page, errors, when) {
  const v = await page.evaluate(() => window.__violations);
  const all = [...errors, ...v];
  if (all.length) throw new Error(`O filme quebra o contrato de render (${when}):\n  - ${all.join('\n  - ')}`);
}

async function openFilm(browser, file) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`erro na página: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && console.warn(`  [página] ${m.text()}`));
  await page.evaluateOnNewDocument(renderGuard);
  const url = pathToFileURL(file);
  if (opt.formato) url.searchParams.set('formato', opt.formato);
  for (const p of opt.param ?? []) {
    const i = p.indexOf('=');
    if (i < 1) throw new Error(`--param espera chave=valor, veio "${p}"`);
    url.searchParams.set(p.slice(0, i), p.slice(i + 1));
  }
  await page.goto(url.href, { waitUntil: 'networkidle0' });

  const info = await page.evaluate(() => ({
    FILM: window.FILM ?? null,
    hasSeek: typeof window.seek === 'function',
    hasAudio: typeof window.renderAudio === 'function',
  }));
  if (!info.FILM || !info.hasSeek) {
    const why = errors.length ? `\n  Erros na página:\n  - ${errors.join('\n  - ')}` : '';
    throw new Error(`A página precisa definir window.FILM = { width, height, fps, duration } e window.seek(t).${why}`);
  }
  const { width, height, duration, fps = 30, beats } = info.FILM;
  if (!(width > 0 && height > 0 && width % 2 === 0 && height % 2 === 0)) {
    throw new Error(`FILM.width e FILM.height devem ser pares e positivos (yuv420p); veio ${width}x${height}.`);
  }
  if (!(duration > 0 && fps > 0)) throw new Error('FILM.duration e FILM.fps devem ser maiores que zero.');

  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.evaluate(() => document.fonts.ready.then(() => true));
  await checkContract(page, errors, 'ao carregar');
  return { page, errors, film: { width, height, duration, fps, beats, hasAudio: info.hasAudio } };
}

async function seek(page, t) {
  const anims = await page.evaluate(async (t) => {
    await window.seek(t);
    return document.getAnimations().length;
  }, t);
  if (anims) {
    throw new Error(`Há ${anims} transição/animação CSS ativa em ${secs(t)}. O contrato proíbe transições de CSS.`);
  }
}

async function shot(page) {
  return Buffer.from(await page.screenshot({ type: 'png', optimizeForSpeed: true }));
}

/** Prova de pureza: o mesmo t tem que dar o mesmo quadro, venha de onde vier. */
async function checkPurity(page, film) {
  const n = Math.round(film.duration * film.fps);
  const tA = Math.round(n * 0.37) / film.fps;
  const tB = Math.round(n * 0.81) / film.fps;
  await seek(page, tA);
  const a = await shot(page);
  await seek(page, tB);
  await seek(page, 0);
  await seek(page, tA);
  const b = await shot(page);
  if (!a.equals(b)) {
    throw new Error(`seek(t) não é uma função pura: o quadro de ${secs(tA)} muda conforme o quadro anterior. `
      + 'Tire o estado carregado de um quadro pro outro.');
  }
}

// --- saídas -------------------------------------------------------------------

async function loadBeats(file, film) {
  const beatsFile = opt.beats ? path.resolve(opt.beats) : path.join(path.dirname(file), 'beats.json');
  let beats;
  if (existsSync(beatsFile)) {
    const j = JSON.parse(await readFile(beatsFile, 'utf8'));
    beats = Array.isArray(j) ? j : j.beats;
  } else if (Array.isArray(film.beats)) {
    beats = film.beats;
  }
  beats = (beats ?? []).map((b) => Number(typeof b === 'object' ? b.time ?? b.t : b))
    .filter((t) => Number.isFinite(t) && t >= 0 && t < film.duration);
  if (!beats.length) {
    throw new Error(`Sem grade de batidas: crie ${rel(beatsFile)} (lista de segundos ou { "beats": [...] }) `
      + 'ou defina window.FILM.beats.');
  }
  return beats;
}

async function contactSheet(browser, page, film, beats, dir, name) {
  const cells = [];
  for (const [i, t] of beats.entries()) {
    await seek(page, t);
    const f = `batida-${String(i + 1).padStart(2, '0')}.png`;
    await writeFile(path.join(dir, f), await shot(page));
    cells.push(`<figure><img src="${f}"><figcaption>#${i + 1} · ${secs(t)}</figcaption></figure>`);
  }
  // miniaturas no tamanho de uma tela de celular, para julgar a leitura
  const portrait = film.height >= film.width;
  const thumbW = portrait ? 360 : 480;
  const thumbH = Math.round((thumbW * film.height) / film.width);
  const cols = Math.min(cells.length, portrait ? 6 : 4);
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:24px;background:#111;color:#ddd;font:600 18px system-ui,sans-serif}
    h1{margin:0 0 16px;font-size:22px}
    .g{display:grid;grid-template-columns:repeat(${cols},${thumbW}px);gap:20px 16px}
    figure{margin:0} img{display:block;width:${thumbW}px;height:${thumbH}px} figcaption{padding-top:6px}
  </style><h1>${name} · ${cells.length} batidas · ${secs(film.duration)}</h1><div class="g">${cells.join('')}</div>`;
  const htmlFile = path.join(dir, 'folha.html');
  await writeFile(htmlFile, html);
  const sheet = await browser.newPage();
  await sheet.setViewport({ width: cols * (thumbW + 16) + 32, height: 600 });
  await sheet.goto(pathToFileURL(htmlFile).href, { waitUntil: 'load' });
  const out = path.join(dir, 'folha.png');
  await sheet.screenshot({ path: out, fullPage: true });
  await sheet.close();
  return out;
}

async function encodeVideo(page, errors, film, audio, out) {
  const n = Math.round(film.duration * film.fps);
  const args = ['-hide_banner', '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(film.fps), '-c:v', 'png', '-i', '-'];
  if (audio) args.push('-i', audio);
  args.push('-map', '0:v');
  if (audio) args.push('-map', '1:a', '-c:a', 'aac', '-b:a', '192k');
  args.push(
    '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(CRF), '-pix_fmt', 'yuv420p',
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
    '-movflags', '+faststart', '-t', String(film.duration), out,
  );
  const p = spawn(FFMPEG, args, { stdio: ['pipe', 'inherit', 'inherit'] });
  p.stdin.on('error', () => {}); // se o ffmpeg cair, o erro vem pelo 'close'
  const done = new Promise((resolve, reject) => {
    p.on('error', reject);
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg saiu com código ${code}`))));
  });
  try {
    for (let i = 0; i < n; i++) {
      await seek(page, i / film.fps);
      if (!p.stdin.write(await shot(page))) {
        await Promise.race([new Promise((r) => p.stdin.once('drain', r)), done]);
      }
      if (i % film.fps === 0) {
        await checkContract(page, errors, `em ${secs(i / film.fps)}`);
        process.stdout.write(`\r  quadro ${i}/${n}`);
      }
    }
    p.stdin.end();
    await done;
    process.stdout.write(`\r  quadro ${n}/${n}\n`);
  } catch (e) {
    p.kill();
    throw e;
  }
}

// --- principal ----------------------------------------------------------------

/**
 * O chrome-headless-shell captura ~13x mais rápido que o Chrome headless normal nesta máquina
 * (≈90 ms contra ≈1,2 s por quadro 1080x1920). Sem ele, o Chrome normal com SwiftShader
 * chega perto (≈120 ms). Instale com: npx puppeteer browsers install chrome-headless-shell
 */
async function launchBrowser() {
  const args = ['--force-color-profile=srgb', '--font-render-hinting=none', '--hide-scrollbars'];
  try {
    return await puppeteer.launch({ headless: 'shell', args });
  } catch {
    console.warn('  ⚠ chrome-headless-shell não encontrado; usando o Chrome normal (mais lento).');
    return puppeteer.launch({ args: [...args, '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  }
}

async function main() {
  if (opt.help || positionals.length !== 1) {
    console.log('Uso: node render.mjs <filme.html> [--sheet | --frames 0,1.5 | --som] [--out x.mp4] [--beats b.json] [--audio m.mp3] [--formato vertical]');
    process.exitCode = opt.help ? 0 : 1;
    return;
  }
  const file = path.resolve(positionals[0]);
  if (!existsSync(file)) throw new Error(`Filme não encontrado: ${positionals[0]}`);
  const base = path.basename(file, path.extname(file));
  const name = (base === 'index' ? path.basename(path.dirname(file)) : base) + (opt.formato ? `-${opt.formato}` : '');
  const tmp = path.join(ROOT, '.render-tmp', name);
  await mkdir(tmp, { recursive: true });
  if (!opt.sheet && !opt.frames) FFMPEG = findFfmpeg();

  const browser = await launchBrowser();
  try {
    const { page, errors, film } = await openFilm(browser, file);
    console.log(`${name}: ${film.width}x${film.height}, ${film.fps} fps, ${secs(film.duration)}`);
    await checkPurity(page, film);

    if (opt.frames) {
      for (const t of opt.frames.split(',').map(Number)) {
        await seek(page, t);
        const out = path.join(tmp, `t${t.toFixed(2).padStart(5, '0')}.png`);
        await writeFile(out, await shot(page));
        console.log(`  ${rel(out)}`);
      }
      await checkContract(page, errors, 'nos quadros');
    } else if (opt.som) {
      const audio = await buildAudio(page, film, tmp);
      await checkContract(page, errors, 'na trilha');
      if (audio) console.log(`  trilha: ${rel(audio)}`);
    } else if (opt.sheet) {
      const beats = await loadBeats(file, film);
      const out = await contactSheet(browser, page, film, beats, tmp, name);
      await checkContract(page, errors, 'na folha de contato');
      console.log(`  folha de contato (${beats.length} batidas): ${rel(out)}`);
    } else {
      const audio = await buildAudio(page, film, tmp);
      await checkContract(page, errors, 'na trilha');
      const out = path.resolve(opt.out ?? path.join(ROOT, 'resultados', `${name}.mp4`));
      await mkdir(path.dirname(out), { recursive: true });
      await encodeVideo(page, errors, film, audio, out);
      console.log(`  ok → ${rel(out)}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(`\n✗ ${e.message}`);
  process.exitCode = 1;
});
