# Crítica do capítulo 1: gancho e endereço (P01–P06, b0–b31, 0–15,5 s)

Arquivo: `filmes/11-tutorial-primeiro-acesso/capitulos/cap1.js` (trabalhado em `filmes/_trabalho-cap1/`).
Quadros: `.render-tmp/_trabalho-cap1/r1` … `r5`. Nome dos quadros: `bNN.NN-mb.png` (batida, com o desfoque de movimento padrão de 4 subquadros) e `bNN.NN-s1.png` (batida, `sub=1`, parado). Tempo da batida n = n × 0,5 + 0,013 s.

Critérios (1 a 10): gancho · leitura a 360 px · movimento · composição · profundidade · sincronia do som · acabamento · valores (n/a quando o plano não tem valor). Meta: 8 ou mais em tudo, no mínimo 3 rodadas.

## Rodada 1 (a primeira versão, com os itens da rodada 0)

Quadros: `r1/` (31 quadros). Folhas: `r1/folha-P01-P02.png`, `r1/folha-P03-P04.png`, `r1/folha-P05-P06.png`. Zoom: `r1/zoom-traco.png`, `r1/zoom-anel.png`, `r1/cel-b08.png`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P01 | 7 | 9 | 7 | 8 | 5 | 9 | 8 | n/a |
| P02 | 7 | 7 | 5 | 6 | 7 | 9 | 5 | 7 |
| P03 | 7 | 6 | 6 | 7 | 7 | 9 | 5 | 7 |
| P04 | 7 | 7 | 6 | 7 | 7 | 8 | 6 | 7 |
| P05 | 8 | 9 | 4 | 7 | 7 | 9 | 6 | 7 |
| P06 | 6 | 7 | 5 | 6 | 7 | 9 | 5 | 8 |

**Os 3 maiores problemas:**
1. **P05, 11,01–12,01 s (b22–b24):** o dedo fica estacionado fora da pílula (y 1010, abaixo da borda, que está em 870) e o arrasto b23–b24 sobe por cima do "12" do LOKAL12 (`b23.50-mb`).
2. **P02, 1,16 s (b2,3) e 1,66 s (b3,3):** o pin branco some dentro do círculo branco e "apaga" pedaços de "Complemento" e do "A" de LOKAL12 (`b02.30-mb`). Em b3–b3,6 o print aparece inteiro fora da janela enquanto o contêiner encolhe: o cabeçalho em cima e o cartão 4 embaixo. É a fatia que o crítico viu em y 1148–1162 (`b03.30-mb`).
3. **O dedo e os anéis no ato 1:**
   - o dedo chega 1,8 batida antes do CEP (3,0 s) e 1,6 batida antes do Complemento (7,8 s);
   - há dois anéis ao mesmo tempo em 5,16 s (CEP e Número) e em 8,26 s (Nome e Complemento);
   - a 360 px, o anel cola no contorno laranja do "Copiar" (`cel-b08`);
   - em 12,31 s (b24,6) o dedo sai do quadro cruzando a pílula da legenda;
   - em 12,66 s (b25,3) o recorte e o texto do endereço se sobrepõem;
   - o arrasto do cap. 2 apoia fora da faixa (y 900, com a base da faixa em 870) e passa sobre "Centro" (`b30.60-mb`).

**Conferido sem mudança:** o traço sob o LOKAL12 (4 px, 7 px abaixo das maiúsculas) fica embaixo da palavra e não parece tachado (`zoom-traco`). Ele recolhe no b7 e some antes do primeiro anel (b8). Todas as deixas caem num acerto medido, com desvio de 0 ms.

**Correções:**
- **Gancho:**
  - dentro do círculo, o pin passa a ser o **pin laranja real** (`assets/logo/logo-laranja-so-pin.png`, o mesmo desenho, registrado em `ativos`), recortado pelo círculo. A cor nova entra por dentro, da ponta para cima, e o pin afunda no LOKAL12 (b2,1–b2,8);
  - a ponta mira o alto do LOKAL12 (332, 966).
- **Janela:** `tela()` e o gancho recortam o print pela janela (980×840). Enquanto o contêiner encolhe, nenhuma fatia do cartão 4 aparece.
- **Anéis:** `pad` passa de 10 para 20, o que dá 6 a 7 px de respiro a 360 px. Eles duram 0,5 s (CEP, Número e Complemento) e 0,8 s (Nome), e o velho recolhe antes de o novo abrir.
- **Dedo:**
  - entra pela direita e sai pela direita (x 1240), sempre acima de y 1250 (o máximo visível é 1044);
  - CEP: entra no b6,6 e chega parado no b7,3;
  - Número: desliza no b8,5;
  - arrasto b11–b12: segue a tela com a mesma mola da rolagem (1,6 Hz, a partir do b11,1);
  - Nome: desliza no b12,6;
  - depois do Nome sai no b14,4 e volta no b15,6 para o Complemento (chega no b16,3);
  - sai no b17,4.
- **P05:**
  - o dedo entra no b21,5 e apoia dentro da pílula, 40 px acima da borda;
  - o ID sai subindo no apoio (b23);
  - o dedo sobe 100 px atrás dele, sem passar sobre o valor.
- **P06:**
  - a faixa passa a 980×320 com centro em y 780 (base em 940): o apoio do arrasto do cap. 2, em y 900, fica 40 px dentro dela;
  - o texto vai em −36 e +48 e o traço em +82 (o bloco fica centrado);
  - o recorte sai antes (b25 a b25,2) e o texto entra depois (b25,18);
  - o texto e o traço saem no apoio do arrasto do cap. 2 (TB(30) − 0,02), para o dedo não passar por cima.

## Rodada 2

Quadros: `r2/` (36). Folhas: `r2/folha-P01-P02.png`, `r2/folha-P03-P04.png`, `r2/folha-P05.png`, `r2/folha-P06.png`. Prova de celular: `r2/celular-a.png`, `r2/celular-b.png`. Zoom: `r2/zoom-b2.png`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P01 | 8 | 9 | 8 | 8 | 7 | 9 | 8 | n/a |
| P02 | 8 | 8 | 7 | 8 | 8 | 9 | 7 | 8 |
| P03 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P04 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| P05 | 8 | 9 | 6 | 8 | 8 | 9 | 7 | 8 |
| P06 | 8 | 8 | 7 | 8 | 8 | 9 | 7 | 8 |

**Os 3 maiores problemas:**
1. **P05, 11,26–11,61 s (b22,5–b23,2):** o dedo parado em y 830 encosta na base do "12". O topo do círculo fica em 784 e a base do texto em 780 (`b22.50-s1`, `celular-b`).
2. **P06, 12,16–12,36 s (b24,3–b24,7):** saindo para a direita na altura da faixa, o dedo passa por cima do "MG" do recorte real (`b24.30-mb`, `b24.60-s1`).
3. **P02, 1,16 s (b2,3):** o círculo cresce rápido, e o desfoque de 4 subquadros deixa 4 degraus na borda (`b02.30-mb`).

**Conferido:**
- o pin laranja aponta o LOKAL12 e afunda nele (`zoom-b2`);
- a janela não mostra mais o cartão 4;
- só há um anel por vez, e a 360 px o anel e o botão se separam;
- o dedo chega de 0,7 a 0,9 batida antes de cada toque.

**Correções:**
- A pílula do ID passa a 880×320 (raio 160). O LOKAL12 fica com a base em +52 (maiúsculas de 653 a 772). O dedo apoia em (800, 840) e sobe até 740, e o círculo fica 13 px abaixo da base do ID.
- O dedo sai no b24,05 para cima e para a direita (1240, 560), longe da linha do endereço.
- O raio final do círculo passa de 1350 para 1240, uma tentativa de deixar a borda mais lenta.

## Rodada 3

Quadros: `r3/` (37) e `r3x/` (10 quadros densos do gancho, b1,1–b2,6, já com o raio de volta a 1350). Folhas: `r3/folha-P01-P02.png`, `r3/folha-P03-P04.png`, `r3/folha-P05-P06.png`, `r3x/folha-gancho.png`. Celular: `r3/celular-a.png`, `r3/celular-b.png`.

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P01 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P02 | 8 | 8 | 7 | 8 | 8 | 9 | 7 | 8 |
| P03 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P04 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| P05 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P06 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |

**Os 3 maiores problemas:**
1. **P02, 1,31–1,41 s (b2,6–b2,8), uma regressão:** com o raio de 1240, o círculo desacelera antes de cobrir os cantos e deixa cunhas laranja no alto e embaixo, à direita (`r3/b02.60-mb`). Os degraus da borda continuam iguais (`r3/b02.30-mb`).
2. **P05, 11,76–12,01 s (b23,5–b24):** a pílula fica vazia por ~0,25 s entre a saída do ID e a transformação (`r3/b23.70-mb`).
3. **P02, 1,16–1,24 s (b2,3–b2,45):** os 4 degraus da borda do círculo são o desfoque de 4 subquadros do motor (guia §7). Só aparecem no quadro parado; em movimento leem como desfoque (`r3x/folha-gancho`). Ficam, e o assunto vai como pedido ao diretor.

**Conferido:**
- o pin cai de forma legível: sai do "O" no b1,1, passa pelo b1,2 e assenta no b1,6, com as letras subindo ao mesmo tempo (`r3x`). A queda é de ~100 px, e não de 230 px, porque a logo desceu para y 700;
- no P05 o dedo fica abaixo do ID com folga;
- o dedo sai por cima da faixa sem cobrir o recorte;
- no P06 o arrasto do cap. 2 apoia dentro da faixa e não passa sobre o texto.

**Correções:**
- O raio volta para 1350: a borda passa pelo canto mais longe (1222) ainda com velocidade.
- O ID sai em TB(23) + 0,1, quando o apoio do dedo se completa, e fica 2,48 s da entrada à saída. O dedo sobe a partir do b23,3. O vazio cai para ~0,15 s.

## Rodada 4

Quadros: `r4/` (33). Folhas: `r4/folha-P01-P02.png`, `r4/folha-P03-P04.png`, `r4/folha-P05-P06.png`. Celular: `r4/celular-a.png`, `r4/celular-b.png`. Loop: `r4/loop/` (0 s × 60 s). Movimento: `r4/mov/` (um quadro a cada 0,25 s, de 0 a 15,5 s).

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P01 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | n/a |
| P02 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P03 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P04 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| P05 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P06 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |

**Conferências:**
- **Som:** as 14 deixas do trecho (as 7 do capítulo, os 4 cliques e as 3 transformações dos b18, b24 e b31) caem num acerto medido, com desvio de 0 ms (`.render-tmp/_trabalho-cap1/cues.json` contra `beats.json`).
- **Algo novo a cada 2 a 4 s:** o maior trecho parado é de 1,0 s, de 13,25 a 14,25 s, depois do traço sob o endereço e antes de o dedo do cap. 2 entrar (`r4/mov`).
- **O dedo** (amostrado a 1/40 de batida):
  - chega parado de 0,7 a 0,9 batida antes de cada toque ou arrasto;
  - desliza entre toques a até 2 batidas um do outro (b8 → b10 → arrasto b11 → b14);
  - sai pela direita em até 0,3 s depois do b14, do b17 e do b24;
  - fica sempre acima de y 1250 (a base visível máxima é 1044);
  - está fora no quadro 0.
- **Área segura:**
  - texto nosso de 116 a ~900 em x, e de 653 a 862 em y;
  - LOKAL12 de 183 a 897;
  - contêineres com 980 de largura (o ID com 880).
- **Tamanhos de texto nosso por quadro:** no máximo dois (72 + 170 no P05; só 72 no P06).
- **Passagens:**
  - b31: a faixa (980×320, y 780) vira o cartão "Chegou na agência" do cap. 2 sem salto (`r4/b31.30-mb`);
  - loop: o quadro de 60 s é idêntico ao de 0 s, com 0 pixels diferentes (`F.abertura` sem mudança; `F.LOGO.pin` ganhou um 5º argumento opcional e continua compatível).

## Rodada 5 (depois da crítica independente)

Um crítico que não escreveu o código olhou a versão da rodada 4 e deu notas abaixo de 8. Materiais dele: `.render-tmp/_critica-cap1-1/` (folhas por plano, tira de 12 quadros do círculo, prova a 360 px, zooms, `mov/`, `loop/`, `cues.json`).

**As notas do crítico:**

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P01 | 7 | 9 | 7 | 8 | 6 | 7 | 7 | n/a |
| P02 | 7 | 8 | 6 | 7 | 8 | 9 | 6 | 8 |
| P03 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P04 | 8 | 8 | 8 | 8 | 8 | 8 | 7 | 8 |
| P05 | 9 | 9 | 6 | 7 | 8 | 9 | 6 | 9 |
| P06 | 6 | 6 | 7 | 7 | 8 | 9 | 7 | 8 |

**Os problemas dele e o que mudou** (só em `capitulos/cap1.js`):

1. **P02, 1,10–1,32 s (alta): a borda do círculo com 4 anéis duros, lida como halo.**
   - A borda passou a ser o desfoque do obturador desenhado: disco branco até rA = raio(t − 1/480) e uma rampa laranja de rA a rB = raio(t + 1/480). As 9 paradas da rampa seguem o raio no tempo, e não uma reta no raio.
   - Olhando a rampa em zoom (`r5/z-ponta`), sobravam dois defeitos meus:
     - um fio claro em cada rB, porque o branco e o laranja eram recortados no mesmo arco, com antisserrilhado nos dois;
     - 4 anéis na ponta do pin, porque a troca branco → laranja do pin era um recorte duro em cada subquadro.
   - Correções:
     - o branco vai até rB + 3, e a rampa, sem recorte, cobre a sobra;
     - o pin passou a ser desenhado em 8 amostras por subquadro (`amostrado`), cada uma com o seu raio.
   - Resultado: a borda é uma rampa contínua de ~160 px no pico, sem degraus nem fios (`r5/folha-tira-circulo`, `r5/z-tira`, `r5/z-b0230`). A alternativa do diretor (16 subquadros) não é mais necessária.
2. **P01, 0,51–1,01 s: o pin chegava em 0,30 s e ficava parado até o thump; queda de 97 px, encolhendo.**
   - Mola de 1,3 Hz: 77% em 0,3 s e 97,5% no b2, quando cai o thump (`r5/b01.90`, `b02.00`).
   - A escala cresce de 1,0 a 1,1 na queda e só encolhe no afundar (b2,06–b2,4).
   - A janela do P02 desceu, e o ALVO passou a (332, 1081): a queda agora é de **211 px**.
   - **Divergência:** a janela fica em cy **827**, e não em 883 como o crítico pediu. Medida: com a janela em 883 e o empurrão de 1,02, a borda de baixo fica em 1327, e a caixa da pílula nasce em 1276 no b5,04. Somando a mola da subida (2,4 Hz) e a câmera (0,5 Hz), as duas se cobrem por **4 quadros** logo depois do b5. Em 827, por 0 quadros: a borda fica em 1271.
   - No b5 a janela sobe para 720 com mola de 2,4 Hz (estado novo `janelaAlta`, whoosh 0,4), junto com a pílula. `projTela` e `mira()` andam com ela.
3. **P05, 11,04–12,17 s: dedo sob o "12", fatias na saída do ID, pílula vazia.**
   - O dedo apoia na ponta direita da pílula: (950, 780) → (950, 680). A sonda do motor dá **3 px** de folga até a caixa do ID (x 183–897) (`r5/z-p05-dedo`).
   - O ID fica até TB(24) − 0,26 (11,754 s: 2,62 s legível, como na lista) e sai pela máscara em 0,40 s, até 12,154 s.
   - Com o easeInOut da marca (pico 2,86), o ID passava a boca em 11,98 s, e a pílula ficava vazia até a faixa (`r5/z-troca-b24`, primeira versão). Duas mudanças:
     - o ID só anda o necessário para a base passar a boca (0,95 do corpo + 4 px, contra 1,5 do corpo antes);
     - a curva passou a ser um easeInOut em seno (pico 1,57): ~11 px por quadro, sem fatias.
   - O conteúdo do ID tem `saida: false`. Não há pílula vazia: a base do ID passa a boca enquanto a linha da faixa sobe (12,07–12,15 s).
4. **P05, 9,01–9,13 s: a tela saía pelo alfa do motor (fantasma).**
   - Tela com `{ de: 3, ate: 18.5, saida: false }`.
   - No b18 ela rola com a mola do contêiner (2,4 Hz) até centrar o cartão do Complemento (ponto 1198 do print).
   - Uma máscara opaca sobe da base ao topo do contêiner em 0,22 s. A borda é uma rampa de branco, do mesmo jeito que a do círculo, e o LOKAL12 sobe por baixo dela. Nada de alfa (`r5/z-troca-b18`, `b18.10`–`b18.30`).
5. **P06, 12,01–12,71 s: a linha real aparecia de uma vez.**
   - A linha real sobe pela máscara a partir de TB(24) + 0,06. Para isso, o conteúdo da faixa ganhou `atraso: 0`: com o atraso padrão de 0,12 s, o motor cortava a entrada.
   - Ela fica uma batida, como na D0, e sai no b25 (0,2 s, easeInOut).
   - O texto nosso sobe em TB(25) + 0,12, quando o recorte já passou 75% da boca: as duas linhas não se cobrem mais. Na primeira versão desta rodada elas se cobriam em 12,51 s (`r5/z-troca-b24`).
6. **P06, 12,17–14,99 s: dois blocos de 72 px sem hierarquia.**
   - Endereço em `F.tam.UI` (60 px, peso 700), linhas em −30 e +40, traço em +68. A linha 1 termina em "Centro", sem o "·" solto.
   - Ficou em **TINTA**, e não em TINTA2: no celular, a 20 px, a tinta 2 perde contraste, e o guia (§3, texto de cartão) aceita as duas.
   - Precisa do OK do diretor, que pediu 72 px na D0 (veja os pedidos).
   - Legível de ~12,85 a 15,30 s: **~2,45 s** (7 palavras pedem 2,3 s).
7. **P06, 14,99–15,63 s: saída cedo, por causa do cap. 2 velho na cópia.**
   - `cap2.js` e `cap3.js` foram recopiados do filme principal; os da cópia são agora byte a byte iguais aos do principal (`cmp`).
   - `SAI_END` voltou para TB(31) − 0,26.
   - Medidas em 14,81, 15,10, 15,25, 15,40, 15,58 e 15,68 s (`r5/folha-passagem-b31`): o dedo do cap. 2 apoia em x 1000 e fica a pelo menos **151 px** do bloco do endereço (sonda). O texto some em 15,49 s, antes da troca do b31.
8. **Motor (legendas):** a caixa da pílula nasce antes do texto e sai por opacidade. Fica para o diretor (pedido 3). Aparece em 2,53, 6,03, 8,53 e 12,03 s.
9. **P01, 0,78–0,85 s: fatias das letras na boca.**
   - As duas linhas da logo saem, cada uma, pela boca da própria máscara, como as linhas de uma legenda: "VAI de" anda 137 px, "LOKAL" 226 px (antes eram 398 px numa boca só).
   - Saídas com easeInOut: b1 → b1,84 e b1,12 → b2. Pico de ~15 e ~23 px por quadro, com 8 amostras por subquadro.
   - A logo foi só cortada na faixa vazia entre as linhas (y 162 do arquivo), sem redesenho. O b1 é idêntico ao quadro 0 (`r5/z-letras`).
10. **P02, 2,01 s: o b4 com o menor peso do plano.** A câmera passa a empurrar no b4: 1,02× para o LOKAL12 (536, 963), com mola de 0,9 Hz, junto com o traço e o pop. No b5 ela recentra em (540, 955), para a janela de 720. Com 980 × 1,02 = 1000, a margem de 40 px fica.
11. **P02, 1,4–2,5 s: janela alta e apertada.**
    - Janela de 980×882 (882 × 1,02 = 900), com o print recortado em y 330–1356 (sem o cabeçalho, sem o cartão 4) e centro em 843.
    - No b4,9 o título fica a 53 px da borda de cima e o cartão 3 a 30 px da de baixo (contêiner e câmera lidos do motor, conteúdo medido no quadro).
    - O vazio entre a janela e o fim da área segura (y 1536) caiu de 396 para 265 px.
12. **P03–P04: anel a 6 px do cartão.** O anel agora corre em volta do contorno laranja medido no print (`borda` em `BOTOES`), com pad 12 e traço de 6 px. Medido no zoom (`r5/z-aneis`): ~8 px livres do botão e ~11 px da borda do cartão.
13. **Ordem dos toques (1, 2, 4, 3) contra "Copie na ordem em que a loja pede."** O capítulo não pode mudar (legendas e lista travadas). Vai para o diretor e a usuária (pedido 7).

**Os 3 maiores problemas desta rodada** (achados olhando os quadros novos, todos corrigidos acima):
1. **P02, 1,06–1,30 s:** fios claros na borda do círculo e anéis na ponta do pin, mesmo com a rampa (itens 1 e 2: o recorte duplo e a troca de cor do pin).
2. **P05/P06, 11,98–12,15 s:** pílula vazia antes da faixa (o ID passava a boca em 60% da saída, e o motor só começava a faixa em TB(24) + 0,12), e o recorte e o texto se cobrindo em 12,51 s (itens 3 e 5).
3. **P01, 0,74–0,81 s:** as letras andando 398 px numa boca só (item 9).

**Conferências:**
- **Som:** são 15 deixas de 0 a 15,5 s. Entram as 7 do capítulo, os 4 cliques e as transformações dos b5 (nova, ganho 0,4), b18, b24 e b31. Todas caem num acerto medido de `beats.json`, com desvio de 0 ms (`r5/cues.json`).
- **Movimento** (`r5/mov/`, 156 quadros parados, um a cada 0,1 s):
  - o único trecho parado acima de 0,5 s é 13,3–13,9 s (0,6 s, antes 1,1 s);
  - o de 0,0–0,5 s é a cartela do loop.
- **Dedo** (sonda do motor a 1/240 s, `r5/sonda.mjs`):
  - chega a 3 px do alvo de 0,79 a 0,97 batida antes de cada toque e do arrasto b23;
  - no arrasto b11 ele já está no Número desde o toque do b10;
  - sai do quadro em 0,38 s depois do b14 e do b17, e em 0,19 s depois do b24;
  - a base visível máxima é 1046 (acima da legenda);
  - está fora no quadro 0.
- **Loop** (`r5/loop/`): 0 s e 60 s idênticos, com 0 pixels diferentes.
- **Contrato:** nada de `Math.random`, timers ou `confirm`. As camadas de `amostrado` são criadas a cada chamada, sem estado entre quadros.

Quadros: `r5/` (desfoque de 4 subquadros, `-mb`, e parados, `-s1`). Folhas: `r5/folha-p01p02.png`, `r5/folha-p02p04.png`, `r5/folha-p05.png`, `r5/folha-p06.png`, `r5/folha-paradas.png`, `r5/folha-tira-circulo.png` (com os quadros em `r5/tira/`) e `r5/folha-passagem-b31.png`. Celular: `r5/celular-a.png`, `r5/celular-b.png`.

**As notas novas:**

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P01 | 8 | 9 | 8 | 8 | 8 | 8 | 8 | n/a |
| P02 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P03 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P04 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| P05 | 9 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P06 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |

**O que ainda pesa** (fora do arquivo do capítulo, ou no limite):
- a pílula da legenda do motor (pedido 3);
- o dedo do P05 a 3 px do "12" (1 px no celular);
- no P02, o b4 ganha só 2% de empurrão: a regra da largura de 980 px não deixa ir além.

## Rodada 6 (o motor novo e o cap. 2 novo)

Na hora de copiar o `cap1.js` de volta, o `index.html` e o `cap2.js` do filme principal estavam diferentes dos da cópia de trabalho. Os dois tinham mudado em 26/10, às 8h10 e às 8h26, enquanto este capítulo andava. As mudanças:
- **motor:** 8 subquadros (antes 4); a boca de baixo do `a.sobe` a 0,42 do corpo; o texto da pílula entrando em t0 − 0,04;
- **cap. 2:** o recorte "Chegou na agência" passa a subir dentro da faixa do cap. 1 no b30,5 (conteúdo `de: 30.5`), contando que o texto do endereço já tenha saído (no filme principal, o cap. 1 da rodada 4 o tirava em TB(30) − 0,02).

Os dois arquivos foram recopiados para `filmes/_trabalho-cap1` (sem edição; os 9 arquivos da cópia são iguais aos do principal), e a rodada inteira foi refeita contra eles. O capítulo já usa `F.SUB`: `MEIO` passa a 1/960 s, e as rampas do círculo, do pin e das letras se ajustam sozinhas.

**Os 3 maiores problemas** (com o motor e o cap. 2 novos):
1. **P06/P07, 15,26–15,49 s (passagem b31):** com a saída da rodada 5 (TB(31) − 0,26), o endereço e o recorte novo do cap. 2 dividiriam a faixa por 0,23 s, dois textos na mesma altura (máscara do cap. 2: y 625–829; endereço: y 707–848).
   - **Correção:** o endereço sai em TB(30,5) − 0,24 e termina de passar a boca exatamente no b30,5, quando o recorte do cap. 2 começa a subir. O traço recolhe 0,1 s antes.
   - Isso volta atrás no item 7 da rodada 5. O motivo daquele pedido (o dedo do cap. 2 velho sobre o texto) não existe mais: o dedo apoia em x 1000, a **191 px** do bloco (sonda).
   - Leitura pela conta da lista (da entrada ao começo da saída): 2,39 s. Uma leitura de 7 palavras pede 2,33 s.
   - Conferido em `r6/folha-passagem-b31` (b30 a b31): sem sobreposição e sem faixa vazia, salvo 1 a 2 quadros (15,23–15,26 s) com as pontas do "p" e da "/" passando a boca.
2. **P06, 15,26 s:** um resto do traço sob "agência" no quadro do b30,5 (`r6/z-trocas-p06`, primeira versão). Corrigido com o traço recolhendo 0,1 s antes do texto.
3. **Motor (pílula):** com o texto em t0 − 0,04, a primeira linha passa 1 a 2 quadros fora da caixa, que ainda está crescendo: a vírgula de "No complemento," em 8,66 s e a de "No destinatário," em 6,16 s (`r6/z-legenda-entra`). Branco sobre branco, quase invisível, mas é do motor (pedido 3).

**Conferido com o motor novo:**
- círculo do b2: rampa contínua com 8 subquadros, sem anéis nem fios (`r6/folha-tira-circulo`, `r6/z-tira`);
- letras (`r6/z-ponta-letras`);
- passagem b24: o ID sai enquanto a linha real sobe (`r6/z-trocas-p06`);
- b25: o recorte sai e o texto entra sem se cobrirem, também com a boca mais funda do `a.sobe`;
- b18: a máscara opaca (`r6/folha-p05`).
- **Som:** 15 deixas de 0 a 15,5 s, todas num acerto medido, com desvio de 0 ms (`r6/cues.json`).
- **Movimento** (`r6/mov/`): o único trecho parado acima de 0,5 s é 13,3–13,9 s; o de 0,0–0,5 s é a cartela.
- **Dedo** (`r6/sonda.mjs`):
  - chega de 0,79 a 0,97 batida antes de cada gesto;
  - sai em 0,38 s, 0,38 s e 0,19 s;
  - a base máxima é 1046;
  - fica a 3 px do ID;
  - está fora no quadro 0.
- **Loop** (`r6/loop/`): 0 pixels diferentes.

Quadros: `r6/`. Folhas: `r6/folha-p01p02.png`, `r6/folha-p03p04.png`, `r6/folha-p05.png`, `r6/folha-p06.png`, `r6/folha-tira-circulo.png`, `r6/folha-passagem-b31.png`. Celular: `r6/celular-a.png`, `r6/celular-b.png`.

**As notas:**

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P01 | 8 | 9 | 8 | 8 | 8 | 8 | 8 | n/a |
| P02 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P03 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |
| P04 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| P05 | 9 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P06 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 8 |

## Rodada final (acabamento do diretor)

**Sincronização antes de tudo:** `index.html`, `filme.js`, `trilha.js`, `beats.js`, `beats.json` e `capitulos/*.js` copiados de `filmes/11-tutorial-primeiro-acesso/` para `filmes/_trabalho-cap1/` (9h49). Às 9h51 o `beats.json` do filme principal foi medido de novo; só `hits_forca` mudou (batidas, tempos fortes e acertos iguais, então `TB()` e `hit()` não mudam), e ele foi recopiado. No fim, todos os arquivos da cópia são iguais aos do principal (`cmp`), menos o `cap1.js`.

Motor desta rodada (do diretor, sem edição): 8 subquadros; boca de baixo do `a.sobe` a 0,42 do corpo; pílula da legenda abrindo e fechando por recorte, de baixo para cima, sem opacidade, com o texto recortado pela caixa e a caixa nascendo 0,06 s antes do texto.

Quadros: `.render-tmp/_trabalho-cap1/final/`, uma pasta por item (`i1-circulo`, `i2-janela`, `i3-p05`, `i4-p06` e `i4-p06b`, `i5-b31`, `i6-pilulas`, `i7-letras`), mais `rodada/` (a rodada de crítica) e `loop/`. Nome: `bNN.NN-tS.SSS-mb.png` (desfoque padrão de 8 subquadros) ou `-s1.png` (parado). Sonda do motor: `final/sonda.mjs` (resultado em `final/sonda.txt`). Ajudantes: `final/rf.sh` (renderiza e copia para `final/`), `final/recorte.py` (folha de recortes), `final/rampa.py` (mede a rampa do círculo).

### Os itens do diretor

| # | Item | Feito | Como (e a conferência) |
|---|---|---|---|
| 1 | **P02 (b2,1–b2,6): a borda do círculo lida como halo** | sim | `raio = suave(prog(u, TB(2), TB(2) + 0,50)) × 1450` (a curva em seno que já existia no arquivo, agora no topo, usada também pela saída do ID). Pico de ~4.550 px/s. Rampa medida na tela (90% → 10% de branco, raio para baixo a partir da ponta do pin): 49 px no b2,3, 58 px no b2,4 e 62 px no b2,5, o pico (na rodada 6, 79 px já no b2,3, e ~170 px no pico). O canto mais longe (1080, 0), a 1315 do ALVO, está dentro da rampa no b2,8 e branco puro no b2,9 (TB(2) + 0,45), antes do morph do b3: os únicos pixels laranja que sobram no b2,9 e no b3 são os da interface (9.844, constante). `final/folha-i1-circulo.png`, `final/rampa.py` |
| 2 | **P02/P03 (b5,4–b5,7): fundo a 37 px da lateral e topo a 265** | sim | As duas coisas: janela de **972** de largura (`JW`, usada por `janela`, `janelaAlta` e `janela2`), e câmera do b5 a **1,015** em (540, 956,5), com a **mesma mola da janela (2,4 Hz)**, e não 0,5 Hz. A causa do topo era a câmera chegar 1 s depois da janela. Sonda (1/240 s): margem lateral mínima de **42,9 px** de b5 a b8 (b5,1) e de 46,7 px de b8 a b12; topo mínimo de **271,7** (b5 a b8) e 272,3 (b8 a b12); base máxima de 1167,6. No empurrão do b4 (1,02, x 536) a margem fica em 49,2 px no b5. `final/folha-i2-janela.png`, `final/sonda.txt` |
| 3 | **P05 (b21,5–b24): o dedo a 2,8 px do "2" e passando do contorno** | sim | Estado `id` com **980×320** (r 160). Dedo: entra em (970, 770) no b21,5 e arrasta até (970, 680) a partir do b23,3. Tinta do LOKAL12 medida: x 196–888. Folga mínima entre a borda de fora do dedo (49,5 px, contorno fino incluído) e a tinta: **30,8 px** (11,16 s, no sobressinal da chegada); até a caixa de avanço (x 897), 24 px. Contorno: o disco e a borda branca ficam dentro da pílula; só o traço fino de fora (1,5 px, tinta a 35%) encosta na borda, 1,3 px além dela, de b22,6 ao apoio (b22,94), e fica 8 px por dentro durante o arrasto (o dedo apertado tem 82%). Mantive as coordenadas do diretor: para o traço fino ficar 4 px por dentro, o apoio teria que ir a y 756. A margem lateral da pílula a 1,02 é de 40,1 px (b24). `final/folha-i3-p05.png`, `final/z-p05-dedo.png` |
| 4 | **P06: o endereço em texto nosso volta a 72 px** | sim | `F.tam.ROTULO` (72), peso 700, tinta. Linhas em cy − 34 e cy + 50. Medidas no motor: a linha 1 ("Rua de Exemplo · Centro") tem 753,6 px (x 116–869,6) e a linha 2 ("Belo Horizonte/MG"), 590,6 px (x 116–706,6). Cabe no cartão de 980 (x 50–1030) e na área segura (até 1004). O traço vai na largura **medida da linha 2** (590,6 px), em cy + 84 (34 px abaixo da base dela). O bloco vai de 696 a 867, centrado na faixa (620–940). O quadro tem um só tamanho de texto nosso: 72 (legenda e endereço). **Uma correção a mais:** com a linha 1 em 72 px, as pernas do recorte real (o "p" e a "/") riscavam o alto da linha 1 por 2 quadros (12,63–12,65 s, `final/z-p06-troca-b25.png`). O recorte agora sai em TB(25) − 0,04 (antes, no b25), e o texto continua entrando em TB(25) + 0,12 (`TXT_ENTRA = REC_SAI + 0,16`): leitura de 2,33 s, a conta da lista para 7 palavras. Resto mais escuro no quadro de troca: 247 de 255, invisível (`final/z-p06-troca-b25-v2.png`). `final/folha-i4-p06.png` |
| 5 | **P06 (b30,4–b30,5): pontinhos cinza passando pela boca com a faixa vazia** | sim | `SAI_END = TB(30,5) − 0,30`. O traço recolhe em `SAI_END − 0,1` (some no b30,18). As pernas do "p" e da "/" passam a boca no b30,3, junto com a metade de baixo das duas linhas (não sobram pontos soltos). A faixa fica limpa de b30,35 a b30,5 (~5 quadros, durante o arrasto do dedo do cap. 2), e o recorte "Chegou na agência" do cap. 2 sobe no b30,5. Na passagem do b31, nada se cobre. O dedo do cap. 2 (x 1000) fica a 81 px do bloco do endereço, agora mais largo. `final/folha-i5-b31.png`, `final/z-b31-saida.png` |
| 6 | **As entradas e saídas das pílulas com o motor novo** | conferido | 47 quadros, em 2,51–2,71, 5,76–6,21, 8,26–8,71, 11,76–12,21 e 15,26–15,71 s. **Nenhuma letra fora da caixa** (o texto é recortado por ela na entrada e na saída) e **nenhuma opacidade**: a caixa abre e fecha pela borda de cima. **Uma coisa do motor, de 1 quadro por troca:** nos quadros 6,038, 8,538, 12,038 e 15,538 s (b12,05, b17,05, b24,05 e b31,05), a última fatia da caixa velha e a primeira da nova aparecem juntas, como duas faixas cinza de ~30 px. A velha fecha em TB(n) + 0,02 e a nova abre no mesmo instante, e só alguns dos 8 subquadros têm caixa. O mesmo desfoque da borda aparece no primeiro quadro de cada abertura (2,538 s). Não dá para corrigir no capítulo (pedido 11). `final/folha-i6-pilulas-a.png`, `-b.png`, `-c.png`, `final/z-pilulas-troca.png` |

### A rodada de crítica (capítulo inteiro)

Quadros (`final/rodada/`): P01 b0 (parado), b1,1, b1,3, b1,6, b1,9 · P02 b2,3, b2,5, b3,4, b4,3, b4,6 · P03 b5,3, b7,4, b8,3, b10,3, b11,5 · P04 b12,3, b13,6, b14,3, b16,3 · P05 b17,3, b18,1, b18,2, b19,5, b23,7 · P06 b24,3, b25,6, b26,8, b29,6, b30,75 (desfoque padrão de 8 subquadros). Folhas: `final/folha-p01p02.png`, `final/folha-p03p04.png`, `final/folha-p05p06.png`. Prova a 360 px: `final/celular-a.png`, `final/celular-b.png`. Zoom das letras do P01: `final/z-letras.png` (b1,4–b1,8).

**Os 3 maiores problemas desta rodada** (os da lista do diretor ficaram resolvidos acima):
1. **P06, 12,63–12,65 s:** as pernas do recorte real riscando o alto da linha 1, que agora tem 72 px. Corrigido (item 4: recorte sai em TB(25) − 0,04).
2. **Legendas, nos quadros de troca (6,04, 8,54, 12,04 e 15,54 s):** duas fatias de caixa cinza no mesmo quadro (1 quadro cada). É do motor (pedido 11).
3. **P05, b22,6–b22,94:** o traço fino de fora do dedo encosta na borda da pílula (1,3 px), nas coordenadas pedidas. Fica, e o assunto vai como nota ao diretor (pedido 12).

**Conferências:**
- **Som:** 15 deixas de 0 a 15,5 s (as 7 do capítulo, os 4 cliques e as transformações dos b5, b18, b24 e b31). Todas caem num acerto medido de `beats.json` (o novo), com desvio de 0 ms (`final/cues.json`).
- **Dedo** (`final/sonda.txt`):
  - chega a 3 px do alvo de 0,79 a 0,97 batida antes de cada toque e do arrasto b23;
  - sai do quadro 0,38 s depois do b14 e do b17, e 0,18 s depois do b24;
  - a base visível máxima é 1046, acima da legenda;
  - está fora no quadro 0.
- **Composição:** o fundo do contêiner fica a pelo menos 40 px das laterais de b5 a b31 (o mínimo, 40,1 px, é a pílula do ID a 1,02 no b24). A janela fica de 271,7 a 1167,6 de b5 a b12. No P05 há dois tamanhos de texto nosso (72 e 170); no P06, um (72).
- **Loop** (`final/loop/`): 0 s × 60 s, com 0 pixels diferentes.
- **Contrato:** nada de `Math.random`, timers ou `confirm`.
- **Algo novo a cada 2 a 4 s** (`final/mov/`, 156 quadros parados, um a cada 0,1 s; `final/parado.py`): os trechos parados de 0,3 s ou mais são 0,0–0,5 s (a cartela do loop), 7,4–7,8 s e **13,3–14,4 s (1,1 s, o maior)**, entre o traço sob o endereço e a entrada do dedo do cap. 2. Tudo abaixo dos 2 s da regra.

**As notas:**

| Plano | Gancho | Leitura 360 | Movimento | Composição | Profundidade | Som | Acabamento | Valores |
|---|---|---|---|---|---|---|---|---|
| P01 | 8 | 9 | 8 | 8 | 8 | 8 | 8 | n/a |
| P02 | 8 | 8 | 9 | 8 | 8 | 9 | 8 | 8 |
| P03 | 8 | 8 | 8 | 9 | 8 | 9 | 8 | 8 |
| P04 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| P05 | 9 | 9 | 8 | 8 | 8 | 9 | 8 | 9 |
| P06 | 8 | 9 | 8 | 9 | 8 | 9 | 8 | 8 |

Por que subiram:
- **P02, movimento (9):** a borda do círculo é desfoque de movimento (49–62 px), e não mais halo;
- **P03, composição (9):** a janela tem margens de 46,7 px dos lados e fica de 272 a 1168, sem encostar nos limites;
- **P06, leitura e composição (9):** o endereço em 72 px se lê no celular com o mesmo peso da legenda, o traço marca a linha 2 medida, e o quadro tem um só tamanho de texto nosso.

Nada ficou abaixo de 8.

## Mudanças de batida (dentro do capítulo; as passagens b31, b56 e b84 e as legendas não mudaram)

- **CEP:** o dedo entra no b6,6 e chega parado no b7,3 (na lista, entra no b5,5 e chega no b7), para chegar de meia a uma batida antes do toque.
- **Complemento:**
  - depois do toque no Nome (b14), o dedo sai no b14,4 e volta no b15,6, chegando no b16,3 (na lista, sobe direto até o Complemento e chega no b16);
  - o motivo: há 3 batidas entre os toques, e a regra manda sair do quadro.
- **Saídas:** o dedo sai no b17,4 e no b24,05 (na lista, b17,6 e b24,3), dentro dos 0,4 s depois do gesto.
- **P01:** as letras saem de b1 a b2 (antes, de b1 a b1,64), linha por linha, e a ponta do pin toca no b2, junto com o thump (antes, pousava no b1,6).
- **P02/P03 (rodada 5):** a janela fica em cy 827 do b3 ao b5 e sobe para 720 no b5, junto com a pílula (estado novo `janelaAlta`, mola de 2,4 Hz, whoosh 0,4 no b5). A câmera empurra para o LOKAL12 no b4 (antes, respirava a partir do b5).
- **P05 (rodada 5):** no b18 a tela rola até o cartão do Complemento e sai por uma máscara opaca até TB(18) + 0,22, e o conteúdo da tela vai até o b18,5 (antes, saía pelo alfa do motor em 0,12 s).
- **Arrasto b23–b24 (rodada 5):**
  - o dedo apoia na ponta direita da pílula (950, 780) e sobe até 680 a partir do b23,3;
  - o ID volta a sair em TB(24) − 0,26, como na lista (2,62 s legível), e a saída dura 0,40 s, até TB(24) + 0,14.
- **P06 (rodada 5):**
  - o recorte real entra em TB(24) + 0,06 e sai no b25;
  - o texto nosso entra em TB(25) + 0,12;
  - o texto sai em TB(30,5) − 0,24 e termina de passar a boca no b30,5, quando o recorte do cap. 2 sobe na mesma faixa; o traço recolhe 0,1 s antes (rodada 6; na rodada 4, TB(30) − 0,02; na rodada 5, TB(31) − 0,26).
- **Rodada final (acabamento do diretor):**
  - P02: o círculo cresce de TB(2) a TB(2) + 0,50, em seno (antes, 0,40 s com o easeInOut da marca);
  - b5: a câmera vai a 1,015 em (540, 956,5) com mola de 2,4 Hz (antes, 1,02 em (540, 955) com 0,5 Hz);
  - P05: arrasto de (970, 770) a (970, 680), na mesma batida (b23,3);
  - P06: o recorte real sai em TB(25) − 0,04 (antes, no b25), e o texto continua entrando em TB(25) + 0,12;
  - P06: o endereço sai em TB(30,5) − 0,30 e termina de passar a boca em TB(30,5) − 0,06; o traço recolhe em TB(30,5) − 0,40.
- **Anéis dos toques:** duram 0,5 s (CEP, Número e Complemento) e 0,8 s (Nome), em vez de 1,4 s, para haver um destaque laranja por vez.
- **Rolagem:** o whoosh fica no b11, quando a tela começa a rolar (na lista, b12).

## Pedidos ao diretor

1. **Tabela de passagens (b31):** a faixa tem 980×320, com centro em y 780 e base em 940. A lista diz 1000×240. O cap. 2 atual apoia em (1000, 900), dentro dela.
2. ~~Cap. 2: saídas pelo canto de baixo~~ Resolvido no cap. 2 atual: ele sai pela direita.
3. **Motor (`legendas()`), reforçado pelo crítico:**
   - **saída:** a caixa da pílula ainda sai por opacidade (globalAlpha = 1 − ex, em 0,24 s). É um fade da interface, em 5,75, 8,25, 11,75 e 15,25 s. Sugestão do crítico: a caixa sair encolhendo para a esquerda, sem globalAlpha (largura × (1 − 0,4·ex) e y + 30·ex), junto com o texto;
   - **entrada:** o motor de 26/10 já faz o texto subir em t0 − 0,04, junto com a caixa. Mas, com a caixa crescendo de 60% a 100% da largura, a primeira linha passa 1 a 2 quadros fora dela (a vírgula de "No complemento," em 8,66 s e a de "No destinatário," em 6,16 s). Sugestão: recortar o texto pela caixa, ou fazer a caixa crescer a partir de 90%.
4. ~~Motor: 8 subquadros na cortina do b2~~ Não é mais preciso: o capítulo desenha a borda como o desfoque do obturador.
5. **`comum.js`:** registrar `logoPinLaranja` em `F.u.TELAS`. Hoje o cap. 1 o registra em `ativos`.
6. **Lista de planos:**
   - o P01 diz que o pin "cai cerca de 230 px"; com a logo em y 700 e a janela do P02 em cy 827, ele cai 211 px, até o alto do LOKAL12 (332, 1081);
   - a pílula do ID tem 980×320 (a lista diz 880×300); a faixa do P06 tem 980×320 (a lista diz 1000×240); a janela do P02 tem 972×882, em cy 827 (a lista diz 1000×840, y 300–1140).
7. **Para o diretor e a usuária (do crítico):** os toques vão na ordem 1, 2, 4, 3 (CEP, Número, Nome, Complemento), mas a tela real numera os cartões e diz "Copie na ordem em que a loja pede.". É preciso decidir entre:
   - registrar a escolha (fechar no ID) como aceita;
   - ou trocar os toques e as duas legendas de b12–b24 numa revisão da lista.
8. ~~OK do diretor no endereço do P06 em 60 px~~ Decidido pelo diretor na rodada final: 72 px (`F.tam.ROTULO`), com um só tamanho de texto nosso no quadro.
9. **Guia (composição):** o P02 não tem legenda, mas a janela fica em cy 827, e não em 883. Em 883, a borda de baixo e a caixa da pílula se cobrem por 4 quadros no b5.
10. **Cap. 2 (nota):** em 15,58 s o dedo do arrasto b30–b31 passa a ~4 px do fim de "agência" (x 947), no cartão novo. No quadro do b30,5, o recorte nasce já dentro da máscara (96 px abaixo do lugar) e aparece a meia opacidade pelo desfoque dos subquadros. O cap. 1 termina de tirar o endereço em TB(30,5) − 0,06 (rodada final) para não cobri-lo; se o cap. 2 mudar essa batida, o `SAI_END` do cap. 1 tem que mudar junto.
11. **Motor (`legendas()`), na troca de uma pílula para a outra:** a caixa velha fecha em `t1 + 0,28` = TB(n) + 0,02, e a nova abre em `t0 − 0,06` = TB(n) + 0,02, o mesmo instante. No quadro dessa troca (6,038, 8,538, 12,038 e 15,538 s no cap. 1), a última fatia da velha e a primeira da nova aparecem juntas, como duas faixas cinza de ~30 px, de larguras diferentes (só alguns dos 8 subquadros têm caixa). É 1 quadro por troca. A sugestão é abrir a caixa nova um quadro depois de a velha fechar, ou fechar a velha 1/60 s antes. O primeiro quadro de cada abertura (2,538 s) também mostra a borda em 8 degraus cinza: é o desfoque da borda que sobe rápido, e não opacidade.
12. **P05 (nota):** com o apoio em (970, 770), o disco do dedo fica dentro da pílula de 980, mas o traço fino de fora (1,5 px, tinta a 35%) encosta na borda, 1,3 px além dela, de b22,6 a b22,94. Durante o arrasto, com o dedo apertado, ele fica 8 px por dentro. Se o diretor quiser o traço por dentro com folga, o apoio vai para (970, 756) e o arrasto termina em (970, 666). Na prova de 360 px não se vê.
