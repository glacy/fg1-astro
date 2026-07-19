# FG1 — Física General I

Un sitio web de curso universitario, rápido como una landing page.

Estudiantes acceden al plan semanal, evaluaciones, horarios de atención y lecturas desde cualquier dispositivo, incluso sin internet. Profesores pueden adaptarlo como plantilla para sus propios cursos.

## Secciones

| Ruta | Qué encontrás |
|---|---|
| `/` | Dashboard con la semana actual, stats de evaluaciones y acceso rápido a cada sección |
| `/weekly/{n}` | Plan detallado de la semana n: objetivos, contenidos, materiales, actividades |
| `/planner` | Calendario de evaluaciones con filtros (todas, hoy, próximas) |
| `/schedule` | Horarios de atención estudiantil — filtrá por docente, modalidad o día |
| `/lecturas/` | Lecturas, prácticas y soluciones organizadas por semana |

## Características

- **Sin recarga de página** — View Transitions hacen que la navegación entre secciones sea instantánea y con animación suave
- **Instalable** — PWA con service worker: agregala a la pantalla de inicio y usala offline
- **Modo oscuro/claro** — Persiste la preferencia, sin flash al cargar
- **Responsive** — Sidebar colapsable en desktop, menú drawer en mobile
- **Filtros en cliente** — Horarios y evaluaciones se filtran al instante sin recargar
- **Estático** — HTML prerenderizado, cero JavaScript en carga inicial

## Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | [Astro 5](https://astro.build) (static output) |
| UI | Componentes `.astro` + JavaScript vanilla |
| Estilos | [TailwindCSS 3](https://tailwindcss.com) (dark mode vía clase) |
| PWA | `@vite-pwa/astro` + Workbox 7 (injectManifest) |
| Iconos | `astro-icon` + Lucide |
| Documentación | Starlight (lecturas del curso) |
| Fuente | Inter (autohosteada con `@fontsource`) |
| Fórmulas | KaTeX (remark-math + rehype-katex) |
| Build | Vite 6 + pnpm |
| Deploy | Vercel (static hosting) |

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
