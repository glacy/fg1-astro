---
title: Configuración i18n para Componentes Starlight
description: Configuración de traducciones personalizadas para componentes como MultipleChoice en Starlight
---

# Configuración i18n para Componentes Starlight

Este documento explica la configuración del sistema de internacionalización (i18n) para componentes personalizados en Starlight, específicamente para componentes como `<MultipleChoice>` que requieren traducciones personalizadas.

## Problema Inicial

Al usar componentes del repositorio de Astro docs tutorial que dependen de `Astro.locals.t()`, encontrábamos dos problemas:

1. **URLs `undefined`**: La navegación a documentación Starlight generaba URLs incorrectos que apuntaban a `localhost/undefined/...`
2. **Componentes sin traducción**: Los componentes `<MultipleChoice>` mostraban claves de traducción literales (`multipleChoice.defaultCorrect`, `multipleChoice.submitLabel`) en lugar de los valores traducidos

## Solución: Sistema i18n de Starlight

### ¿Qué es i18n?

`i18n` (de "internationalization") es el sistema de Astro para manejar traducciones de interfaz de usuario en múltiples idiomas. Starlight extiende este sistema para sus propios componentes UI.

### Por qué necesitamos i18nLoader() y i18nSchema()

#### `i18nLoader()`

El `i18nLoader()` es un loader especial de Starlight que:

- **Carga archivos de traducción**: Busca archivos JSON en `src/content/i18n/` con nombres de código de idioma (ej. `es.json`, `en.json`)
- **Integra con Starlight**: Hace que estas traducciones estén disponibles en `Astro.locals.t()` dentro de componentes
- **Maneja múltiples locales**: Permite tener traducciones diferentes para cada idioma configurado

#### `i18nSchema()`

El `i18nSchema()` define el schema de validación para los archivos de traducción:

- **Valida estructura**: Asegura que los archivos de traducción tengan el formato JSON correcto
- **Soporta extensión**: Permite agregar claves personalizadas a través del parámetro `extend`
- **TypeScript**: Proporciona tipado para las claves de traducción disponibles

## Estructura de Archivos

### 1. Archivo de Configuración (`src/content/config.ts`)

```typescript
import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

// Schema personalizado para traducciones de componentes
const customI18nSchema = z.object({
  'multipleChoice.defaultCorrect': z.string(),
  'multipleChoice.defaultIncorrect': z.string(),
  'multipleChoice.submitLabel': z.string(),
});

export const collections = {
  docs: defineCollection({ 
    loader: docsLoader(), 
    schema: docsSchema({ extend: docsMetadata }) 
  }),
  weeks: weeksCollection,
  i18n: defineCollection({ 
    loader: i18nLoader(), 
    schema: i18nSchema({ extend: customI18nSchema }) 
  }),
};
```

**Componentes clave:**
- `loader: i18nLoader()` - Carga archivos de traducción
- `schema: i18nSchema({ extend: customI18nSchema })` - Valida y permite claves personalizadas
- `customI18nSchema` - Define las claves de traducción personalizadas con Zod

### 2. Directorio de Traducciones (`src/content/i18n/`)

```
src/content/i18n/
└── es.json          # Traducciones en español
```

**Formato del archivo:**
- **Debe ser JSON**, no YAML
- **Sin comentarios** (las líneas que empiezan con `#` no son válidas en JSON)
- **Nombres de archivos**: Código de idioma ISO (ej. `es.json`, `en.json`, `fr.json`)

**Ejemplo de `es.json`:**

```json
{
  "multipleChoice.defaultCorrect": "¡Correcto!",
  "multipleChoice.defaultIncorrect": "¡Inténtalo de nuevo!",
  "multipleChoice.submitLabel": "Enviar",
  "404.title": "No encontrado",
  "site.title": "Documentación de Astro"
}
```

## Configuración de Starlight

### Importante: `defaultLocale` y `base`

Para evitar URLs `undefined`, Starlight requiere configuración adecuada de locales:

```typescript
// astro.config.mjs
starlight({
  title: 'Documentos FG1 - II semestre 2026',
  defaultLocale: 'root',
  base: '/',
  locales: {
    root: {
      label: 'Documentación',
      lang: 'es',
    },
  },
})
```

- `defaultLocale: 'root'` - Especifica que el locale raíz es el predeterminado
- `base: '/'` - Configura la base del URL correctamente

## Uso en Componentes

### Componentes que Necesitan Traducciones

Los componentes del repositorio Astro docs usan `Astro.locals.t()` para acceder a traducciones:

```astro
// src/components/MultipleChoice.astro
<multiple-choice
  data-correct-label={Astro.locals.t("multipleChoice.defaultCorrect")}
  data-incorrect-label={Astro.locals.t("multipleChoice.defaultIncorrect")}
>
  <!-- Contenido del componente -->
</multiple-choice>
```

**Cómo funciona:**
1. Starlight carga las traducciones del archivo `es.json`
2. Las hace disponibles en `Astro.locals.t()`
3. El componente obtiene los valores traducidos en lugar de las claves literales

## Schema Extendido: Por Qué y Cómo

### Por qué necesitamos extender el schema

El schema predeterminado de `i18nSchema()` solo incluye las claves de Starlight. Para usar claves personalizadas (como `multipleChoice.*`), necesitamos extenderlo.

### Cómo extender el schema

```typescript
const customI18nSchema = z.object({
  'multipleChoice.defaultCorrect': z.string(),
  "multipleChoice.defaultIncorrect": z.string(),
  "multipleChoice.submitLabel": z.string(),
});

// O para agregar más claves personalizadas:
const customI18nSchema = z.object({
  'multipleChoice.defaultCorrect': z.string(),
  'multipleChoice.defaultIncorrect': z.string(),
  'multipleChoice.submitLabel': z.string(),
  'checklist.or': z.string(),
  'progress.todo': z.string(),
  // ... más claves personalizadas
});
```

### Validación con Zod

- `z.string()` - Valida que el valor sea un string
- `.optional()` - Permite que el campo sea opcional
- Cada clave del objeto corresponde a una clave de traducción

## Troubleshooting

### Error: URLs `undefined`

**Síntomas:**
- Navegación a documentación genera `localhost/undefined/...`
- Links rotos en la sidebar de Starlight

**Causa:**
- Configuración incorrecta de `defaultLocale` en Starlight
- Base del URL mal configurada
- Falta de configuración de locales

**Solución:**
```typescript
starlight({
  defaultLocale: 'root',
  base: '/',
  locales: {
    root: { label: 'Documentación', lang: 'es' }
  }
})
```

### Error: Componentes muestran claves literales

**Síntomas:**
- `<MultipleChoice>` muestra `multipleChoice.defaultCorrect` en lugar de "¡Correcto!"
- `Astro.locals.t()` no está definido

**Causas posibles:**
1. Colección `i18n` no configurada en `src/content/config.ts`
2. Archivo de traducción en formato YAML en lugar de JSON
3. Schema no extendido para incluir claves personalizadas
4. Archivo de traducción en ubicación incorrecta

**Solución:**
1. Verificar que `i18nLoader()` esté configurado en collections
2. Asegurar que archivos sean JSON (no YAML) en `src/content/i18n/`
3. Extender schema con claves personalizadas
4. Verificar ubicación correcta de archivos de traducción

### Error: Build falla por validación de schema

**Síntomas:**
- Error durante build sobre schema i18n inválido
- Errores de TypeScript sobre tipos de traducción

**Causa:**
- Schema extendido no coincide con contenido de archivos de traducción
- Claves faltantes o tipado incorrecto en schema

**Solución:**
1. Revisar que todas las claves en schema existan en archivos de traducción
2. Usar tipos Zod apropiados (`.string()`, `.optional()`, etc.)
3. Ejecutar `pnpm typecheck` para verificar tipado

## Mejores Prácticas

### Organización de Traducciones

1. **Agrupar por contexto**: Agrupa claves relacionadas con prefijos
   ```json
   {
     "multipleChoice.defaultCorrect": "...",
     "multipleChoice.defaultIncorrect": "...",
     "multipleChoice.submitLabel": "..."
   }
   ```

2. **Usar nombres descriptivos**: Las claves deben ser claras sobre su propósito
   ```json
   "search.placeholder"  // Bien
   "placeholder"          // Confuso, ¿qué placeholder?
   ```

3. **Mantener consistencia**: Usa el mismo formato para claves relacionadas
   ```json
   "button.submit.label": "...",
   "button.cancel.label": "...",
   "button.save.label": "..."
   ```

### Soporte Múltiple Idiomas

Para agregar soporte para múltiples idiomas:

1. **Crear archivos adicionales:**
   ```
   src/content/i18n/
   ├── en.json      # Inglés
   ├── es.json      # Español
   └── fr.json      # Francés
   ```

2. **Configurar locales en Starlight:**
   ```typescript
   starlight({
     locales: {
       root: { label: 'Documentación', lang: 'es' },
       en: { label: 'Documentation', lang: 'en' },
       fr: { label: 'Documentation', lang: 'fr' },
     },
   })
   ```

3. **Crear archivos de traducción para cada idioma** con las mismas claves

## Referencias

- [Starlight i18n Documentation](https://starlight.astro.build/guides/i18n/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Zod Schema Validation](https://zod.dev/)
- [Astro i18n Guide](https://docs.astro.build/en/guides/i18n/)