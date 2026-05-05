# 🚀 INSTALLATION GUIDE - GUÍA DE INSTALACIÓN

## English Version

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- npm 9+ (comes with Node.js)
- Git (optional, for version control)

### Quick Installation

```bash
# 1. Navigate to project directory
cd /home/erick-alfaro/Documentos/AnimeTV

# 2. Install all dependencies (frontend + backend)
npm install

# 3. Verify installation
bash verify.sh

# 4. Start development servers
npm run dev

# 5. Open in browser
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

### What Each Command Does

```bash
npm install              # Installs ALL dependencies for both frontend and backend
npm run dev             # Starts both servers in development mode
npm run dev:frontend    # Starts only frontend (http://localhost:3000)
npm run dev:backend     # Starts only backend (http://localhost:3001)
npm run build           # Compiles both frontend and backend for production
npm start               # Starts production build
npm run lint            # Runs ESLint checks
npm run type-check      # Runs TypeScript checks
```

### Troubleshooting Installation

**Error: Node version too old**
```bash
# Check your Node version
node -v

# Should be 18.0.0 or higher. Update from https://nodejs.org
```

**Error: Dependencies not installing**
```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

**Error: Ports already in use**
```bash
# Frontend port 3000 in use:
PORT=3001 npm run dev:frontend

# Backend port 3001 in use:
PORT=3002 npm run dev:backend
```

---

## Versión en Español

### Requisitos Previos

- Node.js 18+ ([Descargar](https://nodejs.org))
- npm 9+ (viene con Node.js)
- Git (opcional, para control de versiones)

### Instalación Rápida

```bash
# 1. Navega al directorio del proyecto
cd /home/erick-alfaro/Documentos/AnimeTV

# 2. Instala todas las dependencias (frontend + backend)
npm install

# 3. Verifica la instalación
bash verify.sh

# 4. Inicia los servidores de desarrollo
npm run dev

# 5. Abre en tu navegador
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

### Qué Hace Cada Comando

```bash
npm install              # Instala TODAS las dependencias de ambos espacios
npm run dev             # Inicia ambos servidores en modo desarrollo
npm run dev:frontend    # Inicia solo frontend (http://localhost:3000)
npm run dev:backend     # Inicia solo backend (http://localhost:3001)
npm run build           # Compila ambos para producción
npm start               # Inicia compilación de producción
npm run lint            # Ejecuta verificación ESLint
npm run type-check      # Ejecuta verificación TypeScript
```

### Solución de Problemas de Instalación

**Error: Versión de Node muy antigua**
```bash
# Verifica tu versión de Node
node -v

# Debe ser 18.0.0 o superior. Actualiza desde https://nodejs.org
```

**Error: Las dependencias no se instalan**
```bash
# Limpia el caché de npm e intenta de nuevo
npm cache clean --force
npm install
```

**Error: Puertos ya están en uso**
```bash
# Puerto 3000 del frontend en uso:
PORT=3001 npm run dev:frontend

# Puerto 3001 del backend en uso:
PORT=3002 npm run dev:backend
```

---

## 📊 Tamaño de Instalación Esperado

```
Frontend dependencias: ~400MB
Backend dependencias:  ~200MB
Total instalación:     ~600MB

Tiempo esperado:       2-5 minutos
(depende de velocidad internet)
```

---

## 📋 Verificación Post-Instalación

Después de `npm install`, verifica que todo esté bien:

```bash
# Verificación automática
bash verify.sh

# O verificación manual
npm run type-check      # Verifica tipos TypeScript
npm run lint            # Verifica linting
npm run build           # Compila para producción
```

---

## 🎬 Primer Inicio

Una vez instalado:

```bash
# Terminal 1: Inicia ambos servidores
npm run dev

# Terminal 2: En otra ventana de terminal (opcional)
npm run dev:frontend    # Solo frontend
```

Deberías ver:

```
✓ Frontend compilado correctamente
✓ Backend corriendo en puerto 3001
✓ HMR (Hot Module Replacement) activo

http://localhost:3000 → Frontend
http://localhost:3001 → Backend API
```

---

## 🔧 Instalación de Dependencias Específicas

Si necesitas instalar una dependencia adicional:

```bash
# Para frontend
cd frontend
npm install nombre-paquete

# Para backend
cd ../backend
npm install nombre-paquete

# Luego vuelve a instalar desde root si es necesario
cd ..
npm install
```

---

## 📁 Estructura Post-Instalación

Después de `npm install`, tu estructura debería verse así:

```
AnimeTV/
├── node_modules/        ← Creado por npm install
├── backend/
│   └── node_modules/    ← Creado por npm install
├── frontend/
│   ├── node_modules/    ← Creado por npm install
│   └── .next/           ← Creado por npm run dev
└── ...resto de archivos
```

---

## 💡 Tips de Instalación

1. **Usa Node 18 o superior** - La aplicación requiere features modernas de Node
2. **Asegúrate de buena conexión** - Las dependencias se descargan de npm registry
3. **No elimines .env.local** - Contiene configuración importante
4. **Si faltan dependencias** - Ejecuta `npm install` nuevamente

---

## 🆘 Si Algo Falla

1. **Elimina node_modules y package-lock.json**
```bash
rm -rf node_modules
rm -rf backend/node_modules
rm -rf frontend/node_modules
rm package-lock.json
rm backend/package-lock.json
rm frontend/package-lock.json
```

2. **Limpia caché de npm**
```bash
npm cache clean --force
```

3. **Reinstala todo desde cero**
```bash
npm install
```

4. **Verifica la instalación**
```bash
bash verify.sh
```

---

## 📞 Soporte

Si la instalación falla:

1. Revisa [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Verifica que Node.js esté correctamente instalado: `node -v`
3. Verifica que npm esté actualizado: `npm -v`
4. Intenta instalar nuevamente: `npm install`

---

**¡Listo para empezar! 🚀**

Próximo paso: `npm run dev`
