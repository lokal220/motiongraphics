# Crítica: capítulo 2, os favores (P06–P10, batidas 24–44, 12–22 s)

Arquivo: `filmes/09-diretor/capitulos/cap2.js`.

Folhas em `.render-tmp/09-diretor/`:
- quadros soltos em `cap2/`;
- folhas em `cap2-<plano>-r<rodada>.png`, a versão de celular em `-cel.png` e as tiras de movimento em `cap2-<plano>-tira*.png`;
- as folhas finais são `cap2-final-sub4.png` (4 subquadros, sem guia) e `cap2-chave.png` / `cap2-chave-cel.png`.

Os tempos abaixo estão em batidas. A grade medida dá b n ≈ n × 0,5 + 0,015 s; a 44 cai em 22,015 s.

## O desenho em uma linha por plano

| Plano | Desenho |
|---|---|
| P06 | Portaria em traço: guarita com janela, luminária, cadeira de escritório vazia (de lado) e o telefone sobre a mesa. Ao lado, a porta de vidro dupla e o interfone da rua. O interfone solta ondas no "ding" (b24) e no "dong" (b25), e o telefone da guarita treme sem ninguém atender. O interior fica em tinta 2, atrás do vidro (profundidade). |
| P07 | O contêiner encolhe para a direita e vira uma conversa genérica: cabeçalho "Vizinho", barra de digitar e botão de enviar redondo. Encolhendo, ele revela à esquerda a mesma guarita, esmaecida em linha clara (o fundo do ato inteiro). Digita (barra), o polegar envia no b29, a bolha cresce com mola, e "Tô viajando, desculpa." chega no b30, empurrando a primeira para cima. |
| P08 | A conversa rola para cima e some sob o cabeçalho. "Vizinho" vira um cartão (o cartão infla a partir da divisória) e "Amigo" abre embaixo. Envia no b33, os três pontinhos aparecem no b34 e somem no b35 (o silêncio da música), e a bolha enviada volta a descer. |
| P09 | Dois cartões empilhados, cabeçalho "Mãe". Envia no b37 e "Tô do outro lado da cidade." chega no b38. |
| P10 | "Mãe" vira o terceiro cartão. Pedidos (bolhas de tinta com o texto em barras, sem frase nova) entram pela boca do "saco", um por colcheia e depois por semicolcheia, nas mesmas batidas dos pops. Eles empurram cartões e pedidos para baixo e se apertam: ficam mais baixos, se sobrepõem com contorno branco e entortam até 1,4°. O contêiner afunda 80 px e cede embaixo, passando da faixa. Tudo congela em b43.75, a semicolcheia muda. |

## P06: sem porteiro

### Rodada 1
Quadros: b24.6, b25.5, b26.5 e b27.6 (`cap2-p06-r1.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 7 | 7 | 6 | 6 | 6 | 6 |

Problemas:
1. O desenho está colado na borda esquerda do contêiner (a laje da guarita encosta nela) e sobram ~220 px vazios à direita.
2. A cadeira vista de costas (encosto quadrado + assento) lê como um monitor sobre uma mesa: a "cadeira vazia", que é a ideia do plano, não se lê.
3. O telefone da guarita (caixa com alça) lê como uma caixa aberta, isto é, como uma **encomenda** largada na guarita, o que contradiz a história.

Correções:
- todo o desenho do P06 andou 70 px para a direita (`DESLOCA`), com margens de ~75 px dos dois lados;
- a cadeira virou cadeira de escritório de lado (encosto alto, braço, assento, coluna, base e rodinhas);
- o telefone virou telefone de mesa (base trapezoidal e fone deitado no gancho).

### Rodada 2
Quadros: b24.6, b25.5, b26.5 e b27.6, mais as tiras b24.0–24.9 e b24.95–25.6 (`cap2-p06-r2.png`, `cap2-p06-tira-b24.png`, `cap2-p06-tira-b25.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 8 | 7 | 6 | 6 |

Problemas:
1. Na tira do b24, as ondas do interfone e os risquinhos de vibração do telefone aparecem **soltos no vazio** (b24.3) antes do interfone e do telefone estarem desenhados.
2. O primeiro toque dura 0,62 s e emenda no segundo, de modo que o "dong" do b25 não se distingue visualmente do "ding".
3. O primeiro toque visível chega ~0,3 s depois do "ding" da música.

Correções:
- as ondas só aparecem com o interfone desenhado (largura × progresso da entrada) e os risquinhos só com o telefone desenhado;
- cada toque agora solta três ondas curtas (0,32 s), que andam para fora e afinam;
- o interfone é o primeiro traço a entrar (0,3 s), o primeiro toque passou para TB(24)+0,1 e o conteúdo do P06 entra 0,06 s depois da batida (`atraso: 0.06`, em vez de 0,12).

### Rodada 3
Quadros: b24.4, b24.6, b25.5, b26.5 e b27.6, mais a tira b24.3–25.2 (`cap2-p06-r3.png`, `cap2-p06-r3-cel.png`, `cap2-p06-tira2.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 8 | 8 |

Problemas:
1. Entre o fim das ondas (b25.3) e a transformação (b28), a imagem só tem o empurrão da câmera. São 1,35 s, dentro da regra, mas é o trecho mais quieto do capítulo.
2. A 360 px, a mesa e o telefone viram detalhe miúdo. A cadeira e a janela ainda se leem.
3. O primeiro toque segue 0,1–0,15 s atrás do "ding", porque o interfone precisa estar desenhado. É aceitável: o "ding" cai junto com a transformação e o whoosh da batida 24, que já é o acerto visual.

Correções:
- os reflexos do vidro da porta deslizam 22 px durante o plano (paralaxe interna contra o empurrão);
- nada mais a mudar no desenho.

### Rodada 4
Quadros: b24.6, b25.5, b26.5 e b27.6, mais b25.5 com 4 subquadros (`cap2-p06-r4.png`, `cap2-final-sub4.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 8 | 8 |

Problemas residuais (abaixo do corte):
1. A guarita não tem placa. A legenda "Sem porteiro." faz o trabalho, e uma placa seria um terceiro texto no quadro.
2. O telefone ainda é pequeno a 360 px.
3. Nenhum outro.

## P07: o vizinho

### Rodada 1
Quadros: b28.6, b29.5, b30.5 e b31.6 (`cap2-p07-r1.png`, `cap2-p07-r1-cel.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 8 | 7 | 8 | 8 | 8 | 5 |

Problemas:
1. No b31.6, a barra de digitar da **próxima** conversa já aparece no campo do vizinho.
2. No b28.6, a barra de digitar corre na frente do contorno do campo, que ainda está se desenhando.
3. O vazio entre o cabeçalho e as bolhas logo depois do envio. Aceito: a conversa cresce de baixo, como num app.

Correções: a barra de digitar passou a viver só dentro da sua conversa e o campo entra mais cedo e mais rápido (0,4 s).

### Rodada 2
Quadros: b28.6, b29.5, b30.5 e b31.6, mais as tiras b27.9–28.8 e b28.9–29.6 (`cap2-p07-r2.png`, `cap2-p07-tira-b28.png`, `cap2-p07-tira-b29.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 8 | 8 | 8 | 6 |

Problemas:
1. **Bug de tempo:** como a conversa abre só uma batida antes do envio, a janela de digitação ficou invertida (o começo vinha depois do fim). A barra aparecia cheia em b28.3 e ia *encolhendo* até o clique.
2. No b29.0, a bolha enviada aparece por um instante como um retângulo preto vazio (o texto só subia 0,05 s depois).
3. A transformação do b28 é o ponto alto do plano: o conteúdo da portaria sai e, ao encolher, o contêiner revela a guarita esmaecida à esquerda. Está bom, sem correção.

Correções:
- a digitação vai de TB(de)+0,16 até TB(envio)−0,08, crescendo;
- o texto da bolha sobe junto com a bolha (sem o atraso de 0,05 s).

### Rodada 3
Quadros: b28.6, b29.1, b29.5, b30.5 e b31.6 (`cap2-p07-r3.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 7 |

Problemas:
1. No clique, a barra de digitar ainda some devagar (90% visível 0,04 s depois do toque).
2. O cursor fica parado no botão de b28.6 até b31.9. Aceito: é o polegar esperando a resposta, e a conversa muda em volta dele.
3. O texto da resposta em tinta 2 sobre bolha clara é o contraste mais baixo do capítulo. Ainda se lê a 360 px (`cap2-p07-r1-cel.png`).

Correções: a barra sai em 0,08 s, com a curva de saída rápida (`easeOut`).

### Rodada 4
Quadros: b28.6, b29.05, b29.5, b30.5 e b31.6, mais b28.15, b29.1 e b30.5 com 4 subquadros (`cap2-p07-r4.png`, `cap2-p07-r4-cel.png`, `cap2-final-sub4.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

Sem problema acima do corte. O desfoque de movimento da bolha crescendo (b29.1) é o natural dos 4 subquadros.

## P08: o amigo

### Rodada 1
Quadros: b32.6, b33.5, b34.5 e b35.6 (`cap2-p08-r1.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 8 | 8 | 8 | 6 |

Problemas:
1. A barra de digitar da conversa seguinte vaza no b35.6 (o mesmo bug do P07).
2. Os três pontinhos ficam pequenos demais a 360 px (bolha de 184 × 104, pontos de 9 px).
3. O vazio do b35 lê bem: os pontinhos somem e a bolha enviada volta a descer. Sem correção.

Correções: a barra só dentro da conversa; a bolha dos pontinhos passou para 220 × 116, com pontos de 12–15 px a cada 48 px.

### Rodada 2
Quadros: b32.6, b33.5, b34.5 e b35.6, mais a tira b31.7–32.5 (`cap2-p08-r2.png`, `cap2-p08-r2-cel.png`, `cap2-p08-tira-b32.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 8 | 8 | 8 | 6 |

Problemas:
1. No b32.0, a barra de digitar do Amigo aparece cheia (a mesma janela invertida do P07).
2. O cartão do Vizinho entra como uma faixa que varre da esquerda: parece barra de progresso.
3. A pausa entre o fim da rolagem (b31.74) e a entrada do cabeçalho novo (b32.17) é de ~0,4 s. Aceita: é a "virada de página" entre um favor e outro.

Correções: a digitação crescente (como no P07) e o cartão que infla de baixo para cima a partir da divisória do cabeçalho, como se o cabeçalho se recolhesse num cartão.

### Rodada 3
Quadros: b32.6, b33.5, b34.5, b35.3 e b35.6 (`cap2-p08-r3.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

Problemas:
1. A divisória do cabeçalho desce com mola enquanto o cartão infla, e os dois movimentos se somam. Está limpo na tira.
2. Os pontinhos saem com opacidade (0,16 s). É uma saída, então é permitido.
3. Nenhum outro.

### Rodada 4
Tira b31.9–32.8 (`cap2-p08-tira2.png`), mais b32.25 e b34.5 com 4 subquadros (`cap2-final-sub4.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

A conversão cabeçalho → cartão lê como empilhar, com a divisória inflando no cartão e o chevron recolhendo. Sem problema acima do corte.

## P09: a mãe

### Rodada 1
Quadros: b36.6, b37.5, b38.5 e b39.6 (`cap2-p09-r1.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 8 | 7 | 8 | 8 | 8 | 7 |

Problemas:
1. É o terceiro plano com a mesma gramática, e o gancho depende só do nome "Mãe" e da pilha de cartões crescendo.
2. O cabeçalho "Mãe" fica perto do cartão "Amigo".
3. O "Tô do outro lado da cidade." precisa caber numa linha para a conversa caber na área útil.

Correções:
- o contêiner do P09 é o mais alto (770 px, do y 140 ao 910), e a pilha de dois cartões já pesa visualmente: é a escalada do ato;
- a frase cabe numa linha porque o contêiner tem 1000 px (bolha de 854);
- o espaço entre o cartão e o cabeçalho (29 px até a altura das maiúsculas) ficou como está.

### Rodada 2
Quadros: b36.6, b37.5, b38.5 e b39.6 (`cap2-p09-r2.png`, `cap2-p09-r2-cel.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 8 | 7 |

Problemas:
1. A barra de digitar vaza de uma conversa para a outra (corrigido junto com o P07).
2. A resposta em tinta 2 tem contraste baixo, mas ainda se lê a 360 px.
3. O cursor sai no b39 para baixo, rumo à faixa. Está certo: libera o quadro para o P10.

### Rodada 3
Quadros: b36.6, b37.5, b38.5 e b39.6 (`cap2-p09-r3.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

### Rodada 4
Quadros: b36.2, b36.6, b37.5, b38.5 e b39.6, mais b38.5 com 4 subquadros (`cap2-p09-r4.png`, `cap2-final-sub4.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

O b36.2 confirma o cartão "Amigo" inflando e "Mãe" entrando. Sem problema acima do corte.

## P10: pesado demais

### Rodada 1
Quadros: b40.5, b41.5, b42.5, b43.5 e b43.9 (`cap2-p10-r1.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 7 | 7 | 5 | 6 | 8 | 6 |

Problemas:
1. As bolhas, alinhadas à direita e estreitas (330–660 px), enchem só um terço do contêiner: o "saco" não parece cheio.
2. O "ceder" é invisível: o fundo do contêiner some sob a faixa e o topo não se mexe.
3. A pilha certinha e alinhada parece uma lista, não um peso.

Correções:
- bolhas de 440–840 px espalhadas na largura do saco e entortando até ±1,4° conforme apertam;
- `c2_pesado` mais largo (1080) e mais redondo (r 84).

### Rodada 2
Quadros: b40.5, b41.5, b42.5, b43.5 e b43.9, mais as tiras b39.7–40.6, b42.0–42.75 e b43.25–43.98 (`cap2-p10-r2.png`, `cap2-p10-tira-b40.png`, `cap2-p10-tira-b42.png`, `cap2-p10-tira-b43.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 9 | 8 | 8 | 8 | 7 | 9 | 6 |

Problemas:
1. A divisória do cabeçalho "Mãe" fica atravessada nos cartões empurrados (b40.2), porque não descia com a enxurrada.
2. O afundamento de 50 px ainda é tímido.
3. O congelamento em b43.75 funciona (quadros b43.75, b43.85 e b43.98 idênticos fora a câmera na mão). Sem correção.

Correções:
- a divisória desce com a pilha e recolhe em 0,12 s;
- o topo do contêiner desce 80 px (de y 140 a 220) na mola de 0,9 Hz: o saco afunda e o fundo cede para baixo da faixa.

### Rodada 3
Quadros: b40.25, b40.5, b41.5, b42.5 e b43.9 (`cap2-p10-r3.png`, `cap2-p10-r3-cel.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 9 | 8 | 8 | 8 | 8 | 9 | 8 |

Problemas:
1. O cartão "Mãe" ainda entrava varrendo da esquerda (corrigido junto com o P08).
2. As barras cinza nas bolhas não dizem nada a 360 px, de propósito: o P10 é massa, não leitura ("sem frase nova").
3. A barra de digitar cai com o fundo do contêiner e passa por baixo dos cartões empurrados. Lê como peso caindo; fica assim.

### Rodada 4
Tira b39.95–41.5 (`cap2-p10-tira2.png`), mais b40.2, b42.4 e b43.9 com 4 subquadros (`cap2-final-sub4.png`).

| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 9 | 8 | 8 | 8 | 8 | 9 | 8 |

A primeira bolha cai na 40 exatamente com a transformação e o pop. A divisória não fica mais pendurada. Sem problema acima do corte.

## Resumo

### Notas finais

| Plano | Rodadas | gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|---|---|
| P06 | 4 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| P07 | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P08 | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P09 | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P10 | 4 | 9 | 8 | 8 | 8 | 8 | 9 | 8 |

### Quadros-chave para a folha do diretor

| Plano | Batida | Tempo | O que mostra |
|---|---|---|---|
| P06 | b25.5 | **12,77 s** | portaria inteira, o "dong" e "Sem porteiro." |
| P07 | b30.5 | **15,27 s** | as duas bolhas do vizinho |
| P08 | b34.5 | **17,27 s** | o cartão do vizinho, "Tá em casa hoje?" e os pontinhos |
| P09 | b38.5 | **19,27 s** | dois cartões e as duas bolhas da mãe |
| P10 | b42.5 | **21,27 s** | a pilha apertando no saco que cede |

A folha pronta está em `.render-tmp/09-diretor/cap2-chave.png` (e `-cel.png`).

### O que mudou na decupagem e por quê

- **Batidas mantidas:**
  - morphs 24, 28, 32, 36 e 40 (a 40 com mola de 0,9);
  - cliques 29, 33 e 37;
  - legenda b25–28;
  - todas as deixas;
  - os 11 pops da enxurrada saem da mesma lista de batidas que move as bolhas.
- **Estados:**
  - `c2_portaria`: igual.
  - `c2_chat1`:
    - antes: cx 1180, 920 × 520;
    - agora: cx 1240, 1000 × 650.
  - `c2_chat2`:
    - antes: cx 1180, 920 × 660;
    - agora: cx 1240, 1000 × 690.
  - `c2_chat3`:
    - antes: cx 1180, 920 × 780;
    - agora: cx 1240, 1000 × 770.
  - Por quê:
    - a 68 px, "Tô do outro lado da cidade." mede 782 px e precisa de bolha de 854, o que dá um contêiner de 1000 para caber numa linha;
    - as alturas saem da diagramação: cartão 96, cabeçalho 104, bolha de 1 linha 116 e de 2 linhas 196, campo 92, margens 24/32;
    - o chat3 fica entre y 140 e 910, dentro da área útil;
    - cx 1240 deixa a guarita esmaecida visível à esquerda e repete o lado das telas do "depois" (c3_endereco e c4_pagar).
  - `c2_pesado`:
    - antes: cy 600, 980 × 980, r 56;
    - agora: cx 1240, cy 725, 1080 × 1010, r 84.
    - Por quê: o topo **desce** de y 140 para 220 (o saco afunda) e o fundo passa da faixa até y 1230. Assim o "ceder" se vê; antes ele acontecia todo sob a faixa.
- **Cursor:**
  - os alvos saíram de (1575, 745 / 815 / 875) para (1678, 790 / 810 / 850);
  - cada um é o centro do botão de enviar, em (cx + w/2 − 78, cy + h/2 − 78), mais (16, 18): a ponta cai no quarto inferior direito do botão;
  - mola 2,4 nos três movimentos curtos;
  - a saída no b39 ficou igual.
- **Conteúdo do P06** com `atraso: 0.06` (em vez do padrão de 0,12), para o primeiro toque do interfone colar no "ding" da 24.
- **Camada de fundo nova** (b28–44): a guarita do P06 no mesmo lugar, em linha clara, com paralaxe (aproxima metade da câmera e anda 26 px). Na 44, o traço recolhe em 0,14 s.
- **Câmera:** igual (24 → z 1,03; 40 → z 1).

### Pedidos ao diretor

1. **Faixas apertando no P10.** A lista de planos pede "Faixas apertam um pouco" no P10, mas `faixas(t)` no motor só depende de `antes(t)`. Se quiser, uma lista opcional por capítulo resolveria, por exemplo `faixas: [[40, 1.08, 0.9], [44, 1]]` multiplicando as alturas. Não mexi.
2. **Passagem da pilha para o capítulo 3 na 44.**
   - O `cap2.js` exporta `F.favores`: a pilha do P10 como ficou no corte (b43.75), em coordenadas da cena, com `desenha(ctx, a, sai)`. `sai(i, n)` dá 0..1 por bolha, e cada uma sobe dentro da própria máscara e some, sem fade.
   - Se o capítulo 3 usar `F.favores`, ele deve pôr `F.favores.assumido = true` no carregamento. Com isso, o P10 para seco em TB(44), sem a saída padrão de 0,12 s, e não há imagem dupla.
   - Sem isso, o P10 sai com a saída padrão do motor.
   - Conferido numa página de teste: a pilha exportada bate com o quadro congelado e as de cima sobem pela máscara.
3. **Nada laranja no capítulo.** A guarita esmaecida é linha clara (`LINE`) e as barras dos pedidos são `MUTED`.
