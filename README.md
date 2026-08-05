# FG1 — Física General I

Un sitio web de curso universitario, rápido como una landing page.

Estudiantes acceden al plan semanal, evaluaciones, horarios de atención y lecturas desde cualquier dispositivo, incluso sin internet. Profesores pueden adaptarlo como plantilla para sus propios cursos.

## Secciones

| Ruta | Sistema | Qué encontrás |
|---|---|---|
| `/` | Astro | Dashboard con la semana actual, stats de evaluaciones y acceso rápido a cada sección |
| `/weekly/{n}` | Astro | Plan detallado de la semana n: objetivos, contenidos, materiales, actividades (getStaticPaths) |
| `/weekly/` | Astro | Redirección 302 → `/weekly/{maxCurrentWeek}` |
| `/planner` | Astro | Calendario de evaluaciones con filtros (todas, hoy, próximas) |
| `/schedule` | Astro | Horarios de atención estudiantil — filtrá por docente, modalidad o día |
| `/documentos/` | Astro | Índice navegable de lecturas por semana (ShellLayout) |
| `/semana-N/{lectura|practica|solucion}/` | Starlight | Lecturas, prácticas y soluciones académicas con fórmulas KaTeX, ejercicios interactivos |
| `/offline` | Astro | Página offline personalizada con estilos inline autónomos |
| `/404` | Astro | Página no encontrada personalizada con variantes dark/light y navegación |

## Características

- **Sin recarga de página** — View Transitions en ShellLayout (`<ViewTransitions />`): navegación instantánea con `transition:animate="morph"` en wrappers de contenido. Elementos estáticos (`#sidebar-toggle`, barra móvil) con `transition:persist`. Starlight no se ve afectado (ruteo propio)
- **Instalable como PWA** — Service worker custom (`src/sw.ts`, Workbox `injectManifest`), manifiesto, iconos maskables. Offline fallback con 3 niveles: precache → network → `/offline` → 503
- **Modo oscuro/claro** — Persiste en `localStorage`, sin flash al cargar. Script `is:inline` en ShellLayout lee preferencia antes de renderizar
- **Responsive** — Sidebar colapsable en desktop, menú drawer en mobile. Banner offline en todos los tamaños
- **Filtros en cliente** — Horarios (CustomEvent + data-attributes) y evaluaciones (inline JS) se filtran al instante sin recargar
- **100% estático** — HTML prerenderizado, cero JavaScript en carga inicial (solo scripts inline críticos)
- **Ejercicios interactivos** — Web Components nativos (MultipleChoice, Exercise) con validación instantánea, feedback visual y animations
- **Matemáticas renderizadas** — KaTeX 0.18.1 (única versión forzada en `package.json` con overrides), soporte para inline (`$...$`) y display (`$$...$$`), macros estándar
- **Offline/Online banner** — Integración personalizada `offline-banner.ts` con transiciones suaves (5s offline, 2.5s online)
- **SEO optimizado** — Sitemap, robots.txt, OpenGraph, Twitter Cards, Schema.org JSON-LD. Descripción mejorada en `src/content/docs/index.md`
- **Seguridad** — Headers CSP, X-Frame-Options, X-XSS-Protection via middleware. Meta tags adicionales en ShellLayout (referrer, permissions-policy)

## Componentes principales

### Componentes Astro (reutilizables)

| Componente | Funcionalidad |
|---|---|
| `ShellLayout.astro` | Layout único de Astro pages: sidebar, footer, `<ViewTransitions />`, theme script, SW registration |
| `Sidebar.astro` | Navegación lateral con iconos, colapso desktop, drawer mobile, delegación de eventos VT-safe |
| `WeekTimeline.astro` | Línea de tiempo semanal con navegación entre semanas (VT-enabled via `<a>` links) |
| `WeekItem.astro` | Ítem individual de timeline, sem bloqueadas con `aria-disabled="true"` + `pointer-events-none` |
| `WeekNavigation.astro` | Botones anterior/siguiente semana (VT-enabled via `<a>` links) |
| `ScheduleTable.astro` | Tabla de horarios con `data-instructor`, `data-modalidad`, `data-dia` para filtrado cliente |
| `ScheduleFilters.astro` | Pills de filtro (modalidad/día) con `rounded-l-lg`/`rounded-r-lg` en extremos |
| `ExamCard.astro` | Tarjeta de evaluación con links dinámicos desde `exams.json` array `links[]` |
| `ExamStats.astro` | Estadísticas de evaluaciones (upcoming/today) calculadas desde datos |
| `Filters.astro` | Filtros de planner con pill animada (CSS transitions) |
| `LinkCard.astro` | Tarjeta de enlace a recursos (`variant: default | evaluation`) |
| `Section.astro` | Contenedor de sección con iconos dinámicos por título |
| `ObjectivesList.astro` | Lista de objetivos de aprendizaje |
| `ContentList.astro` | Lista de contenidos de la semana |
| `PageHeader.astro` | Encabezado reutilizable (título + subtítulo) |
| `NavCard.astro` | Tarjeta de navegación del dashboard (href, icon, title, description, color) |
| `Footer.astro` | Pie de página con datos del curso (`variant: minimal | full`) |

### Componentes educativos

| Componente | Tipo | Funcionalidad |
|---|---|---|
| `MultipleChoice.astro` | Web Component nativo | Preguntas de selección múltiple con validación instantánea, feedback visual (correct/wrong), animations CSS (`tada`, `nope`), `data-isCorrect` en input radio |
| `Option.astro` | Componente Astro | Opción individual para `<MultipleChoice>` con template de feedback opcional |
| `Exercise.astro` | Web Component nativo | Ejercicios interactivos con hints y soluciones desplegables |
| `ExerciseHint.astro` | Componente Astro | Hint/pista para ejercicios |
| `ExerciseBlock.astro` | Componente Astro | Bloque contenedor de ejercicios |
| `Box.astro` | Componente Astro | Contenedores reutilizables (`icon: question-mark | check-list`) con iconos dinámicos |
| `PreCheck.astro` | Componente Astro | Lista de objetivos de pre-evaluación antes de cada lectura |

### Componentes Starlight/MDX

| Componente | Funcionalidad |
|---|---|
| `KaTeXStyles.astro` | Estilos optimizados para fórmulas matemáticas KaTeX 0.18.1 |
| `SistemaCartesiano.astro` | Diagrama interactivo del sistema de coordenadas rectangulares |
| `SistemaPolar.astro` | Diagrama interactivo del sistema de coordenadas polares |

## Stack técnico

| Capa | Tecnología |
|---|---|
| **Framework** | [Astro 7.1](https://astro.build) (static output, server-side rendering) |
| **UI/Componentes** | Componentes `.astro` + JavaScript vanilla (no frameworks cliente) |
| **Estilos** | [TailwindCSS 3.4](https://tailwindcss.com) (dark mode vía clase) |
| **Documentación académica** | [Starlight 0.41](https://starlight.astro.build) (lecturas, prácticas, soluciones) |
| **Matemáticas** | [KaTeX 0.18.1](https://katex.org) (remark-math + rehype-katex) |
| **PWA** | `@vite-pwa/astro` + Workbox 7 (modo injectManifest, SW custom en src/sw.ts) |
| **Iconos** | [astro-icon](https://github.com/natemoo-re/astro-icon) + Lucide |
| **Interactividad** | Web Components nativos (MultipleChoice, Exercise) + CustomEvents |
| **Fuentes** | Inter (autohosteada con `@fontsource/inter`) |
| **Imágenes** | Astro Image + Sharp (optimización WebP/AVIF) |
| **Build** | Vite 6 + pnpm 8.15.8 |
| **Deploy** | Vercel (static hosting) |
| **SEO** | Sitemap, robots.txt, OpenGraph, Schema.org JSON-LD |
| **Calidad** | TypeScript 5.7, ESLint 9 (flat config), Biome 2.5 |

## Arquitectura

### Sistema dual de renderizado

El sitio combina dos sistemas de renderizado independientes bajo el mismo dominio:

| Sistema | Layout | View Transitions | SW precache | Rutas |
|---|---|---|---|---|
| **Astro pages** | ShellLayout.astro | Sí | Sí | `/`, `/weekly/*`, `/planner`, `/schedule`, `/documentos/` (índice) |
| **Starlight docs** | Starlight (propio) | No | Sí | `/semana-N/{lectura|practica|solucion}/` |

**Interacciones entre sistemas:**
- Navegar desde ShellLayout → Starlight: VT intercepta, hace `fetch()`, SW responde desde precache (trailing slash normalizado) o red → Starlight renderiza su layout
- Navegar desde Starlight → ShellLayout: full page load (Starlight no tiene VT). Scripts se re-inicializan
- Navegar dentro de ShellLayout: VT + SW precache (instantáneo)
- Navegar dentro de Starlight: Starlight maneja internamente, sin VT ni SW

### Componentes educativos

| Componente | Tipo | Funcionalidad |
|---|---|---|
| `MultipleChoice.astro` | Web Component nativo | Preguntas de selección múltiple con validación instantánea, feedback visual (correct/wrong), animations |
| `Exercise.astro` | Web Component nativo | Ejercicios interactivos con hints y soluciones desplegables |
| `Box.astro` | Componente Astro | Contenedores reutilizables (question-mark, check-list) con iconos dinámicos |
| `PreCheck.astro` | Componente Astro | Lista de objetivos de pre-evaluación antes de cada lectura |
| `KaTeXStyles.astro` | Componente Astro | Estilos optimizados para fórmulas matemáticas (única versión 0.18.1) |

### Librería de librerías

```
src/lib/
├── shared/
│   ├── config.ts            # Configuración centralizada (curso, temas, breakpoints)
│   ├── theme.ts             # Utilidades de tema dark/light (vanilla JS)
│   ├── media.ts             # Detección mobile
│   └── index.ts             # Barrel export
├── weekly/
│   └── weeks.ts             # Tipos + loadWeeksData() (getCollection desde content/weeks/) + COURSE_CONFIG
├── planner/
│   ├── index.ts             # Lógica de planner (Exam, ExamLink, getExams, getStats, filterExams)
│   └── exams.json           # Datos de evaluaciones con array links[]
├── schedule.ts              # Lógica de horarios (formatLocation, filterInstructors)
├── schedule-filter.client.ts # Filtrado cliente de horarios (CustomEvent + data-attributes)
├── instructors.ts           # Datos de instructores (tipos en src/types.ts)
├── types.ts                 # Tipos compartidos: Attention, Instructor
└── remark-mdx-math-brace-fix.mjs # Plugin MDX para corregir sintaxis KaTeX en brace expressions
```

### Integraciones Astro personalizadas

| Integración | Funcionalidad |
|---|---|
| `offline-banner.ts` | Banner de conexión online/offline con transiciones suaves (5s offline, 2.5s online) |
| `remark-mdx-math-brace-fix.mjs` | Plugin MDX para corregir sintaxis KaTeX en brace expressions (math mode en JSX) |

### Service Worker (PWA) - src/sw.ts

- **Modo**: `injectManifest` (vs `generateSW`). SW custom en `src/sw.ts`.
- **Registro**: `<script is:inline>` en `ShellLayout.astro` — necesario `is:inline` para evitar tree-shaking en producción.
- **Estrategia**: Precache → Network → Offline fallback (`/offline`) → 503
- **Normalización de trailing slashes**: SW normaliza antes de `matchPrecache()` (resuelve incompatibilidad Workbox/Starlight)
- **Trailing slash normalization**: `src/sw.ts` normaliza trailing slashes antes de buscar en precache (`matchPrecache(pathname.replace(/\/$/, '') || '/')`)
- **404 exclusion**: Filtra `self.__WB_MANIFEST` en `src/sw.ts` antes de `precache()` — Workbox rechaza respuestas non-2xx
- **setDefaultHandler vs NavigationRoute**: `setDefaultHandler` reemplazó `NavigationRoute` para atrapar todos los modos de request (incluyendo VT `fetch()` con `mode: 'same-origin'`)

### Content Collections

- **Semanas**: `src/content/weeks/semana-N.json` (N = 1..16). Schema Zod en `src/content/config.ts`.
  - Cargar con `await loadWeeksData()` (usa `getCollection('weeks')`) → retorna `Record<number, WeekData>`.
  - Async, requiere `await` en frontmatter de páginas/componentes.
  - Referencias a docs: `url: "./../semana-0N/lectura/"` (formato por semana)
- **Lecturas**: Starlight docs en `src/content/docs/`. Schema via `docsSchema()`.
  - Estructura: `docs/semana-0N/{lectura|practica|solucion}.mdx` + `index.md` por semana
  - Cada semana tiene `week: N` en frontmatter para agrupación
  - Soporta KaTeX, múltiples componentes (Box, PreCheck, MultipleChoice, Exercise)

### Filtros cliente

- **Schedule**: `src/lib/schedule-filter.client.ts` — `document.dispatchEvent(new CustomEvent("filter-change"))` → cards tienen `data-instructor`, `data-modalidad`, `data-dia`
- **Planner**: Inline en `planner/index.astro` — filter buttons con `data-filter`, pill animada. Cards tienen `data-date`

### Offline/Online Banner

`src/integrations/offline-banner.ts` — Astro integration que inyecta un script inline en todas las páginas vía `injectScript('head-inline')`. Crea un `<div>` fixed en `top:0` con `z-index:9999` y transiciones CSS.

| Transición | Texto | Color | Comportamiento |
|---|---|---|---|
| Online → Offline | "Sin conexión — algunos contenidos pueden no estar disponibles" | Ámbar (`#fef3cd`) | Aparece, se desvanece tras 5s |
| Offline → Online | "Conectado" | Verde (`#d4edda`) | Aparece, sube tras 2.5s |

Usa un flag `r` (previous state, inicializado en `null`) para detectar transiciones reales vs carga inicial. Se re-ejecuta en `astro:after-swap` para VT.

## Desarrollo

```bash
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # Build → dist/
pnpm preview        # Preview del build
pnpm test           # Vitest
pnpm lint           # ESLint
pnpm typecheck      # tsc --noEmit
```

## Deploy

```bash
git push origin main   # Vercel deploy automático
```

## Documentación del proyecto

- [Estructura del proyecto](./PROJECT_STRUCTURE.md)
- [Convenciones de desarrollo](./AGENTS.md)
- [Documentación de la migración](./MIGRATION_DOCUMENTATION.md)

## Licencia

| Componente | Licencia |
|---|---|
| Código fuente (componentes, layouts, lib, config) | [MIT](./LICENSE) |
| Contenido educativo (lecturas, planes semanales, exámenes, PDFs) | [CC BY-SA 4.0](./LICENSE-content) |

---

**Legacy**: [fg1 (React SPA)](https://github.com/glacy/fg1) · **Actual**: fg1-astro
