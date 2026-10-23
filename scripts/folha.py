"""Folha de contato de quadros soltos, a prova de leitura no celular e a comparação de dois quadros.

Uso:
    python scripts/folha.py saida.png q1.png q2.png ... [--colunas 4] [--largura 480] [--celular]
        monta a folha (o nome de cada arquivo vira a legenda); com --celular, cada quadro sai com
        360 px de largura, o tamanho de um vídeo 16:9 na tela de um celular em pé
    python scripts/folha.py --compara a.png b.png
        diz quantos pixels diferem entre dois quadros e a maior diferença (para conferir o loop)
"""
import argparse
import os

import numpy as np
from PIL import Image, ImageDraw


def compara(a, b):
    x = np.asarray(Image.open(a).convert("RGB")).astype(int)
    y = np.asarray(Image.open(b).convert("RGB")).astype(int)
    if x.shape != y.shape:
        raise SystemExit(f"tamanhos diferentes: {x.shape} e {y.shape}")
    d = np.abs(x - y).max(axis=2)
    print(f"pixels diferentes: {int((d > 0).sum())} de {d.size}; maior diferença: {int(d.max())}")
    if (d > 0).any():
        ys, xs = np.nonzero(d)
        print(f"região: x {xs.min()}-{xs.max()}, y {ys.min()}-{ys.max()}")


def folha(saida, arquivos, colunas, largura):
    ims = [Image.open(f).convert("RGB") for f in arquivos]
    h = round(largura * ims[0].height / ims[0].width)
    rot = 22
    cols = min(colunas, len(ims))
    linhas = -(-len(ims) // cols)
    sheet = Image.new("RGB", (cols * (largura + 10) + 10, linhas * (h + rot + 10) + 10), (17, 17, 17))
    dr = ImageDraw.Draw(sheet)
    for i, (f, im) in enumerate(zip(arquivos, ims)):
        x, y = 10 + (i % cols) * (largura + 10), 10 + (i // cols) * (h + rot + 10)
        sheet.paste(im.resize((largura, h), Image.LANCZOS), (x, y))
        dr.text((x + 4, y + h + 4), os.path.splitext(os.path.basename(f))[0], fill=(220, 220, 220))
    sheet.save(saida)
    print(f"{len(ims)} quadros -> {saida} ({sheet.width}x{sheet.height})")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("arquivos", nargs="+")
    ap.add_argument("--colunas", type=int, default=4)
    ap.add_argument("--largura", type=int, default=480)
    ap.add_argument("--celular", action="store_true", help="cada quadro com 360 px de largura")
    ap.add_argument("--compara", action="store_true")
    a = ap.parse_args()
    if a.compara:
        compara(*a.arquivos[:2])
        return
    saida, quadros = a.arquivos[0], a.arquivos[1:]
    folha(saida, quadros, a.colunas if not a.celular else max(a.colunas, 5), 360 if a.celular else a.largura)


if __name__ == "__main__":
    main()
