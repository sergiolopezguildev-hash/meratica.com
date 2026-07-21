+++
title = "CSS moderno sin frameworks"
description = "Variables CSS, light/dark mode y diseño responsive sin Bootstrap ni utilidades masivas."
date = 2026-04-02
draft = false
[taxonomies]
categories = ["Frontend"]
tags = ["css", "diseño", "accesibilidad"]
[extra]
toc = true
+++

Este proyecto usa **Sass compilado por Zola** y variables CSS nativas. No hay Bootstrap ni Tailwind en producción.

## Principios

- Tokens de diseño en `:root` (`--bg`, `--text`, `--accent`…).
- Layout con Flexbox y Grid.
- Modo claro/oscuro con `data-theme` y `prefers-color-scheme`.
- Foco visible y contraste cuidando WCAG.

## Ejemplo

```css
:root {
  --accent: #0b6e4f;
  --bg: #f7f8fa;
}

html[data-theme="dark"] {
  --accent: #3dd68c;
  --bg: #0b1220;
}
```

## Resultado

Menos CSS enviado, más control, y un aspecto propio — no una plantilla genérica de framework.
