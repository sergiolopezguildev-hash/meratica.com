+++
title = "Desplegar Zola en Cloudflare Pages"
description = "Configuración recomendada: build command, ZOLA_VERSION, previews y cabeceras de seguridad."
date = 2026-02-03
draft = false
[taxonomies]
categories = ["DevOps"]
tags = ["cloudflare", "zola", "deploy"]
[extra]
toc = true
+++

Cloudflare Pages puede compilar Zola en cada push. No subas la carpeta `public/` al repositorio.

## Ajustes de build

| Campo | Valor |
| --- | --- |
| Framework preset | Zola |
| Build command | ver abajo |
| Output directory | `public` |
| Variable | `ZOLA_VERSION=0.22.1` |

### Build command con previews

```bash
if [ "$CF_PAGES_BRANCH" = "main" ]; then
  zola build
else
  zola build --base-url $CF_PAGES_URL
fi
```

## Cabeceras

El fichero `static/_headers` define CSP, `X-Frame-Options`, `Referrer-Policy` y más. Cloudflare las aplica automáticamente.

## Flujo de trabajo

Editar Markdown → commit → push → build → sitio publicado.

Sin servidores propios, sin PHP, sin Node en producción.
