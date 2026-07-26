# Física General I - Brand & Visual Style

## Brand Overview

**Proyecto**: Física General I (FG1) - Tecnológico de Costa Rica  
**Periodo**: II Semestre 2026  
**Tipo**: Plataforma educativa PWA offline-first con semanarios, prácticas, evaluaciones y documentación académica

## Design System

### Color Palette

#### Light Mode
- **Background**: `hsl(0 0% 100%)` - Blanco puro
- **Foreground**: `hsl(222.2 84% 4.9%)` - Gris oscuro casi negro
- **Primary**: `hsl(221.2 83.2% 53.3%)` - Azul royal brillante
- **Primary Foreground**: `hsl(210 40% 98%)` - Blanco suave
- **Secondary**: `hsl(210 40% 96.1%)` - Gris muy claro
- **Secondary Foreground**: `hsl(222.2 47.4% 11.2%)` - Gris oscuro
- **Muted**: `hsl(210 40% 96.1%)` - Gris claro
- **Muted Foreground**: `hsl(215.4 16.3% 46.9%)` - Gris medio
- **Accent**: `hsl(210 40% 96.1%)` - Gris claro
- **Accent Foreground**: `hsl(222.2 47.4% 11.2%)` - Gris oscuro
- **Border**: `hsl(214.3 31.8% 91.4%)` - Gris suave
- **Ring**: `hsl(221.2 83.2% 53.3%)` - Azul royal
- **Destructive**: `hsl(0 84.2% 60.2%)` - Rojo vibrante
- **Card Background**: `hsl(0 0% 100%)`

#### Dark Mode
- **Background**: `hsl(222.2 84% 4.9%)` - Azul oscuro casi negro `#0b0f19`
- **Foreground**: `hsl(210 40% 98%)` - Blanco suave
- **Primary**: `hsl(217.2 91.2% 59.8%)` - Azul cielo claro
- **Primary Foreground**: `hsl(222.2 47.4% 11.2%)` - Gris oscuro
- **Secondary**: `hsl(217.2 32.6% 17.5%)` - Azul grisáceo oscuro `#161d2a`
- **Secondary Foreground**: `hsl(210 40% 98%)` - Blanco suave
- **Muted**: `hsl(217.2 32.6% 17.5%)` - Azul grisáceo oscuro
- **Muted Foreground**: `hsl(215 20.2% 65.1%)` - Gris medio claro
- **Accent**: `hsl(217.2 32.6% 17.5%)` - Azul grisáceo oscuro
- **Accent Foreground**: `hsl(210 40% 98%)` - Blanco suave
- **Border**: `hsl(217.2 32.6% 17.5%)` - Azul grisáceo oscuro
- **Ring**: `hsl(224.3 76.3% 48%)` - Azul medio
- **Destructive**: `hsl(0 62.8% 30.6%)` - Rojo oscuro
- **Card Background**: `hsl(222.2 84% 4.9%)`

#### Gradient Accents
- **Background Gradient**: `bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5` - Sutil acento azul a índigo

### Typography

**Font Family**: Inter (Google Fonts autohosted via @fontsource/inter)
- **Variants**: 300, 400, 500, 600, 700
- **System Fallback**: `system-ui, sans-serif`
- **CSS Variable**: `--font-geist-sans: "Inter", system-ui, sans-serif`

**Typographic Hierarchy**:
- Títulos en pesos 600-700
- Cuerpo de texto en 400-500
- Énfasis en 500-600
- Subtítulos/descripciones en 300-400

### Border Radius & Spacing

**Border Radius**: `0.5rem` (8px) - estándar para cards, botones y contenedores
**Buttons**: `rounded-xl` (12px) para botones principales
**Toggle**: `rounded-full` para elementos de toggle

### Component Patterns

#### Cards
- Background: `bg-white dark:bg-[#161d2a]`
- Border: `border border-gray-200 dark:border-white/5`
- Shadow: `shadow-sm`
- Hover: `hover:shadow-md hover:shadow-gray-200/50`

#### Buttons
- Primary: `bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600`
- Secondary: `bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10`
- Toggle/Collapse: `bg-white dark:bg-[#161d2a] border border-gray-200 dark:border-white/5`
- Focus: `focus-visible:ring-2 focus-visible:ring-blue-500`

#### Sidebar
- Desktop: `w-64` expandido, `w-16` colapsado
- Mobile: Drawer con backdrop blur `bg-white/70 dark:bg-[#161d2a]/70 backdrop-blur-sm`
- Icons: Lucide (lucide:chevron-left, lucide:menu, lucide:x)
- Transitions: `transition-all duration-200`

#### Tabs & Pills
- Active: `text-blue-600 dark:text-blue-400`
- Inactive: `text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200`
- Pills: Contenedores sin `overflow-hidden`, extremos `rounded-l-lg`/`rounded-r-lg`

### Visual Characteristics

**Theme**: Académico profesional con acentos tecnológicos

**Vibe**:
- Moderno y limpio
- Accesible (WCAG AA contrast ratios)
- Off-line friendly (PWA)
- Científico pero no abrumador
- Dark-first ready (default dark mode en sistema)

**Brand Voice**:
- Autoridad educativa
- Claro y directo
- Profesional pero accesible
- Orientado a resultados (estudiantes universitarios)

### Animation & Transitions

**Timing**: 
- Sidebar collapse: `0.3s ease-in-out`
- Hover effects: `200ms`
- View Transitions: nativo de Astro, sin custom easing

**Transitions Type**:
- `transition-all duration-200` para interacciones generales
- `transition-colors` para cambios de estado
- `transition-none` para cambios inmediatos (initial state)

### Accessibility

**Contrast**: Asegurar 4.5:1 para texto normal, 3:1 para texto grande

**Focus States**:
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`
- Pills: `relative focus-visible:z-10` para ring visibility

**Responsive Breakpoints**:
- Mobile: `< 1024px` (drawer sidebar)
- Desktop: `≥ 1024px` (sidebar inline colapsable)

### Pattern Language

**Grid System**: Flexbox-first, grid para layouts complejos

**Spacing**: Tailwind scale (4 = 1rem)

**Icons**: Lucide Icons (lucide:* namespace)

**RTL Support**: No requerido (español LTR)

**Language**: Español (es-CR)

### Brand Assets

**Favicon**: `/favicon.svg` (SVG)
**PWA Manifest**: `/manifest.json` con `start_url: "/"`, `theme-color: "#000000"`
**Screenshot Preview**: `screenshot-wide.png` (1920x1080)

### Content Patterns

**Frontmatter Schema**:
- `title`: Descriptivo y conciso
- `description`: SEO-friendly
- `keywords`: Separados por comas
- `author`: TEC Costa Rica / instructores
- `date`: ISO format
- `readingTime`: Estimado en minutos
- `tags`: Array de strings
- `category`: Temática académica
- `difficulty`: beginner/intermediate/advanced

**Markdown Patterns**:
- Tablas: pipe tables (`| col1 | col2 |`)
- Math: KaTeX (`$inline$`, `$$display$$`)
- Figuras: `<figure>` + `<img>` con `src` relativa
- Bloques destacados: `<div class="note">`

### Platform & Technical Context

**Framework**: Astro + Starlight (docs) + PWA (Service Worker custom)
**Styling**: Tailwind CSS + CSS variables para theming
**Deployment**: Vercel (auto-deploy desde git push origin main)
**PWA**: injectManifest mode, SW custom en `src/sw.ts`
**SEO**: Schema.org JSON-LD + OpenGraph + Twitter Cards
**Security**: CSP headers, X-Frame-Options, referrer-policy

### Brand Guardrails

**DO**:
- Usar acentos azules (primary) para CTAs y elementos activos
- Mantener contraste alto en modo oscuro
- Respetar el sistema de border radius (8px base, 12px buttons)
- Usar Inter para todo el texto (será montón de lectura)
- Priorizar legibilidad en mobile

**DON'T**:
- Usar colores fuera de la paleta definida
- Ignorar modo oscuro (es default para muchos estudiantes)
- Overload de animaciones (mantener minimal)
- Crear elementos con under-4.5:1 contrast
- Usar efectos glassmorphism excesivos (sólo backdrop sutil en mobile)