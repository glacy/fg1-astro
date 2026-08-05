# Guía de Migración

## De SistemaCartesiano Antiguo → Nuevo

### Cambios Principales

1. **Prop `x`, `y` → `points` array**
   ```astro
   <!-- Antiguo -->
   <SistemaCartesiano x={2} y={3} />

   <!-- Nuevo -->
   <SistemaCartesiano points={[{ x: 2, y: 3 }]} />
   ```

2. **Soporte para múltiples puntos**
   ```astro
   <!-- Nuevo: múltiples puntos -->
   <SistemaCartesiano points={[
     { x: 2, y: 3, label: 'A', color: '#EF4444' },
     { x: -1, y: 2, label: 'B', color: '#3B82F6' }
   ]} />
   ```

3. **Nuevo path de importación**
   ```astro
   <!-- Antiguo -->
   import SistemaCartesiano from '@/components/SistemaCartesiano.astro';

   <!-- Nuevo -->
   import { SistemaCartesiano } from '@/components/graph';
   ```

### Props Eliminados

- Ninguna prop fue eliminada, todas las props anteriores están soportadas

### Nuevas Props

- `points`: Array de puntos (requerido)
- `colors`: Personalización de colores
- `theme`: 'light' | 'dark' | 'auto'
- `animatePoints`: Control de animaciones
- `showTooltips`: Control de tooltips
- `interactive`: Control de interactividad
- `maxRange`: Límites del gráfico
- `id`: ID personalizado del SVG

## De SistemaPolar Antiguo → Nuevo

### Cambios Principales

1. **Prop `r`, `theta` → `points` array**
   ```astro
   <!-- Antiguo -->
   <SistemaPolar r={3} theta={45} />

   <!-- Nuevo -->
   <SistemaPolar points={[{ r: 3, theta: 45 }]} />
   ```

2. **Soporte para múltiples puntos**
   ```astro
   <!-- Nuevo: múltiples puntos -->
   <SistemaPolar points={[
     { r: 3, theta: 45, label: 'P1', color: '#EF4444' },
     { r: 2, theta: 120, label: 'P2', color: '#3B82F6' }
   ]} />
   ```

3. **Nuevas features**
   - Arco del ángulo θ
   - Línea radial desde el origen
   - Etiquetas de radio y ángulo

### Props Eliminadas

- `showGuideLines`: Reemplazada por `showRadialLine` y `showAngleArc`
- `showAngleArc`: Ahora es una prop individual (existía pero no funcionaba)

### Nuevas Props

- `points`: Array de puntos (requerido)
- `colors`: Personalización de colores
- `theme`: 'light' | 'dark' | 'auto'
- `animatePoints`: Control de animaciones
- `showTooltips`: Control de tooltips
- `interactive`: Control de interactividad
- `maxRadius`: Radio máximo visible
- `showAngleArc`: Mostrar arco del ángulo
- `showRadialLine`: Mostrar línea radial
- `showThetaLabel`: Mostrar etiqueta del ángulo
- `showRadiusLabel`: Mostrar etiqueta del radio
- `id`: ID personalizado del SVG

## Ejemplos de Migración

### Ejemplo 1: Punto Único

**Antiguo:**
```astro
<SistemaCartesiano x={2} y={3} pointColor="#FF0000" />
```

**Nuevo:**
```astro
<SistemaCartesiano points={[
  { x: 2, y: 3, color: '#FF0000' }
]} />
```

### Ejemplo 2: Sistema Polar

**Antiguo:**
```astro
<SistemaPolar r={3} theta={45} angleInDegrees={true} />
```

**Nuevo:**
```astro
<SistemaPolar points={[
  { r: 3, theta: 45 }
]} angleInDegrees={true} />
```

### Ejemplo 3: Múltiples Puntos (Nuevo Feature)

**Nuevo:**
```astro
<SistemaCartesiano points={[
  { x: 2, y: 3, label: 'A', color: '#EF4444' },
  { x: -1, y: 2, label: 'B', color: '#3B82F6' },
  { x: 0, y: -2, label: 'C', color: '#10B981' }
]} />
```

### Ejemplo 4: Personalización Avanzada

**Nuevo:**
```astro
<SistemaCartesiano
  points={[
    { x: 2, y: 3, label: 'A', color: '#EF4444' },
    { x: -1, y: 2, label: 'B', color: '#3B82F6' }
  ]}
  colors={{
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    guide: '#A0A0A0',
  }}
  theme="dark"
  animatePoints={false}
  showTooltips={true}
  interactive={true}
/>
```

## Backward Compatibility

Para facilitar la migración, puedes usar los componentes antiguos temporalmente:

```astro
<!-- Aún funciona (pero se recomienda migrar) -->
<SistemaCartesiano x={2} y={3} />
<SistemaPolar r={3} theta={45} />
```

**Nota:** Los componentes antiguos serán removidos en futuras versiones.

## Beneficios de la Migración

✅ **Multi-puntos**: Visualizar varios puntos en un mismo gráfico
✅ **Mejor accesibilidad**: Screen readers, teclado, contraste
✅ **Tema automático**: Detecta light/dark mode
✅ **Interactividad**: Tooltips, hover effects, focus states
✅ **Validación**: Indica puntos fuera de rango
✅ **Math rendering**: KaTeX para etiquetas matemáticas
✅ **Customización**: Sistema de colores themable
✅ **Responsive**: Mejor adaptación a diferentes tamaños

## Soporte

Si tienes problemas durante la migración:

1. Consulta la documentación completa en `README.md`
2. Revisa los ejemplos en `Demo.astro`
3. Verifica que estás importando desde `@/components/graph`
4. Asegúrate de que `points` es un array válido

## Timeline

- **v1.0**: Componentes nuevos disponibles (actual)
- **v1.2**: Componentes antiguos deprecados
- **v2.0**: Componentes antiguos removidos
