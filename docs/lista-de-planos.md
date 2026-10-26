# Lista de planos: tutorial de primeiro acesso (VAI DE LOKAL)

**Formato:** vertical 1080×1920 (9:16), 60 fps, **60,0 s**.
**Tempo:** 120 BPM, batida de 0,5 s, **120 batidas** (30 compassos de 2 s), **3600 quadros**. Batida n = quadro 30n na grade teórica; o filme anima na grade **medida** pelo `beats.py`.
**Saída:** `resultados/tutorial-primeiro-acesso-vertical.mp4`. Filme em `filmes/11-tutorial-primeiro-acesso/`.
**Estilo:** [`guia-de-estilo.md`](guia-de-estilo.md). **TF** = tempo forte (batida múltipla de 4). **T** = o dedo toca. **A** = o dedo arrasta para cima.

Esta é a versão 2. A versão 1 passou por uma revisão adversária (quatro revisores e quatro verificadores), que confirmou 51 problemas. Os principais:
- a palavra-chave não cabia no quadro;
- o cartão de notificação desenhado inventava uma tela;
- havia mudanças sem o dedo;
- várias legendas não davam tempo de ler sem som.

Todos foram corrigidos aqui.

## Decisões que precisam de você (se não responder, sigo com o padrão)

| # | Decisão | Padrão |
|---|---|---|
| D1 | A tela **Início** ("Olá, Ana!") entra? Ela diz "Chegou em 21/10", e o detalhe diz "22/10/2026, 10:17". | **Não entra.** O roteiro vai do aviso direto ao detalhe, e as datas de exemplo não batem. |
| D2 | Da tela de lojas, o que entra? Ela tem os chips com nomes de lojas e o botão "Copiar em uma linha". | **Só a linha do endereço** ("Rua de Exemplo · Centro · Belo Horizonte/MG"). Os chips têm nomes de lojas (o briefing pede "qualquer loja online"). O "Copiar em uma linha" seria um segundo jeito de copiar, sem explicação, logo depois dos três toques campo a campo. |
| D3 | O cartão **"Agência escolhida"** entra? Ele mostra "Fechada" em vermelho. | **Não entra.** O conceito vai na legenda do P03. |
| D4 | O cartão **PKG-1031** do pé da tela "Retirada" aparece? O pagamento do filme é do PKG-1042. | **Não aparece.** O recorte para em "Mostre este código no balcão da agência". |
| D5 | O **aviso no WhatsApp**: não existe print da mensagem. | **Tipografia do filme, sem imitar tela:** o rótulo "Aviso no WhatsApp" e, embaixo, o texto exato entre aspas, num bloco laranja-claro. Sem ícone, sem remetente, sem desenho de notificação e sem o verde do WhatsApp. Se você mandar o print real da mensagem, ele entra no lugar. |
| D6 | O **teto da taxa** ("para de somar no 15º dia útil") não está no roteiro de batidas, mas está no que o vídeo ensina. | **Entra**, numa linha de 60 px no cartão da taxa: "Para de somar no 15º dia útil." |
| D7 | O **"Pix confirma"**: não existe print da tela do Pix. | A confirmação é a **pílula real "Pagamento confirmado"**, recortada da tela "Retirada", que depois vira o topo da própria tela. |
| D8 | Textos que **não estão escritos no roteiro**, montados com as suas frases do "O que o vídeo ensina". | **Entram assim:** "É o endereço da agência parceira que você escolheu." · "A agência recebe e registra com foto." · "Paga pelo app, via Pix." · "Para de somar no 15º dia útil." · e os rótulos "Aviso no WhatsApp" e "Palavra-chave da retirada". |
| D9 | A referência: o vídeo do X não foi baixado. | **`./refs/`**, como o briefing permite (a gramática medida no filme 05). |
| D10 | **Os tempos dos atos.** Para tudo caber legível sem som, os atos andam até 4 s em relação ao roteiro. Ficam assim: gancho 0–2,5 s; ato 1 2,5–15,5 s; ato 2 15,5–28 s; ato 3 28–42 s; ato 4 42–56 s; fim 56–60 s (no roteiro: 0–3, 3–14, 14–24, 24–40, 40–54, 54–60). | **60 s, com os tempos acima.** A outra saída é um filme de 64 s, que devolve ao fim os 6 s do roteiro e dá folga às legendas. |
| D11 | **Tempo de leitura.** A regra do estúdio pede que a legenda dê para ler duas vezes. Em 60 s isso não cabe. | **Toda legenda fica pelo menos uma leitura inteira** (3 palavras por segundo, nunca menos de 2 s; a coluna "Leitura" mostra a conta). Duas leituras só com o filme de 64 s. |
| D12 | **Mudanças sem toque.** O briefing pede que o dedo conduza cada mudança. | **O dedo conduz todas, menos três:** o aviso chega sozinho (b37), o Pix confirma depois do toque em "Pagar" (b74) e a pílula sobe (b80). São o app e a agência agindo, e na vida real ninguém toca para isso acontecer. |
| D13 | **A hierarquia do ato 4.** O roteiro pede a frase da taxa "menor" e todo valor grande. | O **"7 dias úteis pra buscar com calma."** sai em 132 px. Na frase da taxa, só o **R$ 0,84** fica em 132 px, e o resto em 60 px. |

## Os planos

As frases entre aspas e em negrito são o texto exato na tela. Os recortes estão medidos em `assets/telas/medidas.json` (px do print 1080×2000). A **zona do contêiner** vai de y 270 a 1170 e a **zona da legenda**, de 1230 a 1536 (guia §10).

| # | Plano | Tempo (s) | Batidas | Quadros | Imagem (o que se vê) | Câmera | Texto | Som |
|---|---|---|---|---|---|---|---|---|
| **P01** | **Gancho: a cartela e o pin** | 0,0–1,0 | 0–2 | 0–59 | O contêiner ocupa o quadro inteiro, em laranja `#EA6E1A`, com a **logo branca real** centralizada (760 px de largura, centro em y 600). O primeiro quadro já é esse, parado (é também o último). **b1:** o pin (o "O" de LOKAL, separado da logo real) se solta e cai cerca de 230 px, com mola, até o ponto onde vai estar o LOKAL12; as letras sobem e saem pela máscara. **b2:** a ponta do pin toca o ponto. | Parada | (nenhum) | Música entra no b0 com o motivo de sino. whoosh leve no b1 (o pin solta). thump no b2 (o pin toca). |
| **P02** | **A tela abre** | 1,0–2,5 | 2–5 | 60–149 | **b2:** um círculo branco cresce a partir da ponta do pin, por dentro da cartela (cortina radial de 0,4 s, até cobrir o quadro inteiro), e o pin afunda nele. A cor do contêiner troca escondida no b3, e ele vira a janela da tela (1000×840, y 300–1140, raio 44). Na janela, a tela real **"Seu endereço para compras"** a 0,84×: do título até o fim do cartão 3 (print y 352–1352), sem fatia do cartão 4. **b4 (TF):** um traço laranja de 6 px se desenha sob o **LOKAL12**. | Parada | (nenhum: o título é a própria interface) | whoosh no b2 (a tela abre); pop no b4 (o traço) com acento da trilha |
| **P03** | **O endereço** | 2,5–6,0 | 5–12 | 150–359 | A mesma tela. O dedo entra (b5,5) e chega parado ao "Copiar" do **CEP** (b7). **T b8 (TF):** o botão real afunda 4% e o anel laranja se desenha em volta dele. O dedo desce até o "Copiar" do **Número** (chega no b9,4). **T b10.** | Respiração de 1,00 a 1,02× | Pílula b5–b12: **"É o endereço da agência parceira que você escolheu."** | click no b8 e no b10 |
| **P04** | **Destinatário** | 6,0–8,5 | 12–17 | 360–509 | **A b11–b12**, saindo do botão do Número: a tela rola dentro da janela até mostrar os cartões 2 a 4, e a janela encolhe para 1000×640 (print y 839–1599: sem a fatia do cartão 1, sem a linha do endereço e sem a barra de navegação). O dedo chega ao "Copiar" do **Nome de quem recebe (Ana Souza)** (b13,3). **T b14.** | Parada | Pílula b12–b17: **"No destinatário, seu nome."** | whoosh leve no b12 (rolagem), click no b14 |
| **P05** | **Complemento e o ID** | 8,5–12,0 | 17–24 | 510–719 | O dedo sobe até o "Copiar" do **Complemento** (chega no b16). **T b17.** **b18:** o contêiner vira uma pílula branca com sombra (880×300, raio 150), com o **LOKAL12** em **DM Mono 500**, 170 px, laranja (714 px de largura), grande por 2,6 s. O dedo sai do quadro. | Respiração de 1,00 a 1,02× | Pílula b17–b24: **"No complemento, só o seu ID."** (em duas linhas: "No complemento," / "só o seu ID.") | click no b17, whoosh no b18, pop no b18,25 com acento da trilha |
| **P06** | **Qualquer loja online** | 12,0–15,5 | 24–31 | 720–929 | **A b23–b24** (o dedo entra no b21,5 e arrasta pela parte de baixo da pílula, sem passar sobre o LOKAL12). **b24 (TF):** o contêiner vira uma faixa (1000×240) com a linha real **"Rua de Exemplo · Centro · Belo Horizonte/MG"** a 1,28× (922 px). **b26:** um traço laranja de 6 px se desenha sob a linha. | Parada | Pílula b24–b31: **"Compre em qualquer loja online com esse endereço."** | whoosh no b24, pop leve no b26 |
| **P07** | **Chegou na agência** | 15,5–18,5 | 31–37 | 930–1109 | **A b30–b31.** O contêiner vira um cartão (1000×300) com a linha real da linha do tempo **"Chegou na agência, 22/10/2026, 10:17"**, com o check laranja (recorte `linha_chegou` a 1,6×). **b32 (TF):** o anel se desenha em volta do check. | Parada | Pílula b31–b37: **"A agência recebe e registra com foto."** | whoosh no b31, shutter no b32 (a foto) |
| **P08** | **O aviso no WhatsApp** | 18,5–23,5 | 37–47 | 1110–1409 | **b37:** o aviso chega sozinho (D12). O cartão cresce para 1000×520: em cima, o rótulo **"Aviso no WhatsApp"** (60 px, tinta 2); embaixo, num bloco laranja-claro, o texto em 60 px: **"Encomenda chegou, Ana!"** sobe no b37, e **"Sua encomenda está disponível para retirada."** sobe no b39. Sem legenda junto. O dedo entra no b43 e chega ao cartão no b46. **T b47.** | Parada | No cartão: **"Aviso no WhatsApp"** e **"Encomenda chegou, Ana! Sua encomenda está disponível para retirada."** | buzz e pop no b37 (o aviso), pop leve no b39, click no b47 |
| **P09** | **Detalhe da encomenda** | 23,5–28,0 | 47–56 | 1410–1679 | **b47:** no toque, o cartão vira a tela real **"Detalhe da encomenda"** a 0,84× (cabeçalho, **PKG-1042**, o selo **Aguardando** e a linha do tempo; print y 46–1051; contêiner 960×890). O destaque pula de elemento em elemento (a gramática da referência): **b48 (TF)** anel no selo "Aguardando"; **b50** anel em "Aguardando pagamento". **A b52–b53:** a tela real rola até o cartão do total (print y 1082–1422), e o contêiner encolhe em volta dele (920×330), sem o cartão da carteira. **b53:** anel no **R$ 5,90** do "Total a pagar". | Empurrão de 1,04× para o PKG-1042 no b48; volta a 1,00 no b52 | Pílula b47–b54: **"A gente recebe e te avisa. Você retira."** | whoosh no b47, pop leve no b48 e no b50, whoosh leve no b52, pop no b53 |
| **P10** | **R$ 5,90** | 28,0–30,5 | 56–61 | 1680–1829 | **A b55–b56.** **b56 (TF):** o R$ 5,90 do total cresce e vira o cartão de preço (1000×640, branco, no estilo do cartão de preço do site). O valor entra primeiro: **R$ 5,90** (240 px, laranja, sobre branco). Os rótulos entram depois (72 px): **"Pequeno, Médio ou Grande"** e **"até 60 cm e até 20 kg"**. O dedo arrasta só pela faixa de baixo do cartão, sem passar pelo valor. | Parada | No cartão: **"Pequeno, Médio ou Grande"**, **"até 60 cm e até 20 kg"**, **"R$ 5,90"**. Pílula b56–b71: **"Paga uma vez, na retirada, pelo tamanho."** | whoosh no b56, pop no b56,25, acento forte da trilha |
| **P11** | **R$ 9,90** | 30,5–33,0 | 61–66 | 1830–1979 | **A b60–b61.** **b61:** a linha velha sobe e sai pela boca da máscara; a nova sobe por baixo: **R$ 9,90**, "Extra Grande", "até 1 m e até 30 kg". | Parada | **"Extra Grande"**, **"até 1 m e até 30 kg"**, **"R$ 9,90"** (a pílula continua) | whoosh leve no b61, pop no b61,25 |
| **P12** | **R$ 19,90** | 33,0–35,5 | 66–71 | 1980–2129 | **A b65–b66.** **b66:** **R$ 19,90**, "Duplo Extra Grande", "até 2 m e até 50 kg". | Parada | **"Duplo Extra Grande"**, **"até 2 m e até 50 kg"**, **"R$ 19,90"** (a pílula continua) | whoosh leve no b66, pop no b66,25 |
| **P13** | **Pagar** | 35,5–37,0 | 71–74 | 2130–2219 | **A b70–b71**, terminando onde o botão vai estar. **b71:** o contêiner vira o **botão real "Pagar R$ 5,90 e gerar QR Code"** (recorte `botao_pagar`, 990×168, a 1,0×). **T b72 (TF):** o botão afunda e o anel se desenha. | Empurrão de 1,03× | Pílula b71–b76: **"Paga pelo app, via Pix."** | whoosh no b71, click no b72 |
| **P14** | **Pix confirmado** | 37,0–42,0 | 74–84 | 2220–2519 | **b74:** o botão vira a **pílula real "Pagamento confirmado"** (verde, recortada da tela "Retirada", a 1,4×: 885×148). O dedo sai. **b80 (TF):** a pílula sobe e encolhe até o tamanho e o lugar que ela tem no topo da tela "Retirada" (0,74×). | Parada | Pílula b76–b83: **"Com saldo na carteira, ela se paga sozinha."** | whoosh e pop no b74, com acorde claro da trilha; whoosh leve no b80 |
| **P15** | **Retirada e QR Code** | 42,0–44,0 | 84–88 | 2520–2639 | **A b83–b84** (o dedo puxa a tela para baixo a partir da pílula). **b84 (TF):** a tela real **"Retirada"** cresce para baixo a partir da pílula: "Pagamento confirmado" e o cartão do **QR Code**, a 0,74× (print y 196–1350; contêiner 840×890). **b85:** anel em volta do QR. **A b86–b87:** a tela rola até a caixa do código e a linha "Mostre este código no balcão da agência". | Parada (sem empurrão: a tela já ocupa a zona) | Pílula b84–b94: **"Mostre este código no balcão da agência."** (fica do QR até a palavra-chave) | whoosh no b84, pop no b85, whoosh leve no b87 |
| **P16** | **A palavra-chave** | 44,0–47,0 | 88–94 | 2640–2819 | **T b88 (TF)** na caixa do código (não no "Copiar": retirar não pede copiar nada). O anel abre em volta da caixa. **b89:** a caixa sobe e vira uma pílula larga (940×300, raio 60): em cima, o rótulo **"Palavra-chave da retirada"** (72 px, tinta 2); embaixo, **CAIXA.482913** em **DM Mono 500**, 110 px, tinta (792 px de largura). Grande por 2,1 s. | Parada | No cartão: **"Palavra-chave da retirada"**, **"CAIXA.482913"** (a pílula da legenda continua) | click no b88, whoosh e pop no b89 |
| **P17** | **7 dias úteis** | 47,0–50,0 | 94–100 | 2820–2999 | **A b93–b94**, pela faixa de baixo. **b94:** o contêiner vira um cartão (1000×620) com a frase em 132 px, em três linhas: **"7 dias úteis"** (laranja) / **"pra buscar"** / **"com calma."** (tinta). | Respiração de 1,00 a 1,02× | No cartão: **"7 dias úteis pra buscar com calma."** | whoosh no b94, pop no b94,25 |
| **P18** | **A taxa de guarda** | 50,0–56,0 | 100–112 | 3000–3359 | **A b99–b100.** **b100:** o cartão cresce (1000×740): **"Do 8º dia útil em diante:"** / **"taxa de guarda de"** (60 px, tinta 2) / **R$ 0,84** (132 px, laranja) / **"por dia no tamanho de R$ 5,90."** (60 px). **b106:** entra a linha **"Para de somar no 15º dia útil."** (60 px, tinta), separada por um fio. | Respiração de 1,00 a 1,02× do b104 ao b111 | No cartão: **"Do 8º dia útil em diante: taxa de guarda de R$ 0,84 por dia no tamanho de R$ 5,90."** e **"Para de somar no 15º dia útil."** | whoosh no b100, pop no b100,25, pop leve no b106 |
| **P19** | **Assinatura** | 56,0–58,0 | 112–116 | 3360–3479 | **A b111–b112.** **b112 (TF):** a cortina laranja sobe por dentro do contêiner (0,3 s, cobrindo a caixa inteira), e o contêiner cresce até o quadro inteiro; a cor troca escondida no b112,75. **b112,5:** o pin cai de fora do quadro, ainda vazio, e assenta no lugar do "O" no **b113**, com mola, sem quicar. **b113:** a logo se abre a partir do pin (uma máscara que se alarga para os dois lados; as letras não se mexem, na mesma posição do P01), e a frase sobe embaixo da logo (y ≈ 1000). | Parada | **"Compre onde quiser."** / **"A gente recebe pra você."** (branco, 80 px) | thump no b112 (a cartela), pop no b113 (o pin assenta e a logo se abre), acorde quente |
| **P20** | **A volta (loop)** | 58,0–60,0 | 116–120 | 3480–3599 | A frase fica até o **b119** e sai subindo pela máscara (some em 59,5 s). Fica a cartela com a logo, idêntica ao quadro 0. O último quadro prepara o primeiro: no b1 da volta seguinte o pin cai de novo. | Parada | (a frase sai) | Anacruse da trilha nos b118–b119, que puxa o b0 |

## As legendas e textos (uma leitura inteira, no mínimo)

A conta: pílula = (ate − de) × 0,5 − 0,34 s (entra 0,08 s depois da batida e sai 0,26 s antes); texto dentro do contêiner = (ate − de) × 0,5 − 0,38 s. A meta é palavras ÷ 3, nunca menos de 2,0 s (D11). Nunca há duas pílulas ao mesmo tempo, e o texto do aviso fica sem pílula.

| Texto | Batidas | Na tela | Palavras | Uma leitura |
|---|---|---|---|---|
| "É o endereço da agência parceira que você escolheu." | b5–b12 | 3,16 s | 9 | 3,0 s |
| "No destinatário, seu nome." | b12–b17 | 2,16 s | 4 | 2,0 s |
| "No complemento, só o seu ID." | b17–b24 | 3,16 s | 6 | 2,0 s |
| "Compre em qualquer loja online com esse endereço." | b24–b31 | 3,16 s | 8 | 2,7 s |
| "A agência recebe e registra com foto." | b31–b37 | 2,66 s | 7 | 2,3 s |
| "Aviso no WhatsApp" + o texto do aviso (no cartão) | b37–b47 | 4,62 s (a segunda frase, 3,62 s) | 12 | 4,0 s |
| "A gente recebe e te avisa. Você retira." | b47–b54 | 3,16 s | 8 | 2,7 s |
| "Paga uma vez, na retirada, pelo tamanho." | b56–b71 | 7,16 s | 7 | 2,3 s |
| Cada linha de preço (valor + tamanho, no cartão) | 5 batidas | 2,12 s | 6 a 9 | o valor: 2,0 s |
| "Paga pelo app, via Pix." | b71–b76 | 2,16 s | 5 | 2,0 s |
| "Com saldo na carteira, ela se paga sozinha." | b76–b83 | 3,16 s | 8 | 2,7 s |
| "Mostre este código no balcão da agência." | b84–b94 | 4,66 s | 7 | 2,3 s |
| "Palavra-chave da retirada" + CAIXA.482913 (no cartão) | b89–b94 | 2,12 s | 4 | 2,0 s |
| "7 dias úteis pra buscar com calma." (no cartão) | b94–b100 | 2,62 s | 7 | 2,3 s |
| A frase da taxa (no cartão) | b100–b112 | 5,62 s | 17 | 5,7 s |
| "Para de somar no 15º dia útil." (no cartão) | b106–b112 | 2,62 s | 6 | 2,0 s |
| "Compre onde quiser. A gente recebe pra você." | b113–b119 | 2,66 s | 8 | 2,7 s |

As linhas das pílulas vão já quebradas, para nenhuma palavra-chave ficar sozinha ou partida ("QR Code", "ID", "WhatsApp").

## Os valores (cada um grande e sozinho por pelo menos 2 s)

| Valor | Onde fica grande e sozinho | Tempo legível |
|---|---|---|
| R$ 5,90 | P10 (b56–b61) | 2,12 s |
| R$ 9,90 | P11 (b61–b66) | 2,12 s |
| R$ 19,90 | P12 (b66–b71) | 2,12 s |
| R$ 0,84 | P18 (b100–b112) | 5,62 s (o "R$ 5,90" da mesma frase fica em 60 px) |
| 7 dias úteis | P17 (b94–b100) | 2,62 s |
| LOKAL12 (ID) | P05 (b18–b24) | 2,62 s |
| CAIXA.482913 (palavra-chave) | P16 (b89–b94) | 2,12 s |

Onde o R$ 5,90 aparece de passagem, antes do momento dele: no "Total a pagar" (P09, 1,5 s, o mesmo valor que cresce e vira o P10) e no botão "Pagar R$ 5,90 e gerar QR Code" (P13).

## Recompensas visuais (algo novo a cada 2 a 4 s; o briefing pede no máximo 5 s)

0,5 o pin cai · 1,0 a tela abre de dentro do pin · 2,0 traço sob o LOKAL12 · 2,75 o dedo entra · 4,0 toque no CEP · 5,0 toque no Número · 5,5 arrasto e a tela rola · 7,0 toque no Nome · 8,5 toque no Complemento · 9,0 a pílula do LOKAL12 · 11,5 arrasto · 12,0 a faixa do endereço · 13,0 traço sob o endereço · 15,0 arrasto · 15,5 "Chegou na agência" · 16,0 anel e obturador · 18,5 o aviso chega · 19,5 a segunda frase do aviso · 21,5 o dedo entra · 23,5 toque e o detalhe abre · 24,0 anel no "Aguardando" · 25,0 anel no "Aguardando pagamento" · 26,0 a tela rola até o total · 26,5 anel no R$ 5,90 · 28,0 R$ 5,90 grande · 30,0 arrasto · 30,5 R$ 9,90 · 32,5 arrasto · 33,0 R$ 19,90 · 35,0 arrasto · 35,5 o botão · 36,0 toque · 37,0 Pagamento confirmado · 38,0 a legenda do saldo · 40,0 a pílula sobe · 41,5 arrasto · 42,0 a tela Retirada · 42,5 anel no QR · 43,0 arrasto e rolagem · 44,0 toque no código · 44,5 a palavra-chave · 46,5 arrasto · 47,0 7 dias úteis · 49,5 arrasto · 50,0 a taxa · 52,0 respiração · 53,0 o teto da taxa · 55,5 arrasto · 56,0 a cortina laranja · 56,25 o pin cai · 56,5 a logo se abre e a frase sobe · 59,5 a frase sai · (0,5 da volta seguinte) o pin cai.

Maior intervalo sem novidade: 3,0 s (9,0–11,5 é de 2,5 s; 56,5–59,5 é de 3,0 s).

## Capítulos (um subagente por capítulo)

| Capítulo | Planos | Batidas | Tempo |
|---|---|---|---|
| 1. Gancho e endereço | P01–P06 | 0–31 | 0–15,5 s |
| 2. Chegou e o aviso | P07–P09 | 31–56 | 15,5–28 s |
| 3. O preço e o Pix | P10–P14 | 56–84 | 28–42 s |
| 4. Retirada e fim | P15–P20 | 84–120 | 42–60 s |

O capítulo 4 fecha o loop com o desenho de abertura que o capítulo 1 exporta (`F.abertura`). Cada capítulo recebe o contêiner do anterior na batida de troca.

## Entregas

- `resultados/tutorial-primeiro-acesso-vertical.mp4`
- `out/teste-de-loop.mp4` (duas voltas emendadas)
- `out/poster.png`
- `out/folha-de-contato.png`
- `README.md`
- `docs/guia-de-estilo.md`, `docs/lista-de-planos.md`, `docs/GUIA-DE-ANIMACAO.md`, `docs/registro-de-critica.md`, `docs/critica/cap1.md` … `cap4.md`

Os documentos e as saídas do filme 09 foram para `docs/09-diretor/` e `out/09-diretor/`, para estes não sobrescreverem aqueles.

## Ajustes de execução (o filme pronto em relação a esta lista)

Os textos, os valores, as decisões D1 a D13 e as passagens entre capítulos (b31, b56 e b84) ficaram como aprovados. O que mudou na animação, pelas rodadas de crítica (detalhes em `docs/critica/capN.md`):

- **P01–P02:**
  - a logo fica centrada em y 700, e o pin cai ~210 px até o LOKAL12, onde vira o pin laranja real;
  - o círculo branco cresce numa curva em seno de 0,5 s, até 1450 px;
  - a janela da tela tem 972 px de largura.
- **P03–P04:**
  - o dedo sai do quadro entre toques separados por mais de 2 batidas e desliza entre os mais próximos;
  - os anéis duram de 0,5 a 0,8 s, um destaque por vez.
- **P05:** a pílula do ID tem 980×320, e o arrasto acontece dentro dela, longe do LOKAL12.
- **P06:** a faixa tem 980×320, com centro em y 780. O endereço é texto nosso em 72 px, com o traço na largura da segunda linha.
- **P07:** a legenda quebra em "A agência recebe / e registra com foto."; a câmera empurra até 1,06 para o check no b32.
- **P08:**
  - o cartão do aviso fica centrado na área segura, com o texto em 72 px;
  - o dedo entra devagar por baixo, e a câmera respira até 1,02.
- **P09:**
  - a tela fica a 0,82× num contêiner de 960×860, com empurrão de 1,04;
  - o anel do R$ 5,90 entra no b54;
  - o contêiner do total tem a forma do cartão do print, sem sombra.
- **P10–P12:**
  - o cartão sobe 10 px com cada arrasto;
  - os valores entram e saem com desfoque liso;
  - a câmera faz degraus de 1,00, 1,02 e 1,04 nos três preços;
  - os pops têm ganho 1, 0,8 e 1.
- **P13:** o botão fica sozinho, com empurrão de 1,04; o cartão real "Total a pagar" aparece acima dele.
- **P14:**
  - o cartão real da carteira ("Saldo suficiente") entra só no b76, com a legenda que o explica, e a câmera vai até 1,08;
  - no b80 o cartão desce para o meio do quadro enquanto a pílula sobe, e sai no b83,5.
- **P15–P16:**
  - a tela "Retirada" abre com mola de 1,5 Hz;
  - o código grande nasce do CAIXA.482913 da caixa real e fica sozinho por pelo menos 2,0 s.
- **P17–P18:**
  - os cartões ficam centrados em y 883;
  - a frase da taxa vai em tinta 2, só com o R$ 0,84 em laranja;
  - o teto entra com o cartão crescendo no b106.
- **P19:** a cortina laranja começa exatamente no b112 e cobre o quadro inteiro; o pin cai a partir de TB(112) + 0,18 s.
- **Motor:**
  - 8 subquadros de desfoque;
  - a máscara do texto vai a 0,42 do corpo;
  - a pílula da legenda abre e fecha por recorte, sem fade.
- **Trilha:** os acentos crescem nas linhas de preço.
