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

## Composición de componentes

- **Preferir composición sobre duplicación inline.** Si un componente existe (`ScheduleTable`, `ScheduleFilters`) y cumple la función, úsalo en lugar de copiar su markup.
- **Data-attributes para interactividad cliente.** Cuando un componente estático necesite ser manipulado por JS del lado cliente, añadir data-attributes semánticos (`data-instructor`, `data-modalidad`, `data-dia`) en lugar de depender de selectores frágiles como estructuras de clases.
- **Transiciones CSS** deben definirse en el componente dueño del elemento, no en la página que lo usa.

## Datos

- **Content Collections para datos del curso.** Preferir `src/content/<coleccion>/` con schema Zod sobre archivos JSON planos. Cada semana tiene su propio archivo (`semana-N.json`), validado en build-time con el schema definido en `src/content/config.ts`.
- **`loadWeeksData()` para datos semanales.** Las semanas se cargan via `await loadWeeksData()` (usa `getCollection('weeks')`) que retorna `Record<number, WeekData>`. Esta función es async y debe usarse con `await` en el frontmatter de páginas/componentes.
- **Archivos `.json` planos** (tipo `exams.json`) solo para datos que no justifican una colección independiente. Preferir Content Collections cuando los datos tengan una estructura repetitiva y necesiten validación de schema.
- **Arrays sobre campos planos.** Para colecciones de enlaces o items repetitivos, usar arrays tipados (`ExamLink[]`) en lugar de campos individuales (`instructionsUrl`, `instructionsUrl2`, ...).
- **JSON keys en kebab-case.**

## CSS y tema

- **CSS custom properties globales** se declaran en `src/styles/base.css`. No duplicarlas en layouts individuales.
- **Google Fonts** se autohostean con `@fontsource/{nombre}`, importando solo los pesos necesarios. No usar `@import url()` en bloques `<style>`.
- **`--font-geist-sans`** se define en `base.css` para que la clase `font-sans` de Tailwind use la fuente autohosteada.

## Páginas

- **La raíz (`/`)** es un dashboard, no un redirect. Muestra navegación rápida (`<a>` cards), tarjeta de la semana actual, y stats de evaluaciones.
- **La semana actual** se determina en build-time desde `COURSE_CONFIG.maxCurrentWeek`. No hay detección client-side de la fecha real.

## Limpieza

- **Eliminar código comentado** antes de commit. No dejar `{/* ... */}` o `<!-- ... -->` en producción.
- **Eliminar directorios vacíos.**
- **Eliminar componentes no importados** (`MainLayout.astro` no tenía ningún import — fue eliminado).
- **Eliminar tipos locales** cuando existe un archivo compartido (`src/types.ts`).
