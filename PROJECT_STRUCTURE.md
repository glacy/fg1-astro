# Estructura de Proyecto

## Directorio Raíz

```
fg1-astro/
├── astro.config.mjs           # Configuración principal de Astro (integraciones, PWA, imágenes)
├── package.json               # Dependencias y scripts del proyecto
├── tsconfig.json              # Configuración TypeScript
├── tailwind.config.mjs        # Configuración TailwindCSS (darkMode: 'class')
├── postcss.config.mjs         # Configuración PostCSS
├── eslint.config.mjs          # ESLint flat config (TypeScript + Astro)
├── pnpm-workspace.yaml       # Configuración workspace (monoproject)
├── AGENTS.md                 # Convenciones del proyecto (AI-assisted coding)
├── LICENSE                   # Licencia MIT (código fuente)
├── LICENSE-content           # Licencia CC BY-SA 4.0 (contenido educativo)
├── vercel.json               # Configuración Vercel (redirects)
├── .gitignore                # Archivos ignorados por Git
├── .env.example              # Ejemplo de variables de entorno
├── .env.local                # Variables de entorno locales
├── README.md                 # Documentación del proyecto
├── MIGRATION_DOCUMENTATION.md# Documentación técnica de migración
├── PROJECT_STRUCTURE.md      # Este archivo
└── setup-astro.sh            # Script de setup
```

---

## src/

### src/pages/
Rutas Astro (estático prerenderizado). Define las rutas de la aplicación.

```
src/pages/
├── index.astro              # Dashboard principal: navegación, semana actual, stats
├── 404.astro                # Página no encontrada personalizada con variantes
├── weekly/
│   ├── [semana].astro       # Página dinámica de semana (getStaticPaths)
│   └── index.astro          # Redirección a /weekly/1
├── planner/
│   └── index.astro          # Evaluaciones con filtros cliente (data-attributes)
├── schedule/
│   └── index.astro          # Horarios de atención (usa ScheduleTable + ScheduleFilters)
├── lecturas/
│   └── index.astro          # Índice de lecturas con lista navegable (ShellLayout)
├── offline.astro            # Página offline personalizada (PWA offline fallback)
├── auth/                    # (vacío — sin implementar)
└── robots.txt.ts           # Endpoint API de robots.txt
```

### src/layouts/
Layouts reutilizables para estructura de páginas.

```
src/layouts/
└── ShellLayout.astro        # Layout único con sidebar, footer, theme, PWA, Google Fonts (Inter via @fontsource)
```

### src/components/
Componentes Astro (estáticos, renderizados en servidor). Se prefiere composición sobre duplicación inline.

```
src/components/
├── Sidebar.astro            # Navegación lateral con iconos y colapso
├── Footer.astro             # Pie de página con datos del curso (variant: minimal | full)
├── WeekTimeline.astro       # Línea de tiempo semanal (navegación entre semanas)
├── WeekItem.astro           # Ítem individual de la línea de tiempo (usado como <a> link con VT)
├── WeekNavigation.astro     # Botones anterior/siguiente (usados como <a> links con VT)
├── LinkCard.astro           # Tarjeta de enlace a recursos (variant: default | evaluation)
├── Section.astro            # Contenedor de sección con iconos dinámicos por título
├── ObjectivesList.astro     # Lista de objetivos de aprendizaje
├── ContentList.astro        # Lista de contenidos
├── ExamStats.astro          # Estadísticas de evaluaciones (upcoming / today)
├── Filters.astro            # Filtros con pill animada (planner)
├── ExamCard.astro           # Tarjeta de evaluación (links dinámicos desde array)
├── PageHeader.astro         # Encabezado reutilizable (título + subtítulo)
├── NavCard.astro            # Tarjeta de navegación del dashboard (href, icon, title, description, color)
├── ScheduleFilters.astro    # Filtros de horario (docente, modalidad, día)
├── ScheduleTable.astro      # Tabla de horarios de atención (data-attributes para filtro cliente)
├── ScheduleTable.astro      # Tabla de horarios de atención (data-attributes para filtro cliente)
```

### src/lib/
Lógica compartida y datos. Separación clara entre lógica (`.ts`) y datos (`.json`).

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
└── types.ts                 # Tipos compartidos: Attention, Instructor
```

### src/sw.ts
Service Worker custom (Workbox `injectManifest`). Maneja precache, normalización de trailing slashes y offline fallback.
Se compila desde `src/sw.ts` → `dist/sw.js` via Vite + `@vite-pwa/astro`.

### src/styles/
Estilos globales. CSS custom properties de tema (shadcn/ui) centralizadas aquí.

```
src/styles/
└── base.css                 # CSS custom properties (tema, colores semanticos, fuente)
```

### src/content/
Content Collections de Astro para lecturas académicas.

```
src/content/
├── config.ts                # Esquema y configuración de colecciones (docs + weeks)
├── weeks/                   # Colección de datos semanales (schema validado con Zod)
│   ├── semana-1.json
│   ├── semana-2.json
│   ├── ...
│   └── semana-16.json
└── docs/
    ├── index.md             # Índice de lecturas
    └── lecturas/
        ├── semana-1.mdx     # Lectura de semana 1 (Markdown + KaTeX)
        └── semana-2.mdx     # Lectura de semana 2
```

---

## public/
Assets estáticos servidos directamente sin procesamiento.

```
public/
├── favicon.svg              # Favicon
├── vite.svg                 # Vite logo (generado por defecto)
├── manifest.json            # Web App Manifest (PWA)
├── icon-192.png             # PWA icon 192x192
├── icon-512.png             # PWA icon 512x512
├── icon-192-maskable.png    # PWA icon 192x192 (maskable)
├── icon-512-maskable.png    # PWA icon 512x512 (maskable)
├── screenshot-wide.png      # PWA screenshot desktop (1920x1080)
├── screenshot-narrow.png    # PWA screenshot mobile (480x800)
├── programa-del-curso.pdf   # Programa del curso
├── examenes/                # Exámenes, soluciones, instrucciones (PDF)
├── lecturas/                # Lecturas semanales (PDF)
├── practicas/               # Prácticas semanales (PDF)
├── soluciones/              # Soluciones de prácticas (PDF)
├── tareas/                  # Tareas y soluciones (PDF)
└── proyecto/                # Proyecto del curso (PDF, DOCX)
```

---

## Archivos generados por build (dist/)

No versionados. Se generan con `npm run build`.

```
dist/
├── index.html               # Redirección a /weekly (con SW registration)
├── 404.html                 # Página 404
├── favicon.svg
├── manifest.json
├── sw.js                    # Service Worker (Workbox injectManifest, custom desde src/sw.ts)
├── registerSW.js            # Script de registro SW (generado automáticamente)
├── icon-192.png             # (copiado de public/)
├── icon-512.png
├── icon-192-maskable.png
├── icon-512-maskable.png
├── screenshot-wide.png
├── screenshot-narrow.png
├── programa-del-curso.pdf
├── weekly/
│   ├── index.html           # Redirección a /weekly/1
│   ├── 1/index.html         # Semana 1
│   ├── 2/index.html         # Semana 2
│   ├── 3/index.html         # Semana 3
│   ├── 4/index.html         # Semana 4
│   └── 5/index.html         # Semana 5
├── planner/index.html
├── schedule/index.html
├── examenes/                # (copiado de public/, excepto HTML)
├── lecturas/
├── practicas/
├── soluciones/
├── tareas/
├── proyecto/
└── _astro/                  # Assets procesados (CSS, JS, imágenes WebP)
    ├── index.mG3zob0T.css
    ├── client.CpeL31wX.js
    ├── theme.BS4OW52L.js
    ├── Sidebar.astro_*.js
    ├── ShellLayout.astro_*.js
    └── photo-*.webp         # Imágenes Unsplash optimizadas
```

---

## Convenciones de nomenclatura

| Tipo | Convención | Ejemplos |
|---|---|---|
| Archivos Astro | PascalCase | `ShellLayout.astro`, `WeekTimeline.astro` |
| Páginas Astro | kebab-case | `index.astro`, `404.astro`, `[semana].astro` |
| Directorios | kebab-case | `src/components/`, `src/layouts/` |
| Librerías/utilidades | camelCase | `config.ts`, `theme.ts`, `instructors.ts` |
| Assets estáticos | kebab-case | `icon-192.png`, `screenshot-wide.png` |
| Datos (JSON) | kebab-case | `weeks.json`, `exams.json` |

---

## Flujo de archivos

```
Usuario → Browser → Astro (build) → HTML estático + CSS + JS → Deploy (Vercel)
                            ↓
             Service Worker (sw.js) → Cache → Offline support
```

## Build process

```
src/ (Astro, componentes) ──┐
                            ├──→ Astro build ──→ dist/ (HTML estático)
public/ (assets estáticos) ──┘                       ↓
                                              Service Worker (Workbox)
                                              Precache de assets generados
```

---

## Decisiones arquitectónicas recientes

| Decisión | Detalle |
|---|---|
| **Componentes sobre inline** | `ScheduleTable` y `ScheduleFilters` reemplazan código duplicado en `schedule/index.astro`; data-attributes (`data-instructor`, `data-modalidad`, `data-dia`) permiten filtrado cliente sin acoplar componente a JS |
| **Content Collections para datos** | Datos semanales migrados de `weeks.json` a `src/content/weeks/` (16 archivos individuales) con schema Zod validado en build-time. `loadWeeksData()` async usando `getCollection()` |
| **Datos separados de lógica** | `exams.json` contiene datos planos; los `.ts` contienen tipos y lógica de acceso |
| **Links dinámicos en examanes** | `Exam.links: ExamLink[]` reemplaza 5 campos de URL fijos; agregar un nuevo enlace solo requiere editar `exams.json` |
| **CSS centralizado** | Tema CSS (shadcn/ui) movido de `MainLayout` a `src/styles/base.css`, importado desde `ShellLayout` |
| **Tipos compartidos** | `Attention` e `Instructor` en `src/types.ts` en lugar de definidos localmente en `instructors.ts` |
| **Fuente autohosteada** | `@fontsource/inter` reemplaza Google Fonts externa; elimina petición bloqueante y mejora privacidad |
| **Dashboard en raíz** | `index.astro` es un dashboard con navegación rápida, tarjeta de la semana actual y stats; ya no es un redirect |
| **Sin código muerto** | `MainLayout.astro` eliminado (0 imports); `src/components/islands/` eliminado (vacío); comentarios de código eliminados |
| **Página offline** | `src/pages/offline.astro` con estilos inline autónomos, dark/light mode y botones de reintentar/volver al inicio |
| **PWA injectManifest** | Modo `injectManifest` con SW custom en `src/sw.ts`. Reemplaza `generateSW` + `navigateFallback`. Normaliza trailing slashes en navegaciones y ofrece offline fallback con 3 niveles: precache → network → `/offline` → `503` |
| **PWA 404 exclusion** | `globIgnores: ['**/404*']` — Workbox rechaza precacheo de respuestas non-2xx (404.astro se sirve con status 404) |
| **Trailing slash normalization** | SW custom (`src/sw.ts`) usa `matchPrecache(url.replace(/\/$/, '') || '/')` para resolver incompatibilidad entre `cleanURLs: true` de Workbox y trailing slashes de Starlight (`/lecturas/semana-1/` → busca `lecturas/semana-1` en precache) |
| **Starlight 404 deshabilitado** | `disable404Route: true` evita colisión con `src/pages/404.astro` (única página 404 del sitio, con variantes dark/light) |
| **Lecturas con Starlight** | `[...slug].astro` eliminado; Starlight maneja el ruteo de docs individuales (`/lecturas/semana-1/`). El índice (`/lecturas/`) usa `index.astro` con ShellLayout |
| **Sidebar "Lecturas"** | Nuevo item de navegación `lecturas` con icono `lucide:book-open`, href a `/lecturas/` |
| **index.md simplificado** | `src/content/docs/index.md` solo conserva frontmatter (title/description); Starlight no renderiza el body markdown |
| **View Transitions progresivas** | `<ViewTransitions />` en `ShellLayout.astro` con `transition:animate="morph"` en cada wrapper de contenido. Elementos estáticos (`#sidebar-toggle`, barra móvil) llevan `transition:persist`. WeekNavigation y WeekItem convertidos de `<button>` a `<a>` para navegación nativa VT. `astro:after-swap` para re-inicializar scripts tras navegación. Starlight no se ve afectado. |
