/**
 * capturar.mjs - coleta os materiais reais do produto num site, com o Playwright (passo 1 da skill motion-reel).
 *
 * Inventário (o que existe de real para usar no filme):
 *   node scripts/capturar.mjs https://produto.com assets
 *     - assets/site/pagina-desktop.png e pagina-celular.png (a página inteira, 1440 e 390 px)
 *     - assets/site/: os arquivos ORIGINAIS das imagens que parecem logo, ícone, imagem de compartilhamento ou tela
 *       do app (sem recompressão), com o tamanho natural de cada um
 *     - assets/inventario.json: cores (variáveis CSS e as mais usadas), fontes (família, pesos e os arquivos
 *       de fonte que a página carrega), imagens, seções (id, título, trecho do texto) e as peças candidatas
 *
 * Peças (o recorte real de um elemento, para animar sem redesenhar):
 *   node scripts/capturar.mjs https://produto.com assets --pecas pecas.json
 *     pecas.json = [{ "nome": "botao", "seletor": "#precos .card", "largura": 1440, "escala": 3,
 *                     "alvos": { "preco": "R$ 5,90", "cta": "sel:a.btn" } }]
 *     - assets/pecas/<nome>.png a 3x, fundo transparente, movimento reduzido
 *     - assets/pecas/medidas.json: onde fica cada alvo (texto contido ou "sel:seletor") em px da captura
 *
 * Nada é inventado: o que não existe no site (uma tela do app logado, por exemplo) precisa vir de um print do
 * usuário. Fontes: o inventário lista os arquivos; baixe só com o OK do usuário.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import puppeteer from 'puppeteer';

const [URL_, OUT = 'assets', ...resto] = process.argv.slice(2);
if (!URL_) {
  console.log('Uso: node scripts/capturar.mjs <url> [pasta=assets] [--pecas pecas.json]');
  process.exit(1);
}
const iPecas = resto.indexOf('--pecas');
const PECAS = iPecas >= 0 ? resto[iPecas + 1] : null;

const browser = await chromium.launch({ executablePath: await puppeteer.executablePath() });
await mkdir(path.join(OUT, PECAS ? 'pecas' : 'site'), { recursive: true });

async function abrir(largura, escala = 1, celular = false) {
  const page = await browser.newPage({
    viewport: { width: largura, height: celular ? 844 : 900 }, deviceScaleFactor: escala, isMobile: celular, reducedMotion: 'reduce',
  });
  await page.goto(URL_, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // rola até o fim e volta, para as imagens preguiçosas carregarem
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => requestAnimationFrame(() => r())); }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
  return page;
}

if (!PECAS) {
  // ---------------------------------------------------------------- inventário
  const page = await abrir(1440);
  await page.screenshot({ path: path.join(OUT, 'site', 'pagina-desktop.png'), fullPage: true });
  const fontesCarregadas = await page.evaluate(() => performance.getEntriesByType('resource')
    .map((r) => r.name).filter((n) => /\.(woff2?|ttf|otf)(\?|$)/i.test(n)));
  const inv = await page.evaluate(() => {
    const abs = (u) => { try { return new URL(u, location.href).href; } catch { return u; } };
    const onde = (e) => (e.closest('header') ? 'cabeçalho' : e.closest('footer') ? 'rodapé' : 'corpo');
    const imgs = [...document.querySelectorAll('img')].map((i) => ({
      src: abs(i.currentSrc || i.src), alt: i.alt || '', w: i.naturalWidth, h: i.naturalHeight, onde: onde(i),
      classe: String(i.className || '').slice(0, 60),
    }));
    const extras = [...document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"], meta[property="og:image"]')]
      .map((l) => ({ src: abs(l.href || l.content), alt: l.getAttribute('rel') || l.getAttribute('property'), w: 0, h: 0, onde: 'meta' }));
    // cores: variáveis CSS da raiz + as cores mais usadas (texto, fundo e borda)
    const vars = {};
    for (const sh of [...document.styleSheets]) {
      let regras; try { regras = sh.cssRules; } catch { continue; }
      for (const r of regras || []) if (r.selectorText === ':root' && r.style) {
        for (const p of r.style) if (p.startsWith('--')) vars[p] = r.style.getPropertyValue(p).trim();
      }
    }
    const conta = {};
    for (const e of document.querySelectorAll('body *')) {
      const s = getComputedStyle(e);
      for (const c of [s.color, s.backgroundColor, s.borderTopColor]) if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) conta[c] = (conta[c] || 0) + 1;
    }
    const cores = Object.entries(conta).sort((a, z) => z[1] - a[1]).slice(0, 14);
    const fonte = (sel) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return { familia: s.fontFamily, peso: s.fontWeight, tamanho: s.fontSize, espaco: s.letterSpacing }; };
    const secoes = [...document.querySelectorAll('section, [id]')].filter((e) => e.offsetHeight > 150).slice(0, 40).map((e) => ({
      id: e.id || '', classe: String(e.className || '').slice(0, 50),
      titulo: (e.querySelector('h1, h2, h3') || {}).innerText || '', texto: (e.innerText || '').replace(/\s+/g, ' ').slice(0, 200),
    }));
    // as faces de fonte que a página carregou e as folhas de fonte externas (ex.: Google Fonts)
    const faces = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/"/g, '')} ${f.weight} ${f.style}`);
    const folhasDeFonte = [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href).filter((h) => /font/i.test(h));
    return {
      titulo: document.title, imagens: imgs.concat(extras), variaveis: vars, coresMaisUsadas: cores,
      fontes: { h1: fonte('h1'), h2: fonte('h2'), corpo: fonte('p') || fonte('body'), botao: fonte('button, .btn, a.button') },
      facesCarregadas: [...new Set(faces)], folhasDeFonte, secoes,
    };
  });
  await page.close();
  const cel = await abrir(390, 1, true);
  await cel.screenshot({ path: path.join(OUT, 'site', 'pagina-celular.png'), fullPage: true });
  await cel.close();

  // baixa os originais das imagens que podem ser logo, ícone, compartilhamento ou tela do app
  const interessa = (i) => /logo|icon|og:image|apple-touch|app|tela|screen|mock|phone|celular/i.test(`${i.src} ${i.alt} ${i.classe || ''}`);
  const ctx = await browser.newContext();
  const baixadas = [];
  for (const i of inv.imagens.filter(interessa)) {
    if (!/^https?:/.test(i.src) || baixadas.some((b) => b.src === i.src)) continue;
    try {
      const r = await ctx.request.get(i.src);
      if (!r.ok()) continue;
      const nome = decodeURIComponent(new URL(i.src).pathname.split('/').pop() || 'imagem').replace(/[^\w.-]/g, '_');
      await writeFile(path.join(OUT, 'site', nome), await r.body());
      baixadas.push({ ...i, arquivo: `site/${nome}` });
    } catch { /* imagem inacessível: fica só no inventário */ }
  }
  await ctx.close();
  inv.baixadas = baixadas;
  inv.arquivosDeFonte = [...new Set(fontesCarregadas)];
  await writeFile(path.join(OUT, 'inventario.json'), JSON.stringify(inv, null, 2));
  console.log(`\n${inv.titulo}`);
  console.log(`imagens na página: ${inv.imagens.length}; originais baixados em ${OUT}/site: ${baixadas.length}`);
  console.table(baixadas.map((b) => ({ arquivo: b.arquivo, alt: b.alt.slice(0, 40), px: `${b.w}x${b.h}`, onde: b.onde })));
  console.log('cores mais usadas:', inv.coresMaisUsadas.slice(0, 8).map(([c, n]) => `${c} (${n})`).join(', '));
  console.log('variáveis de cor:', Object.entries(inv.variaveis).filter(([, v]) => /#|rgb|hsl/.test(v)).slice(0, 12).map(([k, v]) => `${k}: ${v}`).join(', ') || 'nenhuma');
  console.log('fontes:', JSON.stringify(inv.fontes));
  console.log('faces de fonte carregadas:', inv.facesCarregadas.join(', ') || 'nenhuma');
  console.log('arquivos e folhas de fonte:', [...inv.arquivosDeFonte, ...inv.folhasDeFonte].join(', ') || 'nenhum (fonte do sistema ou embutida)');
  console.log(`seções: ${inv.secoes.map((s) => s.id || s.titulo.slice(0, 30)).filter(Boolean).join(' | ')}`);
  console.log(`inventário completo: ${OUT}/inventario.json`);
} else {
  // ---------------------------------------------------------------- peças por seletor
  const lista = JSON.parse(await readFile(PECAS, 'utf8'));
  const medidas = {};
  for (const p of lista) {
    const escala = p.escala || 3;
    const page = await abrir(p.largura || 1440, escala, (p.largura || 1440) < 600);
    await page.addStyleTag({ content: 'header { visibility: hidden !important; } html, body { background: transparent !important; }' });
    const el = page.locator(p.seletor).first();
    if (!(await el.count())) { console.warn(`  sem ${p.nome}: o seletor ${p.seletor} não achou nada`); await page.close(); continue; }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await el.screenshot({ path: path.join(OUT, 'pecas', `${p.nome}.png`), omitBackground: true, animations: 'disabled' });
    const box = await el.boundingBox();
    medidas[p.nome] = { px: [Math.round(box.width * escala), Math.round(box.height * escala)] };
    for (const [rotulo, alvo] of Object.entries(p.alvos || {})) {
      const r = await el.evaluate((root, s) => {
        const e = s.startsWith('sel:') ? root.querySelector(s.slice(4))
          : [...root.querySelectorAll('*')].filter((x) => x.innerText && x.innerText.includes(s)).sort((a, z) => a.innerText.length - z.innerText.length)[0];
        if (!e) return null;
        const a = root.getBoundingClientRect(), z = e.getBoundingClientRect();
        return [z.left - a.left, z.top - a.top, z.right - a.left, z.bottom - a.top];
      }, alvo);
      medidas[p.nome][rotulo] = r && r.map((v) => Math.round(v * escala));
    }
    console.log(`  ${p.nome}: ${medidas[p.nome].px.join('x')}`);
    await page.close();
  }
  await writeFile(path.join(OUT, 'pecas', 'medidas.json'), JSON.stringify(medidas, null, 2));
  console.log(`medidas: ${OUT}/pecas/medidas.json`);
}
await browser.close();
