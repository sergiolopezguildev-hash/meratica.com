+++
title = "Bienvenido al blog de Meratica"
description = "Primera entrada: qué encontrarás aquí y cómo está construido el sitio."
date = 2026-01-10
updated = 2026-01-12
draft = false
[taxonomies]
categories = ["General"]
tags = ["meta", "zola", "estático"]
[extra]
toc = true
+++

Este blog forma parte de un sitio **100 % estático** generado con [Zola](https://www.getzola.org/).

## Qué encontrarás

- Guías de despliegue y DevOps ligero.
- Notas sobre rendimiento, SEO y accesibilidad.
- Experimentos con HTML, CSS y poco JavaScript.

## Cómo se edita el contenido

1. Creas un fichero Markdown en `content/blog/`.
2. Añades front matter (título, fecha, taxonomías).
3. Haces `git push` y Cloudflare Pages ejecuta `zola build`.

## Ejemplo de código

```toml
title = "Mi artículo"
date = 2026-01-10
[taxonomies]
tags = ["ejemplo"]
```

## Siguiente paso

Explora las [categorías](/categories/) y [etiquetas](/tags/), o lee el artículo sobre despliegue en Cloudflare Pages.
