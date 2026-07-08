# 🛠️ Configuración de Entorno

## Variables de Entorno

### Astro Core Variables

```env
# Configuración del sitio
VITE_SITE_NAME=Física General I
VITE_SITE_URL=https://fg1-astro.vercel.app
VITE_SITE_DESCRIPTION=Plataforma educativa para Física General I

# Configuración de Astro
VITE_SITE_LOCALE=es
VITE_SITE_TIMEZONE=America/El_Salvador
```

### Keycloak Configuration

```env
# Keycloak Server
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=fisica-general-i
VITE_KEYCLOAK_CLIENT_ID=shell-app

# Para producción
# VITE_KEYCLOAK_URL=https://auth.tu-dominio.com
```

### Firebase Configuration

```env
# Firebase Project
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id

# FCM Push Notifications
VITE_FIREBASE_VAPID_KEY=tu_vapid_key
```

### Analytics & Monitoring

```env
# Vercel Analytics
VITE_ENABLE_ANALYTICS=true

# Error Tracking (si se implementa Sentry)
VITE_SENTRY_DSN=your_sentry_dsn
VITE_ENABLE_SENTRY=false
```

### Application Features

```env
# Features Flags
VITE_ENABLE_AUTH=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_OFFLINE_MODE=true

# Content Settings
VITE_READ_ONLY=false
VITE_STUDENT_BUILD=false
```

---

## Archivos de Configuración

### `.env.example`

```env
# ==========================================
# FG1 Astro - Environment Configuration
# ==========================================
# Copia este archivo a .env.local y completa los valores

# --- Site Configuration ---
VITE_SITE_NAME=Física General I
VITE_SITE_URL=http://localhost:4321
VITE_SITE_DESCRIPTION=Plataforma educativa para Física General I
VITE_SITE_LOCALE=es
VITE_SITE_TIMEZONE=America/El_Salvador

# --- Keycloak Authentication ---
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=fisica-general-i
VITE_KEYCLOAK_CLIENT_ID=shell-app

# --- Firebase Services ---
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here

# --- Analytics ---
VITE_ENABLE_ANALYTICS=true

# --- Features ---
VITE_ENABLE_AUTH=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_OFFLINE_MODE=true
VITE_READ_ONLY=false
VITE_STUDENT_BUILD=false
```

---

## Setup Inicial

### 1. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tu configuración
nano .env.local  # o tu editor preferido
```

### 2. Obtener Credenciales

#### Firebase
1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto o usar existente
3. Ir a Project Settings → General
4. Copiar `firebaseConfig` object
5. Ir a Cloud Messaging → Claves web
6. Copiar VAPID Key

#### Keycloak
1. Asegurar que Keycloak está corriendo: `docker-compose up -d keycloak`
2. Ir a [Keycloak Admin Console](http://localhost:8080)
3. Configurar realm y client según `MIGRATION_PLAN.md`

### 3. Validar Configuración

```bash
# Verificar que las variables están definidas
pnpm run check-env  # (crear script)

# Iniciar development server
pnpm dev
```

---

## Configuración por Entorno

### Development (Local)

```env
# .env.development
VITE_SITE_URL=http://localhost:4321
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_SENTRY=false
```

### Staging (Preview)

```env
# .env.staging
VITE_SITE_URL=https://fg1-astro-staging.vercel.app
VITE_KEYCLOAK_URL=https://auth-staging.tu-dominio.com
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SENTRY=true
```

### Production

```env
# .env.production
VITE_SITE_URL=https://fg1-astro.vercel.app
VITE_KEYCLOAK_URL=https://auth.tu-dominio.com
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SENTRY=true
VITE_READ_ONLY=false
```

---

## Variables Secretas (Vercel)

Estas variables no deberían estar en `.env.local` sino configuradas en Vercel:

```
FIREBASE_ADMIN_KEY=your_firebase_admin_private_key
KEYCLOAK_ADMIN_PASSWORD=your_keycloak_admin_password
DATABASE_URL=if_using_database
```

---

## Verificación de Configuración

### Script de Validación

Crear `scripts/check-env.js`:

```javascript
const requiredVars = [
  'VITE_SITE_NAME',
  'VITE_SITE_URL',
  'VITE_KEYCLOAK_URL',
  'VITE_KEYCLOAK_REALM',
  'VITE_KEYCLOAK_CLIENT_ID',
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_VAPID_KEY'
];

let missing = false;

console.log('🔍 Verificando variables de entorno...');

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value === 'your_value_here') {
    console.error(`❌ ${varName} no está configurado`);
    missing = true;
  } else {
    console.log(`✅ ${varName} está configurado`);
  }
});

if (missing) {
  console.error('\n❌ Faltan variables de entorno requeridas');
  process.exit(1);
} else {
  console.log('\n✅ Todas las variables requeridas están configuradas');
  process.exit(0);
}
```

### Ejecutar validación

```bash
# Cargar variables de entorno y validar
node scripts/check-env.js
```

---

## Best Practices

### 1. Nunca Commit Variables Sensitive

```gitignore
# .gitignore
.env
.env.local
.env.*.local
*.key
```

### 2. Usar Prefix VITE_

Todas las variables de client-side deben tener prefix `VITE_` para ser accesibles en el browser.

### 3. Validación en Runtime

```typescript
// src/lib/config.ts
const config = {
  siteUrl: import.meta.env.VITE_SITE_URL,
  keycloakUrl: import.meta.env.VITE_KEYCLOAK_URL,
  // ...

  validate() {
    if (!this.siteUrl) throw new Error('VITE_SITE_URL not defined');
    if (!this.keycloakUrl) throw new Error('VITE_KEYCLOAK_URL not defined');
    // ...
  }
};

config.validate();
```

### 4. Documentación Actualizada

Mantener este archivo sincronizado con nuevas variables que se agreguen.

---

## Troubleshooting

### Problema: Variables no están disponibles

```bash
# Verificar que .env.local existe
ls -la .env.local

# Verificar que las variables tienen el prefijo VITE_
grep VITE_ .env.local

# Reiniciar development server
pnpm dev
```

### Problema: Variables de server-side no accesibles

Las variables sin prefix `VITE_` solo están disponibles en el server-side de Astro:

```typescript
// ✅ Accesible en server-side
const adminKey = import.meta.env.FIREBASE_ADMIN_KEY;

// ❌ No accesible en client-side
// const clientSideKey = import.meta.env.FIREBASE_ADMIN_KEY;
```

### Problema: Firebase error de API key

```bash
# Verificar que la API key es correcta
echo $VITE_FIREBASE_API_KEY

# Validar en Firebase Console
# Project Settings → API Keys
```

---

## Recursos Adicionales

- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Configuration](https://firebase.google.com/docs/web/setup)
- [Keycloak Client Registration](https://www.keycloak.org/docs/latest/server_admin/index.html#_client_registration)