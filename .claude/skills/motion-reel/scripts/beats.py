"""Mede uma trilha e grava beats.json: andamento, batidas, tempos fortes e acertos.

    batidas      grade regular ajustada aos ataques (librosa beat_track + alinhamento na semicolcheia)
    tempos       os tempos fortes: uma batida a cada 4, na fase em que o grave ataca mais forte
    acertos      os picos de ataque (onsets) acima de um limiar de força; é onde os efeitos caem

Regra do filme: mudança de estado na batida, momento grande no tempo forte, efeito no acerto.
Grava também beats.js ao lado (window.BEATS = ...), porque o filme abre em file:// e não pode ler JSON.

Uso:
    python scripts/beats.py audio/music.wav filmes/x/beats.json [--bpm 120] [--compasso 4] [--limiar 0.12]
"""
import argparse
import json
import math
import os

import librosa
import numpy as np


def circ_mean(ts, cycle):
    """Força (0..1) e fase da média circular dos tempos `ts` num ciclo."""
    z = np.mean(np.exp(2j * np.pi * np.asarray(ts) / cycle))
    return abs(z), (np.angle(z) % (2 * np.pi)) / (2 * np.pi) * cycle


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("trilha")
    ap.add_argument("saida")
    ap.add_argument("--bpm", type=float, default=120, help="palpite inicial de andamento")
    ap.add_argument("--compasso", type=int, default=4, help="batidas por compasso")
    ap.add_argument("--limiar", type=float, default=0.12, help="força mínima de um acerto, em fração do maior ataque")
    args = ap.parse_args()

    y, sr = librosa.load(args.trilha, sr=None, mono=True)
    dur = len(y) / sr
    hop = 128                                        # ~2,7 ms a 48 kHz
    _, tracked = librosa.beat.beat_track(y=y, sr=sr, hop_length=hop, start_bpm=args.bpm, units="time", trim=False)
    tracked = np.asarray(tracked, dtype=float)
    if len(tracked) < 4:
        raise SystemExit(f"poucas batidas detectadas ({len(tracked)}); a trilha tem pulso claro?")

    env = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop)
    frames = librosa.onset.onset_detect(onset_envelope=env, sr=sr, hop_length=hop, units="frames", backtrack=False)
    onsets = librosa.frames_to_time(frames, sr=sr, hop_length=hop)
    force = env[frames] / env.max()
    # força dos ataques só nos graves (bumbo e baixo): marca a batida e o tempo forte, não o chimbal
    low = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop, fmax=250, n_mels=8)
    low_t = librosa.times_like(low, sr=sr, hop_length=hop)

    def low_at(t, win=0.02):
        return low[(low_t > t - win) & (low_t < t + win)].max(initial=0)

    # andamento: o período que melhor alinha TODOS os ataques numa grade de semicolcheias
    bpm0 = 60 / float(np.median(np.diff(tracked)))
    candidates = 60 / np.arange(bpm0 * 0.93, bpm0 * 1.07, 0.01)
    period = float(max(candidates, key=lambda p: circ_mean(onsets, p / 4)[0]))
    sub = period / 4
    # fase: média circular na semicolcheia; a batida é a semicolcheia de graves mais fortes
    _, phase = circ_mean(onsets, sub)

    def strength(offset):
        return np.mean([low_at(t, 0.015) for t in np.arange(phase + offset, dur, period)])

    t0 = phase + max(range(4), key=lambda m: strength(m * sub)) * sub
    t0 -= math.floor(t0 / period) * period
    if t0 > period - sub / 2:
        t0 -= period
    beats = np.clip(np.arange(t0, dur - 1e-6, period), 0, None)

    # tempos fortes: a posição do compasso em que os graves atacam mais forte, em média
    n = args.compasso
    lows = np.array([low_at(t) for t in beats])
    score = [float(lows[p::n].mean()) for p in range(n)]
    fase = int(np.argmax(score))
    downbeats = beats[fase::n]

    # acertos: os picos de ataque acima do limiar
    keep = force >= args.limiar
    hits, hits_force = onsets[keep], force[keep]

    out = {
        "bpm": round(60 / period, 3),
        "fonte": f"medido com librosa em {args.trilha.replace(chr(92), '/')}",
        "compasso": n,
        "fase_do_compasso": fase,
        "beats": [round(float(t), 4) for t in beats],
        "downbeats": [round(float(t), 4) for t in downbeats],
        "hits": [round(float(t), 4) for t in hits],
        "hits_forca": [round(float(f), 3) for f in hits_force],
    }
    with open(args.saida, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    js = os.path.join(os.path.dirname(args.saida), "beats.js")
    with open(js, "w", encoding="utf-8") as f:
        f.write("// gerado por scripts/beats.py a partir de beats.json; o filme lê window.BEATS\n")
        f.write("window.BEATS = " + json.dumps(out, ensure_ascii=False) + ";\n")

    dev = np.abs((hits - t0 + sub / 2) % sub - sub / 2) * 1000
    perto = np.min(np.abs(hits[:, None] - beats[None, :]), axis=1) < 0.03
    print(f"andamento medido: {60 / period:.2f} BPM, primeira batida em {t0 * 1000:.1f} ms")
    print(f"{len(beats)} batidas, {len(downbeats)} tempos fortes (fase {fase} do compasso; "
          f"força dos graves por posição: {', '.join(f'{s:.2f}' for s in score)})")
    print(f"{len(hits)} acertos acima de {args.limiar:.0%} do maior ataque ({perto.sum()} a menos de 30 ms de uma batida); "
          f"fora da semicolcheia: mediana {np.median(dev):.1f} ms, pior {dev.max():.1f} ms")
    print(f"gravado em {args.saida} e {js}")


if __name__ == "__main__":
    main()
