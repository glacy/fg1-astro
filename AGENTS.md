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
- **Página offline personalizada** (`src/pages/offline.astro`) con estilos autónomos (sin dependencias de componentes), dark/light mode, y botones de reintentar/volver al inicio. Configurada via `navigateFallback: '/offline'` en PWA Workbox.
- **Página de lecturas** (`/lecturas/`) usa `src/pages/lecturas/index.astro` con ShellLayout + lista de enlaces desde `getCollection('docs')`. Las páginas individuales (`/lecturas/semana-1/` etc.) son manejadas por Starlight nativamente, no por `[...slug].astro`.
- **`[...slug].astro` para lecturas fue eliminado** — Starlight maneja el ruteo y estilos de las páginas individuales de docs.

## View Transitions

- **Activado via `<ViewTransitions />`** en `ShellLayout.astro`. Solo aplica a páginas con ShellLayout (dashboard, planner, schedule, weekly). Starlight no se ve afectado (usa su propio layout).
- **`transition:animate="morph"`** en el wrapper de contenido de cada página (`<div>` inmediatamente dentro del `<slot>` de ShellLayout).
- **`transition:persist`** en elementos estáticos: barra superior móvil y botón de colapsar sidebar. No persisten en el sidebar completo (se re-renderiza para actualizar `activeTab`).
- **`<a>` links sobre botones JS** para navegación entre semanas. `WeekNavigation.astro` y `WeekItem.astro` usan `<a href="/weekly/{n}">` en lugar de `<button>` + `window.location.href`. Semanas bloqueadas: `aria-disabled="true"` + `pointer-events-none`.
- **`astro:after-swap`** para scripts que necesitan re-inicializarse tras una navegación VT. `ShellLayout.astro`, `planner/index.astro`, `schedule/index.astro`, `weekly/[semana].astro` lo usan.
- **No usar `window.location.href` para navegación** entre páginas con VT. Preferir `<a>` links nativos o `navigate()` de `astro:transitions/client`.

## Limpieza

- **Eliminar código comentado** antes de commit. No dejar `{/* ... */}` o `<!-- ... -->` en producción.
- **Eliminar directorios vacíos.**
- **Eliminar componentes no importados** (`MainLayout.astro` no tenía ningún import — fue eliminado).
- **Eliminar tipos locales** cuando existe un archivo compartido (`src/types.ts`).
