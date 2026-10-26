# Crítica: capítulo 3, o preço e o Pix (P10–P14, batidas 56–84, 28–42 s)

Arquivo: `filmes/11-tutorial-primeiro-acesso/capitulos/cap3.js` (trabalhado na cópia `filmes/_trabalho-cap3`).

Os quadros de cada rodada ficam em `.render-tmp/_trabalho-cap3/rN/`. O nome diz o plano, a batida e o tempo, e `_desfoque` marca os quadros renderizados com o desfoque de movimento padrão (4 subquadros); os outros saem com `sub=1`. Em cada pasta:
- `folha.png` é a folha de contato;
- `folha-360.png` é a prova a 360 px de largura;
- na rodada 4 e na 5, `tira/` guarda o capítulo a 10 quadros por segundo (27,5 a 42,5 s), usado para medir os trechos parados;
- na rodada 5, `passagem-b56/` guarda o teste da passagem com o `cap2.js` atual da cópia do capítulo 2 (numa cópia temporária, já apagada);
- nas rodadas 6 e 7 (depois da crítica independente), `principal/` guarda os mesmos instantes renderizados com o motor, o `cap2.js` e o `cap4.js` do filme principal (8 subquadros), num espelho em `.render-tmp/_principal-cap3/` que só recebe uma cópia do `cap3.js`.

A batida n cai em n × 0,5 + 0,013 s na grade medida (`F.TB`). As deixas foram conferidas com `--cues` contra `beats.json`.

Notas de 1 a 10. "Valores" é n/a quando o plano não tem valor. P10–P12 têm os preços; P13 tem o R$ 5,90 do total e do botão; P14 não tem valor.

## Rodada 0 (os itens da crítica dos quadros parados, resolvidos antes da rodada 1)

- **O dedo nos preços (P10–P12).** Ele não fica mais estacionado em (900, 1150).
  - Depois de cada arrasto ele sai do quadro pela direita (b61,1 e b66,1, mola de 1,8: some em 0,25 s).
  - Ele volta pela direita no b58,6, no b63,6 e no b68,6, e chega parado no b59,5, no b64,5 e no b69,5: meia batida antes de cada arrasto.
  - Cada arrasto começa dentro do cartão, a 40 px da base (cartão de 400 a 1040, dedo em y 1000), e sobe 100 px até 900, em x 920, à direita dos rótulos e longe do valor.
  - Saindo e entrando pela direita, ele nunca passa pela pílula da legenda e fica sempre acima de y 1250.
- **Arrasto b55–b56.** O capítulo 2 entrega o dedo parado em (580, 845), 40 px acima da base do total. Daqui ele sobe reto até (580, 745), longe do R$ 5,90.
- **Alinhamento.** O texto do cartão começa em x 116, o mesmo eixo da legenda. O valor ganhou o espaçamento do guia de estilo, −0,03 em (o motor usa −0,02 por padrão). Medido na tinta, o R$ 19,90 fica com 87 px de folga à esquerda e 81 à direita; antes eram 84 e 62.
- **P13: composição.** O contêiner continua com a forma do botão real e sem sombra, e o anel continua na camada da frente.
  - O botão ficou em 0,93× (919×154). O guia pede largura de até 960 com câmera a 1,04, e com isso o anel fica a 44 px da borda.
  - O empurrão é de 1,04, a 0,6 Hz. O contexto do mesmo print entrou na rodada 2 (ver lá).
- **P14: o selo da carteira.** Do b76 ao b80 aparece o recorte real "Saldo suficiente", com o check verde e o texto: print [752, 1496, 986, 1623], com 8 px de branco em volta (o fundo do cartão, branco puro). O R$ 38,20 fica de fora (x 259–464). O selo vai 96 px abaixo da pílula e entra e sai como o texto: sobe por dentro de uma máscara, opaco.
- **P14: a pílula.** No b80 ela sobe para (540, 334), com 468×78. A passagem do b84 não mudou: ver a rodada 5.
- **O voo do R$ 5,90 (b56).** Ele parte do valor do total (cena x 710, base ~808) com mola de 1,6 Hz. Ver a rodada 1, que achou o texto sobreposto.

## Rodada 1

Quadros (`r1/`): P10 b55.5, b56.05, b56.2, b56.4, b60.5 (com desfoque), b58.2 e b59.6; P11 b61.1, b61.4, b65.5 (com desfoque) e b63.2; P12 b66.4, b70.5 (com desfoque) e b68.2; P13 b71.2, b72.15 (com desfoque), b71.6 e b73.2; P14 b74.15, b76.4, b80.3, b83.6 (com desfoque), b75, b78 e b82; P15 b84.3 (a passagem).

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P10 | 7 | 9 | 6 | 8 | 8 | 9 | 6 | 9 |
| P11 | 7 | 9 | 7 | 8 | 7 | 9 | 7 | 9 |
| P12 | 7 | 9 | 7 | 8 | 7 | 9 | 7 | 9 |
| P13 | 7 | 8 | 8 | 6 | 7 | 9 | 7 | 8 |
| P14 | 6 | 8 | 6 | 7 | 7 | 9 | 6 | n/a |

O que foi conferido:
- **Som.** As 13 deixas do capítulo caem num acerto medido, todas a 0 ms: whoosh b56, pop b56,25, whoosh e pop b61 e b66, whoosh b71, click b72, whoosh e pop b74, pop b76, whoosh b80 e whoosh b84.
- **Texto.** No máximo dois tamanhos nossos por quadro (240 e 72 nos preços; só a legenda de 72 no P13 e no P14), todos dentro da área segura.
- **Leitura a 360 px.** O R$ 19,90 fica com 80 px de corpo. "Saldo suficiente" fica pequeno, mas legível.

Os 3 maiores problemas:
1. **P10, b56,05–b56,4 (28,04–28,21 s, `P10_b56.2_28.11s_desfoque.png`).** O R$ 5,90 voa a ~2400 px/s, e os 4 subquadros dão 4 cópias a 10 px uma da outra: texto sobreposto. Mais dois defeitos no mesmo trecho:
   - na troca (`P10_b56.05_28.04s_desfoque.png`), o nosso R$ 5,90 era 20% mais largo que o do app (267 contra 223 px) e passava do anel;
   - o contêiner, que cresce no b56, mostrava o cartão da carteira (o check verde e "Saldo da carteira") enquanto o print saía.
2. **P14, b74–b74,2 (37,0–37,1 s, `P14_b74.15_37.09s_desfoque.png`).** O botão laranja sai por opacidade (um fantasma laranja-claro) antes de a pílula entrar, e isso se lê como fade. Na subida do b80 (`P14_b80.3_40.16s_desfoque.png`, 2 Hz), o texto da pílula sai em 4 cópias.
3. **P11 e P12, b61–b61,2 e b66–b66,2 (30,5–30,6 s, `P11_b61.1_30.56s_desfoque.png`).** O cartão fica vazio por ~0,15 s entre uma linha e outra: a velha saía em TB − 0,26 e a nova entrava em TB + 0,12. A troca não rolava, abria um buraco.

Também notado: o P13 é um botão sozinho de 154 px num quadro de 1920 (composição 6).

Correções:
- **O valor na troca.** Medido glifo a glifo no quadro da troca (b56 − 0,005 s contra b56 + 0,002 s): a 67 px e com a base em 802, o nosso R$ 5,90 cai sobre o do app (mesma largura, o "5" 3 px mais alto).
- **Desfoque liso.** Novo ajudante `borrado`: cada subquadro soma mais 4 amostras num buffer ('lighter', 1/4 cada), e o voo passa a ter 16 amostras por quadro. Com `sub=1`, desenha uma vez.
- **O resto do print.** Fora da janela antiga do total (920×330), ele é coberto de branco enquanto sai (0,14 s), e o original do valor some no quadro da troca. A carteira nunca aparece.
- **A troca de linha.** Ela rola: a velha sai em TB − 0,14 e a nova sobe em TB + 0,02. Os rótulos entram 0,12 e 0,19 s depois do valor; no P10, 0,4 s depois, para o valor chegar primeiro.
- **A pílula nasce do check.** Um círculo cresce a partir dele e cobre o botão, sem opacidade.
- **Molas e selo.** A subida do b80 passou de 2 para 1,4 Hz, e o selo para 1,5× (o máximo do guia).
- **O pop do b76.** O selo entra em b76 + 0,02, para o pop cair na entrada.

## Rodada 2

Quadros (`r2/`): P10 b55.6, b56.04, b56.15, b56.3, b60.5 (com desfoque), b58.2 e b59.6; P11 b61.0, b61.15, b65.5 (com desfoque) e b63.2; P12 b66.1, b70.5 (com desfoque) e b68.2; P13 b71.2, b72.15 (com desfoque), b71.6 e b73.2; P14 b74.1, b74.3, b76.3, b80.25 (com desfoque), b75, b78 e b82; P15 b84.3.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P10 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P11 | 7 | 9 | 7 | 8 | 7 | 9 | 7 | 9 |
| P12 | 7 | 9 | 7 | 8 | 7 | 9 | 7 | 9 |
| P13 | 7 | 8 | 7 | 7 | 7 | 9 | 7 | 8 |
| P14 | 7 | 8 | 6 | 8 | 7 | 9 | 7 | n/a |

Os 3 maiores problemas:
1. **P14, b80,25 (40,14 s, `P14_b80.25_40.14s_desfoque.png`).** Mesmo a 1,4 Hz, o texto "Pagamento confirmado" sai em 4 cópias. No nascimento (`P14_b74.1_37.06s_desfoque.png`), a borda do círculo cresce ~40 px por subquadro e sai em faixas, e o contêiner sobe ao mesmo tempo: "Pagamento" e "gerar QR Code" aparecem lado a lado.
2. **P11 e P12, b61,15 e b66,1 (30,59 e 33,06 s, `P11_b61.15_30.59s_desfoque.png`, `P12_b66.1_33.06s_desfoque.png`).** A rolagem deixa tiras da linha velha na boca da máscara (o pé do R$ 5,90 e dos rótulos) enquanto o valor novo sobe: dois valores na mesma máscara.
3. **P13, b71–b71,12 (35,5–35,6 s, `P13_b71.2_35.61s_desfoque.png`).** O cartão encolhe vazio e o botão pula para dentro, opaco, em +0,12 s. A composição continua um botão sozinho no quadro.

Correções:
- **Desfoque liso também na pílula e no selo.** Cada amostra da pílula usa o contêiner do seu instante, `F.container(ts)`.
- **A linha velha sai antes.** Ela sai em TB − 0,22 e termina no quadro em que a nova começa a subir. As duas nunca dividem a máscara.
- **O botão no b71.** Ele entra no b71, sem atraso, e sobe por dentro de uma máscara do próprio tamanho, como as linhas de preço.
- **P13: o contexto real do mesmo print.** Acima do botão entra o cartão "Total a pagar" (print [46, 1082, 1034, 1418], a mesma largura do botão, a 0,93×). Fica de fora o cartão da carteira, que no app fica entre os dois e tem o saldo.
  - O grupo (cartão, 56 px de vão, botão) centra em y 820, o meio entre a área segura de cima (230) e a pílula da legenda (1410). O cartão vai de 557 a 872 e o botão de 928 a 1082.
  - O cartão fica na camada de fundo, com a sombra dos cartões. No b71 o cartão de preço encolhe e desce até o botão, e a borda de cima dele descobre o total de cima para baixo (sem fade, sem pulo).
  - O empurrão de 1,04 é em volta do grupo (y = 820 + 140 / 1,04).
  - O arrasto b70–b71 continua na faixa de baixo do cartão, e o dedo desliza até o canto do botão (direita − 12, base + 6 = 988, 1088).

## Rodada 3

Quadros (`r3/`): P10 b55.6, b56.06, b56.2, b60.6 (com desfoque), b57.0, b58.2 e b59.6; P11 b60.9, b61.1, b61.3, b65.5 (com desfoque) e b63.2; P12 b66.1, b66.4, b70.5 (com desfoque) e b68.2; P13 b71.15, b71.35, b72.15, b73.7 (com desfoque), b71.6 e b73.2; P14 b74.08, b74.25, b74.6, b76.3, b79.8, b80.25, b83.6 (com desfoque), b75.2, b78, b81 e b82.5; P15 b84.3. Mais `r3b/`, para conferir a troca do P13 para o P14.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P10 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P11 | 8 | 9 | 8 | 8 | 7 | 9 | 8 | 9 |
| P12 | 8 | 9 | 8 | 8 | 7 | 9 | 8 | 9 |
| P13 | 8 | 9 | 7 | 8 | 8 | 9 | 7 | 9 |
| P14 | 7 | 9 | 7 | 8 | 7 | 9 | 7 | n/a |

O P13 se lê agora como a tela de pagar: o total e o botão. A 360 px, o R$ 5,90 do total tem 21 px de corpo, e o texto do botão, 12 px.

Os 3 maiores problemas:
1. **P14, b74,25 (37,14 s, `P14_b74.25_37.14s_desfoque.png`).** A pílula sobe enquanto o verde ainda cobre o botão, e uma ponta laranja viaja na ponta direita da pílula que sobe, com a borda em faixas.
2. **P13, b71,15 (35,59 s, `P13_b71.15_35.59s_desfoque.png`).** A subida do botão pela máscara sai com degraus nas bordas de cima e de baixo (as 4 cópias do desfoque do motor).
3. **P11 e P12 (b60–b61, b65–b66): profundidade 7.** O cartão fica parado debaixo do arrasto, e nada nele responde ao dedo.

Correções:
- **P14 em duas fases.**
  - b74: a pílula nasce no lugar do botão, ao lado do total, e o verde varre o laranja a partir do check (0,3 s, `easeInOut`, com desfoque liso).
  - b75: o total recolhe de baixo para cima (de b75 − 0,2 a b75 + 0,04) e a pílula sobe para 640 (mola de 2,4 Hz, whoosh de 0,4).
  - O empurrão da câmera fica até o b75. O quadro do b74,6 é o pagamento confirmado: "Total a pagar R$ 5,90" e, embaixo, "Pagamento confirmado".
- **O botão sobe com desfoque liso** (`borrado`).
- **O cartão acompanha o dedo.** Nos arrastos dos b60, b65 e b70, o cartão de preço sobe 10 px junto com o dedo e volta na soltura (b61 e b66). O whoosh leve da troca de linha passou a ser o do motor nessa volta, com ganho de 0,45, no lugar da deixa.

## Rodada 4

Quadros (`r4/`): P10 b55.6, b56.06, b56.2, b60.5 (com desfoque), b57.0, b58.2 e b59.6; P11 b60.9, b61.1, b61.4, b65.5 (com desfoque) e b63.2; P12 b66.1, b66.4, b70.5 (com desfoque) e b68.2; P13 b71.15, b71.3, b72.15 (com desfoque), b71.6 e b73.2; P14 b74.1, b74.25, b75.15, b76.3, b79.8, b80.25, b83.6 (com desfoque), b74.6, b75.6, b78, b81 e b82.5; P15 b84.0 e b84.3. Mais `tira/`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P10 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P11 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P12 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P13 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P14 | 8 | 9 | 8 | 8 | 7 | 9 | 8 | n/a |

O que foi conferido:
- **Passagem b84**, medida no motor: contêiner em (540, 334), 468×78, raio 39, e câmera em 1,00, (540, 960). As molas assentam exatas antes do b84.
- **Passagem b56**: o contêiner do capítulo 2 está em 920×330, em (540, 720), no b56.
- **Trechos parados** (tira): o maior tem 1,1 s, de 38,6 a 39,7 s (a pílula, o selo e a legenda).
- **Som**: 14 deixas, todas a 0 ms de um acerto medido. A nova é o whoosh de 0,4 no b75.

Os 3 maiores problemas:
1. **P14, b76–b80 (38,0–40,0 s, `P14_b78_39.01s.png`): profundidade 7.** A pílula e o selo ficam chapados no branco: são elementos reais (sem sombra), não há dedo (D12) e a câmera está parada. É também o trecho parado de 1,1 s.
2. **Passagem b56 com o `cap2.js` atual do capítulo 2** (testada numa cópia temporária). Na soltura o dedo saía para baixo e à direita e cruzava o "R$" que voava, de b56,06 a b56,12 (28,04–28,08 s).
3. **P13, b71,5 (35,76 s).** Com a mola de 2,4 Hz, o dedo ainda estava a 9 px do alvo no b71,5 e só parava no b71,7, a menos de meia batida do toque.

Correções:
- **P14: a respiração da frase do saldo** (guia de estilo §6), de 1,00 a 1,02 em volta do grupo pílula + selo (y 796), a 0,55 Hz.
  - Ela volta a 1,00 no b80, junto com a subida da pílula, a 1,2 Hz.
  - As duas molas assentam exatas antes do b84 (a de 0,4 Hz deixava 0,0005 px no b84, por isso 0,55).
- **Na soltura do b56 o dedo sai pela esquerda.** A mola dele (2,4 Hz) é mais rápida que a do voo (1,5 Hz), então o valor vem atrás e os dois nunca se cruzam.
  - Depois ele dá a volta por fora do quadro, por cima e pela direita, sempre invisível, e entra pela direita no b58,6.
  - Medido no motor: o dedo fica visível só até o b56,33.
- **O deslize até o botão passou para 3 Hz**: parado no b71,5.

## Rodada 5 (a última antes da crítica independente)

Quadros (`r5/`):

| Plano | Com desfoque | Sem desfoque |
|---|---|---|
| P10 | b55.6, b56.06, b56.12, b56.2, b56.4, b60.5 | b57.0, b58.2, b59.6 |
| P11 | b60.9, b61.1, b61.4, b65.5 | b63.2 |
| P12 | b66.1, b66.4, b70.5 | b68.2 |
| P13 | b71.15, b71.3, b72.15 | b71.6, b73.2 |
| P14 | b74.1, b74.25, b75.15, b76.3, b79.8, b80.25, b83.6 | b74.6, b75.6, b77.2, b79.2, b81, b82.5 |
| P15 | | b84.0 |

Mais `tira/` e `passagem-b56/` (b55,5 a b56,4, com o `cap2.js` atual do capítulo 2).

Antes de dar as notas, um último ajuste nos preços: o bloco de texto do cartão desceu 13 px e ficou centrado pela tinta. São 108 px do topo do cartão ao alto do "$" e 108 px da perna do "g" à base, medido nos três preços. Os quadros do P10 ao P12 desta rodada já estão com ele.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P10 | 9 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P11 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P12 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P13 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P14 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |

O que foi conferido:
- **Trechos parados** (tira a 10 qps): o maior tem 0,8 s (de 31,1 a 31,9 s e de 33,6 a 34,4 s, com o preço parado antes de o dedo entrar). O selo, de 38 a 40 s, agora respira.
- **Algo novo a cada 2 a 4 s**, com o maior intervalo de 1,9 s (38,0 → 39,9). Pela ordem:
  - 28,0 s: o voo do R$ 5,90; 28,4 s: os rótulos;
  - 29,3 s: o dedo entra; 30,0 s: o arrasto e o cartão acompanha; 30,5 s: R$ 9,90;
  - 31,8 s: o dedo; 32,5 s: o arrasto; 33,0 s: R$ 19,90;
  - 34,3 s: o dedo; 35,0 s: o arrasto; 35,5 s: o total e o botão;
  - 36,0 s: o toque e o anel; 37,0 s: a confirmação; 37,5 s: a pílula sobe;
  - 38,0 s: o selo, a legenda e a respiração; 39,9 s: o selo sai; 40,0 s: a pílula sobe;
  - 40,75 s: o dedo do capítulo 4.
- **Som**: as 14 deixas caem num acerto medido a 0 ms (whoosh b56, pop b56,25, whoosh 0,45 b61, pop b61,25, whoosh 0,45 b66, pop b66,25, whoosh b71, click b72, whoosh e pop b74, whoosh 0,4 b75, pop 0,55 b76, whoosh 0,5 b80, whoosh b84).
- **O dedo**:
  - chega parado no b59,5, no b64,5, no b69,5 e no b71,5, meia batida antes de cada gesto;
  - mira no canto de baixo à direita do botão (988, 1088);
  - arrasta por dentro do cartão, a 40 px da base, longe do valor;
  - sai depois de cada gesto em menos de 0,4 s (b56 pela esquerda; b61, b66 e b72 pela direita);
  - fica acima de y 1250 enquanto há legenda (o ponto mais baixo é 1088);
  - no P14 não aparece (D12) até o capítulo 4 entrar no b81,5.
- **Texto**: no máximo dois tamanhos nossos por quadro, tudo na área segura. O texto do cartão fica em x 116. O R$ 19,90 chega a x 959 (o limite é 1004) e fica com 87 e 81 px de folga.
- **Passagens**:
  - b56: o voo parte exatamente do valor do total.
  - b84: o contêiner e a câmera estão exatos; o quadro do b84,0 é o mesmo que o capítulo 4 assume.
  - Com o `cap2.js` atual do capítulo 2, o arrasto b55–b56 sobe reto de (580, 845) a (580, 745), e o dedo sai pela esquerda à frente do valor (`passagem-b56/`).
- **Regras**: sem `Math.random`, sem timers, sem `confirm`. O buffer do desfoque é limpo a cada desenho, e nada passa de um quadro para outro: o quadro do b74,6 sai idêntico (0 pixels diferentes) quando renderizado de novo.

Os problemas que ficam (todos com nota 8 ou mais):
1. **P14, b80–b84 (40,0–42,0 s, `P14_b81_40.51s.png`).** A pílula fica pequena no topo, com o meio do quadro vazio por 2 s (só a legenda e, a partir do b81,5, o dedo do capítulo 4). É a passagem do b84, como o diretor anotou no animático. Não dá para encurtar sem tirar a subida do tempo forte b80, e o selo ficaria parado mais de 2 s.
2. **Passagem b55 nesta cópia.** O `cap2.js` do filme principal ainda deixa o dedo em (820, 1010) desde o b53,4. Por isso, nesta cópia, o arrasto b55–b56 sai na diagonal. Com o `cap2.js` atual da cópia do capítulo 2 ele sobe reto (testado).
3. **P10, b56,06–b56,12 (28,04–28,08 s).** O dedo sai rápido pela esquerda e aparece em 4 cópias no desfoque do motor (o desfoque liso é só do conteúdo deste capítulo). São 2 quadros, e longe do valor.

## Rodada 6 (depois da crítica independente)

Um crítico que não escreveu o código olhou a versão da rodada 5 (materiais em `.render-tmp/_critica-cap3-1/`) e deu estas notas:

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P10 | 7 | 9 | 7 | 8 | 7 | 8 | 6 | 8 |
| P11 | 7 | 9 | 8 | 8 | 7 | 9 | 8 | 8 |
| P12 | 6 | 9 | 8 | 8 | 7 | 9 | 8 | 8 |
| P13 | 7 | 8 | 7 | 7 | 8 | 9 | 7 | 8 |
| P14 | 7 | 7 | 7 | 5 | 6 | 8 | 6 | n/a |

Ele apontou 15 problemas. O que foi feito com cada um (a rodada 7 refez o P13 e o P14; ver lá):

1. **P14, 40,3–42,0 s (alta): o meio do quadro vazio no fim, e a legenda falando de uma carteira que já saiu.** O cartão da carteira fica até a legenda sair: sai em TB(83) − 0,26 s (41,26 s), subindo pela própria máscara junto com a legenda. Medido na tira a 10 qps: de 40,3 a 41,2 s ficam a pílula, o cartão e a legenda.
2. **P10, 28,02–28,13 s (média): o anel do cap. 2 e o print saindo com o alfa do motor.**
   - No quadro da troca, o contêiner inteiro é coberto de branco (`TUDO`). Isso cobre o anel do capítulo 2 (que fica dentro da janela antiga, na cena x 693–952, y 733–827) e o print que o motor apaga com opacidade. A cobertura maior que o crítico propôs ([148, 8, 270, 104]) ficou contida nisso.
   - Por cima, uma cortina: o print do total é redesenhado inteiro e opaco (o mesmo do capítulo 2: 0,9x centrado no ponto 1252), recortado acima de uma linha que sobe da base da janela antiga até o topo em 0,14 s (easeIn). Em nenhum quadro há opacidade: o que se vê é o print parado sendo limpo de baixo para cima (`r6/tira-b56.png`).
   - Além do que foi pedido: o voo começa com a forma exata do valor do app. Medido glifo a glifo no print, o app desenha o R$ 5,90 em DM Sans 800 com o eixo óptico de 23 px (o corpo no CSS do celular), 69,3 px de print (62,4 na cena) e espaçamento 0. O voo começa com o texto formado a 23 px e escalado; o corpo que dá forma vai de 23 a 240 px e o espaçamento vai de 0 a −0,03 em durante o voo. No quadro da troca, os glifos caem a até 1 px dos do app ($ 749–780 contra 748–780; 5 802–833 igual; vírgula 839–849 contra 838–849; 9 856–888 contra 855–888; `r6/zoom-troca.png`). Antes, o "9" ficava 28 px fora do lugar.
3. **P14, 37,52–37,80 s (média): a subida do b75 a 2,4 Hz vira borrão.** Na rodada 6 a mola foi para 1,6 Hz e a subida caiu de 364 para 197 px (`r6/zoom-subidas.png`: o texto fica legível). Na rodada 7 essa subida saiu.
4. **P14, 38,0–40,0 s (média): o selo "Saldo suficiente" solto no branco.** Trocado pelo cartão real inteiro da carteira (print [46, 1454, 988, 228] a 0,93x, 919x212, raio 40), com a sombra dos cartões. O R$ 38,20 entra como texto da interface, como o R$ 5,90 do botão. Na rodada 6 o cartão entrava pela máscara abaixo da pílula; na rodada 7 ele fica acima, como no print.
5. **P13, 35,0–36,0 s (média): o caminho em V e o arranjo que não existe.**
   - O botão subiu para y 760–914 (centro em 836,8). O arrasto b70–b71 sobe de (967, 1000) a (967, 920), que é o canto do botão, e o dedo toca dali no b72. O move [71, ALVO] saiu.
   - **Discordância parcial, x 967 e não 987** (direita − 32, e não − 12). No primeiro render desta rodada, com 987, o círculo do dedo (raio 46) passava da borda direita do cartão de preço no começo do arrasto (`P12_b70.5`). Com o cartão de 960 da rodada 7, o círculo em 967 fica 7 px dentro dele, e no botão fica 86 px à direita do "Code".
   - O arrasto passou para uma mola de 1,8 Hz. Medido no motor, o dedo fica parado no b70,8: 1,2 batida antes do toque e 0,2 antes da soltura. Com 3 Hz ele ficaria parado desde o b70,6, quase 1,5 batida antes do toque.
   - O arranjo: na rodada 6, o botão ficou sozinho, como pede a lista. Na rodada 7 entrou o recorte real carteira + botão.
6. **P14, 41,0–41,6 s (média): o dedo do capítulo 4 cobre "firmado".** Está fora do meu arquivo e foi para os pedidos ao diretor. Confirmado com o `cap4.js` do filme principal (`r7/principal/P14_b82.0_41.013s.png`).
7. **P10, quadro 1681 (baixa): dois subquadros com o valor do app e dois com o nosso.** A troca começa em TB(56) − 0,0065 s = 28,0084 s (o conteúdo dos preços tem `atraso` de −0,0065). Nos dois motores, esse instante cai entre os subquadros:
   - na cópia, 4 subquadros: 28,0063 | 28,0104;
   - no principal, 8 subquadros: 28,0073 | 28,0094.
   O quadro 1681 sai com um valor só (`r7/zoom-troca-quadros.png`). Como os glifos agora coincidem, mesmo um quadro misturado não mostraria dois valores.
8. **P10, 28,08–28,15 s (baixa): o dedo passa sobre "Total a pagar" na soltura.** Agora ele sai reto para cima, com o move [56, [580, −200], 2.4], pelo vão entre "Retirada (Único)" e o R$ 5,90 da linha de cima. Depois dá a volta por fora do quadro, como antes.
9. **P10, 27,51–28,01 s (baixa): o `cap2.js` da cópia está desatualizado.** Foi para os pedidos ao diretor. Toda passagem foi conferida também com o motor, o `cap2.js` e o `cap4.js` do filme principal, num espelho em `.render-tmp/_principal-cap3/`.
   - **Recusado: o morph opcional `total_puxa`.** O capítulo 2 desenha o print no espaço da cena (`U.cena`, com `U.proj` fixo em y 720). Subir o contêiner 10 px desliza a janela sobre um print parado: o cartão do total (cena 567–873) ficaria a 2 px da borda de baixo da janela (875) e a 22 px da de cima. Medido no `detalhe()` do `cap2.js` principal.
10. **P11–P12, 28,0–35,5 s (baixa): três percursos iguais e a câmera parada.** Na rodada 6 entrou a respiração sugerida: 1,02 a 0,4 Hz desde o b57, com o cartão de 980. Ela assenta no b67,8 (33,9 s) e deixa o P12 parado; ver a rodada 7.
11. **P11–P12, b61,1 e b66,1 (baixa): a vírgula cortada.** O valor sobe por um desenho próprio (`sobeValor`), com a boca de baixo da máscara a 0,45 do corpo (+108 px) e a partida a 0,42 (+101 px). Já no primeiro quadro da subida a vírgula está inteira (`r6/zoom-virgula.png`).
12. **P13, 36,01–36,95 s (baixa): a ponta do anel em tracinhos, o filete branco e o anel perto da borda.**
   - O anel abre e recolhe com o desfoque liso (16 amostras por quadro na cópia e 32 no principal), de 36,01 a 36,43 s e de 36,65 a 36,97 s.
   - O pad foi de 14 para 10, e o anel fica a 49 px da borda com o empurrão de 1,04.
   - O retângulo do anel encolhe com o botão que afunda, e sumiu o filete entre os dois (`r6/zoom-anel.png`).
13. **P14, 37,02–37,15 s (baixa): o check carimbado e a borda em degradê.** A varredura agora:
   - dura 0,45 s;
   - tem a borda dura, sem o desfoque liso (o motor dá degraus de até 12 px);
   - começa com 60 px de raio, o check com o fundo da pílula em volta, e nasce como um disco verde-claro inteiro sobre o ícone (`r7/zoom-p13-p14.png`).
14. **b56 e b74 (baixa): o acento da trilha mede menos que a batida anterior.** É da trilha: foi para os pedidos ao diretor.
15. **Saída das pílulas de legenda (baixa): o motor apaga a caixa com alfa.** É do motor: foi para os pedidos ao diretor.

Mudança de código fora das notas: o `borrado` passou a desenhar cada amostra inteira num buffer (normal) antes de somá-la (`lighter`) a outro. Com uma soma só, uma forma desenhada sobre outra na mesma amostra (o cartão branco sobre a própria sombra, o print sobre o cartão) somava as cores, e o texto sumia no branco.

Quadros (`r6/`), com desfoque nos quadros de movimento e `sub=1` nos parados:

| Plano | Quadros |
|---|---|
| P10 | b55.6, b56.06, b56.12, b56.2, b56.4, b57, b58.2, b59.6, b60.5, mais a tira da troca: 28,0063 e 28,0105 s (sem desfoque), e de 28,033 a 28,233 s |
| P11 | b60.9, b61.1, b61.15, b61.25, b61.4, b63.2, b65.5, 30,533–30,567 s |
| P12 | b66.1, b66.15, b66.4, b68.2, b70.5, 33,033–33,067 s |
| P13 | b70.6, b70.9, b71.15, b71.6, b72.08, b72.15, b73.2, b73.75 |
| P14 | b74.04, b74.1, b74.15, b74.3, b74.6, b75.15, b75.3, b75.6, b76.1, b76.3, b77.2, b79.8, b80.25, b80.6, b81.5, b82.6, b83.1, b83.6, b84.0 |

Mais:
- `folha-p10.png` … `folha-p14.png`, `folha-360.png` e `tira-b56.png`;
- os zooms (`zoom-troca`, `zoom-virgula`, `zoom-anel`, `zoom-subidas`, `zoom-carteira`);
- `folha-principal.png` e `principal/`, com o motor, o `cap2.js` e o `cap4.js` do filme principal;
- `tira/` (10 qps, de 27,9 a 42,1 s) e `motor.json` (o dedo, o contêiner e a câmera, quadro a quadro).

Notas:

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P10 | 8 | 9 | 8 | 8 | 8 | 8 | 8 | 9 |
| P11 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P12 | 7 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P13 | 8 | 9 | 8 | 7 | 7 | 9 | 8 | 8 |
| P14 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | n/a |

O que foi conferido:
- 14 deixas, todas a 0 ms de um acerto medido;
- o maior trecho parado tem 0,8 s (de 33,6 a 34,4 s);
- o quadro de 37,033 s renderizado duas vezes sai idêntico (0 pixels diferentes).

Os 3 maiores problemas:
1. **P13, 35,5–37,0 s (`r6/P13_b71.6_35.813s.png`).** O botão sozinho no branco, sem sombra (é um elemento real), com os 530 px de cima vazios: composição 7, profundidade 7.
2. **P12, 33,0–35,5 s (`r6/P12_b68.2_34.113s.png`).** A respiração de 0,4 Hz assenta no b67,8 (33,9 s), e o P12 fica com a câmera parada. A terceira troca é igual às outras duas: gancho 7.
3. **P12, b70,5 (35,26 s).** Com x 987, o círculo do dedo passava da borda direita do cartão no começo do arrasto. Foi corrigido ainda nesta rodada (975) e acertado na rodada 7 (967, com o cartão de 960).

## Rodada 7 (depois da crítica independente)

Correções:
- **P13: o recorte real carteira + botão.** O cartão real da carteira fica acima do botão, como no print: 0,93x, 28 px de vão, com a sombra dos cartões. O grupo (520–914) centra na zona do contêiner (y 717).
  - No b71, o cartão fica atrás do contêiner (camada `fundo`). O cartão de preço encolhe até o botão, e a borda de cima dele descobre a carteira de cima para baixo, sem fade.
  - O empurrão de 1,04 é em volta do grupo.
  - Com isso, a carteira não aparece em dois lugares (acima do botão no P13 e abaixo da pílula no P14) e a tela não é reordenada.
- **P14 sem reordenar a tela.**
  - b74: a pílula nasce no lugar do botão, logo abaixo do "Saldo suficiente" (`r7/P14_b74.6_37.313s.png`). A subida do b75 saiu, com o whoosh de 0,4.
  - b76: anel no "Saldo suficiente", junto com a legenda "Com saldo na carteira…". O pop de 0,55 cai na abertura, e o anel recolhe antes do b80. A câmera solta de 1,04 para 1,02 em volta de cartão + pílula (y 715).
  - b80: o cartão passa para a camada `frente`, e a pílula sobe (1,2 Hz, 503 px) por trás dele até o topo. As bordas do cartão fazem de máscara, e a parte mais rápida da subida (b80,15–b80,4) fica escondida (`r7/zoom-b80.png`).
  - O cartão fica até a legenda sair (41,26 s).
- **P11–P12: a respiração em degraus, um por preço.** A câmera vai a 1,01 no b57, a 1,02 no b61 e a 1,03 no b66 (0,5 Hz: cada degrau anda uns 2 s e assenta exato em 4,3 s). O cartão foi para 960 px: com 1,03 ele fica a 45 px da borda, e o R$ 19,90 fica com 56 e 61 px de folga dentro dele. Medido no motor: z = 1,010 em 30,5 s, 1,020 em 33,0 s e 1,030 em 35,0 s. Cada preço chega com a sua aproximação, e o terceiro é o mais perto.
- **Achado e corrigido nesta rodada: a sombra do cartão em degraus.** Somar 4 amostras a 1/4 em 8 bits põe degraus de 4 níveis na sombra fraca (255, 251, 247, 243), e a borda dela aparecia como um retângulo nos quadros com desfoque liso (`r7/zoom-fantasma.png`). O cartão deixou de passar pelo `borrado`; só o anel passa, e a saída fica com o desfoque do motor, como a das legendas que saem junto. Medido depois: 254, 253, 252, 250, 247, 245.

Quadros (`r7/`):

| Plano | Quadros |
|---|---|
| P10 | b55.6, 28,0063 e 28,0105 s, b56.06, b56.12, b56.2, b56.4, b57, b58.2, b59.6, b60.5 |
| P11 | b60.9, b61.1, b61.4, b62.5, b63.2, b65.5 |
| P12 | b66.1, b66.4, b67.5, b68.2, b70.5 |
| P13 | b70.6, b70.9, b71.1, b71.25, b71.6, b72.08, b72.15, b73.2, b73.75 |
| P14 | b74.04, b74.15, b74.3, b74.6, b75.5, b76.1, b76.25, b77.2, b79.0, b79.8, b80.1, b80.2, b80.3, b80.45, b80.6, b81.5, b82.6, b82.75, b83.1, b84.0 |

Mais:
- `folha-p10.png` … `folha-p14.png` e `folha-360.png`;
- `folha-principal.png` e `principal/` (o filme principal, com P15 b84.3: a tela "Retirada" cresce da pílula);
- `troca/` (os quadros 1680 e 1681 com desfoque, nos dois motores);
- `tira/`, `motor.json`, `pureza/` e `pureza2/`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P10 | 9 | 9 | 8 | 8 | 8 | 8 | 8 | 9 |
| P11 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P12 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P13 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 8 |
| P14 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | n/a |

O que foi conferido:
- **Som.** As 13 deixas caem num acerto medido, todas a 0 ms: whoosh b56, pop b56,25, whoosh 0,45 b61, pop b61,25, whoosh 0,45 b66, pop b66,25, whoosh b71, click b72, whoosh e pop b74, pop 0,55 b76, whoosh 0,5 b80 e whoosh b84. O whoosh de 0,4 do b75 saiu junto com a subida.
- **Trechos parados** (tira a 10 qps, de 27,9 a 42,1 s): nenhum chega a 0,4 s.
- **O dedo**:
  - chega parado no b59,2, no b64,2 e no b69,2 (0,76 batida antes de cada arrasto) e no b70,8 no canto do botão;
  - toca no b72 e sai pela direita;
  - fica acima de y 1250 o tempo todo.
- **Passagens** (no espelho do filme principal):
  - b56: o arrasto sobe reto de (580, 845), e o quadro 1681 tem um valor só;
  - b84: contêiner em (540, 334), 468x78, raio 39, e câmera em 1,00 exato. A tela "Retirada" do capítulo 4 cresce da pílula (`r7/principal/P15_b84.3_42.163s_desfoque.png`).
- **Regras.** Sem `Math.random`, sem timers, sem `confirm`. O quadro de 37,033 s renderizado duas vezes sai idêntico (0 pixels diferentes). As molas assentam antes do b84: a do b76 (0,55 Hz) em 41,94 s e a do b80 (1,2 Hz) em 41,81 s.

Os problemas que ficam (todos com nota 8 ou mais):
1. **P14, b80,6–b83,2 (40,3–41,6 s, `r7/P14_b81.5_40.763s.png`).** A composição pesa em cima: pílula em 295–373, cartão em 520–732 e 596 px vazios até a legenda. O dedo do capítulo 4 cobre "firmado" a partir do b81,35 (pedido ao diretor).
2. **P10, b56 (28,01 s).** O anel do capítulo 2 some no quadro da troca, como o crítico pediu. Na saída reta para cima, o dedo aparece nas cópias do desfoque do motor por uns 3 quadros.
3. **P14, b80,1–b80,25 (40,06–40,14 s).** A pílula que sobe ainda tem o halo leve do desfoque antes de entrar atrás do cartão (`r7/zoom-b80.png`).

## Mudanças de batida (dentro do capítulo; as passagens b56 e b84 e as legendas não mudaram)

| Batida | Mudança | Motivo |
|---|---|---|
| b60, b65, b70 | O cartão de preço acompanha o dedo 10 px para cima (morph sem som) | Profundidade: o cartão responde ao arrasto |
| b61, b66 | O cartão volta na soltura (morph com whoosh de 0,45, no lugar da deixa whoosh da mesma batida) | O mesmo |
| b61, b66 | A linha velha sai em TB − 0,22 (era − 0,26) e a nova sobe em TB + 0,02 (era + 0,12) | A troca rola, sem cartão vazio e sem duas linhas na mesma máscara |
| b56 | No P10, os rótulos entram em + 0,4 s | O valor chega primeiro, como pede a lista |
| b71 | O botão entra no b71 (era + 0,12), subindo pela máscara; o total aparece acima dele, descoberto pelo cartão que encolhe (na rodada 7 o total deu lugar ao cartão da carteira) | Composição do P13 (contexto real do mesmo print) |
| b74 → b74 e b75 | b74: a pílula nasce do check no lugar do botão. b75: o total recolhe e a pílula sobe para 640 (morph novo, whoosh de 0,4). Substituída na rodada 7: o b75 saiu | Com o nascimento e a subida juntos, a ponta laranja viajava e o texto sobrepunha |
| b71–b75 | O empurrão de câmera fica até o b75 (a lista: volta no b74). Na rodada 7, até o b76 | O quadro da confirmação fica com o total e a pílula no mesmo enquadramento |
| b76 | O selo "Saldo suficiente" entra, com pop de 0,55. Substituída nas rodadas 6 e 7: o cartão inteiro da carteira, e no b76 o anel no "Saldo suficiente" | Pedido da crítica dos quadros parados |
| b76–b80 | Respiração de 1,00 a 1,02 (a lista diz "Parada" no P14) | Guia de estilo §6 (respiração por frase): profundidade, e nada parado |
| b80 | A subida da pílula passou de 2 para 1,4 Hz (na rodada 7, 1,2 Hz) | O texto da pílula não sobrepõe; assenta exata no b83,1 |
| b56 | O dedo sai pela esquerda (era pela direita, para FORA). Substituída na rodada 6: sai reto para cima | Não cruzar o valor que voa |
| b56 | A troca começa em TB(56) − 0,0065 s (o conteúdo dos preços com `atraso` de −0,0065) | Cai entre os subquadros nos dois motores: nenhum quadro mistura o valor do app com o nosso |
| b56 | Na soltura, o dedo sai reto para cima, por x 580 | Não passar sobre "Total a pagar" (crítica independente) |
| b57, b61, b66 | Respiração da câmera em degraus: 1,01, 1,02 e 1,03 (0,5 Hz); o cartão de preço foi para 960 px | Os preços ficavam com a câmera parada e o P12 repetia o P11 (crítica independente) |
| b70–b71 | O arrasto termina no canto do botão, em (967, 920), com mola de 1,8 Hz; o deslize do b71 até o botão saiu | Sem o caminho em V; o dedo chega parado no b70,8 |
| b71 | O cartão de preço encolhe e descobre o cartão real da carteira acima do botão, como no print (era o total) | O total com o botão logo embaixo era um arranjo que não existe no app |
| b74 | A varredura verde dura 0,45 s (era 0,3), com a borda dura e começando num disco de 60 px | O check carimbado e a borda em degradê |
| b75 | A subida da pílula até 640 saiu (com o whoosh de 0,4); a pílula fica embaixo da carteira até o b80 | A carteira fica no lugar do print, acima, e a tela não é reordenada |
| b76 | Anel no "Saldo suficiente" (o pop de 0,55 cai na abertura); a câmera solta de 1,04 para 1,02 | O destaque pula para o que a legenda diz |
| b80 | A pílula sobe por trás do cartão da carteira (camada da frente), 503 px a 1,2 Hz | O cartão fica até a legenda sair e os dois não se atravessam: as bordas do cartão fazem de máscara |
| b80–b83 | O cartão sai em TB(83) − 0,26 s, com a legenda (o selo saía em TB(80) − 0,26) | O meio do quadro ficava vazio com a legenda falando de uma carteira que já tinha saído (crítica independente) |
| b57, b61, b66 | Rodada final: a câmera vai a 1,00, 1,02 e 1,04 (0,8 Hz); o degrau do b57 saiu | Os três preços escalam (acabamento do diretor) |
| b61,25 | Pop com ganho 0,8 (era 1) | O mesmo |
| b70,5 | Morph novo, sem som e sem mudar a forma: o cartão de preço perde a sombra | O botão nasce sem a sombra do cartão (eram duas sombras) |
| b71 | O botão sobe em TB(71) + 0,10, em 0,35 s, pela máscara da própria forma (era TB(71), 0,45 s) | O contêiner não recorta o botão pela metade |
| b71 → b76 | O cartão da carteira só entra no b76, com a legenda; abre por recorte em TB(76) + 0,08 (0,4 s) | O R$ 38,20 não aparece antes da legenda que o explica |
| b76 → b76,5 | Anel no "Saldo suficiente" e o pop de 0,55 em TB(76,5) (acerto medido a 4 ms) | O cartão abre primeiro, o destaque vem depois |
| b76 | Empurrão de câmera até 1,08 (era 1,02), 0,55 Hz | Profundidade no P14 (919 × 1,08 = 992 px) |
| b80–b83,5 | O cartão desce 224 px com a subida da pílula e fecha por recorte em TB(83,5), em 0,24 s (saía em TB(83) − 0,26) | O meio do quadro não fica vazio até o b84 |

## Rodada final (acabamento do diretor)

Cópia sincronizada com o filme principal (index.html, filme.js, trilha.js, beats.js, beats.json, cap1, cap2, cap4 e comum.js; o cap3.js da cópia ficou). O motor já tem 8 subquadros, a boca do `sobe` a 0,42 e a caixa da legenda abrindo e fechando por recorte. Quadros em `.render-tmp/_trabalho-cap3/rf/` (`folha-a.png`, `folha-b.png`, `zoom*.png`, `v2_*`).

| Item | Estado | Como |
|---|---|---|
| 1. Valor de 240 px em degrau (P10–P12) | Feito | A linha inteira (valor e rótulos, com `sobeRotulo`, a conta do `a.sobe` do motor) passa pelo `borrado` nas janelas de entrada, de subida dos rótulos e de saída. Conferido em 30,46 s e 35,46 s: borrão liso, sem cópias |
| 2. Dedo na soltura do b56 | Feito | Saída reta para cima por x 580 a 1,8 Hz. O valor voa para a esquerda e para cima, sempre abaixo e à direita do dedo (calculado quadro a quadro). De 28,03 a 28,20 s, o dedo é um borrão vertical, longe do voo, sem pilha de anéis |
| 3. Pops e câmera nos preços | Feito | Pop 1,0 / 0,8 / 1,0; câmera 1,00 → 1,02 → 1,04; cartão de 960 × 1,04 = 998 px |
| 4. Botão cortado e duas sombras (P13) | Feito | Morph b70,5 com `sombra: 0` (a mola de 3 Hz do motor já está em 0,00 em TB(71) + 0,10). O botão sobe de TB(71) + 0,10 em 0,35 s, e o contêiner, nesse instante, ainda é maior que o botão. Em 35,6 s não há botão; em 35,75 s, botão inteiro e sem sombra |
| 5. Cartão da carteira só no b76 | Feito | Camada `fundo` de b76; recorte de baixo para cima em TB(76) + 0,08 (0,4 s); anel em TB(76,5). Em 36,6 e 37,3 s, sem R$ 38,20; em 38,2 s, o cartão abrindo |
| 6. Meio vazio no b80–b84 | Feito | dy = 224 × step(t − TB(80), 1,2), com a máscara junto; fecha em TB(83,5), em 0,24 s. Em 40,5 s, o cartão no meio |
| 7. Empurrão de 1,08 no b76 | Feito | y = 715 + (960 − 715) / 1,08, a 0,55 Hz; volta a 1,00 no b80 (1,2 Hz) |
| Achado nesta rodada | Corrigido | A sombra do cartão da carteira acabava num corte reto no topo da pílula, visível ao lado das pontas redondas de 38,1 a 40,0 s. Até o b80, a sombra passa 80 px da boca (a pílula cobre o resto). Medido em x 60: 249, 251, 252, 254, 255, sem degrau |

Passagens: no b56, a troca não mudou. No b84 (`v2_t42.02.png`), a pílula está em (540, 334). As molas que chegam ao b84 assentam antes dele: o morph e a câmera do b80 (1,2 Hz) em 41,82 s, e a câmera do b76 (0,55 Hz) em 41,94 s. Então o contêiner tem 468×78, raio 39, e a câmera está em z 1, (540, 960). Deixas novas em acertos medidos: b61,25 a 5 ms, b66,25 a 7 ms e b76,5 a 4 ms. Sem `Math.random`, sem timers e sem `confirm`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P10 | 9 | 9 | 8 | 8 | 8 | 8 | 8 | 9 |
| P11 | 8 | 9 | 9 | 8 | 8 | 9 | 9 | 9 |
| P12 | 9 | 9 | 9 | 8 | 9 | 9 | 8 | 9 |
| P13 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 8 |
| P14 | 8 | 8 | 8 | 8 | 9 | 8 | 8 | 8 |

O que fica (todos com nota 8 ou mais):
- **P13, 35,50 a 35,62 s.** Uns 7 quadros só com o dedo e a legenda abrindo, entre a saída do R$ 19,90 e a subida do botão.
- **P14, 40,05 a 40,15 s.** A câmera, o cartão e a pílula andam juntos, e o quadro inteiro sai com o desfoque do motor.

Pedidos ao diretor:
- **O guia ainda diz 4 subquadros** (regra 5 do movimento). O motor tem 8.
- **O `audio/music.wav` da cópia difere do principal.** Não estava na lista de sincronização. Ele não afeta os quadros.

## Pedidos ao diretor

1. **Copiar o `cap2.js` atual para a cópia `_trabalho-cap3`.** O filme principal já tem a versão nova, com o dedo parado em (580, 845) no b54,2. A cópia ainda tem a antiga, com o dedo em (820, 1010), e nela o arrasto b55–b56 sai na diagonal. Com o `cap2.js` principal, ele sobe reto (conferido no espelho `.render-tmp/_principal-cap3/`).
2. **Capítulo 4: o dedo cobre "firmado".** No b81,35 o dedo para em (750, 345), em cima do "firmado" de "Pagamento confirmado" (`r7/principal/P14_b82.0_41.013s.png`). Pedido da crítica independente: mirar fora do texto, embaixo à direita da pílula, em (790, 400). A pílula vai de x 306 a 774, e o texto termina em x ≈ 740. O arrasto do b83 sai dali.
3. **Trilha: os acentos do b56 e do b74 medem menos que a batida anterior.** O do b56 tem força 0,22, contra 0,58 no b55; o do b74 tem 0,34, contra 0,65 no b73. A ênfase cai uma batida antes do valor e da confirmação. A sugestão do crítico: subir 4 dB o ataque do acento (bumbo forte e acorde rolado) nos b56 e b74, ou baixar 3 dB o golpe da última batida do compasso, e medir de novo com `beats.py`.
4. **Motor: a caixa da legenda sai com fade.** Na função `legendas`, a caixa da pílula sai com `globalAlpha = 1 − ex` (0,24 s), enquanto o texto sobe. Sugestão: um recorte que fecha a caixa de cima para baixo (altura ph·(1 − ex), easeIn), sem opacidade.
5. **Opcional, `comum.js`.** O `borrado` (desfoque liso) poderia ir para o `F.u`. Se for, com um aviso: a soma `lighter` em 8 bits põe degraus de 4 níveis numa sombra fraca. Ele só serve para formas opacas (texto, recorte, traço); a sombra fica fora dele.
6. **Opcional, motor.** O dedo não passa pelo desfoque liso, e nas saídas rápidas (b56, para cima) aparece nas cópias dos subquadros por uns 3 quadros.
7. **Para conferir.** A cópia `_trabalho-cap3` ainda tem o motor antigo (4 subquadros, boca do `sobe` a 0,25). O `cap3.js` foi conferido nos dois motores: o valor sobe com uma máscara própria, e o `borrado` usa `F.SUB`.
