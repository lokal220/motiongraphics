# Lista de planos: lançamento da VAI DE LOKAL (15 s, 16:9)

**Formato:** 1920×1080, 30 fps, 15,0 s. Saída prevista: `resultados/05-lancamento.mp4`.
**Estilo:** a gramática de [`guia-de-estilo.md`](guia-de-estilo.md). Usamos só a gramática da referência: nada do conteúdo, dos logos ou dos personagens dela.
**A ideia que fica:** nunca mais perder encomenda por não estar em casa.

**Tempo:** 96 BPM, ou seja, batida de 0,625 s e colcheia de 0,3125 s. São 24 batidas, exatamente **6 compassos de 2,5 s**. Na referência quem dita o tempo é a voz. Aqui não há narração falada, então a legenda anda **uma palavra (ou par de palavras) por colcheia**, na grade, como manda o CLAUDE.md.

---

## Material real (todo em `./assets`; nada é redesenhado)

| Arquivo | O que é | Onde entra |
|---|---|---|
| `logo-lokal.png` (320×154) | Logo "VAI de LOKAL", laranja, fundo transparente | P6. Largura máxima de 640 px (2×), sem distorcer, contornar, sombrear nem brilhar. Entra por máscara. |
| `icon.svg` | Símbolo: o pin | Só a geometria do pin, no movimento de queda que encaixa no "O" (P5→P6) |
| `capturas/app-encomenda.png` | Moldura real com a tela "Detalhe da encomenda" | P3 |
| `capturas/app-retirada.png` | Moldura real com a tela "Retirada" (QR + "Pagamento confirmado") | P4 |
| `capturas/vs-lokal.png` | Cartão real "COM A LOKAL", com as linhas "Aviso no WhatsApp quando chega", "7 dias úteis pra buscar com calma" e "Retirada protegida por QR Code" | P4 |
| **a capturar depois do OK:** `capturas/preco.png` | Cartão real de preço da seção `#precos` do site ("R$ 5,90 · Pacote pequeno, médio ou grande") | P4. Mesmo método Playwright, 3×. |
| `fonts/DMSans…`, `fonts/DMMono…` | Fontes do site | Todo o texto |

Conferi há pouco: logo, símbolo e as três telas do app no site têm o mesmo tamanho em bytes das cópias locais.

**Nota fixa:** as telas usam dados de exemplo. A frase real do site "Telas do aplicativo com dados de exemplo." aparece pequena em P3–P4.

## Os planos

| # | Tempo | Batidas | Imagem | Texto (real, sem reescrever) | Câmera | Saída | Som |
|---|---|---|---|---|---|---|---|
| **P1** | 0,00–4,69 | 1–8½ | **Ato 1, em tom de cinema.** Faixas de tinta em cima e embaixo (2,3:1). No meio, sobre branco quente, uma **ilustração de traço** da marca (traço proporcional a 2 px, pontas arredondadas, tinta com destaque laranja): uma porta fechada e uma caixa no capacho. Nada de foto ou cena inventada. Do primeiro ao último quadro, uma só tomada. | Legenda na faixa de baixo, DM Sans 400, branca, centralizada, uma palavra por colcheia: **"Sua compra chegou. Você não estava."** (0,00–1,88). A frase sai por foco e a seguinte já entra: **"E agora é torcer pelo vizinho, pelo porteiro ou pela terceira tentativa."** (2,50–4,69, aos pares de palavras). | **Dolly-in lento e contínuo** de 1,00× a 1,35×, com leve subida em direção à etiqueta da caixa. Paralaxe: a porta anda menos que a caixa. | Continua em P2, sem corte | Pad suave e grave. "Ding" e "dong" de campainha em 0,00 e 0,625. Silêncio seco em "Você não estava." Um tique de relógio por colcheia em "E agora é torcer…". |
| **P2** | 4,69–5,00 | 8½–9 (meia batida) | **Empurrão para dentro da etiqueta.** A etiqueta branca da caixa cresce até ocupar o quadro, e as faixas de tinta recolhem para fora. É a transição-assinatura da referência: a cena seguinte nasce de dentro de uma superfície. | (nenhum) | O dolly acelera (in-cúbico) até a etiqueta preencher tudo | O branco da etiqueta vira o fundo branco de P3 | Whoosh terminando em 5,00 (batida 9), mais um "sopro" grave |
| **P3** | 5,00–7,50 | 9–12 | **Ato 2, estúdio branco.** A moldura real `app-encomenda` sobe do pé do quadro com a mola da marca e para à direita do centro, com a sombra macia do site. Anel laranja de traço (sem brilho) em volta da linha real **"Chegou na agência"**. | Pílula de tinta embaixo, texto DM Sans 500 branco, alinhado à esquerda, uma palavra por colcheia: **"Compre onde quiser. A gente recebe pra você."** Nota pequena: "Telas do aplicativo com dados de exemplo." | **Respiração:** 1,00× → 1,06× ao longo da frase | Pan contínuo para a esquerda, em direção a P4 | Bumbo macio e chocalho começam em 5,00. Tique de interface quando o anel aparece (6,25). |
| **P4** | 7,50–10,00 | 13–16 | **A lista, como na referência:** o destaque pula de peça real em peça real, uma por batida, e a câmera vai atrás. Fileira horizontal: cartão real **"COM A LOKAL"** → moldura real **app-retirada** → cartão real **de preço**. Batida 13: anel na linha "Aviso no WhatsApp quando chega". 14: na linha "7 dias úteis pra buscar com calma". 15: no **QR Code** da tela de retirada. 16: no **"R$ 5,90"** do cartão de preço. | A pílula troca o texto a cada batida: **"Aviso no WhatsApp quando chega"** · **"7 dias úteis pra buscar com calma"** · **"Retirada protegida por QR Code"** · **"R$ 5,90 na maioria dos pacotes"** ("R$ 5,90" em laranja) | Pan que segue o anel, com micro-respiração (±3%) a cada batida | **Corte seco** para P5 em 10,00 | Clique de interface em cada pulo do anel (batidas 13–16), whoosh curto no pan, notas ascendentes |
| **P5** | 10,00–11,25 | 17–18 | **Pausa.** Cartão chapado em tinta `#2A1F18`, o único respiro do filme. | **"Chega de perder encomendas."** DM Sans 800, 96 px, branco, centralizado, uma palavra por colcheia, entrando por **foco** (desfoque → nítido) com subida curta na máscara. Fica parado depois. | Parada | Na última colcheia, o pin laranja já começa a cair do alto (pré-rolagem de P6). Corte seco em 11,25. | Quase silêncio: só um grave longo em 10,00 e o assobio de queda do pin |
| **P6** | 11,25–15,00 | 19–24 | **Assinatura sobre branco chapado.** O pin encaixa no "O" do **logo real** em 11,56 e o logo se revela por máscara a partir dele. O conjunto (logo + frase) fica no **terço esquerdo**. À direita, **a lista rola de baixo para cima**, como na referência, com as bordas esmaecendo: os quatro benefícios em DM Sans 700. Em 14,38, a lista termina e entra o endereço. | Sob o logo, palavra por palavra (DM Sans 500, tinta 2): **"A gente recebe e te avisa. Você retira."** Lista: os 4 textos de P4. Endereço: **vaidelokal.com.br** (DM Sans 700, laranja escuro). | Parada. Só os blocos e a lista se movem. | Fim em 15,00, segurando o quadro final por cerca de 0,6 s | "Pop" do pin em 11,56. A campainha volta resolvida (as mesmas duas notas, agora subindo). Acorde final. Volume em -14 LUFS. |

## Proporções (comparadas à referência)

| Parte | Referência | Este filme |
|---|---|---|
| Problema, em tom de cinema (P1–P2) | 32% | 5,0 s = **33%** |
| Produto (P3–P4) | 40% (+ 6%) | 5,0 s = **33%** |
| Pausa (P5) | 3% | 1,25 s = **8%** |
| Assinatura (P6) | 19% | 3,75 s = **25%** |
| Cortes secos | 3 em 70 s | **2 em 15 s** (10,00 e 11,25). O resto é movimento contínuo. |

## Regras de conteúdo (conferidas nesta lista)
- Todos os textos estão exatamente como no site. O "\n" do código só decide onde a linha quebra.
- Nenhum logo de loja, nem "grátis", "sem custo", "de graça", "de bairro", "da vizinhança" ou "comércio local".
- Nenhum número, nome, depoimento ou tela inventado. "R$ 5,90" e "7 dias úteis" vêm do site. As telas são capturas reais, com a nota de dados de exemplo.
- Muito branco, pouco laranja. O laranja aparece só no pin, no anel de destaque, em "R$ 5,90" e no logo. O verde aparece só onde a tela real já mostra "Pagamento confirmado".
- Sem brilho e sem sombra no logo. Sem brilho em interface.

## Decisões que preciso de você antes do código
1. **Frase 2 do ato 1.** "E agora é torcer pelo vizinho, pelo porteiro ou pela terceira tentativa." tem 12 palavras em 2,2 s: dá para ler, mas é rápido. A alternativa é deixar só "Sua compra chegou. Você não estava." e dar 1,5 s a mais para o produto.
2. **Texto entrando por foco.** A referência faz as palavras surgirem com desfoque e opacidade. Proponho foco + subida curta na máscara, com opacidade mínima de 40% e só nas legendas, para não cair no "tudo entrando com fade" que o CLAUDE.md proíbe (detalhes no guia, seção 9).
3. **Uma captura nova.** O cartão de preço do site, para o destaque em "R$ 5,90". Faço com o mesmo script do Playwright.
4. **Formatos.** O pedido é só 16:9. Se quiser 1:1 e 9:16 depois, a composição já pode nascer pensada para isso.
