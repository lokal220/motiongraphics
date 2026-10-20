"""Cena 01 - app de delivery acompanhando um pedido (10 s, 1080x1920, 30 fps).

Pedido confirmado -> moto sai do restaurante -> atravessa o mapa até a casa,
enquanto o contador de minutos cai até zero.

Cada quadro é desenhado com Pillow em 2x (supersampling) e enviado ao ffmpeg.

Uso:
    python scripts/01_delivery.py                      # renderiza o MP4
    python scripts/01_delivery.py saida.mp4            # outro destino
    python scripts/01_delivery.py --preview PASTA t1 t2 ...  # salva PNGs desses instantes
"""
import bisect
import math
import random
import subprocess
import sys
from functools import lru_cache
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H, S = 1080, 1920, 2
FPS, DUR = 30, 10.0
N = round(FPS * DUR)
OUT = Path(__file__).resolve().parent.parent / "resultados" / "01-teste-cru.mp4"

# paleta
ACCENT = (255, 98, 41)
ACCENT_D = (214, 66, 18)
NAVY = (27, 31, 59)
GRAY = (128, 136, 153)
LINE = (226, 230, 236)
GREEN = (30, 170, 90)
WHITE = (255, 255, 255)
YELLOW = (255, 204, 51)
TRAVELED = (186, 194, 206)

# linha do tempo (segundos)
T_SLIDE = (1.45, 2.05)    # tela de confirmação sobe e revela o app
T_PIN_R, T_PIN_H = 1.75, 1.9
T_ROUTE = (2.0, 2.7)      # rota se desenha
T_MOTO_IN = 2.45
T_DEP, T_ARR = 2.8, 8.6   # moto sai / chega
ETA_MIN = 25

FONT_DIR = Path("C:/Windows/Fonts")
BOLD, SEMI, REG = "segoeuib.ttf", "seguisb.ttf", "segoeui.ttf"


@lru_cache(None)
def font(name, size):
    return ImageFont.truetype(str(FONT_DIR / name), round(size * S))


# --- easing -----------------------------------------------------------------

def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def prog(t, a, b):
    return clamp((t - a) / (b - a))


def lerp(a, b, k):
    return a + (b - a) * k


def lerp_rgb(c0, c1, k):
    return tuple(round(lerp(a, b, k)) for a, b in zip(c0, c1))


def ease_out_cubic(k):
    return 1 - (1 - k) ** 3


def ease_in_out_cubic(k):
    return 4 * k ** 3 if k < 0.5 else 1 - (-2 * k + 2) ** 3 / 2


def ease_in_out_sine(k):
    return -(math.cos(math.pi * k) - 1) / 2


def ease_out_back(k, s=1.70158):
    k -= 1
    return 1 + (s + 1) * k ** 3 + s * k ** 2


# --- helpers de desenho (coordenadas em px 1x) --------------------------------

def sc(*v):
    return [x * S for x in v]


def circle(d, x, y, r, **kw):
    d.ellipse(sc(x - r, y - r, x + r, y + r), **kw)


def stroke(d, pts, color, width):
    """Linha grossa com juntas e pontas arredondadas."""
    if len(pts) < 2:
        return
    d.line([(x * S, y * S) for x, y in pts], fill=color, width=round(width * S), joint="curve")
    for x, y in (pts[0], pts[-1]):
        circle(d, x, y, width / 2, fill=color)


def stamp(d, pts, color, width):
    """Linha grossa carimbando círculos em cada ponto (curvas lisas, sem serrilhado)."""
    for x, y in pts:
        circle(d, x, y, width / 2, fill=color)


def partial(pts, k):
    """Primeiros k (0..1) do comprimento de uma polilinha."""
    segs = list(zip(pts, pts[1:]))
    lens = [math.dist(a, b) for a, b in segs]
    left = k * sum(lens)
    out = [pts[0]]
    for (a, b), seg in zip(segs, lens):
        if left >= seg:
            out.append(b)
            left -= seg
        else:
            u = left / seg
            out.append((lerp(a[0], b[0], u), lerp(a[1], b[1], u)))
            break
    return out


def draw_text(img, xy, text, fnt, color, alpha=1.0, anchor="la", clip=None):
    """Texto via máscara L (antialias correto, sem franja escura). clip em px 1x."""
    if alpha <= 0.003:
        return
    x, y = xy[0] * S, xy[1] * S
    l, t, r, b = fnt.getbbox(text, anchor=anchor)
    x0, y0 = math.floor(x + l) - 1, math.floor(y + t) - 1
    w, h = math.ceil(r - l) + 3, math.ceil(b - t) + 3
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).text((x - x0, y - y0), text, font=fnt, fill=round(255 * alpha), anchor=anchor)
    cx0, cy0, cx1, cy1 = (0, 0, img.width, img.height) if clip is None else [round(c * S) for c in clip]
    ix0, iy0 = max(x0, cx0, 0), max(y0, cy0, 0)
    ix1, iy1 = min(x0 + w, cx1, img.width), min(y0 + h, cy1, img.height)
    if ix0 >= ix1 or iy0 >= iy1:
        return
    mask = mask.crop((ix0 - x0, iy0 - y0, ix1 - x0, iy1 - y0))
    img.paste(color, (ix0, iy0, ix1, iy1), mask)


def soft_shadow(size, draw_fn, blur, dy, opacity):
    """Sprite RGBA de sombra: draw_fn(draw) desenha a silhueta numa máscara L."""
    mask = Image.new("L", size, 0)
    draw_fn(ImageDraw.Draw(mask), opacity)
    mask = mask.filter(ImageFilter.GaussianBlur(blur * S))
    shifted = Image.new("L", size, 0)
    shifted.paste(mask, (0, round(dy * S)))
    shadow = Image.new("RGBA", size, (20, 24, 40, 255))
    shadow.putalpha(shifted)
    return shadow


def paste_sprite(img, spr, anchor, at, scale=1.0):
    """Cola um sprite (2x) com o ponto `anchor` do sprite em `at` (px 1x)."""
    if scale <= 0.02:
        return
    if abs(scale - 1) > 1e-3:
        spr = spr.resize((max(1, round(spr.width * scale)), max(1, round(spr.height * scale))), Image.BICUBIC)
    x = round(at[0] * S - anchor[0] * scale)
    y = round(at[1] * S - anchor[1] * scale)
    img.paste(spr, (x, y), spr)


# --- rota ---------------------------------------------------------------------

ROUTE_PTS = [(330, 335), (330, 640), (600, 640), (600, 880), (860, 880), (860, 1070)]
RESTAURANT, HOUSE = ROUTE_PTS[0], ROUTE_PTS[-1]


def build_path(pts, radius=46, step=2.0):
    """Polilinha com cantos arredondados, reamostrada em passos uniformes."""
    raw = [pts[0]]
    for (x0, y0), (x1, y1), (x2, y2) in zip(pts, pts[1:], pts[2:]):
        l1, l2 = math.hypot(x1 - x0, y1 - y0), math.hypot(x2 - x1, y2 - y1)
        r = min(radius, l1 / 2, l2 / 2)
        ax, ay = x1 - (x1 - x0) / l1 * r, y1 - (y1 - y0) / l1 * r
        bx, by = x1 + (x2 - x1) / l2 * r, y1 + (y2 - y1) / l2 * r
        raw.append((ax, ay))
        for k in range(1, 21):
            u = k / 20
            raw.append(((1 - u) ** 2 * ax + 2 * (1 - u) * u * x1 + u * u * bx,
                        (1 - u) ** 2 * ay + 2 * (1 - u) * u * y1 + u * u * by))
    raw.append(pts[-1])
    cum = [0.0]
    for a, b in zip(raw, raw[1:]):
        cum.append(cum[-1] + math.dist(a, b))
    n = int(cum[-1] / step)
    out = []
    for k in range(n + 1):
        dist = cum[-1] * k / n
        j = min(max(bisect.bisect_right(cum, dist) - 1, 0), len(raw) - 2)
        seg = (cum[j + 1] - cum[j]) or 1.0
        u = (dist - cum[j]) / seg
        out.append((lerp(raw[j][0], raw[j + 1][0], u), lerp(raw[j][1], raw[j + 1][1], u)))
    return out


PATH = build_path(ROUTE_PTS)
NP = len(PATH) - 1


def path_at(f):
    f = clamp(f) * NP
    i = min(int(f), NP - 1)
    u = f - i
    (x0, y0), (x1, y1) = PATH[i], PATH[i + 1]
    return lerp(x0, x1, u), lerp(y0, y1, u)


def path_slice(f0, f1):
    if f1 - f0 <= 1e-4:
        return []
    i0, i1 = math.ceil(clamp(f0) * NP), int(clamp(f1) * NP)
    return [path_at(f0)] + PATH[i0:i1 + 1] + [path_at(f1)]


# --- cenário estático: mapa + painel inferior ---------------------------------

XS = [70, 330, 600, 860, 1050]
YS = [190, 420, 640, 880, 1100, 1330]
MAJOR = {("x", 600), ("y", 640)}
PARK, LAKE = (70, 880), (860, 190)   # canto superior esquerdo do quarteirão
SHEET_Y = 1250


def build_base():
    img = Image.new("RGB", (W * S, H * S), (228, 232, 238))
    d = ImageDraw.Draw(img)
    rnd = random.Random(4821)

    ext_x, ext_y = [-140] + XS + [W + 140], [-140] + YS + [H]
    for x0, x1 in zip(ext_x, ext_x[1:]):
        for y0, y1 in zip(ext_y, ext_y[1:]):
            if (x0, y0) == PARK:
                d.rounded_rectangle(sc(x0 + 24, y0 + 24, x1 - 24, y1 - 24), radius=22 * S, fill=(202, 234, 208))
                for _ in range(16):
                    tx, ty = rnd.uniform(x0 + 50, x1 - 50), rnd.uniform(y0 + 50, y1 - 50)
                    circle(d, tx, ty, rnd.uniform(10, 17), fill=(176, 217, 185))
                continue
            if (x0, y0) == LAKE:
                d.rounded_rectangle(sc(x0 + 28, y0 + 28, x1 - 28, y1 - 28), radius=70 * S, fill=(196, 223, 246))
                continue
            m, gap = 30, 14
            bx0, by0, bx1, by1 = x0 + m, y0 + m, x1 - m, y1 - m
            if bx1 - bx0 < 40 or by1 - by0 < 40:
                continue
            cols = 2 if bx1 - bx0 > 170 else 1
            rows = 2 if by1 - by0 > 170 else 1
            cw = (bx1 - bx0 - gap * (cols - 1)) / cols
            rh = (by1 - by0 - gap * (rows - 1)) / rows
            for c in range(cols):
                for r in range(rows):
                    if rnd.random() < 0.15:
                        continue
                    rx, ry = bx0 + c * (cw + gap), by0 + r * (rh + gap)
                    g = rnd.randint(210, 219)
                    d.rounded_rectangle(sc(rx, ry, rx + cw, ry + rh), radius=8 * S, fill=(g, g + 4, g + 10))

    for x in XS:
        d.line(sc(x, -100, x, H + 100), fill=WHITE, width=(44 if ("x", x) in MAJOR else 28) * S)
    for y in YS:
        d.line(sc(-100, y, W + 100, y), fill=WHITE, width=(44 if ("y", y) in MAJOR else 28) * S)
    street = (150, 158, 172)
    draw_text(img, (770, 640), "Av. Central", font(SEMI, 21), street, anchor="mm")
    draw_text(img, (470, 420), "R. Aurora", font(SEMI, 19), street, anchor="mm")
    draw_text(img, (200, 880), "R. das Flores", font(SEMI, 19), street, anchor="mm")
    draw_text(img, (730, 1100), "R. do Sol", font(SEMI, 19), street, anchor="mm")

    # painel inferior (bottom sheet)
    top = SHEET_Y - 120
    mask = Image.new("L", (W * S, 420 * S), 0)
    ImageDraw.Draw(mask).rounded_rectangle(sc(0, 120, W, 520), radius=48 * S, fill=70)
    mask = mask.filter(ImageFilter.GaussianBlur(22 * S))
    img.paste((20, 24, 40), (0, (top - 10) * S, W * S, (top - 10 + 420) * S), mask)
    d.rounded_rectangle(sc(0, SHEET_Y, W, H + 80), radius=48 * S, fill=WHITE)
    d.rounded_rectangle(sc(W / 2 - 46, SHEET_Y + 18, W / 2 + 46, SHEET_Y + 28), radius=5 * S, fill=LINE)

    draw_text(img, (1010, 1398), "Burger da Vila", font(BOLD, 34), NAVY, anchor="rs")
    draw_text(img, (1010, 1440), "1x Combo Smash", font(REG, 28), GRAY, anchor="rs")
    draw_text(img, (1010, 1476), "2x Refrigerante", font(REG, 28), GRAY, anchor="rs")

    d.line(sc(70, 1702, 1010, 1702), fill=LINE, width=2 * S)
    circle(d, 116, 1800, 46, fill=(255, 228, 216))
    draw_text(img, (116, 1800), "CA", font(BOLD, 32), ACCENT, anchor="mm")
    draw_text(img, (190, 1792), "Carlos Almeida", font(BOLD, 34), NAVY, anchor="ls")
    draw_text(img, (190, 1836), "Seu entregador · nota 4,9", font(REG, 28), GRAY, anchor="ls")
    circle(d, 990, 1800, 42, fill=(243, 244, 247))
    d.rounded_rectangle(sc(970, 1785, 1010, 1812), radius=9 * S, fill=ACCENT)
    d.polygon([tuple(sc(978, 1809)), tuple(sc(975, 1823)), tuple(sc(990, 1810))], fill=ACCENT)
    return img


# --- sprites ------------------------------------------------------------------

def make_pin(color, glyph):
    """Alfinete de mapa. Retorna (sprite, âncora na ponta)."""
    size = (150 * S, 180 * S)
    cx, cy, r, tip = 75, 66, 46, 150

    def silhouette(d, fill, grow=0):
        circle(d, cx, cy, r + grow, fill=fill)
        d.polygon([tuple(sc(cx - (r + grow) * 0.8, cy + r * 0.58)),
                   tuple(sc(cx + (r + grow) * 0.8, cy + r * 0.58)),
                   tuple(sc(cx, tip + grow * 1.2))], fill=fill)

    def shadow_shape(d, op):
        silhouette(d, op, 5)
        d.ellipse(sc(cx - 24, tip - 8, cx + 24, tip + 6), fill=op + 30)

    spr = soft_shadow(size, shadow_shape, 6, 5, 80)
    fg = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(fg)
    silhouette(d, WHITE, 5)
    silhouette(d, color)
    glyph(d, cx, cy, color)
    return Image.alpha_composite(spr, fg), (cx * S, tip * S)


def glyph_restaurant(d, cx, cy, bg):
    d.pieslice(sc(cx - 25, cy - 20, cx + 25, cy + 30), 180, 360, fill=WHITE)
    d.rounded_rectangle(sc(cx - 31, cy + 7, cx + 31, cy + 14), radius=3 * S, fill=WHITE)
    circle(d, cx, cy - 23, 5, fill=WHITE)


def glyph_house(d, cx, cy, bg):
    d.polygon([tuple(sc(cx - 28, cy - 1)), tuple(sc(cx, cy - 27)), tuple(sc(cx + 28, cy - 1))], fill=WHITE)
    d.rectangle(sc(cx - 19, cy - 4, cx + 19, cy + 22), fill=WHITE)
    d.rectangle(sc(cx - 6, cy + 7, cx + 6, cy + 22), fill=bg)


def make_moto():
    """Selo branco com uma moto de entrega (de lado, virada para a direita)."""
    size = (150 * S, 150 * S)
    c, R, g = 75, 46, 0.86

    spr = soft_shadow(size, lambda d, op: circle(d, c, c, R, fill=op), 7, 6, 110)
    fg = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(fg)
    circle(d, c, c, R, fill=WHITE)
    circle(d, c, c, R, outline=ACCENT, width=5 * S)

    def q(x, y):
        return ((c + 4 * g + x * g) * S, (c + y * g) * S)

    def qbox(x0, y0, x1, y1):
        return [*q(x0, y0), *q(x1, y1)]

    d.line([q(18, -10), q(19, 18)], fill=NAVY, width=round(4 * g * S))               # garfo
    d.rounded_rectangle(qbox(-32, -31, -8, -6), radius=4 * S, fill=ACCENT_D)          # baú
    d.line([q(-32, -21), q(-8, -21)], fill=WHITE, width=round(3 * g * S))
    d.rounded_rectangle(qbox(-26, -7, -4, 0), radius=3 * S, fill=NAVY)                # banco
    d.polygon([q(-30, 0), q(-6, 0), q(-2, 8), q(8, 8), q(13, -14), q(20, -14),
               q(19, -6), q(16, 14), q(-26, 14)], fill=ACCENT)                         # carenagem
    d.line([q(12, -16), q(25, -20)], fill=NAVY, width=round(4 * g * S))               # guidão
    for wx in (-19, 19):                                                               # rodas
        d.ellipse(qbox(wx - 10.5, 7.5, wx + 10.5, 28.5), fill=NAVY)
        d.ellipse(qbox(wx - 3.5, 14.5, wx + 3.5, 21.5), fill=WHITE)
    d.ellipse(qbox(18, -11, 24, -5), fill=YELLOW)                                     # farol
    return Image.alpha_composite(spr, fg), (c * S, c * S)


PILL_W, PILL_H, PILL_Y = 640, 92, 118
PILL_X0 = (W - PILL_W) / 2


def make_pill():
    pad = 40
    size = ((PILL_W + 2 * pad) * S, (PILL_H + 2 * pad) * S)
    box = (pad, pad, pad + PILL_W, pad + PILL_H)
    spr = soft_shadow(size, lambda d, op: d.rounded_rectangle(sc(*box), radius=PILL_H / 2 * S, fill=op), 12, 8, 60)
    fg = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(fg).rounded_rectangle(sc(*box), radius=PILL_H / 2 * S, fill=WHITE)
    return Image.alpha_composite(spr, fg), ((pad + PILL_W / 2) * S, (pad + PILL_H / 2) * S)


BASE = build_base()
PIN_R = make_pin(NAVY, glyph_restaurant)
PIN_H = make_pin(ACCENT, glyph_house)
MOTO = make_moto()
PILL = make_pill()

_rnd = random.Random(99)
CONFETTI = []
for _ in range(80):
    ang = math.radians(_rnd.uniform(-165, -15))
    spd = _rnd.uniform(500, 1400)
    CONFETTI.append(dict(vx=math.cos(ang) * spd, vy=math.sin(ang) * spd,
                         w=_rnd.uniform(10, 18), h=_rnd.uniform(6, 10),
                         rot=_rnd.uniform(0, math.tau), vr=_rnd.uniform(-9, 9), flip=_rnd.uniform(6, 14),
                         color=_rnd.choice([ACCENT, GREEN, YELLOW, (64, 140, 255), NAVY]),
                         delay=_rnd.uniform(0, 0.12)))


# --- camadas animadas ---------------------------------------------------------

def draw_route(d, t, p):
    k = ease_in_out_cubic(prog(t, *T_ROUTE))
    if k <= 0:
        return
    behind, ahead = path_slice(0, min(p, k)), path_slice(p, k)
    for pts in (behind, ahead):
        stamp(d, pts, WHITE, 26)
    stamp(d, behind, TRAVELED, 14)
    stamp(d, ahead, ACCENT, 14)


def draw_ripple(d, t, t0, at, color, r_max=170):
    for i, delay in enumerate((0.0, 0.25)):
        k = prog(t, t0 + delay, t0 + delay + 0.9)
        if 0 < k < 1:
            r = lerp(18, r_max, ease_out_cubic(k))
            d.ellipse(sc(at[0] - r, at[1] - r * 0.42, at[0] + r, at[1] + r * 0.42),
                      outline=(*color, round(200 * (1 - k))), width=round(6 * S * (1 - k * 0.6)))


def draw_pins(img, t):
    k = prog(t, T_PIN_R, T_PIN_R + 0.45)
    paste_sprite(img, *PIN_R, RESTAURANT, ease_out_back(k) if k < 1 else 1)
    k = prog(t, T_PIN_H, T_PIN_H + 0.45)
    scale = ease_out_back(k) if k < 1 else 1
    kb = prog(t, T_ARR, T_ARR + 0.7)
    if 0 < kb < 1:
        scale *= 1 + 0.24 * math.sin(kb * math.pi * 3) * (1 - kb)
    paste_sprite(img, *PIN_H, HOUSE, scale)


def draw_moto(img, d, t, p):
    if t < T_MOTO_IN:
        return
    x, y = path_at(p)
    traveling = T_DEP < t < T_ARR
    if traveling:
        y += math.sin((t - T_DEP) * math.tau * 2.2) * 2.5
        for off in (0.0, 0.55):
            ph = ((t - T_DEP + off) % 1.1) / 1.1
            circle(d, x, y, 46 + 46 * ph, fill=(*ACCENT, round(70 * (1 - ph))))
    k = prog(t, T_MOTO_IN, T_MOTO_IN + 0.4)
    scale = ease_out_back(k) if k < 1 else 1
    scale *= 1 - ease_in_out_cubic(prog(t, T_ARR + 0.05, T_ARR + 0.35))
    paste_sprite(img, *MOTO, (x, y), scale)


def eta(t):
    """(valor atual, valor anterior ou None, progresso 0..1 da troca de dígito)."""
    span = T_ARR - T_DEP
    u = prog(t, T_DEP, T_ARR)
    v = math.ceil(ETA_MIN * (1 - u) - 1e-9)
    if v >= ETA_MIN:
        return ETA_MIN, None, 1.0
    t_change = T_DEP + (1 - v / ETA_MIN) * span
    return v, v + 1, clamp((t - t_change) / 0.18)


def draw_sheet(img, d, t, p, state):
    # rótulo do contador
    ka = ease_out_cubic(prog(t, T_ARR, T_ARR + 0.35))
    draw_text(img, (70, 1328), "Previsão de chegada", font(SEMI, 32), GRAY, 1 - ka, "ls")
    draw_text(img, (70, 1328 + 18 * (1 - ka)), "Seu pedido chegou!", font(BOLD, 32), GREEN, ka, "ls")

    # contador rolando
    v, prev, k = eta(t)
    nf, base_y, clip = font(BOLD, 150), 1478, (60, 1342, 600, 1500)
    if prev is not None and k < 1:
        e = ease_out_cubic(k)
        draw_text(img, (70, base_y - 80 * e), str(prev), nf, NAVY, 1 - e, "ls", clip)
        draw_text(img, (70, base_y + 80 * (1 - e)), str(v), nf, NAVY, e, "ls", clip)
    else:
        draw_text(img, (70, base_y), str(v), nf, NAVY, 1, "ls", clip)
    target = 70 + nf.getlength(str(v)) / S + 14
    state["min_x"] = target if state.get("min_x") is None else lerp(state["min_x"], target, 0.3)
    draw_text(img, (state["min_x"], base_y), "min", font(SEMI, 54), NAVY, 1, "ls")

    # etapas
    y, xs = 1592, (110, 540, 970)
    d.line(sc(xs[0], y, xs[2], y), fill=LINE, width=8 * S)
    f1 = ease_in_out_cubic(prog(t, T_DEP, T_DEP + 0.35))
    fill_x = lerp(xs[0], xs[1], f1) if f1 < 1 else lerp(xs[1], xs[2], p)
    d.line(sc(xs[0], y, fill_x, y), fill=ACCENT, width=8 * S)
    labels = ("Confirmado", "A caminho", "Entregue")
    starts = (None, T_DEP + 0.3, T_ARR)
    for i, (x, label, t0) in enumerate(zip(xs, labels, starts)):
        k = 1.0 if t0 is None else prog(t, t0, t0 + 0.4)
        circle(d, x, y, 20, fill=WHITE, outline=LINE, width=6 * S)
        if k > 0:
            circle(d, x, y, 22 * (ease_out_back(k) if k < 1 else 1), fill=GREEN if i == 2 else ACCENT)
            kc = prog(k, 0.35, 1)
            if kc > 0:
                stroke(d, partial([(x - 9, y + 1), (x - 3, y + 7), (x + 9, y - 6)], ease_out_cubic(kc)), WHITE, 4.5)
        col = lerp_rgb(GRAY, NAVY, clamp(k * 2))
        draw_text(img, (x, 1654), label, font(SEMI, 28), col, 1, "ms")


STATUS = [(0.0, "Preparando seu pedido", ACCENT), (T_DEP, "Saiu para entrega", ACCENT),
          (T_ARR, "Pedido entregue!", GREEN)]


def draw_pill(img, d, t):
    paste_sprite(img, *PILL, (W / 2, PILL_Y))
    idx = max(i for i, s in enumerate(STATUS) if s[0] <= t)
    k = ease_out_cubic(clamp((t - STATUS[idx][0]) / 0.35)) if idx else 1.0
    dot = lerp_rgb(STATUS[idx - 1][2], STATUS[idx][2], k) if idx else STATUS[0][2]
    dx = PILL_X0 + 50
    ph = (t % 1.2) / 1.2
    circle(d, dx, PILL_Y, 12 + 16 * ph, fill=(*dot, round(110 * (1 - ph))))
    circle(d, dx, PILL_Y, 12, fill=dot)
    clip = (PILL_X0 + 70, PILL_Y - PILL_H / 2 + 8, PILL_X0 + PILL_W - 110, PILL_Y + PILL_H / 2 - 8)
    f = font(SEMI, 34)
    if k < 1:
        draw_text(img, (PILL_X0 + 82, PILL_Y - 34 * k), STATUS[idx - 1][1], f, NAVY, 1 - k, "lm", clip)
    draw_text(img, (PILL_X0 + 82, PILL_Y + 34 * (1 - k)), STATUS[idx][1], f, NAVY, k, "lm", clip)
    draw_text(img, (PILL_X0 + PILL_W - 36, PILL_Y), "#4821", font(REG, 26), GRAY, 1, "rm")


def draw_confetti(d, t):
    ox, oy = HOUSE[0], HOUSE[1] - 84
    for c in CONFETTI:
        tt = t - (T_ARR + 0.1) - c["delay"]
        if tt <= 0:
            continue
        drag = (1 - math.exp(-1.6 * tt)) / 1.6
        x = ox + c["vx"] * drag
        y = oy + c["vy"] * drag + 900 * tt * tt
        a = 1 - prog(tt, 0.85, 1.3)
        if a <= 0:
            continue
        rot = c["rot"] + c["vr"] * tt
        hw, hh = c["w"] / 2, c["h"] / 2 * abs(math.cos(c["flip"] * tt))
        cs, sn = math.cos(rot), math.sin(rot)
        pts = [(x + px * cs - py * sn, y + px * sn + py * cs) for px, py in ((-hw, -hh), (hw, -hh), (hw, hh), (-hw, hh))]
        d.polygon([tuple(sc(*pt)) for pt in pts], fill=(*c["color"], round(255 * a)))


def draw_intro(img, d, t):
    if t >= T_SLIDE[1]:
        return
    oy = -(H + 120) * ease_in_out_cubic(prog(t, *T_SLIDE))
    d.rounded_rectangle(sc(0, -200 + oy, W, H + oy), radius=80 * S, fill=ACCENT)
    cx, cy = W / 2, 790 + oy

    kr = prog(t, 0.42, 1.0)
    if 0 < kr < 1:
        r = 130 + 150 * ease_out_cubic(kr)
        circle(d, cx, cy, r, outline=(255, 255, 255, round(200 * (1 - kr))), width=round(S * (1 + 8 * (1 - kr))))
    kp = prog(t, 0.42, 0.95)
    if 0 < kp < 1:
        e = ease_out_cubic(kp)
        for i in range(12):
            ang = i * math.tau / 12 + 0.26
            rr = 165 + 160 * e
            circle(d, cx + math.cos(ang) * rr, cy + math.sin(ang) * rr, 11 * (1 - kp) + 1, fill=WHITE)

    k = prog(t, 0.08, 0.55)
    if k > 0:
        circle(d, cx, cy, 130 * (ease_out_back(k) if k < 1 else 1), fill=WHITE)
    kc = ease_in_out_cubic(prog(t, 0.42, 0.8))
    if kc > 0:
        stroke(d, partial([(cx - 58, cy + 4), (cx - 16, cy + 46), (cx + 62, cy - 40)], kc), ACCENT, 24)

    kt = ease_out_cubic(prog(t, 0.6, 1.0))
    draw_text(img, (W / 2, 1050 + oy + 40 * (1 - kt)), "Pedido confirmado!", font(BOLD, 76), WHITE, kt, "ms")
    ks = ease_out_cubic(prog(t, 0.75, 1.15))
    draw_text(img, (W / 2, 1122 + oy + 40 * (1 - ks)), "O Burger da Vila já está preparando",
              font(REG, 38), (255, 232, 222), ks, "ms")


def render(t, state):
    img = BASE.copy()
    d = ImageDraw.Draw(img, "RGBA")
    p = ease_in_out_sine(prog(t, T_DEP, T_ARR))
    draw_route(d, t, p)
    draw_ripple(d, t, T_DEP, RESTAURANT, ACCENT, 120)
    draw_ripple(d, t, T_ARR, HOUSE, ACCENT)
    draw_pins(img, t)
    draw_moto(img, d, t, p)
    draw_sheet(img, d, t, p, state)
    draw_pill(img, d, t)
    draw_confetti(d, t)
    draw_intro(img, d, t)
    return img.reduce(S)


def main():
    args = sys.argv[1:]
    if args and args[0] == "--preview":
        out_dir = Path(args[1])
        out_dir.mkdir(parents=True, exist_ok=True)
        for ts in args[2:]:
            render(float(ts), {}).save(out_dir / f"t{float(ts):05.2f}.png")
        return

    out = Path(args[0]) if args else OUT
    out.parent.mkdir(parents=True, exist_ok=True)
    cmd = [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error",
           "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
           "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-tune", "animation",
           "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    state = {}
    for i in range(N):
        proc.stdin.write(render(i / FPS, state).tobytes())
        if i % 30 == 0:
            print(f"quadro {i}/{N}", flush=True)
    proc.stdin.close()
    if proc.wait() != 0:
        sys.exit("ffmpeg falhou")
    print(f"ok -> {out}")


if __name__ == "__main__":
    main()
