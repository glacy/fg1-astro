# Convenciones del proyecto

## Comandos

```bash
pnpm dev        # dev server → localhost:4321
pnpm build      # build → dist/ (incluye PWA SW)
pnpm preview    # preview del build (necesario para probar SW)
pnpm typecheck  # tsc --noEmit (verificación TypeScript)
pnpm lint       # ESLint flat config (eslint.config.mjs)
```

`pnpm test` no configurado — Vitest declarado en devDependencies pero sin config. No es necesario actualmente (sitio estático, sin lógica de negocio compleja).

## PWA (Service Worker)

- **Modo**: `injectManifest` (vs `generateSW`). SW custom en `src/sw.ts`.
- **Registro**: `<script is:inline>` en `ShellLayout.astro` — necesario `is:inline` para evitar tree-shaking en producción. No usar `import.meta.env.DEV` condicional.
- **404 exclusion**: `vite-plugin-pwa` ignora `globPatterns`/`globIgnores` en modo `injectManifest` (usa el build graph de Vite/Rollup). La exclusión se hace en `src/sw.ts` filtrando `self.__WB_MANIFEST` antes de `precache()` — Workbox rechaza precacheo de respuestas non-2xx (la página 404 sirve con status 404).
- **setDefaultHandler vs NavigationRoute**: El handler por defecto (`setDefaultHandler`) reemplazó `NavigationRoute`. Motivo: `NavigationRoute` solo atrapa `request.mode === 'navigate'` (navegación nativa). View Transitions usa `fetch()` con `mode: 'same-origin'`, y sin normalización de trailing slash, el navegador mostraba su error nativo offline. `setDefaultHandler` atrapa todos los modos de request.
- **precache vs precacheAndRoute**: Se usa `precache` (solo poblado, sin ruteo) en vez de `precacheAndRoute`. `precacheAndRoute` registra una ruta que puede interceptar requests y retornar `undefined` si la entrada de caché falta, impidiendo que el default handler los procese. Con `precache` + `setDefaultHandler`, todos los requests pasan por el mismo handler con normalización de trailing slash.
- **Trailing slash normalization**: `src/sw.ts` normaliza trailing slashes antes de buscar en precache (`matchPrecache(pathname.replace(/\/$/, '') || '/')`). Resuelve la incompatibilidad entre `cleanURLs: true` de Workbox y los trailing slashes de Starlight (`/lecturas/semana-1/` → busca `lecturas/semana-1` en precache).
- **Offline fallback**: SW intenta precache → network → `/offline` → `503 "Sin conexión"`. Sin `navigateFallback` ni `navigateFallbackAllowlist` — toda la lógica en `src/sw.ts`.
- **Build → Preview**: Probar SW requiere `pnpm build && pnpm preview`. Dev server no sirve `sw.js`.

## Banner offline/online

`src/integrations/offline-banner.ts` — Astro integration que inyecta un script inline en todas las páginas vía `injectScript('head-inline')`.

Funciona tanto en ShellLayout como en Starlight (no depende de layouts específicos). Crea un `<div>` fixed en `top:0` con `z-index:9999` y transiciones CSS.

| Transición | Texto | Color | Comportamiento |
|---|---|---|---|
| Online → Offline | "Sin conexión — algunos contenidos pueden no estar disponibles" | Ámbar (`#fef3cd`) | Aparece, se desvanece tras 5s |
| Offline → Online | "Conectado" | Verde (`#d4edda`) | Aparece, sube tras 2.5s |

Usa un flag `r` (previous state, inicializado en `null`) para detectar transiciones reales vs carga inicial. Se re-ejecuta en `astro:after-swap` para VT.

## Dos sistemas de ruteo

El sitio combina dos sistemas de renderizado independientes bajo el mismo dominio:

| Sistema | Layout | View Transitions | SW precache | Rutas |
|---|---|---|---|---|
| **Astro pages** (ShellLayout) | `ShellLayout.astro` | Sí | Sí | `/`, `/weekly/*`, `/planner`, `/schedule`, `/lecturas/` (índice) |
| **Starlight docs** | Starlight (propio) | No | Sí | `/lecturas/semana-N/` |

**Interacciones entre sistemas:**
- Navegar desde ShellLayout a Starlight: VT intercepta, hace `fetch()`, SW responde desde precache (trailing slash normalizado vía `matchPrecache`) o red → Starlight renderiza su layout.
- Navegar desde Starlight a ShellLayout: full page load (Starlight no tiene VT). ShellLayout scripts (theme, SW registration) corren de nuevo.
- Navegar dentro de ShellLayout: VT + SW precache.
- Navegar dentro de Starlight: Starlight maneja internamente, sin VT ni SW.

**`disable404Route: true`**: Starlight tiene ruta 404 propia que colisiona con `src/pages/404.astro`. Se deshabilita la de Starlight para que `404.astro` (con variantes dark/light y navegación) sea la única página 404 del sitio.

## ShellLayout — layout único

`src/layouts/ShellLayout.astro` es el único layout de las páginas Astro. Contiene:
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

| Ruta | Sistema | Archivo | Notas |
|---|---|---|---|
| `/` | ShellLayout | `src/pages/index.astro` | Dashboard con semana actual, stats, cards |
| `/weekly/{n}` | ShellLayout | `src/pages/weekly/[semana].astro` | `getStaticPaths()` genera 1..`maxCurrentWeek` |
| `/weekly/` | ShellLayout | `src/pages/weekly/index.astro` | Redirect 302 → `/weekly/{maxCurrentWeek}` |
| `/planner` | ShellLayout | `src/pages/planner/index.astro` | Filtros cliente (btn + pill animada) |
| `/schedule` | ShellLayout | `src/pages/schedule/index.astro` | Filtros cliente (CustomEvent + data-attributes) |
| `/lecturas/` | ShellLayout | `src/pages/lecturas/index.astro` | ShellLayout + lista de docs |
| `/lecturas/semana-N/` | Starlight | `src/content/docs/` | Starlight maneja ruteo nativo, NO `[...slug].astro` |
| `/offline` | ShellLayout | `src/pages/offline.astro` | Estilos inline autónomos, sin dep de componentes |

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
