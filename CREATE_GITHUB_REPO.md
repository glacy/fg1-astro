# 🚀 Instrucciones para Crear Repositorio en GitHub

## Opción 1: Via GitHub Website (Recomendado)

1. **Crear repositorio nuevo:**
   - Ir a https://github.com/new
   - Repository name: `fg1-astro`
   - Description: `Física General I - Migración a Astro + React Islands`
   - Visibility: Private o Public (según prefieras)
   - **NO** marcar "Add a README file", "Add .gitignore", "Choose a license"
   - Hacer clic en "Create repository"

2. **Conectar remoto y push:**
   ```bash
   cd /home/glacy/fg1-astro
   git remote add origin https://github.com/glacy/fg1-astro.git
   git branch -M main
   git push -u origin main
   ```

## Opción 2: Via Git (Sin GitHub CLI)

1. **Crear repositorio:**
   ```bash
   # Navegar al directorio del proyecto
   cd /home/glacy/fg1-astro

   # Crear repositorio en GitHub manualmente primero (https://github.com/new)
   # Luego conectar el remoto:
   git remote add origin https://github.com/glacy/fg1-astro.git
   ```

2. **Hacer push:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Opción 3: Usando GitHub CLI (si está disponible)

```bash
# Instalar GitHub CLI si no está instalado
# curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
# sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
# echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
# sudo apt update
# sudo apt install gh

# Login en GitHub
# gh auth login

# Crear repositorio
cd /home/glacy/fg1-astro
gh repo create fg1-astro --private --source=. --remote=origin --push

# O si prefieres público:
# gh repo create fg1-astro --public --source=. --remote=origin --push
```

## Verificación de Repositorio

Después de crear el repositorio:

```bash
# Verificar conexión remota
git remote -v

# Verificar branches
git branch -a

# Verificar commits
git log --oneline -1
```

## Configuración de GitHub

### 1. Configurar README del repositorio

Tu README.md ya está creado con información completa sobre la migración.

### 2. Configurar Branch Protection

Opcional pero recomendado para producción:
- Settings → Branches → Add rule
- Branch name pattern: `main`
- Require pull request reviews before merging
- Require status checks to pass before merging

### 3. Configurar Webhooks

Si necesitas integración con Vercel u otros servicios:
- Settings → Webhooks → Add webhook
- Payload URL: https://api.vercel.com/v1/integrations/deploy/...

## Deploy a Vercel

### Via Vercel CLI (si disponible)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd /home/glacy/fg1-astro
vercel

# Deploy a producción
vercel --prod
```

### Via Vercel Website

1. Ir a https://vercel.com/new
2. Importar repositorio `fg1-astro` desde GitHub
3. Configurar:
   - Framework: Astro
   - Build Command: `pnpm build`
   - Output Directory: `dist`
4. Agregar variables de entorno (ver ENV_SETUP.md)
5. Hacer clic en "Deploy"

## Environment Variables en Vercel

Configurar estas variables en Vercel:

```
VITE_SITE_NAME=Física General I
VITE_SITE_URL=https://fg1-astro.vercel.app
VITE_SITE_DESCRIPTION=Plataforma educativa para Física General I
VITE_KEYCLOAK_URL=https://auth.tu-dominio.com
VITE_KEYCLOAK_REALM=fisica-general-i
VITE_KEYCLOAK_CLIENT_ID=shell-app
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_VAPID_KEY=tu_vapid_key
VITE_ENABLE_AUTH=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_OFFLINE_MODE=true
```

## Verificación de Deploy

```bash
# Verificar build local
cd /home/glacy/fg1-astro
pnpm build

# Verificar preview local
pnpm preview

# Test production URL (después de deploy)
curl https://fg1-astro.vercel.app
```

## Troubleshooting

### Error: "remote origin already exists"

```bash
# Remover remoto existente
git remote remove origin

# Agregar nuevo remoto
git remote add origin https://github.com/glacy/fg1-astro.git
```

### Error: "authentication failed"

```bash
# Configurar credenciales de Git
git config --global credential.helper store

# O usar SSH en lugar de HTTPS
git remote set-url origin git@github.com:glacy/fg1-astro.git
```

### Error: Push rechazado

```bash
# Forzar push (último recurso)
git push -u origin main --force

# O primero hacer pull
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Resumen de Comandos

```bash
# Flujo completo recomendado:
cd /home/glacy/fg1-astro
git remote add origin https://github.com/glacy/fg1-astro.git
git branch -M main
git push -u origin main
```

## Siguientes Pasos

1. ✅ Crear repositorio en GitHub
2. ✅ Hacer push del código
3. 🚀 Deploy a Vercel
4. 🔧 Configurar environment variables
5. 🧪 Test en producción
6. 📝 Actualizar documentación si es necesario

---

**Estado Actual:**
- ✅ Repositorio Astro configurado
- ✅ Commit inicial creado
- ✅ Dependencias instaladas
- ✅ Dev server funcional
- ⏳ Esperando creación de repositorio GitHub
- ⏳ Esperando deploy a producción