#!/bin/bash
set -e

# ==========================================
# FG1 Migration Script: React SPA → Astro
# ==========================================
# Este script automatiza la migración inicial
# desde el repositorio legacy al nuevo repositorio Astro
# ==========================================

echo "🚀 Iniciando migración de FG1 a Astro..."

# Variables de configuración
OLD_REPO_NAME="fg1"
NEW_REPO_NAME="fg1-astro"
BACKUP_DIR="/tmp/fg1-migration-backup"

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Funciones de utilidad
log_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

log_error() {
    echo -e "${RED}✗ $1${NC}"
}

log_step() {
    echo -e "${YELLOW}📋 $1${NC}"
}

# ==========================================
# FASE 1: Preparación y Backup
# ==========================================
log_step "Fase 1: Preparación y Backup"

# Crear directorio de backup
if [ -d "$BACKUP_DIR" ]; then
    log_warning "Directorio de backup existe, limpiando..."
    rm -rf "$BACKUP_DIR"
fi

mkdir -p "$BACKUP_DIR"
log_success "Directorio de backup creado: $BACKUP_DIR"

# Backup del contenido importante
log_step "Creando backup del contenido actual..."
cp -r public "$BACKUP_DIR/" 2>/dev/null || true
cp -r packages "$BACKUP_DIR/" 2>/dev/null || true
cp package.json "$BACKUP_DIR/" 2>/dev/null || true
cp README.md "$BACKUP_DIR/" 2>/dev/null || true

log_success "Backup completado en $BACKUP_DIR"

# ==========================================
# FASE 2: Limpiar Configuraciones Legacy
# ==========================================
log_step "Fase 2: Limpiando configuraciones legacy"

# Eliminar directorios específicos de React/Vite
rm -rf node_modules
rm -rf dist
rm -rf .nx
rm -rf .vercel

# Eliminar archivos de configuración legacy
rm -f package-lock.json
rm -f pnpm-lock.yaml
rm -f vite.config.ts
rm -f nx.json
rm -f .eslintrc.*

log_success "Configuraciones legacy eliminadas"

# ==========================================
# FASE 3: Inicializar Git Nuevo
# ==========================================
log_step "Fase 3: Inicializando nuevo Git"

# Eliminar historial antiguo
if [ -d ".git" ]; then
    log_warning "Eliminando historial de Git antiguo..."
    rm -rf .git
fi

# Inicializar nuevo repo
git init
git config user.name "Gerardo Lacy-Mora"
git config user.email "glacy@example.com"

log_success "Nuevo repositorio Git inicializado"

# ==========================================
# FASE 4: Crear Estructura Astro
# ==========================================
log_step "Fase 4: Creando estructura Astro"

# Crear estructura de directorios
mkdir -p src/pages
mkdir -p src/components/islands
mkdir -p src/layouts
mkdir -p src/lib
mkdir -p src/styles
mkdir -p tests
mkdir -p scripts

log_success "Estructura de directorios creada"

# ==========================================
# FASE 5: Migrar Assets
# ==========================================
log_step "Fase 5: Migrando assets"

# Mover contenido público
if [ -d "$BACKUP_DIR/public" ]; then
    cp -r "$BACKUP_DIR/public" ./
    log_success "Contenido público migrado"
else
    log_warning "Directorio público no encontrado en backup"
fi

# Mover packages
if [ -d "$BACKUP_DIR/packages" ]; then
    cp -r "$BACKUP_DIR/packages" ./
    log_success "Packages migrados"
else
    log_warning "Directorio packages no encontrado en backup"
fi

# Crear directorios de contenido
mkdir -p public/content/examenes
mkdir -p public/content/lecturas
mkdir -p public/content/tareas
mkdir -p public/content/soluciones

log_success "Estructura de contenido creada"

# ==========================================
# FASE 6: Configurar Package.json Astro
# ==========================================
log_step "Fase 6: Configurando package.json"

# Crear package.json inicial
cat > package.json << 'EOF'
{
  "name": "fg1-astro",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/react": "^4.0.0",
    "@astrojs/tailwind": "^6.0.0",
    "@astrojs/pwa": "^0.4.0",
    "astro": "^5.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@course-dashboard/shared": "workspace:*",
    "@course-dashboard/planner": "workspace:*",
    "@course-dashboard/schedule": "workspace:*",
    "@course-dashboard/weekly-plan": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "^5.7.0",
    "vitest": "^4.0.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.4.0"
  },
  "private": true,
  "packageManager": "pnpm@8.15.8"
}
EOF

log_success "package.json creado"

# ==========================================
# FASE 7: Configurar Workspace
# ==========================================
log_step "Fase 7: Configurando workspace"

# Crear pnpm-workspace.yaml
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'packages/*'
  - '.'
EOF

log_success "Workspace configurado"

# ==========================================
# FASE 8: Configurar Astro
# ==========================================
log_step "Fase 8: Configurando Astro"

# Crear astro.config.mjs
cat > astro.config.mjs << 'EOF'
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import pwa from '@astrojs/pwa';

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    pwa({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,pdf}']
      }
    })
  ],
  output: 'static',
  site: 'https://fg1-astro.vercel.app',
  vite: {
    build: {
      outDir: 'dist'
    }
  }
});
EOF

log_success "Configuración Astro creada"

# ==========================================
# FASE 9: Configurar TypeScript
# ==========================================
log_step "Fase 9: Configurando TypeScript"

# Crear tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"]
    }
  }
}
EOF

log_success "TypeScript configurado"

# ==========================================
# FASE 10: Configurar TailwindCSS
# ==========================================
log_step "Fase 10: Configurando TailwindCSS"

# Crear tailwind.config.mjs
cat > tailwind.config.mjs << 'EOF'
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
EOF

log_success "TailwindCSS configurado"

# ==========================================
# FASE 11: Crear Archivos Base
# ==========================================
log_step "Fase 11: Creando archivos base"

# Crear Layout base
cat > src/layouts/MainLayout.astro << 'EOF'
---
interface Props {
  title: string;
  description?: string;
}

const { 
  title, 
  description = "Plataforma educativa para Física General I"
} = Astro.props;

// SEO
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalURL} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json" />
    
    <!-- Tailwind CSS -->
    <style is:global>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 84% 4.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 84% 4.9%;
        --primary: 221.2 83.2% 53.3%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96.1%;
        --secondary-foreground: 222.2 47.4% 11.2%;
        --muted: 210 40% 96.1%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --accent: 210 40% 96.1%;
        --accent-foreground: 222.2 47.4% 11.2%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --ring: 221.2 83.2% 53.3%;
        --radius: 0.5rem;
      }
      
      .dark {
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
        --card: 222.2 84% 4.9%;
        --card-foreground: 210 40% 98%;
        --popover: 222.2 84% 4.9%;
        --popover-foreground: 210 40% 98%;
        --primary: 217.2 91.2% 59.8%;
        --primary-foreground: 222.2 47.4% 11.2%;
        --secondary: 217.2 32.6% 17.5%;
        --secondary-foreground: 210 40% 98%;
        --muted: 217.2 32.6% 17.5%;
        --muted-foreground: 215 20.2% 65.1%;
        --accent: 217.2 32.6% 17.5%;
        --accent-foreground: 210 40% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 210 40% 98%;
        --border: 217.2 32.6% 17.5%;
        --input: 217.2 32.6% 17.5%;
        --ring: 224.3 76.3% 48%;
      }
      
      body {
        font-family: 'Inter', system-ui, sans-serif;
      }
    </style>
  </head>
  <body class="min-h-screen bg-background text-foreground">
    <slot />
  </body>
</html>
EOF

log_success "Layout base creado"

# Crear página index inicial
cat > src/pages/index.astro << 'EOF'
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout 
  title="Física General I - Dashboard"
  description="Plataforma educativa para Física General I - I semestre 2026"
>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Física General I</h1>
      <p class="text-xl text-muted-foreground mb-8">
        I semestre 2026 - Dashboard en construcción
      </p>
      <div class="flex justify-center gap-4">
        <a href="/weekly" class="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
          Plan Semanal
        </a>
        <a href="/planner" class="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition">
          Planner
        </a>
        <a href="/schedule" class="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition">
          Horario
        </a>
      </div>
    </div>
  </div>
</MainLayout>
EOF

log_success "Página index creada"

# Crear páginas placeholder
for page in weekly planner schedule; do
  mkdir -p "src/pages/$page"
  cat > "src/pages/$page/index.astro" << EOF
---
import MainLayout from '../../layouts/MainLayout.astro';
const title = ${page^}
---

<MainLayout 
  title="${title^} - Física General I"
  description="Sección de ${title^}"
>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">${title^}</h1>
    <p class="text-muted-foreground mb-8">
      Esta sección está en desarrollo...
    </p>
    <a href="/" class="text-primary hover:underline">
      ← Volver al dashboard
    </a>
  </div>
</MainLayout>
EOF
done

log_success "Páginas placeholder creadas"

# ==========================================
# FASE 12: Configurar Git
# ==========================================
log_step "Fase 12: Configurando Git"

# Crear .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
.build/
.astro/

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Testing
coverage/

# Misc
.cache/
.temp/
EOF

log_success ".gitignore creado"

# Commit inicial
git add .
git commit -m "🚀 Initial commit: Astro migration from React SPA

- Migrated from React SPA + Vite to Astro + React Islands
- Set up pnpm workspace configuration
- Configured Astro with React, TailwindCSS, and PWA
- Created base layout and initial pages
- Migrated assets and packages structure
- Implemented TypeScript configuration
- Set up development environment

Next steps:
- Implement React islands for interactive components
- Integrate Keycloak authentication
- Add Firebase messaging
- Complete component migration"

log_success "Commit inicial creado"

# ==========================================
# FASE 13: Finalización
# ==========================================
log_step "Fase 13: Finalizando migración"

echo ""
echo "========================================="
echo "🎉 MIGRACIÓN COMPLETADA CON ÉXITO"
echo "========================================="
echo ""
echo "✅ Repositorio preparado para desarrollo Astro"
echo "📁 Estructura de archivos creada"
echo "🔧 Configuraciones listas"
echo "📦 Packages migrados"
echo "📝 Backup guardado en: $BACKUP_DIR"
echo ""
echo "Próximos pasos:"
echo "1. Instalar dependencias: pnpm install"
echo "2. Iniciar desarrollo: pnpm dev"
echo "3. Crear repositorio en GitHub: gh repo create fg1-astro"
echo "4. Push remoto: git remote add origin https://github.com/glacy/fg1-astro.git"
echo "5. Push: git push -u origin main"
echo ""
echo "📚 Consulta MIGRATION_PLAN.md para más detalles"
echo "========================================="

exit 0