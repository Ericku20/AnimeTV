# 🚀 Guía de Deployment a Producción

Instrucciones para desplegar AnimeTV a producción.

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Preparación](#preparación)
- [Deploy Frontend](#deploy-frontend)
- [Deploy Backend](#deploy-backend)
- [Configuración de Dominio](#configuración-de-dominio)
- [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)

---

## 📋 Requisitos

### Infraestructura
- Servidor Linux (Ubuntu 20.04+)
- Node.js 18+
- npm o yarn
- Git
- Dominio propio (opcional)
- SSL/TLS certificate

### Conocimiento
- Git
- Linux básico
- Node.js/npm
- Conceptos de web deployment

---

## 🔧 Preparación

### 1. Clonar Repositorio

```bash
# En tu servidor
git clone https://github.com/tu-usuario/AnimeTV.git
cd AnimeTV
npm install
```

### 2. Configurar Variables de Entorno

#### Backend (.env.local)
```env
# IMPORTANTE: Cambiar valores en producción
PORT=3001
NODE_ENV=production

# API
ANIME1V_API_BASE_URL=https://api.anime1v.com

# CORS
FRONTEND_URL=https://tudominio.com

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Seguridad
ALLOWED_ORIGINS=https://tudominio.com
API_KEY=tu-clave-secreta-aqui
```

#### Frontend (.env.local)
```env
# URLs en producción
NEXT_PUBLIC_API_URL=https://api.tudominio.com/api
NEXT_PUBLIC_APP_NAME=AnimeTV

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=tu-google-analytics-id
```

### 3. Compilar para Producción

```bash
# Frontend
cd frontend
npm run build
cd ..

# Backend
cd backend
npm run build
cd ..
```

---

## 🌐 Deploy Frontend (Vercel Recomendado)

### Opción 1: Vercel (RECOMENDADO)

**Ventajas:**
- Gratis para proyectos pequeños
- Deploy automático desde GitHub
- SSL incluido
- CDN global
- Muy fácil de usar

**Pasos:**

1. **Crear cuenta en Vercel**
   ```
   https://vercel.com/signup
   ```

2. **Conectar GitHub**
   - Importar repositorio
   - Seleccionar `frontend` como root directory

3. **Configurar variables de entorno**
   ```
   Settings → Environment Variables
   NEXT_PUBLIC_API_URL=https://api.tudominio.com/api
   ```

4. **Deploy automático**
   - Vercel desplegará automáticamente en cada push a main

5. **Custom domain**
   - Settings → Domains
   - Agregar tu dominio
   - Configurar DNS

### Opción 2: Netlify

**Pasos:**
1. Conectar GitHub a Netlify
2. Build command: `npm run build` (en frontend)
3. Publish directory: `.next`
4. Variables de entorno en Site settings

### Opción 3: Auto-hosting (VPS)

**Requisitos:**
- Servidor VPS (AWS EC2, DigitalOcean, Linode, etc.)
- SSH access
- Node.js instalado

**Pasos:**

1. **Instalar dependencias**
```bash
sudo apt update
sudo apt install -y nodejs npm git curl
```

2. **Clonar y configurar**
```bash
git clone https://github.com/tu-usuario/AnimeTV.git
cd AnimeTV
npm install
npm run build
```

3. **Instalar PM2 para mantener la app corriendo**
```bash
npm install -g pm2
pm2 start "npm start --workspace=frontend" --name "animetv-frontend"
pm2 save
```

4. **Configurar Nginx como reverse proxy**
```bash
sudo apt install -y nginx
```

**Archivo `/etc/nginx/sites-available/default`:**
```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Habilitar HTTPS con Certbot**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

---

## 🔌 Deploy Backend

### Opción 1: Railway.app (RECOMENDADO)

**Ventajas:**
- Excelente para Node.js
- Gratis (con límites)
- Deploy fácil desde GitHub
- Variables de entorno
- Monitoreo incluido

**Pasos:**
1. Crear cuenta en railway.app
2. Conectar GitHub
3. Crear nuevo proyecto
4. Seleccionar repositorio
5. Configurar variables de entorno
6. Deploy automático

### Opción 2: Heroku

**Pasos:**
```bash
# Instalar Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Crear app
heroku create tu-app-name

# Configurar variables
heroku config:set PORT=3001 --app tu-app-name
heroku config:set NODE_ENV=production --app tu-app-name
heroku config:set FRONTEND_URL=https://tudominio.com --app tu-app-name

# Deploy
git push heroku main
```

### Opción 3: VPS Personal

**Pasos similares al frontend, pero con ajustes:**

1. **PM2 para backend**
```bash
cd backend
pm2 start "npm start" --name "animetv-backend"
```

2. **Nginx reverse proxy para API**
```nginx
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

3. **HTTPS con Certbot**
```bash
sudo certbot --nginx -d api.tudominio.com
```

---

## 🌐 Configuración de Dominio

### DNS Records Necesarios

```
Tipo    | Nombre         | Valor
--------|----------------|----------------------------------
A       | @              | IP de tu servidor / Vercel IP
A       | www            | IP de tu servidor / Vercel IP
CNAME   | api            | tu-backend.herokuapp.com
```

### Ejemplo para Vercel + Railway

```
# Frontend (Vercel)
animetv.com → CNAME → cname.vercel-dns.com

# Backend (Railway)
api.animetv.com → CNAME → railway.app
```

---

## 📊 Monitoreo y Mantenimiento

### 1. Monitoreo de Performance

```bash
# Con PM2
pm2 monit

# Con curl
curl http://localhost:3001/health
```

### 2. Logs

```bash
# Ver logs
pm2 logs

# Backend
tail -f /path/to/logs/backend.log

# Frontend
tail -f /path/to/logs/frontend.log
```

### 3. Backups

```bash
# Script de backup
#!/bin/bash
cp -r /home/user/AnimeTV /backup/AnimeTV_$(date +%Y%m%d)
```

### 4. Actualizaciones

```bash
# Pull cambios
git pull origin main

# Instalar nuevas dependencias
npm install

# Rebuild
npm run build

# Restart
pm2 restart all
```

### 5. Seguridad

- [ ] SSL/TLS configurado
- [ ] Rate limiting activado
- [ ] CORS correctamente configurado
- [ ] Variables sensibles en .env
- [ ] Firewall configurado
- [ ] SSH keys configuradas
- [ ] Backups regulares

---

## 🚨 Troubleshooting Deployment

### Frontend no carga
```bash
# Verificar que sea construido correctamente
npm run build

# Limpiar caché
rm -rf .next/
npm run build
```

### Backend no responde
```bash
# Verificar puerto
lsof -i :3001

# Ver logs
pm2 logs

# Reiniciar
pm2 restart all
```

### Errores de CORS
```
# Verificar FRONTEND_URL en backend/.env.local
FRONTEND_URL=https://tudominio.com

# Sin http:// ni trailing slash
```

### SSL/TLS errors
```bash
# Renovar certificados
sudo certbot renew

# Forzar renovación
sudo certbot renew --force-renewal
```

---

## 📈 Escalabilidad Futura

### Cuando crezcas, considera:

1. **Load Balancing**
   - Nginx upstream
   - AWS ELB
   - CloudFlare

2. **Base de Datos**
   - PostgreSQL
   - MongoDB

3. **Cache**
   - Redis
   - Memcached

4. **CDN**
   - CloudFlare
   - AWS CloudFront
   - Bunny CDN

5. **Microservicios**
   - Separar servicios
   - API Gateway
   - Message queues

---

## 💡 Checklist Pre-Launch

- [ ] Variables de entorno configuradas
- [ ] Frontend compilado
- [ ] Backend compilado
- [ ] HTTPS/SSL habilitado
- [ ] Dominio configurado
- [ ] Logs configurados
- [ ] Monitoreo activo
- [ ] Backups automáticos
- [ ] CORS correcto
- [ ] Rate limiting activado
- [ ] Documentación actualizada
- [ ] Tests ejecutados
- [ ] Performance optimizado

---

## 📞 Support

En caso de problemas:

1. Revisa logs
2. Verifica variables de entorno
3. Comprueba conectividad de red
4. Verifica puertos abiertos
5. Abre issue en GitHub

---

**¡Listo para producción! 🚀**
