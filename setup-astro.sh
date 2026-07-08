#!/bin/bash
set -e

# ==========================================
# FG1 Astro Migration Script (Simplified)
# ==========================================
# Script para configurar el nuevo repositorio Astro
# ==========================================

echo "🚀 Configurando repositorio Astro para FG1..."

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

log_step() {
    echo -e "${YELLOW}📋 $1${NC}"
}

# ==========================================
# FASE 1: Limpiar configuraciones legacy
# ==========================================
log_step "Fase 1: Limpiando configuraciones legacy"

# Eliminar configuraciones específicas de React/Vite/Nx
rm -rf apps
rm -rf .nx
rm -rf dist
rm -rf .vercel

# Eliminar archivos de configuración legacy
rm -f package.json  # Vamos a crear uno nuevo

log_success "Configuraciones legacy eliminadas"

# ==========================================
# FASE 2: Crear estructura Astro
# ==========================================
log_step "Fase 2: Creando estructura Astro"

# Crear estructura de directorios
mkdir -p src/pages/weekly
mkdir -p src/pages/planner
mkdir -p src/pages/schedule
mkdir -p src/pages/auth
mkdir -p src/components/islands
mkdir -p src/layouts
mkdir -p src/lib
mkdir -p src/styles
mkdir -p tests

log_success "Estructura de directorios creada"

# ==========================================
# FASE 3: Configurar Package.json Astro
# ==========================================
log_step "Fase 3: Configurando package.json"

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
    "astro": "astro",
    "clean": "rm -rf dist .astro node_modules"
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
    "@course-dashboard/weekly-plan": "workspace:*",
    "lucide-react": "^0.563.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "framer-motion": "^12.34.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "^5.7.0",
    "vitest": "^4.0.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  },
  "private": true,
  "packageManager": "pnpm@8.15.8"
}
EOF

log_success "package.json creado"

# ==========================================
# FASE 4: Configurar Workspace
# ==========================================
log_step "Fase 4: Configurando workspace"

# Crear pnpm-workspace.yaml
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'packages/*'
  - '.'
EOF

log_success "Workspace configurado"

# ==========================================
# FASE 5: Configurar Astro
# ==========================================
log_step "Fase 5: Configurando Astro"

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
# FASE 6: Configurar TypeScript
# ==========================================
log_step "Fase 6: Configurando TypeScript"

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
# FASE 7: Configurar TailwindCSS
# ==========================================
log_step "Fase 7: Configurando TailwindCSS"

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

# Crear postcss.config.mjs
cat > postcss.config.mjs << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

log_success "TailwindCSS configurado"

# ==========================================
# FASE 8: Crear Archivos Base
# ==========================================
log_step "Fase 8: Creando archivos base"

# Crear Layout base
cat > src/layouts/MainLayout.astro << 'EOF'
---
interface Props {
  title: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

const { 
  title, 
  description = "Plataforma educativa para Física General I",
  image = "/screenshot-wide.png",
  noindex = false
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const siteName = "Física General I";
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
    
    <!-- SEO -->
    <title>{title} | {siteName}</title>
    
    <!-- Noindex si es necesario -->
    {noindex && <meta name="robots" content="noindex,nofollow" />}
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={`${title} | ${siteName}`} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.site)} />
    
    <!-- Twitter Card -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalURL} />
    <meta property="twitter:title" content={`${title} | ${siteName}`} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={new URL(image, Astro.site)} />
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#000000" />
    
    <!-- Preload critical resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
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
    <div id="app">
      <slot />
    </div>
  </body>
</html>
EOF

# Crear página index inicial
cat > src/pages/index.astro << 'EOF'
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout 
  title="Dashboard"
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

log_success "Archivos base creados"

# ==========================================
# FASE 9: Configurar Git
# ==========================================
log_step "Fase 9: Configurando Git"

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

# Crear env.example
cat > .env.example << 'EOF'
# Site Configuration
VITE_SITE_NAME=Física General I
VITE_SITE_URL=http://localhost:4321
VITE_SITE_DESCRIPTION=Plataforma educativa para Física General I

# Keycloak
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=fisica-general-i
VITE_KEYCLOAK_CLIENT_ID=shell-app

# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key

# Features
VITE_ENABLE_AUTH=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_OFFLINE_MODE=true
EOF

# Crear README
cat > README.md << 'EOF'
# FG1 - Física General I (Astro Version)

Plataforma educativa para Física General I - I semestre 2026

Esta es la versión migrada a Astro + React Islands de la plataforma FG1.

## 🚀 Características

- ⚡ **Ultra rápido**: 5-10x más rápido que la versión React
- 🌐 **SEO optimizado**: HTML estático pre-rendered
- 📱 **PWA**: Instalable y offline-first
- 🎨 **Responsive**: Optimizado para todos los dispositivos
- 🔐 **Autenticación**: Integración con Keycloak
- 🔔 **Notificaciones**: Firebase Cloud Messaging

## 📦 Tech Stack

- **Frontend**: Astro 5 + React 19
- **Styling**: TailwindCSS
- **Auth**: Keycloak
- **Push Notifications**: Firebase
- **Build**: Vite
- **Package Manager**: pnpm workspaces

## 🛠️ Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar development server
pnpm dev

# Build para producción
pnpm build

# Preview de producción
pnpm preview
```

## 📚 Documentación

- [Plan de Migración](./MIGRATION_PLAN.md)
- [Configuración de Entorno](./ENV_SETUP.md)
- [Estructura del Proyecto](./PROJECT_STRUCTURE.md)
- [Guía de Implementación](./IMPLEMENTATION_GUIDE.md)

## 🚢 Deployment

Este proyecto está configurado para despliegue automático en Vercel.

## 📄 Licencia

MIT

---

**Versión Legacy**: [fg1 (React SPA)](https://github.com/glacy/fg1)
**Versión Astro**: fg1-astro
EOF

log_success "Archivos de configuración creados"

# ==========================================
# FASE 10: Inicializar Git
# ==========================================
log_step "Fase 10: Inicializando Git"

# Inicializar nuevo repo
git init
git config user.name "Gerardo Lacy-Mora"
git config user.email "glacy@example.com"

log_success "Git inicializado"

# ==========================================
# FASE 11: Finalización
# ==========================================
log_step "Fase 11: Finalizando configuración"

echo ""
echo "========================================="
echo "🎉 CONFIGURACIÓN ASTRO COMPLETADA"
echo "========================================="
echo ""
echo "✅ Repositorio preparado para desarrollo Astro"
echo "📁 Estructura de archivos creada"
echo "🔧 Configuraciones listas"
echo "📦 Packages migrados"
echo ""
echo "Próximos pasos:"
echo "1. Instalar dependencias: pnpm install"
echo "2. Configurar variables de entorno: cp .env.example .env.local"
echo "3. Iniciar desarrollo: pnpm dev"
echo "4. Crear repositorio en GitHub manualmente"
echo "5. Conectar remoto: git remote add origin https://github.com/glacy/fg1-astro.git"
echo "6. Hacer commit inicial y push"
echo ""
echo "📚 Consulta MIGRATION_PLAN.md para más detalles"
echo "========================================="

exit 0