# Estúdio de motion: VAI DE LOKAL

Filmes de motion graphics feitos em código. Cada filme é uma página HTML com um canvas, e `window.seek(t)` desenha o quadro do instante t (função pura do tempo). O `render.mjs` grava quadro a quadro com o Chrome sem janela e codifica em H.264 yuv420p, CRF 16, com o som em -14 LUFS.

As regras do estúdio estão em [CLAUDE.md](CLAUDE.md).

## O filme 11: tutorial de primeiro acesso (60 s, 1080×1920, 60 fps, 120 BPM)

> VAI DE LOKAL, "Compre onde quiser. A gente recebe pra você.": o tutorial que a pessoa assiste depois de criar a conta e abrir o app pela primeira vez. Ele mostra, nas telas reais, como comprar com o endereço da agência, o aviso no WhatsApp, quanto custa, como pagar pelo app e como retirar com QR Code.

| Entrega | Arquivo |
|---|---|
| Filme | `resultados/tutorial-primeiro-acesso-vertical.mp4` |
| Teste de loop (duas voltas emendadas) | `out/teste-de-loop.mp4` |
| Pôster | `out/poster.png` |
| Folha de contato (um quadro por batida) | `out/folha-de-contato.png` |
| Guia de estilo, lista de planos (13 decisões), guia de animação | `docs/guia-de-estilo.md`, `docs/lista-de-planos.md`, `docs/GUIA-DE-ANIMACAO.md` |
| Registro de crítica | `docs/registro-de-critica.md` (diretor) e `docs/critica/cap1.md` … `cap4.md` (animadores) |

### Como ele é feito
- **`filmes/11-tutorial-primeiro-acesso/index.html`:** o motor, uma cópia do modelo da skill motion-reel. Ele tem o contêiner que nunca corta, as legendas em pílula e as deixas de som. Mudanças deste filme:
  - um **dedo** (círculo de toque) no lugar da seta, que toca e arrasta;
  - desfoque de movimento com 8 subquadros;
  - a pílula da legenda abre e fecha por recorte, sem fade.
- **`capitulos/comum.js` e `cap1.js` … `cap4.js`:** os ajudantes comuns e os quatro capítulos. Cada capítulo foi escrito por um animador (subagente), passou por um crítico independente e teve rodadas de correção.
- **`trilha.js`:** a trilha original, em dó maior, I-V-vi-IV. Tem acentos nos momentos grandes, acentos que crescem nas linhas de preço e uma anacruse que puxa o loop.
- **Interface real:**
  - `assets/telas/`: os cinco prints do app, da conta de exemplo, com os recortes medidos em `medidas.json`;
  - `assets/logo/`: a logo branca e a laranja, com o pin separado por componente conexo, sem redesenhar;
  - `assets/site/`: o inventário do site, capturado com o Playwright.
- **Loop:** o quadro de 60 s é idêntico, pixel a pixel, ao de 0 s.

### Refazer do zero
```bash
node render.mjs filmes/11-tutorial-primeiro-acesso/index.html --som --out filmes/11-tutorial-primeiro-acesso/audio/music.wav
python scripts/beats.py filmes/11-tutorial-primeiro-acesso/audio/music.wav filmes/11-tutorial-primeiro-acesso/beats.json --bpm 120
node render.mjs filmes/11-tutorial-primeiro-acesso/index.html --cues filmes/11-tutorial-primeiro-acesso/cues.json
node scripts/sfx.mjs filmes/11-tutorial-primeiro-acesso/cues.json filmes/11-tutorial-primeiro-acesso/audio/sfx.wav
node render.mjs filmes/11-tutorial-primeiro-acesso/index.html --param escala=0.5 --param sub=1 --audio filmes/11-tutorial-primeiro-acesso/audio/music.wav --out .render-tmp/11-animatico.mp4
node render.mjs filmes/11-tutorial-primeiro-acesso/index.html --audio filmes/11-tutorial-primeiro-acesso/audio/music.wav --audio filmes/11-tutorial-primeiro-acesso/audio/sfx.wav --out resultados/tutorial-primeiro-acesso-vertical.mp4
bash scripts/entregas_11.sh
```

Os comandos fazem, na ordem:
1. a trilha só de música, em -14 LUFS;
2. a grade medida;
3. as deixas de som tiradas da linha do tempo;
4. os efeitos;
5. o animático em 540×960;
6. o render final, com música e efeitos;
7. o teste de loop, a folha de contato e o pôster.

## O filme 09-diretor (45 s, 1920×1080, 60 fps, 120 BPM)

> VAI DE LOKAL, "Compre onde quiser. A gente recebe pra você."
> Uma pessoa na correria nunca está em casa quando a entrega chega, não tem porteiro e vive pedindo favor, até comprar com o endereço de uma agência parceira. A agência recebe por ela e avisa no WhatsApp para ela retirar quando puder.

| Entrega | Arquivo |
|---|---|
| Filme | `resultados/09-diretor.mp4` |
| Teste de loop (duas voltas emendadas) | `out/09-diretor/teste-de-loop.mp4` |
| Pôster | `out/09-diretor/poster.png` |
| Folha de contato (um quadro por batida) | `out/09-diretor/folha-de-contato.png` |
| Guia de estilo, lista de planos, guia de animação | `docs/09-diretor/guia-de-estilo.md`, `docs/09-diretor/lista-de-planos.md`, `docs/09-diretor/GUIA-DE-ANIMACAO.md` |
| Registro de crítica | `docs/09-diretor/registro-de-critica.md` (diretor) e `docs/09-diretor/critica/cap1.md` … `cap4.md` (animadores) |

### Como ele é feito
- **`filmes/09-diretor/index.html`:** o motor. Junta os capítulos numa linha do tempo e cuida de:
  - o contêiner que nunca corta (molas);
  - a câmera, com faixas de cinema e câmera na mão no "antes" e respiração no "depois";
  - as legendas, o cursor, as deixas de som (`window.CUES`) e o desfoque de movimento (4 subquadros por quadro).
- **`filmes/09-diretor/capitulos/cap1.js` … `cap4.js`:** os quatro capítulos (P01–P19), escritos por quatro animadores (subagentes) com as mesmas regras.
- **`filmes/09-diretor/trilha.js`:** a trilha original, sintetizada em código (lá menor no "antes", dó maior depois da virada, anacruse em mi que puxa o loop).
- **`lib/motion.js`:** as molas fechadas (zeta 0,85), as curvas da marca e os traços que se desenham, compartilhados pelos filmes.
- **Interface real:**
  - `assets/09/`: capturado do site com o Playwright (`scripts/capturar_09.mjs`), com as medidas dos alvos em `medidas.json`;
  - `assets/09/app/`: prints do app e logos enviados pela marca, com dados de exemplo.
- **Loop:** o estado em t = 45 s é idêntico, pixel a pixel, ao de t = 0. A câmera na mão é periódica em 45 s, e o último quadro prepara o primeiro.

### Refazer do zero
```bash
node scripts/capturar_09.mjs
node render.mjs filmes/09-diretor/index.html --som --out filmes/09-diretor/audio/music.wav
python scripts/beats.py filmes/09-diretor/audio/music.wav filmes/09-diretor/beats.json
node render.mjs filmes/09-diretor/index.html --cues filmes/09-diretor/cues.json
node scripts/sfx.mjs filmes/09-diretor/cues.json filmes/09-diretor/audio/sfx.wav
node render.mjs filmes/09-diretor/index.html --sheet
node render.mjs filmes/09-diretor/index.html --param res=540 --param sub=1 --audio filmes/09-diretor/audio/music.wav --out .render-tmp/animatico.mp4
node render.mjs filmes/09-diretor/index.html --audio filmes/09-diretor/audio/music.wav --audio filmes/09-diretor/audio/sfx.wav --out resultados/09-diretor.mp4
```

Os comandos fazem, na ordem:
1. capturas reais do site;
2. trilha só de música, em -14 LUFS;
3. grade medida (batidas, tempos fortes, acertos);
4. deixas de som tiradas da linha do tempo do filme;
5. efeitos (click, pop, whoosh, thump, buzz, shutter);
6. folha de contato, um quadro por batida;
7. animático em 960×540;
8. render final, com música e efeitos mixados.

## A skill motion-reel

Tudo o que o estúdio faz está empacotado como skill do Claude Code em [.claude/skills/motion-reel](.claude/skills/motion-reel/SKILL.md). Ela é acionada por pedidos de vídeo de lançamento, showreel, reel de produto, explicativo animado ou anúncio em motion.

A pasta tem:
- o `render.mjs` e as molas (`lib/motion.js`);
- um modelo de filme genérico nos três formatos, com motor, ficha, trilha sintetizada e um capítulo de exemplo com loop exato;
- os scripts: `capturar.mjs`, `beats.py`, `sfx.mjs`, `folha.py` e `critica.py`;
- o prompt de crítica (`prompts/critica.txt`);
- as regras e modelos de documentos (`referencia/`).

## Ferramentas

| Arquivo | Para quê |
|---|---|
| `render.mjs` | Render (`--sheet`, `--frames`, `--som`, `--cues`, `--audio` repetível para mixar, `--param chave=valor`, `--formato`) |
| `scripts/beats.py` | Mede a trilha: batidas, tempos fortes e acertos (`beats.json` + `beats.js`) |
| `scripts/sfx.mjs` | Sintetiza os efeitos de interface a partir do `cues.json` |
| `scripts/folha.py` | Folha de quadros, prova de leitura a 360 px (`--celular`) e comparação de quadros (`--compara`) |
| `scripts/critica.py` | Materiais da crítica de um MP4: folha a 2 qps, tira de 12 quadros, teste de celular, trechos parados (agora também em vídeo vertical) |
| `scripts/entregas_11.sh` | Entregas do filme 11: teste de loop, folha de contato e pôster |
| `scripts/medir_batidas.py` | Medidor de grade dos filmes 01 a 07 |
| `scripts/capturar_site.mjs`, `capturar_guia.mjs`, `capturar_09.mjs` | Capturas reais com o Playwright |

## Os filmes

| Filme | Saída |
|---|---|
| 01 a 05 | `resultados/01-teste-cru.mp4` … `05-lancamento.mp4` |
| 06 (referência) | `resultados/06-referencia.mp4` |
| 07 (lista de estados, a partir do guia da marca) | `resultados/07-lista-de-estados.mp4` |
| 08 (som na batida, ninguém em casa) | `resultados/08-som-na-batida.mp4` |
| 09 (diretor, 45 s) | `resultados/09-diretor.mp4` |
| 10 (o 09 depois da crítica de diretor: cortinas da marca, gancho, telas do app em alta) | `resultados/10-depois-da-critica.mp4` (rodadas em `out/10-critica/` e `docs/09-diretor/registro-de-critica.md`) |
| 11 (tutorial de primeiro acesso, vertical, 60 s) | `resultados/tutorial-primeiro-acesso-vertical.mp4` |

A pasta `refs/` (vídeo de referência de terceiros) fica fora do Git e serve só para estudar a gramática.
