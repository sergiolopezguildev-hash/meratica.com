# Despliegue en Cloudflare Workers (sitio estático Zola)

Este proyecto usa el flujo oficial de Zola + Workers:

1. Cloudflare ejecuta `npx wrangler deploy`
2. Wrangler lanza `build.sh` (`[build]` en `wrangler.toml`)
3. El script instala Zola si hace falta y genera `public/`
4. Wrangler publica `[assets] directory = "./public"`

## Archivos clave

| Fichero | Rol |
| --- | --- |
| `build.sh` | Descarga Zola y ejecuta `zola build` |
| `wrangler.toml` | `[build]` + `[assets]` |
| `zola.toml` | Config del sitio (no `config.toml`, evita confusión con Hugo) |

## Variables de entorno

Un Worker **solo de assets** no permite Variables en el dashboard
(*«Variables cannot be added to a Worker that only has static assets»*).

No uses `BASE_URL` ahí. Opciones:

1. **Recomendado ahora:** enlaces root-relative (ya están en el repo). No necesitas variable.
2. Cuando tengas dominio: edita `base_url` en `zola.toml` y haz push.
3. Si más adelante añades un Worker con código, entonces sí podrás usar variables.


## Local

```bash
# Windows: usa Git Bash, WSL o zola directamente
zola build
npx wrangler deploy   # requiere login en Cloudflare
```

O solo:

```bash
zola serve
```

## Dominio

Custom domains en el Worker → actualiza `base_url` en `zola.toml`.

## Troubleshooting

| Síntoma | Qué revisar |
| --- | --- |
| `public` does not exist | Falta `[build]` / `build.sh` o el script falló |
| Multiple frameworks Hugo, Zola | Mantén `zola.toml` |
| CSS rotos en preview | `CF_PAGES_URL` en `build.sh` |
| Permiso denegado en `build.sh` | El script se invoca con `bash ./build.sh` |
