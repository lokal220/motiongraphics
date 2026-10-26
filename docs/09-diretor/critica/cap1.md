# Registro de crítica: capítulo 1 (gancho e correria, P01–P05, batidas 0–24)

Arquivo: `filmes/09-diretor/capitulos/cap1.js`. Fase 1: quadros parados de cada plano + crítica.

Como foi revisado:
- Quadros nos tempos `chave` de cada plano (batidas convertidas pela grade medida, a mesma regra do `F.TB`). Rodadas 1 e 2 com `sub=1`; rodada 3 com `sub=4` (o desfoque do render final), para julgar o acabamento.
- Toda rodada olhada também na folha `--celular` (360 px por quadro).
- Tiras de 10 quadros, a cada 0,05–0,2 s, em volta de cada transformação e de cada clique: b0–b1, b2, b4–b5, b6–b7, b8–b10, b12–b15, b16–b17, b17–b21.
- Uma folha com um quadro por batida (b0,35 … b23,35) para ler o capítulo inteiro de uma vez.
- Folhas em `.render-tmp/09-diretor/cap1-*.png` (e `-cel`); quadros soltos em `.render-tmp/09-diretor/cap1/<rodada>/`.

Notas: gancho · leitura a 360 px · movimento · composição · profundidade · sincronia do som · acabamento.

---

## P01: gancho, ninguém em casa (b0–3)

### Rodada 1 (`cap1-p01-r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 7 | 7 | 6 | 6 | 8 | 6 |

Problemas:
1) O bolso de vivo inclinado parece uma prateleira com um celular em cima. A metade direita não se lê como jaqueta: o tecido em `LIGHT` some no branco e os pespontos tracejados viram ruído.
2) As ondas do interfone são pequenas: raio máximo de 162 px e arcos curtos. No celular mal aparecem, e elas são o evento principal do gancho.
3) Em t = 0 a metade direita é um vazio com um celular pequeno. Quando a notificação pousa, cobre o celular.

Correções:
- **Jaqueta de verdade:** tecido em `LINE`, zíper com dentes e puxador, recorte do peito com pesponto e bolso chapado (bainha, pesponto e dois rebites).
- **Espaço para as ondas:** a porta foi mais para a esquerda e ficou mais estreita (288 px). As ondas agora vão de 70 a 242 px de raio e se recolhem pelas pontas, sem fade.
- **Celular:** maior (196 px de largura).

### Rodada 2 (`cap1-p01-r2`, `cap1-p01-r2b`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 7 | 7 | 9 | 7 |

Problemas:
1) Na r2 a notificação pousava sobre o alto do celular e parecia uma placa num poste. Com o bolso mais baixo (r2b), a tela acesa virou um retângulo vazio.
2) Depois que a notificação pousa (b2,5–b4), a metade direita congela: a jaqueta de quem anda pela cidade fica parada.
3) Tudo está num plano só, exceto a cadeira atrás do vidro.

Correções:
- **Bolso e celular mais baixos** (boca do bolso em y 100, topo do celular em −46). A notificação pousa acima do celular, sem encostar.
- **Tela acesa:** mostra o mesmo ícone da notificação.
- **A jaqueta anda:** sobe e desce um passo por batida (6 px). A curva é 1 − cos e parte do repouso no "ding", então t = 0 continua parado e o loop não salta. Um lugar se mexe e o outro fica parado, e isso dá a profundidade.
- **Origem da notificação:** ela sai de onde o celular está naquele instante.

### Rodada 3 (`cap1-p01-r3`, sub=4; tiras `cap1-p01-tira-b0`, `cap1-p01-tira-b2`; teste `cap1-gancho-p`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

Problemas:
1) No desenho progressivo (p < 1, que o capítulo 4 usa), o celular aparecia inteiro abaixo do bolso até o miolo do bolso fechar: um "pop".
2) Em t = 0 sobra um branco entre o interfone e o zíper. É o lugar das ondas e fica vazio só no primeiro quadro.
3) A linha do recorte do peito passa atrás da borda esquerda da notificação.

Correções:
- **Recorte do celular:** fica sempre acima da boca do bolso. Testado `F.gancho(ctx, 0, a, p)` com p = 0; 0,15; 0,35; 0,6; 0,85; 1: sem erro, sem pop. O tecido entra por máscara deslizante e o resto por traço.
- **Mantidos de propósito:** o branco do item 2 (é o silêncio que as ondas ocupam) e a linha do item 3 (fica atrás da notificação, como deve).

Sincronia (tiras):
- **Ondas:** começam no primeiro quadro depois de TB(0) = 0,016 s e recomeçam em TB(1) = 0,516 s.
- **Botão:** fica "aceso" do "ding" até a cauda do "dong".
- **Vibração:** os dois pulsos (1,016–1,166 s e 1,236–1,386 s) batem com os do buzz do `sfx.mjs`.
- **Notificação:** sai do celular em hit(b2). O título sobe a +0,14 s e o corpo a +0,21 s.

Contrato do loop:
- **t = 0:** inteiro e parado, sem cursor e sem legenda (`cap1/loop/t00.00.png`). As subamostras de t = 0 (±6 ms) caem antes de TB(0), então nada se mexe.
- **Costura:** `--frames 0,45` com o capítulo 4 de agora dá **0 pixels diferentes**.

---

## P02: metrô (b4–7)

### Rodada 1 (`cap1-p02-r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 8 | 7 | 7 | 7 | 8 | 6 |

Problemas:
1) A cabeça dela saiu transparente: a janela aparecia através dela. Era erro de ponto flutuante na cascata (`fase` dava 0,9999…, e o miolo só entra com 1).
2) As janelas em `INK2` são blocos escuros pesados que brigam com a notificação.
3) Do clique (b6) ao corte (b8), só as faixas de luz andam. O braço erguido é um tubo grosso e mole.

Correções:
- **Cascata:** `fase` arredonda para 1 acima de 0,9999.
- **Janelas:** túnel em `MUTED` com faixas `LIGHT`.
- **Braço:** de 44 para 34 px.
- **Tranco no b7** (no aro da música): as alças e o corpo dela balançam juntos com um impulso, sem quique.

### Rodada 2 (`cap1-p02-r2`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 7 |

Problemas:
1) O cotovelo ainda abre demais, e o braço parece borracha.
2) O afundar da notificação no toque é sutil (3%).
3) A cabeça encosta na borda da primeira janela.

Correções:
- **Cotovelo:** mais perto do corpo.
- **Toque:** o afundar continua sutil (sem quique), porque a leitura do toque vem do texto passando de tinta para tinta 2 em 0,2 s.
- **Cabeça na janela:** mantida, porque a sobreposição dá profundidade.

### Rodada 3 (`cap1-p02-r3`, sub=4; tiras `cap1-tira-b4`, `cap1-tira-b6`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 8 |

Problemas: 1) O braço segue simples, mas lê como braço segurando a alça. 2) As alças à direita são repetitivas. 3) Nada novo: o tranco do b7 preenche o meio do plano.

Sincronia:
- **Transformação:** o corte do fundo e o morph caem juntos em TB(4) = 2,016 s, e o conteúdo do P01 sai em 0,12 s.
- **b5:** o ícone se desenha a +0,12 s e a frase sobe em TB(5) (pop + buzz), com a linha tremendo nos dois pulsos.
- **b6:** o clique cai em TB(6) = 3,016 s e o texto escurece logo depois.
- **b7:** o tranco entra em TB(7).

---

## P03: trabalho (b8–11)

### Rodada 1 (`cap1-p03-r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 8 | 7 | 6 | 6 | 8 | 6 |

Problemas:
1) A cabeça dela fica exatamente na linha da mesa: parece uma cabeça em cima da mesa.
2) Ela é pequena, o primeiro plano é fraco e a profundidade é pouca.
3) O canto de baixo à esquerda fica vazio.

Correções:
- **Personagem:** escala 1,1 → 1,3, mais perto de nós.
- **Mesa:** desce (770 → 800) e passa atrás dos ombros dela.
- **Notebook:** vai para a direita.

### Rodada 2 (`cap1-p03-r2`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 8 |

Problemas:
1) O relógio é o único movimento do fundo, mas anda dez minutos a cada batida, no tique da trilha, e isso basta.
2) A tela do notebook é genérica.
3) A divisória se desenha enquanto a pilha cresce: está certo, só registro.

Correções: nenhuma estrutural. Conferido que a mão do relógio pula com mola firme (6 Hz), sem quique.

### Rodada 3 (`cap1-p03-r3`, sub=4; tira `cap1-tira-b8`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 8 |

Problemas: 1) A cabeça sem detalhe nenhum: é o certo (nunca rosto). 2) A caneca e os papéis são pequenos no celular: são detalhe. 3) Nenhum crítico.

Sincronia:
- **b8:** o corte cai em TB(8) = 4,016 s. A pilha cresce para baixo com o topo fixo em y = 200, e a divisória e o ícone se desenham.
- **b9:** a frase sobe em TB(9).
- **b10:** o clique cai em TB(10) = 5,016 s e o texto escurece. O cursor sai em b9 e chega parado.

---

## P04: rua (b12–15)

### Rodada 1 (`cap1-p04-r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 8 | 6 | 7 | 7 | 8 | 7 |

Problemas:
1) O ônibus passa escondido atrás da pilha e da personagem. Só aparecem rodas, e não se lê ônibus.
2) A personagem à direita tampa justamente a entrada do ônibus.
3) O semáforo à esquerda não acrescenta nada.

Correções:
- **Personagem:** vai para a esquerda.
- **Semáforo:** vai para a direita, na frente do ônibus (oclusão).
- **Ônibus:** ganha para-brisa, letreiro vazio (sem marca) e farol. Entra pela direita no b12, então a frente aparece entre a pilha e o semáforo em b12,5–13.

### Rodada 2 (`cap1-p04-r2`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 9 | 9 | 8 |

Problemas:
1) Com a pilha de três, a rua fica numa faixa estreita embaixo.
2) Os prédios ao longe quase somem atrás da pilha.
3) A faixa de pedestres fica rente à faixa de cinema.

Correções: nenhuma estrutural. A pilha é o assunto, e a rua vive nas bordas: ônibus, semáforo e as costas dela andando, um passo por batida.

### Rodada 3 (`cap1-p04-r3`, sub=4; tira `cap1-tira-b12`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 9 | 9 | 8 |

Problemas: 1) O ônibus some atrás da pilha no meio do plano, de propósito (profundidade). 2) A alça da bolsa é um traço só. 3) Nenhum crítico.

Sincronia:
- **b12:** o corte cai em TB(12) = 6,016 s.
- **b13:** a terceira frase sobe em TB(13).
- **b14:** o clique cai em TB(14) = 7,016 s.
- **b15:** o cursor sai e para fora do quadro, atrás da faixa de baixo, até o capítulo 2 chamá-lo.

---

## P05: o pacote volta (b16–23)

### Rodada 1 (`cap1-p05-r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 6 | 6 | 5 | 5 | 6 | 7 | 6 |

Problemas:
1) A pilha comprimida no canto de cima à esquerda lê como **etiqueta de canto** (proibido). As camadas não aparecem (são duas linhas), e as janelas do prédio, por baixo, parecem mais cartões.
2) A rua acompanhava com uma mola de 0,42 Hz a partir do b17, mais rápida que a van no começo. Por quase 1 s a van parecia andar para trás.
3) O vão aberto com a caixa ficava à vista só ~0,1 s: o escuro de dentro só fechava depois do b17.

Correções:
- **Pilha no lugar:** no b16, as três linhas saem do contêiner como cartões (o contorno se desenha) e se comprimem ali mesmo, no centro e no alto, acima da van. A mais nova fica na frente; as mais velhas ficam atrás e acima, com só a borda à mostra (degrau de 32 px). No b20 apertam para 20 px.
- **A rua presa à distância da van:** −240 · (1 − e^(−x/600)). Acompanha a 40% e para, sem passar da van.
- **A van se desenha inteira em 0,22 s:** a caixa fica à vista no vão escuro até a porta fechar (b17 + 0,04 a + 0,34) e continua visível pela janela da porta enquanto a van vai embora.

### Rodada 2 (`cap1-p05-r2`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 7 | 8 | 8 | 7 |

Problemas:
1) Durante a compressão (b16,2–16,6), a pilha passa por cima da van que ainda se desenha. Fica embolado.
2) A frase da pilha fica com 66 px (12 px no celular), no limite.
3) Depois que a van sai, o céu fica vazio.

Correções:
- **Compressão mais rápida:** a mola vai de 1,7 para 2,2 Hz e assenta antes de a van fechar.
- **Mantidos:** o item 2, porque é a mesma frase lida a 84 px meio segundo antes e o cartão encolhe de propósito (comprimir), e o item 3, porque a van leva a caixa e deixa o problema sozinho sobre a rua.

### Rodada 3 (`cap1-p05-r3`, sub=4; tiras `cap1-tira-b16`, `cap1-tira-b17`; folha por batida `cap1-batidas`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 8 | 8 |

Problemas:
1) Depois da rua andar, o poste ficava embaixo da ponta direita da pilha.
2) Em b16,8 o prédio ainda está se desenhando: é a entrada, está certo.
3) O traço do boné cruza a cabeça do motorista. No celular não se vê.

Correções:
- **Poste:** de 760 para 800 px. Depois de a rua andar, ele fica fora da pilha (conferido na folha por batida).

Sincronia:
- **b16:** os cartões se soltam em TB(16) = 8,015 s, com o whoosh da transformação. O fundo da rua corta exato no b16.
- **b17:** a porta fecha em b17 + 0,04–0,34 e a van parte em b17 + 0,35 (o whoosh longo do b17 cobre a porta e a partida). Ela sai do quadro perto do b23.
- **Rua:** para por volta do b21.
- **b20:** a pilha aperta no tempo forte.

---

## Notas finais

| Plano | gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento | Rodadas |
|---|---|---|---|---|---|---|---|---|
| P01 | 8 | 8 | 8 | 8 | 8 | 9 | 8 | 3 |
| P02 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 3 |
| P03 | 8 | 9 | 8 | 8 | 8 | 9 | 8 | 3 |
| P04 | 8 | 9 | 8 | 8 | 9 | 9 | 8 | 3 |
| P05 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 3 |

**Quadros-chave para a folha do diretor** (`cap1-chave.png`, sub=4, sem guia):

| Plano | Batida | Tempo | O que mostra |
|---|---|---|---|
| P01 | b3,5 | 1,766 s | portaria + bolso, notificação pousada |
| P02 | b5,6 | 2,816 s | "Saiu para entrega" no metrô |
| P03 | b9,6 | 4,816 s | duas notificações, relógio |
| P04 | b13,6 | 6,816 s | três notificações, ônibus passando |
| P05 | b18,5 | 9,266 s | a van indo embora com a caixa na janela, a pilha acima |

**O que mudou na decupagem, e por quê:**
- **`c1_notif2` e `c1_notif3`:** o cy foi de 380 para 390 e de 460 para 480. Assim o topo do contêiner fica em y = 200 do gancho até a pilha de três, e a pilha cresce só para baixo (uma linha de 180 px por notificação). As linhas antigas não se mexem quando chega a nova. Os tamanhos não mudaram.
- **Ordem da pilha:** a mais nova entra **embaixo**. A pilha se lê como a história, de cima para baixo ("Saiu para entrega" → "Ninguém para receber" → "Nova tentativa amanhã").
- **Cursor:** os alvos foram de (1460, 340/420/500) para (1462, 346/526/706), com molas 2,2/2,4/2,4. A ponta fica à direita e abaixo de cada frase. As batidas de saída (5, 9, 13, 15) e os cliques (6, 10, 14) não mudaram.
- **P05, pilha:** não fica "num canto do quadro", porque leria como etiqueta de canto (proibido no CLAUDE.md). Ela se comprime no lugar, no alto e no centro, acima da van.
- **P05, pan:** o "pan curto" foi feito **dentro do contêiner** (a rua acompanha a van e para), não na câmera global. Assim a câmera não fica deslocada quando o capítulo 2 entra no b24 com uma mola lenta (0,15 Hz).
- **Deixas:**
  - o whoosh do b17 ("a van sai") passou de pan 0,2 → −0,6 para 0,1 → 0,7, porque a van vai para a direita;
  - o buzz e o pop do b2 ficaram em 0,35 e 0,3, onde estão o celular e a notificação.
- **Mantidos:** as batidas dos morphs (4, 8, 12, 16 a 1,6 Hz), os cliques, a câmera e as demais deixas.

## Pedidos ao diretor
1. **Fundo com corte seco no fim:** com `saida: false`, o motor desenha a camada até TB(ate) + 0,14 s. Para o corte da rua cair exato no b16, a função `rua` volta sem desenhar a partir de TB(16). Se outros capítulos precisarem, vale uma opção `saida: 'corte'` no motor (some em TB(ate)). Não é bloqueante.
2. **Cursor "polegar" no antes (opcional):** o guia diz que, no "antes", o cursor é o polegar da personagem, mas o motor desenha a seta em todo o filme. Se quiser, um `cursor.estilo` por faixa de batidas (por exemplo, a ponta de dedo redonda até a 44 e a seta depois). Hoje funciona com a seta.
3. **Processo:** a pasta de rascunho é a mesma para os quatro capítulos, e um `r.sh` de outro capítulo sobrescreveu o meu. Passei a usar uma subpasta `cap1/`. Recomendo uma subpasta por capítulo.
4. **Para o capítulo 4:** `F.gancho(ctx, 0, a, p)` foi testado com p de 0 a 1 sem erro.
   - Com p = 1 chega exatamente na pose de t = 0.
   - Não usa nada de `a` além de `pen`, `path`, `fill`, `texto` e `sobe`. O `sobe` nem é chamado em t = 0.
