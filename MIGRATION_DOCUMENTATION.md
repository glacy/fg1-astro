# Documentación de Migración: Proyecto fg1 → fg1-astro

## Visión General
Este documento describe el proceso de migración del proyecto `fg1` (React + Vite) a `fg1-astro` (Astro), manteniendo la funcionalidad de la UI "shell" con acceso a múltiples paquetes.

## Arquitectura del Proyecto Original
- **Framework**: React 19 + Vite
- **Monorepo**: Nx workspace con múltiples paquetes
- **Paquetes principales**:
  - `shell`: Aplicación principal con navegación tipo sidebar
  - `weekly-plan`: Planificación semanal
  - `planner`: Evaluaciones y planificación
  - `schedule`: Horarios de atención estudiantil
  - `shared`: Utilidades compartidas

## Estrategia de Migración
### Transformación de SPA a MPA
- **Original**: Single Page Application con React Router
- **Nuevo**: Multiple Page Application con routing nativo de Astro
- **Beneficios**: Mejor SEO, carga inicial más rápida, menor tamaño de bundle

## Componentes Migrados

### 1. Shell UI (Navegación Principal)

#### Archivos creados:
- `src/layouts/ShellLayout.astro`: Layout principal con sidebar
- `src/components/Sidebar.astro`: Componente de navegación lateral
- `src/pages/index.astro`: Redirección a `/weekly`

#### Cambios principales:
- Reemplazo de `useState` de React por routing nativo de Astro
- Sidebar adaptado a component `.astro` con iconos Lucide
- Uso de `astro-icon` para iconos optimizados

#### Configuración de iconos:
```bash
pnpm add -w astro-icon @iconify-json/lucide
```

```javascript
// astro.config.mjs
import icon from 'astro-icon';

export default defineConfig({
  integrations: [icon()],
});
```

### 2. Paquete Planner (Evaluaciones)

#### Archivos migrados:
- `src/lib/planner.ts`: Lógica de negocio y utilidades para evaluaciones
- `src/components/ExamStats.astro`: Componente de estadísticas
- `src/components/Filters.astro`: Componente de filtros con pill animado
- `src/components/ExamCard.astro`: Componente de tarjeta de evaluación
- `src/pages/planner/index.astro`: Página principal de evaluaciones

#### Transformaciones realizadas:

**Estado React → JavaScript Vanilla**:
```typescript
// Original (React)
const [currentFilter, setCurrentFilter] = useState('all');

// Nuevo (JavaScript Vanilla)
let currentFilter = 'all';
```

**Animaciones CSS → Transiciones CSS + JavaScript**:
```javascript
// Posicionamiento dinámico de la pill
function updatePillPosition(activeIndex) {
  const activeButton = filterButtons[activeIndex];
  const buttonWidth = activeButton.offsetWidth;
  const buttonLeft = activeButton.offsetLeft;
  
  pill.style.width = `${buttonWidth}px`;
  pill.style.left = `${buttonLeft}px`;
  pill.style.transform = 'none';
}
```

**Filtrado de datos → Manipulación del DOM**:
```javascript
// Mostrar/ocultar elementos basados en filtros
examCards.forEach(card => {
  const examDate = card.dataset.date || '';
  let shouldShow = true;
  
  if (currentFilter === 'today') {
    shouldShow = examDate === today;
  } else if (currentFilter === 'upcoming') {
    shouldShow = examDate > today;
  }
  
  card.style.display = shouldShow ? 'block' : 'none';
});
```

### 3. Paquete Schedule (Horarios)

#### Archivos migrados:
- `src/lib/schedule.ts`: Lógica de negocio y utilidades
- `src/lib/instructors.ts`: Datos de instructores
- `src/components/ScheduleFilters.astro`: Componente de filtros
- `src/components/ScheduleTable.astro`: Componente de tabla de horarios
- `src/pages/schedule/index.astro`: Página principal de horarios

#### Transformaciones realizadas:

**Hooks de React → Funciones puras**:
```typescript
// Original (React)
export const useSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // ... lógica de filtrado
  return { searchTerm, setSearchTerm, ... };
};

// Nuevo (Astro)
export function filterInstructors(
  searchTerm: string,
  modalityFilter: string,
  dayFilter: string
): Instructor[] {
  // ... misma lógica sin estado
}
```

**Componentes de React → Componentes de Astro**:
```astro
---
// Props pasadas como parámetros de Astro
interface Props {
  searchTerm: string;
  modalityFilter: string;
  // ...
}
const { searchTerm, modalityFilter } = Astro.props;
---
<!-- HTML estático con props renderizadas en servidor -->
```

**Estado del cliente → Parámetros de URL**:
```typescript
// Original: estado de React
const [searchTerm, setSearchTerm] = useState('');

// Nuevo: parámetros de URL
const url = new URL(Astro.url);
const searchTerm = url.searchParams.get('searchTerm') || '';
```

## Directivas de Cliente en Astro

### Cuándo usar directivas de cliente:
- **`client:load`**: Para scripts que necesitan ejecutarse inmediatamente
- **`client:visible`**: Para contenido que carga cuando es visible
- **`client:idle`**: Para contenido no crítico que carga cuando el navegador está inactivo

### Ejemplo de uso:
```astro
<script client:load>
  // Este script se ejecuta en el navegador
  const form = document.getElementById('filter-form');
  form?.addEventListener('submit', (e) => {
    // lógica de cliente
  });
</script>
```

## Estructura de Archivos

```
src/
├── components/
│   ├── Sidebar.astro              # Navegación principal
│   ├── ScheduleFilters.astro      # Filtros de búsqueda
│   └── ScheduleTable.astro        # Tabla de horarios
├── layouts/
│   ├── ShellLayout.astro          # Layout principal
│   └── MainLayout.astro           # Layout genérico
├── lib/
│   ├── schedule.ts                # Lógica de negocio (schedule)
│   └── instructors.ts             # Datos estáticos
└── pages/
    ├── index.astro                # Redirección a /weekly
    ├── weekly/index.astro         # Plan semanal
    ├── planner/index.astro        # Evaluaciones
    └── schedule/index.astro       # Horarios
```

## Configuración de Dependencias

### Paquetes instalados:
```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/react": "^4.0.0",
    "@astrojs/tailwind": "^6.0.0",
    "astro-icon": "^1.1.5",
    "@iconify-json/lucide": "^1.2.116"
  }
}
```

## Script de Construcción

### Scripts en package.json:
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

## Problemas Comunes y Soluciones

### 1. Colisión de Rutas
**Problema**: Definir tanto `/page` como `/page/index.astro`
**Solución**: Mantener solo estructura de carpetas con `index.astro`

### 2. Iconos no cargando
**Problema**: Importación incorrecta de `astro-icon/loaders`
**Solución**: Usar importación directa `import icon from 'astro-icon'`

### 3. Scripts interactivos no funcionando
**Problema**: Olvidar directivas de cliente
**Solución**: Agregar `client:load`, `client:visible`, etc. a scripts interactivos

### 4. Importación de datos
**Problema**: Error al importar archivos de datos en TypeScript
**Solución**: Asegurar extensión correcta y rutas relativas

### 5. Elementos CSS con bordes cuadrados
**Problema**: La clase `rounded-lg` no aplica bordes redondeados
**Causa**: La variable CSS `--radius` no está definida en el layout
**Solución**: Agregar variable CSS al layout:
```astro
<style is:global>
  :root {
    --radius: 0.5rem;
  }
</style>
```

### 6. Pill animada no se alinea correctamente
**Problema**: La pill de fondo animado no se centra con los botones
**Causa**: Uso incorrecto de `transform: translateX()` desde posición fija
**Solución**: Usar posicionamiento directo con propiedades `left` y `width`:
```javascript
function updatePillPosition(activeIndex) {
  const activeButton = filterButtons[activeIndex];
  const buttonWidth = activeButton.offsetWidth;
  const buttonLeft = activeButton.offsetLeft;
  
  pill.style.width = `${buttonWidth}px`;
  pill.style.left = `${buttonLeft}px`;
  pill.style.transform = 'none';
}
```

### 7. TypeScript en scripts de cliente
**Problema**: Errores de sintaxis al usar TypeScript en scripts con `client:*`
**Causa**: Astro no procesa TypeScript en scripts de cliente
**Solución**: Usar JavaScript vanilla sin anotaciones de tipo:
```javascript
// ❌ No funciona en scripts de cliente
interface FiltersProps {
  currentFilter: 'all' | 'upcoming' | 'today';
}

// ✅ Funciona en scripts de cliente
function updatePillPosition(activeIndex) {
  // lógica sin tipos
}
```

## Optimizaciones Aplicadas

### 1. Renderizado del lado del servidor (SSR)
- Filtrado de datos en servidor而不是 cliente
- Reducción de tamaño de JavaScript enviado
- Mejor SEO y tiempos de carga iniciales

### 2. Optimización de iconos
- Iconos SVG inline en lugar de componentes React
- Carga optimizada con `astro-icon`
- Soporte para múltiples conjuntos de iconos vía Iconify

### 3. Bundle Splitting
- Páginas individuales con sus propios assets
- Carga de JavaScript solo cuando es necesario
- Mejor caché del navegador

## Diferencias de Rendimiento

### Métricas esperadas:
- **FCP (First Contentful Paint)**: 40-60% más rápido
- **LCP (Largest Contentful Paint)**: 30-50% más rápido
- **TTI (Time to Interactive)**: 50-70% más rápido
- **Tamaño del bundle**: 60-80% más pequeño

### Razones:
- Sin framework de cliente para navegación principal
- Renderizado estático inicial
- Código de cliente solo cuando es necesario

## Próximos Pasos

## Paquetes pendientes de migración:
1. ✅ **schedule**: Horarios de atención estudiantil (completado)
2. ✅ **planner**: Sistema de evaluaciones (completado)
3. ✅ **weekly-plan**: Planificación semanal (completado)
4. **shared**: Utilidades compartidas (pendiente)

### 4. Paquete Weekly Plan (Planificación Semanal)

#### Archivos creados:
- `src/lib/weekly/weeks.ts`: Datos de 16 semanas con objetivos, contenidos, materiales y evaluaciones
- `src/components/WeekItem.astro`: Ítem individual de la línea de tiempo semanal
- `src/components/WeekTimeline.astro`: Contenedor de navegación semanal con soporte responsive
- `src/components/LinkCard.astro`: Tarjeta de enlace a recursos
- `src/components/Section.astro`: Contenedor de sección con iconos dinámicos
- `src/components/ObjectivesList.astro`: Lista de objetivos de aprendizaje
- `src/components/ContentList.astro`: Lista de contenidos
- `src/components/WeekNavigation.astro`: Navegación anterior/siguiente
- `src/pages/weekly/[week].astro`: Página dinámica con parámetro de ruta
- `src/pages/weekly/index.astro`: Página índice (redirección a semana 1)

#### Arquitectura de Navegación

**Problema:** La navegación entre semanas no funcionaba con URL search params (`?week=4`).

**Causa:** En modo `static`, Astro prerenderiza páginas individuales. Los parámetros de URL (`?week=4`) no son compatibles con prerendering porque Astro no sabe qué páginas generar. Aunque el servidor de desarrollo responde a cualquier parámetro, el build estático no genera páginas para cada combinación posible.

**Solución:** Usar rutas dinámicas con `getStaticPaths`:

```astro
---
// src/pages/weekly/[week].astro
export const prerender = true;

export function getStaticPaths() {
  const paths = [];
  for (let i = 1; i <= 16; i++) {
    paths.push({ params: { week: i.toString() } });
  }
  return paths;
}

const { week } = Astro.params;
const currentWeek = parseInt(week);
---
```

**Ventajas de rutas limpias vs search params:**
- ✅ Generación estática de todas las semanas en build
- ✅ URLs más limpias y SEO-friendly (`/weekly/4` vs `/weekly?week=4`)
- ✅ Navegación cliente simple con `window.location.href = '/weekly/${week}'`
- ✅ Sin dependencia de SSR o modo servidor

#### Navegación Cliente

La navegación se maneja con JavaScript vanilla en un script `client:load`. Cada componente de UI es puramente presentacional, usando `data-*` attributes para que el script del cliente los seleccione:

```javascript
// weekly/[week].astro
function setupWeeklyPlan() {
  const weekItems = document.querySelectorAll('[data-week-item]');
  const prevButton = document.querySelector('[data-nav="previous"]');
  const nextButton = document.querySelector('[data-nav="next"]');
  
  const currentWeek = parseInt(
    window.location.pathname.match(/\/weekly\/(\d+)/)?.[1] || '1'
  );
  
  function navigateToWeek(week) {
    window.location.href = `/weekly/${week}`;
  }
  
  prevButton?.addEventListener('click', () => navigateToWeek(currentWeek - 1));
  nextButton?.addEventListener('click', () => navigateToWeek(currentWeek + 1));
}
```

#### Lecciones aprendidas (weekly-plan):
1. **Rutas dinámicas vs search params:** Para contenido prerenderizado, usar parámetros de ruta (`[week].astro`) en lugar de search params (`?week=4`)
2. **getStaticPaths obligatorio en modo static:** Define explícitamente qué rutas generar
3. **`getStaticPaths` debe estar dentro del frontmatter:** Fuera de `---` genera error de compilación
4. **Componentes presentacionales puros:** La lógica vive en el cliente, los componentes solo muestran UI

### 5. Shared Utilities (Utilidades Compartidas)

#### Archivos creados:
- `src/lib/shared/config.ts`: Configuraciones centralizadas (course, ui, theme)
- `src/lib/shared/theme.ts`: Utilidades de tema dark/light mode (vanilla JS)
- `src/lib/shared/media.ts`: Utilidad de detección mobile
- `src/lib/shared/index.ts`: Barrel export
- `src/components/Footer.astro`: Componente de pie de página

#### Transformaciones realizadas:

**React Context → Módulo JavaScript vanilla:**
```typescript
// Original (React Context)
export const ThemeProvider = ({ children }) => { ... };
export const useTheme = () => { ... };

// Nuevo (Módulo vanilla JS)
export function getInitialTheme(): 'light' | 'dark' { ... }
export function applyTheme(theme: 'light' | 'dark'): void { ... }
export function toggleTheme(): void { ... }
export function setupTheme(): void { ... }
```

**Hook React → Función utilitaria:**
```typescript
// Original (React Hook)
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);
  React.useEffect(() => { ... }, []);
  return !!isMobile;
}

// Nuevo (Función vanilla JS)
export function isMobile(): boolean { ... }
export function onMobileChange(callback): () => void { ... }
```

#### Integración con componentes existentes:

1. **Layout inicialización de tema** (`ShellLayout.astro:35-37`):
```astro
<script>
  import { setupTheme } from '../lib/shared';
  setupTheme();
</script>
```

2. **Sidebar toggle de tema** (`Sidebar.astro`):
```typescript
import { toggleTheme, isDarkMode } from '../lib/shared';
```

3. **Footer con datos de configuración** (`Footer.astro`):
```astro
import { COURSE_CONFIG } from '../lib/shared';
const { name, institution, contactEmail } = COURSE_CONFIG;
```

#### Eliminación de duplicación:
- `COURSE_CONFIG` eliminado de `src/lib/weekly/weeks.ts` y ahora importado desde `src/lib/shared`
- `COURSE_CONFIG` ahora exporta `totalWeeks: 16` y `maxCurrentWeek: 8` desde la configuración centralizada

#### Problema: `maxCurrentWeek` undefined tras migración

**Síntoma:** El WeekTimeline mostraba todas las semanas como "Próximamente" en lugar de diferenciar entre completadas, en progreso y bloqueadas.

**Causa:** La configuración original de `weeks.ts` tenía `maxCurrentWeek` en el nivel raíz de `COURSE_CONFIG`:
```ts
export const COURSE_CONFIG = {
  totalWeeks: 16,
  maxCurrentWeek: 8
};
```

Pero la nueva configuración compartida lo anidó bajo `apps.weekly.maxCurrentWeek`:
```ts
export const COURSE_CONFIG = {
  totalWeeks: 16,
  apps: {
    weekly: { maxCurrentWeek: 8 }
  }
};
```

Las páginas que accedían a `COURSE_CONFIG.maxCurrentWeek` obtenían `undefined`, causando que toda la lógica de estado del timeline fallara.

**Solución:** Agregar `maxCurrentWeek: 8` al nivel raíz de `COURSE_CONFIG` en `src/lib/shared/config.ts`:
```ts
export const COURSE_CONFIG = {
  name: 'Física General I',
  totalWeeks: 16,
  maxCurrentWeek: 8,  // ← nivel raíz necesario
  apps: {
    weekly: { maxCurrentWeek: 8 }
  }
};
```

**Lección:** Al centralizar configuraciones, mantener la estructura de propiedades que los componentes consumen para evitar regresiones.

#### Problema: Toggle de tema claro/oscuro no funciona

**Síntoma:** Al hacer clic en el botón "Cambiar tema", las clases `dark:` de Tailwind no se aplicaban, y el tema no cambiaba visualmente.

**Causa:** El archivo `tailwind.config.mjs` principal no tenía configurado `darkMode: 'class'`. Por defecto Tailwind usa `darkMode: 'media'` (basado en `prefers-color-scheme`), por lo que agregar/remover la clase `dark` del `<html>` no tenía efecto en los estilos.

Adicionalmente, el script `setupTheme()` se ejecutaba como módulo diferido (defer), causando un FOUC (flash of unstyled content) al cargar la página con el tema incorrecto temporalmente antes de que el script se ejecutara.

**Solución:**

1. Agregar `darkMode: 'class'` en `tailwind.config.mjs`:
```js
export default {
  darkMode: 'class',
  content: [ ... ]
}
```

2. Agregar script inline bloqueante en `<head>` de `ShellLayout.astro` para aplicar el tema antes del primer renderizado:
```html
<script is:inline>
  (function() {
    var key = 'theme';
    var stored = localStorage.getItem(key);
    var theme = stored === 'light' || stored === 'dark' ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  })();
</script>
```

**Archivos modificados:**
- `tailwind.config.mjs:5` — añadido `darkMode: 'class'`
- `src/layouts/ShellLayout.astro:21-31` — añadido script inline de prevención de FOUC

**Lección:** Tailwind necesita `darkMode: 'class'` explícitamente cuando se controla el tema mediante JS. Los scripts de módulo en Astro son diferidos; para evitar FOUC se necesita un script inline bloqueante en el `<head>`.

#### Restricción de semanas bloqueadas por URL

**Síntoma:** Aunque la UI deshabilitaba los botones de semanas bloqueadas (> `maxCurrentWeek`), se podía acceder a su contenido directamente mediante `/weekly/13`.

**Solución:** Limitar `getStaticPaths` para generar páginas solo hasta `maxCurrentWeek`:

```astro
export function getStaticPaths() {
  const paths = [];
  for (let i = 1; i <= COURSE_CONFIG.maxCurrentWeek; i++) {
    paths.push({ params: { week: i.toString() } });
  }
  return paths;
}
```

Además, se agregó una validación en `[week].astro` que redirige a `/weekly/1` si `currentWeek > maxCurrentWeek` (funciona en dev y en rutas huerfanas). La página `/weekly/index.astro` se simplificó usando `Astro.redirect('/weekly/1', 302)` en lugar de renderizar contenido duplicado con redirect via JS.

**Archivos modificados:**
- `src/pages/weekly/[week].astro` — `getStaticPaths` limitado a 8 semanas + guard de redirección
- `src/pages/weekly/index.astro` — simplificado a solo `Astro.redirect`
- `src/lib/shared/config.ts` — corregido `maxCurrentWeek: 5` → `maxCurrentWeek: 8`

**Resultado:** El build genera 8 páginas (semana 1–8). Semanas 9–16 devuelven 404.

#### Página 404 personalizada

**Archivo:** `src/pages/404.astro`

**Comportamiento:** La página 404 detecta si la URL corresponde a una semana bloqueada mediante `window.location.pathname`. Según el caso, muestra dos variantes visuales distintas:

| Variante | Ícono | Mensaje | Botón |
|---|---|---|---|
| Semana bloqueada (`/weekly/N` con `N > maxCurrentWeek`) | Candado (ámbar) | "Semana no disponible — la semana N aún no está disponible" | "Ir a la semana actual" |
| Error genérico (cualquier otra ruta inexistente) | Interrogación (gris) | "Página no encontrada" | "Ir a la semana actual" |

**Valor dinámico:** El límite `maxCurrentWeek` se inyecta desde `COURSE_CONFIG` mediante un atributo `data-max-week` en el contenedor principal, evitando hardcoding en el script del cliente.

**Integración:** Utiliza `ShellLayout` + `Sidebar` + `Footer`, heredando soporte completo de tema claro/oscuro y navegación del sitio.

### Recomendaciones:
1. Migrar un paquete a la vez
2. Mantener la funcionalidad equivalente
3. Optimizar para SSR cuando sea posible
4. Usar directivas de cliente solo cuando sea necesario

#### Sidebar responsive: overlay drawer en móviles

**Problema:** En pantallas pequeñas, el sidebar ocupaba espacio valioso y el contenido semanal quedaba sin espacio horizontal.

**Solución:** Overlay drawer con las siguientes características:

| Aspecto | Implementación |
|---|---|
| **Mobile** (< 1024px) | Sidebar con `position: fixed; transform: translateX(-100%)` oculto fuera de pantalla. Se desliza (`translateX(0)`) al tocar el botón hamburguesa. |
| **Desktop** (≥ 1024px) | `position: relative; transform: none` — sidebar en el flujo flex normal, con colapso a íconos (`w-64` ↔ `w-16`). |
| **Botón hamburguesa** | `sticky top-0 z-10 self-start` dentro del contenedor scrolleable, no superpuesto al contenido. |
| **Backdrop** | `fixed inset-0 bg-black/50 z-30`, solo en mobile. Cierra el drawer al hacer clic. |
| **Cierre automático** | Al navegar (click en `<a>` del sidebar), al redimensionar a desktop, y al tocar el backdrop. |
| **Estado expandido** | Al abrir el drawer en mobile, fuerza `w-64` y `data-collapsed="false"` independientemente del estado de colapso en desktop. |

**Archivos modificados:**
- `src/layouts/ShellLayout.astro` — wrapper `#sidebar-wrapper` con CSS custom, botón hamburguesa, backdrop, script de toggle
- `src/components/Sidebar.astro` — sin cambios estructurales (el wrapper maneja la responsividad)

**Comportamiento en breakpoint 1024px:**
- CSS media query cambia `#sidebar-wrapper` de `fixed` a `relative`, eliminando transform y transición
- Botón hamburguesa se oculta (`lg:hidden`), botón de colapso a íconos aparece (`hidden lg:flex`)
- El sidebar vuelve al flujo normal del layout flex

#### Optimización de imágenes con `<Image />` de Astro

**Problema:** Las imágenes de héroe en las páginas semanales usaban `<img>` sin optimización, cargando archivos sin redimensionar ni convertir a formatos modernos.

**Solución:** Migrar a `<Image />` de `astro:assets` con procesamiento vía Sharp.

**Archivos modificados:**

| Archivo | Cambio |
|---|---|
| `src/pages/weekly/[week].astro` | `<img>` → `<Image from="astro:assets">` con `width={1000}`, `height={667}`, `loading="lazy"` |
| `astro.config.mjs` | Agregado `image.domains: ['images.unsplash.com']` |
| `package.json` | Agregada dependencia `sharp` |

**Resultados del build:**

| Imagen | Antes | Después | Reducción |
|---|---|---|---|
| `photo-17671773...` | 53 kB | 19 kB (WebP) | ~64% |
| `photo-14525739...` | 78 kB | 35 kB (WebP) | ~55% |
| `photo-15598196...` | 66 kB | 24 kB (WebP) | ~64% |
| `photo-15165034...` | 88 kB | 43 kB (WebP) | ~51% |

**Comportamiento:**
- Las imágenes se optimizan en build: redimensionan a 1000px y convierten a WebP
- `loading="lazy"` activa carga diferida por defecto
- Las URLs remotas (Unsplash) se descargan y procesan localmente durante el build
- El `object-fit: cover` del CSS mantiene el aspect ratio visual del contenedor h-48/h-64

### Preservación de Funcionalidad:
- La experiencia del usuario debe ser idéntica
- El diseño visual se mantiene consistente
- Las características principales se preservan

### Testing:
- Verificar funcionalidad en cada paquete migrado
- Probar navegación entre páginas
- Validar filtros y búsquedas
- Comprobar responsive design

## Comandos Útiles

### Desarrollo:
```bash
pnpm dev              # Iniciar servidor de desarrollo
pnpm build            # Construir para producción
pnpm preview          # Previsualizar build de producción
```

### Mantenimiento:
```bash
pnpm astro check      # Verificar tipos y errores
pnpm astro add <pkg>  # Agregar integraciones Astro
```

## Referencias

- [Documentación de Astro](https://docs.astro.build)
- [Guía de Migración a Astro](https://docs.astro.build/en/guides/migrate-to-astro/)
- [astro-icon](https://github.com/natemoo-re/astro-icon)
- [Lucide Icons](https://lucide.dev/)

## Filtrado: Enfoques y Implementación

### Diferencia de Enfoques

#### 1. Filtrado SSR (Server-Side Rendering) ❌ No utilizado

**Características:**
- Filtrado en servidor mediante parámetros de URL
- Recarga de página completa al cambiar filtros
- Estado mantenido en URL
- Mejor SEO para resultados filtrados

**Problemas en Astro:**
- Los selects HTML no mantienen valores con atributo `selected`
- Experiencia de usuario más lenta (recargas)
- Complejidad en sincronización de estado

**Código fallido:**
```astro
<form method="get" action="/schedule">
  <select name="dayFilter">
    <option value="" selected={dayFilter === ''}>Todos</option>
    <option value="Martes" selected={dayFilter === 'Martes'}>Martes</option>
  </select>
</form>
```

#### 2. Filtrado Cliente (Client-Side) ✅ Enfoque implementado

**Características:**
- Filtrado en navegador sin recargas
- Respuesta inmediata
- Estado en DOM del cliente
- Experiencia de usuario fluida

**Implementación:**
```astro
<div class="instructor-card" data-instructor="nombre profesor">
  <div class="attention-card" data-modalidad="virtual" data-dia="Martes">
    <!-- contenido -->
  </div>
</div>

<script client:load>
  function setupFilters() {
    const instructorSelect = document.getElementById('docente-select');
    const cards = document.querySelectorAll('.instructor-card');
    
    function filterSchedule() {
      const searchTerm = instructorSelect.value.toLowerCase();
      
      cards.forEach(card => {
        const instructor = card.dataset.instructor;
        const match = instructor.includes(searchTerm);
        card.style.display = match ? 'block' : 'none';
      });
    }
    
    instructorSelect.addEventListener('change', filterSchedule);
  }
  
  setupFilters();
</script>
```

### Implementación Final

#### Componentes del sistema de filtrado:

1. **HTML con atributos data:**
   - `data-instructor`: Nombre del instructor (minúsculas)
   - `data-modalidad`: "presencial" | "virtual"
   - `data-dia`: Día de la semana

2. **Script client:load:**
   - Ejecuta filtrado en navegador
   - Escucha eventos `change` en selects
   - Manipula display CSS directamente

3. **Lógica de filtrado:**
   - Filtro por instructor: Coincidencia parcial en nombre
   - Filtro por modalidad: Coincidencia exacta
   - Filtro por día: Coincidencia exacta
   - Combinación de filtros: Lógica AND

#### Archivos creados:
- `src/pages/schedule/index.astro`: Página con filtrado implementado
- `src/lib/schedule.ts`: Datos y utilidades
- `src/lib/instructors.ts`: Data source

### Comparación de Rendimiento

| Aspecto | SSR | Cliente |
|---------|-----|---------|
| Primera carga | ✅ Más rápida | ⚠️ Carga todos los datos |
| Cambio de filtro | ❌ Recarga página | ✅ Instantáneo |
| UX | ⚠️ Menos fluida | ✅ Más fluida |
| SEO | ✅ Mejor | ❌ Solo contenido inicial |
| Mantenibilidad | ✅ Simple | ⚠️ Más complejo |

### Recomendación

Para **interfaces de filtrado pequeñas/médianas** (como schedule):
- Usar **filtrado cliente** ✅
- Mejor experiencia de usuario
- Datos no masivos

Para **interfaces grandes o SEO-críticas**:
- Considerar **filtrado SSR**
- Más complejo pero mejor para grandes datasets

## Conclusión

La migración de fg1 a fg1-astro ha sido exitosa para los paquetes schedule, planner, weekly-plan y shared utilities, manteniendo toda la funcionalidad original mientras mejoramos significativamente el rendimiento y la experiencia del usuario. La arquitectura de MPA con SSR proporciona una base sólida para migrar los paquetes restantes.

### Logros alcanzados:
- ✅ Shell UI con navegación lateral
- ✅ Paquete schedule con filtrado cliente
- ✅ Paquete planner con animaciones CSS
- ✅ Paquete weekly-plan con rutas dinámicas
- ✅ Shared utilities con configuración centralizada
- ✅ Sistema de iconos optimizado
- ✅ Configuración CSS responsive

### Lecciones aprendidas:
- El filtrado cliente ofrece mejor UX para datasets pequeños
- Las animaciones CSS + JavaScript vanilla son más eficientes que animaciones React
- Es crucial definir variables CSS personalizadas en layouts
- Los scripts de cliente requieren JavaScript vanilla sin TypeScript
- El posicionamiento directo (`left`) es más confiable que `transform: translateX()` para elementos alineados
- Las rutas dinámicas con `getStaticPaths` son necesarias para contenido prerenderizado
- Los componentes presentacionales puros facilitan la separación de concerns
- Los React Context/Hooks se simplifican a módulos vanilla JS en Astro

### Próximos pasos:
1. Optimizar rendimiento general
2. Agregar testing end-to-end
3. Configurar adapter para deploy (Vercel/Netlify)