/**
 * Captura os estados reais do "Guia Mestre Vai de Lokal" (artefato) com o Playwright, para o filme 07.
 *
 * Abre a cópia local da página publicada (passe o caminho do HTML) e fotografa cada peça antes e
 * depois do clique real: sumário com e sem a seção ativa, a linha da frase antes e depois de
 * "Copiar", o filtro do banco de cenas, a checklist marcando item a item e o quadro 9:16 das áreas
 * seguras. Também extrai o logo branco da capa (o PNG original, 800x356) e mede, dentro de cada
 * peça, onde ficam os alvos do cursor (px da captura), em assets/guia/medidas.json.
 *
 * Uso: node scripts/capturar_guia.mjs caminho/do/guia.html
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import puppeteer from 'puppeteer';

const SRC = process.argv[2];
if (!SRC) throw new Error('passe o caminho do HTML do guia');
const OUT = 'assets/guia';
const SCALE = 3;

const browser = await chromium.launch({ executablePath: await puppeteer.executablePath() });
await mkdir(OUT, { recursive: true });
const shots = [], medidas = {};

async function abrir(scale = SCALE) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: scale, reducedMotion: 'reduce' });
  // o guia copia para a área de transferência; aqui ela sempre aceita, para a página mostrar o seu "Copiado" real
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.resolve() }, configurable: true });
  });
  await page.goto(pathToFileURL(path.resolve(SRC)).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // a coluna do sumário é fixa e rola: solta só para a captura, senão o navegador não pinta o que está fora da janela
  await page.addStyleTag({ content: '.lado { position: static !important; max-height: none !important; overflow: visible !important; }' });
  return page;
}
/** Captura a peça; `alvos` = { rótulo: seletor ou função que acha o elemento } mede onde cada um está. */
async function shot(page, name, locator, note, alvos = {}, scale = SCALE) {
  const el = locator.first();
  await el.scrollIntoViewIfNeeded();
  await el.screenshot({ path: `${OUT}/${name}.png`, omitBackground: true, animations: 'disabled' });
  const box = await el.boundingBox();
  shots.push({ name, note, px: `${Math.round(box.width * scale)}x${Math.round(box.height * scale)}` });
  for (const [rotulo, sel] of Object.entries(alvos)) {
    const r = await el.evaluate((root, s) => {
      const alvo = s.startsWith('texto:')
        ? [...root.querySelectorAll('*')].filter((e) => e.innerText && e.innerText.trim().startsWith(s.slice(6))).sort((a, z) => a.innerText.length - z.innerText.length)[0]
        : root.querySelector(s);
      if (!alvo) return null;
      const a = root.getBoundingClientRect(), z = alvo.getBoundingClientRect();
      return [z.left - a.left, z.top - a.top, z.right - a.left, z.bottom - a.top];
    }, sel);
    (medidas[name] ??= {})[rotulo] = r && r.map((v) => Math.round(v * scale));
  }
}

const page = await abrir();

// logo branco da capa: o PNG original, sem recompressão
const dataUrl = await page.locator('.capa-logo img').getAttribute('src');
await writeFile(`${OUT}/logo-branco.png`, Buffer.from(dataUrl.split(',')[1], 'base64'));
shots.push({ name: 'logo-branco', note: 'logo branco da capa (arquivo original)', px: '800x356' });

// sumário: normal e com a seção 23 ativa (o fundo real de "ativo")
const nav = page.locator('.sumario nav');
await page.evaluate(() => document.querySelectorAll('.sumario a.ativo').forEach((a) => a.classList.remove('ativo')));
await shot(page, 'sumario', nav, 'sumário, sem seção ativa', { s16: 'a[href="#s16"]', s23: 'a[href="#s23"]', s27: 'a[href="#s27"]', s30: 'a[href="#s30"]' });
await page.evaluate(() => document.querySelector('.sumario a[href="#s23"]').classList.add('ativo'));
await shot(page, 'sumario-23', nav, 'sumário com "23 · Frases que pode usar" ativo');
await page.evaluate(() => document.querySelector('.sumario a[href="#s23"]').classList.remove('ativo'));
await shot(page, 'item-27', page.locator('.sumario a[href="#s27"]'), 'item "27 · Banco de cenas" do sumário');
await shot(page, 'item-34', page.locator('.sumario a[href="#s34"]'), 'item "34 · Checklist do editor" do sumário');
await shot(page, 'item-35', page.locator('.sumario a[href="#s35"]'), 'item "35 · Formatos e áreas seguras" do sumário');

// seção 23: cabeçalho, lista de frases e a primeira linha antes e depois de "Copiar"
await shot(page, 's23-cabecalho', page.locator('#s23 > header'), 'cabeçalho "23 Frases que pode usar"');
await shot(page, 's23-lista', page.locator('#s23 .lista-frases').first(), 'lista de frases que pode usar', {
  copiar1: 'li:first-child .botao-copiar', linha1: 'li:first-child',
});
const linha = page.locator('#s23 .lista-frases li').first();
await linha.locator('.botao-copiar').hover();
await shot(page, 's23-lista-hover', page.locator('#s23 .lista-frases').first(), 'a lista com o mouse sobre o primeiro "Copiar" (borda laranja real)');
await page.mouse.move(5, 5);
await shot(page, 'frase-1', linha, 'linha "Chega de perder encomendas." antes do clique', { copiar: '.botao-copiar' });
await linha.locator('.botao-copiar').click();
await page.waitForTimeout(150);
await shot(page, 'frase-1-copiado', linha, 'a mesma linha depois do clique: "Copiado" (estado real)', { copiar: '.botao-copiar' });

// seção 27: o filtro (normal, nenhum marcado, todos marcados) e as cenas depois do clique em "App"
const filtro = page.locator('#s27 .filtro');
const botoes = { todas: '[data-filtro="todas"]', dor: '[data-filtro="dor"]', app: '[data-filtro="app"]', agencia: '[data-filtro="agencia"]', parceiro: '[data-filtro="parceiro"]', outros: '[data-filtro="outros"]' };
await shot(page, 'filtro', filtro, 'filtro com "Todas" marcado', botoes);
const marcarTodos = (v) => page.evaluate((val) => document.querySelectorAll('#s27 .filtro button').forEach((b) => b.setAttribute('aria-pressed', val)), v);
await marcarTodos('false');
await shot(page, 'filtro-nenhum', filtro, 'filtro sem nenhum botão marcado (para o indicador revelar)');
await marcarTodos('true');
await shot(page, 'filtro-todos', filtro, 'filtro com todos marcados (o estilo real de "pressionado")');
await marcarTodos('false');
await page.locator('#s27 [data-filtro="todas"]').click();
await page.locator('#s27 [data-filtro="app"]').click();
await page.waitForTimeout(100);
await shot(page, 'cenas-app', page.locator('#banco-cenas'), 'banco de cenas depois do clique em "App"');

// seção 34: a checklist do editor, marcando item a item
const cartao = page.locator('#checklist .cartao').first();
await page.evaluate(() => document.querySelectorAll('#checklist input').forEach((c) => { c.checked = false; }));
const caixas = { c1: '#ck-logo', c2: '#ck-cor', c3: '#ck-tipo', c4: '#ck-emoji' };
await shot(page, 'checklist-0', cartao, 'checklist "Marca", nada marcado', caixas);
for (const [i, id] of ['#ck-logo', '#ck-cor', '#ck-tipo'].entries()) {
  await page.locator(id).click();
  await shot(page, `checklist-${i + 1}`, cartao, `checklist "Marca", ${i + 1} marcado(s)`);
}
await page.close();

// seção 35: o quadro 9:16 das áreas seguras (peça pequena: captura com mais densidade)
const p5 = await abrir(6);
await shot(p5, 'formato-916', p5.locator('#s35 .formato .quadro').first(), 'quadro 9:16 com as áreas seguras', {}, 6);
await p5.close();

await browser.close();
await writeFile(`${OUT}/medidas.json`, JSON.stringify(medidas, null, 2));
console.table(shots);
console.log('medidas:', JSON.stringify(medidas));
