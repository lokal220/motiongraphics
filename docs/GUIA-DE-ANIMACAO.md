# Guia de animação: tutorial de primeiro acesso (filme 11)

Todo animador lê, nesta ordem:
- o `CLAUDE.md`, com as regras do estúdio;
- `docs/guia-de-estilo.md`: o como, a marca e a referência;
- `docs/lista-de-planos.md`: o quê, plano a plano, com os textos exatos e as 13 decisões;
- este guia: o código.

## Os arquivos do filme (`filmes/11-tutorial-primeiro-acesso/`)

| Arquivo | O que é | Quem edita |
|---|---|---|
| `index.html` | O motor: a cópia do modelo da skill motion-reel, com o **dedo** no lugar da seta (toque e arrasto). Mudanças do diretor depois da primeira rodada dos animadores: **8 subquadros** de desfoque; a boca de baixo da máscara do `sobe` a 0,42 do corpo (não corta mais a vírgula nem o "$"); o texto da pílula sobe junto com a caixa | Ninguém (só o diretor) |
| `filme.js` | A ficha: 120 BPM, 120 batidas, 1080×1920, cores, fontes, tamanhos | Ninguém |
| `trilha.js` | A trilha sintetizada (dó maior, I-V-vi-IV, acentos nos momentos grandes, anacruse no fim) | O diretor, na passada de som |
| `beats.js`, `beats.json` | A grade medida pelo `scripts/beats.py`: 119,99 BPM, primeira batida em 13 ms, 30 tempos fortes | Gerado |
| `capitulos/comum.js` | Os ajudantes comuns (`F.u`), as telas reais e os logos | Ninguém (peça ao diretor) |
| `capitulos/cap1.js` … `cap4.js` | Um capítulo por animador | Cada um, só o seu |

## A divisão

| Capítulo | Planos | Batidas | Tempo | Arquivo | Registro |
|---|---|---|---|---|---|
| 1. Gancho e endereço | P01–P06 | 0–31 | 0–15,5 s | `capitulos/cap1.js` | `docs/critica/cap1.md` |
| 2. Chegou e o aviso | P07–P09 | 31–56 | 15,5–28 s | `capitulos/cap2.js` | `docs/critica/cap2.md` |
| 3. O preço e o Pix | P10–P14 | 56–84 | 28–42 s | `capitulos/cap3.js` | `docs/critica/cap3.md` |
| 4. Retirada e fim | P15–P20 | 84–120 | 42–60 s | `capitulos/cap4.js` | `docs/critica/cap4.md` |

**A decupagem já está escrita nos quatro capítulos.** Cada um já tem estados, transformações, legendas, movimentos do dedo, toques, arrastos, câmera e deixas, todos tirados da lista de planos, além de uma primeira versão do desenho de cada plano. O trabalho do animador é levar o seu capítulo ao acabamento e à nota 8 em tudo. Não é para refazer a decupagem.

**Mexer no tempo:** só dentro do seu capítulo, sem mudar as batidas de passagem (b31, b56, b84) nem as legendas das decisões D10 e D11. Qualquer mudança de batida entra no seu registro, com o motivo.

## O motor (a API `F`)

| Nome | O que é |
|---|---|
| `F.TB(n)` | Tempo da batida n na grade **medida** (aceita frações). Nunca use `n * 0.5`. |
| `F.hit(t)` | O acerto medido da trilha mais perto (as deixas caem nele) |
| `F.W0`, `F.H0` | 1080 × 1920 |
| `F.cor` | `TINTA #2A1F18`, `TINTA2 #6B5C4E`, `DESTAQUE #EA6E1A`, `CLARO #FFF0E8` (laranja-claro), `OK #1D9E75` (só concluído), `BRANCO`, `LINHA rgba(42,31,24,0.10)`, `FUNDO #FFFFFF` |
| `F.tam` | `LEG 72` (legenda), `UI 60` (texto de cartão), `ROTULO 72`, `PRECO 240`, `TITULO 132` (prazo e taxa), `MONO 170` (LOKAL12), `CODIGO 110` (CAIXA.482913), `ASSINATURA 80`, `TRACO 6` |
| `F.M` | `lib/motion.js`: `step`, `impulse`, `track`, `prog`, `lerp`, `clamp`, `easeOut`, `easeIn`, `easeInOut`, `path`, `arcPts`, `rrPts`. **Não use `confirm`**: ela tem sobressinal de 40% (quica). |
| `F.container(t)`, `F.camera(t)`, `F.cursorPos(t)`, `F.aperto(t)` | O estado do motor num instante: contêiner, câmera, posição do dedo e quanto ele aperta (0 a 1) |
| `F.abertura(ctx, a)`, `F.LOGO` | Do capítulo 1: a pose da cartela no quadro 0 e a geometria da logo e do pin (o capítulo 4 usa no fim) |

### O capítulo (`F.registra`)
```js
F.registra({
  nome, planos: [{ id: 'P07', de: 31, ate: 37, chave: [31.5, 32.7, 35.5] }],   // chave = quadros de revisão
  estados: { chegou: { cx, cy, w, h, r, cor: 0, sombra: 1, whoosh: 1 } },     // cor 0 branco / 1 laranja
  morphs: [[31, 'chegou', 2.4]],                                               // [batida, estado, mola em Hz]
  conteudo: [{ de, ate, atraso, saida, desenha(ctx, t, a) {} }],               // dentro do contêiner, origem no centro
  legendas: [{ de, ate, linhas: ['linha 1', 'linha 2'], estilo: 'pilula' }],  // linhas já quebradas à mão
  cursor: { moves: [[batida, [x, y], mola]], cliques: [47], arrastos: [[52, 53]] },
  camera: [[48, { z: 1.02, x, y }, 0.5]],
  deixas: [{ beat: 32, tipo: 'shutter', ganho: 1 }],                           // pop | buzz | shutter | thump | whoosh
});
```
- **Conteúdo:** entra 0,12 s depois de `TB(de)` (mude com `atraso`) e sai a partir de `TB(ate)` em 0,12 s. Com `saida: false`, quem controla a saída é você.
- **Faça o `ate` igual à batida do próximo morph.**
- **O argumento `a`:**
  - `a.t0`, `a.t1`, `a.k`, `a.c` (o contêiner agora: `cx`, `cy`, `w`, `h`);
  - `a.texto(s, x, y, tam, {peso, cor, alinha, mono, ui})`;
  - `a.sobe(t, t0, t1, s, x, y, tam, opts)`: entra pela máscara em t0 e sai subindo a partir de t1;
  - `a.img(nome, x, y, largura, [sx, sy, sw, sh])`;
  - `a.fill(x, y, w, h, r, cor)`, `a.pen`, `a.path`.

### O dedo (só neste filme)
- `cursor.moves = [[n, [x, y], f]]`: na batida n o dedo começa a ir para (x, y) com mola de f Hz (2,4 para chegar, 3 no arrasto, 1,8 para sair). Coordenadas da cena.
- `cursor.cliques = [n]`: toque na batida n. O círculo aperta, o motor põe um `click` na deixa, e o seu desenho afunda o botão e abre o anel (`F.u.afunda` e `F.u.anel`).
- `cursor.arrastos = [[n0, n1]]`: o dedo fica apertado de n0 a n1. Ponha um move na batida n0, com a mola 3, para onde o arrasto termina.
- **Regras:**
  - o dedo chega parado **entre meia e uma batida antes** do toque ou do arrasto, nunca antes disso;
  - mira no **canto de baixo à direita** do botão (direita − 12, base + 6), para não cobrir o rótulo;
  - o arrasto começa **dentro do cartão**, a 40 px da borda de baixo, e sobe uns 100 px, longe do valor;
  - **depois de cada toque ou arrasto, sai do quadro** (`FORA = [1220, 2060]`, mola de 1,8) em até 0,4 s. Ele nunca fica estacionado esperando: dedo parado é ruído no caminho do olho;
  - **exceção:** entre dois gestos a até 2 batidas um do outro, o dedo desliza direto de um para o outro (sair e voltar em 0,3 s seria um vaivém);
  - a saída vai pela direita (x 1240, na mesma altura), não pelo canto de baixo, para não cruzar a pílula da legenda;
  - enquanto houver legenda, o dedo fica acima de y 1250 (não cobre a pílula);
  - no quadro 0 e no quadro final ele está fora.
- **O dedo tem contorno:** círculo de tinta a 22%, borda branca de 4 px e um traço fino de tinta a 35% por fora, para não sumir no branco.

### Os ajudantes comuns (`F.u`, em `capitulos/comum.js`)
| Nome | O que faz |
|---|---|
| `F.u.cena(ctx, a)` | Passa o conteúdo para o espaço da cena (o desenho fica parado enquanto o contêiner muda em volta) |
| `F.u.proj(px0, py0, s, cx = 540, cy = 720)` | Projeção do print 1080×2000: o ponto (px0, py0) cai em (cx, cy) com escala s. Tem `x(px)`, `y(py)`, `r([x0, y0, x1, y1])` |
| `F.u.tela(ctx, a, nome, P)` | O print inteiro projetado (o contêiner recorta) |
| `F.u.anel(ctx, t, t0, rect, r, {pad, dura, fica})` | Anel laranja de contorno, 6 px, sem brilho: abre em 0,4 s e recolhe depois de `dura` |
| `F.u.anelCirculo(...)` | O mesmo, em círculo |
| `F.u.afunda(ctx, a, t, tToque, nome, crop, x, y, w)` | O botão real afunda 4% no toque |
| `F.u.traco(ctx, t, t0, x0, x1, y, {t1, largura, tinta})` | Traço que se desenha (sublinhado) e recolhe |
| `F.u.pulso(τ)` | Pulso de toque normalizado (0 a 1) |
| `F.u.TELAS` | `endereco`, `lojas`, `detalhe`, `retirada`, `logoSemPin`, `logoPin` (registradas pelo capítulo 1) |

Os recortes de cada alvo estão em `assets/telas/medidas.json` (px do print).

## Composição (1080×1920)
- **Área segura:** texto e logo entre y 230 e 1536, a pelo menos 76 px das laterais. O fundo do contêiner e a caixa da pílula podem ir até 40 px da borda.
- **Zona do contêiner:** de y 270 a 1170, com centro em 720. A altura do contêiner vezes o zoom da câmera nunca passa de 900.
- **Plano sem legenda:** o cartão centra na área segura livre, em y 883, e pode ir de 250 a 1516. A transformação para lá e de volta é com mola, como qualquer outra.
- **Largura do contêiner:** no máximo 980 px quando a câmera vai até 1,02×, e 960 px até 1,04×. Assim, mesmo com zoom, o fundo fica a 40 px da borda.
- **Elemento real do tamanho do contêiner** (o botão "Pagar", a pílula "Pagamento confirmado"):
  - o contêiner tem exatamente a forma do elemento no print e **sem sombra própria** (`sombra: 0`); a interface real não tem aro nem sombra;
  - **o anel desse toque vai na camada `frente`** (espaço da cena), porque o conteúdo é recortado pelo contêiner e o anel ficaria cortado.
- **Um destaque laranja por vez:** o traço, o anel e o valor não disputam o mesmo quadro. O destaque velho recolhe antes de o novo abrir.
- **Uma borda esquerda só:** o texto da legenda e o dos cartões começam em x 116.
- **Zona da legenda:** de 1230 a 1536.
- **Zoom:** o motor amplia em torno de (540, 960). Para empurrar para um alvo em y = p com zoom z, a câmera vai para y = p + (960 − p) / z (o mesmo vale para x, com 540).
- **Texto dentro dos cartões:** alinhado à esquerda em x = 116 da cena (−424 no conteúdo de um contêiner de 1000 centrado).
- **No máximo dois tamanhos de texto nosso por quadro.** A legenda tem 72 px; os rótulos que dividem o quadro com ela também têm 72.

## Regras de movimento
1. **Molas fechadas com zeta 0,85** (`step`, `track`). Nada quica, e nada desliza em velocidade constante (use `easeInOut` ou mola).
2. **Texto entra pela máscara, subindo (`a.sobe`), e sai subindo antes da próxima troca.** Nunca fade. Valores entram antes dos rótulos.
3. **Recortes de tela entram opacos.** Eles aparecem pela forma do contêiner, que cresce e recorta, ou rolam com mola dentro dele. Nunca com opacidade subindo.
4. **Troca de cor do contêiner só com cortina** (estado com `whoosh: 0` escondido atrás de um bloco da cor nova). Pare de desenhar a cortina depois da troca.
5. **Desfoque de movimento** (8 subquadros): texto grande em movimento rápido vira texto sobreposto. Mova devagar (mola de 1,6 Hz ou menos) ou tire o texto antes.
6. **A cada 2 a 4 s, algo novo.** Nada parado por mais de 2 s.
7. **Não invente interface:** nada de "Copiado", selo, data ou estado que não esteja no print. O toque é o botão afundando e o anel.
8. **Toda mola tem que assentar antes do fim do filme.** Uma mola só vale o alvo exato quando o envelope cai abaixo de 1e-5, ou seja, depois de 2,16 / f segundos (f em Hz): 8,6 s a 0,25 Hz, 5,4 s a 0,4 Hz, 0,9 s a 2,4 Hz. A respiração de 0,25 Hz que começava em 52 s deixou 236 pixels diferentes no loop; com 0,4 Hz, 0. Nos últimos 8 s, nada abaixo de 0,4 Hz.

## Tempo e som
- **Mudança de estado** começa numa batida inteira; **momento grande** cai em tempo forte (múltiplo de 4).
- **Deixas:**
  - o motor põe `click` em todo toque e `whoosh` em todo morph (`whoosh: 0` no estado = sem som; `whoosh: 0.5` = baixo);
  - o resto vai em `deixas`;
  - toda deixa cai num acerto medido da trilha (até 80 ms). Se não houver acerto, avise o diretor, que acerta a trilha.
- **Tempo de cada legenda:**
  - pílula: (ate − de) × 0,5 − 0,34 s;
  - texto dentro do contêiner: (ate − de) × 0,5 − 0,38 s;
  - mínimo: palavras ÷ 3, nunca menos de 2 s;
  - nunca duas pílulas ao mesmo tempo.
- **Valor grande e sozinho:** pelo menos 2,0 s legível.

## As passagens entre capítulos
| Batida | De → para | O que tem que bater |
|---|---|---|
| b31 | cap. 1 → cap. 2 | A faixa do endereço (1000×240) vira o cartão "Chegou na agência"; o arrasto b30–b31 é do cap. 2 |
| b56 | cap. 2 → cap. 3 | O contêiner do total (920×330, a tela a 0,9× centrada no ponto 1252 do print) vira o cartão de preço. O R$ 5,90 do total (cena: x 710, base em ~808, ~84 px) voa e vira o R$ 5,90 de 240 px. O arrasto b55–b56 é do cap. 3 |
| b84 | cap. 3 → cap. 4 | A pílula "Pagamento confirmado" termina em (540, 334), com 468×78; a tela "Retirada" a 0,74×, centrada no ponto 770,3 do print, põe a pílula exatamente ali |
| b120 = b0 | cap. 4 → cap. 1 | A cartela laranja com a logo inteira: `F.abertura` (cap. 1) desenhada pelo cap. 4 a partir do b116. **O quadro de 60 s tem que ser idêntico ao de 0 s (0 pixels diferentes).** |

## O loop de crítica (todo plano, no mínimo 3 rodadas)
1. **Trabalhe numa cópia do filme**, para um animador não quebrar o render do outro:
   - copie `filmes/11-tutorial-primeiro-acesso` inteiro para `filmes/_trabalho-capN` (a mesma profundidade, então os caminhos relativos continuam valendo);
   - edite só o `capitulos/capN.js` da cópia e renderize da cópia. Os quadros vão para `.render-tmp/_trabalho-capN/`;
   - no fim, copie o seu `capN.js` de volta para o filme principal.
2. **Em cada rodada, renderize de 3 a 5 quadros por plano** (os de `chave` e os que precisar):
   - `node render.mjs filmes/_trabalho-capN/index.html --frames t1,t2,... `, com o desfoque de movimento padrão nos quadros de movimento e `--param sub=1` nos parados;
   - `python scripts/folha.py <saída.png> <pngs> --colunas 5 --largura 360` para a folha;
   - `--celular` para a prova a 360 px.
3. **Abra as imagens e olhe.** Dê nota de 1 a 10 em:
   - gancho (o plano começa forte e prende);
   - leitura a 360 px;
   - movimento (molas, sem quique, sem velocidade constante, sem sobreposição de desfoque);
   - composição;
   - profundidade;
   - sincronia do som (as batidas das mudanças, dos toques e das deixas contra a lista e a grade medida);
   - acabamento;
   - se todo valor dá para ler.
4. **Registre em `docs/critica/capN.md`:** uma seção por rodada, com a tabela de notas por plano, os **3 maiores problemas** com o tempo exato, as correções e os arquivos dos quadros.
5. **Corrija e repita** até toda nota ser 8 ou mais, com no mínimo 3 rodadas.
6. **Não faça commit, nem render completo, nem mudanças no motor, na trilha, no `comum.js` ou em outro capítulo.** Se precisar de algo fora do seu arquivo, escreva no seu registro.
