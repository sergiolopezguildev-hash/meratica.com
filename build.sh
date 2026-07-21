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

  if [ -n "${CF_PAGES_URL:-}" ] && [ "${CF_PAGES_BRANCH:-main}" != "main" ]; then
    echo "Build preview → ${CF_PAGES_URL}"
    "$ZOLA_BIN" build --base-url "$CF_PAGES_URL"
  else
    "$ZOLA_BIN" build
  fi
}

main
