# FG1 - Física General I (Astro)

Plataforma educativa para Física General I - I semestre 2026.

Migración de React SPA a Astro (Multiple Page Application) con contenido estático prerenderizado.

## Características

- ⚡ **Rendimiento**: HTML estático prerenderizado, zero JavaScript en carga inicial
- 📱 **PWA**: Instalable, offline-first con Workbox (32 assets precacheados, ~1.45 MiB)
- 🌙 **Tema oscuro/claro**: Con persistencia en localStorage y sin flash (FOUC)
- 📐 **Responsive**: Sidebar colapsable en desktop, drawer overlay en mobile
- 📄 **Contenido**: 16 semanas de plan de estudios con objetivos, lecturas, prácticas y evaluaciones
- 🔍 **Filtros en cliente**: Horarios de atención y evaluaciones con filtrado instantáneo

## Tech Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 5 (static output) |
| UI | Componentes `.astro` + JavaScript vanilla |
| Estilos | TailwindCSS 3 (darkMode: class) |
| PWA | `@vite-pwa/astro` + Workbox 7 (generateSW) |
| Iconos | `astro-icon` + Lucide (inline SVG) |
| Imágenes | `@astrojs/image` + Sharp (WebP optimizado) |
| Build | Vite 6 + pnpm |
| Deploy | Vercel (edge redirects + static hosting) |

## Desarrollo

```bash
pnpm install        # Instalar dependencias
pnpm dev            # Servidor de desarrollo (localhost:4321)
pnpm build          # Build producción → dist/
pnpm preview        # Preview del build
```

## Documentación

- [Documentación técnica de migración](./MIGRATION_DOCUMENTATION.md)
- [Estructura del proyecto](./PROJECT_STRUCTURE.md)
- [Plan de migración](./MIGRATION_PLAN.md)
- [Guía de implementación](./IMPLEMENTATION_GUIDE.md)
- [Configuración de entorno](./ENV_SETUP.md)

## Deploy

```bash
git push origin main   # Vercel deploy automático
```

---

**Legacy**: [fg1 (React SPA)](https://github.com/glacy/fg1) · **Actual**: fg1-astro
