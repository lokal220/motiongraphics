# Modelos dos documentos (motion-reel)

## docs/guia-de-estilo.md (só quando existe referência)
O guia descreve **como** a referência conta, nunca **o que** ela conta. Pegue a gramática, nunca o conteúdo.

Os números saem dos quadros:
- extraia um quadro a cada 0,5 s com o ffmpeg;
- meça as cores agrupando os pixels;
- meça os cortes com a diferença entre quadros.

Marque cada número como "medido" ou "estimado".

1. **Estrutura em atos:** tempo, duração, % e a gramática de cada ato. Diga a regra por trás.
2. **Paleta (hex):** a da referência, medida, e a tradução para as cores da marca (papel por papel).
3. **Tipografia:** família, pesos, tamanhos e espaçamento da referência, e a tradução para as fontes da marca, com a escala a 1080p pensada para 360 px.
4. **Duração dos planos:** cortes medidos, de onde vem o ritmo e as proporções a manter.
5. **Transições:** cada tipo e quando aparece.
6. **Câmera:** movimentos e o que nunca acontece.
7. **Textura e grão:** inclusive o volume da referência em LUFS.
8. **Como o texto entra e sai.**
9. **Conflitos com as regras do estúdio e com a marca:** uma tabela com o que a referência faz, a regra e a proposta.

Sem referência, use a seção de motion do guia da marca, se houver, ou as regras do estúdio.

## docs/lista-de-planos.md (na grade de batidas; mostre e espere o OK)
Cabeçalho: duração, formato, fps, BPM, número de batidas e de quadros, e as **decisões que precisam do usuário**. Para cada uma, dê um padrão: "se não responder, sigo com...".

| # | Plano | Tempo | Batidas | Quadros | Imagem (o que se vê) | Câmera | Texto | Som |
|---|---|---|---|---|---|---|---|---|
| P01 | Gancho | 0,0–2,0 | 0–3 | 0–119 | o contêiner, a interface real usada, o cursor | empurrão / respiração / parada | as frases exatas | música e efeitos (click, pop, whoosh, thump…) com a batida de cada um |

Depois da tabela, inclua:
- **Recompensas visuais:** uma lista com o tempo de cada coisa nova, a cada 3 a 5 s no máximo.
- **Capítulos:** se for dividir entre subagentes.
- **Entregas.**

## docs/registro-de-critica.md
- **Uma seção por rodada:** a tabela de notas, os 3 maiores problemas com o tempo exato, as correções e os arquivos dos materiais.
- **Planos:** com a parte A, um bloco por plano (em `docs/critica/capN.md` quando houver subagentes).
- **Diretor:** na parte B, a tabela de rodadas R0, R1… do filme inteiro.

## README (na entrega)
- O filme em uma linha e as entregas (arquivo e o que é).
- Como ele é feito: motor, capítulos, trilha, assets reais.
- Como refazer do zero: os comandos na ordem.
- O que melhoraria em seguida.
