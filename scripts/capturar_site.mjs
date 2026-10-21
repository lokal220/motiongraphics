/**
 * Captura peças reais do site da VAI DE LOKAL com o Playwright, para animar sem redesenhar nada.
 *
 * - duas passadas: desktop (1440 px, sufixo "") e celular (390 px, sufixo "-m"); a versão de
 *   celular é o próprio site em tela estreita, com o texto já quebrado para os formatos 1:1 e 9:16
 * - densidade 3x (texto nítido mesmo ampliado no vídeo)
 * - movimento reduzido (as animações de entrada do site já aparecem prontas)
 * - fundo da página transparente: títulos e textos viram PNG com transparência;
 *   cartões, botões e a moldura do app mantêm o fundo que têm no site
 * - o cabeçalho fixo é escondido só para não cobrir as peças
 *
 * Uso: node scripts/capturar_site.mjs   (salva em assets/capturas/)
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import puppeteer from 'puppeteer';

const URL = 'https://vaidelokal.com.br';
const OUT = 'assets/capturas';
const SCALE = 3;

const browser = await chromium.launch({ executablePath: await puppeteer.executablePath() });
await mkdir(OUT, { recursive: true });
const shots = [];
// posições de trechos dentro de cada captura, em px da captura (3x): para destacar o lugar exato
const medidas = {};

async function capturar({ width, height, suffix, isMobile }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: SCALE, isMobile, reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: `header { display: none !important; }
              html, body, main, section, .wrap, .hero-inner, .hero-texto, .section-head, .vs-quadro, .faq-list { background: transparent !important; }`,
  });

  /** Captura a peça; `partes` = { rótulo: texto } mede onde cada texto está dentro dela. */
  async function shot(name, locator, note, partes = {}) {
    if (!(await locator.count()) || !(await locator.first().isVisible())) {
      shots.push({ name: name + suffix, note: `${note} (não aparece nesta largura)` });
      return;
    }
    const el = locator.first();
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: `${OUT}/${name}${suffix}.png`, omitBackground: true, animations: 'disabled' });
    const box = await el.boundingBox();
    shots.push({ name: name + suffix, note, px: `${Math.round(box.width * SCALE)}x${Math.round(box.height * SCALE)}` });
    for (const [rotulo, texto] of Object.entries(partes)) {
      const r = await el.evaluate((root, txt) => {
        // menor elemento dentro da peça cujo texto contém o trecho
        const cands = [...root.querySelectorAll('*')].filter((e) => e.innerText && e.innerText.includes(txt));
        const alvo = cands.sort((a, z) => a.innerText.length - z.innerText.length)[0];
        if (!alvo) return null;
        const a = root.getBoundingClientRect(), z = alvo.getBoundingClientRect();
        return [z.left - a.left, z.top - a.top, z.right - a.left, z.bottom - a.top];
      }, texto);
      (medidas[name + suffix] ??= {})[rotulo] = r && r.map((v) => Math.round(v * SCALE));
    }
  }

  const hero = page.locator('section.hero');
  await shot('hero-titulo', hero.locator('h1.hero-title'), 'título do hero, com "perder" marcado');
  await shot('hero-lead', hero.locator('p.hero-lead'), 'linha de apoio do hero');
  await shot('hero-aviso', hero.locator('.hero-aviso'), 'aviso flutuante "Sua encomenda chegou!"');
  if (!suffix) {
    await hero.locator('.hero-aviso').evaluate((e) => { e.style.visibility = 'hidden'; });
    await shot('hero-app', hero.locator('.app-moldura'), 'moldura de celular com a tela da encomenda');
    await hero.locator('.hero-aviso').evaluate((e) => { e.style.visibility = ''; });
  }

  const vs = page.locator('#problemas');
  await shot('vs-hoje', vs.locator('.vs-hoje'), 'cartão "HOJE: Entrega na sua casa"');
  await shot('vs-lokal', vs.locator('.vs-lokal'), 'cartão "COM A LOKAL: Entrega na agência parceira"', {
    aviso: 'Aviso no WhatsApp quando chega', prazo: '7 dias úteis pra buscar com calma', qr: 'Retirada protegida por QR Code',
  });

  // preço: o cartão real com "R$ 5,90" e as três faixas de tamanho
  await shot('preco', page.locator('#precos .faixa-grupo').first(), 'cartão de preço "R$ 5,90 · Pacote pequeno, médio ou grande"', { preco: 'R$ 5,90' });

  // "Tudo pelo app": as três telas reais, cada uma na moldura do site (iguais nas duas larguras)
  if (!suffix) {
    const telas = page.locator('#app figure.app-tela');
    for (const [i, nome] of ['encomenda', 'carteira', 'retirada'].entries()) {
      const legenda = (await telas.nth(i).locator('figcaption').innerText()).split('\n')[0];
      await shot(`app-${nome}`, telas.nth(i).locator('.app-moldura'), `moldura com a tela "${legenda}"`);
    }
  }

  // FAQ: clique real na pergunta sobre o aviso; captura fechado e aberto
  const item = page.locator('.faq-item', { hasText: 'Como sou avisado quando minha encomenda chega?' });
  await shot('faq-aviso-fechado', item, 'pergunta do FAQ, fechada');
  await item.locator('button.faq-q').click();
  await page.waitForTimeout(800);
  await shot('faq-aviso-aberto', item, 'a mesma pergunta depois do clique, com a resposta');
  await page.close();
}

await capturar({ width: 1440, height: 900, suffix: '', isMobile: false });
await capturar({ width: 390, height: 844, suffix: '-m', isMobile: true });
await browser.close();
await writeFile(`${OUT}/medidas.json`, JSON.stringify(medidas, null, 2));
console.table(shots);
console.log('medidas (px da captura):', JSON.stringify(medidas));
