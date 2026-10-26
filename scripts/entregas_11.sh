#!/usr/bin/env bash
# entregas_11.sh - as entregas do filme 11 (tutorial de primeiro acesso), depois do render final.
#   resultados/tutorial-primeiro-acesso-vertical.mp4  (o render final, que este script NÃO refaz)
#   out/teste-de-loop.mp4    duas voltas emendadas com o concat do ffmpeg (sem recodificar)
#   out/folha-de-contato.png um quadro por batida (render.mjs --sheet)
#   out/poster.png           o quadro mais forte (padrão: 29,0 s, o R$ 5,90 grande e assentado; troque com POSTER=segundos)
# Uso (na raiz do projeto): bash scripts/entregas_11.sh
set -euo pipefail
F=filmes/11-tutorial-primeiro-acesso
MP4=resultados/tutorial-primeiro-acesso-vertical.mp4
POSTER=${POSTER:-29.0}
FFMPEG=$(python -c "from importlib.machinery import SourceFileLoader as L; print(L('c','scripts/critica.py').load_module().achar_ffmpeg())")
mkdir -p out .render-tmp/11-entregas

# teste de loop: o mesmo arquivo duas vezes, emendado
printf "file '../../%s'\nfile '../../%s'\n" "$MP4" "$MP4" > .render-tmp/11-entregas/loop.txt
"$FFMPEG" -v error -y -f concat -safe 0 -i .render-tmp/11-entregas/loop.txt -c copy out/teste-de-loop.mp4

# folha de contato: um quadro por batida
node render.mjs $F/index.html --sheet
cp .render-tmp/11-tutorial-primeiro-acesso/folha.png out/folha-de-contato.png

# pôster
node render.mjs $F/index.html --frames "$POSTER"
cp ".render-tmp/11-tutorial-primeiro-acesso/t$(printf '%05.2f' "$POSTER").png" out/poster.png
ls -la out/teste-de-loop.mp4 out/folha-de-contato.png out/poster.png
