# Crítica: capítulo 2, chegou e o aviso (P07–P09, batidas 31–56, 15,5–28 s)

Arquivo: `filmes/11-tutorial-primeiro-acesso/capitulos/cap2.js` (trabalhado na cópia `filmes/_trabalho-cap2`).

Os quadros de cada rodada ficam em `.render-tmp/_trabalho-cap2/rN/`. O nome diz o plano, a batida e o tempo, e `_desfoque` marca os quadros renderizados com o desfoque de movimento padrão (4 subquadros); os outros saem com `sub=1`. Em cada pasta:
- `folha.png` é a folha de contato;
- `folha-360.png` é a prova a 360 px de largura;
- `tira/` guarda o capítulo a 10 quadros por segundo, usado para medir os trechos parados.

A batida n cai em n × 0,5 + 0,013 s na grade medida (`F.TB`).

Notas de 1 a 10. "Valores" é n/a quando o plano não tem valor. O P07 tem a data e a hora do registro; o P09 tem o R$ 5,90 do total.

## Rodada 0 (os itens da crítica dos quadros parados, já resolvidos antes da rodada 1)

O que veio da crítica do diretor (`docs/registro-de-critica.md`, D0) e foi feito antes de renderizar a rodada 1:

- **P07, o toco do conector.** Antes, a linha da linha do tempo pendurada sob o check (cena y 745–812) parecia um pirulito. O print tem o check de y 414 a 477, um vão branco de 479 a 481 e o conector a partir de 482. O plano agora usa dois recortes do mesmo print, na mesma posição relativa:
  - o check, até o y 480;
  - o texto, de x 190 a 586 e de y 413 a 523.

  O check fica inteiro e o conector não aparece. O cartão foi para 960×264 e o conteúdo fica centrado nele.
- **P08, centrado e em 72 px.** O cartão centra em y 883 (de 613 a 1153).
  - O rótulo "Aviso no WhatsApp" e as quatro linhas do aviso estão em 72 px, um tamanho só no quadro. O rótulo fica em tinta 2, o texto em tinta.
  - As quebras foram medidas: '“Encomenda chegou, Ana!' tem 819 px, 'Sua encomenda está' 652, 'disponível para' 471 e 'retirada.”' 291. O texto é o exato da lista.
  - A borda esquerda é uma só, em x 116.
  - O respiro é de 36 px em cima (do cartão à maiúscula do rótulo) e de 36 px embaixo (do bloco à base do cartão). O bloco laranja-claro fica a 32 px das laterais.
- **P09, o detalhe.**
  - Um anel por vez: o do selo recolhe em 0,15 s no b50, quando o de "Aguardando pagamento" abre (o `U.anel` recolhe em 0,3 s; o tempo dele corre em dobro depois do b50). Esse segundo anel recolhe antes do arrasto do b52.
  - O contêiner tem 960×860.
  - O recorte começa no y 22 do print (24 px acima dos botões do cabeçalho, que deixam de encostar na borda) e vai até o 1071, a 0,82×. Ver a mudança 3 no fim.
  - O dedo fica acima de y 1250 enquanto há legenda.
- **Passagem b56.** O estado `total` continua em 920×330, em (540, 720), e a projeção continua em 0,9× com o ponto 1252 no centro. As molas assentam exatas antes do b56.
- **O dedo.**
  - Ele sai pela direita depois do arrasto do b31, do toque do b47 e do arrasto do b53. Sai pela direita, não pelo canto de baixo, para não passar por cima da pílula da legenda.
  - Chega parado de 0,5 a 1 batida antes de cada gesto: no b29,3 (arrasto do b30), no b46 (toque do b47), no b51,2 (arrasto do b52) e no b54,4 (arrasto do b55, do cap. 3).
  - Os arrastos começam 40 px acima da base do cartão. O do b30 começava fora da faixa, em y 900; agora começa em 830.
  - O `move [53.4, ...]`, que deixava o dedo estacionado embaixo do total, virou uma entrada no b53,8 que chega a (580, 845), dentro do total e longe do R$ 5,90.

## Rodada 1

Quadros (`.render-tmp/_trabalho-cap2/r1/`):
- P07: b30.5 e b31.3 com desfoque; b32.6, b34.6 e b36.8.
- P08: b37.3 e b39.3 com desfoque; b38, b42 e b46.4.
- P09: b47.25 e b52.5 com desfoque; b48.8, b50.2 e b54.8.

Mais `zoom1.png` (detalhes em tamanho real), `celular-1x.png` (prova a 360 px de três quadros) e `tira/`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P07 | 8 | 8 | 7 | 8 | 8 | 9 | 8 | 8 |
| P08 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P09 | 8 | 7 | 7 | 8 | 8 | 9 | 8 | 8 |

O que foi conferido:
- **Trechos parados** (tira a 10 qps): o maior tem 1,0 s (de 17,3 a 18,2 s, no P07, depois do traço). No P08, de 20 a 22,3 s, a câmera respira e nada fica parado.
- **Som:** as 9 deixas e os 3 sons do motor do capítulo caem num acerto medido a 0 ms: whoosh b31, shutter b32, pop b34, buzz e pop b37, pop b39, click e whoosh b47, pop b48, pop b50, whoosh b52, pop b54.
- **Texto:** um tamanho de texto nosso por quadro (72 px). Tudo fica dentro da área segura.

Os 3 maiores problemas:
1. **P09, b52–b53 (26,0–26,6 s, `P09_b52.5_26.26s_desfoque.png`).** A rolagem a 1,6 Hz passa de 45 px por quadro. Com os 4 subquadros, o texto da interface sai repetido em quatro cópias.
2. **P07, b30–b31 (15,0–15,5 s, `P07_b30.5_15.26s_desfoque.png`).** O arrasto em x 800 passa por cima do "Centro ·" da faixa do endereço. O texto vai até x 898.
3. **P09, b52,5–b52,8 (26,3–26,4 s, conferido em `r1x/P09_b52.7_26.36s_desfoque.png`).** O arrasto fica na coluna do valor (x 800), e o R$ 5,90 do total rola por baixo do dedo, o contrário de "longe do valor".

Também foi notado na leitura a 360 px do P09: no b48,8 a câmera ainda estava em ~1,02 (mola de 0,5 Hz), e o "Aguardando" do selo saía com ~7 px.

Correções:
- A rolagem do P09 passou para 1,25 Hz (`ROLA`) e assenta exata no b55,5. Não pode ir abaixo de 1,11 Hz, ou a mola não chega exata ao b56 da passagem.
- O arrasto do b30 foi para x 960, à direita do texto da faixa, ainda dentro dela: a faixa vai até 1030 e o dedo até 1009.
- O arrasto do b52 foi para x 580, a coluna livre entre "Total a pagar" (que acaba em x 350) e o R$ 5,90 (que começa em 696, com o anel).
- O empurrão de câmera do b48 passou de 0,5 para 1 Hz e chega a 1,04 até o b49,5, com o anel do selo ainda aberto.

Também foi conferido o toque do b47, em `r1x/` (b46.85, b47.03 e b47.1 com desfoque). O texto do aviso sai subindo a partir de TB(47) − 0,12 s, o dedo aperta e o bloco afunda 4% no b47, e a tela do detalhe entra 0,12 s depois. O dedo nunca toca um cartão vazio.

## Rodada 2

Quadros (`.render-tmp/_trabalho-cap2/r2/`):
- P07: b30.6 e b31.4 com desfoque; b29.4, b32.7 e b36.
- P08: b37.15 e b39.25 com desfoque; b38.2, b43 e b46.5.
- P09: b47.3 e b52.6 com desfoque; b49, b50.3 e b54.6.

Mais `zoom2.png` (detalhes em tamanho real), `tira/` e `passagem/`, a passagem do b56 comparada com o filme principal.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P07 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P08 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P09 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |

O que foi conferido:
- **O dedo** não passa mais sobre texto nem valor:
  - no b30,6 ele fica à direita do "Centro ·";
  - no b52,6 fica entre "Total a pagar" e o R$ 5,90;
  - no b54,6 espera o arrasto do cap. 3 longe do anel.
- **O empurrão de 1,04×** já está inteiro no anel do selo (b49). Na prova a 360 px, PKG-1042, "Aguardando pagamento", o R$ 5,90 e a legenda se leem. As linhas finas de apoio da interface saem do tamanho que têm no próprio app (0,82 × 1,04 = 0,85; o guia dá 0,93 como o tamanho do celular).
- **Passagem b56:** no b56 + 0,25 s, o quadro da cópia e o do filme principal têm 1 pixel diferente. No b56 − 0,03 s, fora do dedo, sobram diferenças de até 12 níveis. Elas vêm do filme principal: a mola de câmera de 0,5 Hz do b48 ainda não tinha assentado exata no b56 (envelope 2,3e-5). Com 1 Hz, ela assenta.
- **Trechos parados:** o maior tem 1,0 s (17,3–18,2 s).

Os 3 maiores problemas:
1. **P07, b32,8–b33,2 (16,4–16,6 s).** O anel do check fica fechado só 0,22 s antes de recolher (`dura: 0,62`) e lê como um clarão, não como um destaque.
2. **P07 e P08, b31 (15,5 s) e b37 (18,5 s, `P08_b37.15_18.59s_desfoque.png`).** As duas transformações quase não mudam de forma: 980→960 de largura no b31, e 960→980 com 38 px de descida no b37. A troca lê como troca de conteúdo dentro do mesmo cartão.
3. **P09, b52,2–b52,8 (26,1–26,4 s, `P09_b52.6_26.31s_desfoque.png`).** A 1,25 Hz, a rolagem ainda deixa o texto da interface em três ou quatro cópias no quadro com desfoque. Está dentro da regra 5 do guia (1,6 Hz ou menos, e texto pequeno), mas dá para suavizar mais.

Correções:
- O anel do check fica fechado até o b34 e recolhe em 0,15 s (`rapido`, agora no topo do arquivo), na mesma batida em que o traço abre.
- O cartão do P07 passou para 880×264, e o conteúdo anda 8 px para a direita para ficar com 44 px de folga dos dois lados, contando o anel. A faixa de 980 encolhe 100 px no b31, e o aviso cresce 100 px e desce 38 no b37.
- A rolagem passou para 1,15 Hz e começa no apoio do dedo (TB(52) − 0,03). Ela assenta exata em 1,88 s, no b55,7, e o mínimo para isso é 1,11 Hz.

## Rodada 3

Quadros (`.render-tmp/_trabalho-cap2/r3/`):
- P07: b30.9 e b31.25 com desfoque; b33.2, b34.3 e b36.5.
- P08: b37.2 e b37.6 com desfoque; b39.4, b44 e b46.3.
- P09: b47.5, b53.3 e b54.2 com desfoque; b48.6 e b51.

Mais `zoom3.png` (detalhes em tamanho real) e `tira/`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P07 | 8 | 8 | 8 | 9 | 8 | 9 | 8 | 8 |
| P08 | 8 | 9 | 8 | 8 | 8 | 9 | 7 | n/a |
| P09 | 8 | 8 | 8 | 8 | 8 | 9 | 7 | 8 |

O que melhorou:
- **P07:** o cartão de 880 fica justo, com 44 px dos dois lados do conteúdo, contando o anel. A faixa encolhe visivelmente no b31.
- **P08:** o aviso cresce 100 px de largura no b37 (`P08_b37.2_18.61s_desfoque.png`). Junto com o buzz, a chegada lê como chegada.
- **P07, o anel:** fica fechado de b32,8 a b33,7 e some no b34, quando o traço abre.
- **P09:** a rolagem a 1,15 Hz chega ao total sem repetir o texto no b53,3.
- **Trechos parados:** o maior continua com 1,0 s.

Os 3 maiores problemas:
1. **P09, b51,2–b52 (25,6–26,0 s, `P09_b51_25.51s.png`).** O dedo espera o arrasto em (580, 1110), em cima do "agência" de "Retire com o QR Code na agência" (o texto vai até x 714, e o dedo de 532 a 628). Na rodada 2 isso não aparecia porque o quadro do b51 não tinha sido renderizado.
2. **P08, b37,4–b37,8 (18,7–18,9 s, `P08_b37.6_18.81s_desfoque.png`).** A base do bloco laranja-claro ainda não passou da boca da máscara da primeira linha, e as pernas do "g" e a vírgula de '“Encomenda chegou, Ana!' saem cortadas. A base do bloco acompanha a base do cartão, que ainda está chegando, com mola de 2,4 Hz.
3. **P09, b53,15–b54,4 (26,6–27,2 s).** O dedo sai pela direita e volta em 0,65 s para esperar o arrasto do cap. 3. É a regra do guia (sair depois de cada gesto e chegar de meia a uma batida antes do próximo) e não há caminho mais curto: a pílula da legenda, que fica até o b54, fecha a saída por baixo.

Correções:
- O arrasto do b52 começa em (800, 1110), à direita do texto (o dedo vai de 751 a 849), e sobe para a esquerda até (640, 1000), como o polegar da mão direita. A mola de 3 Hz deixa o dedo na coluna livre (x 591–689) no b52,3. O R$ 5,90 (x 702–935) só passa por y 1010 no b52,5.
- A primeira linha do aviso entra 0,32 s depois do b37 (antes, 0,21 s), e o bloco abre em 0,35 s (antes, 0,45). As linhas do b39 entram com 0,12, 0,22 e 0,34 s de atraso, para a base do bloco já ter passado da boca da máscara da quarta linha (y 1098).
- O problema 3 fica como está: nenhuma regra é violada (o dedo fica fora do quadro de b53,6 a b53,9).

## Rodada 4

Quadros (`.render-tmp/_trabalho-cap2/r4/`):
- P07: b31.2 e b36.9 com desfoque; b30.2, b32.9 e b34.8.
- P08: b37.5 e b39.35 com desfoque; b37.75, b41 e b46.2.
- P09: b47.15, b52.35 e b52.55 com desfoque; b48.9, b51.3 e b55.95 (a passagem).

Mais `zoom4.png` e `tira/`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P07 | 8 | 8 | 8 | 9 | 8 | 9 | 8 | 8 |
| P08 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P09 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |

O que foi conferido:
- **P09, b51,3:** o dedo espera à direita do "agência", sem cobrir texto.
- **P09, rolagem:** no b52,35 o dedo já está entre "Retirada (Único)" e o R$ 5,90 pequeno. No b52,55 passa entre "Total a pagar" e o R$ 5,90 grande, a 12 px do valor, sem tocar nele.
- **P08, b37,75:** a primeira linha sobe só pela máscara dela. O bloco já está aberto.
- **Trechos parados:** o maior tem 1,0 s.

Os 3 maiores problemas:
1. **P07, b31,0–b31,24 (15,5–15,6 s, `P07_b31.2_15.61s_desfoque.png`).** O cartão fica vazio por ~0,25 s: o texto da faixa já saiu pela máscara no b30,98, e o recorte só entrava 0,12 s depois da batida (o atraso padrão do motor).
2. **Passagem b55,95 (27,99 s, `P09_b55.95_27.99s.png`).** O arrasto do cap. 3 termina em (820, 760), em cima do "5,90" do total. Não é deste arquivo: vai para o diretor. O dedo deste capítulo entrega o arrasto em (580, 845), e um arrasto reto para cima terminaria em (580, 745), longe do valor.
3. **P09, b52,2–b52,8.** A rolagem ainda deixa o texto pequeno da interface duplicado no quadro com desfoque. Fica: é texto da interface, com mola de 1,15 Hz (o guia pede 1,6 ou menos), e 1,11 Hz é o mínimo para assentar exata antes do b56.

Correção:
- O conteúdo do P07 entra com `atraso: 0`. O recorte começa a rolar pela máscara no b31, junto com o encolhimento da faixa, e o cartão não fica vazio.

## Rodada 5

Quadros (`.render-tmp/_trabalho-cap2/r5/`):
- P07: b31.1 e b31.35 com desfoque; b32.8, b34.7 e b36.3.
- P08: b37.4 e b39.5 com desfoque; b38.3, b42.5 e b46.6.
- P09: b47.4 e b53.6 com desfoque; b49.2, b50.6 e b54.9.

Mais:
- `tira/`;
- `passagem/`: o b56 + 0,25 s, comparado com o filme principal;
- `passagem-b31/`: a passagem b29,5–b31,6 renderizada do filme principal, com o `cap1.js` atual do cap. 1 e este `cap2.js`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P07 | 8 | 8 | 9 | 9 | 8 | 9 | 9 | 8 |
| P08 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P09 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |

O que foi conferido:
- **P07:** o recorte já rola no b31,1, com a faixa encolhendo; o cartão não fica vazio.
- **Som:** as deixas e os sons do motor caem num acerto medido a 0 ms (`cues.json`): whoosh b31, shutter b32, pop b34, buzz e pop b37, pop b39, click e whoosh b47, pop b48, pop b50, whoosh b52, pop b54.
- **Trechos parados:** o maior tem 1,0 s (17,3–18,2 s). A lista de recompensas é: 15,5 a troca e o recorte, 16,0 o anel e o obturador, 17,0 o traço, 18,5 o aviso, 19,5 a segunda frase, 20–22 a câmera respira, 22,7 o dedo entra, 23,5 o toque e o detalhe, 24,0 o anel no selo, 25,0 o anel em "Aguardando pagamento", 25,3 o dedo entra, 26,0 o arrasto e a rolagem, 26,5 o total, 27,0 o anel no R$ 5,90, 27,5 o arrasto do cap. 3. Nenhum intervalo passa de 3,2 s.
- **Passagem b56:** 31 pixels diferem do filme principal, por no máximo 3 níveis. O estado `total` e a projeção (0,9×, ponto 1252) estão iguais.
- **O dedo:**
  - chega de 0,5 a 1 batida antes de cada gesto (b29,3, b46, b51,2, b54,4);
  - sai em até 0,4 s depois de cada um;
  - fica acima de y 1250 com legenda;
  - não cobre texto, valor nem anel enquanto espera;
  - arrasta 40 px acima da base do cartão.
- **Texto:** um tamanho de texto nosso por quadro (72 px), tudo dentro da área segura.

**Mudança depois da rodada 5 (a passagem b31).** Enquanto este capítulo andava, o cap. 1 mudou a faixa do endereço no filme principal: agora ela está em (540, 780), com 980×320 e a base em 940. O texto dela sai no apoio do arrasto do b30 (TB(30) − 0,02). O arrasto do b30 passou para (960, 900) → (960, 800), 40 px acima da nova base, à direita do texto (que acaba em x 898) e do traço. Foi conferido renderizando o filme principal (`passagem-b31/`). A cópia de trabalho ainda tem o `cap1.js` antigo, copiado às 8h48; o que vale é o filme principal.

Os problemas que ficam:
1. **P09, b52–b53.** A rolagem a 1,15 Hz ainda duplica o texto pequeno da interface nos quadros com desfoque. Menos que isso não dá: abaixo de 1,11 Hz a mola não assenta exata antes do b56.
2. **P09, b53,15–b54,4.** O dedo sai pela direita depois do arrasto e volta em 0,65 s para o arrasto do cap. 3. Segue a regra, mas é um vaivém curto.
3. **Passagem b56 (cap. 3).** O arrasto b55–b56 termina em (820, 760), em cima do "5,90" do total.
4. **P08.** O rótulo e o texto do aviso têm o mesmo corpo (72 px). A hierarquia vem só da cor (tinta 2 e tinta), como pedido, para o quadro ter um tamanho só.
5. **P09.** As linhas finas de apoio da interface saem com ~8 px na prova de 360 px. Tudo o que o anel aponta (PKG-1042, "Aguardando", "Aguardando pagamento", o R$ 5,90) se lê.

## Rodada 6 (depois da crítica independente)

Um crítico que não escreveu o código olhou a cópia de trabalho depois da rodada 5 (materiais em `.render-tmp/_critica-cap2-1/`). As notas dele:

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P07 | 7 | 9 | 7 | 8 | 7 | 9 | 7 | 8 |
| P08 | 7 | 9 | 7 | 7 | 7 | 9 | 7 | n/a |
| P09 | 8 | 7 | 6 | 7 | 8 | 9 | 6 | 7 |

Ele apontou 13 problemas. O que foi feito com cada um:

1. **P09, a carteira na rolagem (alta).** O cartão "Saldo da carteira R$ 38,20", com o check verde, entrava no contêiner de 26,24 a 26,77 s, porque a tela rolava a partir de TB(52) − 0,03 e o contêiner só encolhia no b53. **Corrigido:** o morph do total passou para `[52, 'total', 1.4]`, junto com a rolagem. A 1,4 Hz ele assenta exato em 1,54 s, às 27,56 s, antes do b56. Conferido de dois jeitos:
   - pela sonda do motor (`F.container`), a borda de baixo do contêiner fica sempre acima do topo da carteira projetado (print y 1454), com folga mínima de 16,8 px no b54,37;
   - 54 quadros a 30 qps, de 25,9 a 27,67 s (`r6/carteira30/`), sem nenhum pixel do verde do "Saldo suficiente". O mesmo detector acha 5537 pixels verdes no print.
2. **P09, a rolagem em estrobo (média).** **Corrigido:** a escala e o centro da projeção seguem p = 3x² − 2x³ em 1,0 s, a partir de TB(52) − 0,03. O pico caiu de 30 para 15,2 px por quadro. As cópias ficam a 3,8 px com os 4 subquadros da cópia de trabalho e a 1,9 px com os 8 do motor principal, e leem como desfoque (`zoom-rolagem.png`, `zoom-rolagem2.png`). A tela para exata em TB(54) − 0,03, quando o anel do R$ 5,90 abre.
3. **P07, os recortes saíam por opacidade (média).** **Corrigido:** o conteúdo do P07 tem `saida: false`, e os recortes saem subindo pela mesma máscara (y 625–829) por onde entraram. Duas diferenças em relação à proposta do crítico:
   - o **traço** sob a data agora fica preso ao texto e sai com ele pela máscara. Antes ele recolhia parado e sobrava sozinho no cartão enquanto o texto subia (`zoom-saida-p07.png`, a versão do meio da rodada). Por isso a distância passou de 190 para 200 px: com 190, sobrava 1 px do traço na boca da máscara até o fim do conteúdo;
   - a saída vai de TB(37) − 0,42 a TB(37) − 0,02, em 0,40 s, e não em 0,24 s cruzando o b37. Com o `easeIn` (inclinação final 3,2), 200 px em 0,24 s chegavam a 44 px por quadro e o recorte saía em cópias; em 0,40 s o pico é de 27 px por quadro, o mesmo do texto que sai pelo `a.sobe`. Ela acaba antes do b37, e o aviso sobe num cartão limpo (`tira-saida-p07.png` e `tira-saida-p07-principal.png`, 12 e 10 quadros seguidos).
4. **P08, a chegada do aviso mudava pouco de forma (média).** **Corrigido, com outra conta:**
   - o rótulo, o bloco e a primeira linha sobem 120 px por dentro do cartão, com `dy = 120 * (1 - step(t - TB(37), 2.4))`. A borda de baixo do cartão, que desce, faz de máscara;
   - o `aviso1` ficou em 980×280, centrado em 799, e não em 980×340 em 783, como propôs o crítico. A conta dele valia para o aviso de quatro linhas. Com as três linhas do item 11, o cartão final tem 980×448 em 883, com o topo em 659. A 340 sobrariam 60 px de bloco vazio embaixo da primeira linha, e o topo desceria 46 px no b39. Assim, no b37 o cartão alarga 100 px, o topo desce 71 e a base desce 87, e no b39 ele só cresce para baixo;
   - a primeira linha entra 0,14 s depois do b37 (antes, 0,32). Ela sobe com a borda do cartão como máscara e está inteira às 18,72 s (`principal_P08_b37.41`).
5. **A pílula da legenda sai por opacidade e entra cortada (média, motor).** Não se corrige no `cap2.js`: vai para o diretor (pedido 1). O motor principal já faz o texto subir em t0 − 0,04, mas isso ainda não tem efeito (o motivo está no pedido).
6. **Passagem b31, o cartão vazio no filme principal (média).** **Corrigido:** o conteúdo do P07 começa em `de: 30.5`, sem atraso. O recorte sobe pela máscara no meio do arrasto, dentro da faixa do cap. 1, e o morph do b31 encolhe o cartão em volta dele. Conferido no filme principal (`r6/principal-passagem-b31/`): no b30,6 o recorte já está subindo, e o cartão não fica vazio em nenhum quadro.
7. **P08, o bloco saía por opacidade no toque (baixa).** **Corrigido:** o conteúdo do aviso tem `saida: false`. O bloco fecha de baixo para cima, de TB(47) − 0,06 a TB(47) + 0,10, e o texto sai pela máscara a partir de TB(47) − 0,12 (`r6/principal-toque/`, b47,03 a b47,18).
8. **P09, dois anéis no b50 (baixa).** **Corrigido:** `r50 = TB(50) − 0.15`. O anel do selo some exatamente no b50, quando o de "Aguardando pagamento" começa (`principal_P09_b50.05`).
9. **P09, a ponta do anel na rolagem (baixa).** **Corrigido:** `r52 = TB(52) − 0.30`. O anel termina de recolher em 25,87 s, antes do apoio do dedo (`P09_b51.95_25.99s_desfoque.png`, sem anel).
10. **P09, o vaivém do dedo depois do arrasto (baixa).** **Corrigido como o crítico propôs:** a saída do b53,15 e a entrada do b53,8 viraram um deslize só, `[53.6, [580, 845], 2.4]`. O dedo solta em (640, 870), desliza 65 px e chega parado no b54,2, 0,8 batida antes do arrasto do cap. 3. O guia de estilo (§9) permite: entre dois gestos seguidos na mesma tela, ele desliza com mola. Fica registrado para o diretor (pedido 3), porque o guia de animação pede a saída depois de cada gesto.
11. **P08, "retirada.”" sozinha e o rótulo do mesmo corpo do texto (baixa).** **Corrigido:** três linhas: '“Encomenda chegou, Ana!' / 'Sua encomenda está' / 'disponível para retirada.”'. A terceira mede 775 px e vai até x 891; o bloco vai até 998. O rótulo passou para 60 px (`tam.UI`), como pede a lista, e o quadro fica com dois tamanhos (60 e 72). O cartão final é de 980×448, centrado em 883.
12. **P09, o selo "Aguardando" pequeno a 360 px (baixa).** **Não mudou. A evidência:**
    - a 360 px, o "Aguardando" do selo tem cerca de 7 px de altura de maiúscula (`cel-b48.8-x3.png`, ampliado 3×). A tela fica a 0,82 × 1,04 = 0,85 do print, 92% do tamanho que ela tem no próprio app (o guia dá 0,93× como o tamanho do celular);
    - a proposta (960×780 com 1,10×) passa da regra de largura: 960 × 1,10 = 1056 px, e o fundo do contêiner ficaria a 12 px da borda (o guia limita a 960 px até 1,04×, ou seja, largura × zoom ≤ 1000);
    - a versão que respeita a regra (900×780 com 1,10×) leva o print a 0,90: só 6% a mais (a maiúscula vai de 7,0 para 7,4 px). Em troca, ela corta o cartão da linha do tempo ao meio, sem a borda de baixo e sem a linha "Retirada", e põe mais uma transformação no tempo forte do anel;
    - a palavra volta duas batidas depois, maior e em negrito, em "Aguardando pagamento" (b50), que se lê a 360 px. A legenda carrega o sentido.
13. **P07, o dedo sobre "agência" no fim do arrasto (baixa).** **Corrigido:** o arrasto foi para x 1000 (`[28.6, [1000, 900], 2.4]` e `[30, [1000, 800], 3]`). O círculo fica de 954 a 1046, à direita do endereço (até x 898) e de "agência" (até x 947), dentro da faixa do cap. 1 (até 1030).

**A cópia de trabalho está defasada.** O `index.html`, o `cap1.js` e o `cap3.js` dela são de 24/10, 8h48. O motor principal mudou em 26/10: 8 subquadros, a boca da máscara do `a.sobe` a 1,37 do corpo e o texto da pílula em t0 − 0,04. Como só o `cap2.js` pode ser editado, a rodada foi renderizada duas vezes:
- da cópia de trabalho, para a folha e a prova de 360 px;
- de uma cópia nova do filme principal com este `cap2.js` (`.render-tmp/_principal-cap2`), para as passagens, o desfoque de 8 subquadros e as máscaras do motor novo. Os quadros dela têm o prefixo `principal_`.

Quadros (`.render-tmp/_trabalho-cap2/r6/`):
- P07: b31.15, b36.6 e b36.85 com desfoque; b32.8 e b34.7.
- P08: b37.15, b37.4 e b39.6 com desfoque; b38.2, b42.5 e b46.6.
- P09: b47.15, b51.95, b52.45 e b53 com desfoque; b48.8, b50.1, b54.6 e b55.7.
- `folha.png` e `folha-360.png`; `celular-360-a.png` e `celular-360-b.png` (8 quadros a 360 px, em escala 1:1); `cel-b48.8-x3.png` (o selo).
- `principal/` (a mesma rodada no filme principal, com `folha.png`), `principal-passagem-b31/`, `principal-saida-p07/`, `principal-toque/` e `principal-rolagem/` (de b51,9 até a passagem do b56).
- `tira-saida-p07/` e `tira-saida-p07-principal/` (quadros seguidos), `carteira30/` e `tira10/` (o capítulo a 10 qps, sem desfoque).

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P07 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 8 |
| P08 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P09 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |

O que foi conferido:
- **P07:** o recorte sobe durante o arrasto do b30 e a faixa encolhe em volta dele no b31. O anel abre no b32, com o obturador, e o traço sublinha a data no b34. Os recortes e o traço saem pela máscara e terminam às 18,49 s; o aviso começa a subir às 18,51 s.
- **P08:** a chegada lê como chegada. O cartão alarga e desce, o conteúdo sobe de dentro dele, e o buzz e o pop caem no b37. A 360 px, o rótulo (20 px) fica abaixo do texto (24 px) e em tinta 2.
- **P09:**
  - um anel por vez (b48, b50, b54);
  - a carteira nunca aparece;
  - a rolagem lê como desfoque;
  - o dedo não passa por cima do R$ 5,90. Na passagem do b56, o arrasto do cap. 3 principal vai de (580, 845) a (580, 745), entre "Total a pagar" e o valor.
- **Trechos parados** (`tira10/`): o maior tem 0,6 s, de 17,5 a 18,1 s. Nenhum passa de 2 s.
- **Som** (`cues.json`): as 13 deixas e os sons do motor do capítulo caem num acerto medido a 0 ms, e a menos de 7 ms da batida:
  - whoosh no b31, shutter no b32, pop no b34;
  - buzz e pop no b37, pop no b39;
  - click e whoosh no b47, pop no b48, pop no b50;
  - whoosh no b52, pop no b54;
  - whoosh no b56 (do cap. 3).
- **O código:** sem `Math.random`, timers ou `confirm`. A sintaxe confere.

Os 3 maiores problemas que ficam:
1. **A pílula da legenda (motor), em 15,59 s, 18,25–18,49 s, 23,59 s e 26,75–26,99 s.** Na entrada, a caixa nasce com uns três quartos da largura, e o texto branco que passa dela some no fundo branco ("A agência receb" em `principal_P07_b31.15_15.59s_desfoque.png`, "A gente recebe e te a" em `principal_P09_b47.15_23.59s_desfoque.png`). Na saída, ela apaga por opacidade (`principal_P07_b36.75_18.39s_desfoque.png`). É o pedido 1.
2. **P09, o selo "Aguardando" a 360 px (24,0–25,0 s).** Tem cerca de 7 px de maiúscula. Fica como está (item 12).
3. **O desfoque da cópia de trabalho (4 subquadros).** Nos quadros mais rápidos da rolagem e da saída do P07, ainda aparecem duas a quatro cópias juntas. No motor principal, com 8, elas leem como desfoque.

## Rodada final (acabamento do diretor)

Antes de tudo, a cópia de trabalho foi sincronizada com o filme principal: `index.html`, `filme.js`, `trilha.js`, `beats.js`, `beats.json` e `capitulos/*.js` foram copiados de `filmes/11-tutorial-primeiro-acesso/` e conferidos com `cmp`. Esta rodada já roda no motor novo:
- 8 subquadros;
- a boca de baixo do `a.sobe` a 0,42 do corpo;
- a pílula que abre e fecha por recorte.

Os quadros estão em `.render-tmp/_trabalho-cap2/final/` e foram copiados para lá logo depois de cada render. O sufixo `_desfoque` marca os quadros com os 8 subquadros padrão, e `_nitido`, os renderizados com `sub=1`.

### Os itens do diretor

| # | Item | Feito | Como |
|---|---|---|---|
| 1 | P07 (b31–b37), a quebra da legenda | sim | `['A agência recebe', 'e registra com foto.']`. O texto é o mesmo, só muda a quebra. |
| 2 | P07 (b32–b36), a profundidade | sim | Câmera `[32, {z: 1.06, x: 521, y: 945}, 1]`, `[34, {z: 1.04, x: 540, y: 950}, 0.8]` e `[37, {z: 1, x: 540, y: 960}, 1.2]`. A câmera de 1,03 do b31 saiu. Pela sonda (`F.camera`), o check fica parado na tela durante o empurrão: vai de (210,4; 691,2) a (210,8; 691,0). O cartão vai de x 94 a 1027 na tela, e largura × zoom chega no máximo a 880 × 1,0604 = 933 (≤ 1000). |
| 3 | P07 (b36,2–b37), a máscara da saída | sim | A `MASCARA` agora é o retângulo do cartão (x 100–980, y 588–852), e a boca de cima é o topo do cartão. A saída usa `SAI7 = TB(37) − 0,48` e `DUR7 = 0,46` e sobe 232 px: a base do traço vai de 816 a 584, acima do topo do cartão (588). O pico é de 26,9 px por quadro e a saída termina em TB(37) − 0,02 (`p07a/t18.41_desfoque.png`). **A entrada também foi corrigida.** Com a máscara nova, os 96 px antigos deixavam 94 px do check aparecerem de uma vez no b30,5 (`base/t15.27_desfoque.png`). Agora os recortes nascem 216 px abaixo, escondidos sob a boca de baixo, e sobem com pico de 18 px por quadro (`p07a/t15.27` a `t15.42`). |
| 4 | P08 (b40,4–b45,6), o trecho parado | sim | Moves `[42, [1220, 2060], 3]` (fora do quadro) e `[43.5, [966, 1064], 0.6]`. O dedo entra devagar, por baixo e pela direita, e aparece por volta de 22,1 s. No b46,1 já anda a 1 px por quadro: chega parado, a ~6 px do alvo, sem cruzar texto (`rf/t22.40_desfoque.png`). A respiração passou a `[40, {z: 1.02, x: 540, y: 958.5}, 0.6]` e assenta no b42,6. **Medido** na tira de 10 qps (`tira10/`, 15,5–28 s): o critério é menos de 500 px mudando mais de 8 níveis em 0,1 s, a meia resolução. O maior trecho parado tem **0,7 s** (21,4–22,1 s). Com um critério duas vezes mais rígido, tem 1,0 s (21,2–22,2 s). Antes eram 2,6 s. |
| 5 | P09 (b47,2), o quadro lavado | sim | Na entrada, a tela sobe 48 px por dentro do contêiner: `dy = 48 × (1 − step(t − a.t0, 2.4))` no centro da projeção (`U.proj(..., 540, 720 + dy)`). Os anéis usam a mesma projeção e sobem juntos. Só o atraso de 0,10 deixava o detalhe a 75% no quadro de 23,617 s (6 de 8 subquadros), e o quadro continuava lavado (`troca47/troca.png`). Por isso o atraso de 0,10 fica **encostado na fronteira entre dois quadros**: `(round((TB(47) + 0,10) × 60) − 0,5) / 60 − TB(47)` = 0,0937, e o detalhe começa em 23,6083 s. No quadro de 23,617 s ele já está inteiro e opaco, a 48 px, e nenhum quadro mistura o detalhe com o fundo (`troca47b/troca.png`). |
| 6 | P09 (b48–b52), a câmera | sim | `[48, {z: 1.04, x: 540, y: 948}, 1]`. Pela sonda, de b49,5 a b52 a borda de baixo do contêiner fica em 1170 na tela (no máximo 1170,0) e a de cima, em 276. Largura × zoom = 998. |
| 7 | P09 (b52–b53), o dedo parado e apertado | sim, com outro y | O arrasto tem mola de **1,6 Hz**. Na soltura do b53 ele ainda anda (1 a 2 px por quadro) e não fica parado e apertado enquanto a tela rola. O fim do arrasto foi para **(640, 853)**, e não para (640, 870): com o `total` novo (item 8), a base do contêiner fica em 869,2, e o centro do dedo pararia na borda (folga de −2 px pela sonda). Em 853, a folga mínima é de 15 px. Pela mesma razão, o ponto de espera do arrasto do cap. 3 foi de (580, 845) para **(580, 829)**, 40 px acima da base nova, como pede o guia. Pela sonda, o círculo do dedo fica sempre a 8 px ou mais do retângulo do R$ 5,90 com o anel (22 px ou mais dos glifos). |
| 8 | P09 (b54–b56), cartão dentro de cartão | sim, com a medida conferida | `total: {cx: 540, cy: 718.2, w: 889, h: 302, r: 36, sombra: 0}`. O aro do cartão foi medido no próprio print: x 46–1034, y 1082–1418, raio de ~40, linha de 2 px. Projetado a 0,9× (ponto 1252), ele cai em x 95,4–984,6 e y 567,0–869,4. Com o `cx 541` sugerido, o aro da esquerda ficava quase todo fora (nível 250, contra 231 à direita; `total541/`). Com 540 e 889, os quatro lados mostram o aro (níveis 231, 231, 234 e 232 em `rf/t27.26_nitido.png`), e os cantos coincidem (`rf/cantos-total.png`). A projeção do b56 (0,9×, ponto 1252) não mudou. |
| 9 | O anel do R$ 5,90 | sim | `dura: TB(55,9) − 0,3 − TB(54)`. O anel abre no b54 (0,4 s), fica fechado até 27,66 s e recolhe em 0,3 s até TB(55,9) = 27,96 s. Em 27,98 s não sobra nada dele (`passagem56/`). |
| 10 | As pílulas no motor novo | conferidas | 15,52–15,66, 18,25–18,49, 23,55–23,70 e 26,75–26,99 s (`pilulas/pilulas.png`). Nos quatro trechos a caixa abre e fecha por recorte, na largura cheia, sem opacidade, e nasce antes do texto. O texto nunca passa da caixa. A quebra nova do P07 se lê bem. Nada a corrigir no `cap2.js`. |

### O loop de crítica no capítulo inteiro

Quadros (`final/rf/`):
- P07: com desfoque, 15,35, 15,62, 16,30, 18,25 e 18,41 s; sem desfoque, 17,30 s.
- P08: com desfoque, 18,62, 20,30, 22,40 e 23,53 s; sem desfoque, 19,00 e 23,20 s.
- P09: com desfoque, 23,633, 26,30, 26,75, 27,30 e 27,85 s; sem desfoque, 24,60, 25,40, 25,80, 27,26 e 27,50 s.

Também em `rf/`:
- `folha.png` e `folha-360.png`;
- `celular-360.png`, a prova a 360 px em escala 1:1 (a data do registro, o aviso, PKG e selo, "Aguardando pagamento" e o R$ 5,90);
- `detalhes.png`, os quadros de movimento em tamanho real.

Mais `tira10/` (126 quadros), `passagem56/` e `cues-cap2.json`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P07 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 8 |
| P08 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P09 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |

O que foi conferido:
- **P07:**
  - os recortes nascem escondidos e sobem durante o arrasto;
  - o empurrão para o check cai com o obturador (b32);
  - no b34 o anel recolhe e a câmera abre para a data;
  - a saída passa inteira pelo topo do cartão, e nada é cortado no meio dele.
- **P08:** a chegada não mudou. A câmera respira de 20,0 a ~21,3 s, e o dedo entra devagar, de baixo, a partir de ~22,1 s. Nenhum trecho fica parado mais de 1 s.
- **P09:**
  - o detalhe sobe sem quadro lavado;
  - o contêiner chega a 1170 na tela;
  - o dedo ainda anda na soltura;
  - o total é o próprio cartão do print, com o aro dele e sem sombra;
  - o anel do R$ 5,90 some antes do voo.
- **Som** (`cues-cap2.json`): as 13 deixas e os sons do motor caem num acerto medido a 0 ms, de −0,9 a −6,9 ms da batida:
  - whoosh no b31, shutter no b32, pop no b34;
  - buzz e pop no b37, pop no b39;
  - click e whoosh no b47, pop no b48, pop no b50;
  - whoosh no b52, pop no b54;
  - whoosh no b56.
- **Contrato:** sem `Math.random`, timers ou `confirm`; `node --check` passa; o `render.mjs` conferiu a pureza em todos os renders.
- **Passagem b31:** a faixa do cap. 1 fica vazia ~0,03 s (15,26–15,29 s) antes de o recorte aparecer pela boca. Nenhum quadro mostra o cartão vazio.

Os 3 maiores problemas que ficam:
1. **Passagem b56, 28,02–28,03 s (`passagem56/`, cap. 3).** O cap. 3 desenha a cortina (o print do total) e a partida do voo do R$ 5,90 em relação ao centro do contêiner, contando com (540, 720). Com o `total` em `cy` 718,2, o print sobe 2 px no quadro em que a cortina começa. Medido por correlação: 0 px em 28,00 s, −2 px em 28,02 s. Não dá para corrigir no `cap2.js` sem mudar a projeção do b56. Vai para o diretor (pedido 6).
2. **P09, b52,5–b53 (26,3–26,5 s, `rf/t26.30_desfoque.png`).** No arrasto, o dedo apertado passa sobre "Retire com o QR Code na agência", que rola por baixo dele. É o dedo em cima do conteúdo que ele arrasta, longe do valor (folga mínima de 8 px do anel e de 22 px dos glifos). Fica.
3. **P09, o selo "Aguardando" a 360 px (24,0–25,0 s).** Tem cerca de 7 px de maiúscula. Fica como na rodada 6 (item 12): "Aguardando pagamento" e a legenda carregam o sentido.

Também fica: no ponto de espera (580, 829), o círculo do dedo (raio 46) passa 6 px da base do total. Em (580, 845), passava 22 px.

Nenhuma nota ficou abaixo de 8, e nada mais foi mexido.

## Mudanças de batida e de tempo em relação à lista de planos (com o motivo)

- **Anel no R$ 5,90: b54, não b53** (já estava assim na decupagem). No b53 a tela ainda rola e o contêiner ainda encolhe; no b54 tudo já parou. O pop vai junto, no b54.
- **Rolagem e encolhimento do total juntos, a partir do b52** (rodada 6). A rolagem segue uma curva lenta-rápida-lenta de 1,0 s, a partir de TB(52) − 0,03. O contêiner vai para o estado `total` no b52, com mola de 1,4 Hz. O whoosh leve do b52 é uma deixa (ganho 0,5), e a transformação fica sem som própria (`total.whoosh: 0`). Na rodada final, o estado `total` ganhou a forma do cartão do print a 0,9×, sem sombra (889×302 em 540, 718,2, raio 36). A projeção do b56 (0,9×, ponto 1252) não mudou.
- **O aviso em duas transformações** (`aviso1` no b37 e `aviso` no b39). O cartão chega com o rótulo e a primeira linha (980×280) e cresce para baixo junto com a segunda frase (980×448, centrado em 883). As duas ficam sem whoosh, porque o b37 tem o buzz e o pop da lista e o b39 tem o pop leve.
- **O texto do aviso em três linhas e em 72 px, com o rótulo em 60 px** (rodada 6). A lista dá 60 px para o texto. Em 72 ele mede 24 px no celular, contra 20 px a 60, e o quadro continua com dois tamanhos.
- **Anel do check:** fica de b32 a b34 e recolhe em 0,15 s, quando o traço abre. Um destaque por vez.
- **Saída do P07:** os recortes e o traço saem pelo topo do cartão de TB(37) − 0,48 a TB(37) − 0,02, em 232 px (rodada final). Na rodada 6, saíam de TB(37) − 0,42, por uma máscara 37 px abaixo do topo.
- **Anéis do P09:** o do selo recolhe até o b50, e o de "Aguardando pagamento" até TB(52) − 0,15, antes do apoio do dedo.
- **Câmera:**
  - no P07, um empurrão de 1,06 para o check no b32 e de 1,04 no b34, acompanhando o traço da data, com volta a 1,00 no b37 (rodada final);
  - no P08, uma respiração até 1,02 a partir do b40 (0,6 Hz, assentada no b42,6; rodada final), para o plano sem legenda não ficar parado;
  - no P09, o empurrão do b48 vai a 1,04, como pede a lista, a 1 Hz (a decupagem dava 1,02 a 0,5 Hz), com y 948. A borda de baixo do contêiner chega a 1170 na tela (rodada final).
- **O dedo:**
  - para o toque do b47, entra devagar e por baixo a partir do b43,5 (0,6 Hz) e chega parado no b46,1 (rodada final). A lista diz "entra no b43";
  - o arrasto b52–b53 tem mola de 1,6 Hz e termina em (640, 853), dentro do total novo (rodada final);
  - depois do arrasto do b52–b53, desliza sem sair até o ponto do arrasto do cap. 3. Esse ponto era (580, 845) na rodada 6; na rodada final passou a (580, 829), 40 px acima da base do total novo.
- **Recorte do P07:** entra no b30,5, sem atraso, no meio do arrasto (rodada 6). Na rodada final, ele nasce 216 px abaixo, escondido sob a base do cartão.
- **Anel no R$ 5,90:** recolhe em 0,3 s e termina em TB(55,9), antes do voo do b56 (rodada final). Antes, ficava aberto.
- **Detalhe do P09:** entra com atraso de 0,0937 s, os 0,10 s do diretor encostados na fronteira entre dois quadros, e sobe 48 px (rodada final).
- **Escala do detalhe: 0,82× em vez de 0,84×.** Com o contêiner de 960×860 e o recorte começando no y 22, a 0,84× ele acabaria no y 1046 e cortaria a borda de baixo do cartão da linha do tempo (y 1046–1047). A 0,82× ele vai até o 1071, com 24 px de respiro, antes da sombra do cartão do total (y 1078).

## Pedidos ao diretor (fora do `cap2.js`)

1. **Motor, `legendas()` (vale para os quatro capítulos).**
   - **Saída:** a caixa da pílula apaga por opacidade (`globalAlpha = 1 - ex`, 0,24 s). Às 18,39 s ela está cinza e translúcida, com o texto ainda saindo (`r6/principal/principal_P07_b36.75_18.39s_desfoque.png`). A proposta do crítico é recolher a caixa, com a altura `ph * (1 - ex)` ancorada na base, e tirar o texto pela máscara antes (t1 − 0,10).
   - **Entrada:** o motor principal já faz o texto subir em t0 − 0,04 e a caixa abrir em t0 − 0,06. Isso não tem efeito, porque `if (t < t0 || ...) continue` pula a legenda inteira antes de t0 = TB(de) + 0,08. Em t0, a caixa já nasce com uns três quartos da largura (0,6 + 0,4·e), e o texto branco que passa dela some no fundo branco. Ver "A agência receb" em `principal_P07_b31.15_15.59s_desfoque.png` e "A gente recebe e te a" em `principal_P09_b47.15_23.59s_desfoque.png`. A proposta: trocar a guarda para `t < t0 - 0.06` e recortar o texto pela caixa (ou fazer a caixa crescer só na altura).
2. **Lista de planos.** Registrar:
   - o P09 a 0,82× (e não 0,84×), com o contêiner de 960×860;
   - o anel no R$ 5,90 no b54;
   - o texto do aviso em três linhas e 72 px, com o rótulo em 60 px.
3. **Guia de animação, o dedo entre dois gestos seguidos.** No b53–b55, o dedo desliza 65 px em vez de sair e voltar (item 10 da rodada 6). O guia de estilo (§9) permite isso; o guia de animação pede a saída depois de cada gesto. A decisão é sua: se preferir a saída, a versão anterior é `[53.15, DIREITA(1000), 1.8]` e `[53.8, [580, 845], 2.4]`.
4. **Cópia de trabalho.** A `filmes/_trabalho-cap2` tem o motor, o `cap1.js` e o `cap3.js` de 24/10. As passagens e o motor novo foram conferidos numa cópia nova do filme principal (`.render-tmp/_principal-cap2`). Se outro crítico for olhar a cópia de trabalho, vale atualizá-la antes.
5. **Feitos pelo diretor desde a rodada 5, conferidos aqui:**
   - o arrasto b55–b56 do cap. 3 agora vai a (580, 745), longe do valor;
   - o cap. 1 tirou o texto da faixa no apoio do arrasto. O recorte deste capítulo entra no b30,5, e a faixa não fica vazia.
6. **Cap. 3, a cortina e o voo do b56 (rodada final).** O estado `total` agora é o próprio cartão do print: 889×302 em (540, 718,2). O cap. 3 desenha a cortina (`JANELA`, `PRINT`) e a partida do voo (`VOO`) em relação ao centro do contêiner, contando com (540, 720). Por isso o print e o R$ 5,90 sobem 2 px no quadro de 28,02 s (medido). Há duas correções possíveis no `cap3.js`:
   - desenhar a cortina e o `VOO` com `ctx.translate(540 - a.c.cx, 720 - a.c.cy)`, como o `U.cena`, mas com o centro de 720;
   - ou somar −1,8 ao y de `PRINT` e de `VOO` e usar `JANELA = [-444.5, -151, 889, 302]`, a forma nova.

   O cap. 3 diz ainda que recebe o dedo em (580, 845). Agora ele chega parado em (580, 829), 40 px acima da base nova, e o arrasto b55–b56 até (580, 745) sobe 84 px.
