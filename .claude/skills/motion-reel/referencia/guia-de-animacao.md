# Guia de animação: o contrato do motor (motion-reel)

O filme é `filmes/<filme>/index.html`, o motor, que não se edita, mais quatro coisas que você escreve:
- `filme.js`: a ficha (marca, BPM, duração, formatos, virada);
- `trilha.js`: a música;
- `capitulos/capN.js`: um capítulo por bloco do roteiro;
- `beats.js`: gerado pelo `beats.py`.

Com subagentes, cada um edita só o seu `capN.js` e o seu `docs/critica/capN.md`.

## A ficha (`filme.js`)
- `bpm` e `batidas` (duração = batidas × 60 / bpm; múltiplo de 4 fecha o compasso).
- `formatos` (16:9, 9:16, 1:1), cada um com sua área segura.
- `cor`: TINTA, TINTA2, LINHA, CLARO, APAGADO, DESTAQUE, DESTAQUE_ESCURO, DESTAQUE_CLARO, BRANCO, OK, FUNDO, FUNDO_ANTES.
- `fonte` (TITULO, UI, MONO), `tam` (LEG, UI, MONO, TITULO, TRACO).
- `virada` e `retorno` (opcionais: o "antes" com faixas de cinema e câmera na mão).
- `trilha`: progressão, acentos e o fim.

## A API (`F`)

| Nome | O que é |
|---|---|
| `F.TB(n)` | Tempo, em segundos, da batida n na grade **medida** (aceita frações). Nunca use `n * 60 / bpm`. |
| `F.hit(t)` | O acerto medido mais perto (o motor já usa nas deixas) |
| `F.W0`, `F.H0`, `F.formato`, `F.seguro` | O espaço de desenho do formato atual (ex.: 1080×1920 no vertical) e as margens seguras |
| `F.porFormato({horizontal, vertical, quadrado})` | O valor do formato atual: use nos estados e nas posições |
| `F.cor`, `F.fonte`, `F.tam` | Da ficha |
| `F.M` | `lib/motion.js`: `step`, `impulse`, `track`, `prog`, `lerp`, `clamp`, `easeOut`, `easeIn`, `easeInOut`, `confirm`, `mixHex`, `mulberry32`, `path`, `arcPts`, `rrPts`, `along` |
| `F.container(t)`, `F.camera(t)`, `F.cursorPos(t)`, `F.antes(t)` | O estado do motor num instante (para desenhos que acompanham) |

## O capítulo

```js
F.registra({
  nome: 'Capítulo 1',
  inicial: 'abertura',                         // só o primeiro capítulo: o estado do primeiro (e do último) quadro
  planos: [{ id: 'P01', de: 0, ate: 4, chave: [0.5, 2] }],             // batidas; chave = quadros de revisão
  estados: { abertura: { cx, cy, w, h, r, cor: 0, sombra: 1, whoosh: 1 } },   // cor 0 branco / 1 destaque
  morphs: [[4, 'botao'], [16, 'cartela', 2.6]],   // [batida, estado, mola em Hz]: cada um é uma transformação (whoosh automático)
  conteudo: [{ de: 0, ate: 4, atraso: -1, saida: false, desenha(ctx, t, a) {} }],  // dentro do contêiner, origem no centro dele
  fundo: [], frente: [],                          // atrás / à frente do contêiner, espaço da cena
  legendas: [{ de: 12, ate: 16, linhas: ['Frase.'], estilo: 'pilula' }],   // 'pilula' | 'faixa' | 'grande'; linha {txt, em}
  cursor: { moves: [[5, [x, y], 2.4]], cliques: [6] },                    // [batida em que SAI, alvo, mola]
  camera: [[8, { z: 1.03, x, y }, 0.4]],
  deixas: [{ beat: 16, tipo: 'thump' }, { beat: 6, tipo: 'pop', pan: 0.3 }],   // pop | buzz | shutter | thump | whoosh extra
  ativos: { tela: '../../assets/site/tela.png' },
});
```

- **Entrada e saída do conteúdo:** entra 0,12 s depois de `TB(de)` (mude com `atraso`) e sai sozinho a partir de `TB(ate)`, em 0,12 s, com opacidade e escala de 97%. **Faça o `ate` igual à batida do próximo morph.** Com `saida: false`, quem controla a saída é você.
- **O argumento `a` de `desenha`:**
  - `a.t0`, `a.t1`, `a.k` (visibilidade de saída) e `a.c` (o contêiner agora);
  - `a.pen(cor, largura)` e `a.path(pts, p, fechado)`: traço que se desenha até a fração p;
  - `a.fill(x, y, w, h, r, cor)`;
  - `a.texto(s, x, y, tamanho, {peso, cor, alinha, mono, ui})`;
  - `a.sobe(t, t0, t1, s, x, y, tamanho, opts)`: texto que entra e sai pela máscara;
  - `a.img(nome, x, y, largura, [sx, sy, sw, sh])`: imagem real recortada, com o recorte em px do arquivo;
  - `a.pin(x, y, escala, cor)`;
  - `a.entra(t, t0, i, d)`: cascata.
- **Coordenadas:** o conteúdo usa a origem no centro do contêiner. Fundo e frente usam o espaço da cena (`F.W0` × `F.H0`, antes da câmera). As legendas usam o espaço da tela, dentro da área segura.

## Regras de tempo
1. Toda mudança de estado começa numa batida inteira. Momento grande cai em tempo forte (múltiplo de 4).
2. O motor põe click em todo clique e whoosh em todo morph; o resto vai nas `deixas`. Se uma deixa não tiver um acerto da trilha embaixo, acerte a trilha.
3. **Texto dentro do contêiner:** entra depois que a transformação começa e sai antes da próxima (`TB(ate) - 0.26`).
4. **Cursor:** sai 1 batida antes do clique, com a ponta no quarto inferior direito do alvo.
5. Uma recompensa visual nova a cada 3 a 5 s.

## Contrato do loop
- **Primeiro quadro:**
  - contêiner no estado `inicial`;
  - conteúdo de abertura inteiro e parado, com `atraso: -1`;
  - sem cursor e sem legenda.
- **Fim do filme:**
  - um morph de volta para a geometria inicial;
  - a abertura redesenhada na pose de t = 0, com o traço chegando inteiro antes do fim;
  - o cursor fora do quadro;
  - a câmera em `{ z: 1 }` com mola firme (2,6 Hz).
- **Conferência:** `render.mjs --frames 0,<duração>` mais `folha.py --compara` dão 0 pixels diferentes. O exemplo em `modelo/capitulos/cap1.js` faz tudo isso, com a cortina na volta.

## Revisão
```bash
node render.mjs filmes/<filme>/index.html --frames 1.2,2.4 --param guia=1 --param sub=1
node render.mjs filmes/<filme>/index.html --frames 1.2 --formato vertical
python scripts/folha.py .render-tmp/<filme>/folha.png <pngs> [--celular]
python scripts/folha.py --compara a.png b.png
```

O loop de crítica, plano a plano, está em `prompts/critica.txt` (parte A).

## Divisão em subagentes (filmes longos)
- **Antes de abrir os subagentes:** escreva os estados, as batidas dos morphs, os cliques, as legendas e as deixas de cada capítulo (a decupagem). O motor, a trilha e a grade medida ficam prontos.
- **Cada subagente:**
  - lê o `CLAUDE.md`, os docs do filme e este guia;
  - desenha só o seu capítulo;
  - roda a parte A da crítica e registra as rodadas;
  - não toca no motor nem em outro capítulo;
  - não faz commit nem render completo.
- **Pastas temporárias:** separe uma por subagente (`.render-tmp/<filme>/capN/`). Num lugar compartilhado, um sobrescreve o outro.
- **Passagens entre capítulos:** por exemplo, a pilha do capítulo 2 que a virada do capítulo 3 desfaz. O capítulo exporta um desenho em `F.<nome>`, e o seguinte o assume.
