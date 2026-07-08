# 🔧 Plan de Implementación Técnico

## 📋 Overview

Este documento proporciona instrucciones paso a paso para implementar la migración de React SPA a Astro + React Islands.

---

## 🚀 Fase 1: Preparación y Setup (Día 1-2)

### 1.1 Crear Repositorio Nuevo

```bash
# Opción 1: Usando GitHub CLI (recomendado)
gh repo create fg1-astro --private --clone

# Opción 2: Manual
# 1. Crear repositorio en GitHub: https://github.com/new
# 2. Clonar repositorio actual
git clone https://github.com/glacy/fg1.git fg1-astro
cd fg1-astro

# 3. Limpiar historial antiguo
rm -rf .git

# 4. Inicializar nuevo repositorio
git init
git add .
git commit -m "🚀 Initial commit: Astro migration setup"

# 5. Conectar a GitHub remoto
git remote add origin https://github.com/glacy/fg1-astro.git
git branch -M main
git push -u origin main
```

### 1.2 Ejecutar Script de Migración

```bash
# Asegurarse de estar en el directorio correcto
cd /path/to/fg1-astro

# Dar permisos de ejecución
chmod +x scripts/migrate-to-astro.sh

# Ejecutar script de migración
./scripts/migrate-to-astro.sh

# Verificar resultado
ls -la  # Deberías ver nueva estructura Astro
```

### 1.3 Instalar Dependencias

```bash
# Instalar pnpm si no está instalado
npm install -g pnpm@8.15.8

# Instalar dependencias del proyecto
pnpm install

# Instalar dependencias de packages
cd packages && pnpm install
cd ..
```

### 1.4 Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tu configuración
nano .env.local

# O usar tu editor favorito
code .env.local
```

**Configurar las siguientes variables:**
```env
# Site Configuration
VITE_SITE_NAME=Física General I
VITE_SITE_URL=http://localhost:4321
VITE_SITE_DESCRIPTION=Plataforma educativa para Física General I

# Keycloak (usar Docker local para desarrollo)
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=fisica-general-i
VITE_KEYCLOAK_CLIENT_ID=shell-app

# Firebase (configurar después en Fase 4)
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_PROJECT_ID=tu_project_id
# ... otras variables Firebase

# Features
VITE_ENABLE_AUTH=true
VITE_ENABLE_NOTIFICATIONS=true
```

### 1.5 Iniciar Keycloak (Docker)

```bash
# Crear docker-compose.yml para Keycloak (si no existe)
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin123
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://keycloak-db:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: keycloak_db_password
    command: start-dev
    ports:
      - "8080:8080"
    depends_on:
      - keycloak-db
    
  keycloak-db:
    image: postgres:16
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: keycloak_db_password
    volumes:
      - keycloak_data:/var/lib/postgresql/data
    
volumes:
  keycloak_data:
EOF

# Iniciar Keycloak
docker-compose up -d keycloak

# Verificar que está corriendo
curl http://localhost:8080/health

# Acceder a Keycloak Admin Console
# URL: http://localhost:8080/admin
# Username: admin
# Password: admin123
```

**Configurar Keycloak (Admin Console):**

1. **Crear Realm:**
   - Realm name: `fisica-general-i`
   - Enabled: `true`

2. **Crear Client:**
   - Client ID: `shell-app`
   - Client Protocol: `openid-connect`
   - Root URL: `http://localhost:4321`
   - Valid Redirect URIs: `http://localhost:4321/*`
   - Web Origins: `http://localhost:4321`

3. **Configurar Roles:**
   - Create roles: `estudiante`, `docente`, `admin`

### 1.6 Verificar Setup

```bash
# Iniciar Astro development server
pnpm dev

# Navegar a http://localhost:4321
# Deberías ver la página inicial placeholder

# Verificar en consola que no hay errores
# Check browser console for errors

# Detener server con Ctrl+C
```

---

## 🏗️ Fase 2: Shell y Layout (Día 3-4)

### 2.1 Crear Layout Base Mejorado

```bash
# Actualizar src/layouts/MainLayout.astro
# Incluir:
# - Metadata SEO dinámica
# - Analytics integration
# - PWA manifest
# - Dark mode support
```

**Contenido de `src/layouts/MainLayout.astro`:**
```astro
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
  image = "/og-image.jpg",
  noindex = false
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const siteName = import.meta.env.VITE_SITE_NAME;
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
  </head>
  <body class="min-h-screen bg-background text-foreground">
    <div id="app">
      <slot />
    </div>
  </body>
</html>
```

### 2.2 Crear Shell Component

```bash
# Crear src/components/Shell.astro
# Este componente wrapper maneja:
# - Navegación entre tabs
# - Layout responsivo
# - Integración con componentes estáticos
```

**Contenido de `src/components/Shell.astro`:**
```astro
---
import Sidebar from './Sidebar.astro';
import Footer from './Footer.astro';
import PWAInstall from './PWAInstall.astro';
import Analytics from './Analytics.astro';

interface Props {
  activeTab: 'weekly' | 'planner' | 'schedule';
  children: any;
}

const { activeTab, children } = Astro.props;
---

<div class="flex h-[100dvh] bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-200 overflow-hidden font-sans transition-colors duration-300">
  <Sidebar activeTab={activeTab} />
  
  <main class="flex flex-col flex-1 relative bg-slate-100 dark:bg-slate-50/5 min-w-0 h-full">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
    
    <div class="flex-1 overflow-auto scrollbar-hide relative z-0 flex flex-col">
      {children}
      <Footer />
    </div>
  </main>
</div>

<PWAInstall />
<Analytics />

<style is:global>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
```

### 2.3 Crear Sidebar Component

```bash
# Crear src/components/Sidebar.astro
# Sidebar estático con navegación
```

**Contenido de `src/components/Sidebar.astro`:**
```astro
---
interface Props {
  activeTab: 'weekly' | 'planner' | 'schedule';
}

const { activeTab } = Astro.props;

const tabs = [
  { id: 'weekly', label: 'Plan Semanal', href: '/weekly' },
  { id: 'planner', label: 'Planner', href: '/planner' },
  { id: 'schedule', label: 'Horario', href: '/schedule' },
];
---

<aside class="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
  <div class="p-4 border-b border-gray-200 dark:border-gray-800">
    <h2 class="text-lg font-semibold">Física General I</h2>
    <p class="text-sm text-gray-600 dark:text-gray-400">I semestre 2026</p>
  </div>
  
  <nav class="flex-1 p-4 space-y-2">
    {tabs.map((tab) => (
      <a
        href={tab.href}
        class={`px-4 py-2 rounded-lg transition-colors ${
          activeTab === tab.id
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        {tab.label}
      </a>
    ))}
  </nav>
  
  <div class="p-4 border-t border-gray-200 dark:border-gray-800">
    <p class="text-xs text-gray-500 dark:text-gray-400">
      v2.0.0 - Powered by Astro
    </p>
  </div>
</aside>
```

### 2.4 Actualizar Página Principal

```bash
# Actualizar src/pages/index.astro
# Convertir a shell con contenido inicial
```

**Contenido actualizado de `src/pages/index.astro`:**
```astro
---
import Shell from '../components/Shell.astro';
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout 
  title="Dashboard - Física General I"
  description="Plataforma educativa para Física General I - I semestre 2026"
>
  <Shell activeTab="weekly">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-4">
          Bienvenido a Física General I
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          I semestre 2026
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a 
          href="/weekly"
          class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 class="text-xl font-semibold mb-2">Plan Semanal</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Consulta el plan de estudios semana
          </p>
        </a>
        
        <a 
          href="/planner"
          class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 class="text-xl font-semibold mb-2">Planner</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Gestiona fechas de exámenes y tareas
          </p>
        </a>
        
        <a 
          href="/schedule"
          class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h3 class="text-xl font-semibold mb-2">Horario</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Consulta horarios de asistencia
          </p>
        </a>
      </div>
    </div>
  </Shell>
</MainLayout>
```

### 2.5 Actualizar Otras Páginas

```bash
# Actualizar src/pages/weekly/index.astro
# Actualizar src/pages/planner/index.astro  
# Actualizar src/pages/schedule/index.astro
```

**Ejemplo para `src/pages/weekly/index.astro`:**
```astro
---
import Shell from '../../components/Shell.astro';
import MainLayout from '../../layouts/MainLayout.astro';
---

<MainLayout 
  title="Plan Semanal - Física General I"
  description="Plan de estudios semanal para Física General I"
>
  <Shell activeTab="weekly">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">Plan Semanal</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Consulta el contenido y actividades de cada semana
      </p>
      
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
        <p class="text-yellow-800 dark:text-yellow-200">
          ⚠️ Esta sección está en desarrollo. Próximamente se integrará el componente interactivo.
        </p>
      </div>
    </div>
  </Shell>
</MainLayout>
```

### 2.6 Testing de Shell y Layout

```bash
# Iniciar development server
pnpm dev

# Test en browser
# 1. http://localhost:4321 - Dashboard
# 2. http://localhost:4321/weekly - Plan Semanal
# 3. http://localhost:4321/planner - Planner
# 4. http://localhost:4321/schedule - Horario

# Verificar:
# - Navegación funciona correctamente
# - Layout responsivo en mobile/desktop
# - Dark mode toggle (si implementado)
# - No hay errores en consola

# Test build
pnpm build

# Test preview
pnpm preview
```

---

## 🏝️ Fase 3: React Islands (Día 5-7)

### 3.1 Configurar React Integration

```bash
# React ya debería estar instalado en package.json
# Verificar integración en astro.config.mjs
```

**Verificar `astro.config.mjs`:**
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import pwa from '@astrojs/pwa';

export default defineConfig({
  integrations: [
    react(), // ✅ React integration
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
```

### 3.2 Crear InteractivePlanner Island

```bash
# Crear src/components/islands/InteractivePlanner.tsx
```

**Contenido de `src/components/islands/InteractivePlanner.tsx`:**
```tsx
import { useState, useEffect } from 'react';
import { usePlanner } from '@course-dashboard/planner';

interface Exam {
  id: string;
  title: string;
  date: string;
  type: string;
  room: string;
}

export default function InteractivePlanner() {
  const { exams, loading, error } = usePlanner();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check dark mode preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-800 dark:text-red-200">
          Error cargando exámenes: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Exams List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map((exam: Exam) => (
          <div
            key={exam.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedExam?.id === exam.id
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
            }`}
            onClick={() => setSelectedExam(exam)}
          >
            <h3 className="font-semibold mb-2">{exam.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              📅 {new Date(exam.date).toLocaleDateString('es-SV')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📍 Sala {exam.room}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Exam Details */}
      {selectedExam && (
        <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{selectedExam.title}</h2>
          <div className="space-y-2">
            <p><strong>Fecha:</strong> {new Date(selectedExam.date).toLocaleDateString('es-SV')}</p>
            <p><strong>Tipo:</strong> {selectedExam.type}</p>
            <p><strong>Sala:</strong> {selectedExam.room}</p>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 3.3 Integrar Island en Página Planner

```bash
# Actualizar src/pages/planner/index.astro
```

**Contenido actualizado de `src/pages/planner/index.astro`:**
```astro
---
import Shell from '../../components/Shell.astro';
import MainLayout from '../../layouts/MainLayout.astro';
import InteractivePlanner from '../../components/islands/InteractivePlanner';
---

<MainLayout 
  title="Planner - Física General I"
  description="Gestión de exámenes y tareas para Física General I"
>
  <Shell activeTab="planner">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">Planner de Exámenes</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Gestiona las fechas de tus exámenes y tareas
      </p>
      
      <InteractivePlanner client:load />
    </div>
  </Shell>
</MainLayout>
```

### 3.4 Crear InteractiveSchedule Island

```bash
# Crear src/components/islands/InteractiveSchedule.tsx
# Similar proceso a InteractivePlanner
```

### 3.5 Crear WeeklyPlanTabs Island

```bash
# Crear src/components/islands/WeeklyPlanTabs.tsx
# Similar proceso a otros islands
```

### 3.6 Testing de React Islands

```bash
# Iniciar development server
pnpm dev

# Test islands en browser
# 1. Navegar a /planner
# 2. Verificar que InteractivePlanner se renderiza
# 3. Verificar interactividad (selección de exámenes)
# 4. Test en mobile (responsive)

# Verificar console:
# - No hay errores de hydration
# - React DevTools muestra los islands correctamente
# - Performance es aceptable

# Test build
pnpm build

# Verificar build output
# Debería ver archivos JS solo para islands
ls dist/_astro/  # Solo archivos necesarios
```

---

## 🔐 Fase 4: Auth y Advanced Features (Día 8-9)

### 4.1 Instalar Dependencias Keycloak

```bash
pnpm add keycloak-js react-keycloak
pnpm add -D @types/keycloak-js
```

### 4.2 Configurar Keycloak en Astro

```bash
# Crear src/lib/keycloak.ts
```

**Contenido de `src/lib/keycloak.ts`:**
```typescript
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

export const keycloak = new Keycloak(keycloakConfig);

export const keycloakInitOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false,
  pkceMethod: 'S256',
};
```

### 4.3 Crear AuthProvider Island

```bash
# Crear src/components/islands/AuthProvider.tsx
```

**Contenido de `src/components/islands/AuthProvider.tsx`:**
```tsx
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloak, keycloakInitOptions } from '../../lib/keycloak';
import { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    // Initialize keycloak on mount
    console.log('AuthProvider mounted');
  }, []);

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakInitOptions}
      LoadingComponent={<div>Loading...</div>}
      onEvent={(event) => console.log('Keycloak event:', event)}
      onTokens={(tokens) => console.log('Tokens:', tokens)}
    >
      {children}
    </ReactKeycloakProvider>
  );
}
```

### 4.4 Integrar AuthProvider en Layout

```bash
# Actualizar src/layouts/MainLayout.astro
```

**Modificar `MainLayout.astro`:**
```astro
---
// ... imports existentes
import AuthProvider from '../components/islands/AuthProvider';
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <!-- ... head content -->
  </head>
  <body class="min-h-screen bg-background text-foreground">
    <AuthProvider client:load>
      <slot />
    </AuthProvider>
  </body>
</html>
```

### 4.5 Configurar Firebase

```bash
# Instalar dependencias Firebase
pnpm add firebase

# Crear src/lib/firebase.ts
```

**Contenido de `src/lib/firebase.ts`:**
```typescript
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { app, messaging };

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      return token;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
  return null;
}

export function setupMessageHandler() {
  onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    // Handle incoming messages
  });
}
```

### 4.6 Testing de Auth y Firebase

```bash
# Test Keycloak auth
pnpm dev
# Navegar a cualquier página
# Deberías ser redirigido a login de Keycloak

# Test Firebase (si configurado)
# Verificar console logs de Firebase
```

---

## 🚀 Fase 5: Deploy y Transición (Día 12-15)

### 5.1 Configurar Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login en Vercel
vercel login

# Deploy inicial
vercel

# Configurar producción
vercel --prod
```

**Crear `vercel.json`:**
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "astro",
  "regions": ["iad1"],
  "env": {
    "VITE_SITE_URL": "@site-url",
    "VITE_KEYCLOAK_URL": "@keycloak-url"
  }
}
```

### 5.2 Configure Environment Variables en Vercel

```bash
# Via Vercel CLI
vercel env add VITE_SITE_URL production
vercel env add VITE_KEYCLOAK_URL production
vercel env add VITE_FIREBASE_API_KEY production
# ... agregar todas las variables

# O via Vercel Dashboard
# https://vercel.com/your-project/settings/environment-variables
```

### 5.3 Testing de Producción

```bash
# Deploy a producción
vercel --prod

# Test producción
# Navegar a la URL de producción
# Verificar:
# - Build exitoso
# - No hay 404 errors
# - Auth funciona
# - React islands se renderizan
# - Performance es aceptable
```

### 5.4 Finalización y Cleanup

```bash
# Archivar repositorio antiguo
# Via GitHub: Settings → Danger Zone → Archive

# Actualizar documentación
# Actualizar README.md en nuevo repo

# Configurar redirects (si es necesario)
# Via Vercel o DNS provider

# Notificar stakeholders (si aplica)
# Enviar email con nueva URL y cambios
```

---

## ✅ Checklist Final

### Pre-Deploy
- [ ] Todas las fases completadas exitosamente
- [ ] Testing local completado
- [ ] Performance metrics cumplidos
- [ ] SEO configurado correctamente
- [ ] Auth y Firebase funcionales

### Post-Deploy
- [ ] Producción desplegada exitosamente
- [ ] No hay errores en console
- [ ] Lighthouse score ≥ 95
- [ ] Auth flows funcionales
- [ ] PWA features activas
- [ ] Analytics tracking activo

### Documentation
- [ ] README.md actualizado
- [ ] Migration guide completado
- [ ] Environment variables documentadas
- [ ] Troubleshooting guide creado

---

## 🆘 Troubleshooting

### Problemas Comunes

#### React Island no se renderiza
```bash
# Verificar que el island tiene directiva client:*
# Ejemplo: <MyComponent client:load />
```

#### Auth redirect loop
```bash
# Verificar Keycloak configuration
# Check Valid Redirect URIs en Keycloak Admin Console
# Verificar que VITE_KEYCLOAK_URL es correcto
```

#### Build errors
```bash
# Limpiar cache y rebuild
pnpm clean  # crear script
pnpm build
```

#### Performance issues
```bash
# Verificar Lighthouse
# Usar Chrome DevTools para profiling
# Optimizar imágenes con Astro Image
```

---

## 📚 Recursos Adicionales

- [Astro Docs](https://docs.astro.build)
- [React Islands Guide](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)