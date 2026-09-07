# Convenciones del proyecto

## Comandos

```bash
pnpm dev        # localhost:4321
pnpm build      # → dist/ (incluye SW PWA)
pnpm preview    # probar SW (dev no sirve sw.js)
pnpm typecheck  # tsc --noEmit
pnpm lint       # ESLint flat config
```

No hay `pnpm test` (Vitest en devDeps sin config; sitio estático).

## Arquitectura: dos sistemas de ruteo

| Sistema | Rutas | VT | SW |
|---|---|---|---|
| Astro pages → `ShellLayout.astro` | `/`, `/weekly/*`, `/planner`, `/schedule`, `/documentos/`, `/offline` | Sí | Sí |
| Starlight → `src/content/docs/` | `/semana-N/{lectura,practica,solucion}/` | No | Sí |

- Starlight rutea nativo — NO crear `[...slug].astro`.
- `disable404Route: true`: `src/pages/404.astro` es la única 404 del sitio.
- Starlight → ShellLayout: full page load. ShellLayout → Starlight: VT hace `fetch()` + SW responde.

## PWA / SW (`src/sw.ts`, modo `injectManifest`)

- Registro: `<script is:inline>` en ShellLayout, incondicional (sin `import.meta.env.DEV`).
- 404: filtrar `self.__WB_MANIFEST` antes de `precache()` (Workbox rechaza non-2xx).
- `precache` + `setDefaultHandler` (NO `precacheAndRoute` ni `NavigationRoute`): atrapa todos los request modes (VT usa fetch `same-origin`) y permite normalizar trailing slash: `matchPrecache(pathname.replace(/\/$/, '') || '/')` (requerido por URLs de Starlight).
- Offline: precache → network → `/offline` → 503. Sin `navigateFallback`.
- `public/manifest.json` `start_url: "/"` debe coincidir con ruta precacheada.

## ShellLayout (único layout de páginas Astro)

- `<ViewTransitions />` en head. Scripts de página se re-inicializan con `astro:after-swap`.
- Tema dark/light: script `is:inline` lee `localStorage` pre-render (evita flash).
- Theme toggle (`src/components/Sidebar.astro`): delegación de eventos en `document` (listener directo en botón se duplica tras VT).
- VT: `transition:persist` en elementos estáticos (barra móvil, botón sidebar); `transition:name="page-content"` en scroll container; navegar con `<a>` (nunca `<button>` + `location.href`); semanas bloqueadas: `aria-disabled` + `pointer-events-none`.

## Content Collections

- Semanas: `src/content/weeks/semana-N.json` (1..16), schema Zod en `src/content/config.ts`. Cargar con `await loadWeeksData()` → `Record<number, WeekData>` (async: await en frontmatter). Refs a docs: `url: "./../semana-0N/lectura/"`.
- Docs: `docs/semana-0N/{lectura,practica,solucion}.mdx` + `index.md`, con `week: N` en frontmatter; schema `docsSchema()`.
- Datos sin colección: JSON plano (ej. `src/lib/planner/exams.json`).
- `COURSE_CONFIG.maxCurrentWeek`: semana activa máxima (build-time).

## Markdown/KaTeX (docs académicas)

- Tablas: pipe tables. Sin grid tables, fenced divs ni LaTeX `tblr`.
- Math: `$...$` inline, `$$...$$` display. Usar `\vec{}`, `\times` (NO `\VEC{}`, `\tentimes`).
- KaTeX pinned a 0.18.1 via `pnpm.overrides` (CSS vendado: `public/katex.min.css` + `public/katex-fonts/`). Si se actualiza, alinear CSS/fuentes a la misma versión.
- Conversiones: `::: note` → `<div class="note">`; `{.smallcaps}` → `style="font-variant: small-caps;"`; `{.underline}` → `<u>`; refs cruzadas (`{#id}`) → texto plano; títulos `##` sin `{#cap:x}`.
- Figuras: `<figure>` + `<img>`, src relativa a `src/content/` o desde `public/`.
- Frontmatter docs: pattern en `src/content/docs/semana-01/lectura.mdx`.

## Filtros cliente

- Schedule (`src/lib/schedule-filter.client.ts`): `document.dispatchEvent(new CustomEvent("filter-change"))`; cards con `data-instructor|modalidad|dia`. Pills (`ScheduleFilters.astro`): sin `overflow-hidden` en contenedores (clipea ring), extremos `rounded-l/r-lg`, cada pill `relative focus-visible:z-10`.
- Planner (inline en `planner/index.astro`): botones `data-filter`, cards `data-date`.

## Varios

- Banner offline: `src/integrations/offline-banner.ts`, script inline global vía `injectScript('head-inline')` (funciona en ambos sistemas), re-ejecuta en `astro:after-swap`.
- `postcss.config.mjs` legacy — `@astrojs/tailwind` configura PostCSS internamente.
- Seguridad: `src/middleware.ts` (CSP deshabilitada en dev).
- Deploy: `git push origin main` → Vercel.
- Fuente Inter via `@fontsource/inter` importada en ShellLayout; var CSS `--font-geist-sans` en `src/styles/base.css`.
- Naming: JSON keys kebab-case; `.astro` PascalCase (componentes) / kebab-case (páginas).
