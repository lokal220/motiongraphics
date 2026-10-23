# Crítica: capítulo 3, a virada e o endereço (P11–P13, batidas 44–64, 22–32 s)

Arquivo: `filmes/09-diretor/capitulos/cap3.js`. Quadros em `.render-tmp/09-diretor/cap3/` e folhas em
`.render-tmp/09-diretor/cap3-*.png` (cada folha tem a versão `-celular`, com 360 px por quadro).
Os tempos abaixo estão em batidas (`F.TB(n)`); b44 = 22,015 s.

## P11: a virada
### Rodada 1
Quadros: b44.5, 45.5, 46.5, 47.6 (`cap3-p11-r1`) e a tira da virada b43.8–45.3 a cada ~0,06 s (`cap3-p11-tira1`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 6 | 8 | 7 | 6 | 7 | 8 | 7 |

Problemas: 1) No tempo forte b44 só o motor age (faixas, fundo, forma): o contêiner fica liso e vazio por 0,6 s e o primeiro laranja só chega no b46,3, longe da virada. 2) O texto a 104 px ocupa 73% da largura do cartão: sobra branco dos lados, o cartão parece vazio. 3) O sublinhado nasce depois da palavra e só como enfeite; não conduz o olho.
Correções: o traço laranja passa a nascer no b44 (+0,16 s), na largura da frase, como a primeira coisa desenhada depois da virada; no b46 as duas pontas correm em molas diferentes (3,4 e 2,8 Hz) até ficar só sob "recebe" (o mesmo indicador que estica do P12). Texto a 120 px (22 px no celular), bloco centrado no cartão.

### Rodada 2
Quadros: b44.4, 45.5, 46.3, 46.6, 47.6 (`cap3-p11-r2`) e a tira da saída e da transformação b47.6–49.0 (`cap3-tira-48`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 7 | 9 | 7 |

Problemas: 1) O traço nasce na ponta esquerda enquanto o contêiner ainda está estreito (vem de 980 para 1560 px): nos primeiros 0,2 s a ponta fica cortada pela borda e parece que o traço vem de fora. 2) Profundidade: cartão e texto são uma camada só; a respiração de 3,5% aumenta tudo junto. 3) Na saída (b47,8–47,95) sobram por 1–2 quadros pedacinhos das descendentes (p, q, g) na boca da máscara; é o `a.sobe` do motor e o desfoque de movimento cobre.
Correções: o traço passa a crescer do meio para as pontas, abrindo junto com o contêiner; o texto (e o traço) ganham paralaxe leve: escala 1 + 0,6 × (zoom da câmera − 1), ficando um pouco mais perto que o cartão. O 3 fica como está (motor) e anotado.

### Rodada 3
Quadros com 4 subquadros (desfoque de movimento do render final): b44.15, 44.3, 45.5, 46.6, 47.6 (`cap3-p11-r3`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 8 |

Problemas: 1) No b44,15 ainda se veem as bolhas do capítulo 2 saindo (é a saída de 0,12 s delas, não é meu conteúdo); o meu traço só nasce no b44,3, como um ponto no meio. 2) A paralaxe do texto é sutil (2% em 1,5 s): ajuda, mas não é uma segunda camada evidente. 3) Restos das descendentes na saída por máscara (motor), ver rodada 2.
Correções: nenhuma obrigatória (todas as notas ≥ 8). Confiro a saída com desfoque na rodada 4.

### Rodada 4
Quadros com 4 subquadros: b44.6, 45.3, 46.25, 47.8, 47.92 (`cap3-p11-r4`), para conferir a abertura do traço e a saída.

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 8 |

Problemas: 1) No b46,25 a segunda linha sobe através do traço que está encolhendo: os dois se cruzam por 0,1 s (lê como um gesto só, fica). 2) Na saída com desfoque (b47,92), os restos das descendentes viram um rastro leve: aceitável, mas é o primeiro lugar a mexer se o motor ganhar a correção pedida abaixo. 3) Nada novo entre o b46,6 e o b48 (1 s parado, dentro do limite de 2 s).
Correções: nenhuma. Plano fechado com todas as notas ≥ 8.

## P12: o endereço
### Rodada 1
Quadros: b48.8, 49.2, 51.2, 53.4, 55.2 (`cap3-p12-r1`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 8 | 6 | 6 | 7 | 8 | 7 |

Problemas: 1) O anel pula devagar (mola de 2,1 Hz na borda de trás): 0,2 s depois do toque ele ainda abraça dois cartões ao mesmo tempo e parece uma seleção dupla. 2) O zoom do Complemento (1,35 centrado em y 545) aperta tudo: o LOKAL12 encosta no topo e a pílula cobre a parte de baixo do cartão "Nome". 3) A tela inteira (título + quatro cartões, 1235 px do arquivo) não cabe em 1080 com o texto-chave a 56 px ou mais.
Correções: decidi pela rolagem dentro do contêiner (a tela rola como no celular, de y 330 para y 940 do arquivo, no b52, com a mesma mola do cursor), ampliação 1,25 (valores com 62 px de corpo). Anel com bordas a 4,6 Hz (frente) e 3,2 Hz (trás). Câmera em dois tempos: b53 aproxima a 1,35 com o LOKAL12 no terço de cima; b54 desce junto com o cursor até o cartão "Nome" inteiro acima da pílula; b56 volta a 1,0.

### Rodada 2
Quadros: b48.8, 49.2, 51.2, 53.6, 55.2 (`cap3-p12-r2`) e as tiras dos toques: b48.9–49.8 (`cap3-tira-49`), b50–51.6 (`cap3-tira-51`), rolagem e zoom b52–54 (`cap3-tira-53`), b54.3–57.6 (`cap3-tira-55`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 7 | 8 | 8 | 8 | 9 | 7 |

Problemas: 1) No celular, "Copiar" fica com 8 px e as dicas com 6 px a 1,0 de zoom; os valores ficam no limite (62 px de corpo). 2) O anel em volta do Complemento fica colado na borda tracejada laranja do próprio cartão: duas linhas laranja quase juntas. 3) No b54, com o zoom recém-chegado, a pílula cobre "Ana Souza" por meio segundo, até a câmera descer.
Correções: ampliação 1,3 (valores e LOKAL12 com 65 px de corpo, 88 px no zoom; "Copiar" com 48 px), contêiner 1400×960; anel 14 px do arquivo para fora do cartão (18 px na tela) e raio 56; câmera recalculada para a nova escala (b53 em y 480, b54 em y 680, o que põe o cartão "Nome" inteiro acima da pílula já no b54,6). A sincronia ficou certa nas tiras: no b49, b51, b53 e b55 o botão afunda, o cursor encolhe e o anel sai no mesmo quadro do clique.

### Rodada 3
Quadros com 4 subquadros: b48.8, 49.6, 51.6, 53.8, 55.6 (`cap3-p12-r3`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 7 | 8 | 9 | 8 |

Problemas: 1) No b53,8 a pílula ainda cobre "Ana Souza": o zoom do b53 (centro em y 480) empurra o cartão "Nome" para baixo, para dentro da pílula, até a câmera descer no b54. 2) No b55,6 o rótulo "Complemento (obrigatório)" encosta no topo do quadro (aceitável: o LOKAL12 continua inteiro). 3) Três movimentos de câmera em 3 s (b53, b54, b56).
Correções: o zoom do b53 passa a mirar y 560 (LOKAL12 no terço de cima, cartão do Complemento inteiro e "Ana Souza" acima da pílula); o b54 desce só até y 670 (110 px de cena em vez de 200), o que acalma a segunda mudança de câmera.

### Rodada 4
Quadros com 4 subquadros: b53.3, 53.8, 54.4, 55.0, 57.2 (`cap3-p12-r4`), mais a folha final com b48.8–57.2 (`cap3-final`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

Problemas: 1) No b57,2 (zoom de volta a 1,0) a pílula cobre o canto de baixo à esquerda do contêiner e a dica "O seu nome…" fica no limite (é camada, não esconde nada que importe). 2) A tela ampliada 1,3× é um JPEG: de perto, as bordas finas dos cartões ficam um pouco moles (só aparece na tela cheia, não no celular). 3) O anel só se fecha por inteiro no b49,8 (desenho de 0,42 s); no b49,6 ainda há uma fresta no canto de cima.
Correções: nenhuma obrigatória. Plano fechado com todas as notas ≥ 8.

## P13: o mapa
### Rodada 1
Quadros: b58.6, 59.6, 60.6, 62, 63.6 (`cap3-p13-r1`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 6 | 7 | 6 | 7 | 8 | 6 |

Problemas: 1) A caixa nasce em cima da sacola e termina em cima do pin: os dois ícones se embaralham. 2) Os ícones (sacola 92 px, casa 116 px) viram 18–20 px no celular e a casa esmaecida some. 3) A rota antiga até a casa nunca aparece inteira (ela se desenha até o b59 e já recolhe), e a grade de quadras iguais lê como papel quadriculado, não como bairro.
Correções: a caixa sai da porta da loja, se desenha e para 96 px antes do pin; ícones a 1,35× (casa a 1,3×); a rota até a casa se desenha em 0,38 s logo na entrada e fica inteira até o b59; ruas com larguras e espaçamentos diferentes, com uma avenida mais larga onde a rota passa; contêiner um pouco maior (1320×760).

### Rodada 2
Quadros: b58.6, 59.6, 60.6, 62.5, 63.6 (`cap3-p13-r2`) e as tiras b57.7–59 (`cap3-tira-58`), da queda do pin b59–60.8 (`cap3-tira-60`) e da caixa b61–64 (`cap3-tira-62`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 7 | 7 | 9 | 7 |

Problemas: 1) A caixa é só contorno: o tracejado laranja aparece por dentro dela; e ela nasce encostada na sacola (b62,15). 2) O mapa é uma camada só (quadras, ícones e pin crescem juntos na respiração) e o lado esquerdo do quadro fica vazio até a pílula chegar no b61. 3) A rota antiga até a casa aparecia sobre o branco ainda não revelado pela cortina.
Correções: a caixa ganha fundo branco (tampa a rota por baixo) e sai 44 px adiante da porta da loja; primeiro plano (ícones, rotas, caixa e pin) com a mesma paralaxe leve do P11; mapa maior (1400×760, centro em x 1120); cortina das quadras em 0,36 s e rota antiga sincronizada com ela (0,04–0,40 s), inteira do b58,9 ao b59.

### Rodada 3
Quadros com 4 subquadros: b58.9, 59.6, 60.5, 62.4, 63.6 (`cap3-p13-r3`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 7 |

Problemas: 1) No b62,4 a caixa ainda está se desenhando e o fundo branco só entrava com o desenho completo: com o desfoque, o tracejado aparece através dela. 2) A caixa faz 650 px em 0,5 s (rápida, mas o desfoque lê bem). 3) O lado esquerdo do quadro continua vazio até o b61 (é o espaço da pílula; mantenho).
Correções: o fundo branco da caixa entra junto com o traço (sempre desenhado); o resto fica.

### Rodada 4
Quadros com 4 subquadros: b59.95, 60.0, 62.2, 62.4, 62.7 (`cap3-p13-r4`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 8 | 8 | 9 | 8 |

Problemas: 1) A queda do pin (`easeIn` em 0,3 s) termina a ~100 px por quadro: com 4 subquadros aparecem 4 pins soltos empilhados no b59,95, em vez de desfoque. 2) A sombra do pin nasce como um pontinho no meio do mapa antes de o pin aparecer. 3) A caixa, no trecho vertical, fica listrada pelo desfoque (normal para a velocidade).
Correções: queda com aceleração de gravidade (u²) em 0,42 s, vindo de cima da borda do contêiner: velocidade final de ~45 px por quadro, que vira desfoque contínuo; a sombra só cresce no último terço da queda. Volta da câmera do b62 com mola de 0,8 Hz, para assentar (98,6%) antes do b64.

### Rodada 5
Quadros com 4 subquadros: b59.5, 59.7, 59.8, 59.9, 59.96, 60.0, 60.1, 60.6, 62.6, 63.6, 64.0 (`cap3-p13-r5`, `cap3-p13-r5b`, `cap3-p13-r5c`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

Problemas: 1) O lado esquerdo do quadro fica vazio do b58 ao b61 (é o lugar da pílula; fica). 2) A caixa é pequena no celular (12 px), mas lê como "pacote" pelo movimento. 3) A rota antiga fica inteira só ~0,15 s antes de recolher; lê como "essa rota foi desfeita", que é a ideia.
Correções: nenhuma. Plano fechado com todas as notas ≥ 8.

## Resumo

### Notas finais

| plano | rodadas | gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|---|---|
| P11 a virada | 4 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |
| P12 o endereço | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P13 o mapa | 5 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |

### Quadros-chave para a folha de contato do diretor
- **P11: b46.6 (23,32 s)**: as duas linhas e o traço laranja já sob "recebe".
- **P12: b53.8 (26,92 s)**: zoom no Complemento, LOKAL12 real a 88 px, anel laranja, cursor no Copiar e a pílula.
- **P13: b62.6 (31,32 s)**: mapa, casa esmaecida, pin, rota laranja, caixa a caminho e a pílula.

Os `chave` do capítulo foram trocados para os quadros que usei na revisão: P11 [44.6, 45.5, 46.6, 47.6], P12 [48.8, 49.6, 51.6, 53.8, 55.6, 57.2], P13 [58.9, 59.5, 60.5, 62.6, 63.6]. Folha final: `.render-tmp/09-diretor/cap3-final.png` (e `-celular`).

### O que mudou na decupagem (e por quê)
Batidas mantidas: morphs (44, 48, 58), cliques (49, 51, 53, 55), legendas (53–58, 61–64) e a deixa (pop no b60).
- **`c3_endereco`**: de (1240, 540, 1000×1000) para (960, 540, 1400×960). O título e os quatro cartões têm 1235 px de altura no print; para os valores terem 56 px ou mais (ficaram com 65, e 88 no zoom) o recorte vai a 1,3× e não cabe inteiro em 1080. A tela rola dentro do contêiner no b52 (y 330 → 940 do arquivo, mola de 2,2 Hz, a mesma do cursor), como no celular. Centralizei porque na referência a interface real fica no centro.
- **`c3_mapa`**: de (1200, 520, 1240×760) para (1120, 480, 1400×760). Ícones maiores e a borda de baixo (860) fica acima da pílula. Continua deslocado para a direita, então a transformação do b64 para o balcão (960, 540, 1560×760) ainda se lê.
- **Cursor**: novo movimento no b44 que leva o cursor do capítulo 2 (parado em 1760, 1010) para fora do quadro; sem isso ele aparecia sozinho no canto quando a faixa de baixo recolhe. A ida ao primeiro Copiar sai no b48 (com a transformação) e não no b47: assim não fica parado sobre o texto do P11. As pontas foram calculadas pelos retângulos medidos (74% × 72% de cada botão, a ponta no quarto inferior direito): CEP (1473, 565), Número (1473, 893), Complemento (1471, 430, já com a rolagem), Nome (1473, 786). O cursor sai do quadro no b56.
- **Câmera** (estava vazia): b44 estabiliza; b45 respiração a 1,035; b48 1,0; b50 1,03; b53 1,35 com o LOKAL12 no terço de cima; b54 desce até o cartão "Nome" (110 px de cena) para tirá-lo de trás da pílula; b56 volta a 1,0; b59 1,045 puxando para o pin; b62 volta a 1,0 antes do b64.
- **Acréscimos sem som novo**: o traço laranja do P11 nasce no b44 e encolhe até "recebe" no b46. No P13, a rota de sempre até a casa recolhe no b59, junto com a casa esmaecendo, e uma caixa percorre a rota laranja do b62 ao b63. A deixa do b60 continua a única deixa do capítulo.

### Regras conferidas
- Função pura do tempo: sem `Math.random`, `Date`, `setTimeout`, `requestAnimationFrame` nem estado; tudo sai de `TB(n)`, molas e `F.camera(t)`. `render.mjs --cues` roda sem erro e as deixas do capítulo caem em 22,011 (whoosh 1,4), 24,013, 24,509 / 25,512 / 26,509 / 27,509 (cliques), 29,011 e 30,011 (pop do pin).
- Laranja só depois do b44 e só no que aponta: o traço sob "recebe", o anel, o pin e a rota.
- Nada entra por fade: o texto sobe pela máscara, os traços se desenham, a tela real e as quadras entram por máscara e o pin cai pela borda.
- Interface real só por recorte e ampliação de `app-endereco.jpg`. O toque é o botão real redesenhado com escala (`impulse`) sobre o branco do próprio print (que é 255,255,255 em volta dos botões); nenhum texto foi trocado e não há "Copiado".
- Texto desenhado por quadro: um tamanho no P11 (120 px) e a pílula de 84 px no P12/P13.
- Desempenho: uma imagem por quadro (mais um botão durante o toque) e cerca de 25 preenchimentos no mapa; nada de `getImageData` nem filtros.

## Pedidos ao diretor
1. **`a.sobe`, saída:** o texto sobe só `lh` (1,2 × corpo), e as descendentes (p, q, g) são as últimas a sair da máscara. Por 1–2 quadros ficam pedacinhos na boca da máscara (visto no b47,92). Sugestão: subir `lh + 0,3 × corpo` na saída. Afeta todos os capítulos e as pílulas.
2. **Cursor na virada:** o capítulo 2 deixa o cursor em (1760, 1010), escondido pela faixa de baixo. Quando a faixa recolhe no b44 ele apareceria, por isso o cap3 o tira do quadro no b44 (`[44, FORA, 2.2]`). Se o capítulo 2 quiser outro lugar de descanso, basta combinar; o meu movimento continua valendo.
3. **Câmera entre capítulos:** o cap3 devolve a câmera a (1, 960, 540) a partir do b62 (98,6% no b64). Se o capítulo 4 quiser começar com outro enquadramento, ele precisa pôr a própria entrada no b64.
4. **Opcional:** a paralaxe leve que usei no P11 e no P13 (`1 + 0,6 × (zoom − 1)` no primeiro plano) poderia virar um ajudante do motor (por exemplo `a.paralaxe(k)`), para os quatro capítulos usarem o mesmo número.
