# Registro de crítica: tutorial de primeiro acesso (filme 11)

Este arquivo junta as passadas do diretor. O registro plano a plano de cada animador está em `docs/critica/cap1.md` … `cap4.md`.

Os critérios, todos de 1 a 10:
- gancho;
- leitura a 360 px de largura;
- movimento;
- composição;
- profundidade;
- sincronia do som;
- acabamento;
- se todo valor dá para ler.

A meta é 8 ou mais em tudo.

## Revisão da lista de planos (antes de qualquer código)

A versão 1 da lista passou por uma revisão adversária: quatro revisores independentes (fidelidade ao briefing, interface real e marca, contas de tempo, quem assiste sem som num celular) e um verificador para cada um. Foram 51 achados confirmados e 7 derrubados.

Os mais graves, corrigidos na versão 2:
1. **A palavra-chave CAIXA.482913 não cabia:** a 150 px em DM Mono, ela mede 1080 px. Agora vai a 110 px (792 px).
2. **O cartão de notificação desenhado inventava uma tela:** agora o aviso é tipografia do filme (decisão D5).
3. **Mudanças sem o dedo:** agora há um arrasto antes de toda troca sem botão, com três exceções registradas na decisão D12.
4. **Legendas sem tempo de leitura:** cinco delas não davam nem uma leitura. Agora cada uma tem pelo menos uma leitura inteira (decisões D10 e D11).
5. **Três tamanhos de texto no quadro do ID:** o rótulo "Complemento" saiu.

A usuária aprovou a versão 2 com os padrões das decisões.

## D0: quadros parados (um por plano)

Materiais: `out/critica/paradas/folha-paradas.png` (21 quadros) e `folha-paradas-360.png` (o mesmo, num celular de 360 px).

**Olhar do diretor, antes do crítico:**
1. **P19 (56,7 s):** o pin caía por cima do "VAI" e se misturava às letras (branco sobre branco). Agora o pin cai primeiro, num quadro vazio, e a logo se abre a partir dele, com uma máscara que se alarga para os dois lados.
2. **P02 (1,8 s):** a borda de baixo da janela mostrava uma fatia do cartão 4. A tela passou a 0,84×, numa janela de 840 que vai do título ao fim do cartão 3. No P04 a janela encolhe para 640 e mostra só os cartões 2 a 4.
3. **Loop:** o quadro de 60 s tinha 236 pixels diferentes do de 0 s, porque a respiração de câmera de 0,25 Hz do P18 não assentava antes do fim. Com 0,4 Hz, 0 pixels diferentes. A regra foi para o guia de animação (regra 8).

**Crítica independente (um subagente que não escreveu o código):**

| Plano | Comp. | Leitura 360 | Prof. | Acab. | Marca | Valores |
|---|---|---|---|---|---|---|
| P01 | 6 | 9 | 4 | 8 | 9 | n/a |
| P02 | 6 | 6 | 6 | 6 | 9 | 6 |
| P03 | 7 | 6 | 7 | 5 | 8 | 6 |
| P04 | 7 | 6 | 7 | 5 | 8 | 6 |
| P05 | 8 | 9 | 7 | 8 | 8 | 9 |
| P06 | 5 | 5 | 5 | 6 | 8 | 5 |
| P07 | 7 | 8 | 6 | 7 | 8 | 8 |
| P08 | 5 | 7 | 6 | 6 | 7 | n/a |
| P09 | 6 | 6 | 7 | 4 | 8 | 7 |
| P10–P12 | 7 | 9 | 6 | 6 | 8 | 9 |
| P13 | 4 | 7 | 5 | 4 | 6 | 7 |
| P14 | 6 | 8 | 6 | 7 | 7 | n/a |
| P15 | 7 | 7 | 7 | 7 | 8 | n/a |
| P16 | 7 | 8 | 6 | 7 | 8 | 8 |
| P17 | 6 | 9 | 6 | 6 | 8 | 9 |
| P18 | 6 | 7 | 6 | 7 | 8 | 8 |
| P19 | 7 | 8 | 4 | 8 | 9 | n/a |
| P20 | 6 | 9 | 4 | 9 | 9 | n/a |

**Os 6 maiores problemas, segundo o crítico:**
1. O dedo fica parado e sem borda (P09–P12, P15, P17): estacionado entre o valor e a legenda, e com a borda branca invisível sobre o branco.
2. Destaques laranja colidem no ato 1: o traço sob o LOKAL12 quase encosta em "Sem ele" e fica junto com o anel do toque. Além disso, o dedo cobre o "r" de "Copiar".
3. P09: dois anéis ao mesmo tempo, os botões do cabeçalho rentes à borda e um contêiner de 907 px.
4. Os cartões sem legenda ficam pesados em cima, com o texto pequeno (P08, P17, P18), e há três bordas esquerdas diferentes.
5. P06: o endereço tem maiúscula de 11 px no celular, e o traço laranja pesa mais que ele.
6. P14: a legenda fala de carteira, mas não há carteira na tela.

**Corrigido pelo diretor (vale para todos os capítulos):**
- **Dedo:** ganhou um traço fino de tinta por fora da borda branca. A regra nova: sai do quadro depois de cada gesto e chega de meia a uma batida antes do próximo; mira no canto de baixo à direita do botão; arrasta por dentro do cartão.
- **Legenda:** o texto passou para x 116, o mesmo eixo dos cartões (a caixa começa em 72).
- **Cartelas:** a logo desceu para o centro (y 700) e a frase foi para y 1020 e 1112. O grupo fica centrado na área segura.
- **LOKAL12:** o traço passou para 4 px, só na largura da palavra e 7 px abaixo das maiúsculas, e recolhe no b7, antes do primeiro toque.
- **P06:** o recorte real fica uma batida e vira a mesma linha em texto nosso, 72 px, em duas linhas.
- **P13:**
  - o contêiner tem a forma exata do botão real (988×166, raio 41), sem sombra;
  - o anel do toque passou para a camada da frente: antes o próprio contêiner o recortava, e ele não aparecia;
  - a pílula "Pagamento confirmado" também ficou sem sombra.
- **Contêineres do capítulo 1:** 980 px de largura, para não passarem da borda com a respiração.
- **Regras novas no guia de animação:**
  - plano sem legenda centra o cartão em y 883;
  - um destaque laranja por vez;
  - uma borda esquerda só;
  - elemento real do tamanho do contêiner não ganha sombra.

**Para os animadores (rodada 0 de cada capítulo):** os itens 3, 4 e 6 e o resto da tabela (veja `docs/critica/capN.md`).

## Animático (540×960, música e efeitos provisórios)

Arquivo: `.render-tmp/11-animatico-r0.mp4`. Materiais: `out/critica/animatico-r0/` (folha a 2 quadros por segundo, tira de 12 quadros, teste a 360 px, `movimento.txt`).

- **Som:** as 50 deixas caem todas num acerto medido da trilha, a menos de 12 ms. A mixagem fica em -14,05 LUFS, com pico de -1,47 dBTP.
- **Ação mais rápida:** de 43,52 a 43,70 s (a tela "Retirada" rolando até a caixa do código).
- **Trechos parados de mais de 2 s:** eram dois.
  - De 16,1 a 18,3 s, o cartão "Chegou na agência" ficava parado depois do anel. Agora um traço sublinha a data e a hora do registro no b34, e a câmera respira de 1,00 a 1,03×.
  - De 57,0 a 59,3 s, a cartela final ficava parada com a frase. Agora a segunda linha da frase entra uma batida depois (b114).
- **Ritmo:**
  - cada preço fica cerca de 2,5 s;
  - as trocas caem nas batidas;
  - a passagem pílula → tela "Retirada" (40 a 42 s) fica com a pílula pequena no topo por 2 s, mas o dedo entra no meio desse tempo.

## Os capítulos (subagentes)

Cada capítulo passou por:
1. um animador, com no mínimo 3 rodadas registradas em `docs/critica/capN.md`;
2. um crítico independente, que não escreveu o código;
3. um corretor;
4. uma segunda crítica independente;
5. uma rodada final de acabamento, com a lista do diretor tirada das segundas críticas.

| Capítulo | Rodadas do animador | 1ª crítica: notas abaixo de 8 | 2ª crítica: notas abaixo de 8 | Acabamento final |
|---|---|---|---|---|
| 1. Gancho e endereço | 4 (+2 do corretor) | 18 (a pior: 6) | 8 (todas 7, quase todas em acabamento) | 6 itens feitos; todas as notas 8 ou mais |
| 2. Chegou e o aviso | 5 (+1) | 14 (a pior: 6) | 7 (todas 7) | 10 itens feitos |
| 3. O preço e o Pix | 5 (+2) | 18 (a pior: 5) | 10 (a pior: 6, no P14) | 7 itens, terminados por um segundo agente |
| 4. Retirada e fim | 7 (+2) | 8 (a pior: 6) | 5 (todas 7) | 9 itens feitos |

**Mudanças do diretor no motor, pedidas pelos animadores:**
- 8 subquadros de desfoque;
- a boca da máscara do texto a 0,42 do corpo (não corta mais a vírgula e o "$");
- a pílula da legenda abre e fecha por recorte, de baixo para cima, sem opacidade, com o texto recortado pela caixa e a caixa velha fechando 0,04 s antes de a nova abrir.

**Na trilha:** os acentos das linhas de preço crescem (b61 a 1,25× e b66 a 1,5×), para o som acompanhar o preço que sobe. A grade medida não mudou (0,00 ms).

**Verificadores:** a verificação independente da rodada final foi cancelada a pedido da usuária, para economizar. Cada corretor conferiu os seus itens em quadros renderizados, e a conferência final ficou com o diretor (abaixo).

## Conferência final do diretor (render final)

- **Arquivo:** `resultados/tutorial-primeiro-acesso-vertical.mp4`, com H.264 yuv420p, 1080×1920, 60 fps, BT.709, CRF 16, 60,0 s e 9,4 MB.
- **Som:** -14,0 LUFS integrado, pico de -1,4 dBFS. As 52 deixas (21 whoosh, 20 pop, 7 click, 2 thump, 1 shutter, 1 buzz) caem todas num acerto medido da trilha, a menos de 12 ms.
- **Loop:** o quadro de 60 s é idêntico ao de 0 s (0 pixels diferentes). Em `out/teste-de-loop.mp4` (120,0 s), os quadros dos dois lados da emenda são iguais.
- **Folha de contato** (`out/folha-de-contato.png`, um quadro por batida): os 20 planos na ordem da lista, sem quadro quebrado.
- **Pôster** (`out/poster.png`): 29,0 s, o R$ 5,90 grande com o tamanho do pacote e a legenda "Paga uma vez, na retirada, pelo tamanho.".

**O que eu melhoraria em seguida:**
1. A tela "Início" (decisão D1) e o print real da mensagem no WhatsApp (decisão D5), se a marca mandar uma conta de exemplo com as datas batendo.
2. Os dois pontos mais fracos que o animador do cap. 3 deixou registrados: 7 quadros só com o dedo e a legenda em 35,5 s, e o quadro inteiro desfocado entre 40,05 e 40,15 s, quando câmera, cartão e pílula andam juntos.
3. A ordem dos toques no ato 1 (CEP, Número, Nome, Complemento) segue as legendas do roteiro, mas a tela diz "Copie na ordem em que a loja pede.". Uma versão que toque na ordem da tela (1, 2, 3, 4) trocaria a ordem das duas legendas.
