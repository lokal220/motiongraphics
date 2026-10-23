---
name: motion-reel
description: Faz um vídeo de produto ou showreel em motion graphics renderizado a partir de código. Use quando
  o usuário pedir vídeo de lançamento, showreel, reel de produto, explicativo animado ou anúncio em motion.
---

# Motion reel

Um filme é uma página HTML com um canvas. `window.seek(t)` desenha o quadro do instante t (função pura do tempo). O `render.mjs` grava quadro a quadro com o Chrome sem janela, mixa música e efeitos em -14 LUFS e codifica em H.264.

Tudo o que é citado abaixo está na pasta desta skill, chamada aqui de `<skill>`: o diretório base que aparece quando a skill carrega; neste projeto, `.claude/skills/motion-reel`.

| Na skill | O que é |
|---|---|
| `render.mjs` | O render (`--frames`, `--sheet`, `--som`, `--cues`, `--audio` repetível para mixar, `--formato`, `--param`) |
| `lib/motion.js` | As molas fechadas (zeta 0,85, sem quique), as curvas e os traços que se desenham |
| `modelo/` | Um filme pronto para copiar: `index.html` (o motor, não se edita), `filme.js` (a ficha), `trilha.js` (a música sintetizada), `capitulos/cap1.js` (um exemplo que usa cada recurso nos 3 formatos) |
| `scripts/capturar.mjs` | Coleta os materiais reais do site com o Playwright: inventário, originais e peças por seletor |
| `scripts/beats.py` | Mede a trilha: batidas, tempos fortes e acertos → `beats.json` + `beats.js` |
| `scripts/sfx.mjs` | Sintetiza os efeitos (click, pop, whoosh, thump, buzz, shutter) a partir do `cues.json` |
| `scripts/folha.py` | Folhas de quadros, prova a 360 px (`--celular`) e comparação de quadros (`--compara`) |
| `scripts/critica.py` | Os materiais da crítica de um MP4: folha a 2 qps, tira de 12 quadros, teste de celular, batidas paradas |
| `prompts/critica.txt` | O prompt de crítica: de plano (A) e de diretor (B) |
| `referencia/regras-do-estudio.md` | As regras duras e as armadilhas que já custaram rodadas |
| `referencia/guia-de-animacao.md` | O contrato do motor (a API `F`), o loop e a divisão em subagentes |
| `referencia/modelos.md` | Modelos de guia de estilo, lista de planos, registro de crítica e README |

## Entradas pra coletar primeiro
Pergunte de uma vez só o que faltar:
- produto + URL;
- duração;
- formatos (9:16 / 1:1 / 16:9);
- cores e fontes da marca;
- uma referência (quadro, vídeo ou pasta de imagens);
- música (arquivo ou "sintetizar").

O que o site não mostra, como as telas do app logado, precisa vir em prints do usuário com dados de exemplo, **salvos como arquivo**: imagem colada na conversa não chega ao disco.

## Pipeline

### 0. Preparar o projeto (só o que faltar)
- **Copiar os arquivos:**
  - `render.mjs` e as pastas `lib/` e `scripts/` da skill para a raiz do projeto;
  - `modelo/` para `filmes/<nome>/`.
- **Regras:** se o projeto não tiver `CLAUDE.md` com regras de render, siga `<skill>/referencia/regras-do-estudio.md` e ofereça copiá-lo como `CLAUDE.md`.
- **Requisitos:** Node 20+, `npm i -D puppeteer playwright-core`, ffmpeg, e Python com `librosa numpy pillow`. Se faltar algo, diga o quê e instale com o OK do usuário.

### 1. Coletar os materiais da URL com Playwright em ./assets
```bash
node scripts/capturar.mjs <url> assets
node scripts/capturar.mjs <url> assets --pecas pecas.json
```
- **O primeiro comando faz o inventário:**
  - a página inteira no desktop e no celular;
  - os originais de logo, ícone, compartilhamento e telas;
  - as cores, as fontes e as seções;
  - tudo em `assets/inventario.json`.
- **O segundo captura as peças reais por seletor,** a 3×, com as medidas dos alvos.
- **Liste para o usuário o que achou:** logo (tamanho em px), telas do produto, cores, fontes e seções. Diga também o que falta: logo pequeno demais para a cartela, tela que só existe no app.
- **Fontes:** o inventário lista os arquivos; baixe só com o OK do usuário.

### 2. Se existe referência, escrever docs/guia-de-estilo.md a partir dela
- Extraia um quadro a cada 0,5 s com o ffmpeg e meça cores, cortes e tamanhos.
- Descreva a gramática, nunca o conteúdo (`referencia/modelos.md`). Inclua a tabela de conflitos com as regras.
- Vídeo de terceiros fica em `refs/`, fora do Git.

### 3. Medir ou sintetizar a música
- **Sintetizar:** edite `filmes/<nome>/trilha.js` (o arranjo usa `FILME.trilha`: progressão, acentos e o fim em anacruse para loop) e exporte:
  `node render.mjs filmes/<nome>/index.html --som --out filmes/<nome>/audio/music.wav`.
- **Arquivo do usuário:** copie para `filmes/<nome>/audio/music.wav`.
- Nos dois casos:
  `python scripts/beats.py filmes/<nome>/audio/music.wav filmes/<nome>/beats.json --bpm <bpm>`.
  Ele também grava o `beats.js` que o filme lê.

### 4. Escrever docs/lista-de-planos.md na grade de batidas. Mostrar e esperar o OK
- Todo plano tem quadros, câmera, texto e efeito sonoro (`referencia/modelos.md`).
- **Mudanças de estado em batidas, momentos grandes em tempos fortes.**
- Inclua as decisões que dependem do usuário, cada uma com um padrão.
- **Não escreva código antes do OK.** Se o usuário der um prazo ("se eu não responder em 10 min"), conte o prazo em segundo plano e siga com os padrões.

### 5. Construir o filme com window.seek(t) e as molas de lib/motion.js. Seguir o CLAUDE.md
- **Ficha:** em `filme.js`, defina cores, fontes, BPM, batidas, formatos e virada/retorno.
- **Capítulos:** escreva `capitulos/capN.js` com `F.registra({...})`, seguindo `referencia/guia-de-animacao.md`. O exemplo `cap1.js` mostra:
  - estados por formato;
  - morphs, traço e texto pela máscara;
  - clique do cursor;
  - cortina de cor;
  - volta exata ao primeiro quadro.
- **Imagens reais:** registre em `ativos` e recorte com `a.img`.
- **Filme longo:** divida por capítulos entre subagentes, depois de deixar prontos o motor, a trilha medida e a decupagem (seção final do guia de animação).

### 6. Folha de contato → crítica (prompts/critica.txt) → correção, no mínimo 3 rodadas
```bash
node render.mjs filmes/<nome>/index.html --sheet
node render.mjs filmes/<nome>/index.html --param escala=0.5 --param sub=1 --audio filmes/<nome>/audio/music.wav --out .render-tmp/animatico.mp4
python scripts/critica.py <video.mp4> out/critica/rN --beats filmes/<nome>/beats.json
```
- O primeiro comando gera a folha, um quadro por batida.
- O segundo gera o animático com a música, para acertar o ritmo.
- O terceiro gera os materiais da crítica de diretor de um vídeo.
- **Abra as imagens e olhe de verdade.**
  - Parte A do prompt: plano a plano, no mínimo 3 rodadas.
  - Parte B: o filme inteiro.
- **Em cada rodada:** notas numa tabela, os 3 maiores problemas com o tempo exato, correção e render só dos segundos afetados. Repita até toda nota ser 8 ou mais.
- Registre tudo em `docs/registro-de-critica.md`.

### 7. Render, efeitos e mixagem em -14 LUFS → out/final.mp4, em todos os formatos
Para cada formato (`--formato vertical | quadrado`; sem ele, o padrão da ficha):
```bash
node render.mjs filmes/<nome>/index.html --cues filmes/<nome>/cues.json
node scripts/sfx.mjs filmes/<nome>/cues.json filmes/<nome>/audio/sfx.wav
node render.mjs filmes/<nome>/index.html --audio filmes/<nome>/audio/music.wav --audio filmes/<nome>/audio/sfx.wav --out out/final.mp4
```
- **Nos outros formatos:** acrescente `--formato vertical` nos três comandos e troque os nomes para `cues-vertical.json`, `sfx-vertical.wav` e `out/final-vertical.mp4`.
- **Confira no MP4:**
  - `ffprobe`: H.264 yuv420p, 60 fps, a duração certa;
  - CRF 16;
  - `ebur128`: -14 LUFS;
  - as deixas nos acertos;
  - se houver loop, `--frames 0,<duração>` mais `folha.py --compara` dá 0 pixels diferentes.

### 8. Entregar final.mp4, folha-de-contato.png e poster.png. Dizer o que melhoraria em seguida
- **Folha:** `out/folha-de-contato.png`, cópia de `.render-tmp/<nome>/folha.png` gerada pelo `--sheet`.
- **Pôster:** `out/poster.png`, o quadro mais forte, por `--frames`.
- **Se o filme for em loop:** `out/teste-de-loop.mp4`, duas voltas emendadas com o concat do ffmpeg.
- **Mensagem final:** feche com as notas finais e o que você melhoraria em seguida.

## Regras duras
- **Só interface real do produto:** nunca invente tela, texto nem estado. O que não existe no site vem em print do usuário. Captura pequena que ficaria borrada também pede print em alta.
- **No modo de render:** sem `Math.random`, sem timers, sem transições de CSS. Ruído com semente.
- **Proibido:**
  - etiquetas nos cantos;
  - título centralizado em gradiente;
  - tudo entrando com fade;
  - brilho, molduras, partículas;
  - easing quicando;
  - deslizar em velocidade constante.
- **Uma cor de destaque,** uma fonte de título e uma de interface, no máximo dois tamanhos de texto por quadro. Legível a 360 px de largura.
- **Som:** sintetizado em código ou do usuário, medido antes de animar, efeitos nos acertos, -14 LUFS.
- **Commit e push** só quando o usuário pedir.
