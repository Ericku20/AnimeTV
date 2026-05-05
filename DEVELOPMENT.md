# 🛠️ GUÍA DE DESARROLLO

Este documento proporciona instrucciones para desarrolladores que quieran contribuir o extender la plataforma.

## 📝 Convenciones de Código

### TypeScript
- Usar interfaces para tipos complejos
- Usar types para uniones y tuplas
- Siempre tipar el retorno de funciones
- Evitar `any`, usar `unknown` si es necesario

### React/Next.js
- Usar componentes funcionales
- Usar hooks personalizados para lógica reutilizable
- Separar lógica de presentación
- Nombrar componentes con PascalCase
- Nombrar archivos con componentes como `ComponentName.tsx`

### Archivos
- `*.tsx` - Componentes React
- `*.ts` - Lógica, utils, types, hooks
- `*.css` - Estilos (usar TailwindCSS cuando sea posible)

## 🏗️ Agregar Nuevas Páginas

### 1. Crear carpeta en `/frontend/app`
```
/frontend/app/nueva-pagina/
├── page.tsx      # Componente principal
├── layout.tsx    # Layout opcional
└── ...
```

### 2. Estructura básica
```typescript
'use client';

import React from 'react';
import Header from '@/app/components/Header';

export default function NuevaPaginaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      {/* Contenido */}
    </main>
  );
}
```

## 🧩 Agregar Nuevos Componentes

### 1. Crear en `/frontend/app/components`
```typescript
interface ComponentProps {
  // Props aquí
}

export default function NuevoComponente({ ... }: ComponentProps) {
  return (
    <div>
      {/* JSX aquí */}
    </div>
  );
}
```

### 2. Exportar desde el componente
Los componentes deben ser autónomos y reutilizables.

## 🎣 Agregar Nuevos Hooks

### 1. Crear en `/frontend/app/hooks`
```typescript
import { useEffect, useState } from 'react';

export function useNuevoHook() {
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    // Lógica aquí
  }, []);

  return { estado };
}
```

## 🔌 Extender la API Backend

### 1. Crear nueva ruta en `/backend/src/routes`

```typescript
// routes/nuevo.ts
import express from 'express';
import { nuevoController } from '../controllers/nuevoController.js';

const router = express.Router();
router.get('/endpoint', nuevoController);

export default router;
```

### 2. Crear controlador en `/backend/src/controllers`

```typescript
// controllers/nuevoController.ts
import { Request, Response } from 'express';
import { asyncHandler, AppError } from '../middlewares/errorHandler.js';

export const nuevoController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await obtenerDatos();
    res.json({ success: true, data });
  }
);
```

### 3. Registrar ruta en `index.ts`

```typescript
import nuevoRoutes from './routes/nuevo.js';
app.use('/api/nuevo', nuevoRoutes);
```

## 📊 Usar Zustand Store

### Acceso al Store
```typescript
import { useAppStore } from '@/app/store/app';

export default function Componente() {
  const favoritos = useAppStore((state) => state.favorites);
  const agregarFavorito = useAppStore((state) => state.addFavorite);

  return (
    // ...
  );
}
```

### Agregar Nuevo Estado
```typescript
// En app.ts
interface AppStore {
  nuevoEstado: string;
  setNuevoEstado: (value: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  nuevoEstado: '',
  setNuevoEstado: (value) => set({ nuevoEstado: value }),
}));
```

## 🎨 Estilos y TailwindCSS

### Clases Custom Disponibles
```css
.container-custom    /* Container responsive */
.btn-primary        /* Botón primario */
.btn-secondary      /* Botón secundario */
.card-hover         /* Efecto hover en cards */
.focus-ring         /* Ring de enfoque */
```

### Colores Custom
```
dark-bg    #0f0f0f
dark-card  #1a1a1a
dark-border #2a2a2a
accent     #ef4444 (rojo)
```

## 🧪 Testing

### Unit Tests
```typescript
// __tests__/utils.test.ts
describe('utils', () => {
  it('debe hacer algo', () => {
    expect(funcion()).toBe(resultado);
  });
});
```

## 🔄 Workflow de Desarrollo

1. **Crear rama** desde `main`
   ```bash
   git checkout -b feature/mi-feature
   ```

2. **Desarrollar** con `npm run dev`

3. **Hacer commit**
   ```bash
   git commit -m "feat: descripción clara"
   ```

4. **Push**
   ```bash
   git push origin feature/mi-feature
   ```

5. **PR** a main

## 📦 Versionamiento

Usar Semantic Versioning:
- **MAJOR** - Cambios incompatibles
- **MINOR** - Funcionalidades nuevas compatibles
- **PATCH** - Bugfixes

---

## ❓ Preguntas Frecuentes

### ¿Cómo agregar búsqueda avanzada?
En `animeService.ts`, extender métodos de búsqueda con más parámetros.

### ¿Cómo cachear datos?
Usar `localStorage` a través de `storageService.ts`.

### ¿Cómo agregar animaciones?
Usar `framer-motion` con componentes `motion.*`.

### ¿Cómo optimizar imágenes?
Usar componente `Image` de Next.js con `priority` y `sizes`.

---

**¡Happy coding! 🚀**
