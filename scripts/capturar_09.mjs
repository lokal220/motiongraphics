/**
 * Captura do site vaidelokal.com.br, com o Playwright, tudo o que o filme 09-diretor usa de real.
 *
 * - arquivos originais do site, sem recompressão:
 *     logo (logo-lokal.png), ícone do app (app-icon.png) e as três telas do app
 *     (app-tela-encomenda.jpg, app-tela-carteira.jpg, app-tela-retirada.jpg: "dados de exemplo", como o site diz)
 * - peças da página, fotografadas a 3x com fundo transparente e movimento reduzido:
 *     o título do hero, a notificação "Sua encomenda chegou!", o bloco "Seu endereço para compras online"
 *     (título e os três passos), o cartão da agência parceira e o cartão "COM A LOKAL"
 * - medidas (px da captura) de onde ficam os alvos do cursor e os trechos a destacar, em medidas.json
 *
 * Uso: node scripts/capturar_09.mjs   (salva em assets/09/)
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import puppeteer from 'puppeteer';

const URL = 'https://vaidelokal.com.br';
const OUT = 'assets/09';
const SCALE = 3;

const browser = await chromium.launch({ executablePath: await puppeteer.executablePath() });
await mkdir(OUT, { recursive: true });
const shots = [], medidas = {};

// 1. arquivos originais
const ctx = await browser.newContext();
for (const f of ['logo-lokal.png', 'app-icon.png', 'app-tela-encomenda.jpg', 'app-tela-carteira.jpg', 'app-tela-retirada.jpg']) {
  const r = await ctx.request.get(`${URL}/${f}`);
  if (!r.ok()) throw new Error(`não baixou ${f}: ${r.status()}`);
  await writeFile(`${OUT}/${f}`, await r.body());
  shots.push({ name: f, note: 'arquivo original do site' });
}
await ctx.close();

// 2. peças da página
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: SCALE, reducedMotion: 'reduce' });
await page.goto(URL, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({
  content: `header { display: none !important; }
            html, body, main, section, .wrap, .hero-inner, .hero-texto, .section-head { background: transparent !important; }`,
});

/** Fotografa a peça; `partes` = { rótulo: texto } mede o menor elemento que contém cada texto. */
async function shot(name, locator, note, partes = {}) {
  const el = locator.first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await el.screenshot({ path: `${OUT}/${name}.png`, omitBackground: true, animations: 'disabled' });
  const box = await el.boundingBox();
  shots.push({ name, note, px: `${Math.round(box.width * SCALE)}x${Math.round(box.height * SCALE)}` });
  for (const [rotulo, texto] of Object.entries(partes)) {
    const r = await el.evaluate((root, txt) => {
      const cands = [...root.querySelectorAll('*')].filter((e) => e.innerText && e.innerText.includes(txt));
      const alvo = cands.sort((a, z) => a.innerText.length - z.innerText.length)[0];
      if (!alvo) return null;
      const a = root.getBoundingClientRect(), z = alvo.getBoundingClientRect();
      return [z.left - a.left, z.top - a.top, z.right - a.left, z.bottom - a.top];
    }, texto);
    (medidas[name] ??= {})[rotulo] = r && r.map((v) => Math.round(v * SCALE));
  }
}

const hero = page.locator('section.hero');
await shot('hero-titulo', hero.locator('h1.hero-title'), 'título do hero: "Chega de perder encomendas.", com "perder" marcado');
await shot('aviso-chegou', hero.locator('.hero-aviso'), 'notificação real do site "Sua encomenda chegou!"');

const como = page.locator('#como-funciona');
await shot('endereco-titulo', como.locator('h2.section-title'), 'título "Seu endereço para compras online"');
await shot('endereco-passos', como.locator('ol.passos'), 'os três passos do "Como funciona"', {
  passo1: 'Crie sua conta', passo2: 'Compre com o endereço', passo3: 'A gente recebe e te avisa', complemento: 'no complemento, só o seu ID',
});
for (let i = 0; i < 3; i++) await shot(`endereco-passo-${i + 1}`, como.locator('li.passo').nth(i), `passo ${i + 1} do "Como funciona"`);

await shot('agencia', page.locator('#lista-agencias article.card.agency'), 'cartão real da agência parceira', {
  nome: 'T&A Informática', endereco: 'Rua Lindolfo', comoChegar: 'Ver como chegar',
});
await shot('com-a-lokal', page.locator('#problemas .vs-lokal'), 'cartão "COM A LOKAL"', {
  alguem: 'Alguém sempre lá pra receber', aviso: 'Aviso no WhatsApp quando chega', prazo: '7 dias úteis pra buscar com calma', qr: 'Retirada protegida por QR Code',
});

await browser.close();
await writeFile(`${OUT}/medidas.json`, JSON.stringify(medidas, null, 2));
console.table(shots);
console.log('medidas:', JSON.stringify(medidas));
