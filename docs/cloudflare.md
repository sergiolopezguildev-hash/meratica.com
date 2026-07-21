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

## Dashboard

1. **Workers & Pages → Create →** conecta el repo (Workers está bien con este setup).
2. Deja el deploy command: `npx wrangler deploy` (por defecto).
3. Opcional: env `ZOLA_VERSION=0.22.1`.

No hace falta un Build command aparte: el build va dentro de Wrangler.

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
