# Cómo publicar en Meratica (guía sencilla)

Esta guía es para **añadir artículos al blog** o **fichas de proyectos** sin saber programación.

No hace falta instalar nada en el ordenador. Todo se hace en **GitHub** con el navegador.

Repositorio: https://github.com/sergiolopezguildev-hash/meratica.com

---

## Idea general

1. Entras en GitHub.
2. Creas un fichero de texto (Markdown).
3. Escribes el título, la fecha y el contenido.
4. Guardas (Commit).
5. En unos minutos la web se actualiza sola.

---

## Antes de empezar (solo la primera vez)

1. Abre el enlace del repositorio (arriba).
2. Inicia sesión en GitHub (cuenta que tenga permiso de edición).
3. En la rama elige **main** (arriba a la izquierda, junto al nombre de carpetas).

---

## Publicar un artículo del blog (español)

### Paso 1 — Abrir la carpeta del blog

1. Entra en la carpeta `content`
2. Entra en la carpeta `blog`

Verás ficheros como `bienvenido.md`. Esos son artículos.

### Paso 2 — Crear un fichero nuevo

1. Pulsa **Add file** → **Create new file**
2. En el nombre del fichero escribe algo así (sin espacios, sin tildes):

```text
content/blog/mi-nuevo-articulo.md
```

Ejemplos buenos de nombre:

- `viaje-a-la-playa.md`
- `receta-de-tortilla.md`
- `notas-del-fin-de-semana.md`

### Paso 3 — Pegar la plantilla y rellenar

Abre la plantilla completa (con **todos** los ejemplos explicados):

https://github.com/sergiolopezguildev-hash/meratica.com/blob/main/docs/plantillas/articulo-blog.md

1. Pulsa el fichero → icono de copiar (o selecciona todo y Ctrl+C)
2. Pégalo en tu fichero nuevo de `content/blog/`
3. Rellena título, fecha y texto
4. Borra las secciones de ejemplo que no necesites (tablas, fórmulas, etc.)

Versión mínima si solo quieres texto sencillo:

```md
+++
title = "Pon aquí el título"
description = "Una frase corta que resume el artículo"
date = 2026-07-21
draft = false
[taxonomies]
categories = ["General"]
tags = ["familia", "notas"]
[extra]
toc = true
+++

Escribe aquí el texto del artículo.

## Un subtítulo

- Una lista
- Con varios puntos

**Negrita** y *cursiva* también funcionan.
```

Qué debes cambiar:

| Campo | Qué poner |
| --- | --- |
| `title` | Título que se ve en la web |
| `description` | Resumen corto (1 frase) |
| `date` | Fecha: `AAAA-MM-DD` (ejemplo `2026-07-21`) |
| `categories` | Una categoría, por ejemplo `General` |
| `tags` | Etiquetas entre comillas, separadas por comas |
| El texto de abajo | El artículo completo |

Importante:

- No borres las líneas `+++`
- La fecha va con guiones: `2026-07-21`
- Si pones `draft = true`, **no se publica** (queda oculto)

### Paso 4 — Guardar (publicar)

1. Abajo del todo, en **Commit changes**
2. Título del commit (ejemplo): `Añade artículo sobre la playa`
3. Pulsa **Commit changes**

Espera 1–3 minutos y mira la web. El artículo saldrá en **/blog/**.

---

## Publicar un proyecto

### Paso 1 — Carpeta de proyectos

1. `content` → `proyectos`
2. **Add file** → **Create new file**
3. Nombre:

```text
content/proyectos/nombre-del-proyecto.md
```

### Paso 2 — Plantilla

Plantilla completa (todos los campos y ejemplos):

https://github.com/sergiolopezguildev-hash/meratica.com/blob/main/docs/plantillas/proyecto.md

Cópiala en `content/proyectos/…` y rellena. Versión mínima:

```md
+++
title = "Nombre del proyecto"
description = "Qué es, en una frase"
weight = 10
[extra]
stack = ["Idea", "Familia"]
# repo = "https://github.com/..."
# demo = "https://..."
+++

Explica aquí el proyecto con tus palabras.

## Qué hicimos

- Punto 1
- Punto 2

## Resultado

Cuenta cómo quedó.
```

Notas:

- `weight`: número. Cuanto **más bajo**, más arriba aparece (1, 2, 3…).
- `stack`: palabras clave del proyecto.
- `repo` y `demo` son opcionales (enlaces). Si no los usas, borra esas líneas o déjalas comentadas con `#`.

### Paso 3 — Commit

Igual que con el blog: **Commit changes**.

El proyecto saldrá en **/proyectos/**.

---

## Si también quieres versión en inglés

Solo si hace falta. El inglés es opcional.

- Artículo en español: `mi-articulo.md`
- Misma pieza en inglés: `mi-articulo.en.md` (mismo nombre + `.en` antes de `.md`)

Ejemplo:

- `viaje-a-la-playa.md` → español en `/blog/viaje-a-la-playa/`
- `viaje-a-la-playa.en.md` → inglés en `/en/blog/viaje-a-la-playa/`

Si no creas el `.en.md`, en inglés no existirá ese artículo (y es normal).

---

## Corregir un error o editar un texto

1. Encuentra el fichero en `content/blog/` o `content/proyectos/`
2. Ábrelo
3. Pulsa el lápiz (**Edit**)
4. Cambia lo que quieras
5. **Commit changes**

---

## Checklist rápido (blog)

- [ ] Estoy en la rama **main**
- [ ] El fichero está en `content/blog/`
- [ ] El nombre termina en `.md` y no tiene espacios
- [ ] Hay `title`, `date` y texto debajo de `+++`
- [ ] `draft = false`
- [ ] He pulsado **Commit changes**
- [ ] He esperado unos minutos y recargado la web

---

## Si algo falla

| Problema | Qué revisar |
| --- | --- |
| No aparece el artículo | ¿`draft = true`? ¿Commit en `main`? ¿Esperaste el despliegue? |
| Error raro al guardar | Revisa comillas y las líneas `+++` |
| Fecha mal | Usa formato `2026-07-21` |
| No tengo permiso | Pide acceso de escritura al dueño del repo |

Si no estás seguro, pide ayuda antes del commit: es mejor revisar juntos el texto una vez.

---

## Dónde pedir ayuda técnica

Guías más técnicas (para quien mantiene el sitio):

- Multiidioma y despliegue: `docs/cloudflare.md`
- Comentarios: `docs/giscus.md`
- README general: `README.md`
