# Estructura de Proyecto

## Directorio Raíz

```
fg1-astro/
├── astro.config.mjs           # Configuración principal de Astro (integraciones, PWA, imágenes)
├── package.json               # Dependencias y scripts del proyecto
├── tsconfig.json              # Configuración TypeScript
├── tailwind.config.mjs        # Configuración TailwindCSS (darkMode: 'class')
├── postcss.config.mjs         # Configuración PostCSS
├── pnpm-workspace.yaml       # Configuración workspace packages
├── vercel.json               # Configuración Vercel (redirects)
├── .gitignore                # Archivos ignorados por Git
├── .env.example              # Ejemplo de variables de entorno
├── .env.local                # Variables de entorno locales
├── README.md                 # Documentación del proyecto
├── MIGRATION_PLAN.md         # Plan de migración
├── MIGRATION_DOCUMENTATION.md# Documentación técnica de migración
├── PROJECT_STRUCTURE.md      # Este archivo
├── ENV_SETUP.md              # Guía de configuración de entorno
├── IMPLEMENTATION_GUIDE.md   # Guía de implementación técnica
└── setup-astro.sh            # Script de setup
```

---

## src/

### src/pages/
Rutas Astro (estático prerenderizado). Define las rutas de la aplicación.

```
src/pages/
├── index.astro              # Redirección a /weekly (meta refresh)
├── 404.astro                # Página no encontrada personalizada con variantes
├── weekly/
│   ├── [week].astro         # Página dinámica de semana (getStaticPaths)
│   └── index.astro          # Redirección a /weekly/1
├── planner/
│   └── index.astro          # Evaluaciones con filtros y animaciones
├── schedule/
│   └── index.astro          # Horarios de atención con filtrado cliente
└── auth/                    # (vacío — sin implementar)
```

### src/layouts/
Layouts reutilizables para estructura de páginas.

```
src/layouts/
├── ShellLayout.astro        # Layout principal con sidebar, footer, theme, PWA
└── MainLayout.astro         # Layout genérico con SEO, Open Graph, PWA
```

### src/components/
Componentes Astro (estáticos, renderizados en servidor).

```
src/components/
├── Sidebar.astro            # Navegación lateral con iconos y colapso
├── Footer.astro             # Pie de página con datos del curso
├── WeekTimeline.astro       # Línea de tiempo semanal (navegación entre semanas)
├── WeekItem.astro           # Ítem individual de la línea de tiempo
├── WeekNavigation.astro     # Botones anterior/siguiente
├── LinkCard.astro           # Tarjeta de enlace a recursos
├── Section.astro            # Contenedor de sección con iconos dinámicos
├── ObjectivesList.astro     # Lista de objetivos de aprendizaje
├── ContentList.astro        # Lista de contenidos
├── ExamStats.astro          # Estadísticas de evaluaciones
├── Filters.astro            # Filtros con pill animada (planner)
├── ExamCard.astro           # Tarjeta de evaluación
├── ScheduleFilters.astro    # Filtros de horario
└── ScheduleTable.astro      # Tabla de horarios de atención
```

### src/lib/
Lógica compartida y datos.

```
src/lib/
├── shared/
│   ├── config.ts            # Configuración centralizada (curso, temas)
│   ├── theme.ts             # Utilidades de tema dark/light (vanilla JS)
│   ├── media.ts             # Detección mobile
│   └── index.ts             # Barrel export
├── weekly/
│   └── weeks.ts             # Datos de 16 semanas (objetivos, contenidos, materiales)
├── planner/
│   ├── index.ts             # Lógica de planner
│   └── exams.json           # Datos de evaluaciones
├── schedule.ts              # Lógica de horarios
└── instructors.ts           # Datos de instructores
```

### src/styles/
Estilos globales. Actualmente vacío (se usa Tailwind y estilos inline en layouts).

```
src/styles/
└── (vacío)
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
├── sw.js                    # Service Worker (Workbox generateSW)
├── workbox-*.js             # Runtime de Workbox
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
| Páginas Astro | kebab-case | `index.astro`, `404.astro`, `[week].astro` |
| Directorios | kebab-case | `src/components/`, `src/layouts/` |
| Librerías/utilidades | camelCase | `config.ts`, `theme.ts`, `instructors.ts` |
| Assets estáticos | kebab-case | `icon-192.png`, `screenshot-wide.png` |

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
public/ (assets estáticos) ──┘                        ↓
                                              Service Worker (Workbox)
                                              Precache de assets generados
```
