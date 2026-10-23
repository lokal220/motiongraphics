# Regras do estúdio (motion-reel)

Se o projeto tiver um `CLAUDE.md` com regras próprias, elas valem primeiro. Este arquivo é a base: as regras do estúdio onde a skill nasceu, mais o que os filmes ensinaram.

## Contrato de render
- **Todo filme é uma função pura do tempo:** `window.seek(t)` desenha o quadro do instante t.
- **No modo de render, nada de:** transições de CSS, `setTimeout`, `requestAnimationFrame`, `Date` ou estado carregado de um quadro para o outro.
- **Ruído só com semente** (`Motion.mulberry32`), nunca `Math.random`. O `render.mjs` para o render se achar algum desses.
- **Codificação:** H.264 yuv420p, CRF 16, BT.709. Som em -14 LUFS, com pico até -1 dBTP.
- **Desfoque de movimento:** 4 subquadros misturados dentro de `seek`.

## Visual
- **Padrões proibidos:**
  - título centralizado em cima de gradiente;
  - tudo entrando com fade;
  - etiquetas nos cantos e molduras no quadro;
  - brilho (glow) em interface;
  - explosão genérica de partículas;
  - easing quicando.
- **Uma fonte de título, uma fonte de interface e uma cor de destaque**, a não ser que o briefing diga outra coisa. No máximo dois tamanhos de texto por quadro.
- **A cada 2 a 4 s alguma coisa nova acontece na tela,** e nada fica parado por mais de 2 s.
- **Leitura no celular:** a 360 px de largura, o quadro de 1920 encolhe 5,3×. A legenda que conta a história usa 84 px ou mais em 1080p (16 px no celular). Frases curtas, que fiquem na tela tempo de ser lidas duas vezes.

## Interface
- **Só interface real do produto,** capturada do site (`scripts/capturar.mjs`) ou de prints do usuário com dados de exemplo.
  - **Nunca invente tela, texto nem estado.** Por exemplo: se não há print do botão depois do toque, o toque é o botão afundando e um anel de destaque, sem escrever "Copiado".
  - **Captura pequena ampliada fica borrada.** Se o texto-chave não chega a 56 px sem passar de ~2× da captura, peça ao usuário o print em alta.
  - Recorte e amplie o elemento que importa. Não redesenhe.
- Mapa, pessoas e objetos, quando não há filmagem, viram **ilustração de traço** (6 px em 1080p, pontas redondas, em tinta), que se desenha.
  - Pessoas sem rosto, nada de mascote, caixa sem olhos.
  - Nada de logo de loja, transportadora ou fabricante.

## Movimento
- **Molas fechadas com zeta 0,85** (sobressinal ≈ 0,5%, nunca quica). Um valor com vários alvos é a soma de uma mola por mudança (`Motion.track`).
  - Abaixo de um envelope de 1e-5, a mola vale o alvo exato. É isso que deixa o loop exato.
- **Nada desliza em velocidade constante:** derivas, paralaxes e rolagens usam `easeInOut` ou mola.
- **Um contêiner que nunca corta:** ele se transforma de estado em estado, e um cursor conduz cada mudança.
  - O conteúdo velho sai no começo da transformação, em 0,12 s.
  - O novo entra 0,12 s depois: o traço se desenha e o texto sobe pela máscara.
  - O texto sai antes da próxima transformação.
- **Troca de cor do contêiner:** nunca interpole a cor (passa pela intermediária e parece fade). Use **cortina**: a cor nova entra por dentro como um bloco que sobe ou desce, e a cor do contêiner troca escondida atrás dela (estado com `whoosh: 0`).
- **Cursor:**
  - sai pelo menos 1 batida antes do clique, para chegar parado;
  - a ponta para no quarto inferior direito do botão, para a seta não cobrir o rótulo;
  - sai do quadro quando não tem o que fazer.

## Som
- **A trilha é sintetizada em código** (`trilha.js`), a não ser que o usuário forneça uma música. Mínima e limpa, sem pad de fundo genérico.
- **Mede antes de animar:** `scripts/beats.py` gera batidas, tempos fortes e acertos.
  - Mudanças de estado caem nas batidas.
  - Momentos grandes (virada, logo, botão final) caem nos tempos fortes.
  - Efeitos caem nos acertos.
  - Se uma deixa não tem ataque da trilha embaixo, ponha um acento na trilha e meça de novo.
- **Efeitos de interface:** `scripts/sfx.mjs`, a partir do `cues.json` (click, pop, whoosh, thump, buzz, shutter). Um click em todo clique, um whoosh em toda transformação, um thump no logo.

## Loop (quando o filme repete)
- O estado em t = duração tem que ser **idêntico pixel a pixel** ao de t = 0.
- **A câmera na mão é periódica na duração do filme,** então o último quadro fica um passo antes do primeiro e a emenda não tem salto.
- **No primeiro quadro, a abertura já está desenhada,** sem cursor e sem legenda.
- **Desenho que cobre a borda do contêiner muda o antisserrilhado:** pare de desenhá-lo antes do fim.

## O loop de crítica antes de mostrar qualquer coisa
1. Renderiza a folha de contato (um quadro por batida, ou 2 por segundo) e **olha** para ela.
2. Dá nota de 1 a 10 nos critérios de `prompts/critica.txt`.
3. Corrige os 3 piores problemas e repete até toda nota ser 8 ou mais.
4. Só então faz o render completo.

## Armadilhas que já custaram uma rodada
- **`prog(t, Infinity, Infinity)` dá NaN e o texto some:** trate o "sem saída" à parte.
- **`roundRect` com raio negativo quebra o quadro:** a mola passa um fio abaixo de zero. Use `Math.max(0, r)`.
- **Desfoque de movimento sobre texto em movimento rápido vira texto sobreposto:** tire o texto antes de mover, ou mova mais devagar.
- **Imagem colada na conversa não é arquivo:** peça que o usuário salve na pasta do projeto e procure também em Downloads.
- **Comentário no meio de uma linha só quebra o JavaScript:** o render mostra o erro da página.
