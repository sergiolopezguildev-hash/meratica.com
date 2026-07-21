# Despliegue en Cloudflare Pages

El HTML **no** se sube al repositorio. Cloudflare debe ejecutar **`zola build`** y publicar `public/`.

## Error frecuente: `npx wrangler deploy`

Si el log muestra:

```text
Executing user deploy command: npx wrangler deploy
```

el proyecto está mal configurado: Wrangler intenta subir un Worker/assets **sin haber compilado Zola**.

### Ajuste correcto (Pages → Connect to Git)

En **Settings → Builds**:

| Campo | Valor |
| --- | --- |
| Framework preset | **Zola** o **None** |
| Build command | ver abajo |
| Build output directory | `public` |
| Deploy command | **vacío** (no `npx wrangler deploy`) |
| Root directory | `/` |
| Production branch | `main` |

### Build command

```bash
if [ "$CF_PAGES_BRANCH" = "main" ]; then zola build; else zola build --base-url $CF_PAGES_URL; fi
```

### Variable de entorno

| Nombre | Valor |
| --- | --- |
| `ZOLA_VERSION` | `0.22.1` |

Guarda y lanza **Retry deployment**.

## Conflicto Hugo / Zola

El repo usa `zola.toml` (no `config.toml`) para que el detector no confunda el sitio con Hugo.

## Flujo

```text
Editar Markdown → git push → Cloudflare → zola build → public/ → sitio publicado
```

## Crear el proyecto desde cero

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Elige el repo `meratica.com`.
3. Aplica la tabla de arriba (Build command = `zola build`, output = `public`).
4. **No** elijas el flujo que deja como único comando `npx wrangler deploy`.

Si ya creaste un Worker por error, borra ese proyecto y crea uno nuevo tipo **Pages**, o cambia Builds a la configuración de esta guía.

## wrangler.toml

Hay un `wrangler.toml` con `[assets] directory = "./public"` por si usas Wrangler en local tras `zola build`. En Pages con Git, lo importante es el **Build command** del dashboard.

## Dominio

1. Custom domains en el proyecto Pages.
2. Actualiza `base_url` en `zola.toml`.
3. Descomenta HSTS en `static/_headers` cuando el HTTPS sea estable.

## Troubleshooting

| Síntoma | Qué revisar |
| --- | --- |
| `npx wrangler deploy` / Missing entry-point | Build command = `zola build`; Deploy vacío; output `public` |
| Multiple frameworks Hugo, Zola | Mantén `zola.toml`, no `config.toml` |
| 404 en CSS (previews) | Build command con `--base-url $CF_PAGES_URL` |
| `zola: not found` | `ZOLA_VERSION=0.22.1` |
