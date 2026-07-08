# Copilot Instructions for Planeamiento Semanal

This is a React + Vite educational timeline management system for a Physics course at Tecnológico de Costa Rica.

## Build, Test & Lint Commands

### Development
```bash
npm run dev           # Start dev server at http://localhost:3000
```

### Production Build
```bash
npm run build         # Standard optimized build → build/
npm run build:single  # Single-file HTML build (portable, offline-friendly)
```

**Build Mode Details:**
- **Normal build** (`npm run build`): Multi-file output optimized for Vercel/CDNs with separate CSS/JS assets
- **Single-file build** (`VITE_BUILD_MODE=single npm run build`): All-in-one HTML file (good for distribution/USB sharing)

### Note
No linting, testing, or type-checking scripts exist yet. Use `npx tsc --noEmit` to check TypeScript types manually during development.

---

## High-Level Architecture

### Core Concept
The app is a visual timeline interface that guides students through a 16-week physics course. It transforms a static syllabus into an interactive experience with:
- **Completed weeks** (green, with checkmarks)
- **Current week** (highlighted/active)
- **Future weeks** (locked/grayed out)

### Tech Stack
- **React 18** + **Vite** (fast builds, HMR)
- **TypeScript** (strict mode for type safety)
- **Tailwind CSS** (styling)
- **Lucide React** (icons)
- **Framer Motion** (smooth animations)
- **shadcn/ui** (accessible UI components via Radix UI)

### Data Flow Architecture
```
ThemeProvider (global dark/light mode)
  └── CourseProvider (global course state)
      └── App (orchestrator)
          ├── Header (UI controls)
          ├── Sidebar (timeline + navigation)
          └── WeekContent (main content area)
```

**Key Principle**: No prop drilling. State accessed via `useTheme()` and `useCourse()` hooks from any component.

### Configuration
All app configuration lives in `src/config/app.ts`:
- Course name, institution, total weeks
- Current week progression (`maxCurrentWeek` controls which weeks are accessible)
- UI animations and breakpoints
- Theme colors and defaults

To advance the "course timeline", edit `maxCurrentWeek` in `src/config/app.ts`. Example:
```typescript
maxCurrentWeek: 4,  // Weeks 1-3 complete (green), week 4 active (blue), weeks 5-16 locked (gray)
```

---

## Key Conventions

### File Organization

**Atomic Architecture by Layer:**
- `src/config/app.ts` — Single source of truth for all configuration
- `src/contexts/` — Global state (ThemeContext, CourseContext)
- `src/data/` — Static data (weeks.ts, credits.ts)
- `src/components/` — React components
  - `ui/` — Base UI components from shadcn/ui
  - Root level — Project-specific components (organized by abstraction level)
- `src/hooks/` — Custom React hooks (useTheme)
- `src/styles/` — Global CSS

### Component Naming & Structure

**Naming Convention:**
- Components: `PascalCase.tsx` (e.g., `LinkCard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useTheme.ts`)
- Contexts: `PascalCase` with `Context` suffix (e.g., `ThemeContext.tsx`)
- Types/Interfaces: `PascalCase` with `Props` suffix (e.g., `LinkCardProps`)

**Component Abstraction Levels:**
1. **Atomic** — Simple, highly reusable (LinkCard, StatusBadge, ObjectivesList)
2. **Molecular** — Combines atomics for specific UI patterns (WeekHeader, Section, WeekItem)
3. **Organismal** — Orchestrates multiple moleculars & manages complex state (App, Sidebar, WeekContent)

### TypeScript & Type Safety
- Strict mode enabled (`"strict": true`)
- Always define component props with interfaces: `interface ComponentNameProps { ... }`
- Use `React.FC<ComponentNameProps>` for functional components
- Export type interfaces for external use

### Styling with Tailwind CSS

**Patterns:**
- Dark mode uses CSS variables (dark: `#0b0f19`, light: `gray-50`)
- Always use `useTheme()` hook to get `isDarkMode` and apply conditional classes
- Consistency: Check existing components (LinkCard, WeekItem) for color patterns
- Responsive: Use Tailwind breakpoints (sm, md, lg, xl) defined in CONFIG

**Example:**
```tsx
const { isDarkMode } = useTheme();
const bgColor = isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900';
```

### Context Usage

**Never access context values directly; always use provided hooks:**
```tsx
// ✅ Correct
import { useTheme } from '../contexts/ThemeContext';
const { isDarkMode, toggleTheme } = useTheme();

// ❌ Avoid (creates unnecessary imports)
import ThemeContext from '../contexts/ThemeContext';
```

**Context Providers wrap in `src/main.tsx`:**
```tsx
<ThemeProvider>
  <CourseProvider>
    <App />
  </CourseProvider>
</ThemeProvider>
```

### Data Structure

**Week Data (`src/data/weeks.ts`):**
- Each week exports a `Week` interface with: `id`, `title`, `image`, `objectives`, `contenidos`, `materials`, `evaluation`
- Import weeks for runtime access to current week's content in `WeekContent.tsx`

**Static Metadata (`src/config/app.ts`):**
- Centralized constants (animation durations, colors, course info)
- Single point of change for global configuration

### Animations & Transitions

**Convention:**
- Use `motion` library (Framer Motion) for component entrance/exit animations
- Animation timings defined in `CONFIG.ui.animations` (transition: 0.3s, sectionEntrance: 0.4s, sectionDelay: 0.1s)
- Apply staggered delays in lists: `<motion.div delay={index * sectionDelay}>`

### Component Reusability Rules

1. **If you see repeated patterns** → extract to atomic component
2. **If a component has 3+ levels of nesting** → consider breaking into moleculars
3. **If state is passed through 3+ levels** → consider a context
4. **Generic components (LinkCard, Section) with props variants** → make variants exhaustive with TypeScript unions

### Accessibility

- Use semantic HTML (nav, main, section)
- `aria-label` for icon-only buttons and external links
- `aria-hidden="true"` for decorative elements (icons that aren't buttons)
- WCAG 2.1 AA contrast ratios in light/dark modes

---

## When Adding Features

1. **New Content Section?** → Create atomic component, wrap in `<Section>`, use in `WeekContent.tsx`
2. **New Global State?** → Create `src/contexts/MyContext.tsx`, wrap App in `main.tsx`, access via custom hook
3. **New Data Type?** → Add interface to `src/data/`, import in components that use it
4. **UI Configuration?** → Add to `src/config/app.ts` (e.g., animation timings, colors)
5. **Refactoring Components?** → Run `npm run dev` to verify HMR works; check TypeScript types with `npx tsc --noEmit`

---

## Important Notes

- **No linting/testing setup**: Add ESLint/Jest if needed for larger refactors
- **Component imports**: Use path alias `@/` defined in `tsconfig.json` (resolves to `src/`)
- **Dark mode detection**: Respects system preference on first load; then persists user toggle in context
- **Mobile responsive**: Sidebar collapses on `md` breakpoint; test responsive behavior during dev
