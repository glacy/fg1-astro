# Convenciones del proyecto

## Comandos

```bash
pnpm dev        # dev server → localhost:4321
pnpm build      # build → dist/ (incluye PWA SW)
pnpm preview    # preview del build (necesario para probar SW)
pnpm typecheck  # tsc --noEmit (único verification que funciona)
```

`pnpm lint` y `pnpm test` fallan — ESLint y Vitest declarados en devDependencies pero sin config.

## PWA (Service Worker)

- **Registro**: `<script is:inline>` en `ShellLayout.astro` — necesario `is:inline` para evitar tree-shaking en producción. No usar `import.meta.env.DEV` condicional.
- **404 exclusion**: `globIgnores: ['**/404*']` en `astro.config.mjs:42` — Workbox rechaza precacheo de respuestas non-2xx (la página 404 sirve con status 404).
- **navigateFallback**: `'/offline'` — navegaciones a URLs no precacheadas sirven `src/pages/offline.astro`.
- **navigateFallbackDenylist**: `[/^\/lecturas/]` — Starlight genera rutas con trailing slash (`/lecturas/semana-1/`) que no matchean precache entries (Workbox `cleanURLs: true` + `directoryIndex` son incompatibles). Excluidas del NavigationRoute para que pasen por red.
- **Build → Preview**: Probar SW requiere `pnpm build && pnpm preview`. Dev server no sirve `sw.js`.

## ShellLayout — layout único

`src/layouts/ShellLayout.astro` es el único layout. Contiene:
- `<ViewTransitions />` en `<head>` — activa VT solo en páginas con ShellLayout. Starlight no se ve afectado.
- Tema dark/light: script `is:inline` que lee `localStorage` antes de renderizar (evita flash).
- SW registration: script `is:inline` incondicional.
- Sidebar: colapsable en desktop, drawer en mobile.
- Todos los scripts de página se re-inicializan con `document.addEventListener("astro:after-swap", fn)`.

VT reglas:
- `transition:persist` en barra móvil y botón colapsar sidebar (elementos estáticos).
- `transition:name="page-content"` en el scroll container.
- Navegación entre semanas: `<a href="/weekly/{n}">`, no `<button>` + `location.href`.
- Semanas bloqueadas: `aria-disabled="true"` + `pointer-events-none`.

## Rutas

| Ruta | Archivo | Notas |
|---|---|---|
| `/` | `src/pages/index.astro` | Dashboard con semana actual, stats, cards |
| `/weekly/{n}` | `src/pages/weekly/[semana].astro` | `getStaticPaths()` genera 1..`maxCurrentWeek` |
| `/weekly/` | `src/pages/weekly/index.astro` | Redirect 302 → `/weekly/{maxCurrentWeek}` |
| `/planner` | `src/pages/planner/index.astro` | Filtros cliente (btn + pill animada) |
| `/schedule` | `src/pages/schedule/index.astro` | Filtros cliente (CustomEvent + data-attributes) |
| `/lecturas/` | `src/pages/lecturas/index.astro` | ShellLayout + lista de docs |
| `/lecturas/semana-N/` | Starlight | Starlight maneja ruteo nativo, NO `[...slug].astro` |
| `/offline` | `src/pages/offline.astro` | Estilos inline autónomos, sin dep de componentes |

## Content Collections

- **Semanas**: `src/content/weeks/semana-N.json` (N = 1..16). Schema Zod en `src/content/config.ts`.
  - Cargar con `await loadWeeksData()` (usa `getCollection('weeks')`) → retorna `Record<number, WeekData>`.
  - Async, requiere `await` en frontmatter de páginas/componentes.
- **Lecturas**: Starlight docs en `src/content/docs/`. Schema via `docsSchema()`.
- **JSON plano** (`src/lib/planner/exams.json`) solo para datos sin colección propia.

## Contenido Markdown (lecturas académicas)

- Tablas: pipe tables (`\| col1 \| col2 \|`). No grid tables, fenced divs, ni LaTeX `tblr`.
- Math KaTeX: `$...$` inline, `$$...$$` / `\[...\]` display.
- No `\VEC{}`, `\tentimes`, `\text{\scriptsize{}}`. Usar `\vec{}`, `\times`, estándar KaTeX.
- Figuras: `<figure>` + `<img>` con `src` relativa a `src/content/` o absoluta desde `public/`.
- Bloques destacados (`::: note`, `::: wwteorema`) no existen en Astro → `<div class="note">`.
- `{.smallcaps}` → `<span style="font-variant: small-caps;">`
- `{.underline}` → `<u>`
- Referencias cruzadas (`{#etiqueta}`, `{reference-type="ref"}`) no tienen soporte → texto plano.
- Títulos usar `##` (no `{#cap:cap1}`).

## Filtros cliente

- **Schedule** (`src/lib/schedule-filter.client.ts`): `document.dispatchEvent(new CustomEvent("filter-change"))` → las cards tienen `data-instructor`, `data-modalidad`, `data-dia`.
- **Planner** (inline en `planner/index.astro`): filter buttons con `data-filter`, pill animada. Cards tienen `data-date`.

## Varios

- `postcss.config.mjs` es legacy — `@astrojs/tailwind` configura PostCSS internamente.
- `COURSE_CONFIG.maxCurrentWeek` define la semana activa máxima (build-time, no client-side).
- `public/manifest.json` tiene `start_url: "/"`. Si se cambia, debe coincidir con una ruta precachead por el SW.
- Deploy automático: `git push origin main` → Vercel.
- Fuente Inter autohosteada via `@fontsource/inter`, importada en ShellLayout. CSS var `--font-geist-sans` en `src/styles/base.css`.
- JSON keys en kebab-case. Archivos `.astro` en PascalCase (componentes) o kebab-case (páginas).
