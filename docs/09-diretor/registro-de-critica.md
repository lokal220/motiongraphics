# Registro de crítica: 09-diretor

**Critérios** (nota de 1 a 10): gancho, leitura a 360 px de largura, movimento, composição, profundidade, sincronia do som e acabamento.

**Regra:** cada plano tem no mínimo 3 rodadas. Corrigir os 3 maiores problemas e repetir até toda nota ser 8 ou mais.

O registro plano a plano de cada animador está em `docs/09-diretor/critica/cap1.md` … `cap4.md`. Este arquivo junta:
- as notas finais de cada plano;
- as rodadas do diretor sobre o filme inteiro (folha de contato, animático, acabamento e render final).

## Notas finais por plano (fase 1, dos animadores)

| Plano | Rodadas | gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|---|---|
| P01 | 3 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P02 | 3 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |
| P03 | 3 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |
| P04 | 3 | 8 | 9 | 8 | 8 | 9 | 9 | 8 |
| P05 | 3 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| P06 | 4 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| P07 | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P08 | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P09 | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P10 | 4 | 9 | 8 | 8 | 8 | 8 | 9 | 8 |
| P11 | 4 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |
| P12 | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P13 | 5 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P14 | 3 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P15 | 4 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |
| P16 | 3 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |
| P17 | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P18 | 3 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P19 | 3 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |

O detalhe de cada rodada (notas, os 3 problemas e as correções) está em `docs/09-diretor/critica/cap1.md` … `cap4.md`.

## Rodadas do diretor

### D1: folha de contato dos quadros parados (um por plano, 4 subquadros), 23/10

Folhas: `.render-tmp/09-diretor/diretor/folha-quadros-r1.png` e `-cel.png` (360 px).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | — (parado) | 8 | 8 | — (parado) | 7 |

Problemas:
1. **P15 (34–36 s):** o celular pequeno no canto de baixo à direita não se lê a 360 px e parece etiqueta de canto.
2. **P18 (40–44 s):** a lista fica inteira na tela só ~0,3 s (b84–b86). Não dá para ler.
3. **P16–P17 (36–40 s):** texto borrado por escala. As telas do site são JPG de 540 px ampliados ~2,8×, e "Pagar R$ 5,90 e gerar QR Code" fica mole.

Correções:
1. O celular saiu do P15.
2. P18 reprogramado: frase no b81, lista no b82 (2 s na tela, rolando com aceleração e freio), volta no b86. O whoosh foi para o b82.
3. Depende de prints em alta resolução das telas "Detalhe da encomenda" e "Retirada" (pedidos à usuária). Até lá, ficam as do site.

Integração: a virada (b44) desfaz em camadas a pilha do P10 (`F.favores`, do capítulo 2), e o primeiro traço laranja só nasce com o contêiner limpo (b44 + 0,45 s). A saída do texto pela máscara passou a subir 0,3 do corpo a mais, sem sobrar perna de letra.

### D2: animático 960×540 com a trilha provisória, 23/10

Animático: `.render-tmp/09-diretor/diretor/animatico-540.mp4`.

A energia de movimento foi medida por batida, como média da mudança entre quadros (`.render-tmp/movimento.py`):
- a batida mais parada era a **b70 (35,0–35,5 s, P15)**, com 0,025 contra mais de 0,19 em todas as outras;
- nenhum trecho de 0,5 s ficou sem mudança visível;
- a ação mais rápida está em 21,02–21,22 s (P10, a pilha se apertando).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 8 | 8 | 8 | 7 |

Problemas:
1. **b70–b71 (35,0–36,0 s):** batida morta no P15. A notificação fica parada e nada a conduz até a tela de pagar.
2. **P16–P17:** texto borrado por escala (continua da D1; depende dos prints em alta resolução).
3. **P18:** o bloco voltando ao centro (43,0–43,6 s) vira um rastro de 4 cópias no desfoque de movimento. Aceito, porque é desfoque natural de um movimento rápido com mola.

Correção: o cursor vai à notificação no b70, toca no b71 (ela afunda) e desce até o botão de pagar no b72, conduzindo a mudança. Os cliques agora são 71 e 73.

### D3: render final, 23/10

`resultados/09-diretor.mp4`:
- **Vídeo:** 45,00 s, 2700 quadros a 60 fps, H.264 yuv420p, CRF 16, BT.709.
- **Som:** -14,0 LUFS, pico -1,4 dBFS.
- **Deixas:** as 66 caem em batidas da grade medida; na mixagem final, o ataque fica a 0 ms de mediana.
- **Loop:** t = 45 s é idêntico a t = 0 (0 pixels diferentes). A emenda de `out/09-diretor/teste-de-loop.mp4` é contínua.

Pendências para a crítica seguinte:
- **Prints em alta das telas de pagar e de retirada:** P16–P17 ainda saem borrados por escala.
- **Whooshes sem acerto musical:** os da b32 e da b82 estão na grade, mas sem ataque da trilha embaixo.

## 10-depois-da-critica: crítica exigente do 09

O 09 ficou intacto. As correções foram feitas na cópia `filmes/10-depois-da-critica/`.

Materiais de cada rodada em `out/10-critica/rN/`:
- a folha a 2 quadros por segundo;
- a tira de 12 quadros seguidos em volta da ação mais rápida (medida pela energia de movimento);
- o teste de celular a 360 px (vídeo e folhas).

Só os segundos afetados foram renderizados de novo.

**Critérios:** gancho nos 2 primeiros segundos, leitura em tela de celular, qualidade do movimento (molas, nenhum quadro morto), variedade (coisa nova a cada 2 a 4 s), composição, fidelidade à marca e sincronia do som.

| Rodada | gancho | leitura no celular | movimento | variedade | composição | marca | sincronia |
|---|---|---|---|---|---|---|---|
| R0 (o 09) | 7 | 7 | 7 | 9 | 7 | 8 | 8 |
| R1 | 7 | 8 | 8 | 9 | 7 | 8 | 8 |
| R2 | 8 | 8 | 8 | 9 | 8 | 8 | 9 |
| R3 | 8 | 9 | 8 | 9 | 8 | 9 | 9 |

### R0: os 3 maiores problemas
1. **44,00–44,25 s (b88), emenda do loop:** a ação mais rápida do filme era um fade, com a cartela laranja desbotando para pêssego e o logo sumindo por opacidade. Em 40,0 s (b80), a entrada na cartela também passava pelo pêssego, num cartão laranja de margens com cara de moldura.
2. **8,00–8,40 s (b16), texto se sobrepondo na troca:** as três notificações se comprimiam umas sobre as outras.
3. **32–34 s e 38–40 s (P14, P17), deslizando em vez de acelerar e frear:** a deriva da parede e do balcão era em velocidade constante.

**Correções:**
1. **Cortinas da marca:** na b80, o laranja sobe por dentro do contêiner. Na b88, a cartela encolhe ainda laranja até a forma do gancho e uma cortina branca desce por dentro. A troca de cor fica escondida, e o loop continua exato (t = 45 s idêntico a t = 0).
2. O texto das duas notificações mais velhas sai pela máscara antes da compressão.
3. A deriva passou a usar `easeInOut`.

### R1: os 3 maiores problemas
1. **1,0–2,0 s, gancho:** a frase "Ninguém em casa." ficava pequena no quadro largo (~13 px a 360 px).
2. **34–36 s (P15), composição:** a notificação grudada no alto, com um vazio até a pílula.
3. **16,0 s (b32) e 41,0 s (b82), sincronia:** whooshes sem ataque da trilha embaixo.

**Correções:**
1. A câmera aproxima até a notificação no b2 (z 1,16) e volta no corte do b4.
2. A notificação foi para o meio do quadro (cy 450), e o toque do cursor acompanha.
3. Um aro na b32 e um bumbo com marimba na b82. A trilha foi gerada e medida de novo: as 66 deixas caem num acerto medido, a menos de 20 ms.

### R2
Todas as notas estão em 8 ou mais. Ficou um ponto aberto: o texto borrado por escala nas telas de pagar e de retirada (36–38 s). Os prints em alta já foram enviados como imagem na conversa e entram assim que estiverem em arquivo no projeto.

### R3: telas em alta resolução
Chegaram os prints do app "Detalhe da encomenda" e "Retirada", em 1080×2000. Estão em `assets/09/app/app-encomenda.jpg` e `app-retirada.jpg`; os arquivos são JPEG.
- O layout é o mesmo das telas do site, com o dobro da resolução, então as medidas batem ×2 com diferença de no máximo 2 px.
- No capítulo 4 do 10 só o recorte no arquivo dobra (`R2`); as posições e as escalas ficaram iguais.
- **36,0–40,0 s:** o "Pagar R$ 5,90 e gerar QR Code", o "Total a pagar R$ 5,90" e o "Pagamento confirmado" ficaram nítidos (`out/10-critica/r3/p16-antes-depois.png`).
- Leitura no celular e fidelidade à marca sobem para 9. Não sobra problema aberto da lista.
