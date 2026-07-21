# Despliegue en Cloudflare Pages

El HTML **no** se sube al repositorio. Cloudflare ejecuta Zola en cada push.

## Conflicto Hugo / Zola

Este repo usa `zola.toml` (no `config.toml`) y `wrangler.toml` con `pages_build_output_dir`.
Así se evita el error de autoconfig *«multiple frameworks were found: Hugo, Zola»*
(Hugo también busca `config.toml` + `themes/`).

## Flujo

```text
Editar Markdown → git add → git commit → git push
        → GitHub → Cloudflare Pages → zola build → sitio publicado
```

## Crear el proyecto

1. Cuenta en [Cloudflare](https://dash.cloudflare.com/).
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Autoriza GitHub y elige este repositorio.
4. Configura el build **a mano** (no dejes que el preset autoelija si falla):

| Ajuste | Valor |
| --- | --- |
| Production branch | `main` |
| Framework preset | **Zola** (o None) |
| Build command | ver abajo |
| Build output directory | `public` |
| Root directory | `/` (raíz del repo) |

### Build command (recomendado)

```bash
if [ "$CF_PAGES_BRANCH" = "main" ]; then zola build; else zola build --base-url $CF_PAGES_URL; fi
```

### Variable de entorno

| Nombre | Valor sugerido |
| --- | --- |
| `ZOLA_VERSION` | `0.22.1` |

### wrangler.toml

En la raíz del repo hay un `wrangler.toml` con `pages_build_output_dir = "./public"`.
Eso marca el proyecto como Pages estático y evita la detección automática conflictiva.

## Dominio

1. **Custom domains** en el proyecto Pages.
2. Añade `meratica.com` y `www` si aplica.
3. Actualiza `base_url` en `zola.toml`.
4. Cuando el HTTPS esté estable, descomenta HSTS en `static/_headers`.

## Ramas

| Rama | Uso |
| --- | --- |
| `main` | Producción |
| `develop` | Integración / preview |

## Cabeceras y redirecciones

- `static/_headers` → seguridad + caché
- `static/_redirects` → redirecciones (p. ej. www → apex)

## Comprobar el build en local

```bash
zola build
```

## Troubleshooting

| Síntoma | Qué revisar |
| --- | --- |
| Multiple frameworks Hugo, Zola | Usa `zola.toml` + `wrangler.toml`; no uses `config.toml` |
| 404 en CSS | `base_url` / build de preview |
| Giscus no carga | CSP + `enabled = true` + IDs |
| Feeds rotos | `generate_feeds` y `feed_filenames` |
| Búsqueda vacía | `build_search_index` y `search_index.es.json` |
