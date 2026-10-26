# Crítica do capítulo 4: retirada e fim (P15–P20, b84–b120, 42–60 s)

Arquivo: `filmes/11-tutorial-primeiro-acesso/capitulos/cap4.js` (trabalhado em `filmes/_trabalho-cap4/`).
Quadros: `.render-tmp/_trabalho-cap4/r0` … `r9` e `final/` (rodada final). Nome dos quadros: `bNNN.NN-mb.png` (batida, com o desfoque de movimento padrão do motor: 4 subquadros até a rodada 7, 8 a partir da rodada 8) e `bNNN.NN-s1.png` (batida, `sub=1`, parado). Tempo da batida n = n × 0,5 + 0,013 s.

Critérios (1 a 10): gancho · leitura a 360 px · movimento · composição · profundidade · sincronia do som · acabamento · valores (n/a quando o plano não tem valor). Meta: 8 ou mais em tudo, no mínimo 3 rodadas.

## Antes da rodada 1: a primeira versão (r0)

Quadros: `r0/` (30, todos `s1`), folha `r0/folha.png`. Serviu só para ver de onde o capítulo partia, sem nota. Além dos itens da rodada 0 do diretor, apareceram:
- **P15, 43,26–43,51 s (b86,5–b87):** o dedo arrasta de b86 a b87, mas a tela só começa a rolar no b87, quando ele já soltou. Numa rolagem o conteúdo acompanha o dedo.
- **P15, 43,81 s (b87,6):** a janela de 330 a 0,9× corta a linha "Se demorar para ler…" ao meio, no alto.
- **P16, 46,81 s (b93,6):** o arrasto b93–b94 começa abaixo do cartão (y 1000, com a base em 870) e sobe por cima do "3" do CAIXA.482913.
- **P17 e P18 (b94–b111):** o dedo fica estacionado em (880, 1120), fora do cartão, de b94,3 a b99 e de b109,4 a b111.
- **P18 (b101–b111):** o texto ocupa só a metade de cima do cartão de 740; a metade de baixo fica vazia até o teto entrar.
- **P19, 56,11 s (b112,2):** um quadro inteiro branco. A cortina sobe do pé do quadro, não da caixa, e só aparece quando entra na caixa que cresce.
- **P19, 56,31 s (b112,6):** o dedo saindo atravessa a cartela laranja, no canto de baixo à direita.

## Rodada 1 (os itens da rodada 0 resolvidos)

Quadros: `r1/` (29: 16 `mb` e 13 `s1`). Folhas: `r1/folha-P15-P16.png`, `r1/folha-P17-P18.png`, `r1/folha-P19-P20.png`. Prova a 360 px: `r1/celular.png`. Loop: `r1/loop/`. Deixas: `r1/cues.json`. Movimento: `r1/mov/` (um quadro a cada 0,1 s, de 41,5 a 60 s).

**O que entrou nesta versão (os itens da rodada 0 e os da r0):**
- **P15:** o dedo não estaciona. Ele puxa a pílula (b83–b84), desliza devagar pela direita do QR até a base da tela (mola de 1,3 Hz), faz a rolagem e desliza até a caixa (um gesto a até 2 batidas do outro desliza, como no capítulo 1). A rolagem começa no apoio do arrasto (b86 + 0,06 s) e a janela encolhe junto (o morph `codigo` passou do b87 para o b86). A janela final tem 980×300, com a tela a 0,9× centrada no ponto 1588,5: mostra do print 1422 ao 1755, ou seja, a caixa do código e a linha "Mostre este código…" inteiras, sem fatia do "Se demorar" nem do PKG-1031. A caixa afunda 4% no toque (b88).
- **P16:** o rótulo passou para peso 500, tinta 2 (72 px, o corpo da legenda); o código fica em DM Mono 500, 110 px, tinta. São dois tamanhos no quadro (72 e 110), com a hierarquia no peso e na cor. No b89, o CAIXA.482913 da caixa real (475 px a 0,9×) cresce com mola de 1,6 Hz até o código grande: o valor fica na tela desde a caixa real, e o rótulo sobe depois dele. O cartão passou a 980×350 (raio 60), para o texto começar em x 116 com o mesmo respiro dos outros cartões.
- **P17:** o cartão (980×620) fica centrado em y 883; as três linhas de 132 px ficam centradas nele (respiro de 113 em cima e 114 embaixo). Respiração de 1,00 a 1,02× (b94,2, 0,5 Hz), de volta a 1,00 no b98,6. O dedo entra só para o arrasto, à direita do "com calma.", e sai.
- **P18:**
  - o cartão (980 de largura) fica centrado em y 883;
  - o texto passou para 72 px (dois tamanhos no quadro: 72 e 132);
  - a frase inteira em tinta 2, só o R$ 0,84 em laranja, e o teto em tinta;
  - o R$ 0,84 divide a linha com o "por dia" (na mesma linha de base), o que tira uma linha: "Do 8º dia útil em diante:" / "taxa de guarda de" / "R$ 0,84 por dia" / "no tamanho de R$ 5,90.";
  - no b106 o cartão cresce de 556 para 810 (mola de 1,6 Hz) e o texto sobe 127,5 px com a mesma mola: o bloco fica centrado antes e depois, e o teto entra no espaço que se abriu;
  - o fio tem 3 px, tinta a 18%;
  - o teto vai em duas linhas ("Para de somar no" / "15º dia útil."), para deixar livre o canto de baixo à direita, por onde o dedo arrasta. Com 810 de altura × 1,02 = 826, cabe nos 900.
- **P19:** a cortina sobe da borda de baixo da caixa (que cresce) e a cobre inteira em 0,3 s; o dedo sai para a direita logo depois do arrasto.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 7 | 8 | 6 | 8 | 8 | 8 | 7 | n/a |
| P16 | 7 | 9 | 7 | 7 | 8 | 9 | 6 | 8 |
| P17 | 8 | 9 | 7 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 9 | 7 | 8 | 8 | 9 | 8 | 9 |
| P19 | 8 | 9 | 7 | 8 | 7 | 9 | 7 | n/a |
| P20 | 8 | 9 | 8 | 8 | 7 | 8 | 9 | n/a |

**Os 3 maiores problemas:**
1. **P16, 44,51–44,63 s (b89–b89,25):** durante 0,12 s aparecem dois códigos: o da caixa real, que some com o conteúdo velho, e o nosso, que já começa a crescer, um sobre o outro com fontes diferentes (`b89.15-mb`). No b92,7 o dedo apoia logo embaixo do "13" e parece encostar nele (`b92.70-s1`).
2. **O dedo chega tarde (velocidade abaixo de 15 px/s, amostrada a 1/40 de batida):** 0,25 batida antes do b83, 0,15 antes do b99 e 0,20 antes do b111 (a regra pede de 0,5 a 1). No b84,3 ele passa por cima do canto do QR enquanto a tela abre (`b84.30-mb`).
3. **P15, 43,21 s (b86,4):** a rolagem de ~600 px a 1,8 Hz deixa o QR em quatro cópias no quadro com desfoque (`b86.40-mb`). No P19, 56,16 s (b112,3), o dedo ainda aparece na borda direita sobre a cortina (`b112.30-mb`), e o pin cai chapado, sem nenhuma pista de profundidade (`b112.60-mb`).

**Conferido:**
- **Som:** as 14 deixas do trecho caem num acerto medido, com desvio de 0 ms (`r1/cues.json` contra `beats.json`). O whoosh da rolagem foi para o b86.
- **Loop:** 0 pixels diferentes entre 0 e 60 s (`r1/loop/`).
- **Parado:** o maior trecho sem mudança é de 1,7 s (57,5–59,2 s, a cartela com a frase). Algo novo a cada 3,0 s no máximo (50,0 → 53,0 s, com a respiração no meio).
- **Legenda:** o dedo fica abaixo de y 1123 de b84 a b94.
- **Tamanhos:** P15 e P16, 72 + 110 (a legenda e o código); P17, só 132; P18, 72 + 132; P19 e P20, só 80.
- **Passagem b84:** a pílula do cap. 3 (540, 334, 468×78) vira o topo da tela sem salto (`b84.30-mb`).
- **360 px:** todos os textos nossos se leem; o fio do P18 aparece (`r1/celular.png`).

**Correções para a rodada 2:**
- **P16:** do b89 em diante, a tela pinta de branco o código dentro da caixa real (o código "sai" da caixa e só existe o nosso). O dedo apoia em (975, 855): abaixo da base do código (794) e à direita do fim dele (908). Com isso, o texto pode ficar até TB(94) − 0,26, como nos outros cartões.
- **O dedo chega antes:** entra no b81,35 (pílula), no b97,35 (P17) e no b109,3 (P18), e volta para o P16 no b91,6. A puxada da pílula vai de (750, 345) a (850, 640), à direita do QR. O deslize até a base da tela passa a 1,5 Hz. A rolagem termina em (770, 800), perto da caixa, e o toque mira em (700, 742).
- **P15:** a rolagem passa a 1,5 Hz.
- **P19:** o dedo sai a 3 Hz. O pin cai de 1,2× para 1,0× (vem de perto da câmera e pousa no "O"), sem sombra e sem distorcer.

## Rodada 2

Quadros: `r2/` (33: 19 `mb` e 14 `s1`). Folhas: `r2/folha-P15-P16.png`, `r2/folha-P17-P18.png`, `r2/folha-P19-P20.png`. Prova a 360 px: `r2/celular.png`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 8 | 8 | 7 | 8 | 8 | 9 | 8 | n/a |
| P16 | 8 | 9 | 7 | 7 | 8 | 9 | 7 | 9 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P19 | 8 | 9 | 7 | 8 | 8 | 9 | 7 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 8 | 9 | n/a |

**Os 3 maiores problemas:**
1. **P16, 44,56–44,76 s (b89,1–b89,5):** o código cresce com mola de 1,6 Hz e, no quadro com desfoque, os números da direita (que andam mais) saem em quatro cópias: "482913" fica dobrado, e a 360 px parece borrão (`b89.25-mb`, `celular`). O código real não aparece mais (a tela pinta a caixa por baixo).
2. **P16, 46,71 s (b93,4):** o dedo sobe pela borda direita do cartão a 21 px do "3"; a 360 px são 7 px, e ele parece encostar no código (`b93.40-mb`, `celular`).
3. **P19, 56,29 s (b112,55):** a cortina chega ao topo da caixa no fim da curva, devagar, e deixa uma fresta clara no alto do quadro por ~0,1 s (`b112.55-mb`; o pixel (540, 5) sai (238, 145, 81)). No P15, 43,21 s (b86,4), a rolagem a 1,5 Hz ainda deixa o QR com cópias no quadro com desfoque, menos que na rodada 1.

**Conferido:**
- **O dedo** (amostrado a 1/40 de batida): chega parado 0,60 batida antes do b83, 0,70 antes do b86, 0,50 antes do b88, 0,65 antes do b93, 0,60 antes do b99 e 0,70 antes do b111. Fica visível de b81,45 a b88,9 (puxada, deslize, rolagem e toque), de b91,75 a b94,45, de b97,5 a b100,5 e de b109,4 a b112,3. Com legenda, y máximo de 1123. No quadro final, fora (1240, 1100).
- No b84,3 ele passa à direita do QR (x 850; o QR acaba em 773), e no b85,3 o anel abre sem o dedo em cima (`b84.30-mb`, `b85.30-s1`).
- O pin cai de 1,2× e pousa em 1,0× no "O": a cartela ganha uma pista de profundidade sem sombra (`b112.75-mb`).

**Correções para a rodada 3:**
- **P16:** o código cresce com `easeInOut` em 0,8 s (parte e chega parado, com velocidade de pico menor que a da mola); o rótulo sobe a TB(89) + 0,35 s, quando o código já desceu da linha dele. O cartão passa a 1000×350 (a câmera fica parada no P16, então a largura pode ir a 1000), e o dedo apoia em (985, 855): 31 px à direita do código e abaixo da base dele.
- **P19:** a cortina cobre 1,15× a altura da caixa, e a borda chega ao topo ainda com velocidade.
- **P15:** a rolagem passa a 1,3 Hz (assenta antes do toque do b88: no b88 falta 0,2% do caminho).

## Rodada 3

Quadros: `r3/` (35: 21 `mb` e 14 `s1`). Folhas: `r3/folha-P15-P16.png`, `r3/folha-P17-P18.png`, `r3/folha-P19-P20.png`. Prova a 360 px: `r3/celular.png`. Zoom: `r3/zoom-b89.80.png`, `r3/zoom-b100.40.png`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | n/a |
| P16 | 8 | 9 | 8 | 7 | 8 | 9 | 7 | 9 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 9 | 8 | 8 | 8 | 9 | 7 | 8 |
| P19 | 8 | 9 | 7 | 8 | 8 | 9 | 7 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 8 | 9 | n/a |

**Os 3 maiores problemas:**
1. **P16, 44,91 s (b89,8), uma regressão:** com o código crescendo em `easeInOut`, ele demora mais a descer, e o rótulo (que entra a TB(89) + 0,35) sobe colado no alto dele. "Palavra-chave da retirada" encosta em "CAIXA.482913" (`zoom-b89.80`, `celular`). O crescimento em si ficou limpo: sem cópias nos números (`b89.25-mb`).
2. **P19, 56,24 s (b112,45):** a cortina já cobre a caixa, mas a caixa ainda não cobre o quadro: ficam 16 px brancos em cima e 27 embaixo por ~0,1 s (`b112.45-mb`, `celular`). A caixa vai a 1120×1960 com mola de 2,6 Hz e só passa das bordas perto do fim da curva.
3. **P18, 50,21 s (b100,4):** enquanto o R$ 0,84 sobe, a boca de baixo da máscara do motor (0,25 do corpo) corta a perna da vírgula e o pé do "$", e o valor se lê "R$ 0.84" por ~0,2 s (`zoom-b100.40`). No P19, 56,31 s (b112,6), o pin que cai de fora do quadro sai em quatro cópias no quadro com desfoque: cai ~900 px em ~0,3 s, e com 4 subquadros não há como ficar liso sem cair de menos longe (o que o faria nascer dentro do quadro).

**Conferido:**
- **P16:** o dedo apoia em (985, 855) e sobe a 31 px do "3", sem parecer encostar (`b93.30-mb`, `celular`).
- **P15:** a rolagem a 1,3 Hz deixa o QR com no máximo duas cópias legíveis como desfoque (`b86.30-mb`, `b86.60-mb`), e a caixa assenta antes do toque (`b87.60-s1`).
- O dedo continua chegando de 0,5 a 0,7 batida antes de cada gesto.

**Correções para a rodada 4:**
- **P16:** o rótulo entra a TB(89) + 0,55 s. Nesse instante o código já desceu (alto das maiúsculas em −17), e a máscara do rótulo (que acaba em −38) fica 21 px acima dele.
- **P19:** no b112 a caixa cresce para 1400×2400, além do quadro, e cobre as bordas em ~0,11 s; no b112,75, escondida pela cortina, volta a 1120×1960 (que ainda cobre o quadro e é o estado do quadro 0).
- **P18:** o R$ 0,84 sobe com um "sobe" local, igual ao do motor, mas com a boca de baixo da máscara a 0,42 do corpo: a vírgula e o "$" sobem inteiros.

## Rodada 4

Quadros: `r4/` (38: 22 `mb` e 16 `s1`). Folhas: `r4/folha-P15-P16.png`, `r4/folha-P17-P18.png`, `r4/folha-P19-P20.png`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | n/a |
| P16 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 9 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P19 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 9 | 9 | n/a |

**Os 3 maiores problemas:**
1. **P16, 45,06–46,72 s:** sem a sobreposição, o rótulo agora entra a TB(89) + 0,55 s e fica só 1,66 s até começar a sair (TB(94) − 0,29). O bloco (rótulo + código) passa de 2 s, porque o código está na tela desde a caixa real, mas o rótulo sozinho fica abaixo dos 2,0 s da D11 (`b89.90-mb`: o código ainda cresce sozinho a TB(89) + 0,45 s).
2. **P19, 56,26–56,46 s (b112,5–b112,9):** o pin que cai de fora do quadro continua com quatro cópias no quadro com desfoque (`b112.60-mb`). É o limite dos 4 subquadros do motor para uma queda de ~900 px em ~0,3 s; não dá para cair de menos longe sem nascer dentro do quadro. Vai como pedido ao diretor.
3. **P15, 42,16 s (b84,3):** a pílula da legenda nasce vazia (a caixa aparece em t0 − 0,06 e o texto só em t0 + 0,08), como o capítulo 1 já registrou; é do motor (`b84.30-mb`). A rolagem a 1,3 Hz deixa o QR desfocado em duas cópias, o que se lê como desfoque de movimento (`b86.30-mb`).

**Conferido:**
- **P16:** o rótulo não encosta mais no código (`b90.60-s1`); o crescimento fica limpo (`b89.25-mb`, `b89.60-mb`).
- **P18:** o R$ 0,84 sobe com a vírgula inteira a partir de ~0,05 s da entrada (`b100.45-mb`; no `b100.30-mb`, o primeiro quadro, a vírgula ainda está saindo da máscara).
- **P19:** a caixa de 1400×2400 cobre o quadro antes de a cortina chegar ao alto. Não sobra fresta branca nem em cima nem embaixo (`b112.20-mb`, `b112.30-mb`, `b112.45-mb`; no alto do `b112.45` aparece só a ponta do pin entrando).

**Correções para a rodada 5:**
- **P16:** a escala do código continua em `easeInOut` (0,8 s), mas o lugar vai em `easeOut`: o código desce primeiro (70% do caminho em 0,2 s, a ~2 px por subquadro, sem cópias) e libera a linha do rótulo, que passa a entrar a TB(89) + 0,2 s. Nesse instante o alto do código está em −2, e a máscara do rótulo acaba em −38. O rótulo fica 2,0 s até começar a sair.

## Rodada 5

Quadros: `r5/` (36: 19 `mb` e 17 `s1`). Folhas: `r5/folha-P15-P16.png`, `r5/folha-P17-P18.png`, `r5/folha-P19-P20.png`. Zoom: `r5/zoom-b89.15.png`, `r5/zoom-b89.30.png`, `r5/zoom-b89.45.png`, `r5/zoom-b89.05-15-s1.png`. Verificação da correção: `r5x/zoom-voo.png`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | n/a |
| P16 | 8 | 9 | 8 | 8 | 8 | 9 | 7 | 9 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P19 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 9 | 9 | n/a |

**Os 3 maiores problemas:**
1. **P16, 44,54–44,63 s (b89,05–b89,25), um erro das rodadas 2 a 4 que só agora apareceu:** o código real da caixa continua visível, cinza, enquanto a caixa some (`zoom-b89.15`, `zoom-b89.05-15-s1`). A tinta branca que devia cobri-lo era desenhada dentro do próprio conteúdo que desbota na saída (o motor multiplica a opacidade por k): com k = 0,8, sobram 16% do código. Nas rodadas 2 a 4 o nosso código nascia em cima dele e o escondia; com o `easeOut` o nosso desce logo e o real aparece. A anotação da rodada 2 ("o código real não aparece mais") estava errada.
2. **P19, 56,26–56,46 s (b112,5–b112,9):** as quatro cópias do pin na queda, o limite dos 4 subquadros (`b112.60-mb`).
3. **P15, 42,16 s (b84,3):** a pílula da legenda nasce vazia, por causa do motor (`b84.30-mb`).

**Conferido:** o rótulo entra a TB(89) + 0,2 s sem encostar no código (`zoom-b89.30`, `zoom-b89.45`). Fica 2,0 s até começar a sair. O código cresce limpo.

**Correção para a rodada 6:** do b89 em diante, a tela "Retirada" é desenhada com um recorte que exclui o código real (clip evenodd), e por baixo fica o branco opaco do contêiner. Conferido em `r5x/zoom-voo.png` (b89,05 e b89,15, com e sem desfoque): só existe um código, que sai da caixa e cresce.

## Rodada 6

Quadros: `r6/` (34: 19 `mb` e 15 `s1`). Folhas: `r6/folha-P15-P16.png`, `r6/folha-P17-P18.png`, `r6/folha-P19-P20.png`. Prova a 360 px: `r6/celular-a.png`, `r6/celular-b.png`. Loop: `r6/loop/`. Deixas: `r6/cues.json`. Movimento: `r6/mov/`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | n/a |
| P16 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P19 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 9 | 9 | n/a |

Todas as notas chegaram a 8. O código do P16 sai da caixa sozinho, sem o real por baixo (`r6/b89.10-mb`, `r6/celular-a`). O loop deu 0 pixels, as deixas caíram com 0 ms de desvio e o maior trecho parado ficou em 1,7 s.

**Os 3 maiores problemas (o que ainda segurava as notas em 8):**
1. **P19, 56,26–56,46 s:** a queda do pin sai em quatro cópias no quadro com desfoque (`b112.60-mb`).
2. **P15, 43,16–43,46 s (b86,3–b86,9):** a rolagem deixa o QR em duas ou três cópias (`b86.30-mb`). No P19, de 56,02 a 56,31 s, a borda da cortina sai em degraus (`b112.30-mb`).
3. **P15, 42,09–42,17 s:** a pílula da legenda nasce vazia (motor, `b84.30-mb`).

**Uma mudança fora do meu arquivo, só na cópia de trabalho:** o `cap3.js` do filme principal mudou desde o passo 1, porque o animador do cap. 3 copiou a versão dele de volta. Copiei de novo esse arquivo para `filmes/_trabalho-cap4/`, sem editá-lo, para conferir a passagem do b84 contra a versão atual. A pílula continua terminando em (540, 334, 468×78), com mola de 1,4 Hz, e assenta no b83,1. O dedo do cap. 3 sai para (1260, y), e o meu passa para (1240, 420) sem aparecer.

**Correções para a rodada 7:**
- **Desfoque liso nos três movimentos longos:** com a mesma técnica do cap. 3, cada subquadro soma mais 4 amostras num buffer ('lighter', 1/4 cada, limpo a cada desenho), o que dá 16 amostras por quadro. Vale para a rolagem (de b86 + 0,06 s a + 1,1 s), a cortina (do b112 a + 0,36 s; o tamanho da caixa é o do instante de cada amostra) e a queda do pin (até b113 + 0,15 s). Com `sub=1`, desenha uma vez só. Nada passa de um quadro para outro.
- **A troca do b116:** conferindo o b116 (58,00 s, antes, contra 58,03 s, depois), apareceram 14 pixels com 1 nível de diferença na borda do pin. O meu desenho punha o pin antes da logo, e o `F.abertura` põe a logo antes do pin; as bordas antialiasadas dos dois se tocam. Passei a desenhar na mesma ordem do `F.abertura`. Esse 1 nível existia desde a primeira versão.

## Rodada 7 (final)

Quadros: `r7/` (40: 24 `mb` e 16 `s1`). Folhas: `r7/folha-P15-P16.png`, `r7/folha-P17-P18.png`, `r7/folha-P19-P20.png`. Prova a 360 px: `r7/celular-a.png` (P15–P16), `r7/celular-b.png` (P17–P20). Loop: `r7/loop/`. Deixas: `r7/cues.json`. Movimento: `r7/mov/` (um quadro a cada 0,1 s, de 41,5 a 60 s).

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 8 | 8 | 9 | 8 | 8 | 9 | 8 | n/a |
| P16 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P19 | 8 | 9 | 9 | 8 | 8 | 9 | 8 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 9 | 9 | n/a |

**O que melhorou:** a rolagem do P15 (`b86.30-mb`, `b86.60-mb`), a cortina (`b112.30-mb`) e a queda do pin (`b112.60-mb`, `b112.75-mb`) agora saem com rastro liso, sem cópias separadas.

**O que ainda segura notas em 8 (nenhum item abaixo de 8):**
1. **P15, 42,09–42,17 s:** a pílula da legenda nasce vazia, por causa do motor (`b84.30-mb`).
2. **P19, 56,02–56,10 s (b112–b112,15):** a borda de baixo da cortina acompanha a borda da caixa, que o motor desenha com 4 subquadros, e sai com 4 riscos finos nos dois ou três primeiros quadros (`b112.10-mb`).
3. **Profundidade das cartelas (P19–P20):** a assinatura é chapada por regra (guia de estilo §0 e §6). As pistas são o pin que pousa de 1,2× para 1,0×, a cortina que cobre a caixa e a frase que passa pela máscara. Não há sombra, câmera nem dedo para somar.

**Conferências:**
- **Som:** as 14 deixas do trecho (7 do capítulo, 1 clique e 6 transformações com som) caem num acerto medido, com desvio de 0 ms (`r7/cues.json` contra `beats.json`). O filme inteiro tem 52 deixas, todas com 0 ms de desvio.
- **Loop:** o quadro de 60 s é idêntico ao de 0 s, com 0 pixels diferentes de 2 073 600, com e sem desfoque (`r7/loop/`). A troca do b116 para o `F.abertura` também dá 0 pixels (58,00 s contra 58,03 s).
- **Algo novo a cada 2 a 4 s:** 42,0 tela · 42,5 anel no QR · 43,0 rolagem · 44,0 toque · 44,5 o código cresce · 44,7 o rótulo · 46,5 arrasto · 47,0 o prazo · 49,5 arrasto · 50,0 a taxa · 52,0 respiração · 53,0 o cartão cresce e entra o teto · 55,5 arrasto · 56,0 a cortina · 56,25 o pin · 56,5 a logo · 57,1 a segunda linha · 59,25 a frase sai. O maior intervalo é de 3,0 s (50,0–53,0, com a respiração no meio).
- **Nada parado mais de 2 s:** o maior trecho sem nenhum pixel mudando (amostrado a cada 0,1 s) é de 1,7 s, de 57,5 a 59,2 s (`r7/mov`).
- **O dedo** (amostrado a 1/40 de batida):
  - chega parado 0,60 batida antes do b83, 0,70 antes do b86, 0,50 antes do b88, 0,65 antes do b93, 0,60 antes do b99 e 0,70 antes do b111;
  - mira na caixa à direita do código, longe do "Copiar" (700, 742);
  - os arrastos começam a 40 px da base de cada cartão e sobem 100 px por um canto sem texto (no P16, a 31 px do fim do código);
  - sai pela direita em até 0,3 s depois do b88, do b94, do b100 e do b112;
  - de b84 a b94, com legenda, fica acima de y 1123;
  - no quadro final está fora, em (1240, 1100).
- **Área segura:** o texto nosso vai de x 108 (com a respiração de 1,02×) a 908, e de y 548 a 1215. Os contêineres têm 980 de largura onde a câmera respira, e 1000 no P16, com a câmera parada.
- **Tamanhos de texto nosso por quadro:** P15, 72 (a legenda); P16, 72 + 110; P17, 132; P18, 72 + 132; P19–P20, 80.
- **Um destaque laranja por vez:** o anel do QR recolhe na rolagem, antes do anel da caixa (b88); no P18 o fio é cinza.
- **Passagens:**
  - b84 (contra o `cap3.js` atual do filme principal): a pílula (540, 334, 468×78) vira o topo da tela "Retirada" sem salto (`b83.50-mb`, `b84.30-mb`);
  - b120 = b0: `F.abertura` (sem mudança no cap. 1), com 0 pixels diferentes.

## Rodada 8 (depois da crítica independente)

Um crítico que não escreveu o código olhou a versão da rodada 7 (`.render-tmp/_critica-cap4-1/`) e deu notas abaixo de 8 em P15, P16 e P19.

**As notas do crítico:**

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 7 | 8 | 7 | 8 | 8 | 9 | 6 | n/a |
| P16 | 8 | 9 | 8 | 7 | 8 | 9 | 7 | 8 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P19 | 7 | 9 | 7 | 8 | 8 | 8 | 6 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 9 | 9 | n/a |

**Antes de corrigir: a cópia de trabalho estava atrasada.** Depois da crítica, o diretor mudou o motor do filme principal: 8 subquadros de desfoque, a boca de baixo do `sobe` a 0,42 do corpo e o texto da pílula subindo junto com a caixa. O `cap1.js` e o `cap2.js` também mudaram. Copiei de novo o `index.html`, o `cap1.js` e o `cap2.js` do filme principal para `filmes/_trabalho-cap4/`, sem editar nenhum deles, para conferir o capítulo contra o motor que vai renderizar o filme. A partir desta rodada, `-mb` quer dizer o desfoque padrão de **8** subquadros. O `F.LOGO` e o `F.abertura` do cap. 1 não mudaram (a mesma geometria).

**As correções, na ordem do crítico** (só no `cap4.js`):
1. **P19, a cortina solta no meio do quadro (alta):** a base da cortina fica presa no pé do quadro (y 1924 da cena), e não na base da caixa que cresce. A cortina só começa quando a caixa já cobre o quadro: a mola do `cartela_branca` passou de 2,6 para 4 Hz (rodada 9: 6 Hz). Conferido em `r8/folha-tira-cortina.png` (q3361–q3384): a borda nasce no pé e sobe. Não sobra faixa solta com branco embaixo, nem os riscos dos subquadros.
2. **P15, a puxada sem resposta:**
   - o dedo mira em (780, 392), no canto de baixo à direita da pílula. O círculo não chega à linha de base do "confirmado" (y 345) e começa à direita do fim dele (x 740);
   - ele entra no b81,9 (o crítico sugeriu b82,2; a sonda mostrou que assim ele só ficava parado 0,3 batida antes) e fica parado 0,6 batida antes do apoio;
   - ele apoia no b83,5 e solta no b84,6. Do b84 em diante, desce junto com a borda de baixo da tela que abre, com a mesma mola do morph (1,8 Hz): fica a menos de 60 px da borda o tempo todo (sonda, de b84,1 a b84,6);
   - o move do b84,1 saiu.
   
   Conferido em `r8/folha-puxada.png`. O ponto mais baixo do dedo com legenda é y 1124 (borda em 1170, a pílula começa em 1328).
3. **P15, o anel do QR sumindo de um quadro para o outro:** a tela e o anel passam por borrados separados. O anel fica num buffer transparente só dele, e não satura mais sobre o branco da tela. Contagem de pixels laranja de q2582 a q2601: 11 701 → 11 697 → 10 064 → 5 519 → … → 24, sem salto (`r8/folha-tira-rolagem.png`). O laranja que volta a partir de q2602 é o "Copiar" do print.
4. **P15, a pílula vazia:** resolvido pelo motor novo do diretor, com o texto em t0 − 0,04. O texto já está dentro da caixa no primeiro quadro em que ela aparece (q2526, `r8/folha-tira-b84.png`). Não usei o campo `em`, porque com o motor novo ele atrasaria o texto (TB(84) + 0,08 em vez de t0 − 0,04). Sobra a caixa nascer com 74% da largura, que é do motor (pedido ao diretor).
5. **P16, o dedo colado no código:** o estado `palavra` passou para 1000×440 (y 500–940), com Y_ROTULO −96 e Y_CODIGO 34 (base do código em y 754). O arrasto vai de (960, 900) a (960, 820). Apertado, o alto do dedo para 28 px abaixo da base do código, e a borda esquerda fica à direita do fim dele (`r8/celular-a.png`: b92,7, b93,3, b93,6).
6. **P16, a dissolução do b89:** a tela "Retirada" ficou com `saida: false` e `ate: 89.3`. De TB(89) a TB(89) + 0,2 s ela é recortada por uma máscara cuja base sobe em easeIn, do pé da linha "Mostre…" (print 1725) até acima do anel da caixa: a linha, a caixa e o anel saem pela boca da máscara, e nada passa pela opacidade.
   - **Um problema novo, que apareceu na primeira tira:** com o cartão maior, o contêiner crescia para cima e mostrava a linha "Se demorar para ler…" do print, que depois sumia de um quadro para o outro.
   - **A correção:** o recorte também fica preso em cima, na janela do `codigo` (print 1422).
   - Conferido em `r8/folha-tira-b89.png` (q2668–q2689).
7. **P19, a cor da cortina arredondada:** o trecho que todas as amostras do subquadro cobrem é pintado direto, em source-over, a partir da primeira linha inteira de pixels. Só a faixa da borda passa pelo `lighter`. O pixel (540, 1700) dá (234, 110, 26) desde que a cortina chega nele (q3372 na r8, q3370 na r9) até o fim, e (540, 1915) dá o mesmo valor desde o segundo quadro da cortina. Toda linha abaixo da borda é o #EA6E1A exato em todos os quadros (sonda na `r9/tira-cortina`).
8. **P18, "R$ 0.84":** a máscara local do valor ficou com a boca a 0,62 do corpo. De q3008 a q3011 a vírgula aparece inteira já no primeiro quadro, que ainda está semitransparente pelo desfoque (`r8/folha-tira-084.png`).
9. **P15, o QR cortado em faixas na abertura:** o morph `retirada` passou para 1,8 Hz. Com os 8 subquadros do motor novo, a borda corta o QR em 8 degraus finos, que se leem como desfoque (`r8/z-b084-qr.png`).
10. **P16, o código saindo em cópias:** o código sai com uma saída local de 0,36 s, de TB(94) − 0,40 a TB(94) − 0,04, e o rótulo sai de TB(94) − 0,29 a − 0,05 (`r8/folha-tira-b93.png`).
11. **P19, o pin que não assenta no b113:** a queda passou a ter hora marcada, uma cúbica que chega parada em TB(113), sem sobressinal. A ponta passa por 820, 842, 856, 863 e 866 nos quadros q3386 a q3390 e para (`r8/z-pin.png`).
   - **Junto com a cortina nova:** se o pin ainda partisse de TB(112,5) − 0,05, cairia sobre o branco que a cortina ainda não cobriu, e branco sobre branco some. Pela conta, aos 56,25 s a ponta estaria em y ≈ 374 e a borda da cortina em y ≈ 570.
   - **A saída:** o pin parte de TB(112) + 0,27 s (r8), quando a borda passa do alto do quadro.
12. **P16, a caixa da pílula que sai pela opacidade:** é do motor (pedido ao diretor). O capítulo não muda.
13. **P16 e P18, tamanhos e pesos fora do aprovado:** voltei ao que a usuária aprovou, em vez de pedir uma assinatura nova.
   - **P18 (D13):** a frase da taxa e o teto em 60 px, e só o R$ 0,84 em 132 px. Com 60 px, as linhas da lista cabem como estão: "Do 8º dia útil em diante:" / "taxa de guarda de" / **R$ 0,84** / "por dia no tamanho de R$ 5,90." (796 px) e, no b106, "Para de somar no 15º dia útil." numa linha só (724 px, acaba em x 840).
   - **O cartão do P18:** 980×580 (bloco centrado, respiro de ~100), e 730 do b106 em diante. O texto sobe 73,5 px com a mesma mola de 1,6 Hz.
   - **P16:** o rótulo "Palavra-chave da retirada" voltou a DM Sans 700, como no guia §3.
   - **A 360 px:** os 60 px viram 20 px e se leem (`r8/celular-b.png`).
   - **O dedo do b111:** passou para x 950, à direita do fim do teto, e entra no b109,45.

**Notas (rodada 8):**

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | n/a |
| P16 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 9 |
| P19 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 9 | 9 | n/a |

Quadros: `r8/` (47 quadros soltos), mais as tiras `r8/tira-*` (cortina, rolagem, b84, b89, b93, 0,84) e `r8/puxada/`. Folhas: `r8/folha-P15-P16.png`, `r8/folha-P17-P18.png`, `r8/folha-P19-P20.png`, `r8/folha-tira-*.png` e `r8/folha-puxada.png`. Prova a 360 px: `r8/celular-a.png` e `r8/celular-b.png`. Zooms: `r8/z-b084-qr.png`, `r8/z-pin.png` e `r8/z-acabamento.png`. Loop: `r8/loop/`. Deixas: `r8/cues.json`.

**Os 3 maiores problemas:**
1. **P19, 56,03–56,12 s (q3362–q3367):** entre a caixa que cresce e a cortina que nasce no pé, ficam ~5 quadros quase brancos, só com a sombra da caixa. O laranja chega ~0,12 s depois do thump do b112.
2. **P19, 56,29–56,52 s:** com a partida em TB(112) + 0,27, o pin cai 900 px em 0,23 s, muito depressa no começo (q3378–q3380: rastro longo).
3. **P16, 44,7–45,9 s:** com o cartão de 440, sobra uma faixa vazia de 186 px embaixo do código até o dedo chegar (b91,75), e o bloco fica alto no cartão por ~1,1 s. É o preço do arrasto longe do valor, e a faixa ganha uso quando o dedo entra.

**Correção para a rodada 9:** caixa a 6 Hz (a base passa do pé em ~0,06 s), cortina de TB(112) + 0,06 a + 0,33 s e pin a partir de TB(112) + 0,24 s, quando a borda passa do alto do quadro. A queda passa a durar 0,26 s. O morph `cartela` continua no b112,75 (+0,375 s), depois do fim da cortina.

## Rodada 9 (depois da crítica independente, final)

Quadros: `r9/` (P18 a P20, que são os planos que mudaram: 19 quadros, de b110 a b119,98) e `r9/tira-cortina/` (q3359–q3394). P15 a P17 não mudaram desde a rodada 8, e os quadros deles são os de `r8/`. Folhas: `r9/folha-P19-P20.png` e `r9/folha-tira-cortina.png`. Prova a 360 px: `r9/celular-b.png`. Zoom: `r9/z-pin-entra.png`. Loop: `r9/loop/`. Deixas: `r9/cues.json`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | n/a |
| P16 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 9 |
| P19 | 8 | 9 | 9 | 8 | 8 | 9 | 8 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 9 | 9 | n/a |

**O que mudou:**
- **A cortina:** o laranja aparece no pé no q3366, dois quadros antes da rodada 8 (b112,2 já tem laranja, `r9/celular-b.png`). A borda é contínua até o pé em todos os quadros, e a cor é a exata.
- **O pin:** entra no q3376 sobre laranja chapado, logo depois de a borda passar do alto (`r9/z-pin-entra.png`), e pousa em q3390–q3391, no pop do b113.

**Conferências:**
- **Som:** as 14 deixas do trecho caem num acerto medido, com desvio de 0 ms. Com o `cap3.js` atual, o filme todo tem 52 deixas, todas com 0 ms de desvio (`r9/cues-principal.json` contra `beats.json`). Nenhuma deixa do capítulo mudou de batida.
- **Passagem b84, contra o `cap3.js` atual:** o `cap3.js` do filme principal mudou de novo durante esta rodada (09:08). Na nova versão, a pílula vai para (540, 334, 468×78) com mola de 1,2 Hz e assenta em 41,81 s, e o cartão da carteira sai subindo de b82,5 a b83. Copiei esse arquivo para a cópia de trabalho, sem editar. A pílula vira o topo da tela sem salto, e o dedo, que entra a y 392–420, passa acima da máscara do cartão (topo em ~480; a base do dedo fica em 466) (`r9/passagem/`, `r9/folha-passagem.png`).
- **O filme principal:** depois da cópia do `cap4.js`, todos os arquivos do filme principal são iguais aos da cópia de trabalho. O q3373 renderizado do filme principal é idêntico ao da cópia (0 pixels diferentes), e o quadro de 59,983 s é idêntico ao de 0 s.
- **Loop:** o quadro de 60 s e o de 59,983 s são idênticos ao de 0 s, com 0 pixels diferentes, com e sem desfoque. A troca do b116 (58,00 s contra 58,03 s) também dá 0 (`r9/loop/`).
- **O dedo** (sondado a 1/40 de batida):
  - chega parado 0,6 batida antes do b83,5, 0,6 antes do b86, 0,53 antes do b88, 0,68 antes do b93, 0,63 antes do b99 e 0,83 antes do b111;
  - sai em até 0,4 s depois do b88, do b94, do b100 e do b112;
  - com legenda (b84–b94), o ponto mais baixo é y 1124;
  - no quadro final está fora, em (1240, 1100).
- **Contêiner:** a altura vezes o zoom fica em no máximo 895.
- **Tamanhos de texto nosso por quadro:** P15, 72; P16, 72 + 110; P17, 132; P18, 60 + 132; P19 e P20, 80.

**O que ainda segura notas em 8 (nenhuma abaixo de 8):**
1. **P15, 42,09–42,40 s:** a caixa da pílula nasce com 74% da largura (o motor corta antes de t0), e o texto branco passa da borda direita dela enquanto ela cresce (branco no branco). É do motor.
2. **P16, b93,5–b94:** a caixa da pílula sai pela opacidade. É do motor.
3. **P19, 56,03–56,08 s (q3362–q3365):** ainda ficam ~4 quadros quase brancos antes de a cortina aparecer no pé. P16: a faixa vazia embaixo do código até o dedo chegar.

## Rodada final (acabamento do diretor)

**A cópia de trabalho, antes de tudo:** copiei o `index.html`, o `filme.js`, o `trilha.js`, o `beats.js`, o `beats.json`, o `audio/music.wav` e os `capitulos/*.js` do filme principal para `filmes/_trabalho-cap4/`. Diferiam o `index.html` (o motor novo do diretor), o `trilha.js`, o `beats.js`, o `beats.json`, o `music.wav`, o `cap1.js` e o `cap2.js`. Conferido com `cmp`: depois da cópia, todos são iguais aos do filme principal. Só o `cap4.js` da cópia foi editado.

Motor novo: 8 subquadros, a boca de baixo do `sobe` a 0,42 do corpo, e a pílula que abre e fecha por recorte, de baixo para cima, sem opacidade, com a caixa nascendo 0,06 s antes do texto. Quadros em `.render-tmp/_trabalho-cap4/final/` (`-mb` = desfoque padrão de 8 subquadros; `-s1` = `sub=1`; `qNNNN` = quadro a 60 fps). `final/antes/` tem os quadros da versão da rodada 9 renderizados com o motor novo, para comparar.

### Os itens do diretor, na ordem

| # | Item | Feito | Como (e onde conferir) |
|---|---|---|---|
| 1 | **P15, b83,5–b84:** o dedo apertava e descia 40 px sem nada responder | sim | Arrasto `[83.75, 84.6]`; o move `[83.5, …]` saiu; a entrada passou para o **b82,12** (a sonda, a 1/40 de batida e 15 px/s, dá o dedo parado desde o b83,15, **0,60 batida antes do apoio**; com b82,15 dava 0,575). O dedo aperta parado de b83,65 a b84 e só desce no b84, com a borda. `final/p15/folha.png` (b83,0–b85,0). |
| 2 | **P15, b84,15–b84,65:** a borda cortava o QR em degraus e o dedo virava pilha de anéis | sim | Morph `retirada` e move do dedo do b84 a **1,5 Hz**; o dedo desce até **(850, 1060)**. Com os 8 subquadros, a borda corta o QR em degraus de ~6 px, que se leem como desfoque, e o dedo sai como uma mancha só. Da borda ao dedo: de 2 px (b84,15) a 106 px (b85). `final/p15/z-borda.png` (antes b84,30 × depois b84,25/b84,35/b84,45). |
| 3 | **P16, b88–b88,9:** o dedo saía 0,44 s depois do toque, sobre "…balcão da agência" | sim | Saída no **b88,2**, a 2,4 Hz, para **(1240, 700)**. Fica fora do quadro 0,27 s depois do toque e passa em y 700–742, acima da linha "Mostre…" (y ~820). `final/p16a/folha.png`. |
| 4 | **P16, b89,1–b89,3:** sobrava uma fileira de pingos e o código assentava com o campo inteiro | sim | O desenho da caixa, do anel e da linha sobe **24 px junto com a máscara** (easeIn, mesma curva e mesma janela da máscara). A base da máscara acaba 24 px mais alto (`topo − 24`), para cobrir o anel já subido. O código só parte em **TB(89) + 0,06**. A janela é a da máscara, de TB(89) a TB(89) + DUR_SAI15: 0,2 s neste item e 0,14 s depois do item 6. Medido nos quadros: a linha "Mostre…" sai em q2675–q2676 e some em q2677. O campo (anel e "Copiar") tem 17 001, 12 773 e 7 667 px laranja em q2677–q2679 e **0 a partir de q2680**. Em q2676 sobra uma fileira clara, de um quadro só (luminância mínima 202, 10 px de altura), que se lê como desfoque. `final/p16b-final/z-tira.png`, `final/p16b/z-residuo.png`. |
| 4a | (consequência do item 4) o rótulo colado no código | sim | Com o código partindo 0,06 s depois, o rótulo, que entrava a TB(89) + 0,2, nascia 22 px acima do alto do código. Passou a entrar a **TB(89) + 0,25**, com 29 px no primeiro quadro em que aparece (`final/p16b-final/t44.786-s1.png`), e sai de **TB(94) − 0,24 a TB(94)**, o que dá **2,0 s** na tela. `final/gap/` mostra a versão com +0,2. |
| 5 | **P16, b89,8–b91,6:** o bloco ficava alto no cartão (73 px em cima, 186 embaixo) | sim | Rótulo e código descem **40 px** (`Y_ROTULO` −56, `Y_CODIGO` 74; o destino do voo é o mesmo `Y_CODIGO`). Medido na tinta: o alto do rótulo fica a 113 px do topo do cartão (500) e a base do código, a 146 px da base (940). Arrasto em **x 985, de y 900 a 810** (moves do b91,6 e do b93), dentro do cartão. A borda esquerda do dedo (x 939) fica 31 px à direita do fim do código (908). `final/p16c/folha.png`. |
| 6 | **P16:** o CAIXA.482913 ficava grande e sozinho 1,90 s | sim | `DUR_SAI15` passou de 0,2 a **0,14 s**, e a saída do código, para **TB(94) − 0,32** (0,28 s, até − 0,04). Medido: o campo some no q2680 (44,667 s) e o código fica parado até 46,696 s. São **2,04 s** sozinho (122 quadros, de q2680 a q2801). `final/mede/`. |
| 7 | **P18, b106:** o pop chegava antes da imagem | sim | A deixa do teto passou para o **b106,5**, no acerto medido de **53,264 s** (desvio de 0 ms). A linha "Para de somar…" começa a subir a TB(106) + 0,22 (53,236 s), e no b106,5 já está quase inteira. No b106 o cartão só começa a crescer, sem som (`whoosh: 0`). `final/p18/folha.png`. |
| 8 | **P19, b112:** o thump e o whoosh caíam em 5 quadros brancos | sim | A cortina começa **exatamente em TB(112)**: 0,27 s, easeInOut, presa em y 1924. De TB(112) a + 0,07 ela vai numa camada **`frente`** (`{de: 112, ate: 112.14, atraso: 0, saida: false}`, espaço da cena, sem o recorte do contêiner) e depois no conteúdo, com a mesma borda (`topoCortina`). Em + 0,07 a caixa já vai de y −79 a 1966 e de x −115 a 1195: a troca não deixa emenda. O laranja aparece no pé a partir do q3362, com 7, 32, 79, 156, 275 e 455 px nos quadros q3362 a q3367, e passa do alto no q3372. O **pin** parte de **TB(112) + 0,18** (queda de 0,32 s, antes 0,26) e entra no quadro em q3372–q3373, sobre laranja. **Dedo:** sai `[112.02, (1320, 1100), 4 Hz]`, com o alvo além do SAI (1240, onde o motor já não desenha). Em todos os subquadros do q3366 a borda esquerda fica em x ≥ 1103: **fora a + 0,076 s** (com o alvo em 1240, ainda sobravam 3 px a + 0,084). `final/p19/folha.png`, `final/p19/z-topo.png`. |
| 9 | Pílula com o motor novo e loop | sim | 42,05–42,35 s e 46,75–47,03 s: a caixa abre e fecha por recorte, de baixo para cima, na largura cheia e sem opacidade, e o texto fica dentro dela. Em 47,03 s não sobra nada (`final/pilula/z-pilula.png`). Loop: 0 pixels diferentes (veja Conferências). |

**Correção que a rodada de crítica pediu (fora da lista do diretor):** no P15 assentado (b85,3), a base da janela de 840×890 caía no print 1372 e deixava ver 1 a 2 px do alto do ícone e das letras do "Se demorar para ler…". A janela passou para **840×880, com centro em y 715**. O topo continua em 275 (a passagem do b84 não muda: a pílula é projetada pela tela, não pelo contêiner) e a base fica em 1155 (print 1358; o cartão do QR acaba em 1336). Medido na faixa da base (y 1140–1161): luminância mínima de 238, sem tinta (`final/p15b/z-pe.png`). O dedo solta a 95 px da base.

### Notas

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P15 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | n/a |
| P16 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P17 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P18 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 9 |
| P19 | 9 | 9 | 9 | 8 | 8 | 9 | 8 | n/a |
| P20 | 8 | 9 | 8 | 8 | 8 | 9 | 9 | n/a |

Nenhuma nota abaixo de 8.

**Arquivos da rodada:**
- quadros: `final/rodada/` (27: 18 `mb` e 9 `s1`; o último é o de 59,983 s);
- folhas: `final/rodada/folha-P15-P16.png`, `folha-P17-P18.png` e `folha-P19-P20.png`;
- prova a 360 px: `final/rodada/celular-a.png` (P15–P16) e `celular-b.png` (P17–P20);
- um quadro por batida: `final/batidas/folha.png` (b84–b119);
- movimento: `final/mov/` (um quadro a cada 0,1 s, de 41,5 a 60 s);
- deixas: `final/cues.json`;
- loop: `final/loop/` e `final/loop-literal/`;
- filme principal: `final/principal/`.

**O que ainda segura notas em 8:**
1. **P16, q2676 (44,60 s):** um quadro com uma fileira clara do alto das letras da linha "Mostre…" (luminância ≥ 202). A máscara de baixo para cima, em easeIn, come a linha no começo lento da curva. Num quadro só, com desfoque, isso se lê como movimento.
2. **P15, 42,09–42,32 s:** a borda do contêiner corta o QR em 8 degraus finos (~6 px) nos quadros com desfoque. São os subquadros do motor no recorte do contêiner, e se leem como desfoque. Depois da soltura (b84,6), a cauda da mola de 1,5 Hz ainda move o dedo até 4 px entre b85,2 e b86: pela sonda a 15 px/s, ele está parado desde o b85,575 (0,43 batida antes do b86); à vista, desde o b85,2.
3. **P19, q3361–q3362 (56,017–56,033 s):** o primeiro quadro ainda não tem laranja, e o segundo tem 7 px (o easeInOut começa devagar); o laranja se lê a partir do q3363. No P16, de b89,25 a b89,5, os números da direita do código se borram na horizontal enquanto ele cresce. O borrão é liso, com 8 subquadros, e o código se lê.

**Conferências:**
- **Som:** as 52 deixas do filme caem num acerto medido, com desvio de 0 ms (`final/cues.json` contra `beats.json`). As 14 do trecho: whoosh b84, pop b85, whoosh b86, click b88, whoosh b89, pop b89,25, whoosh b94, pop b94,25, whoosh b100, pop b100,25, **pop b106,5 (53,264 s)**, whoosh e thump b112 e pop b113.
- **Loop:** `node render.mjs filmes/_trabalho-cap4/index.html --frames 0,60` e `folha.py --compara` dão 0 pixels diferentes de 2 073 600 (`final/loop-literal/`). Também dão 0: 0 contra 59,983 s com desfoque, 0 contra 60 s com `sub=1` e a troca do b116 (58,000 contra 58,033 s), em `final/loop/`.
- **O dedo** (sondado a 1/40 de batida):
  - chega parado 0,60 batida antes do b83,75, 0,50 antes do b88, 0,65 antes do b93, 0,63 antes do b99 e 0,80 antes do b111 (o b86 está no item 2 da lista acima);
  - sai do quadro 0,27 s depois do b88, 0,18 s depois do b94, 0,21 s depois do b100 e 0,076 s depois do b112;
  - com legenda (b84–b94), o ponto mais baixo é y 1064;
  - no quadro 0 e no final está fora.
- **Contêiner:** a altura vezes o zoom fica em no máximo 885.
- **Nada parado mais de 2 s:** o maior trecho sem nenhum pixel mudando é de 1,7 s, de 57,5 a 59,2 s (`final/mov/`).
- **Filme principal:** depois da cópia do `cap4.js`, todos os arquivos do filme principal são iguais aos da cópia de trabalho. Os quadros de 44,6 s e de 56,083 s renderizados do filme principal são idênticos aos da cópia (0 pixels), e o de 60 s é idêntico ao de 0 s (`final/principal/`).

## Mudanças de batida (dentro do capítulo; as passagens b84 e b120 e a legenda b84–b94 não mudaram)

- **Rolagem do P15:** a janela encolhe (morph `codigo`) no b86, e não no b87, e a tela rola desde o apoio do arrasto (b86 + 0,06 s, mola de 1,3 Hz). Numa rolagem o conteúdo acompanha o dedo. O whoosh leve fica no b86 (na lista, b87).
- **Anel no QR (b85):** dura 0,6 s (antes, 1,2 s) e recolhe durante a rolagem.
- **A abertura do b84:** o morph `retirada` vai a 1,5 Hz (antes, 2,2; 1,8 até a rodada 9), e a janela tem 840×880 com centro em y 715 (rodada final; antes, 840×890 em 720: a base mostrava a ponta do "Se demorar…").
- **A puxada (rodada final):** o arrasto vai de b83,75 a b84,6 (na lista, b83–b84). O dedo entra no b82,12, apoia parado e, do b84 em diante, desce com a borda de baixo da tela até (850, 1060), com a mesma mola de 1,5 Hz.
- **P16:**
  - no b89 a tela "Retirada" sobe 24 px e sai por uma máscara, de TB(89) a TB(89) + 0,14 s (o conteúdo vai até o b89,3, sem saída por opacidade);
  - o código grande nasce do código da caixa real, parte em TB(89) + 0,06 s e cresce em 0,8 s, com a base em y 794 (40 px abaixo da rodada 9);
  - o rótulo entra a TB(89) + 0,25 s e sai de TB(94) − 0,24 a TB(94);
  - o código sai de TB(94) − 0,32 a TB(94) − 0,04 s (0,28 s);
  - o cartão tem 1000×440.
- **P17:** respiração de 1,00 a 1,02× a partir do b94,2 (0,5 Hz), de volta a 1,00 no b98,6 (1,4 Hz).
- **P18:**
  - novo morph no b106 (`taxa_teto`, 980×580 → 980×730, 1,6 Hz, sem whoosh): o cartão cresce para o teto entrar, e o texto sobe com a mesma mola;
  - o pop leve do teto foi para o b106,5 (53,264 s, rodada final), quando a linha "Para de somar…" aparece.
- **P19:**
  - no b112 a caixa cresce para 1400×2400 (além do quadro) com mola de 6 Hz (antes, 2,6) e, no b112,75, escondida, volta a 1120×1960;
  - a cortina vai de TB(112) a TB(112) + 0,27 s, presa no pé do quadro; de TB(112) a + 0,07 s, na camada `frente`, e depois no conteúdo (rodada final; na rodada 9, de TB(112) + 0,06 a + 0,33 s, só no conteúdo);
  - o pin parte de TB(112) + 0,18 s e pousa exatamente em TB(113), com uma cúbica (rodada 9: TB(112) + 0,24 s; antes, mola de 2,2 Hz a partir de TB(112,5) − 0,05 s);
  - o pin é desenhado depois da logo, como no `F.abertura`.
- **O dedo:**
  - entra no b82,12, apoia no b83,75 e puxa a tela de b84 a b84,6, junto com a borda;
  - rola de b86 a b87, desliza até a caixa no b86,98 e toca no b88;
  - sai no b88,2 (2,4 Hz, para (1240, 700)), volta no b91,6 e arrasta de b93 a b94 em x 985, de y 900 a 810, à direita do código; sai no b94,05;
  - volta no b97,35, arrasta de b99 a b100 e sai no b100,05;
  - volta no b109,45, arrasta de b111 a b112 (x 950) e sai no b112,02, a 4 Hz, para (1320, 1100).

## Pedidos ao diretor

1. **Motor, a caixa da pílula:**
   - **Na entrada:** ela nasce com 74% da largura, porque o `if (t < t0)` corta os primeiros 0,06 s da curva dela. O texto já entra junto, com o motor novo. Pedido: desenhar a caixa desde t0 − 0,06.
   - **Na saída:** ela some pela opacidade (`globalAlpha = 1 − ex`). Pedido: sair como entra, descendo 30 px e estreitando para 60% em 0,24 s, com easeIn e sem alpha. Vale para os 4 capítulos (no cap. 4, b93,5–b94).
2. **Motor, desfoque nos movimentos longos e rápidos:** mesmo com 8 subquadros, o cap. 4 ainda usa o `borrado` (4 amostras por subquadro) na rolagem, na cortina e na queda do pin. Se o motor ganhar subquadros adaptativos (também no recorte do contêiner, cuja borda corta o QR em degraus no b84), os capítulos 3 e 4 podem tirar o `borrado`.
3. **Para todos os capítulos:**
   - quem esconde um pedaço de uma tela real pintando por cima, dentro de um conteúdo que sai, vê o pedaço vazar. O motor multiplica a opacidade do conteúdo por k na saída, e a tinta desbota junto. O cap. 4 recorta a tela com um clip evenodd;
   - no `borrado` em 'lighter', duas formas que se sobrepõem na mesma amostra se somam: um anel sobre uma tela branca satura em branco. Cada uma vai no seu próprio borrado;
   - um campo chapado inteiro passado pelo borrado sai 2 níveis fora da cor (236, 112, 28). O cap. 4 pinta direto o trecho que todas as amostras cobrem.
4. **Guia de animação, regra do dedo:** os capítulos 1 e 4 deslizam o dedo entre gestos a até 2 batidas um do outro (no cap. 4: b84,6 → b86 → b88). Pela regra literal, ele sairia e voltaria em ~0,3 s.
5. **Lista de planos e guia de estilo, para ficarem iguais ao filme:**
   - **P15:** a puxada vai de b83,5 a b84,6, e o whoosh leve vai no b86;
   - **P16:** o cartão tem 1000×440 (raio 60), com o arrasto pela faixa de baixo. O rótulo voltou a 72 px, DM Sans 700, tinta 2, como no guia;
   - **P17:** o cartão tem 980×620, em y 883;
   - **P18:** o cartão tem 980×580 (730 do b106 em diante), em y 883. O texto voltou a 60 px (D13), com as linhas da lista; o teto vai numa linha, em tinta; o fio tem 3 px, de tinta a 18%;
   - **P19:** a caixa passa por 1400×2400 entre o b112 e o b112,75. A cortina sobe do pé do quadro de TB(112) + 0,06 a + 0,33 s, e o pin cai de TB(112) + 0,24 s até o b113.
6. **Informação:** a cópia de trabalho `filmes/_trabalho-cap4/` foi ressincronizada com o `index.html`, o `cap1.js`, o `cap2.js` e o `cap3.js` atuais do filme principal, sem edição. O crítico tinha olhado a versão com o motor de 4 subquadros.
7. **Rodada final (acabamento do diretor):**
   - **item 4:** a subida de 24 px vai na janela da própria máscara, de TB(89) a TB(89) + DUR_SAI15. Com o item 6, são 0,14 s, e não os 0,2 s escritos no item. Depois do fim da máscara a caixa não é mais desenhada, e uma subida de 0,2 s andaria só ~7 px enquanto ainda se vê alguma coisa. O fim da máscara subiu 24 px junto, para cobrir o anel já subido;
   - **rótulo do P16:** com o código partindo em TB(89) + 0,06, o rótulo passou para TB(89) + 0,25, com saída de TB(94) − 0,24 a TB(94), e continua 2,0 s na tela;
   - **P15:** a janela passou para 840×880, com centro em y 715 (o topo e a passagem do b84 não mudam);
   - **pedido 1 (a caixa da pílula):** resolvido pelo motor novo. Conferido em 42,05–42,35 s e 46,75–47,03 s: abre e fecha por recorte, sem opacidade, com o texto dentro da caixa;
   - **motor:** com 8 subquadros, o recorte do contêiner ainda corta o QR em degraus de ~6 px no b84 (se leem como desfoque; o pedido 2 continua valendo);
   - **lista de planos, para ficar igual ao filme:** P15, a puxada b83,75–b84,6 e o contêiner de 840×880; P16, o dedo sai no b88,2 e arrasta em x 985; P18, o pop leve no b106,5; P19, a cortina de TB(112) a + 0,27 s e o pin a partir de TB(112) + 0,18 s.
