+++
title = "Generador de OG images (concepto)"
description = "Idea de pipeline para generar Open Graph estáticos en el build, sin runtime."
weight = 3
[extra]
stack = ["Diseño", "SEO", "Build"]
+++

Concepto: producir capturas OG en el pipeline de CI y servirlas como estáticos.

Todavía no está implementado aquí; el sitio usa `/img/og-default.png` como imagen social por defecto y permite override por página con `extra.og_image`.
