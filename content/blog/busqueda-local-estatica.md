+++
title = "Búsqueda local en sitios estáticos"
description = "Cómo funciona el índice de búsqueda de Zola sin backend ni Node en producción."
date = 2026-05-20
draft = false
[taxonomies]
categories = ["Web"]
tags = ["búsqueda", "zola", "rendimiento"]
[extra]
toc = true
+++

Zola puede generar un índice JSON en el build (`build_search_index = true`). El navegador busca en ese fichero.

## Ventajas

- Sin API.
- Sin claves.
- Funciona offline tras la primera carga del índice (según caché).

## Uso en este sitio

Pulsa el icono de búsqueda o la tecla `/`. El script `static/js/search.js` carga `search_index.es.json` y filtra títulos y contenido.

## Límites

Para blogs muy grandes conviene valorar un servicio externo. Para un sitio personal, el índice local suele bastar.
