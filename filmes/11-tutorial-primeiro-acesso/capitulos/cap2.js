/**
 * Capítulo 2: chegou e o aviso (P07-P09, batidas 31-56, 15,5-28 s). Ver docs/lista-de-planos.md e docs/GUIA-DE-ANIMACAO.md.
 * Registro da crítica: docs/critica/cap2.md.
 *
 *   P07 (b31-37)  arrasto b30-b31: no meio do gesto (b30,5) a linha real "Chegou na agência, 22/10/2026, 10:17"
 *                 (1,6x), recortada rente ao check e ao texto (sem o toco do conector), sobe dentro da faixa do
 *                 endereço por uma máscara com o retângulo do cartão, e no b31 a faixa encolhe em volta dela
 *                 (880x264); no b32 o anel abre em volta do check (o registro com foto, com o obturador) e a câmera
 *                 empurra 1,06 para ele; no b34 o anel recolhe em 0,15 s, um traço sublinha a data e a hora e a câmera
 *                 vai a 1,04; antes do b37 os recortes e o traço saem subindo pelo topo do cartão
 *   P08 (b37-47)  o aviso chega sozinho (D12), sem legenda: o cartão alarga, desce e centra na área segura livre
 *                 (y 883), e o rótulo "Aviso no WhatsApp" (60 px, tinta 2), o bloco laranja-claro e a primeira linha
 *                 do texto exato (72 px, tinta) sobem 120 px por dentro dele; no b39 o cartão cresce para baixo e
 *                 entram as outras duas linhas; a câmera respira até 1,02 a partir do b40 e o dedo entra devagar, por
 *                 baixo (b43,5). A borda esquerda fica em x 116. No toque do b47 o texto sai pela máscara e o bloco
 *                 fecha de baixo para cima
 *   P09 (b47-56)  no toque, a tela real "Detalhe da encomenda" (0,82x, print y 22-1071: 24 px de respiro em cima e
 *                 embaixo, sem fatia do cartão do total) sobe 48 px num contêiner de 960x860; um anel por vez: selo
 *                 "Aguardando" (b48), "Aguardando pagamento" (b50); arrasto b52-b53: a tela rola (lenta-rápida-lenta,
 *                 1 s) até o "Total a pagar" e o contêiner encolhe junto até a forma do cartão do print (0,9x, sem
 *                 sombra), sem deixar aparecer o cartão da carteira; anel no R$ 5,90 (b54), que recolhe até
 *                 TB(55,9), antes de o capítulo 3 fazer o valor voar
 */
(function () {
  'use strict';
  const { cor, tam, TB, M } = F;
  const { track, step, prog, clamp, easeOut, easeIn } = M;
  const U = F.u;
  /** Os anéis do U.anel recolhem em 0,3 s: depois de `tr`, o tempo corre em dobro e eles recolhem em 0,15 s. */
  const rapido = (t, tr) => (t > tr ? tr + 2 * (t - tr) : t);

  // ---------------------------------------------------------------- P07: "Chegou na agência"
  // Dois recortes do mesmo print, na mesma posição relativa: o check até o y 480 (o conector da linha do tempo
  // começa no 482) e o texto. Assim não aparece o toco do conector embaixo do check.
  const CS = 1.6;
  const CHECK = [93, 413, 67, 67];      // x 93-160, y 413-480 (o check vai de 94 a 157 e de 414 a 477)
  const TEXTO = [190, 413, 396, 110];   // x 190-586, y 413-523 ("Chegou na agência" e "22/10/2026, 10:17")
  const MEIO = [336.5, 463.5];          // centro do conteúdo no print (x 94-579, y 414-513)
  // o conteúdo anda 8 px para a direita: com o anel do check, ele fica com 44 px de folga dos dois lados do cartão de 880
  const x7 = (px) => 548 + (px - MEIO[0]) * CS, y7 = (py) => 720 + (py - MEIO[1]) * CS;
  // a máscara dos recortes é o retângulo do cartão (estado `chegou`: cena x 100-980, y 588-852). A boca de cima é o
  // topo do cartão: na saída nada é cortado no meio do cartão (a 37 px do topo, a máscara antiga cortava o check ao
  // meio). A boca de baixo é a base do cartão, dentro da faixa do cap. 1 (620-940), por onde os recortes entram
  const MASCARA = [100, 588, 880, 264];
  // a entrada: 216 px põem o topo dos recortes (y 639) abaixo da boca de baixo (852) no primeiro quadro: eles nascem
  // escondidos e sobem (com 96 px, 94 px do check já apareciam de uma vez no b30,5). Pico de 18 px por quadro (2 Hz)
  const ENTRA7 = 216;
  // a saída: 232 px levam a base do traço (y 816) para cima do topo do cartão (588). Em 0,46 s, com o easeIn
  // (inclinação final 3,2), o pico fica em ~27 px por quadro, o mesmo do texto que sai pelo a.sobe (120 px em
  // 0,24 s). Acaba em TB(37) - 0,02, antes de o conteúdo do aviso começar a subir (TB(37))
  const SAI7 = TB(37) - 0.48, DUR7 = 0.46, SOBE7 = 232;
  function chegou(ctx, t, a) {
    ctx.save(); U.cena(ctx, a);
    // os recortes entram opacos, rolando com mola (2 Hz, sem quique) por dentro da máscara, e saem subindo por ela
    const dy = ENTRA7 * (1 - step(t - a.t0, 2)) - SOBE7 * easeIn(prog(t, SAI7, SAI7 + DUR7));
    ctx.save();
    ctx.beginPath(); ctx.rect(...MASCARA); ctx.clip();
    a.img('detalhe', x7(CHECK[0]), y7(CHECK[1]) + dy, CHECK[2] * CS, CHECK);
    a.img('detalhe', x7(TEXTO[0]), y7(TEXTO[1]) + dy, TEXTO[2] * CS, TEXTO);
    // b34: o traço sob a data e a hora do registro (print x 197-475, base dos números em y 513). Fica preso ao texto
    // e sai com ele pela máscara (antes recolhia parado enquanto o texto subia, e sobrava sozinho no cartão)
    U.traco(ctx, t, TB(34), x7(197), x7(475), y7(513) + 14 + dy);
    ctx.restore();
    // b32: o anel em volta do check (o registro); fica fechado até o b34 e recolhe em 0,15 s, quando o traço abre
    // (um destaque laranja por vez)
    const r34 = TB(34) - 0.15;
    U.anelCirculo(ctx, rapido(t, r34), TB(32), x7(125.5), y7(445.5), 31.5 * CS + 14, { dura: r34 - TB(32) });
    ctx.restore();
  }

  // ---------------------------------------------------------------- P08: o aviso (tipografia do filme, sem imitar tela)
  // Cena (y): o cartão final vai de 659 a 1107 (980x448, centro 883). No b37 ele chega só com o rótulo e a primeira
  // linha (980x280, de 659 a 939) e no b39 cresce para baixo. Rótulo de 60 px com a base em 738 (36 px de respiro do
  // cartão à maiúscula); bloco de 777 até 36 px acima da base do cartão; linhas de 72 px com a base em 866, 950 e
  // 1034 (38 px do bloco à maiúscula da primeira, 37 px da base da última ao fim do bloco). O bloco fica a 32 px das
  // laterais do cartão e o texto começa em x 116. Dois tamanhos no quadro (60 e 72), sem legenda junto.
  const AV = { x: 116, rotulo: 738, topo: 777, base1: 903, bx: 82, bw: 916, r: 18, base: 36 };
  // a terceira linha mede 775 px (vai até x 891; o bloco, até 998)
  const AVISO = [
    { txt: '“Encomenda chegou, Ana!', em: 37, atraso: 0.14, y: 866 },
    { txt: 'Sua encomenda está', em: 39, atraso: 0.12, y: 950 },
    { txt: 'disponível para retirada.”', em: 39, atraso: 0.22, y: 1034 },
  ];
  function aviso(ctx, t, a) {
    ctx.save(); U.cena(ctx, a);
    // o texto sai subindo pela máscara junto com o toque do b47 (o dedo toca o aviso, que se abre no detalhe)
    const sai = TB(47) - 0.12, o = { peso: 700, ui: true };
    // a chegada: o rótulo, o bloco e a primeira linha sobem 120 px por dentro do cartão, com a mola da forma (a borda
    // de baixo do cartão, que desce, faz de máscara), a mesma gramática do recorte do P07
    const dy = 120 * (1 - step(t - TB(37), 2.4));
    a.sobe(t, a.t0, sai, 'Aviso no WhatsApp', AV.x, AV.rotulo + dy, tam.UI, Object.assign({ cor: cor.TINTA2 }, o));
    // o bloco: na chegada ele sobe inteiro, rígido com a primeira linha (a borda do cartão o recorta); depois a base
    // acompanha a base do cartão, que cresce no b39. No toque ele fecha de baixo para cima (o texto já está saindo
    // pela máscara), sem fade
    const fecha = 1 - easeIn(prog(t, TB(47) - 0.06, TB(47) + 0.1));
    const topo = AV.topo + dy, base = Math.max(AV.base1 + dy, a.c.cy + a.c.h / 2 - AV.base);
    const hb = (base - topo) * fecha;
    if (hb > 1) {
      const k = 1 - 0.04 * U.pulso(t - TB(47)), mx = AV.bx + AV.bw / 2, my = topo + hb / 2;   // o toque afunda o bloco
      ctx.save(); ctx.translate(mx, my); ctx.scale(k, k); ctx.translate(-mx, -my);
      a.fill(AV.bx, topo, AV.bw, hb, Math.min(AV.r, hb / 2), cor.CLARO);
      ctx.beginPath(); ctx.rect(AV.bx, topo, AV.bw, hb); ctx.clip();
      for (const l of AVISO) {
        a.sobe(t, TB(l.em) + l.atraso, sai, l.txt, AV.x, l.y + dy, tam.ROTULO, Object.assign({ cor: cor.TINTA }, o));
      }
      ctx.restore();
    }
    ctx.restore();
  }

  // ---------------------------------------------------------------- P09: o detalhe da encomenda (0,82x -> 0,9x no total)
  // A projeção é centrada no contêiner (540, 720): o ponto `centro` do print cai no centro, com escala `escala`.
  // Antes da rolagem, o y 22 do print fica no topo do contêiner (y 290): 24 px de respiro acima dos botões do
  // cabeçalho, e o fim (y 1071) fica 24 px abaixo da borda do cartão da linha do tempo, antes do cartão do total.
  // A rolagem é lenta-rápida-lenta (p = 3x² - 2x³) em 1 s, a partir do apoio do dedo (TB(52) - 0,03): o pico fica em
  // ~15 px por quadro (com a mola de 1,15 Hz chegava a 30, e o texto da interface saía em 4 cópias separadas no
  // desfoque de movimento). Ela para exata em TB(54) - 0,03, antes do anel do R$ 5,90 e da passagem do b56.
  const S0 = 0.82, S1 = 0.9, C0 = 22 + 430 / S0, C1 = 1252, T_ROLA = TB(52) - 0.03, D_ROLA = 1;
  const rola = (t) => { const x = clamp((t - T_ROLA) / D_ROLA); return x * x * (3 - 2 * x); };
  const escala = (t) => S0 + (S1 - S0) * rola(t);
  const centro = (t) => C0 + (C1 - C0) * rola(t);
  function detalhe(ctx, t, a) {
    ctx.save(); U.cena(ctx, a);
    // na entrada (TB(47) + 0,10) a tela sobe 48 px por dentro do contêiner, com mola de 2,4 Hz: a troca do aviso para
    // o detalhe lê como movimento no quadro em que os subquadros se misturam (antes ela saía lavada por um quadro)
    const dy = 48 * (1 - step(t - a.t0, 2.4));
    const P = U.proj(540, centro(t), escala(t), 540, 720 + dy);
    U.tela(ctx, a, 'detalhe', P);
    // um anel por vez: o do selo recolhe em 0,15 s e some no b50, quando abre o de "Aguardando pagamento"; esse some
    // em TB(52) - 0,15, antes do apoio do dedo (a tela rola), e o do R$ 5,90 abre no b54, com a tela já parada
    const r50 = TB(50) - 0.15, r52 = TB(52) - 0.3;
    U.anel(ctx, rapido(t, r50), TB(48), P.r([434, 216, 750, 298]), 41 * P.s, { pad: 10, dura: r50 - TB(48) });
    U.anel(ctx, rapido(t, r52), TB(50), P.r([93, 560, 944, 689]), 20, { pad: 14, dura: r52 - TB(50) });
    // o do R$ 5,90 abre no b54 e recolhe em 0,3 s, terminando em TB(55,9), antes do voo do cap. 3 no b56
    U.anel(ctx, t, TB(54), P.r([729, 1285, 979, 1352]), 14, { pad: 14, dura: TB(55.9) - 0.3 - TB(54) });
    ctx.restore();
  }

  // O dedo descansa fora do quadro, à direita (x 1260 > 1160: o motor não desenha). Saindo e entrando pela direita,
  // ele nunca passa por cima da pílula da legenda (embaixo, à esquerda).
  const DIREITA = (y) => [1260, y];
  F.registra({
    nome: 'Capítulo 2: chegou e o aviso',
    planos: [
      { id: 'P07', de: 31, ate: 37, chave: [30.75, 31.15, 32.8, 34.7, 36.85] },
      { id: 'P08', de: 37, ate: 47, chave: [37.25, 37.5, 39.4, 42.5, 46.6] },
      { id: 'P09', de: 47, ate: 56, chave: [47.4, 49.2, 50.6, 52.5, 53.4, 54.9] },
    ],
    estados: {
      // 880x264: a faixa de 980 encolhe no b31 e o aviso de 980 cresce e desce no b37 (as duas trocas mudam de forma)
      chegou: { cx: 540, cy: 720, w: 880, h: 264, r: 44, cor: 0, sombra: 1 },
      // o aviso chega com o rótulo e a primeira linha (topo em 659) e, no b39, cresce para baixo até centrar em 883
      aviso1: { cx: 540, cy: 799, w: 980, h: 280, r: 48, cor: 0, sombra: 1, whoosh: 0 },   // b37: buzz e pop nas deixas
      aviso: { cx: 540, cy: 883, w: 980, h: 448, r: 48, cor: 0, sombra: 1, whoosh: 0 },    // b39: pop leve nas deixas
      detalhe: { cx: 540, cy: 720, w: 960, h: 860, r: 44, cor: 0, sombra: 1 },
      // o total tem a forma do cartão do print a 0,9x, sem sombra (o aro é o do próprio print, sem cartão dentro de
      // cartão): o aro do print (x 46-1034, y 1082-1418, raio 40) cai na cena em x 95,4-984,6 e y 567,0-869,4
      total: { cx: 540, cy: 718.2, w: 889, h: 302, r: 36, cor: 0, sombra: 0, whoosh: 0 },   // o whoosh vai nas deixas (b52)
    },
    // o total encolhe junto com a rolagem, a partir do b52 (1,4 Hz: assenta exato em 1,54 s, às 27,56 s, antes do
    // b56): a borda de baixo do contêiner fica sempre acima do topo do cartão da carteira (print y 1454)
    morphs: [[31, 'chegou', 2.4], [37, 'aviso1', 2.4], [39, 'aviso', 2.4], [47, 'detalhe', 2.4], [52, 'total', 1.4]],
    conteudo: [
      // b30,5, sem atraso: o recorte sobe pela máscara no meio do arrasto, dentro da faixa do cap. 1 (o texto dela já
      // saiu no apoio do dedo), e o morph do b31 encolhe o cartão em volta dele. Sai pela máscara (saida: false)
      { de: 30.5, ate: 37, atraso: 0, saida: false, desenha: chegou },
      // atraso 0: o recorte do P07 já saiu pela máscara (TB(37) - 0,02), e o conteúdo do aviso sobe por baixo, de fora
      // do cartão, a partir da batida (sem cartão vazio entre os dois)
      { de: 37, ate: 47, atraso: 0, saida: false, desenha: aviso },
      // atraso 0,10, encostado na fronteira entre dois quadros (entre o último subquadro de um e o primeiro do
      // seguinte): nenhum quadro mistura o detalhe a 75% com o fundo (era o quadro lavado de 23,62 s)
      { de: 47, ate: 56, atraso: (Math.round((TB(47) + 0.10) * 60) - 0.5) / 60 - TB(47), desenha: detalhe },
    ],
    legendas: [
      { de: 31, ate: 37, linhas: ['A agência recebe', 'e registra com foto.'], estilo: 'pilula' },
      { de: 47, ate: 54, linhas: ['A gente recebe e te avisa.', 'Você retira.'], estilo: 'pilula' },
    ],
    cursor: {
      moves: [
        [27, DIREITA(830), 3],                       // vai para fora do quadro, à direita (invisível)
        [28.6, [1000, 900], 2.4],                    // entra e chega parado no b29,3, 40 px acima da base da faixa
                                                     // do cap. 1 (cy 780, h 320: base em 940), à direita do texto
        [30, [1000, 800], 3],                        // dela (até x 898) e de "agência" (até 947): arrasto b30-b31
        [31.15, DIREITA(800), 1.8],                  // sai
        [42, [1220, 2060], 3],                       // ainda fora do quadro, desce para o canto de baixo à direita
        [43.5, [966, 1064], 0.6],                    // entra devagar, por baixo e pela direita (0,6 Hz), e chega
                                                     // parado (~b46,1) ao canto de baixo à direita do bloco, à direita
                                                     // da terceira linha (que acaba em x 891; o dedo, em 920), sem
                                                     // cruzar texto: o plano sem legenda não fica parado 2,6 s
        [47.2, DIREITA(1040), 1.8],                  // sai depois do toque
        [50.6, [800, 1110], 2.4],                    // chega no b51,2, 40 px acima da base do detalhe, à direita
                                                     // do "Retire com o QR Code na agência" (que acaba em x 714)
        [52, [640, 853], 1.6],                       // arrasto b52-b53, para cima e para a esquerda, como o polegar:
                                                     // a 1,6 Hz o dedo ainda anda na soltura (não fica apertado e
                                                     // parado enquanto a tela rola); vai um pouco mais rápido que a
                                                     // borda do contêiner (1,4 Hz), fica sempre dentro dele e solta
                                                     // 16 px acima da base do total (869), na coluna livre entre
                                                     // "Total a pagar" (até x 350) e o R$ 5,90 (x 710-935). Com o
                                                     // y 870 da versão anterior, o centro do dedo parava na borda
        [53.6, [580, 829], 2.4],                     // desliza (sem sair) até o ponto do arrasto do cap. 3 (b55):
                                                     // chega no b54,2, 40 px acima da base do total, longe do R$ 5,90
      ],
      cliques: [47],
      arrastos: [[30, 31], [52, 53]],
    },
    // P07: no b32 (o registro com foto) a câmera empurra 1,06 para o check, que fica parado na tela (o ponto fixo
    // x = 204, y = 695 é o centro do check: 210, 691); no b34 ela vai a 1,04 e recentra na horizontal, acompanhando
    // o traço da data; no b37 volta a 1,00 (880 x 1,06 = 933 <= 1000). P08 respira até 1,02 a partir do b40 (0,6 Hz,
    // o cartão de 980 fica a 40 px da borda). P09 empurra 1,04 para o PKG-1042 (960 x 1,04 = 998; a borda de baixo
    // do contêiner, em 1150, vai a 960 + 1,04 x (1150 - 948) = 1170) e volta a 1,00 no arrasto
    camera: [
      [32, { z: 1.06, x: 521, y: 945 }, 1], [34, { z: 1.04, x: 540, y: 950 }, 0.8], [37, { z: 1, x: 540, y: 960 }, 1.2],
      [40, { z: 1.02, x: 540, y: 958.5 }, 0.6],
      [48, { z: 1.04, x: 540, y: 948 }, 1], [52, { z: 1, x: 540, y: 960 }, 1.2],   // 1 Hz: 1,04 inteiro já no anel do selo
    ],
    deixas: [
      { beat: 32, tipo: 'shutter', rotulo: 'o registro com foto (b32)' },
      { beat: 34, tipo: 'pop', ganho: 0.5, rotulo: 'traço sob a data do registro (b34)' },
      { beat: 37, tipo: 'buzz', rotulo: 'o aviso chega (b37)' },
      { beat: 37, tipo: 'pop', ganho: 0.8, rotulo: 'o aviso (b37)' },
      { beat: 39, tipo: 'pop', ganho: 0.5, rotulo: 'a segunda frase do aviso (b39)' },
      { beat: 48, tipo: 'pop', ganho: 0.5, rotulo: 'anel no Aguardando (b48)' },
      { beat: 50, tipo: 'pop', ganho: 0.5, rotulo: 'anel no Aguardando pagamento (b50)' },
      { beat: 52, tipo: 'whoosh', ganho: 0.5, rotulo: 'a tela rola até o total (b52)' },
      { beat: 54, tipo: 'pop', ganho: 0.7, rotulo: 'anel no R$ 5,90 (b54)' },
    ],
  });
})();
