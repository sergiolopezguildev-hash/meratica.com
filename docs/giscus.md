# Giscus — comentarios sin backend

Este sitio usa **Giscus** (opcional) para comentarios. Giscus publica y lee [GitHub Discussions](https://docs.github.com/en/discussions). No hay base de datos ni servidor propio.

## Requisitos

- Cuenta de GitHub
- Un repositorio **público** (o privado con plan que permita la app)
- Discussions activadas en ese repositorio

## 1. Repositorio de comentarios

Puedes usar el mismo repo del sitio o uno dedicado (recomendado si quieres separar ruido):

```text
meratica/meratica-comments
```

## 2. Activar Discussions

1. Abre el repositorio en GitHub.
2. **Settings → General → Features → Discussions**.
3. Crea una categoría (p. ej. `Announcements` o `Comentarios del blog`).

## 3. Instalar la GitHub App

1. Ve a [https://github.com/apps/giscus](https://github.com/apps/giscus).
2. Instálala en la cuenta/organización.
3. Concedele acceso al repositorio de comentarios.

## 4. Obtener los identificadores

1. Abre [https://giscus.app](https://giscus.app) (interfaz en varios idiomas).
2. Elige:
   - repositorio
   - mapping: **pathname** (recomendado)
   - categoría de Discussions
   - tema: `preferred_color_scheme`
   - idioma: `es`
3. Copia del snippet generado:
   - `data-repo`
   - `data-repo-id`
   - `data-category`
   - `data-category-id`

## 5. Configurar este proyecto

En `zola.toml`:

```toml
[extra.giscus]
enabled = true
repo = "USUARIO/REPO-COMENTARIOS"
repo_id = "R_xxxxxxxx"
category = "Announcements"
category_id = "DIC_xxxxxxxx"
mapping = "pathname"
reactions_enabled = "1"
emit_metadata = "0"
input_position = "top"
theme = "gruvbox"
lang = "es"
loading = "lazy"
```

La plantilla `templates/partials/giscus.html` se incluye al final de cada artículo del blog.

## 6. CSP

`static/_headers` ya permite `giscus.app` en `script-src`, `style-src`, `frame-src` y `connect-src`. Si endureces la CSP, mantén esos orígenes.

## Alternativa: Utterances

[Utterances](https://utteranc.es/) usa **Issues** en lugar de Discussions.

1. Instala la app [utterances](https://github.com/apps/utterances).
2. Elige un repo público.
3. Sustituye el partial de Giscus por un script similar:

```html
<script
  src="https://utteranc.es/client.js"
  repo="USUARIO/REPO"
  issue-term="pathname"
  theme="preferred-color-scheme"
  crossorigin="anonymous"
  async>
</script>
```

Actualiza también la CSP (`utteranc.es`).

### ¿Por qué no Disqus?

Disqus añade mucho JavaScript, trackers y peso. Solo tendría sentido con requisitos de moderación corporativa que Giscus/Utterances no cubran.

## Privacidad

Los comentarios requieren cuenta de GitHub. Avisa en la página de privacidad/contacto si aplica en tu jurisdicción.
