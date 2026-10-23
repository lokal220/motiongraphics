# Guia de animação: como programar um capítulo do 09-diretor

Leia antes:
- `docs/guia-de-estilo.md`: o como, a marca e a referência.
- `docs/lista-de-planos.md`: o quê, plano a plano.
- `CLAUDE.md`: as regras do estúdio.

Este guia é o contrato técnico para os quatro capítulos saírem com a mão de uma pessoa só.

## 1. O que é seu e o que não é

| Capítulo | Planos | Batidas | Arquivo seu | Registro de crítica seu |
|---|---|---|---|---|
| 1. Gancho e correria | P01–P05 | 0–24 | `filmes/09-diretor/capitulos/cap1.js` | `docs/critica/cap1.md` |
| 2. Os favores | P06–P10 | 24–44 | `.../cap2.js` | `docs/critica/cap2.md` |
| 3. A virada e o endereço | P11–P13 | 44–64 | `.../cap3.js` | `docs/critica/cap3.md` |
| 4. A agência recebe e o fim | P14–P19 | 64–90 | `.../cap4.js` | `docs/critica/cap4.md` |

- **Você só edita o seu `capN.js` e o seu `docs/critica/capN.md`.**
- **Não edite** `index.html` (o motor), `lib/motion.js`, `trilha.js`, `beats.*`, `render.mjs`, os scripts, os assets nem o capítulo de outra pessoa.
- Precisa de algo do motor? Escreva no fim do seu registro de crítica, numa seção "Pedidos ao diretor".
- Não faça commit.

## 2. O motor e a API

O filme é `filmes/09-diretor/index.html`, um canvas. `window.seek(t)` desenha o quadro do instante t. Cada capítulo é um script clássico que chama `F.registra({...})`.

### Constantes e funções em `F`

| Nome | O que é |
|---|---|
| `F.TB(n)` | Tempo, em segundos, da **batida n** na grade medida (aceita frações: `F.TB(12.5)`). Use sempre isto, nunca `n * 0.5`. |
| `F.hit(t)` | O acerto medido mais perto de t (o motor já usa nas deixas) |
| `F.cor` | `INK #2A1F18`, `INK2 #6B5C4E`, `LINE #CFC6BD`, `LIGHT #F1EDE9`, `ROAD #EEE9E3`, `MUTED #B5AA9F`, `OR #EA6E1A`, `OR_ESCURO #C05810`, `PESSEGO #FFF0E8`, `WHITE`, `VERDE #137456` |
| `F.tam` | `LEG 84` (legenda/notificação), `UI 68` (texto de interface desenhado), `MONO 64`, `ASS 96` (assinatura), `TRACO 6` (espessura do traço) |
| `F.fonte` | `SANS` (DM Sans) e `MONO` (DM Mono) |
| `F.M` | `lib/motion.js`: `step`, `impulse`, `track`, `prog`, `lerp`, `clamp`, `easeOut`, `easeIn`, `easeInOut`, `confirm`, `mixHex`, `mulberry32`, `path`, `arcPts`, `rrPts`, `along` |
| `F.img[nome]` | As imagens que os capítulos declaram em `ativos` |
| `F.VIRADA` (44), `F.RETORNO` (88) | As duas viradas globais: as faixas de cinema e a câmera na mão somem na 44 e voltam na 88 (o motor cuida disso) |

### O objeto do capítulo

```js
F.registra({
  nome: 'Capítulo 1: gancho e correria',
  planos: [{ id: 'P01', de: 0, ate: 4, chave: [0.5, 1.5, 2.5, 3.5] }],    // batidas; chave = quadros de revisão
  inicial: 'c1_gancho',            // só o capítulo 1: o estado do primeiro (e do último) quadro
  estados: { c1_gancho: { cx: 960, cy: 525, w: 1600, h: 620, r: 36 } },   // cor: 0 branco / 1 laranja; sombra 0..1; whoosh: ganho
  morphs: [[4, 'c1_notif1'], [16, 'c1_rua', 1.6]],     // [batida, estado, mola em Hz]: cada uma é uma transformação (whoosh automático)
  conteudo: [{ de: 0, ate: 4, desenha(ctx, t, a) { ... } }],   // dentro do contêiner; origem no CENTRO dele; recortado pela forma
  fundo: [{ de: 4, ate: 8, desenha(ctx, t, a) { ... } }],      // atrás do contêiner, espaço da cena (1920x1080)
  frente: [{ de: 16, ate: 24, desenha(ctx, t, a) { ... } }],   // à frente do contêiner, espaço da cena
  legendas: [{ de: 25, ate: 28, linhas: ['Sem porteiro.'], estilo: 'faixa' }],   // 'faixa' | 'pilula' | 'grande'; linha {txt, em: batida}
  cursor: { moves: [[5, [1290, 380]], [9.5, [1500, 640], 2.2]], cliques: [6, 10] },   // [batida em que SAI, alvo, mola]
  camera: [[0, { z: 1.05 }, 0.12], [16, { z: 1, x: 960, y: 525 }, 0.8]],     // enquadramento por molas (z, x, y da cena)
  deixas: [{ beat: 2, tipo: 'buzz' }, { beat: 2, tipo: 'pop', pan: 0.4 }],   // pop | buzz | shutter | thump | whoosh extra
  ativos: { endereco: '../../assets/09/app/app-endereco.jpg' },
});
```

- **`de`/`ate` em batidas.**
  - O conteúdo entra 0,12 s depois de `TB(de)` (o `atraso`, que pode mudar) e sai sozinho em 0,12 s a partir de `TB(ate)`: opacidade com escala de 97%. Para controlar a saída você mesmo, use `saida: false`.
  - **A saída precisa começar no instante da transformação seguinte.** Faça o `ate` do conteúdo igual à batida do próximo morph.
- **O argumento `a`** de `desenha` (a API de desenho) tem:
  - `a.t0`, `a.t1` (início e fim em segundos), `a.k` (visibilidade de saída) e `a.c` (o contêiner agora: `cx`, `cy`, `w`, `h`, `r`, `box`).
  - `a.pen(cor, largura)` e `a.path(pts, p, fechado)`: traço que se desenha até a fração p.
  - `a.fill(x, y, w, h, r, cor)`.
  - `a.texto(s, x, y, tamanho, {peso, cor, alinha, mono})`.
  - `a.sobe(t, t0, t1, s, x, y, tamanho, opts)`: texto que entra subindo pela máscara e sai subindo.
  - `a.img(nome, x, y, largura, [sx, sy, sw, sh])`: imagem real, recortada.
  - `a.pin(x, y, escala, cor)`: o pin do logo, com a ponta em (x, y).
  - `a.entra(t, t0, i, d)`: progresso 0..1 do elemento i, em cascata.
  - Para curvas e molas, use `F.M`.
- **Coordenadas:**
  - **conteúdo** em px da cena, com a origem no centro do contêiner;
  - **fundo/frente** em px da cena (1920×1080, antes da câmera);
  - **legendas** em px da tela.
  - No "antes", as faixas de cinema cobrem y < 120 e y > 930: **a área útil vai de 120 a 930**.

## 3. Regras de tempo

1. **Toda mudança de estado começa numa batida inteira** (`F.TB(n)`). **Momento grande** (virada, logo, botão final) cai num **tempo forte** (múltiplo de 4).
2. **O efeito cai no acerto:**
   - o motor já põe click em todo clique e whoosh em todo morph;
   - você acrescenta pop, buzz, shutter ou thump em `deixas`, com a batida do evento.
3. **Texto dentro do contêiner que se transforma:** entra depois que a transformação começa e sai antes da próxima. Saída de título em `TB(ate) - 0.26`.
4. **Cursor:**
   - sai pelo menos **1 batida antes** do clique, para chegar parado;
   - mira **à direita e abaixo do rótulo** (a ponta no quarto inferior direito do botão), para a seta não cobrir o texto.
   - **Use `mola` 2,2 a 2,6** em movimentos curtos.
5. **Uma recompensa visual nova a cada 3 a 5 s, e nada parado por mais de 2 s.**
6. **Nada é aleatório nem guarda estado:**
   - `F.M.mulberry32(semente)` com semente fixa, criado **dentro** do `desenha` ou como tabela pré-calculada no carregamento;
   - nunca `Math.random`, `setTimeout`, `requestAnimationFrame`, `Date` ou estado que muda entre quadros.
   - O `render.mjs` para o render se achar algum deles.

## 4. Regras de estilo (o que a crítica cobra)

- **Traço:**
  - `F.tam.TRACO` (6 px), pontas e cantos arredondados (`a.pen`), em tinta;
  - **o laranja só depois da batida 44**, e só no que aponta: pin, anel, palavra-chave, rota tracejada.
  - Linhas finas de apoio (ruas, grades) em `ROAD`/`LINE`, com espessura de 4 a 10.
- **O desenho entra se desenhando** (`a.path` com `a.entra`) ou subindo por máscara. **Nunca entrando por fade.** Saída curta, e só ela pode usar opacidade.
- **Texto:**
  - no máximo **dois tamanhos por quadro**;
  - legenda e notificação em 84 px; texto de interface desenhado em 68 px; ID e código em DM Mono 64;
  - **frase curta: precisa ser lida a 360 px de largura.**
- **Interface real:**
  - só `assets/09/` (site) e `assets/09/app/` (prints do app);
  - **recorte e amplie** até o texto-chave ter 56 px ou mais;
  - **não redesenhe, não troque texto, não invente estado** (nada de "Copiado": o toque é o botão afundando com `impulse` e o anel laranja);
  - as medidas dos alvos, em px do arquivo, estão em `assets/09/medidas.json`.
- **Pessoas:**
  - em traço, **sem rosto**: mão, costas, silhueta, bolso;
  - nada fofo, sem mascote, sem olhos em objeto.
  - **Entregador, carro e caixa sem nenhuma marca.**
- **Proibido:** brilho/glow, gradiente em interface, texto centralizado sobre gradiente, explosão de partículas, quique (mola com zeta < 0,85 ou `confirm` fora de confirmação), etiquetas nos cantos, moldura no quadro e emoji.
- **Profundidade:**
  - no máximo duas camadas de paralaxe (primeiro plano e fundo);
  - sombra macia só no contêiner (o motor já desenha);
  - o primeiro plano passa mais rápido.

## 5. O contrato do loop (capítulos 1 e 4)

- **O primeiro quadro (t = 0):**
  - contêiner no estado `inicial` do capítulo 1;
  - conteúdo do P01 **já desenhado por inteiro** (nada se desenhando em t = 0);
  - sem cursor e sem legenda.
- **O capítulo 1 exporta `F.gancho = (ctx, t, a) => {...}`**, o desenho do conteúdo do P01, para o capítulo 4 reaproveitar.
- **O capítulo 4:**
  - faz o morph `[88, 'c1_gancho', 2.6]` (mola firme, assenta no alvo exato);
  - desenha o `F.gancho` entrando por traço a partir da batida 88, **chegando inteiro e parado no último quadro**, igual ao t = 0;
  - leva o cursor para fora do quadro (`[87, [2060, 1220], 2.6]`);
  - deixa a câmera em `{ z: 1, x: 960, y: 540 }` até a 88.
- **Conferência:** o estado em t = 45 s tem que ser idêntico ao de t = 0. Rode `--frames 0,45` e compare os dois (seção 6): 0 pixels diferentes.
  - O último quadro (44,983 s) fica **um quadro antes**. Ele difere só pelo passo da câmera na mão, que é periódica em 45 s. É isso que faz a emenda não ter salto.

## 6. Como revisar o seu trabalho

```bash
# quadros soltos (saem em .render-tmp/09-diretor/tNN.NN.png); guia=1 escreve o plano e o tempo no canto
node render.mjs filmes/09-diretor/index.html --frames 0.5,1.5,2.5 --param guia=1 --param sub=1
# folha dos quadros + a mesma folha no tamanho de um celular (360 px de largura por quadro)
python scripts/folha.py .render-tmp/09-diretor/cap1-rodada1.png .render-tmp/09-diretor/t00.50.png .render-tmp/09-diretor/t01.50.png --celular
# comparar dois quadros (loop)
python scripts/folha.py --compara .render-tmp/09-diretor/t00.00.png .render-tmp/09-diretor/t45.00.png
```

- **OLHE as imagens** (Read no PNG) a cada rodada.
- Para julgar movimento e sincronia, renderize uma tira: 6 a 10 quadros a cada 0,05–0,1 s em volta das transformações e dos cliques.
- **Evite `sub=1` só no julgamento de acabamento:** o render final usa 4 subquadros.

## 7. O loop de crítica (todo plano, no mínimo 3 rodadas)

Para cada plano:
1. Renderize de 3 a 5 quadros.
2. Dê nota de 1 a 10 em:
   - **gancho** (o plano prende nos primeiros instantes?);
   - **leitura a 360 px** (abra a folha `--celular`);
   - **movimento**;
   - **composição**;
   - **profundidade**;
   - **sincronia do som** (a mudança cai na batida? o clique no acerto?);
   - **acabamento**.
3. Registre as notas e os **3 maiores problemas** em `docs/critica/capN.md`, neste formato:

```markdown
## P03: trabalho
### Rodada 1
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 6 | 7 | 8 | 6 | 8 | 7 |
Problemas: 1) ... 2) ... 3) ...
Correções: ...
```

4. Corrija os 3 piores e repita **até toda nota ser 8 ou mais**, no mínimo 3 rodadas por plano, mesmo que a primeira já passe.
5. Termine com um resumo:
   - as notas finais de cada plano;
   - os quadros-chave (tempos) para a folha de contato do diretor;
   - pedidos ao motor, se houver.
