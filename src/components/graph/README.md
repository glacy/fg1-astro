# Componentes de Sistemas de Coordenadas

Componentes Astro interactivos y accesibles para visualizar sistemas de coordenadas cartesianas y polares.

## Características

- ✅ **Multi-puntos**: Soporta visualización de múltiples puntos en un mismo gráfico
- ✅ **Tema automático**: Detecta automáticamente el tema del sistema (light/dark)
- ✅ **Accesibilidad**: Soporte completo para screen readers, navegación por teclado y contraste
- ✅ **Interactividad**: Tooltips al hover con formato LaTeX $(x, y)$ y $r=3, \theta=45°$
- ✅ **Responsive**: Se adapta a diferentes tamaños de pantalla
- ✅ **Validación**: Indica cuando los puntos están fuera del rango visible
- ✅ **Math Rendering**: KaTeX para todas las etiquetas matemáticas ($x$, $y$, $r$, $\theta$, etiquetas de puntos, tooltips)
- ✅ **Etiquetas LaTeX**: Etiquetas de puntos, radio y tooltips en formato matemático con subíndices y fracciones
- ✅ **Grid Personalizable**: Control completo sobre el rango de la cuadrícula
- ✅ **Rayos cada 15°**: Sistema polar con líneas radiales cada 15 grados
- ✅ **Customizable**: Sistema de colores themable, múltiples opciones de configuración

## Instalación

Los componentes están en `src/components/graph/`:

```astro
import { SistemaCartesiano, SistemaPolar } from '@/components/graph';
```

## Uso Básico

### SistemaCartesiano

```astro
---
import { SistemaCartesiano } from '@/components/graph';
---

<!-- Un solo punto -->
<SistemaCartesiano points={[{ x: 2, y: 3 }]} />

<!-- Múltiples puntos con etiquetas LaTeX -->
<SistemaCartesiano points={[
  { x: 2, y: 3, label: 'A_1', color: '#EF4444' },
  { x: -1, y: 2, label: 'B_2', color: '#3B82F6' },
  { x: 0, y: -2, label: 'C_3', color: '#10B981' }
]} />
```

### SistemaPolar

```astro
---
import { SistemaPolar } from '@/components/graph';
---

<!-- Un solo punto (ángulo en grados por defecto) -->
<SistemaPolar points={[{ r: 3, theta: 45 }]} />

<!-- Múltiples puntos con etiquetas LaTeX -->
<SistemaPolar points={[
  { r: 3, theta: 45, label: 'P_1', color: '#EF4444' },
  { r: 2, theta: 120, label: 'P_2', color: '#3B82F6' },
  { r: 4, theta: 270, label: 'P_3', color: '#10B981' }
]} />

<!-- Ángulo en radianes -->
<SistemaPolar points={[{ r: 2, theta: Math.PI / 3 }]} angleInDegrees={false} />
```

**Nota:** El sistema polar dibuja líneas radiales cada 15° automáticamente para mayor precisión.

## Props Comunes

### SistemaCartesiano

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `points` | `Point[]` | **requerido** | Array de puntos `{x, y, label?, color?, id?}` |
| `width` | `number` | `561` | Ancho del SVG en px |
| `height` | `number` | `560` | Alto del SVG en px |
| `padding` | `number` | `50` | Margen para etiquetas |
| `gridSize` | `number` | `35` | Tamaño de cada unidad en px |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Tema de colores |
| `colors` | `Partial<ColorTheme>` | `{}` | Colores personalizados |
| `animatePoints` | `boolean` | `true` | Animación de pulsación en puntos |
| `showTooltips` | `boolean` | `true` | Mostrar tooltips al hover |
| `interactive` | `boolean` | `true` | Habilitar interactividad |
| `showLabels` | `boolean` | `true` | Mostrar etiquetas de ejes y números |
| `showGrid` | `boolean` | `true` | Mostrar cuadrícula |
| `showGuideLines` | `boolean` | `true` | Mostrar líneas guía punteadas |
| `showPointLabels` | `boolean` | `true` | Mostrar etiquetas LaTeX de los puntos |
| `maxRange` | `{x: number, y: number}` | `undefined` | Límites visibles del gráfico |
| `gridRange` | `{minX?, maxX?, minY?, maxY?}` | `undefined` | Rango personalizado de la cuadrícula |
| `className` | `string` | `''` | Clases CSS adicionales |
| `id` | `string` | `'cartesian-system'` | ID del elemento SVG |

### SistemaPolar

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `points` | `PolarPoint[]` | **requerido** | Array de puntos `{r, theta, label?, color?, id?}` |
| `angleInDegrees` | `boolean` | `true` | Si `theta` está en grados (true) o radianes (false) |
| `showRadialLine` | `boolean` | `true` | Mostrar línea desde el origen al punto |
| `showRadiusLabel` | `boolean` | `true` | Mostrar etiqueta LaTeX del radio |
| `showPointLabels` | `boolean` | `true` | Mostrar etiquetas LaTeX de los puntos |
| `maxRadius` | `number` | `undefined` | Radio máximo visible |
| *(demás props iguales a SistemaCartesiano)* | | | |

## Tipos

### Point (Cartesiano)

```typescript
interface Point {
  x: number;              // Coordenada X
  y: number;              // Coordenada Y
  label?: string;         // Etiqueta del punto
  color?: string;         // Color personalizado
  id?: string;            // ID único (opcional)
}
```

### PolarPoint

```typescript
interface PolarPoint {
  r: number;              // Radio
  theta: number;          // Ángulo (grados o radianes según `angleInDegrees`)
  label?: string;         // Etiqueta del punto
  color?: string;         // Color personalizado
  id?: string;            // ID único (opcional)
  tooltipOffset?: { x: number; y: number };  // Desplazamiento del tooltip (px, default: {x: 15, y: -20})
}
```

## Personalización Avanzada

### Colores Personalizados

```astro
<SistemaCartesiano
  points={[{ x: 2, y: 3 }]}
  colors={{
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    guide: '#A0A0A0',
    tooltip: 'rgba(0,0,0,0.9)',
  }}
/>
```

### Tema Forzado

```astro
<!-- Forzar tema oscuro -->
<SistemaCartesiano
  points={[{ x: 2, y: 3 }]}
  theme="dark"
/>

<!-- Forzar tema claro -->
<SistemaPolar
  points={[{ r: 3, theta: 45 }]}
  theme="light"
/>
```

### Sin Animaciones (para users que prefieren reduced motion)

```astro
<SistemaCartesiano
  points={[{ x: 2, y: 3 }]}
  animatePoints={false}
/>
```

### Gráfico No Interactivo

```astro
<SistemaCartesiano
  points={[{ x: 2, y: 3 }]}
  interactive={false}
  showTooltips={false}
/>
```

### Límites del Gráfico

```astro
<SistemaCartesiano
  points={[
    { x: 2, y: 3 },
    { x: 15, y: 5 }  // Este punto mostrará warning
  ]}
  maxRange={{ x: 10, y: 10 }}
/>
```

### Control del Rango de la Cuadrícula

```astro
<!-- Dibujar grid desde -6 hasta +6 (excluyendo -7 y +7) -->
<SistemaCartesiano
  points={[
    { x: 2, y: 3 },
    { x: -1, y: 2 }
  ]}
  gridRange={{ minX: -6, maxX: 6, minY: -6, maxY: 6 }}
/>

<!-- Solo líneas positivas del primer cuadrante -->
<SistemaCartesiano
  points={[{ x: 2, y: 3 }]}
  gridRange={{ minX: 0, maxX: 5, minY: 0, maxY: 5 }}
/>
```

### Etiquetas LaTeX

```astro
<!-- Sistema Cartesiano con etiquetas matemáticas -->
<SistemaCartesiano
  points={[
    { x: 2, y: 3, label: 'A_1', color: '#EF4444' },
    { x: -1, y: 2, label: 'B_2', color: '#3B82F6' },
    { x: 0, y: -2, label: 'C_3', color: '#10B981' }
  ]}
  showPointLabels={true}
/>

<!-- Sistema Polar con etiquetas matemáticas -->
<SistemaPolar
  points={[
    { r: 3, theta: 45, label: 'P_1', color: '#EF4444' },
    { r: 2, theta: 120, label: 'P_2', color: '#3B82F6' }
  ]}
  showPointLabels={true}
  showRadiusLabel={true}
/>

<!-- Ocultar etiquetas de puntos pero mantener etiquetas de ejes -->
<SistemaCartesiano
  points={[
    { x: 2, y: 3, label: 'A' },
    { x: -1, y: 2, label: 'B' }
  ]}
  showPointLabels={false}
  showLabels={true}
/>
```

### Posición Personalizada del Tooltip

```astro
<!-- Sistema Polar con offset de tooltip personalizado por punto -->
<SistemaPolar
  points={[
    { r: 3, theta: 45, label: 'P_1', color: '#EF4444', tooltipOffset: { x: 30, y: -40 } },
    { r: 2, theta: 120, label: 'P_2', color: '#3B82F6', tooltipOffset: { x: -80, y: 20 } },
    { r: 4, theta: 270, label: 'P_3', color: '#10B981' }  // usa default {x: 15, y: -20}
  ]}
/>
```

## Accesibilidad

### Screen Readers

Los componentes incluyen soporte completo para screen readers:

- `role="img"` en el SVG
- `aria-label` descriptivo con las coordenadas de todos los puntos
- `aria-describedby` con descripción detallada
- Etiquetas `aria-label` individuales para cada punto
- Navegación por teclado con `tabindex`

### Teclado

- `Tab` para navegar entre puntos
- `Enter` o `Espacio` para mostrar coordenadas en alert
- `Shift + Tab` para navegar hacia atrás

### Tema y Contraste

- Detección automática del tema del sistema
- Colores optimizados para contraste en ambos temas
- Respeto a `prefers-reduced-motion`

## Ejemplos Completos

### Gráfico Comparativo

```astro
---
import { SistemaCartesiano, SistemaPolar } from '@/components/graph';
---

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>
    <h3 class="text-lg font-semibold mb-4">Coordenadas Cartesianas</h3>
    <SistemaCartesiano
      points={[
        { x: 2, y: 3, label: 'A', color: '#EF4444' },
        { x: -1, y: 2, label: 'B', color: '#3B82F6' },
        { x: 0, y: -2, label: 'C', color: '#10B981' }
      ]}
      className="w-full"
    />
  </div>

  <div>
    <h3 class="text-lg font-semibold mb-4">Coordenadas Polares</h3>
    <SistemaPolar
      points={[
        { r: 3, theta: 56.3, label: 'A', color: '#EF4444' },  // mismo punto A
        { r: 2.24, theta: 116.6, label: 'B', color: '#3B82F6' },  // mismo punto B
        { r: 2, theta: 270, label: 'C', color: '#10B981' }  // mismo punto C
      ]}
      className="w-full"
    />
  </div>
</div>
```

### Gráfico con Límites y Validación

```astro
<SistemaCartesiano
  points={[
    { x: 2, y: 3, label: 'Dentro', color: '#10B981' },
    { x: 12, y: 8, label: 'Fuera', color: '#EF4444' }
  ]}
  maxRange={{ x: 10, y: 10 }}
  colors={{
    warning: '#F59E0B',
  }}
/>
```

### Sistema Polar en Radianes

```astro
<SistemaPolar
  points={[
    { r: 2, theta: Math.PI / 4, label: 'π/4', color: '#EF4444' },
    { r: 3, theta: Math.PI / 2, label: 'π/2', color: '#3B82F6' },
    { r: 1.5, theta: Math.PI, label: 'π', color: '#10B981' },
    { r: 2, theta: (3 * Math.PI) / 2, label: '3π/2', color: '#F59E0B' }
  ]}
  angleInDegrees={false}
  showThetaLabel={false}
/>
```

## Notes

- Los componentes respetan `prefers-reduced-motion` y deshabilitan animaciones cuando es necesario
- El tema se detecta automáticamente pero puede forzarse con la prop `theme`
- Los tooltips usan `pointer-events: none` para no interferir con la interactividad
- Los colores por defecto están optimizados para contraste WCAG AA en ambos temas
- El tamaño del SVG es responsive pero mantiene su aspect ratio
