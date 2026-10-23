"""Materiais da passada de crítica de diretor (prompts/critica.txt) a partir de um MP4 renderizado.

Uso:
    python scripts/critica.py out/final.mp4 out/critica/r0 [--beats filmes/x/beats.json] [--qps 2]

Gera em <saida>/:
    folha-2qps.png          folha de contato com 2 quadros por segundo (o nome de cada quadro é o tempo)
    tira-12q.png            12 quadros seguidos em volta da ação mais rápida (maior energia de movimento)
    celular-360.mp4         o filme a 360 px de largura (o teste de celular), e celular-360-parteN.png
    movimento.txt           batidas mais paradas, trechos de 0,5 s sem mudança visível e a ação mais rápida
    q2/tNN.N.png            os quadros da folha (para refazer só os segundos afetados e remontar)

Abra as imagens e olhe de verdade antes de dar nota.
"""
import argparse
import json
import os
import shutil
import subprocess

import numpy as np
from PIL import Image, ImageDraw


def achar_ffmpeg():
    cands = [os.environ.get("FFMPEG"), shutil.which("ffmpeg")]
    la = os.environ.get("LOCALAPPDATA")
    if la:
        cands.append(os.path.join(la, "Microsoft", "WinGet", "Links", "ffmpeg.exe"))
    for c in cands:
        if c and (os.path.exists(c) or shutil.which(c)):
            return c
    raise SystemExit("ffmpeg não encontrado (instale ou defina FFMPEG=caminho)")


def folha(saida, arquivos, colunas, largura):
    ims = [Image.open(f).convert("RGB") for f in arquivos]
    h = round(largura * ims[0].height / ims[0].width)
    cols = min(colunas, len(ims))
    linhas = -(-len(ims) // cols)
    sheet = Image.new("RGB", (cols * (largura + 10) + 10, linhas * (h + 32) + 10), (17, 17, 17))
    dr = ImageDraw.Draw(sheet)
    for i, (f, im) in enumerate(zip(arquivos, ims)):
        x, y = 10 + (i % cols) * (largura + 10), 10 + (i // cols) * (h + 32)
        sheet.paste(im.resize((largura, h), Image.LANCZOS), (x, y))
        dr.text((x + 4, y + h + 4), os.path.splitext(os.path.basename(f))[0], fill=(220, 220, 220))
    sheet.save(saida)


def quadros(ff, mp4, pasta, qps, largura):
    os.makedirs(pasta, exist_ok=True)
    for f in os.listdir(pasta):
        os.remove(os.path.join(pasta, f))
    subprocess.run([ff, "-v", "error", "-y", "-i", mp4, "-vf", f"fps={qps},scale={largura}:-2",
                    "-start_number", "0", os.path.join(pasta, "q%04d.png")], check=True)
    out = []
    for f in sorted(os.listdir(pasta)):
        i = int(f[1:5])
        novo = os.path.join(pasta, f"t{i / qps:05.1f}.png")
        os.rename(os.path.join(pasta, f), novo)
        out.append(novo)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp4")
    ap.add_argument("saida")
    ap.add_argument("--beats", help="beats.json do filme (para as batidas mais paradas)")
    ap.add_argument("--qps", type=float, default=2)
    a = ap.parse_args()
    ff = achar_ffmpeg()
    os.makedirs(a.saida, exist_ok=True)

    # 1. folha de contato a 2 quadros por segundo
    q = quadros(ff, a.mp4, os.path.join(a.saida, "q2"), a.qps, 480)
    folha(os.path.join(a.saida, "folha-2qps.png"), q, 10, 320)

    # 2. energia de movimento quadro a quadro (cinza, 320 px)
    raw = subprocess.run([ff, "-v", "error", "-i", a.mp4, "-vf", "scale=320:-2,format=gray", "-f", "rawvideo", "-"],
                         capture_output=True, check=True).stdout
    w0 = Image.open(q[0]).size
    hh = int(round(320 * w0[1] / w0[0] / 2) * 2)
    fr = np.frombuffer(raw, np.uint8).reshape(-1, hh, 320).astype(np.int16)
    fps = 60.0
    d = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2))
    t = (np.arange(len(d)) + 1) / fps
    k = 12
    soma = np.convolve(d, np.ones(k), "valid")
    i0 = int(soma.argmax())
    rel = [f"quadros: {len(fr)} ({len(fr) / fps:.2f} s a {fps:.0f} qps)",
           f"ação mais rápida: quadros {i0}-{i0 + k - 1} ({i0 / fps:.3f}-{(i0 + k - 1) / fps:.3f} s)"]
    paradas, run = [], 0
    for i, v in enumerate(d):
        run = run + 1 if v < 0.02 else 0
        if run == 30:
            paradas.append(round((i - 29) / fps, 2))
    rel.append(f"trechos de 0,5 s sem mudança visível começando em: {paradas or 'nenhum'}")
    if a.beats and os.path.exists(a.beats):
        beats = json.load(open(a.beats, encoding="utf-8"))["beats"]
        per = beats[1] - beats[0]
        bordas = beats + [beats[-1] + per]
        por = []
        for i in range(len(beats)):
            m = (t >= bordas[i]) & (t < bordas[i + 1])
            if m.any():
                por.append((i, round(float(d[m].mean()), 3)))
        rel.append("batidas mais paradas (batida, mudança média por quadro): " + str(sorted(por, key=lambda x: x[1])[:8]))

    # 3. a tira de 12 quadros seguidos em volta da ação mais rápida
    subprocess.run([ff, "-v", "error", "-y", "-i", a.mp4, "-vf",
                    f"select='between(n\\,{i0}\\,{i0 + k - 1})',scale=640:-2,tile=6x2",
                    "-frames:v", "1", "-update", "1", os.path.join(a.saida, "tira-12q.png")], check=True)

    # 4. o teste de celular: o filme a 360 px de largura, e as folhas dele em tamanho real
    cel = os.path.join(a.saida, "celular-360.mp4")
    subprocess.run([ff, "-v", "error", "-y", "-i", a.mp4, "-vf", "scale=360:-2", "-c:v", "libx264", "-crf", "20",
                    "-c:a", "aac", "-b:a", "128k", cel], check=True)
    qc = quadros(ff, cel, os.path.join(a.saida, "cel"), a.qps, 360)
    for n in range(0, len(qc), 30):
        folha(os.path.join(a.saida, f"celular-360-parte{n // 30 + 1}.png"), qc[n:n + 30], 6, 360)

    open(os.path.join(a.saida, "movimento.txt"), "w", encoding="utf-8").write("\n".join(rel) + "\n")
    print("\n".join(rel))
    print(f"materiais em {a.saida}: folha-2qps.png, tira-12q.png, celular-360.mp4, celular-360-parte*.png")


if __name__ == "__main__":
    main()
