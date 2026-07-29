---
title: Datos de Exámenes
description: Estructura de datos del archivo `exams.json` usado por el componente Planner.
---

# Estructura de Datos de Exámenes

Este documento describe la estructura de datos del archivo `exams.json` ubicado en `src/lib/planner/exams.json` y las interfaces TypeScript relacionadas.

## Ubicación del Archivo

```
src/lib/planner/exams.json
```

## Archivos Relacionados

- `src/lib/planner/index.ts` - Contiene las interfaces TypeScript y funciones de utilidad
- `src/content/docs/exams-data-structure.md` - Esta documentación

## Propósito

El archivo `exams.json` contiene información sobre los exámenes del curso, incluyendo fechas, materias, temas, ubicaciones y enlaces relacionados. Este archivo es utilizado por el componente Planner para mostrar y filtrar exámenes, calcular estadísticas y organizar cronológicamente las evaluaciones.

## Estructura General del Archivo

El archivo `exams.json` es un objeto JSON con la siguiente estructura:

```json
{
  "version": 2,
  "exams": [
    // Array de objetos Exam
  ]
}
```

### Propiedades del Nivel Principal

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `version` | number | Versión del formato de datos (actual: 2) |
| `exams` | Exam[] | Array de objetos de examen |

## Interfaz TypeScript: Exam

```typescript
export interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  location?: string;
  topics: string[];
  notes?: string;
  formUrl?: string;
  links?: ExamLink[];
}
```

### Propiedades de la Interfaz Exam

| Propiedad | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `id` | string | Sí | Identificador único del examen (puede ser UUID o string simple) |
| `title` | string | Sí | Título descriptivo del examen |
| `subject` | string | Sí | Materia o asignatura del examen |
| `date` | string | Sí | Fecha del examen en formato `YYYY-MM-DD` |
| `time` | string | Sí | Hora del examen en formato `HH:MM` |
| `location` | string | No | Ubicación del examen (aula/laboratorio) |
| `topics` | string[] | Sí | Lista de temas cubiertos en el examen |
| `notes` | string | No | Notas adicionales o observaciones |
| `formUrl` | string | No | URL del formulario para inscripciones/registros |
| `links` | ExamLink[] | No | Array de enlaces relacionados al examen |

## Interfaz TypeScript: ExamLink

```typescript
export interface ExamLink {
  label: string;
  url: string;
}
```

### Propiedades de la Interfaz ExamLink

| Propiedad | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `label` | string | Sí | Etiqueta descriptiva del enlace |
| `url` | string | Sí | URL del enlace |

## Ejemplo de Estructura Completa

```json
{
  "version": 2,
  "exams": [
    {
      "id": "80f35105-c3b7-43ee-8669-3f5cda551735",
      "title": "Bitácora e informe",
      "subject": "Proyecto",
      "date": "2026-09-18",
      "time": "23:59",
      "topics": [
        "Trabajo en equipo"
      ],
      "notes": "Entrega final del proyecto semestral",
      "links": [
        {
          "label": "Guía de proyecto",
          "url": "https://docs.google.com/document/d/..."
        }
      ]
    },
    {
      "id": "1",
      "title": "Primer Parcial",
      "subject": "Examen",
      "date": "2026-09-28",
      "time": "13:00",
      "topics": [
        "Cantidades físicas",
        "MRU",
        "MRUA",
        "Movimiento parabólico",
        "Leyes de Newton"
      ],
      "notes": "",
      "links": []
    },
    {
      "id": "826a86d2-b926-461c-ada5-7b4b253a8fe9",
      "title": "Primer Parcial Extraordinario",
      "subject": "Examen Extraordinario",
      "date": "2026-10-05",
      "time": "13:00",
      "location": "Aula 301",
      "topics": [
        "Cantidades físicas",
        "MRU",
        "MRUA",
        "Movimiento parabólico",
        "Leyes de Newton"
      ],
      "notes": "Esta prueba la pueden realizar aquellas personas que hayan justificado su ausencia a la prueba ordinaria",
      "formUrl": "https://forms.tec.ac.cr/inscripcion-extraordinario",
      "links": []
    }
  ]
}
```

## Formatos de Fecha y Hora

- **Fecha**: Formato ISO 8601 `YYYY-MM-DD`
  - Ejemplo: `"2026-09-28"`
- **Hora**: Formato 24 horas `HH:MM`
  - Ejemplo: `"13:00"`

## Tipos de Materia (`subject`)

El sistema no tiene valores predefinidos para `subject`, pero los ejemplos más comunes son:

| Materia | Descripción |
|---------|-------------|
| `Examen` | Exámenes ordinarios del curso |
| `Examen Extraordinario` | Exámenes de recuperación |
| `Examen de Reposición` | Exámenes finales de reposición |
| `Proyecto` | Entregas de proyectos o trabajos |

## Funciones de Utilidad en `src/lib/planner/index.ts`

### getExams()

Retorna todos los exámenes ordenados cronológicamente por fecha.

```typescript
export const getExams = (): Exam[] => {
  const exams = (plannerData as { exams: Exam[] }).exams;
  return [...exams].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};
```

### getTodayISO()

Retorna la fecha actual en formato ISO `YYYY-MM-DD`.

```typescript
export const getTodayISO = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
```

### getStats()

Calcula estadísticas de los exámenes, excluyendo exámenes extraordinarios.

```typescript
export const getStats = (exams: Exam[]) => {
  const todayStr = getTodayISO();
  const isNotExtraordinario = (e: Exam) => !e.subject.includes('Extraordinario');

  return {
    total: exams.filter(isNotExtraordinario).length,
    upcoming: exams.filter(e => e.date > todayStr && isNotExtraordinario(e)).length,
    today: exams.filter(e => e.date === todayStr && isNotExtraordinario(e)).length
  };
};
```

### filterExams()

Filtra exámenes según el criterio especificado.

```typescript
export const filterExams = (exams: Exam[], filter: 'all' | 'upcoming' | 'today'): Exam[] => {
  const today = new Date().toLocaleDateString('en-CA');

  return exams.filter(exam => {
    if (filter === 'all') return true;
    if (filter === 'today') return exam.date === today;
    if (filter === 'upcoming') return exam.date > today;
    return true;
  });
};
```

## Integración con el Componente Planner

El componente Planner utiliza estas funciones para:

1. **Mostrar exámenes cronológicos** - `getExams()` ordena por fecha
2. **Calcular estadísticas** - `getStats()` muestra totales y próximos exámenes
3. **Filtrar por estado** - `filterExams()` permite ver todos, de hoy, o próximos
4. **Excluir extraordinarios** - Los exámenes con "Extraordinario" en el subject se excluyen de contadores

## Validación de Datos

Para asegurar la integridad de los datos, el archivo debe cumplir con las siguientes reglas:

1. **ID único**: Cada examen debe tener un `id` único
2. **Fechas válidas**: Las fechas deben estar en formato `YYYY-MM-DD` y ser fechas válidas
3. **Horas válidas**: Las horas deben estar en formato `HH:MM` (00:00 a 23:59)
4. **Topics obligatorio**: La propiedad `topics` debe ser un array (puede estar vacío)
5. **URLs válidas**: Las propiedades `formUrl` y `links[].url` deben ser URLs válidas

## Cómo Agregar un Nuevo Examen

Para agregar un nuevo examen al archivo:

1. Abre `src/lib/planner/exams.json`
2. Agrega un nuevo objeto al array `exams`
3. Asegúrate de que el `id` sea único
4. Usa el formato correcto para fechas y horas
5. Incluye la propiedad `subject` apropiada

Ejemplo de examen con todas las propiedades:

```json
{
  "id": "4",
  "title": "Cuarto Parcial",
  "subject": "Examen",
  "date": "2026-12-10",
  "time": "08:30",
  "location": "Aula 201",
  "topics": [
    "Ondas",
    "Física moderna"
  ],
  "notes": "Examen final de curso",
  "formUrl": "https://forms.tec.ac.cr/inscripcion",
  "links": [
    {
      "label": "Guía de estudio",
      "url": "https://docs.google.com/document/d/..."
    },
    {
      "label": "Horario de consulta",
      "url": "https://calendar.google.com/..."
    }
  ]
}
```

## Cómo Eliminar un Examen

Para eliminar un examen:

1. Abre `src/lib/planner/exams.json`
2. Busca el examen que deseas eliminar por su `id`
3. Elimina el objeto completo del array `exams`

**Importante**: Verifica que el examen eliminado no sea referenciado en otros componentes del proyecto.

## Casos de Uso

### Obtener exámenes ordenados cronológicamente

```typescript
import { getExams } from '../lib/planner';

const exams = getExams();
// Retorna array de exámenes ordenados por fecha ascendente
```

### Filtrar exámenes por fecha

```typescript
import { filterExams, getExams } from '../lib/planner';

const exams = getExams();

// Solo exámenes de hoy
const todayExams = filterExams(exams, 'today');

// Solo exámenes futuros
const upcomingExams = filterExams(exams, 'upcoming');

// Todos los exámenes
const allExams = filterExams(exams, 'all');
```

### Obtener estadísticas del curso

```typescript
import { getExams, getStats } from '../lib/planner';

const exams = getExams();
const stats = getStats(exams);

console.log(`Total de exámenes: ${stats.total}`);
console.log(`Próximos exámenes: ${stats.upcoming}`);
console.log(`Exámenes de hoy: ${stats.today}`);
```

### Filtrar por materia

```typescript
import { getExams } from '../lib/planner';

const exams = getExams();

// Solo exámenes ordinarios
const ordinaryExams = exams.filter(exam => 
  exam.subject === 'Examen'
);

// Solo exámenes extraordinarios
const extraordinaryExams = exams.filter(exam => 
  exam.subject.includes('Extraordinario')
);
```

### Buscar examen por tema

```typescript
import { getExams } from '../lib/planner';

const exams = getExams();

const examsWithNewton = exams.filter(exam =>
  exam.topics.some(topic => 
    topic.toLowerCase().includes('newton')
  )
);
```

## Consideraciones Importantes

1. **No confiar en el orden del array**: El sistema ordena los exámenes por fecha automáticamente mediante `getExams()`
2. **Identificadores únicos**: Usa UUIDs o IDs numéricos simples, pero asegúrate que sean únicos
3. **Nombres de materias consistentes**: Usa nombres consistentes para `subject` para facilitar filtrado
4. **Manejo de extraordinarios**: Los exámenes con "Extraordinario" en el subject se excluyen automáticamente de contadores
5. **URLs relativas o absolutas**: Ambos formatos funcionan para `formUrl` y `links[].url`
6. **Topics opcionales pero recomendados**: El array puede estar vacío, pero es mejor incluir temas para mejor UX

## Esquema JSON para Validación

Para validar la estructura del archivo, puedes usar el siguiente esquema JSON:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["version", "exams"],
  "properties": {
    "version": { "type": "number", "enum": [2] },
    "exams": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "title", "subject", "date", "time", "topics"],
        "properties": {
          "id": { "type": "string", "minLength": 1 },
          "title": { "type": "string", "minLength": 1 },
          "subject": { "type": "string", "minLength": 1 },
          "date": {
            "type": "string",
            "format": "date",
            "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
          },
          "time": {
            "type": "string",
            "pattern": "^\\d{2}:\\d{2}$"
          },
          "location": { "type": "string" },
          "topics": {
            "type": "array",
            "items": { "type": "string" }
          },
          "notes": { "type": "string" },
          "formUrl": {
            "type": "string",
            "format": "uri"
          },
          "links": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["label", "url"],
              "properties": {
                "label": { "type": "string", "minLength": 1 },
                "url": { "type": "string", "format": "uri" }
              }
            }
          }
        }
      }
    }
  }
}
```

## Recursos Adicionales

- [Documentación de Starlight](https://starlight.astro.build/)
- [Documentación de Astro](https://docs.astro.build/)
- [Validación JSON con Ajv](https://ajv.js.org/)
- [Generador de UUIDs Online](https://www.uuidgenerator.net/)