# Despliegue en Cloudflare Workers (sitio estático Zola)

Este proyecto usa el flujo oficial de Zola + Workers:

1. Cloudflare ejecuta `npx wrangler deploy`
2. Wrangler lanza `build.sh` (`[build]` en `wrangler.toml`)
3. El script exige **`BASE_URL`** y ejecuta `zola build --base-url "$BASE_URL"`
4. Wrangler publica `[assets] directory = "./public"`

## BASE_URL (obligatoria en el build)

Toda la URL canónica del sitio (canonical, Open Graph, feeds, índice de búsqueda) sale de **`BASE_URL`**.

Sin barra final. Ejemplos:

```text
https://meratica.sergio-lopez-guil-dev.workers.dev
https://meratica.com
```

### Dónde definirla

| Entorno | Cómo |
| --- | --- |
| Cloudflare (recomendado) | `wrangler.toml` → comando `[build]` ya pone un valor por defecto; puedes **sobrescribir** con la variable de build `BASE_URL` si tu proyecto lo permite |
| Local | `cp .env.example .env` y edita `BASE_URL`, luego `bash ./build.sh` |
| Shell | `export BASE_URL=https://...` y `bash ./build.sh` |

Nota: un Worker **solo de assets** no admite *Worker Variables* en el dashboard (*«Variables cannot be added to a Worker that only has static assets»*). Por eso el valor por defecto va en el comando de `[build]` de `wrangler.toml`, y `.env` es solo local (no se sube a Git).

Cuando tengas dominio propio, cambia:

1. El valor por defecto en `wrangler.toml` (`[build].command`)
2. `.env.example` (y tu `.env` local)
3. Opcional: `base_url` en `zola.toml` (solo afecta a `zola serve` sin script)

## Archivos clave

| Fichero | Rol |
| --- | --- |
| `build.sh` | Exige `BASE_URL`, descarga Zola si hace falta, `zola build --base-url` |
| `wrangler.toml` | `[build]` + `[assets]` + default de `BASE_URL` |
| `.env.example` | Plantilla local |
| `zola.toml` | Config del sitio (fallback local) |

## Dashboard

1. **Workers & Pages** → proyecto → conecta el repo.
2. Deploy command: `npx wrangler deploy`
3. No hace falta Build command aparte: va en `wrangler.toml`.

## Local

```bash
cp .env.example .env
# edita BASE_URL si hace falta
bash ./build.sh
npx wrangler deploy   # opcional; requiere login
```

O solo desarrollo:

```bash
zola serve
```

(`zola serve` usa `base_url` de `zola.toml`; el deploy real usa `BASE_URL`.)

## Troubleshooting

| Síntoma | Qué revisar |
| --- | --- |
| `ERROR: falta BASE_URL` | Exporta `BASE_URL` o crea `.env` / revisa el default en `wrangler.toml` |
| `public` does not exist | Falló `build.sh` antes de generar el sitio |
| CSS/enlaces raros | `BASE_URL` incorrecta o con barra final mal puesta |
| Multiple frameworks Hugo, Zola | Mantén `zola.toml`, no `config.toml` |
