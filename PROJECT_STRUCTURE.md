# 🏗️ Estructura de Proyecto Astro

## 📁 Directorio Raíz

```
fg1-astro/
├── 📄 astro.config.mjs           # Configuración principal de Astro
├── 📄 package.json                # Dependencias y scripts del proyecto
├── 📄 tsconfig.json               # Configuración TypeScript
├── 📄 tailwind.config.mjs         # Configuración TailwindCSS
├── 📄 pnpm-workspace.yaml         # Configuración workspace packages
├── 📄 vercel.json                 # Configuración Vercel deploy
├── 📄 vitest.config.ts            # Configuración tests Vitest
├── 📄 .gitignore                  # Archivos ignorados por Git
├── 📄 .env.example                # Ejemplo de variables de entorno
├── 📄 README.md                   # Documentación del proyecto
├── 📄 MIGRATION_PLAN.md           # Plan de migración detallado
├── 📄 ENV_SETUP.md                # Guía de configuración de entorno
└── 📁 [otros directorios]         # Ver abajo
```

---

## 📁 src/

### src/pages/
**Contenido:** Rutas Astro (estático y pre-rendered)
**Propósito:** Define las rutas de la aplicación

```
src/pages/
├── 📄 index.astro                  # Página principal (dashboard)
├── 📁 weekly/                      # Sección plan semanal
│   └── 📄 index.astro
├── 📁 planner/                     # Sección planner (exámenes)
│   └── 📄 index.astro
├── 📁 schedule/                    # Sección horario de consultas
│   └── 📄 index.astro
├── 📁 auth/                        # Rutas de autenticación
│   ├── 📄 login.astro
│   └── 📄 callback.astro
├── 📁 api/                         # Rutas API (si necesarias)
│   └── 📄 [...path].ts
└── 📄 404.astro                    # Página no encontrada
```

**Uso:**
```astro
---
// src/pages/index.astro
import MainLayout from '../layouts/MainLayout.astro';
const pageTitle = 'Dashboard';
---

<MainLayout title={pageTitle}>
  <h1>{pageTitle}</h1>
</MainLayout>
```

### src/components/
**Contenido:** Componentes Astro (principalmente estáticos)
**Propósito:** Reutilización de UI estático

```
src/components/
├── 📄 Layout.astro                  # Layout base común
├── 📄 Shell.astro                   # Shell wrapper principal
├── 📄 Sidebar.astro                 # Sidebar de navegación
├── 📄 Footer.astro                  # Footer estático
├── 📄 Navigation.astro              # Componentes de navegación
├── 📄 Header.astro                  # Header estático
├── 📄 SEO.astro                     # Componente SEO/Metadata
├── 📄 Analytics.astro               # Analytics tracking
└── 📄 PWAInstall.astro              # Prompt de instalación PWA
```

**Ejemplo:**
```astro
---
// src/components/Sidebar.astro
interface Props {
  activeTab: 'weekly' | 'planner' | 'schedule';
  setActiveTab: (tab: string) => void;
}

const { activeTab, setActiveTab } = Astro.props;
---

<aside class="sidebar">
  <button 
    class:active={activeTab === 'weekly'}
    onClick={() => setActiveTab('weekly')}
  >
    Plan Semanal
  </button>
</aside>
```

### src/components/islands/
**Contenido:** React Islands (componentes interactivos)
**Propósito:** Hydration selectiva de JavaScript

```
src/components/islands/
├── 📄 InteractivePlanner.tsx       # Planner interactivo (React)
├── 📄 InteractiveSchedule.tsx      # Horario interactivo (React)
├── 📄 WeeklyPlanTabs.tsx           # Tabs de plan semanal (React)
├── 📄 AuthProvider.tsx             # Provider de autenticación (React)
├── 📄 NotificationPermission.tsx   # Permisos notificaciones (React)
├── 📄 DarkModeToggle.tsx           # Toggle dark mode (React)
└── 📄 OfflineIndicator.tsx         # Indicador offline (React)
```

**Uso:**
```tsx
// src/components/islands/InteractivePlanner.tsx
import { useState } from 'react';
import { usePlanner } from '@course-dashboard/planner';

export default function InteractivePlanner() {
  const { exams, loading } = usePlanner();
  const [selectedExam, setSelectedExam] = useState(null);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {/* Interactive content here */}
    </div>
  );
}
```

### src/layouts/
**Contenido:** Layouts reutilizables
**Propósito:** Estructura de páginas compartida

```
src/layouts/
├── 📄 MainLayout.astro              # Layout principal
├── 📄 AuthLayout.astro              # Layout para páginas de auth
├── 📄 EmptyLayout.astro             # Layout minimalista
└── 📄 ErrorLayout.astro             # Layout para páginas de error
```

**Uso:**
```astro
---
// src/layouts/MainLayout.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### src/lib/
**Contenido:** Lógica compartida y configuraciones
**Propósito:** Funcionalidad reutilizable

```
src/lib/
├── 📄 keycloak.ts                   # Configuración Keycloak
├── 📄 firebase.ts                   # Configuración Firebase
├── 📄 notifications.ts              # Servicios de notificaciones
├── 📄 types.ts                      # TypeScript types compartidos
├── 📄 utils.ts                      # Funciones de utilidad
├── 📄 constants.ts                  # Constantes de la app
├── 📄 config.ts                     # Configuración de la app
├── 📄 auth.ts                       # Lógica de autenticación
└── 📄 api.ts                        # Clientes API (si necesario)
```

**Ejemplo:**
```typescript
// src/lib/keycloak.ts
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

export const keycloak = new Keycloak(keycloakConfig);

export const keycloakInitOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false,
  pkceMethod: 'S256',
};
```

### src/styles/
**Contenido:** Estilos globales y CSS
**Propósito:** Estilos compartidos y configuraciones

```
src/styles/
├── 📄 global.css                    # Estilos globales
├── 📄 components.css                # Estilos de componentes
├── 📄 utilities.css                 # Utilidades CSS
└── 📄 animations.css                # Animaciones CSS
```

### src/env.d.ts
**Contenido:** Tipos de entorno TypeScript
**Propósito:** Type safety para variables de entorno

```typescript
// src/env.d.ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_NAME: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_KEYCLOAK_URL: string;
  readonly VITE_FIREBASE_API_KEY: string;
  // ... otras variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 📁 packages/
**Contenido:** Packages compatibles del monorepo
**Propósito:** Compartir lógica entre múltiples proyectos

```
packages/
├── 📁 @course-dashboard/shared/     # Utilidades compartidas
│   ├── 📄 src/
│   │   ├── 📄 index.ts
│   │   ├── 📄 config/
│   │   ├── 📄 hooks/
│   │   └── 📄 utils/
│   └── 📄 package.json
├── 📁 @course-dashboard/planner/   # Lógica de planner
│   ├── 📄 src/
│   │   ├── 📄 App.tsx
│   │   ├── 📄 components/
│   │   └── 📄 hooks/
│   └── 📄 package.json
├── 📁 @course-dashboard/schedule/  # Lógica de horario
│   ├── 📄 src/
│   │   ├── 📄 App.tsx
│   │   ├── 📄 components/
│   │   └── 📄 hooks/
│   └── 📄 package.json
└── 📁 @course-dashboard/weekly-plan/ # Lógica de plan semanal
    ├── 📄 src/
    │   ├── 📄 App.tsx
    │   ├── 📄 components/
    │   └── 📄 hooks/
    └── 📄 package.json
```

**Integración:**
```typescript
// En React islands
import { useIsMobile } from '@course-dashboard/shared';
import { usePlanner } from '@course-dashboard/planner';
```

---

## 📁 public/
**Contenido:** Assets estáticos servidos directamente
**Propósito:** Recursos públicos sin procesamiento

```
public/
├── 📁 icons/                        # Iconos e imágenes
│   ├── icon-192.png
│   ├── icon-512.png
│   └── favicon.svg
├── 📁 content/                      # Contenido educativo estático
│   ├── 📁 examenes/
│   │   ├── examen-parcial-1.pdf
│   │   └── soluciones/
│   ├── 📁 lecturas/
│   │   ├── lectura-1.pdf
│   │   └── lectura-2.pdf
│   ├── 📁 tareas/
│   │   ├── tarea-1.pdf
│   │   └── soluciones/
│   └── 📁 soluciones/
│       └── examen-parcial-1-sol.pdf
├── 📄 manifest.json                 # PWA manifest
├── 📄 robots.txt                    # Configuración crawlers
├── 📄 sitemap.xml                   # Sitemap del sitio
└── 📄 favicon.ico                   # Favicon clásico
```

---

## 📁 scripts/
**Contenido:** Scripts de automatización
**Propósito:** Tareas de desarrollo y deployment

```
scripts/
├── 📄 migrate-to-astro.sh           # Script de migración inicial
├── 📄 check-env.js                  # Validación de variables de entorno
├── 📄 setup-keycloak.sh             # Setup inicial de Keycloak
├── 📄 deploy.sh                     # Script de deployment
└── 📄 clean.sh                      # Limpieza de build
```

---

## 📁 tests/
**Contenido:** Suite de tests
**Propósito:** Testing de la aplicación

```
tests/
├── 📁 unit/                         # Unit tests
│   ├── 📁 components/
│   └── 📁 lib/
├── 📁 integration/                  # Integration tests
│   └── 📁 auth/
└── 📁 e2e/                          # End-to-end tests
    ├── 📁 weekly/
    ├── 📁 planner/
    └── 📁 schedule/
```

---

## 📁 Otros Archivos Importantes

### .gitignore
```gitignore
node_modules/
dist/
.astro/
.env
.env.local
```

### vercel.json
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "astro",
  "regions": ["iad1"],
  "env": {
    "VITE_SITE_URL": "@site-url"
  }
}
```

---

## 🔄 Flujo de Archivos

### Request Flow
```
Usuario → Browser → Astro Server → Page → Layout → Components → Response
                                   ↓
                              Islands (React)
```

### Build Process
```
Source Files → Astro Build → Static HTML + JS Bundle → Deploy
                        ↓
                   React Islands (Hydration)
```

---

## 📐 Convenciones de Nomenclatura

### Archivos Astro
- PascalCase: `Layout.astro`, `Sidebar.astro`
- kebab-case: `index.astro`, `404.astro`

### Componentes React
- PascalCase: `InteractivePlanner.tsx`, `AuthProvider.tsx`

### Utilidades
- camelCase: `utils.ts`, `config.ts`, `auth.ts`

### Directorios
- kebab-case: `src/components/islands/`, `src/lib/`

---

## 🚀 Próximos Pasos

1. **Crear estructura de archivos**: `scripts/migrate-to-astro.sh`
2. **Configurar entorno**: Copiar `.env.example` → `.env.local`
3. **Instalar dependencias**: `pnpm install`
4. **Iniciar desarrollo**: `pnpm dev`
5. **Verificar estructura**: Confirmar todos los directorios creados

---

## 📚 Referencias

- [Astro Project Structure](https://docs.astro.build/en/core-concepts/project-structure/)
- [React Islands](https://docs.astro.build/en/guides/integrations-guide/react/)
- [File-Based Routing](https://docs.astro.build/en/core-concepts/routing/)
- [Architecture Overview](https://docs.astro.build/en/core-concepts/astro-pages/)