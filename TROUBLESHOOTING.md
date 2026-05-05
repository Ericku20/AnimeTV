# 🆘 Troubleshooting

Soluciones para problemas comunes en AnimeTV.

## 📋 Tabla de Contenidos

- [Problemas de Instalación](#instalación)
- [Problemas de Ejecución](#ejecución)
- [Problemas de Frontend](#frontend)
- [Problemas de Backend](#backend)
- [Problemas de API](#api)
- [Problemas de Video](#video)
- [Problemas de Navegación](#navegación)

---

## 🔧 Instalación

### Error: "command not found: npm"
**Causa**: Node.js o npm no está instalado
**Solución**:
1. Descarga Node.js desde https://nodejs.org/
2. Ejecuta el instalador
3. Verifica con `node -v` y `npm -v`

### Error: "EACCES: permission denied"
**Causa**: Problemas de permisos
**Solución**:
```bash
# Opción 1: Cambiar permisos
chmod +x ./setup.sh
./setup.sh

# Opción 2: Usar sudo (no recomendado)
sudo npm install
```

### Error: "node_modules is missing"
**Causa**: No se ejecutó `npm install`
**Solución**:
```bash
npm install
```

### Error: "package-lock.json conflict"
**Causa**: Git merge con conflictos
**Solución**:
```bash
git checkout --theirs package-lock.json
npm install
```

---

## ▶️ Ejecución

### Error: "Port 3000 already in use"
**Causa**: Puerto ocupado por otra aplicación
**Solución**:
```bash
# Opción 1: Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9

# Opción 2: Usar otro puerto
PORT=3002 npm run dev:frontend
```

### Error: "Port 3001 already in use"
**Causa**: Backend ya está corriendo
**Solución**:
```bash
# Matar proceso en puerto 3001
lsof -ti:3001 | xargs kill -9
```

### Error: "Cannot find module"
**Causa**: Dependencias no instaladas o falta rebuild
**Solución**:
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

## 💻 Frontend

### Página en blanco
**Causa**: Error en compilación o sin conexión al backend
**Solución**:
1. Abre la consola del navegador (F12)
2. Revisa los errores en la consola
3. Verifica que el backend esté corriendo (`http://localhost:3001/health`)

### Componentes no cargan
**Causa**: Next.js no compiló correctamente
**Solución**:
```bash
# Limpiar caché y reiniciar
rm -rf .next
npm run dev
```

### Estilos no aplican
**Causa**: TailwindCSS no procesó los estilos
**Solución**:
1. Verifica que tailwind.config.js sea correcto
2. Limpia caché: `npm run dev`
3. Hard refresh del navegador: `Ctrl+Shift+R`

### Imágenes no cargan
**Causa**: Dominio no en whitelist de Next.js
**Solución**:
```javascript
// En next.config.js, agregar dominio a remotePatterns
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'tu-dominio.com',
  },
]
```

### Búsqueda no funciona
**Causa**: Backend no responde o API incorrecta
**Solución**:
1. Verifica que backend esté en http://localhost:3001
2. Revisa la variable `NEXT_PUBLIC_API_URL` en .env.local
3. Abre la consola del navegador para ver errores

---

## 🔌 Backend

### Error: "Cannot find module"
**Causa**: Dependencias no compiladas
**Solución**:
```bash
cd backend
npm install
npm run dev
```

### Error: "ENOENT: no such file or directory"
**Causa**: Archivos de configuración faltantes
**Solución**:
```bash
cp backend/.env.example backend/.env.local
```

### Error: "TypeError: axios is not a function"
**Causa**: Import incorrecto de CommonJS vs ESM
**Solución**:
```typescript
// Correcto (ESM)
import axios from 'axios';

// Incorrecto
const axios = require('axios');
```

### Rate limit muy restrictivo
**Causa**: Configuración muy baja
**Solución**:
```env
# En backend/.env.local
RATE_LIMIT_MAX_REQUESTS=1000
RATE_LIMIT_WINDOW_MS=3600000  # 1 hora
```

---

## 📡 API

### Error: "CORS error"
**Causa**: Frontend y backend en puertos diferentes
**Solución**:
```typescript
// En backend index.ts
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
```

### Error: "Timeout"
**Causa**: API externa lenta o sin respuesta
**Solución**:
```typescript
// En backend animeService.ts
const client = axios.create({
  timeout: 30000, // Aumentar a 30 segundos
});
```

### Respuesta vacía
**Causa**: API retorna datos en formato diferente
**Solución**:
1. Logea la respuesta completa
2. Ajusta el parseo de datos en el controlador
3. Revisa la documentación de la API

---

## ▶️ Video

### Video no inicia
**Causa**: URL HLS incorrecta o servidor sin soporte
**Solución**:
1. Verifica que la URL sea correcta
2. Intenta en otro servidor
3. Revisa la consola del navegador

### Audio sin sincronización
**Causa**: Buffer insuficiente o codec incompatible
**Solución**:
```typescript
// En VideoPlayer.tsx, hls.js config
const hls = new Hls({
  lowLatencyMode: true,
  bufferLength: 5,
});
```

### Subtítulos no aparecen
**Causa**: Formato incorrecto o ruta mal configurada
**Solución**:
1. Verifica que el archivo VTT sea válido
2. URL debe estar CORS habilitada
3. Intenta con diferente formato

### Quality selector no funciona
**Causa**: Niveles no definidos en HLS
**Solución**:
```typescript
// Asegúrate que la URL HLS tenga múltiples calidades
// Ej: stream_720p.m3u8, stream_1080p.m3u8
```

---

## 🎮 Navegación

### Flechas no funcionan
**Causa**: Elemento no tiene atributo data-focusable
**Solución**:
```typescript
// En AnimeCard.tsx
<div data-focusable="true" id={id}>
  {/* contenido */}
</div>
```

### Focus se pierde
**Causa**: Elemento desaparece o es destruido
**Solución**:
```typescript
// En useFocusNavigation.ts
const getFocusableElements = useCallback(() => {
  // Actualizar lista cuando cambia el DOM
}, [items, gridCols]);
```

### Smart TV no responde
**Causa**: Página no tiene soporte completo
**Solución**:
1. Verifica que estés en http://localhost:3000
2. Presiona F12 para abrir consola
3. Revisa si hay errores JavaScript

---

## 🔍 Debug

### Ver logs del Backend
```bash
# En desarrollo, los logs aparecen en terminal
# Para más detalle:
NODE_ENV=development npm run dev:backend
```

### Ver logs del Frontend
```bash
# Abre consola del navegador
# F12 → Console → Revisa los logs
```

### Testing de API
```bash
# Probar endpoint
curl "http://localhost:3001/api/anime/popular?page=1"

# Con pretty print
curl "http://localhost:3001/api/anime/popular" | jq
```

### Limpiar almacenamiento local
```javascript
// En consola del navegador
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

## 🚀 Optimización

### Aplicación lenta
**Causa**: Muchos renders o datos no optimizados
**Solución**:
1. Usa React DevTools para detectar renders innecesarios
2. Memoiza componentes con `React.memo()`
3. Usa `useMemo` y `useCallback` cuando sea necesario

### Memoria alta
**Causa**: Memory leak en listeners
**Solución**:
```typescript
// Siempre limpiar listeners
useEffect(() => {
  const handler = () => {};
  window.addEventListener('resize', handler);
  
  return () => {
    window.removeEventListener('resize', handler);
  };
}, []);
```

---

## 📞 Obtener Ayuda

Si el problema persiste:

1. **Revisa el código de error**: Copia el error completo
2. **Describe pasos**: Explica exactamente qué hiciste
3. **Proporciona contexto**: SO, navegador, versión de Node.js
4. **Abre un issue**: En GitHub con toda la información
5. **Revisa logs**: Adjunta capturas de consola/terminal

---

## 💡 Tips Generales

- Siempre reinicia después de cambiar .env
- Limpia caché del navegador regularmente
- Usa modo incógnito para testing
- Revisa la consola antes de reportar errores
- Actualiza Node.js y npm regularmente

---

**¿Aún no funciona?** 📞 Abre un issue en GitHub con detalles específicos.

