# Crítica: capítulo 4 (a agência recebe e o fim, P14–P19, batidas 64–90, 32–45 s)

Arquivo: `filmes/09-diretor/capitulos/cap4.js`. Folhas de cada rodada em `.render-tmp/09-diretor/cap4-*.png` (e `-cel` a 360 px); quadros soltos em `.render-tmp/09-diretor/cap4/<rodada>/`.
Rodadas 1 e 2 com `sub=1` (julgar forma e tempo); rodadas finais com 4 subquadros (acabamento, como no render final).
Tiras de movimento: 6 a 10 quadros a cada 0,05–0,1 s em volta de cada transformação e de cada clique.

Notas na ordem: gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento.

---

## P14: registrado com foto (b64–67, 32,0–34,0 s)

### Rodada 1 (32,2 / 32,4 / 32,6 / 33,0 / 33,8 — `cap4-p14r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 6 | 7 | 6 | 6 | 8 | 6 |

Problemas: 1) a foto pousa pequena demais (0,40) em cima das caixas da prateleira: a 360 px vira um borrão, não se lê como foto; 2) a caixa é pequena e o painel do balcão deixa 25% do contêiner vazio embaixo; 3) o "congelar" não aparece: no b65 a foto é idêntica à cena, nada diz que o instante virou foto.
Correções: caixa 360 x 236 (era 300 x 200), tampo do balcão em y = 190 (era 130) e caixa centrada sob o pin; no b65 a área enquadrada ganha fundo tingido (`LIGHT`), margem branca e borda em tinta (a foto, sem flash e sem brilho); a foto pousa a 0,56 na parede da direita.

### Rodada 2 (32,25 / 32,45 / 32,62 / 33,1 / 33,9 + tiras `p14tira1`, `p14tira2`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 8 | 7 | 8 | 7 |

Problemas: 1) a foto em trânsito cobre a caixa e os cantos da caixa aparecem embaixo como um "rabicho" (33,1); 2) a paralaxe (14/32 px) quase não se sente; 3) a foto só escorrega: falta o gesto de se soltar da cena.
Correções: a foto cresce 5% antes de sair (vem para a frente) e depois vai; paralaxe 12 px no fundo e 44 px no primeiro plano.

### Rodada 3 (32,3 / 32,56 / 33,1 / 33,6, 4 subquadros — `cap4-p14r3`; tiras `p14tira3`, `p14tira4`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

Problemas: 1) com "sobe primeiro, depois direita" a foto passava por cima do pin (33,1); 2) a escala encolhia antes de a foto andar e ela ficava parada em cima da caixa (32,95–33,05); 3) o cartão de legenda aparece 0,1 s antes do texto (é o motor, aceito).
Correções: trajetória em diagonal, com escala e posição na mesma curva (`easeInOut`): a foto sai por fora do pin e pousa em 33,35 s. Conferido na tira `p14tira4`: a caixa desliza para dentro da moldura, a moldura estala no b65 junto do shutter e a foto se solta. **Tudo ≥ 8.**

---

## P15: chegou (b68–71, 34,0–36,0 s)

### Rodada 1 (34,4 / 35,2 da `cap4-geral1`; 34,1 / 34,3 / 34,6 / 35,2 / 35,85 — `cap4-p15r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 7 | 6 | 6 | 7 | 6 |

Problemas: 1) o celular em linha clara atrás do aviso é um aramado vazio: espaço morto, não diz nada; 2) o branco do celular aparecia inteiro antes do traço (34,1: um retângulo branco "entrando" sem desenho); 3) o celular ficava atrás do contêiner, que ainda encolhia no b68.
Correções: celular em tinta embaixo à direita com a **tela inicial real** (`app-inicio.jpg`, "Sua encomenda chegou / Pagar para retirar · R$ 5,90"), que se revela de cima para baixo junto do traço; o botão "Pagar para retirar" fica onde vai estar o botão do P16, e o cursor vai até ele no b71.

### Rodada 2 (34,12 / 34,35 / 34,75 / 35,3 / 35,9 + tira `p15tira` — `cap4-p15r2`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 7 | 7 | 7 |

Problemas: 1) as ondas do buzz (camada da frente) apareciam em 34,05 em cima do balcão do P14, antes do celular (que estava atrás do contêiner); 2) o celular não vibrava: o buzz não estava no objeto; 3) aviso e celular no mesmo plano.
Correções: o celular passou para a camada da frente e sobe já no b68, junto do buzz; sacode 5 px, amortecido em 0,4 s; em primeiro plano ele sobe 22 px no plano (paralaxe contra o aviso, que só respira com a câmera).

### Rodada 3 (tira `p15tira2` 34,0–34,8; 34,15 / 34,6 / 35,3 / 35,95 com 4 subquadros — `cap4-p15r3`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 8 |

Problemas: 1) a pílula "A gente te avisa no WhatsApp." quase encosta no celular (33 px); 2) a ponta do cursor parava embaixo do botão do celular; 3) o aviso real é o PNG ampliado 2x (fica um pouco macio na 1080p; a 360 px está nítido).
Correções: celular em cx 1560 (93 px de folga); alvo do cursor em (1480, 912), que cai no botão do celular e, no b72, no quarto de baixo à direita do botão do P16. O item 3 vai para os pedidos.

### Rodada 4 (34,7 / 35,4 / 35,98 / 36,4 com 4 subquadros — `cap4-p15r4`, `cap4-cursor`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 8 |

**Tudo ≥ 8.**

---

## P16: pagar e QR (b72–75, 36,0–38,0 s)

### Rodada 1 (36,35 / 36,6 / 37,25 / 37,6 / 37,95 + tiras `p16tira1`, `p16tira2` — `cap4-p16r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 7 | 7 | 6 | 7 | 8 | 6 |

Problemas: 1) a câmera voltava devagar no b74 (mola 1,1 Hz) e a "Retirada" entrava com o "Pagamento confirmado" cortado pelo topo do quadro (37,2–37,3); 2) com o zoom, "Total a pagar R$ 5,90" ficava cortado na borda de cima; 3) o recuo 2,75 → 1,9 e o anel no QR chegavam tarde: o QR inteiro com anel só aparecia 0,05 s antes da transformação seguinte.
Correções: tela a 2,35x e câmera a 1,2 (o botão fica com 56 px) em y = 720, com o "Total a pagar R$ 5,90" inteiro em cima; volta da câmera no b74 com mola 2,2 Hz, junto com a transformação; a "Retirada" entra a 2,8x ("Pagamento confirmado" com 56 px e a metade de cima do QR) e respira até 2,55x; no b75 (o pop da confirmação) o anel laranja pula do botão para o "Pagamento confirmado"; `c4_qr` com 960 de altura.

### Rodada 2 (36,4 / 36,75 / 37,2 / 37,65 / 37,95 + tira `p16tira3` — `cap4-p16r2`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 7 | 9 | 7 |

Problemas: 1) no deslize de entrada aparecia um pedaço do título "Retirada" (37,14); 2) a tela a 2,8x mostra a compressão do JPG de 540 px; 3) o contêiner some pelo topo durante o zoom no botão (é o empurrão para dentro da superfície; aceito).
Correções: o recorte da "Retirada" começa na linha 84 do arquivo (do "confirmado" para baixo). O item 2 vai para os pedidos.

### Rodada 3 (36,35 / 36,6 / 37,3 / 37,9 com 4 subquadros — `cap4-p16r3`; tira do cursor `cap4-cursor`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 8 |

O cursor chega parado meia batida antes do clique (36,3 s), com a ponta no quarto de baixo à direita do botão, sem cobrir o texto; o clique (36,51) afunda o botão real e o anel se desenha a partir do canto do cursor. **Tudo ≥ 8.**

---

## P17: retira, tranquila (b76–79, 38,0–40,0 s)

### Rodada 1 (38,6 / 39,3 da `cap4-geral1`; 38,3 / 38,6 / 39,1 / 39,4 / 39,75 — `cap4-p17r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 7 | 8 | 6 | 7 | 7 | 7 | 5 |

Problemas: 1) o braço vindo de cima à direita, longo e reto, parece uma tábua; 2) em 39,1 há dois braços na tela (o celular ainda não saiu quando o braço chega na caixa); 3) o celular vinha de cima e o braço de lado: direções brigando.
Correções: braço vindo do primeiro plano (embaixo, à direita: o lado da personagem, de frente para o balcão), afinando; o celular vem de lá e volta para lá; o celular sai em b77 + 0,24 a 0,56, antes de o braço alcançar a caixa (b78 + 0,06); o check fica entre a caixa e o celular.

### Rodada 2 (38,3 / 38,6 / 39,1 / 39,4 / 39,65 — `cap4-p17r2`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 8 | 8 | 7 | 5 |

Problemas: 1) a mão desenhada (palma + polegar) não se lê: um "C" aberto e um polegar que parece pílula; 2) a mão fica solta da manga, que some atrás do objeto; 3) a caixa só ganha velocidade em 39,7, e o whoosh cai em 39,5.
Correções: tirei a mão. O braço agora é manga, barra do punho e um pulso mais fino que entra **por trás** do objeto (a mão fica escondida, como quem segura por trás): limpo e sem nada fofo. A saída da caixa usa `easeInOut` de b78 + 0,46 a b79 + 0,46, com a maior velocidade no b79, onde cai o whoosh.

### Rodada 3 (38,35 / 38,6 / 38,95 / 39,3 / 39,6 + tiras `p17tira1`, `p17tira2` — `cap4-p17r3`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 8 | 8 |

Problemas: 1) o braço sai do contêiner pela direita antes da caixa (ele é recortado pela forma; aceito, é coerente); 2) o check some encolhendo no b78 (é a saída dele); 3) entre 38,0 e 38,13 o contêiner fica branco vazio (é a troca de conteúdo do motor).

### Rodada 4 (38,4 / 38,75 / 39,3 / 39,6 com 4 subquadros — `cap4-p17r4`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

O check entra com a curva `confirm` (o único uso no capítulo) no b77, junto do pop; a caixa sai desfocada pelo movimento no whoosh do b79. **Tudo ≥ 8.**

---

## P18: a assinatura (b80–87, 40,0–44,0 s)

### Rodada 1 (40,6 / 41,6 / 42,6 / 43,0 / 43,7 + tira 39,95–41,3 — `cap4-p18r1`, `cap4-p18tira1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 7 | 7 | 7 | 7 | 7 | 6 |

Problemas: 1) em 41,3 a frase entra embaixo do logo, que ainda está descendo de tamanho: colisão; 2) o logo começa no b80 em cima dos restos do P17 (0,1 s de lama: traço sobre laranja-claro); 3) a lista ficou alta demais (4 x 228 px) e a última linha saía do quadro.
Correções: passo da lista 206 px (entrelinha 90), centrada, rolando de +24 a -24 px; o logo sobe em 0,5 s e a frase entra em b82 + 0,34 / + 0,41, com o lugar já livre; o conteúdo do P18 entra 80 ms depois do thump, com a cartela já laranja.

### Rodada 2 (tiras `p18tira2` 41,0–42,7 e `p18tira3` 42,8–44,1)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 7 | 7 | 7 | 8 | 7 |

Problemas: 1) a lista começava a entrar com o bloco ainda no centro (sobreposição em 42,3); 2) na volta, o bloco passava por cima da lista que ainda saía (43,2); 3) a lista inteira fica visível muito pouco tempo.
Correções: o bloco desliza com `easeOut` no whoosh (sai rápido e assenta; libera a direita em 0,15 s); a lista entra em b84 + 0,12, de 0,08 em 0,08 s, e sai em b86 - 0,13 (de cima para baixo), antes de a borda do bloco chegar. O item 3 vai para os pedidos.

### Rodada 3 (tira `p18tira4` 42,05–43,15; 40,5 / 41,7 / 42,7 / 43,6 / 43,95 com 4 subquadros — `cap4-p18r3`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 8 | 8 | 8 | 8 | 9 | 8 |

Logo branco a 52% (998 px), de 96% a 100% e opacidade em 650 ms (a única entrada com opacidade); depois, só máscara e deslize. Dois tamanhos por quadro: 96 (frase) com 84 (lista ou endereço). Branco só em 84–96 px, peso 800. Fica o limite do tempo da lista (ver pedidos). **Tudo ≥ 8.**

---

## P19: a volta ao começo (b88–89, 44,0–45,0 s)

### Rodada 1 (tira 44,0–45,0 — `cap4-p19r1`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 8 | 7 |

Problemas: 1) em 44,10–44,13 o quadro passa por um laranja-claro com o logo esmaecendo (troca de cor do contêiner com mola de 5 Hz + saída do conteúdo do P18); 2) o `F.gancho` precisa receber a mesma API que tem em t = 0 (se o capítulo 1 usar `a.t0`, com o `a` do capítulo 4 ele não apareceria); 3) com 4 subquadros, o último quadro precisa ter o mesmo desfoque de movimento do primeiro.
Correções: o `F.gancho` recebe um `a` com `t0`/`t1`/`k` da camada do P01 (lidos do capítulo 1, então seguem se ele mudar o `atraso`) e o tempo `t - 45` encaixado nos mesmos instantes de subquadro que o motor usa em t = 0 (antes disso fica parado na pose do primeiro quadro). O item 1 dura 2 quadros; aceito.

### Rodada 2 (44,12 / 44,25 / 44,5 / 44,98 com 4 subquadros — `cap4-p19r2`)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 8 | 8 |

O traço do gancho (o capítulo 1 já aceita o `p`) se desenha de 44,13 a 44,7 s e para inteiro. As faixas de cinema voltam pelo motor.

### Rodada 3 (conferência do loop: `--frames 0,45`, 44,9833 e 44,75)
| gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|
| 8 | 9 | 8 | 8 | 8 | 9 | 8 |

- `python scripts/folha.py --compara t00.00.png t45.00.png` → **0 pixels diferentes de 2 073 600; maior diferença 0.**
- 44,983 contra 0: 28 235 pixels, diferença máxima 90, em x 106–1821, y 178–899: é só o passo de um quadro da câmera na mão, que o GUIA prevê.
- Nenhuma legenda depois da 88; cursor fora do quadro desde o b74 (o `[87, [2060, 1220], 2.6]` fica como confirmação); câmera em `{ z: 1, x: 960, y: 540 }` desde o b74, assentada antes da 88. **Tudo ≥ 8.**

---

## Resumo

### Notas finais
| Plano | Rodadas | gancho | leitura 360 | movimento | composição | profundidade | sincronia | acabamento |
|---|---|---|---|---|---|---|---|---|
| P14 | 3 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P15 | 4 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |
| P16 | 3 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |
| P17 | 4 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P18 | 3 | 8 | 8 | 8 | 8 | 8 | 9 | 8 |
| P19 | 3 | 8 | 9 | 8 | 8 | 8 | 9 | 8 |

### Quadros-chave para a folha de contato do diretor
| Plano | Tempo | O que mostra |
|---|---|---|
| P14 | 32,60 s | a foto: o instante congelado na moldura, logo depois do shutter |
| P15 | 35,40 s | "Sua encomenda chegou!" + o celular com a tela inicial real + a pílula |
| P16 | 36,60 s | o toque no "Pagar R$ 5,90 e gerar QR Code", com o anel laranja |
| P17 | 38,75 s | o celular com o QR no balcão e o check |
| P18 | 42,75 s | bloco da marca à esquerda e a lista real à direita |
| P19 | 44,98 s | o gancho inteiro, igual ao primeiro quadro |

Folha: `.render-tmp/09-diretor/cap4-final.png` (e `cap4-final-cel.png`).

### O que mudou na decupagem, e por quê
- **`c4_aviso`** 1362 x 252, r 84, em cy 330 (era 1180 x 220, r 110, cy 400): é a notificação real a 2x, com o texto em 84 px (o mesmo corpo da legenda); o contêiner assume a forma exata do PNG (raio 42 px do arquivo x 2), então o contêiner é a notificação.
- **`c4_pagar`** 1269 x 960, no centro (era 900 x 980 em cx 1240): a tela real a 2,35x, recortada nas linhas 544–952. Com a câmera a 1,2 o texto do botão fica com 56 px. Em 900 px de largura ele ficaria com 33 px.
- **`c4_qr`** 860 x 960, no centro (era 820 x 900 em cx 1240): a "Retirada" a 2,8x para o "Pagamento confirmado" ter 56 px.
- **Câmera:** o zoom no botão é 1,0 → 1,2 (a lista dizia 1,3), porque a escala da tela faz o resto e a 1,3 o "Total a pagar R$ 5,90" saía do quadro. Acrescentei o recentro no b64, a leve aproximação no P14 (1,035), a respiração no P15 (1,02) e a volta firme no b74 (2,2 Hz, junto da transformação). Todas as molas assentam antes de 45 s.
- **b75:** o anel pula para o **"Pagamento confirmado"** em vez do QR. O pop do b75 é a confirmação, e não cabe, em 1 s, o "confirmado" legível (56 px) e o QR inteiro: o QR inteiro aparece no P17, na tela do celular.
- **Cursor:** `[64, fora]` (o cursor que o capítulo 3 deixa em (1780, 980) apareceria no balcão); `[71, (1480, 912)]`, que cai no botão "Pagar para retirar" do celular do P15 e, no b72, no botão do P16 (a mesma posição na cena); `[74, fora]` em vez de `[74, (1640, 960)]`, que deixaria o cursor parado em cima da cartela até o b87. O `[87, fora, 2,6]` ficou e não muda nada.
- **Deixas:** acrescentei o **whoosh do b79** (está na lista de planos e faltava no esboço), com ganho 0,5 e pan de 0,3 a 0,8, e os pans: shutter 0,05, buzz 0,55, pop do check 0,3, whoosh do bloco de 0 a -0,4. Batidas de morphs, clique, legendas e deixas: todas mantidas.
- **P15:** acrescentei o celular da personagem (camada da frente) com a tela inicial real (`assets/09/app/app-inicio.jpg`, novo ativo `inicio`).
- **P18:** o conteúdo entra com `atraso` de 0,08 s (o logo começa com a cartela já laranja).
- **P19:** o `F.gancho` recebe `t - 45` encaixado nos subquadros (≈ 0) em vez de 0 literal, e a API do P01. Isso garante o mesmo desfoque de movimento na emenda.

### Pedidos ao diretor
1. **Tempo da lista (P18).** Entre o b84 e o b86 a lista tem 1 s; inteira, ela fica legível só uns 0,3 s (cada item, de 0,5 a 0,8 s). Proposta: frase no b81, lista no b83 (o whoosh vai para o b83) e volta com o endereço no b86. A lista ganha 1,5 s. Não mudei porque mexe nas batidas da decupagem.
2. **Capturas com mais resolução.** `app-tela-encomenda.jpg` e `app-tela-retirada.jpg` têm 540 px de largura e aparecem a 2,8x: em 1080p dá para ver a compressão do JPG. O `aviso-chegou.png` aparece a 2x. Se der, recapturar essas telas em PNG com 1080 px de largura, e o aviso a 6x.
3. **`cues.json`:** não rodei `--cues`, porque o arquivo não é meu. É preciso regenerar para entrar o whoosh do b79 e os pans novos.
4. **Contrato do loop:** o capítulo 4 só redesenha o que está dentro do `F.gancho`. Se o capítulo 1 puser no P01 alguma camada de `fundo` ou `frente` visível em t = 0, ela não aparece em t = 45 e a conferência quebra. Peço que o P01 fique todo dentro do `F.gancho`. Hoje está assim: 0 pixels diferentes.
