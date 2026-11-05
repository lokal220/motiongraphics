# Continuar daqui

## Estúdio de motion VAI DE LOKAL: filmes 10 e 11 (05/11/2026)

### Onde paramos

**O que foi entregue:**

| Filme | Arquivo | Situação |
|---|---|---|
| 11, tutorial de primeiro acesso | `resultados/tutorial-primeiro-acesso-vertical.mp4` | 60 s, 9:16 (1080×1920), -14 LUFS, loop exato. Já tem teste de loop, pôster e folha de contato em `out/` |
| 10 adaptado para Reels | `resultados/10-depois-da-critica-9x16.mp4` | O filme 10 (16:9) inteiro, centralizado num quadro 9:16, com faixas na cor tinta (#2A1F18). É uma adaptação rápida, não uma remontagem |
| Legenda do Instagram para o filme 10 | Está na conversa (repetida abaixo) | Pronta para colar |
| Direção e prompt da capa do filme 10 | Está na conversa (resumida abaixo) | Para gerar no ChatGPT |

- **Último commit:** `9037edb`, "Adiciona o filme 11, tutorial de primeiro acesso (VAI DE LOKAL, 60 s, 9:16)", na branch `main`.
- **O que está no ar:** nada.
  - O repositório `https://github.com/lokal220/motiongraphics` existe, mas está **vazio**: os 11 commits locais nunca foram enviados.
  - Os vídeos foram entregues como arquivo, e nenhum foi publicado.

### Pendências

**Esperam por você:**
1. **Decidir o push.** Os 11 commits da `main` só existem neste computador.
   - Trava: o push é você quem autoriza, e o `gh` não está logado (`gh auth login`).
   - Para não depender do pendrive, o ideal é fazer o push **antes** de trocar de PC.
2. **Decidir o commit dos 2 vídeos fora do Git:**
   - `resultados/10-depois-da-critica-9x16.mp4` (novo);
   - `resultados/06-referencia.mp4` (fica fora de propósito desde o começo).
   - Trava: a sua decisão.
3. **Assistir ao filme 11 e ao 10 em 9:16 e aprovar.** Trava: nenhuma.
4. **Gerar a capa do filme 10 no ChatGPT** com o prompt abaixo e pôr o título e a logo por cima (Canva ou editor do Instagram).
5. **Publicar o Reels** com a legenda abaixo.

**Esperam por mim:** nada em andamento. A remontagem do filme 10 em vertical "de verdade" foi **cancelada** a seu pedido.

**Regra salva na memória:** todo vídeo novo sai nos dois formatos, vertical 9:16 e horizontal 16:9 (veja `CLAUDE-MEMORIA/`).

### Datas e prazos
Nenhum prazo foi combinado para estes filmes nesta conversa.

### Links dos artefatos
- Guia Mestre Vai de Lokal (marca, tom, proibições; usado nos filmes 07 a 11): https://claude.ai/artifact/5fZTSQLrR5eG2UN1z9sgmC
- Vídeo do Tutorial Vai de Lokal (prévia anterior do tutorial, com roteiro e narração): https://claude.ai/artifact/LeDDZKcSSC1aNhg2EeyQLc
- Clipe Manda pra Lokal (roteiro de animação de outra conversa, a 129 BPM): https://claude.ai/artifact/9RD8i1dBHuWY3ChiYP6vA1
- Fila da LOKAL: https://claude.ai/artifact/2MpiMLwac8ySJCe1J4paJk

### Onde estão os arquivos importantes

| O quê | Onde |
|---|---|
| Regras do estúdio | `CLAUDE.md` |
| Visão geral, comandos para refazer cada filme e tabela dos filmes | `README.md` |
| Motor de render (quadro a quadro, mixagem, -14 LUFS) | `render.mjs` e `lib/motion.js` |
| Filmes (cada um com index.html, capítulos, trilha, grade e áudio) | `filmes/` (o 11 está em `filmes/11-tutorial-primeiro-acesso/`) |
| MP4 finais | `resultados/` |
| Teste de loop, pôster, folha e materiais de crítica | `out/` (o do 09 está em `out/09-diretor/`) |
| Documentos do filme 11 | `docs/guia-de-estilo.md`, `docs/lista-de-planos.md`, `docs/GUIA-DE-ANIMACAO.md`, `docs/registro-de-critica.md`, `docs/critica/` |
| Documentos dos filmes 09 e 10 | `docs/09-diretor/` |
| Telas do app, logos e inventário do site | `assets/telas/`, `assets/logo/`, `assets/site/`, `assets/fonts/` |
| Scripts (grade, efeitos, folhas, crítica, capturas, entregas) | `scripts/` |
| Skill motion-reel (o estúdio empacotado para o Claude Code) | `.claude/skills/motion-reel/` |
| Memória do Claude deste projeto | `CLAUDE-MEMORIA/` |
| Vídeo de referência de terceiros (fora do Git; vai só na cópia da pasta) | `refs/` |

### Passo a passo no PC novo
1. **Copie a pasta inteira, menos o descartável.** Pode pular:
   - `node_modules/` (45 MB), que o passo 3 refaz;
   - `.render-tmp/` (2,5 GB de quadros temporários).

   Copie `.git`, `refs/` e `resultados/`, que não estão no GitHub.
2. **Instale as ferramentas.** As versões que este PC usa:

   | Ferramenta | Versão | Como instalar |
   |---|---|---|
   | Git | 2.55 | `winget install Git.Git` |
   | Node.js | 24.19 (mínimo 20) | `winget install OpenJS.NodeJS` |
   | Python | 3.14 | `winget install Python.Python.3.14`; depois `pip install librosa numpy pillow scipy` (aqui: librosa 1.0.0, numpy 2.5.4, pillow 12.3.0, scipy 1.18.1) |
   | FFmpeg | 9.0.2 | `winget install Gyan.FFmpeg`. O `render.mjs` procura o `ffmpeg` no PATH, em `%LOCALAPPDATA%\Microsoft\WinGet\Links\ffmpeg.exe` ou na variável `FFMPEG` |
   | GitHub CLI | — | `winget install GitHub.cli` |
3. **Na pasta, rode `npm install`.** Ele instala o puppeteer 25 (que baixa o Chrome) e o playwright-core 1.64.
4. **Conecte o GitHub:** `gh auth login`, com a conta **lokal220**. O remoto é `https://github.com/lokal220/motiongraphics`.
5. **Instale o Claude** (app desktop, aba Code) e entre com a sua conta (hadassafs.comunicacao@gmail.com).
6. **Abra a conversa nesta pasta** (`MOTIONGRAPHICS (NÃO APAGAR)`). Se a pasta ficar num caminho diferente, a memória do Claude começa vazia: na primeira mensagem, peça para ele ler `CLAUDE-MEMORIA/`.
7. **Primeira mensagem:**

   > Leia o CONTINUAR-DAQUI.md, o README.md, o CLAUDE.md e os arquivos da pasta CLAUDE-MEMORIA e guarde essas memórias. Depois rode `node render.mjs filmes/11-tutorial-primeiro-acesso/index.html --frames 0,60` para conferir se o ambiente funciona, e me diga o que está pendente.

### Legenda do Instagram (filme 10)
```
Saiu para entrega. Ninguém em casa. Nova tentativa amanhã. Conhece essa história?

Sem porteiro, o vizinho viajando e a mãe do outro lado da cidade. Com a VAI DE LOKAL, você compra em qualquer loja online usando o endereço de uma agência parceira. A gente recebe a sua encomenda, registra com foto e te avisa no WhatsApp. Você retira quando puder, com QR Code, sem pedir favor a ninguém.

Compre onde quiser. A gente recebe pra você.

Crie sua conta em vaidelokal.com.br (link na bio).

#vaidelokal #comprasonline #encomendas #bh
```

### Capa do filme 10 (resumo)
- **Imagem:** ilustração em traço fino marrom-escuro (#2A1F18) sobre creme (#F5F3F0): a porta fechada de um prédio, uma caixa sem marca sozinha na frente e o interfone tocando, com uma etiqueta laranja (#EA6E1A) na caixa.
- **Composição:** o terço de cima vazio, para o título. Peça ao ChatGPT **sem texto e sem logo**.
- **Título por cima:** "Ninguém em casa / de novo?", em DM Sans ExtraBold, com "de novo?" em laranja, e a logo real pequena embaixo.
