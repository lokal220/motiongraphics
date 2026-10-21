"""Mede a grade de batidas de uma trilha e grava beats.json (regra de som do CLAUDE.md).

Detecta as batidas com librosa, ajusta uma grade regular (t0 + i * período) e mede quanto os
ataques da trilha se afastam da grade em semicolcheias - é a nota de "sincronia do som".

Uso:
    python scripts/medir_batidas.py TRILHA.wav filmes/x/beats.json [--bpm 120]
"""
import argparse
import json
import math

import librosa
import numpy as np


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("trilha")
    ap.add_argument("saida")
    ap.add_argument("--bpm", type=float, default=120, help="palpite inicial de andamento")
    args = ap.parse_args()

    y, sr = librosa.load(args.trilha, sr=None, mono=True)
    dur = len(y) / sr
    hop = 128                                        # ~2,7 ms a 48 kHz: resolução fina para os ataques
    _, beats = librosa.beat.beat_track(y=y, sr=sr, hop_length=hop, start_bpm=args.bpm, units="time", trim=False)
    beats = np.asarray(beats, dtype=float)
    if len(beats) < 4:
        raise SystemExit(f"poucas batidas detectadas ({len(beats)}); a trilha tem pulso claro?")

    onsets = librosa.onset.onset_detect(y=y, sr=sr, hop_length=hop, units="time", backtrack=False)
    # força dos ataques só nos graves (bumbo/baixo): é o que marca a batida, não o chimbal
    env = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop, fmax=250, n_mels=8)
    env_t = librosa.times_like(env, sr=sr, hop_length=hop)

    def circ_mean(ts, cycle):
        z = np.mean(np.exp(2j * np.pi * np.asarray(ts) / cycle))
        return abs(z), (np.angle(z) % (2 * np.pi)) / (2 * np.pi) * cycle

    # andamento: o rastreador dá o palpite; o período final é o que melhor alinha TODOS os ataques
    # numa grade de semicolcheias (em trilhas curtas o rastreador sozinho oscila alguns BPM)
    bpm0 = 60 / float(np.median(np.diff(beats)))
    candidates = 60 / np.arange(bpm0 * 0.93, bpm0 * 1.07, 0.01)
    period = float(max(candidates, key=lambda p: circ_mean(onsets, p / 4)[0]))
    sub = period / 4

    # fase: média circular dos ataques na semicolcheia; a batida é a semicolcheia de ataques mais fortes
    _, phase = circ_mean(onsets, sub)

    def strength(offset):
        ts = np.arange(phase + offset, dur, period)
        return np.mean([env[(env_t > t - 0.015) & (env_t < t + 0.015)].max(initial=0) for t in ts])

    t0 = phase + max(range(4), key=lambda m: strength(m * sub)) * sub
    t0 -= math.floor(t0 / period) * period          # 0 <= t0 < período
    if t0 > period - sub / 2:
        t0 -= period                                 # fase levemente negativa: a 1ª batida é o zero
    grid = np.clip(np.arange(t0, dur - 1e-6, period), 0, None)

    # desvio de cada ataque até a semicolcheia mais próxima da grade
    dev_ms = np.abs((onsets - t0 + sub / 2) % sub - sub / 2) * 1000

    out = {
        "bpm": round(60 / period, 3),
        "fonte": f"medido com librosa em {args.trilha.replace(chr(92), '/')}",
        "beats": [round(float(t), 4) for t in grid],
        "detectadas": [round(float(t), 4) for t in beats],
    }
    with open(args.saida, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"andamento medido: {60 / period:.2f} BPM, primeira batida em {t0 * 1000:.1f} ms")
    print(f"{len(grid)} batidas na grade, {len(beats)} detectadas, {len(onsets)} ataques")
    print(f"ataques fora da semicolcheia: mediana {np.median(dev_ms):.1f} ms, "
          f"pior {dev_ms.max():.1f} ms, acima de 25 ms: {(dev_ms > 25).sum()}")
    sub32 = period / 8
    dev32 = np.abs((onsets - t0 + sub32 / 2) % sub32 - sub32 / 2) * 1000
    print(f"ataques fora da fusa (1/32): mediana {np.median(dev32):.1f} ms, "
          f"pior {dev32.max():.1f} ms, acima de 15 ms: {(dev32 > 15).sum()}")
    print(f"gravado em {args.saida}")


if __name__ == "__main__":
    main()
