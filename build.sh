#!/usr/bin/env bash
# Build para Cloudflare Workers (wrangler deploy ejecuta este script vía [build]).
set -euo pipefail

main() {
  ZOLA_VERSION="${ZOLA_VERSION:-0.22.1}"

  if ! command -v zola >/dev/null 2>&1; then
    echo "Descargando Zola ${ZOLA_VERSION}..."
    curl -sLJO "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
    tar -xf "zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
    ZOLA_BIN="./zola"
  else
    ZOLA_BIN="zola"
  fi

  echo "Usando: $($ZOLA_BIN --version)"

  # Prioridad de base_url:
  # 1) BASE_URL (variable en Cloudflare Dashboard)
  # 2) CF_PAGES_URL (previews de Pages)
  # 3) zola.toml (producción con dominio propio)
  if [ -n "${BASE_URL:-}" ]; then
    echo "Build con BASE_URL=${BASE_URL}"
    "$ZOLA_BIN" build --base-url "$BASE_URL"
  elif [ -n "${CF_PAGES_URL:-}" ]; then
    echo "Build con CF_PAGES_URL=${CF_PAGES_URL}"
    "$ZOLA_BIN" build --base-url "$CF_PAGES_URL"
  else
    "$ZOLA_BIN" build
  fi
}

main
