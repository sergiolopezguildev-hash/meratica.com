+++
title = "Comentarios sin backend con Giscus"
description = "Cómo integrar Giscus (GitHub Discussions) en un sitio estático sin base de datos."
date = 2026-03-15
draft = false
[taxonomies]
categories = ["Web"]
tags = ["giscus", "comentarios", "github"]
[extra]
toc = true
+++

Los comentarios de este sitio pueden activarse con **Giscus**: un widget que usa GitHub Discussions.

## Por qué Giscus

- Sin base de datos propia.
- Sin PHP ni Node en el servidor.
- Moderación con las herramientas de GitHub.
- Código abierto y respetuoso con la privacidad relativa a alternativas publicitarias.

## Pasos resumidos

1. Crea un repositorio (o usa el del sitio) y activa Discussions.
2. Instala la GitHub App [giscus](https://github.com/apps/giscus).
3. Configura [giscus.app](https://giscus.app) y copia `repo`, `repo_id`, `category` y `category_id`.
4. Pégalos en `zola.toml` bajo `[extra.giscus]` y pon `enabled = true`.

La documentación completa está en `docs/giscus.md`.

## Alternativa: Utterances

Utterances usa Issues en lugar de Discussions. Es válida si prefieres ese flujo; también se documenta en el mismo fichero.
