# Despliegue en Cloudflare Pages

El HTML **no** se sube al repositorio. Cloudflare ejecuta Zola en cada push.

## Flujo

```text
Editar Markdown → git add → git commit → git push
        → GitHub → Cloudflare Pages → zola build → sitio publicado
```

## Crear el proyecto

1. Cuenta en [Cloudflare](https://dash.cloudflare.com/).
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Autoriza GitHub y elige este repositorio.
4. Configura el build:

| Ajuste | Valor |
| --- | --- |
| Production branch | `main` |
| Framework preset | **Zola** |
| Build command | ver abajo |
| Build output directory | `public` |
| Root directory | `/` (raíz del repo) |

### Build command (recomendado)

Soporta previews con `base_url` correcto:

```bash
if [ "$CF_PAGES_BRANCH" = "main" ]; then zola build; else zola build --base-url $CF_PAGES_URL; fi
```

### Variable de entorno

| Nombre | Valor sugerido |
| --- | --- |
| `ZOLA_VERSION` | `0.22.1` |

Usa la misma versión en local cuando puedas.

## Dominio

1. **Custom domains** en el proyecto Pages.
2. Añade `meratica.com` y `www` si aplica.
3. Actualiza `base_url` en `config.toml`.
4. Cuando el HTTPS esté estable, descomenta HSTS en `static/_headers`.

## Ramas

| Rama | Uso |
| --- | --- |
| `main` | Producción |
| `develop` | Integración / preview |

Cloudflare genera una URL de preview por rama y PR.

## Cabeceras y redirecciones

- `static/_headers` → seguridad + caché
- `static/_redirects` → redirecciones (p. ej. www → apex)

Se copian a `public/` en el build.

## Comprobar el build en local

```bash
zola build
# salida en ./public
```

Si el build local falla, el de Cloudflare también fallará.

## Troubleshooting

| Síntoma | Qué revisar |
| --- | --- |
| 404 en CSS | `base_url` / build de preview |
| Giscus no carga | CSP + `enabled = true` + IDs |
| Feeds rotos | `generate_feeds` y `feed_filenames` |
| Búsqueda vacía | `build_search_index` y `search_index.es.json` |
