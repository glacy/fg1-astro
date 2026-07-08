# Componente Footer Compartido

El componente `Footer` está centralizado en `packages/shared/src/components/Footer.tsx` y puede ser utilizado por todas las aplicaciones del monorepo.

## Características

- **Diseño Responsive**: Se adapta a diferentes tamaños de pantalla
- **Tematizado**: Respeto automático del tema (claro/oscuro)
- **Variantes**: Dos variantes predefinidas (`full` y `minimal`)
- **Configuración Flexible**: Props opcionales para personalizar contenido

## Uso Básico

```tsx
import { Footer } from '@course-dashboard/shared';

<Footer
  courseName="Física General I"
  institution="Tecnológico de Costa Rica"
  githubRepository="https://github.com/tu-repo"
/>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `courseName` | `string` | - | Nombre del curso (usado para el copyright) |
| `institution` | `string` | - | Nombre de la institución |
| `footerText` | `string` | - | Texto alternativo del footer (si no usa courseName/institution) |
| `githubRepository` | `string` | - | URL del repositorio GitHub |
| `showCreditsDialog` | `ReactNode` | - | Componente de diálogo de créditos (ej: `<CreditsDialog />`) |
| `showAnalytics` | `ReactNode` | - | Componente de analytics (ej: `<Analytics />`) |
| `className` | `string` | - | Clases CSS adicionales |
| `variant` | `'full' \| 'minimal'` | `'full'` | Variante del diseño del footer |

## Variantes

### Full (Completa)

Variante con diseño completo, mostrando línea de copyright y botones de acción.

```tsx
<Footer
  variant="full"
  courseName="Física General I"
  institution="TEC"
  githubRepository="https://github.com/tu-repo"
  showCreditsDialog={<CreditsDialog />}
/>
```

**Uso en**: Weekly Plan

### Minimal (Minimalista)

Variante minimalista con diseño compacto.

```tsx
<Footer
  variant="minimal"
  footerText="© 2026 Mi Institución"
  githubRepository="https://github.com/tu-repo"
/>
```

**Uso en**: Planner

## Ejemplos

### Footer Completo con Analytics

```tsx
<Footer
  variant="full"
  courseName="Química Orgánica"
  institution="Universidad XYZ"
  githubRepository="https://github.com/curso-quimica"
  showCreditsDialog={<CreditsDialog />}
  showAnalytics={<Analytics />}
/>
```

### Footer Simple sin GitHub

```tsx
<Footer
  variant="minimal"
  footerText="© 2026 Curso Educativo"
/>
```

### Footer con Clases Personalizadas

```tsx
<Footer
  courseName="Mi Curso"
  footerText="© 2026"
  className="custom-footer-class"
/>
```

## Estilos

El componente utiliza TailwindCSS y respeta automáticamente el tema configurado en `ThemeContext`. No es necesario pasar props de tema.

## Accesibilidad

El componente incluye:
- `aria-label` en enlaces externos
- `aria-hidden` en elementos decorativos
- Soporte para navegación por teclado
- Contraste de color apropiado

## Migración desde Footer Local

### Antes (Weekly Plan)

```tsx
<footer className="...">
  <p>© 2026 Cátedra de {CONFIG.course.name}</p>
  <a href={CONFIG.github.repository}>Repositorio</a>
  <CreditsDialog />
</footer>
```

### Después

```tsx
<Footer
  variant="full"
  courseName={CONFIG.course.name}
  institution={CONFIG.course.institution}
  githubRepository={CONFIG.github.repository}
  showCreditsDialog={<CreditsDialog />}
/>
```

## Personalización Futura

Para agregar nuevas variantes o funcionalidades:

1. Agrega la nueva variante en el tipo `FooterProps`
2. Implementa la lógica de renderizado en el componente
3. Documenta en este README
