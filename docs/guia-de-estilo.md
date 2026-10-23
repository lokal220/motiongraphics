# Guia de estilo: 09-diretor (VAI DE LOKAL, 45 s)

**O filme em uma linha:** uma pessoa que vive na correria nunca está em casa quando a entrega chega, não tem porteiro e vive pedindo favor, até passar a comprar com o endereço de uma agência parceira. A agência recebe por ela e avisa no WhatsApp. **Sentimento final: alívio e tranquilidade.**

A frase do filme é "Compre onde quiser. A gente recebe pra você.", do site.

Este guia diz **como** o filme conta. A lista de planos (`docs/lista-de-planos.md`) diz **o que** acontece em cada plano.

## 0. De onde vem cada coisa

| Entrada | Fonte | Regra |
|---|---|---|
| Gramática de montagem | `refs/` (a pasta não está vazia: é o vídeo de lançamento analisado no 05, em `docs/05-lancamento/guia-de-estilo.md`) e a seção 20 do guia, "Estilo de motion" | Pega a gramática, nunca o conteúdo |
| Marca (tom, palavras, proibições, curvas) | Guia Mestre (artefato), seções 20, 22, 24, 26 e 28 | Só como informação |
| Logo, cores, fontes, telas do app | Site vaidelokal.com.br (capturado com Playwright, `scripts/capturar_09.mjs`) e os prints reais do app que você mandou (`assets/09/app/`) | Nunca redesenhar interface |
| Música e efeitos | Código (`renderAudio`, `scripts/sfx.mjs`), medidos com `scripts/beats.py` | Acertos na grade medida, -14 LUFS |

**O que a referência ensina** (medido no 05):
- O primeiro terço é emoção, em tom de cinema: faixas pretas, câmera empurrando devagar e o problema se acumulando em camadas.
- A virada é uma superfície que se limpa, e o produto aparece num estúdio claro.
- No estúdio, a interface real fica no centro e um destaque pula de elemento em elemento a cada verbo.
- Tem uma pausa curta e isolada.
- A assinatura tem o bloco da marca deslizando e uma lista rolando.
- O problema e o produto se ligam por um movimento **para dentro de uma superfície**, nunca por corte seco.

## 1. Estrutura (120 BPM, 90 batidas, 45 s)

| Bloco | Tempo | Batidas | Peso | Na referência |
|---|---|---|---|---|
| Gancho | 0–2 s | 0–3 | 4% | o problema numa imagem |
| Ato 1: a correria | 2–12 s | 4–23 | 22% | cinema, camadas acumulando |
| Ato 2: os favores | 12–22 s | 24–43 | 22% | o peso chega ao máximo |
| Ato 3: a virada | 22–32 s | 44–63 | 22% | a superfície limpa, o produto real |
| Ato 4: a agência recebe | 32–40 s | 64–79 | 18% | o produto fechando o ciclo |
| Fim | 40–45 s | 80–89 | 11% | assinatura + lista |

- **45 s não fecham em compassos inteiros** (são 22 compassos e meio). Os dois últimos tempos viram a anacruse do loop: a música e a imagem do fim preparam o primeiro tempo forte do gancho.
- Uma recompensa visual nova a cada 3 a 5 s, e alguma mudança a cada 2 s no máximo.

## 2. Paleta

| Papel | Cor | Onde |
|---|---|---|
| Fundo do "antes" (atos gancho–2) | `#ECE7E1` | neutro quente, um pouco mais escuro |
| Fundo do "depois" (atos 3–fim) | `#F5F3F0` | o `--bg-2` do site: neutro quente, claro |
| Superfície (contêiner, cartões) | `#FFFFFF` | "muito branco" |
| Tinta | `#2A1F18` | texto, traço da ilustração, faixas de cinema, pílula de legenda |
| Tinta 2 | `#6B5C4E` | texto secundário, a resposta que não ajuda |
| Linha clara | `#CFC6BD` | ruas do mapa, divisórias, a casa esmaecida |
| **Destaque: laranja** | `#EA6E1A` | **só depois da virada**: o pin, o anel que pula pela interface, a palavra-chave, a cartela final |
| Verde | `#137456` / `#1D9E75` | só dentro das telas reais ("Pagamento confirmado", "Copiado"), nunca acrescentado |

O "antes" não tem laranja nenhum. O laranja entra na virada e **aponta**: nunca é fundo de cena, exceto na cartela final.

## 3. Tipografia (lida a 360 px de largura)

A 360 px de largura, o quadro de 1920 encolhe 5,3 vezes. Um texto de 80 px em 1080p vira 15 px no celular, o mínimo confortável.

| Uso | Fonte | Corpo a 1080p | No celular (360 px) |
|---|---|---|---|
| Legenda e notificação (o texto que conta a história) | DM Sans 800, -0,02 em | **84 px** | 16 px |
| Texto de interface desenhado (bolhas, títulos de notificação) | DM Sans 700/500 | **64–72 px** | 12–14 px |
| ID e códigos (LOKAL12, CAIXA.482913) | DM Mono 500 | 64 px | 12 px |
| Telas reais do app | a própria captura | **recortada e ampliada até o texto-chave ter 56 px ou mais** | ≥ 11 px |
| Assinatura: "Chega de perder encomendas." | DM Sans 800, -0,03 em | 96 px | 18 px |

- No máximo **dois tamanhos de texto por quadro**.
- Frases curtas, uma ideia por plano. Cada texto fica na tela tempo de ser lido duas vezes.

## 4. Ilustração (o "antes")

Não há filmagem nem 3D da marca. O mundo da personagem é **ilustração de traço da marca**:
- **Traço:** 6 px a 1080p (proporcional a 2 px numa tela de 390), pontas e cantos arredondados, em tinta.
- **Como entra:** o traço se desenha. Nada entra por fade.
- **A personagem nunca aparece de rosto.** Vemos a mão com o celular, o bolso, as costas na rua, a silhueta no metrô. Nada de mascote nem personagem fofo (regra do guia).
- **Pacote:** caixa de papelão em linha, nunca com olhos ou braços. **Entregador, carro e caixa sem marca** de loja ou de transportadora.
- **Celular:** moldura neutra, sem marca de fabricante.
- **Mapa:** claro e simplificado, desenhado, com linha tracejada laranja. **Não usamos o Google Maps do site**: tem conteúdo de terceiros e foge da regra do guia.

## 5. O contêiner e o cursor

- **Um contêiner que nunca corta.** É uma superfície branca (raio, tamanho e posição em molas) que vira notificação, celular, conversa, a tela real do app, o mapa, o balcão e a cartela.
- **Troca de conteúdo:**
  - o velho sai em 0,12 s, com escala de 97% e opacidade;
  - o novo entra 0,12 s depois de a forma começar a mudar: traços se desenham, textos sobem por máscara, telas reais entram por máscara deslizante;
  - o texto sai antes da próxima transformação.
- **Cortes de fundo:** no ato 1, a rotina (metrô → trabalho → rua) corta seco **atrás** do contêiner, na batida. O contêiner, que é o celular com as notificações, atravessa os cortes sem cortar.
- **O cursor conduz cada mudança:**
  - no "antes", ele é o polegar da personagem (dispensa a notificação, envia a mensagem);
  - no "depois", é ela usando o app (Copiar, Pagar).
  - O hook não tem cursor: o interfone toca **sozinho**.
- **Molas:**
  - fechadas, zeta 0,85 (sobressinal ≈ 0,5%, nunca quica);
  - um valor com vários alvos é a soma de uma mola por mudança;
  - o indicador que estica usa as bordas da frente e de trás em molas diferentes.
  - Ficam em `lib/motion.js`, compartilhadas por todos os capítulos.
- **Curvas da marca:**
  - entrada `cubic-bezier(.22,1,.36,1)`;
  - confirmação `(.34,1.4,.64,1)`, só no que dá certo;
  - logo: de 96% a 100% e opacidade, em 650 ms;
  - cortina `(.65,0,.35,1)`.

## 6. Câmera

| Bloco | Movimento |
|---|---|
| Gancho e atos 1–2 | **Faixas de cinema** em tinta (132 px em cima, 114 px embaixo, como na referência). **Empurrão lento** de 1,00 a 1,06 por plano, com **câmera na mão** sutil (soma de senos com fase fixa: função pura do tempo). Paralaxe de duas camadas no máximo: primeiro plano e fundo. |
| Virada (22 s) | As faixas recolhem, a câmera estabiliza e o fundo clareia. É o mesmo gesto da referência quando o produto aparece. |
| Atos 3–4 | **Respiração:** aproxima e afasta de 3 a 8% a cada frase. **Zoom de 1,0 a 1,35** no elemento que importa (o botão Copiar, o botão Pagar). Nunca vai e volta rápido. |
| Fim | Parada. Quem se mexe é o bloco da marca e a lista. |

- **Nunca:** chicote, tremor forte, rotação perceptível ou zoom brusco.
- **Desfoque:** só o de movimento natural (4 subquadros por quadro). Nunca decorativo.

## 7. Texto

- **Entrada:** por linha, subindo 36 px dentro de uma máscara, 70 ms entre linhas, com a curva de entrada. Sem fade.
- **Saída:** sobe para fora da máscara em 0,24 s, antes da próxima mudança.
- **Legenda:**
  - no "antes", é texto branco na faixa de cinema de baixo;
  - no "depois", fica numa **pílula de tinta** com texto branco, alinhada à esquerda (a pílula da referência).
- **A palavra-chave pode ganhar o laranja**, só depois da virada.
- Proibido: texto centralizado em gradiente, tudo entrando com fade, letras voando, quicando ou girando, e emoji.

## 8. Som

- **Trilha original de 120 BPM, sintetizada em código.** É medida com `scripts/beats.py` antes de qualquer animação, que gera batidas, tempos fortes e acertos. Mudança de estado cai na batida, momento grande no tempo forte, efeito no acerto.
- **Arco da trilha:**

  | Bloco | Música |
  |---|---|
  | "Antes" | Lá menor: relógio, grave, o "ding-dong" do interfone e um ostinato que vai pesando até o ato 2 |
  | Virada | Uma semicolcheia de silêncio e o tempo forte em dó maior |
  | "Depois" | Groove leve (shaker, palma suave, marimba) |
  | Fim | Acorde quente. Os dois últimos tempos puxam o loop |

  Sem pad de fundo genérico.
- **Efeitos** (`scripts/sfx.mjs`, a partir de `cues.json`):
  - existentes: click (todo clique do cursor), pop (algo aparece), whoosh (toda transformação do contêiner) e thump (o logo);
  - **novos:** buzz (o celular vibrando) e shutter (a foto no balcão).
- -14 LUFS, pico ≤ -1 dBTP.

## 9. Loop

O último segundo leva o contêiner de volta à forma, ao tamanho e ao lugar do primeiro quadro. O cursor sai do quadro e fica parado fora dele. A anacruse da música cai no "ding" do interfone do gancho.

`out/teste-de-loop.mp4` emenda o fim no começo, duas voltas, para conferir a costura: o quadro final e o inicial têm que bater, inclusive a posição e a velocidade do cursor.

## 10. Conflitos e decisões

| Pedido | Problema | Decisão |
|---|---|---|
| Ato 3: "a tela real 'Seu endereço para compras' do app", com Copiar em CEP, Número, Complemento e Nome | Essa tela não existe no site: só no app logado | **Resolvido:** você mandou os prints reais do app (`assets/09/app/`: "Seu endereço para compras", a continuação dela e a tela inicial "Sua encomenda chegou", tudo com dados de exemplo: Ana Souza, LOKAL12). Uso a tela real. Não há print do estado depois do toque, então o toque em "Copiar" aparece como o botão afundando e o anel laranja pulando para o próximo. **Não invento um "Copiado".** |
| "Pagar R$ 5,90 e gerar QR Code" | As capturas antigas (`assets/capturas/`) mostram R$ 7,90 | **Sem conflito:** o site já foi atualizado e mostra R$ 5,90. Vou recapturar as três telas. |
| Mapa com a casa e o pin | O mapa do site é Google Maps (conteúdo de terceiros) | Mapa **desenhado**, como o guia manda |
| Personagem, entregador, carro, metrô | Não há filmagem | Ilustração de traço, personagem sem rosto, tudo sem marca |
| Logo | O site só tem o logo em 320 px | **Resolvido:** você mandou o logo laranja e o branco em 989×440, com transparência (`assets/09/app/logo-*.png`). A assinatura fecha na **cartela laranja com o logo branco a 52% da largura** (1000 px, ampliação de 1,01×), como o guia manda. |
