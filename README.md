# Meratica.com

Sitio web **100 % estático** generado con [Zola](https://www.getzola.org/), desplegado en **Cloudflare Pages**.

Blog con taxonomías, RSS, búsqueda local, modo claro/oscuro, SEO, cabeceras de seguridad y comentarios opcionales vía **Giscus** (sin backend ni base de datos).

## Decisiones técnicas

| Decisión | Motivo |
| --- | --- |
| Zola (Rust) | Un binario, rápido, sin Node en el toolchain de contenido |
| Plantillas propias (sin tema npm) | Control total y menos deuda a largo plazo |
| Sass compilado por Zola | Organización modular sin bundler |
| JS mínimo | Tema, menú, búsqueda, copiar código, volver arriba |
| Giscus | Comentarios sin servidor propio |
| Cloudflare Pages | Build en el edge + CDN global; `public/` fuera de Git |
| `_headers` | CSP y políticas de seguridad en el edge |

## Requisitos

- [Git](https://git-scm.com/)
- [Zola](https://www.getzola.org/documentation/getting-started/installation/) **0.22.x** (recomendado `0.22.1`)
- Editor de texto / IDE

### Instalar Zola

**Windows (Scoop)**

```powershell
scoop install zola
```

**macOS (Homebrew)**

```bash
brew install zola
```

**Linux**: descarga el binario desde [Releases](https://github.com/getzola/zola/releases).

Comprueba:

```bash
zola --version
```

## Arranque local

```bash
git clone <url-del-repo> Meratica.com
cd Meratica.com
zola serve
```

Abre `http://127.0.0.1:1111`.

Build de producción:

```bash
zola build
# salida en ./public (ignorada por Git)
```

## Estructura del proyecto

```text
/
├── zola.toml          # Configuración Zola + extra del sitio
├── content/             # Markdown
│   ├── _index.md
│   ├── blog/
│   ├── proyectos/
│   ├── quien-soy.md
│   └── contacto.md
├── templates/           # Tera
│   ├── base.html
│   ├── blog/
│   ├── proyectos/
│   ├── partials/
│   ├── macros/
│   └── shortcodes/
├── sass/                # Estilos (→ public/style.css)
├── static/              # Assets copiados tal cual
│   ├── css/ js/ img/ fonts/ favicon/
│   ├── _headers         # Seguridad Cloudflare
│   └── _redirects
├── docs/                # Guías (Giscus, Cloudflare)
└── wrangler.toml        # Cloudflare Pages (salida: public/)
```

## Crear contenido

### Artículo de blog

Crea `content/blog/mi-articulo.md`:

```toml
+++
title = "Título"
description = "Resumen para SEO y listados"
date = 2026-07-21
[taxonomies]
categories = ["Web"]
tags = ["zola", "ejemplo"]
[extra]
toc = true
# katex = true
# og_image = "/img/mi-og.png"
+++

Contenido en Markdown…
```

### Página

Crea un Markdown en la raíz de `content/`, por ejemplo `content/quien-soy.md` → `/quien-soy/`.

### Proyecto

Añade un Markdown en `content/proyectos/` con `extra.stack`, `extra.repo`, `extra.demo` si aplica.

### Imágenes

Preferencia AVIF → WebP → JPG/PNG. Shortcode:

```md
{{ figure(src="img/foto.jpg", webp="img/foto.webp", avif="img/foto.avif", alt="Descripción", caption="Pie") }}
```

## Funcionalidades

- Blog: categorías, etiquetas, paginación, TOC, lectura estimada, prev/next, relacionados, RSS/Atom
- Búsqueda local (`/` o icono)
- Modo claro / oscuro / sistema
- Copiar bloques de código
- Breadcrumbs, skip link, foco visible
- Sitemap, robots.txt, Open Graph, Twitter Cards, JSON-LD
- KaTeX opcional por página (`extra.katex = true`)
- Manifest PWA ligero
- Giscus (desactivado hasta configurar IDs)

## Configuración útil (`zola.toml`)

- `base_url` — URL canónica de producción
- `extra.nav` — menú
- `extra.giscus` — comentarios
- `extra.enable_*` — interruptores de UI
- `taxonomies` — categories / tags

## Despliegue (Cloudflare Pages)

Guía completa: [docs/cloudflare.md](docs/cloudflare.md).

Resumen:

1. Conecta el repo como proyecto **Pages** (no como Worker con solo Wrangler).
2. Build command:

   ```bash
   if [ "$CF_PAGES_BRANCH" = "main" ]; then zola build; else zola build --base-url $CF_PAGES_URL; fi
   ```

3. Output directory: `public`
4. Deploy command: **vacío** (no uses `npx wrangler deploy`)
5. Env: `ZOLA_VERSION=0.22.1`
6. Production branch: `main`

No subas `public/` a Git.

## Comentarios (Giscus)

Guía completa: [docs/giscus.md](docs/giscus.md).

1. Repo + Discussions + app Giscus  
2. IDs desde [giscus.app](https://giscus.app)  
3. `[extra.giscus] enabled = true` en `zola.toml`

Alternativa documentada: **Utterances**.

## Git y ramas

```bash
git init
git add .
git commit -m "Initial commit: sitio estático Meratica con Zola"
git branch -M main
git branch develop
git checkout develop
```

- `main` — producción  
- `develop` — integración / previews  

## Seguridad

`static/_headers` define:

- Content-Security-Policy  
- X-Frame-Options / frame-ancestors  
- Referrer-Policy  
- Permissions-Policy  
- X-Content-Type-Options  

HSTS: descomentar cuando el dominio propio sirva HTTPS de forma estable.

## Mantenimiento

| Tarea | Acción |
| --- | --- |
| Nuevo artículo | Markdown en `content/blog/` + push |
| Cambiar menú | `extra.nav` en `zola.toml` |
| Actualizar Zola | Local + `ZOLA_VERSION` en Cloudflare |
| Revisar enlaces | `zola check` |
| Dependencias JS | Ninguna de npm; solo scripts en `static/js/` |

## Actualizar Zola

1. Lee el [changelog](https://github.com/getzola/zola/blob/master/CHANGELOG.md).
2. Actualiza el binario local.
3. Ajusta `ZOLA_VERSION` en Cloudflare Pages.
4. Ejecuta `zola build` y corrige avisos.

## Licencia

[MIT](LICENSE).

## Publicar desde cero (checklist)

1. Instalar Zola y clonar/crear el repo.  
2. Editar `zola.toml` (`base_url`, autor, redes).  
3. Sustituir contenido de ejemplo.  
4. `zola serve` y revisar local.  
5. Crear repo en GitHub; push `main` y `develop`.  
6. Conectar Cloudflare Pages (build + `ZOLA_VERSION`).  
7. Configurar dominio y (opcional) HSTS.  
8. Activar Giscus si quieres comentarios.  
9. Verificar Lighthouse, sitemap (`/sitemap.xml`) y feeds (`/atom.xml`, `/rss.xml`).
