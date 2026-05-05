# AnimeTV

# 🎬 AnimeTV - Plataforma de Streaming de Anime

Una plataforma profesional, escalable y lista para producción de streaming de anime. Inspirada en Netflix y Crunchyroll, con navegación tipo Smart TV.

## ✨ Características

### 🎨 Diseño Moderno
- Interfaz oscura minimalista y elegante
- Animaciones suaves con Framer Motion
- Diseño responsivo (móvil, tablet, desktop, Smart TV)
- Hover effects y transiciones fluidas
- Skeleton loaders para mejor UX

### 📺 Navegación Smart TV
- Navegación con flechas (↑ ↓ ← →)
- Seleccionar con Enter
- Resalte visual de elementos enfocados
- Enfoque automático y navegación tipo grid

### 🎮 Reproductor Profesional
- Reproducción HLS con hls.js
- Controles personalizados grandes
- Selector de calidad (auto/720p/1080p)
- Selector de servidor
- Subtítulos (activar/desactivar, tamaño, color)
- Pantalla completa
- Barra de progreso interactiva

### ❤️ Sistema de Usuario (Sin Login)
- Favoritos ❤️
- Continuar viendo ▶️
- Historial 🕒
- Almacenamiento local (localStorage)

### 🔍 Búsqueda Avanzada
- Búsqueda en tiempo real con debounce
- Resultados en grid
- Carga infinita
- Filtros inteligentes

### 📥 Funcionalidades Adicionales
- Autoplay del siguiente episodio
- Skip intro automático
- Recomendaciones inteligentes
- Modo cine
- Notificaciones UI

---

## 🧱 Stack Tecnológico

### Frontend
- **Next.js 14+** (App Router) - Framework React moderno
- **React 18+** - Librería UI
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos
- **Zustand** - Manejo de estado global
- **Axios** - Requests HTTP
- **hls.js** - Reproducción HLS
- **Framer Motion** - Animaciones

### Backend
- **Node.js + Express** - Servidor
- **TypeScript** - Tipado
- **Axios** - HTTP client
- **express-rate-limit** - Rate limiting
- **CORS** - Manejo de CORS

### API
- **Anime1v API** - Fuente de datos

---

## 📥 Instalación

### Requisitos Previos
- Node.js >= 18.0.0
- npm >= 9.0.0

### Pasos

1. **Clonar/Descargar el repositorio**
```bash
cd /ruta/al/proyecto/AnimeTV
```

2. **Instalar dependencias de todo el workspace**
```bash
npm install
```

Esto instalará automáticamente las dependencias para:
- `/frontend`
- `/backend`

---

## 🚀 Ejecución

### Desarrollo (Frontend + Backend)

**Opción 1: Ejecutar ambos simultáneamente**
```bash
npm run dev
```

Esto inicia:
- Frontend en `http://localhost:3000`
- Backend en `http://localhost:3001`

**Opción 2: Ejecutar por separado**

Backend:
```bash
npm run dev:backend
```

Frontend (en otra terminal):
```bash
npm run dev:frontend
```

### Producción

**Compilar**
```bash
npm run build
```

**Iniciar**
```bash
npm start
```

---

## 📁 Estructura del Proyecto

```
AnimeTV/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Servidor principal
│   │   ├── routes/
│   │   │   └── anime.ts          # Rutas de anime
│   │   ├── controllers/
│   │   │   └── animeController.ts # Controladores
│   │   ├── services/
│   │   │   └── animeService.ts   # Lógica de negocio
│   │   ├── middlewares/
│   │   │   └── errorHandler.ts   # Manejo de errores
│   │   └── utils/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.local
│   └── .env.example
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Home
│   │   ├── layout.tsx            # Layout global
│   │   ├── globals.css           # Estilos globales
│   │   ├── search/
│   │   │   └── page.tsx          # Página búsqueda
│   │   ├── anime/
│   │   │   └── page.tsx          # Detalle anime
│   │   ├── favorites/
│   │   │   └── page.tsx          # Favoritos
│   │   ├── components/
│   │   │   ├── Header.tsx        # Navegación
│   │   │   ├── AnimeCard.tsx     # Tarjeta anime
│   │   │   ├── AnimeCarousel.tsx # Carrusel
│   │   │   ├── VideoPlayer.tsx   # Reproductor
│   │   │   └── Skeleton.tsx      # Loaders
│   │   ├── hooks/
│   │   │   └── useFocusNavigation.ts # Smart TV nav
│   │   ├── services/
│   │   │   ├── api.ts            # Cliente API
│   │   │   └── storage.ts        # LocalStorage
│   │   ├── store/
│   │   │   └── app.ts            # Zustand store
│   │   ├── types/
│   │   │   └── index.ts          # TypeScript types
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── next.config.js
│   ├── .env.local
│   └── .env.example
│
├── package.json                  # Workspace root
├── .gitignore
└── README.md
```

---

## ⚙️ Configuración

### Variables de Entorno

**Backend (.env.local)**
```env
PORT=3001
NODE_ENV=development
ANIME1V_API_BASE_URL=https://api.example.com
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=AnimeTV
```

---

## 📡 API Endpoints

### Búsqueda
```
GET /api/anime/search?q=keyword&page=1
```

### Información del Anime
```
GET /api/anime/info?url=...
```

### Fuentes del Episodio
```
GET /api/anime/episode?url=...
```

### Anime Popular
```
GET /api/anime/popular?page=1
```

### Anime Reciente
```
GET /api/anime/recent?page=1
```

---

## 🎮 Navegación Smart TV

### Controles
- **Flechas (↑ ↓ ← →)** - Navegar entre elementos
- **Enter** - Seleccionar elemento enfocado
- **Escape** - Volver

### Características
- Enfoque automático en el primer elemento
- Navegación fluida en grid
- Resalte visual clara (ring + escala)
- Scroll automático al elemento enfocado

---

## 🔐 Seguridad

✅ **Implementado:**
- CORS configurado para frontend
- Rate limiting en backend (100 requests/15 min)
- Validación de inputs
- Manejo de errores centralizado
- Sin exposición directa de la API

✅ **Créditos:**
- API de Anime1v por FxxMorgan (mencionado en footer)

---

## 🧪 Testing

### Ejecutar linting
```bash
npm run lint
```

### Type checking
```bash
npm run type-check
```

---

## 🚀 Deploy a Producción

### Frontend (Vercel)
```bash
npm run build
npm start
```

### Backend (Heroku, Railway, etc.)
```bash
npm run build
npm start
```

---

## 📊 Optimizaciones Implementadas

- ✅ Lazy loading de imágenes
- ✅ Code splitting automático
- ✅ SSR + CSR híbrido (Next.js)
- ✅ Caché de resultados (localStorage)
- ✅ Debounce en búsqueda
- ✅ Infinite scroll
- ✅ Compresión de recursos
- ✅ Skeleton loaders
- ✅ Animaciones optimizadas

---

## 🎁 Features Bonus

- ✅ Sistema de favoritos persistente
- ✅ Continuar viendo
- ✅ Historial de visualización
- ✅ Opciones del reproductor guardadas
- ✅ Tema oscuro por defecto
- ✅ Responsive design
- ✅ Navegación Smart TV

---

## 📝 Licencia

Proyecto educativo. Todos los créditos a FxxMorgan por la API de Anime1v.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o PR.

---

## 📞 Soporte

Para problemas o preguntas, abre un issue en GitHub.

---

## 🎯 Roadmap Futuro

- [ ] Sistema de autenticación
- [ ] Sincronización en la nube
- [ ] Notificaciones de nuevos episodios
- [ ] Recomendaciones con ML
- [ ] Interfaz de administración
- [ ] Sistema de comentarios
- [ ] Social features
- [ ] App móvil nativa

---

**¡Disfruta viendo anime! 🎬**
