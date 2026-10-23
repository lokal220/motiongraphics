# Guia de estilo: a gramática da referência

**Referência:** vídeo de lançamento de um app para Mac, publicado no X ([link](https://x.com/nerdynikhil/status/2112637201033138656)).
Baixado em `refs/referencia.mp4`: 70,5 s, 1920×1080, 60 fps, com áudio. Há 141 quadros em `refs/frames/`, um a cada 0,5 s (`q000.jpg` = 0,0 s, `q001.jpg` = 0,5 s…).

Este guia descreve **como** a referência conta, não **o que** ela conta. Não vamos usar nada do conteúdo dela: nem o computador antigo, nem o campo, nem o app, os ícones, os textos ou a marca. Os números marcados "medido" saíram dos quadros, com o ffmpeg ou analisando os pixels. Os marcados "estimado" vêm da observação.

---

## 1. Estrutura em atos

| Ato | Tempo | Duração | O que acontece (a gramática) |
|---|---|---|---|
| 1. O problema, em tom de cinema | 0,0–22,3 s | 22,3 s (32%) | Um único plano longo e contínuo: um objeto num cenário, a câmera empurrando devagar até a tela dele ocupar o quadro. Faixas pretas de cinema. A narração vira legenda. Dentro da tela, o problema se acumula em camadas (janelas se empilhando). |
| Virada | 18,0–22,5 s | ≈ 4 s | As camadas do problema se dissolvem, a tela fica vazia e limpa, o ícone do produto aparece no centro e tudo estoura em claro. As faixas pretas somem. |
| 2. O produto, em estúdio | 22,5–50,4 s | 27,9 s (40%) | O aparelho sobre fundo claro e liso. Na tela, a interface real, e um destaque que **pula de elemento em elemento** a cada verbo da narração. A câmera "respira" (aproxima e afasta de leve). |
| Pausa | 50,4–52,8 s | 2,4 s (3%) | Corte seco para preto. Uma frase curta, palavra por palavra. É o único respiro do filme. |
| 3. Fechamento do produto | 52,8–57,0 s | 4,2 s (6%) | De volta ao estúdio. Os elementos do mundo (arquivos) voam **para dentro** do aparelho. |
| Assinatura | 57,0–70,5 s | 13,5 s (19%) | Ícone + nome + frase sobre fundo claro. O conjunto desliza para a esquerda e abre espaço para uma **lista de recursos rolando** de baixo para cima. O conjunto volta ao centro com a chamada e o endereço. Escurece no fim. |

**A regra por trás:** o primeiro terço é emoção (cinema, nostalgia, o problema), os dois terços seguintes são o produto mostrado de verdade, e o fim é a marca. O problema e o produto se ligam por um **movimento contínuo para dentro de uma tela**, não por um corte.

## 2. Paleta (hex)

### Na referência (medido, por agrupamento de cor nos quadros)

| Momento | Cores dominantes | Papel |
|---|---|---|
| Ato 1, cenário | `#EED3AD` (céu dourado, 27%), `#303411` e `#686232` (verdes), `#A88F56` (bege do objeto), `#668480` (névoa azulada) | Luz quente de fim de tarde, saturação baixa |
| Ato 1, faixas | `#000000` (25% do quadro) | Faixas de cinema |
| Tela vazia (virada) | `#DBFAF0`, `#CDEFE3`, `#B2E2D4` (ciano pálido), `#5E977B` | Uma única cor fria e clara ocupando tudo antes do produto |
| Ato 2, estúdio | `#E1E5E9` (fundo), `#0F1210` (interface escura do produto) | Fundo frio e liso, sem textura |
| Legenda em pílula | `#4B4C4F` (estimado, cinza grafite opaco) com texto branco | Legenda sobre fundo claro |
| Pausa | `#000000` com texto `#FDFDFD` | Contraste máximo |
| Assinatura | `#EDF1F4` (55%), `#F4F8F9`, `#FAFCFC`; texto `#1B1A1E` | Fundo quase branco e chapado: medi luminância 240–241 do centro aos cantos, sem vinheta |
| Etiquetas da lista | cápsulas `#E4E7EA` (estimado) com texto cinza | Metadado discreto |

**Princípio:** quase todo o filme é neutro (preto, cinza claro, quase branco). A cor forte aparece em poucos lugares e em poucos momentos: o ciano da tela e as cores do ícone.

### Tradução para a VAI DE LOKAL

| Papel na referência | Na VAI DE LOKAL |
|---|---|
| Fundo claro do estúdio e da assinatura | Branco `#FFFFFF` (o briefing chama de creme o `#FFFFFF`; "muito branco") |
| Texto principal quase preto | Tinta `#2A1F18` |
| Texto secundário cinza | Tinta 2 `#6B5C4E` |
| Faixas de cinema e cartão preto da pausa | Tinta `#2A1F18`, o tom mais escuro da marca, em vez de preto puro |
| Legenda em pílula grafite | Pílula de tinta `#2A1F18` com texto branco |
| A única cor forte (o ciano) | Laranja `#EA6E1A`, só no que é destaque: o pin, o anel que pula pela interface, uma palavra |
| Tela vazia da virada | Laranja-claro `#FFF0E8`, uma superfície clara e quente, nunca laranja forte de fundo |
| Etiquetas cinza da lista | Laranja-claro `#FFF0E8` com texto laranja escuro `#C05810` |
| Concluído | Verde `#1D9E75`, e só aí ("Pagamento confirmado", que já vem verde na tela real) |

## 3. Tipografia

### Na referência (estimado pela forma das letras)
- **Família:** uma única neo-grotesca do sistema, com cara de SF Pro (Display nos títulos, Text nas legendas). Não há segunda família nem serifa.
- **Legenda do ato 1:** regular, branco quente, centralizada na faixa preta de baixo. O texto mede **30 px** de ascendente a descendente (medido), o que dá um corpo de cerca de 28 px a 1080p. Espaçamento normal, uma linha só.
- **Legenda em pílula (ato 2):** regular, branco, **alinhada à esquerda** dentro de uma pílula de cerca de 75 px de altura (medido), com cantos arredondados de raio ≈ 1/4 da altura. A pílula já nasce na largura da frase e o texto vai preenchendo.
- **Frase da pausa:** semibold, cerca de 64 px, branca, centralizada.
- **Nome na assinatura:** bold, cerca de 100 px, **espaçamento bem fechado** (≈ -0,04 em), quase preto. Frase de apoio em regular, cerca de 30 px, cinza.
- **Lista rolando:** semibold, cerca de 34 px, espaçamento fechado. Cada item tem uma cápsula de etiqueta pequena e clara.

### Tradução para a VAI DE LOKAL
- **DM Sans**, a fonte do site, no lugar da neo-grotesca.
  - **800** nos títulos (frase da pausa, chamadas), com espaçamento -0,03 em, como o título bem fechado da referência.
  - **700** nos rótulos (itens da lista, etiquetas).
  - **400/500** nas legendas: 500 dentro da pílula, 400 na legenda sobre as faixas.
- **DM Mono** só no ID do cliente (LOKAL12), se ele aparecer.
- **Escala a 1080p:**

  | Uso | Corpo |
  |---|---|
  | Legenda | 40–44 px (maior que a da referência, porque o filme vai ser visto no celular) |
  | Pílula | 40 px |
  | Pausa | 96 px |
  | Lista | 48 px |
  | Endereço | 44 px |

  O logo é o arquivo real, em no máximo 640 px de largura (2× do PNG).

## 4. Duração dos planos

- **Planos muito longos:** a referência tem só **3 cortes secos** em 70 s (medido: 50,37 s, 52,77 s e 57,00 s; mais uma virada suave em 23,1 s). O plano médio dura cerca de 14 s.
- **O ritmo vem de dentro do plano, não da montagem:**
  - **Palavras:** a legenda avança palavra por palavra, acompanhando a voz. No ato 1 são cerca de 2 palavras por segundo.
  - **Destaques:** no ato 2, o destaque troca de elemento a cada 0,5–0,8 s, um por verbo da lista.
  - **Câmera:** a câmera muda de tamanho de enquadramento a cada frase (≈ 1,5–3 s).
- **Pausa curta e isolada:** o cartão preto dura 2,4 s, o suficiente para uma frase de 3 palavras.
- **Proporções a manter num filme mais curto:** problema ≈ 30%, produto ≈ 40%, pausa ≈ 5–8%, assinatura ≈ 20–25%.

## 5. Tipos de transição

1. **Empurrão para dentro de uma superfície:** a câmera avança até uma tela ocupar o quadro, e a próxima cena **nasce de dentro dela**. É a transição-assinatura da referência (ato 1 → produto).
2. **Clarão para uma superfície limpa:** a tela vazia estoura em claro, e o produto aparece já no estúdio claro. As faixas pretas recolhem nesse momento.
3. **Camadas que se dissolvem:** o problema (janelas empilhadas) desaparece em camadas, deixando a superfície vazia.
4. **Corte seco para o escuro:** só para a pausa, e de volta.
5. **Coisas que voam para dentro:** elementos do mundo convergem para o aparelho no fechamento do produto.
6. **Deslizamento de bloco:** na assinatura, o conjunto marca + frase anda para a esquerda, a lista entra pela direita, e tudo volta ao centro.
7. **Escurecer no fim:** o último segundo esmaece para cinza.

## 6. Movimentos de câmera

- **Ato 1:** **dolly-in lento e constante**, de cerca de 1,0× a 1,8× em 20 s (estimado), com uma leve subida. Há paralaxe: o primeiro plano (flores) passa mais rápido e desfocado, o que dá profundidade de campo.
- **Ato 2:** **"respiração"**, com aproximações e afastamentos de 5–12% a cada frase, sempre suaves e sem tremor. O aparelho fica centralizado, ou desloca levemente quando o destaque vai para uma borda.
- **Assinatura:** câmera parada. Quem se mexe são os blocos (deslizam) e a lista (rola com velocidade constante, com as bordas de cima e de baixo esmaecendo).
- **Nunca:** chicote, tremor, rotação de câmera, zoom brusco.

## 7. Textura e grão

- **Sem grão:** o ruído fino medido é 0,2–0,6 (em 255) nos fundos lisos e zero no cartão preto. O acabamento é digital e limpo.
- **No ato 1:** profundidade de campo, luz quente de fim de tarde, reflexo de lente e o brilho da tela de tubo.
- **No estúdio:** fundo chapado, sombras macias e longas sob o aparelho e o ícone, sem reflexo.
- **Faixas de cinema:** 132 px em cima e 114 px embaixo (medido, ≈ 2,3:1), **só no ato 1**. Elas somem quando o produto aparece: a forma do quadro muda junto com o assunto.
- **Áudio:** voz narrando, sobre uma trilha ambiente. A cerca de 103 BPM, ela **não é grudada na grade**, porque quem marca o tempo é a narração. Volume integrado de -14,9 LUFS (medido).

## 8. Como o texto entra e sai

- **Entrada:** **palavra por palavra**, no tempo da fala. Cada palavra surge de um estado apagado e um pouco desfocado (cinza e borrada) até o branco nítido, em cerca de 0,2–0,3 s. A palavra seguinte começa antes de a anterior terminar.
- **Saída:** a frase inteira some de uma vez, enquanto a próxima já começa. Por cerca de 0,3 s, as duas convivem ("fantasma").
- **Pílula (ato 2):** a pílula aparece já na largura final e o texto a preenche da esquerda para a direita. Na troca de frase, a pílula se ajusta.
- **Pausa:** as palavras entram uma a uma com **desfoque para foco**, sem movimento.
- **Assinatura:** o nome entra com foco (cinza e borrado até nítido). A frase de apoio entra palavra por palavra. A lista rola contínua, com esmaecimento nas bordas.
- **Nunca há letras voando, quicando ou girando.** O texto é calmo; quem se mexe é a câmera e a interface.

---

## 9. Conflitos com as regras do estúdio (CLAUDE.md) e com a marca: o que proponho

| Na referência | A regra | Proposta para a VAI DE LOKAL |
|---|---|---|
| Palavras entram e frases saem com fade (opacidade + desfoque) | CLAUDE.md: "tudo entrando com fade" é proibido | Manter o **foco** (desfoque → nítido) e acrescentar um **pequeno deslocamento para cima dentro de uma máscara**. A opacidade vai de 40% a 100%, e só nas palavras de legenda. Títulos, interface e logo entram por máscara, deslize ou mola, nunca por fade. |
| Brilho da tela de tubo e reflexo de lente | CLAUDE.md: "brilho (glow) em interface" é proibido; a marca proíbe brilho no logo | **Sem brilho e sem reflexo.** A luz do ato 1 vira uma superfície clara e quente (laranja-claro) e sombras macias. |
| Cenário fotográfico (objeto num campo) | Não temos foto nem 3D da marca, e não podemos inventar | O ato 1 vira uma **ilustração de traço da marca** (traço proporcional a 2 px, pontas arredondadas, em tinta com destaque laranja): uma porta e uma caixa, com o mesmo dolly-in lento e as mesmas faixas de cinema. |
| Música fora de grade, guiada pela voz | CLAUDE.md: acertos na grade de batidas medida | Sem narração em voz, a legenda passa a andar **na grade**, uma palavra por colcheia. A trilha é sintetizada, calma, e cliques e whooshes caem na batida. |
| Cartão preto puro | Paleta da marca | Cartão em tinta `#2A1F18`. |
| Título centralizado sobre fundo claro | CLAUDE.md proíbe título centralizado **sobre gradiente** | A referência usa fundo **chapado** (medido, sem vinheta). Mantemos o fundo branco chapado, então não há conflito. |
