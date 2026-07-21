# =============================================================================
# PLANTILLA DE ARTÍCULO DEL BLOG
# -----------------------------------------------------------------------------
# Dónde guardar:  content/blog/nombre-sin-espacios.md
# Inglés (opcional): content/blog/nombre-sin-espacios.en.md
#
# Copia TODO este fichero, renómbralo, rellena los campos y borra lo que no uses.
# Las líneas que empiezan por # dentro de +++ son comentarios: puedes dejarlas.
# =============================================================================

+++
# --- OBLIGATORIO -------------------------------------------------------------

# Título que se ve en la web y en Google
title = "Título del artículo"

# Frase corta (1 línea). Sale en listados y en redes al compartir
description = "Resumen corto en una frase"

# Fecha de publicación: AÑO-MES-DÍA (con guiones)
date = 2026-07-21

# false = se publica | true = borrador oculto (no sale en la web)
draft = false

# --- OPCIONAL PERO RECOMENDADO -----------------------------------------------

# Si lo editas después, pon la fecha de la última modificación
# updated = 2026-07-22

# Categorías y etiquetas (aparecen bajo el título y en /categories/ /tags/)
[taxonomies]
# Una o varias categorías (mejor 1)
categories = ["General"]
# Varias etiquetas entre comillas, separadas por comas
tags = ["familia", "notas", "ejemplo"]

# Opciones extra de este artículo
[extra]
# true = muestra el índice automático (tabla de contenidos) a la izquierda/arriba
toc = true

# true = activa fórmulas matemáticas KaTeX en ESTE artículo ($...$ y $$...$$)
# katex = false

# Imagen al compartir en WhatsApp/Twitter/Facebook (pon el fichero en static/img/)
# og_image = "/img/mi-articulo-og.png"
+++

<!--
  A PARTIR DE AQUÍ VA EL CONTENIDO DE LA PÁGINA
  (todo lo de abajo sale en el artículo)
-->

Escribe el **primer párrafo** aquí. Es el texto normal.

Puedes usar *cursiva*, **negrita** y ~~tachado~~.

---

## 1. Subtítulos

Usa `##` para secciones grandes y `###` para subapartados.
Si `toc = true`, estos títulos entran en el índice automático.

### Ejemplo de subapartado

Texto del subapartado.

## 2. Listas

Lista con viñetas:

- Primer punto
- Segundo punto
- Tercer punto

Lista numerada:

1. Paso uno
2. Paso dos
3. Paso tres

## 3. Enlaces

Enlace a otra web: [Meratica](https://meratica.sergio-lopez-guil-dev.workers.dev)

Enlace a otra página del sitio: [el blog](/blog/)

Enlace a otro artículo (si existe): [Bienvenido](@/blog/bienvenido.md)

## 4. Citas

> Esto es una cita. Sirve para destacar una frase de alguien
> o un aviso importante.

## 5. Código

Código en una línea: `zola build`

Bloque de código (se puede copiar con el botón de la web):

```toml
title = "Ejemplo"
date = 2026-07-21
```

```html
<p>Hola mundo</p>
```

## 6. Imágenes

### Opción A — Imagen sencilla (Markdown)

1. Sube el fichero a la carpeta `static/img/` (ej. `static/img/foto.jpg`)
2. Pon esto en el artículo:

![Descripción de la foto para accesibilidad](/img/foto.jpg)

### Opción B — Imagen avanzada (shortcode figure)

Sirve si tienes varios formatos (jpg + webp + avif).
Copia **exactamente** una de estas líneas en el artículo (sin cambiar las llaves `{{` `}}`):

```md
{{ figure(src="img/foto.jpg", alt="Descripción de la foto", caption="Pie de foto opcional") }}
```

Con más formatos (si los tienes en `static/img/`):

```md
{{ figure(src="img/foto.jpg", webp="img/foto.webp", avif="img/foto.avif", alt="Descripción", caption="Pie de foto", width="800", height="450") }}
```

## 7. Tablas

| Qué | Valor |
| --- | --- |
| Lugar | Playa |
| Fecha | 21 julio |
| Notas | Hizo buen tiempo |

## 8. Separador

Una línea horizontal:

---

## 9. Notas al pie

Texto con una nota[^1].

[^1]: Esto sale al final del artículo como nota a pie.

## 10. Avisos (GitHub alerts)

> [!NOTE]
> Nota informativa.

> [!TIP]
> Consejo útil.

> [!IMPORTANT]
> Algo importante.

> [!WARNING]
> Aviso / precaución.

> [!CAUTION]
> Peligro o error grave.

## 11. Fórmulas (solo si katex = true arriba)

Fórmula en línea: $E = mc^2$

Fórmula centrada:

$$
a^2 + b^2 = c^2
$$

## 12. Comentarios

No hace falta añadir nada: al final del artículo la web ya muestra
la sección de comentarios (Giscus), si está activada en el sitio.

---

### Resumen rápido de apartados (cabecera +++ … +++)

| Apartado | Para qué sirve |
| --- | --- |
| `title` | Título del artículo |
| `description` | Resumen / SEO / redes |
| `date` | Fecha de publicación |
| `updated` | Fecha de última edición (opcional) |
| `draft` | Ocultar o publicar |
| `[taxonomies] categories` | Carpeta temática (ej. General, Familia) |
| `[taxonomies] tags` | Etiquetas sueltas |
| `[extra] toc` | Índice automático |
| `[extra] katex` | Matemáticas |
| `[extra] og_image` | Imagen al compartir |
