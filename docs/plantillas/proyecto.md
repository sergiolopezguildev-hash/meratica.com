# =============================================================================
# PLANTILLA DE PROYECTO
# -----------------------------------------------------------------------------
# Dónde guardar:  content/proyectos/nombre-sin-espacios.md
# Inglés (opcional): content/proyectos/nombre-sin-espacios.en.md
#
# Copia TODO este fichero, renómbralo, rellena y borra lo que no uses.
# =============================================================================

+++
# --- OBLIGATORIO -------------------------------------------------------------

# Nombre del proyecto (se ve en la lista y en la ficha)
title = "Nombre del proyecto"

# Frase corta: qué es
description = "Qué es este proyecto, en una frase"

# Orden en la lista: cuanto MÁS BAJO el número, MÁS ARRIBA sale (1, 2, 3…)
weight = 10

# --- OPCIONAL ----------------------------------------------------------------

# false por defecto. true = no se publica
# draft = false

# Datos que salen en la tarjeta y en botones de la ficha
[extra]
# Palabras clave del proyecto (tecnologías, temas…). Se muestran separadas por ·
stack = ["Idea", "Familia", "Web"]

# Enlace al código (botón "Ver código"). Si no hay, borra la línea o coméntala
# repo = "https://github.com/usuario/repo"

# Enlace a la demo o web del proyecto (botón "Ver demo")
# demo = "https://ejemplo.com"

# Imagen al compartir en redes (fichero en static/img/)
# og_image = "/img/mi-proyecto-og.png"

# Índice automático de la página del proyecto (si tiene muchos apartados)
# toc = true
+++

<!--
  A PARTIR DE AQUÍ VA EL CONTENIDO DE LA FICHA
-->

Párrafo de introducción: de qué va el proyecto y por qué se hizo.

## Qué hicimos

- Objetivo 1
- Objetivo 2
- Objetivo 3

## Cómo se hizo

Explica el proceso con tus palabras.

Puedes usar **negrita**, *cursiva* y [enlaces](https://example.com).

### Detalle técnico (opcional)

Lista numerada:

1. Primero
2. Después
3. Al final

## Resultado

Cuenta cómo quedó. ¿Se usa? ¿Qué aprendisteis?

## Enlaces útiles

- Documentación interna (si la hay)
- Referencias

## Imagen del proyecto

Sube la foto a `static/img/` y luego:

![Captura del proyecto](/img/proyecto-ejemplo.jpg)

O con pie de foto:

```md
{{ figure(src="img/proyecto-ejemplo.jpg", alt="Pantalla del proyecto", caption="Versión 1") }}
```

## Tabla (opcional)

| Campo | Valor |
| --- | --- |
| Estado | En curso / Terminado |
| Año | 2026 |
| Quién | Familia / Meratica |

## Cita o conclusión

> Una frase final que resuma el proyecto.

---

### Resumen rápido de apartados (cabecera +++ … +++)

| Apartado | Dónde se nota en la web |
| --- | --- |
| `title` | Título de la ficha y de la lista |
| `description` | Texto corto bajo el título en la lista |
| `weight` | Orden en `/proyectos/` (menor = antes) |
| `draft` | Si es `true`, no se publica |
| `[extra] stack` | Línea de etiquetas (Zola · HTML · …) |
| `[extra] repo` | Botón **Ver código** |
| `[extra] demo` | Botón **Ver demo** |
| `[extra] og_image` | Imagen al compartir el enlace |
| `[extra] toc` | Índice si la página es larga |
| Texto debajo de `+++` | Cuerpo de la ficha del proyecto |
