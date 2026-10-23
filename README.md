# Estúdio de motion: VAI DE LOKAL

Filmes de motion graphics feitos em código. Cada filme é uma página HTML com um canvas, e `window.seek(t)` desenha o quadro do instante t (função pura do tempo). O `render.mjs` grava quadro a quadro com o Chrome sem janela e codifica em H.264 yuv420p, CRF 16, com o som em -14 LUFS.

As regras do estúdio estão em [CLAUDE.md](CLAUDE.md).

## O filme 09-diretor (45 s, 1920×1080, 60 fps, 120 BPM)

> VAI DE LOKAL, "Compre onde quiser. A gente recebe pra você."
> Uma pessoa na correria nunca está em casa quando a entrega chega, não tem porteiro e vive pedindo favor, até comprar com o endereço de uma agência parceira. A agência recebe por ela e avisa no WhatsApp para ela retirar quando puder.

| Entrega | Arquivo |
|---|---|
| Filme | `resultados/09-diretor.mp4` |
| Teste de loop (duas voltas emendadas) | `out/teste-de-loop.mp4` |
| Pôster | `out/poster.png` |
| Folha de contato (um quadro por batida) | `out/folha-de-contato.png` |
| Guia de estilo, lista de planos, guia de animação | `docs/guia-de-estilo.md`, `docs/lista-de-planos.md`, `docs/GUIA-DE-ANIMACAO.md` |
| Registro de crítica | `docs/registro-de-critica.md` (diretor) e `docs/critica/cap1.md` … `cap4.md` (animadores) |

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

## Ferramentas

| Arquivo | Para quê |
|---|---|
| `render.mjs` | Render (`--sheet`, `--frames`, `--som`, `--cues`, `--audio` repetível para mixar, `--param chave=valor`, `--formato`) |
| `scripts/beats.py` | Mede a trilha: batidas, tempos fortes e acertos (`beats.json` + `beats.js`) |
| `scripts/sfx.mjs` | Sintetiza os efeitos de interface a partir do `cues.json` |
| `scripts/folha.py` | Folha de quadros, prova de leitura a 360 px (`--celular`) e comparação de quadros (`--compara`) |
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
| 10 (o 09 depois da crítica de diretor: cortinas da marca, gancho, telas do app em alta) | `resultados/10-depois-da-critica.mp4` (rodadas em `out/10-critica/` e `docs/registro-de-critica.md`) |

A pasta `refs/` (vídeo de referência de terceiros) fica fora do Git e serve só para estudar a gramática.
