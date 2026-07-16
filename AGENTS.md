# Convenciones del proyecto

## Markdown para contenido académico

- Todas las tablas deben usar **pipe tables** (`| col1 | col2 |`), no grid tables, no fenced divs (`:::`) como contenedores de tablas, ni directivas LaTeX (`tblr`, `table*`).
- Usar pipe tables incluso para tablas anchas o con contenido matemático. Dividir en varias tablas simples si es necesario.
- LaTeX math: usar `$...$` inline y `$$...$$`/`\[...\]` display (KaTeX).
- No usar `\VEC{}`, `\tentimes`, `\text{\scriptsize{}}` ni otros comandos LaTeX personalizados — reemplazar con `\vec{}`, `\times`, y funciones estándar de KaTeX.
- Figuras: usar `<figure>` y `<img>` con `src` relativa a `src/content/` o absoluta desde `public/`.
- Fenced divs (`::: note`, `::: wwteorema`) no tienen soporte en Astro — usar `<div class="note">` HTML directamente para bloques destacados.
- `{.smallcaps}` → `<span style="font-variant: small-caps;">`
- `{.underline}` → `<u>`
- Referencias cruzadas (`{#etiqueta}`, `{reference-type="ref"}`) no tienen soporte nativo en Markdown estático — eliminarlas o usar texto plano.
- Títulos: usar `##` para secciones (no `{#cap:cap1}`).
