#!/usr/bin/env bash
# Build para Cloudflare Workers / local.
# La URL canónica SIEMPRE sale de la variable de entorno BASE_URL
# (wrangler.toml define un valor por defecto si no está exportada).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

# Carga .env local si existe (no se sube a Git; ver .env.example)
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

main() {
  ZOLA_VERSION="${ZOLA_VERSION:-0.22.1}"

  if [ -z "${BASE_URL:-}" ]; then
    echo "ERROR: falta BASE_URL."
    echo "  Local:  cp .env.example .env  &&  edita BASE_URL"
    echo "  Export: export BASE_URL=https://tu-dominio.example"
    echo "  Cloudflare Build: variable BASE_URL en la configuración de build"
    exit 1
  fi

  # Quita barra final para evitar // en rutas
  BASE_URL="${BASE_URL%/}"

  if ! command -v zola >/dev/null 2>&1; then
    echo "Descargando Zola ${ZOLA_VERSION}..."
    curl -sLJO "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
    tar -xf "zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
    ZOLA_BIN="./zola"
  else
    ZOLA_BIN="zola"
  fi

  echo "Usando: $($ZOLA_BIN --version)"
  echo "Build con BASE_URL=${BASE_URL}"
  "$ZOLA_BIN" build --base-url "$BASE_URL"
}

main
