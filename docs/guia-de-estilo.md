# Guia de estilo: tutorial de primeiro acesso (VAI DE LOKAL, 60 s, 9:16)

**O filme em uma linha:** o tutorial que a pessoa assiste logo depois de criar a conta e abrir o app pela primeira vez. Ele mostra, nas telas reais, como comprar com o endereço da agência, o aviso no WhatsApp, quanto custa, como pagar pelo app e como retirar com QR Code.

**Sentimento final:** "entendi tudo, sei exatamente quanto vou pagar e posso fazer a primeira compra hoje".

A frase do filme é "Compre onde quiser. A gente recebe pra você.", do site.

Este guia diz **como** o filme conta. A lista de planos (`docs/lista-de-planos.md`) diz **o que** acontece em cada plano.

## 0. De onde vem cada coisa

| Entrada | Fonte | Regra |
|---|---|---|
| Gramática de montagem | `refs/referencia.mp4` (70,5 s, 141 quadros em `refs/frames/`), medida no filme 05 (`docs/05-lancamento/guia-de-estilo.md`) | Pega a gramática, nunca o conteúdo. O vídeo do X (WeAreLegora) não foi baixado: o briefing aceita `./refs/` no lugar dele. |
| Telas do app | `assets/telas/`: os cinco prints em 1080×2000 da conta de exemplo (Ana Souza, ID LOKAL12) | Usadas como estão: recortadas e ampliadas, nunca redesenhadas. Recortes medidos em `assets/telas/medidas.json`. |
| Logo | `assets/logo/logo-branco.png` e `logo-laranja.png` (989×440) | O pin foi separado do resto por componente conexo do alfa (`logo-*-so-pin.png` e `logo-*-sem-pin.png`): o mesmo desenho, sem redesenhar, sem distorcer, contornar, sombrear ou brilhar. |
| Cores, fontes, textos do site | `assets/site/` e `assets/site/inventario.json` (Playwright, 23/10/2026) | As variáveis do site: `--orange #EA6E1A`, `--orange-pale #FFF0E8`, `--ink #2A1F18`, `--ink-2 #6B5C4E`, `--fundo #FFFFFF`. DM Sans 400 a 800 no site. |
| Valores e frases | O briefing ("O que o vídeo ensina") | Como estão, sem arredondar nem inventar |
| Música e efeitos | Código (`trilha.js`, `scripts/sfx.mjs`), medidos com `scripts/beats.py` | Acertos na grade medida, -14 LUFS |

**O que a referência ensina** (medido no 05):
- No estúdio claro, a interface real fica no centro e um destaque **pula de elemento em elemento a cada verbo** (0,5 a 0,8 s por pulo).
- A câmera **respira**: aproxima e afasta de 5 a 12% a cada frase, sem tremor.
- A cena seguinte **nasce de dentro de uma superfície** (empurrão para dentro de uma tela), nunca de um corte seco.
- A legenda é uma **pílula escura com texto branco**, alinhada à esquerda, sobre fundo claro chapado.
- A assinatura tem o bloco da marca parado e chapado, sem vinheta.
- Poucos cortes: o ritmo vem de dentro do plano (destaques, câmera, texto), não da montagem.

O briefing pede um tutorial, não um filme de problema e solução: a parte "cinema" da referência (faixas pretas, câmera na mão) **não entra**. O filme inteiro é o "estúdio" da referência, dentro do celular.

## 1. Estrutura (120 BPM, 120 batidas, 30 compassos, 60,0 s, 3600 quadros a 60 fps)

| Bloco | Tempo | Batidas | Peso | O que ensina |
|---|---|---|---|---|
| Gancho | 0,0–2,5 s | 0–5 | 4% | O app é seu, e o endereço já está pronto (LOKAL12) |
| Ato 1: o endereço | 2,5–15,5 s | 5–31 | 22% | Copiar endereço, nome e ID; comprar em qualquer loja online |
| Ato 2: o aviso | 15,5–28,0 s | 31–56 | 21% | A agência recebe e registra com foto; o aviso; o detalhe da encomenda |
| Ato 3: o preço e o Pix | 28,0–42,0 s | 56–84 | 23% | Os três preços, um por vez; pagar pelo app; saldo na carteira |
| Ato 4: a retirada | 42,0–56,0 s | 84–112 | 23% | QR Code, palavra-chave, 7 dias úteis e a taxa de guarda |
| Fim | 56,0–60,0 s | 112–120 | 7% | A assinatura, que vira o primeiro quadro (loop) |

**A regra por trás:** cada ato é um passo do uso real, na ordem em que a pessoa vai viver: copiar o endereço, esperar o aviso, pagar, retirar. O maior ato é o do preço, porque é a dúvida que mais trava a primeira compra.

Os atos andam até 4 s em relação ao roteiro do briefing (decisão D10 da lista de planos). O roteiro tem 14 frases e 7 valores em 60 s, e o filme precisa funcionar sem som; com os tempos originais, cinco legendas não davam nem uma leitura. A alternativa é um filme de 64 s.

## 2. Paleta (hex)

| Papel | Cor | Onde |
|---|---|---|
| Fundo do quadro | Branco `#FFFFFF` | O filme todo, menos as cartelas (o briefing: "telas do app no fundo branco"; nada de creme, então o `#F5F3F0` do site fica de fora) |
| Destaque | Laranja `#EA6E1A` | As cartelas de abertura e fim, os valores e o ID (sobre branco), o anel do toque, o traço sob o LOKAL12 e sob o endereço |
| Texto | Tinta `#2A1F18` | Títulos, pílula da legenda |
| Texto de apoio | Tinta 2 `#6B5C4E` | Linhas menores (tamanhos, prazo) |
| Superfície de destaque | Laranja-claro `#FFF0E8` | O bloco do texto do aviso, atrás de texto em tinta (nunca atrás de texto laranja) |
| Concluído | Verde `#1D9E75` | Só em "concluído": o check do "Pagamento confirmado" já vem verde na tela real |
| Sombra do contêiner | `rgba(42, 31, 24, 0.10)`, desfoque 44, deslocamento 16 | Profundidade sobre o branco, como as sombras macias do estúdio da referência |

**Princípio (da referência):** quase tudo é neutro, e a cor forte aparece pouco e com sentido. Aqui o laranja aparece nas cartelas, nos valores e no toque, e em nada mais.

As telas reais trazem as próprias cores (o laranja escuro `#C05810` do LOKAL12, o verde do "Saldo suficiente"): elas ficam como estão, porque são a interface.

## 3. Tipografia

| Uso | Família e peso | Corpo em 1080×1920 | No celular de 360 px (÷3) |
|---|---|---|---|
| Preço sozinho (R$ 5,90, R$ 9,90, R$ 19,90) | DM Sans 800, laranja sobre branco, espaçamento -0,03 em | 240 px | 80 px |
| ID (LOKAL12) | **DM Mono 500**, laranja sobre branco | 170 px (714 px de largura) | 57 px |
| Palavra-chave (CAIXA.482913) | **DM Mono 500**, tinta | 110 px (792 px de largura; a 150 px ela mediria 1080 px e não caberia) | 37 px |
| Prazo e taxa ("7 dias úteis…", R$ 0,84) | DM Sans 800 (o valor em laranja) | 132 px | 44 px |
| Legenda (pílula de tinta, texto branco) | DM Sans 800 | 72 px | 24 px |
| Rótulo das linhas de preço e da palavra-chave | DM Sans 700, tinta ou tinta 2 | 72 px (o mesmo corpo da legenda, para o quadro ter só dois) | 24 px |
| Texto de cartão (aviso, frase da taxa, teto) | DM Sans 700, tinta ou tinta 2 | 60 px | 20 px |
| Assinatura | DM Sans 800, branco | 80 px | 27 px |

- **No máximo dois tamanhos de texto nosso por quadro.** O texto que vem dentro do print não conta, porque é a interface.
- **Telas em escala 1:1 ou perto disso:** o print tem 1080 px de largura, a largura do quadro. A 0,93× a tela fica do tamanho que tem no próprio celular, e no celular ela se lê como o app se lê. Nunca passa de 1,5× (o print amolece).
- **O que não pode ficar pequeno:** valor, ID, palavra-chave e prazo. Tudo isso é refeito em texto nosso, grande e sozinho, depois de aparecer na tela real.

## 4. Duração dos planos

- **Sem corte seco no filme inteiro.** O contêiner troca de forma; quem marca o ritmo é o dedo (um toque a cada 1 a 2 s nos atos 1 e 3) e a legenda.
- **Plano típico:** de 2 a 3 s (4 a 6 batidas). Nada fica parado mais de 2 s, e **a cada 2 a 4 s acontece uma coisa nova** (o CLAUDE.md é mais estrito que o briefing, que pede 3 a 5 s; o filme segue os dois).
- **Valor:** cada valor fica grande, sozinho e parado por **pelo menos 2,0 s** (5 batidas, contando a entrada e a saída).
- **Legenda:** fica na tela pelo menos **uma leitura inteira**, a 3 palavras por segundo, nunca menos de 2,0 s (decisão D11). A regra do estúdio pede duas leituras, o que em 60 s não cabe; a lista de planos tem a conta de cada texto.
- **Laranja sobre laranja-claro não:** o contraste fica abaixo de 3:1. Texto grande em laranja vai sobre branco; o laranja-claro fica atrás de texto em tinta.

## 5. Transições

1. **Transformação do contêiner (a principal):** a tela vira cartão, o cartão vira pílula, a pílula vira tela. A forma muda com mola; o conteúdo velho sai em 0,12 s no começo, e o novo entra 0,12 s depois.
2. **Nascer de dentro (da referência):** no gancho, a tela "Seu endereço para compras" abre a partir da ponta do pin, como um círculo branco que cresce por dentro da cartela laranja. No ato 4, a tela "Retirada" cresce a partir da pílula verde "Pagamento confirmado", que já é o topo dela.
3. **Cortina de cor:** a troca entre branco e laranja nunca interpola a cor (passaria pelo laranja desbotado, que lembra fade). A cor nova entra por dentro como um bloco (de baixo para cima no fim, em círculo a partir do pin no gancho), e a cor do contêiner troca escondida atrás dela.
4. **Rolagem real:** quando o próximo alvo está na mesma tela, a tela rola (com mola) dentro do contêiner, como rola no celular.

## 6. Câmera

- **Respiração:** de 1,00 a 1,03× ao longo de cada frase, e **empurrão de até 1,10×** para o alvo do toque. Volta a 1,00 antes da próxima transformação.
- **Parada nas cartelas** de abertura e fim (quem se mexe é o pin, a logo e a frase).
- **Nunca:** câmera na mão, chicote, rotação, zoom brusco.

## 7. Textura, som e profundidade

- **Sem grão, sem vinheta, sem brilho.** O acabamento é digital e limpo (a referência mede ruído de 0,2 a 0,6 em 255).
- **Profundidade:** a sombra macia do contêiner, o empurrão da câmera e o dedo, que fica sempre à frente de tudo.
- **Desfoque de movimento:** 4 subquadros por quadro.
- **Som:** trilha original, 120 BPM, clara e leve (o filme ensina, não dramatiza). Efeitos de interface sintetizados (`click` no toque, `whoosh` na transformação e no arrasto, `pop` no valor, `buzz` no aviso, `shutter` no registro com foto, `thump` na cartela). -14 LUFS.
- **Sem som também funciona:** toda informação está escrita na tela.

## 8. Como o texto entra e sai

- **Entrada:** pela máscara, subindo (`sobe`), linha por linha com 0,07 s de defasagem. Nunca fade.
- **Saída:** subindo pela mesma máscara, **antes** da próxima transformação (`TB(ate) - 0,26 s`).
- **Pílula de legenda:** nasce na largura da frase, embaixo e à esquerda, dentro da área segura, e o texto sobe dentro dela (a pílula da referência).
- **Valores:** sobem pela máscara como o resto, **antes** dos rótulos (o valor não tem defasagem). Na troca de um preço pelo seguinte, o valor velho sobe e sai pela boca da máscara, e o novo sobe por baixo.
- **Recortes de tela:** entram opacos e aparecem pela forma do contêiner, que cresce e recorta, ou rolam com mola dentro dele. Nunca com a opacidade subindo.
- **Quebra de linha:** as linhas das pílulas vão quebradas à mão, para "QR Code" não se partir e "ID" ou "WhatsApp" não ficarem sozinhos.

## 9. O dedo (o toque que conduz cada mudança)

O briefing pede um dedo, não uma seta de mouse: o filme é visto e vivido no celular.

- **Desenho:** um círculo de toque, com 92 px de diâmetro, preenchido em tinta a 22% e com contorno branco de 4 px. É o indicador de toque que o próprio celular mostra na gravação de tela. Não tem mão desenhada.
- **Onde ele mira:** no quarto inferior direito do botão, para o círculo não cobrir o rótulo ("Copiar").
- **Chegada:** entra com mola (2,4 Hz) e chega parado **pelo menos meia batida antes** do toque; entre dois toques seguidos na mesma tela ele desliza com mola.
- **Toque:** o círculo encolhe para 82% e volta, o botão real afunda 4% e um **anel laranja de contorno** (6 px) se desenha em volta do botão. Não aparece "Copiado" nem nenhum estado que não esteja nos prints.
- **Arrasto:** em **toda troca que não nasce de um botão**, o dedo arrasta de baixo para cima (0,4 s, com mola) logo antes, e é esse gesto que leva à mudança. Nos cartões, o arrasto passa pela faixa de baixo, longe do valor.
- **Exceções (decisão D12):** o aviso chega sozinho, o Pix confirma depois do toque em "Pagar" e a pílula sobe. São o app e a agência agindo.
- **Saída:** sai do quadro quando não tem o que fazer. No primeiro e no último quadro ele está fora.
- **No motor:** o modelo da skill desenha uma seta de mouse. A cópia do motor deste filme (`filmes/11-tutorial-primeiro-acesso/index.html`) troca a seta por este círculo e ganha o arrasto. A folha de contato confere que nenhuma seta aparece.

## 10. Área segura e composição (1080×1920)

- **Topo:** nada acima de 230 px (12%). **Base:** nada abaixo de 1536 px (20%). **Lados:** texto e logo a pelo menos 76 px (7%) da borda; o fundo do contêiner, a sombra e a caixa da pílula podem ir até 40 px. É ali que o app põe a barra de progresso e os botões do player.
- **Zona do contêiner:** de 270 a 1170 px de altura (centro em 720). A altura do contêiner vezes o zoom da câmera nunca passa de 900. **Zona da legenda:** de 1230 a 1536 px. As duas nunca se cobrem.
- **Zoom da câmera:** o motor amplia em torno do centro do quadro (y 960). Para empurrar para um alvo em y = p com zoom z, a câmera vai para y = p + (960 − p) / z.
- **Cartelas:** a logo fica com centro em y 600, para o pin cair cerca de 230 px até o LOKAL12, e a frase da assinatura fica embaixo dela, em y ≈ 980.
- **Alinhamento:** à esquerda, na margem de 76 px. Só a logo e os valores sozinhos ficam no eixo central.

## 11. Conflitos com as regras do estúdio e com a marca

| Na referência ou no briefing | A regra | Como o filme resolve |
|---|---|---|
| Referência: palavras entram com desfoque e opacidade | CLAUDE.md: proibido tudo entrando com fade | Texto pela máscara, subindo, sem opacidade |
| Referência: lista da assinatura rolando em velocidade constante | Regras do estúdio: nada desliza em velocidade constante | Não há lista rolando. As linhas de preço trocam com mola, conduzidas pelo arrasto do dedo |
| Briefing: "o aviso no WhatsApp com o texto real" | Nunca inventar tela; proibido logo de loja e de terceiros | Não existe print da mensagem, e desenhar uma notificação seria inventar uma tela. O aviso entra como **tipografia do filme**: o rótulo "Aviso no WhatsApp" e o texto exato entre aspas, num bloco laranja-claro. Sem ícone, sem remetente, sem desenho de notificação e sem o verde do WhatsApp. Se houver o print real, ele entra no lugar (decisão D5) |
| Regras do estúdio: legenda de 84 px ou mais em 1080p | A regra foi feita para o quadro de 1920 de largura, que encolhe 5,3× até 360 px | No vertical, o quadro tem 1080 de largura e encolhe 3×: a legenda de 72 px vira 24 px no celular, acima dos 16 px que a regra protege |
| Regras do estúdio: legenda lida duas vezes | O briefing: 60 s com 14 frases e 7 valores, e o filme tem que funcionar sem som | Uma leitura inteira, no mínimo, para cada texto (decisão D11). Duas leituras só com o filme de 64 s |
| Briefing: "um toque de dedo conduz cada mudança" | Nunca inventar estado | O dedo toca botões reais e arrasta nas trocas sem botão. Três mudanças acontecem sozinhas, porque na vida real são o app e a agência que agem (decisão D12) |
| Briefing: "o Pix confirma" | Nunca inventar tela nem estado | Não existe print da tela do Pix. A confirmação é a pílula real "Pagamento confirmado", recortada da tela "Retirada" |
| Briefing: "e, menor, Do 8º dia útil..." | Briefing: todo valor grande e sozinho por 2 s | A frase fica no tamanho de rótulo, e só o "R$ 0,84" sobe para o tamanho de valor, na mesma ordem de leitura |
| Tela de lojas: os chips com nomes de lojas | Briefing: logo de loja proibido, escrever "qualquer loja online" | Os chips não aparecem (decisão D2). Dessa tela entram só a linha do endereço e o botão "Copiar em uma linha" |
| Cartão "Agência escolhida": aparece "Fechada" em vermelho | O filme tem que dar confiança, e o vermelho seria uma segunda cor de destaque | O cartão não aparece (decisão D3) |
| Tela "Retirada": o cartão de baixo é do PKG-1031 | O detalhe e o pagamento são do PKG-1042 | O recorte para acima do PKG-1031 (decisão D4) |
| Tela "Início": "Chegou em 21/10", enquanto o detalhe diz 22/10/2026 | Dados de exemplo usados como estão | A tela não entra no roteiro (decisão D1) |
| CLAUDE.md: "etiquetas nos cantos e molduras no quadro" | | Nada nos cantos. O filme é a própria tela do celular: não há moldura de aparelho desenhada |
| CLAUDE.md: título centralizado em gradiente | | Fundos chapados; a logo fica centrada sobre laranja chapado, sem gradiente |
