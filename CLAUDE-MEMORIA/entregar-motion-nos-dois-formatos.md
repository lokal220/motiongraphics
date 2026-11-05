---
name: entregar-motion-nos-dois-formatos
description: "Todo vídeo de motion pedido pela usuária sai sempre em dois formatos, vertical 9:16 e horizontal 16:9"
metadata:
  node_type: memory
  type: feedback
  originSessionId: f90425c4-abe9-4db1-acd5-4e3419a09254
  modified: 2026-10-27T12:52:10.154Z
---

Todo vídeo de motion que a usuária pedir neste estúdio é entregue sempre nos dois formatos: vertical 9:16 (1080×1920, para Reels) e horizontal 16:9 (1920×1080). Vale para todos os próximos filmes, mesmo quando o pedido citar um formato só.

**Why:** ela pediu um filme só em 16:9 (o 10) e depois precisou dele em 9:16 para postar no Instagram. A remontagem vertical depois do filme pronto seria cara e demorada, e a adaptação rápida (16:9 centralizado com faixas) deixa a imagem e as legendas pequenas no celular. Em 27/10/2026 ela pediu que isso virasse regra.

**How to apply:**
- Planeje os dois formatos desde a lista de planos: composição, área segura e tamanhos de texto de cada um (no vertical, legenda de ~72 px e área segura de 12% em cima e 20% embaixo). O modelo da skill motion-reel já aceita `--formato`, com estados por formato (`F.porFormato`).
- Renderize e confira os dois: CRF 16, -14 LUFS e loop exato em cada um.
- Entregue os dois MP4 em `resultados/`, com o formato no nome (ex.: `-vertical` e `-horizontal`).
- Nunca entregue só um dos formatos sem perguntar.

Ver também [[estudio-motion-vai-de-lokal]].
