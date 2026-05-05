# 🎬 AnimeTV - GUÍA VISUAL DE USO

## 📺 Interfaz Visual

### Home (Inicio)

```
┌───────────────────────────────────────────────────────────────┐
│  🎬 AnimeTV                      🔍 Buscar...  🎁 Favoritos   │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  [    BANNER DE ANIME DESTACADO    ]                          │
│  [   imagen de fondo borrosa       ]  ▶ Ver ahora            │
│  [   Anime destacado              ]  ❤ Favoritos            │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Popular Ahora:                                               │
│  ◀ [Card] [Card] [Card] [Card] [Card] [Card] ▶              │
│                                                               │
│  Agregados Recientemente:                                    │
│  ◀ [Card] [Card] [Card] [Card] [Card] [Card] ▶              │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Búsqueda

```
┌───────────────────────────────────────────────────────────────┐
│  🔍 Buscar anime...                                           │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Resultados para: "naruto"                                    │
│                                                               │
│  [Card]  [Card]  [Card]  [Card]  [Card]  [Card]             │
│  [Card]  [Card]  [Card]  [Card]  [Card]  [Card]             │
│  [Card]  [Card]  [Card]  [Card]  [Card]  [Card]             │
│                                                               │
│                ⏳ Cargando más...                             │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Página de Anime

```
┌───────────────────────────────────────────────────────────────┐
│  ▶ [Reproductor de Video]                                    │
│  ┌──────────────────────────────────────────────────────────┐│
│  │                                                          ││
│  │         [Video que se reproduce aquí]                  ││
│  │                                                          ││
│  └──────────────────────────────────────────────────────────┘│
│  ⏸ ⏩ ⏪ ━━━━●━━━━━━━━━━ 15:30 / 24:00 🔊 ⚙️ 🖼️             │
├──────────────────────────────────────┬──────────────────────┤
│  Título del Anime                    │  EPISODIOS           │
│                          ❤️          │  ↓ Ep. 1 (Actual)   │
│                                       │  Ep. 2              │
│  Tipo: TV        Año: 2024           │  Ep. 3              │
│  Estado: Transmitiendo               │  Ep. 4              │
│  Rating: ⭐ 8.5                      │  ...                │
│                                       │                     │
│  Sinopsis:                           │                     │
│  Lorem ipsum dolor sit amet...       │                     │
│                                       │                     │
│  Géneros:                            │                     │
│  [Acción] [Aventura] [Shounen]       │                     │
│                                       │                     │
└──────────────────────────────────────┴──────────────────────┘
```

### Favoritos

```
┌───────────────────────────────────────────────────────────────┐
│  ❤️  Favoritos (12 animes)                                   │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  [Card]✕ [Card]✕ [Card]✕ [Card]✕ [Card]✕ [Card]✕         │
│  [Card]✕ [Card]✕ [Card]✕ [Card]✕ [Card]✕ [Card]✕         │
│                                                               │
│  ✕ = Botón para remover de favoritos (al pasar el mouse)    │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 🎮 Navegación Smart TV

### Interacción en Home

```
Inicio:
┌─────────────────────────────────────────┐
│  ◀ [CARD DESTACADO] [CARD] [CARD] ▶    │
│                ↓ ↓ ↓
└─────────────────────────────────────────┘

Presionar ↓:
┌─────────────────────────────────────────┐
│  ◀ [CARD] [CARD] [CARD] ▶               │
│           ↓ ↓ ↓
│  ◀ [CARD DESTACADO] [CARD] ▶            │
└─────────────────────────────────────────┘

Presionar → en Card:
  Card obtiene ring rojo y se amplía
  Presionar Enter abre el anime
```

### Estados Visuales

```
Elemento SIN ENFOQUE:
┌──────────┐
│  Anime   │
│  Título  │
└──────────┘

Elemento CON ENFOQUE (Highlighted):
┌══════════╗
║  Anime   ║  ← Ring rojo
║  Título  ║
╚══════════╝
  ↑ Escala 1.05

Elemento SELECCIONADO:
┌══════════╗
║  Anime   ║  ← Brilla
║  Título  ║
╚══════════╝
(Se abre la página)
```

---

## ▶️ Reproductor de Video

### Controles

```
Elemento NO enfocado:
┌────────────────────────────────────┐
│  [Video]                           │
│  (Mostrar play button al hover)    │
└────────────────────────────────────┘

Elemento ENFOCADO:
┌────────────────────────────────────┐
│  [Video]                           │
│  ┌──────────────────────────────┐  │
│  │ ⏸ Vol ━━━━●━━━ ⚙️ ⛶       │  │
│  └──────────────────────────────┘  │
│  (Controles visibles)              │
└────────────────────────────────────┘

Menú de Configuración:
┌────────────────────┐
│ Calidad:           │
│ ◉ Automático       │
│ ○ 720p             │
│ ○ 1080p            │
├────────────────────┤
│ Subtítulos:        │
│ ○ Ninguno          │
│ ◉ Español          │
│ ○ Inglés           │
└────────────────────┘
```

---

## 🎨 Esquema de Colores

```
Fondo:         #0f0f0f (Negro profundo)
Tarjetas:      #1a1a1a (Gris oscuro)
Bordes:        #2a2a2a (Gris más claro)
Acentos:       #ef4444 (Rojo Netflix)

Texto Principal:     #ffffff (Blanco)
Texto Secundario:    #a0aec0 (Gris claro)
Texto Deshabilitado: #718096 (Gris)

Enfoque:       Ring rojo #ef4444 (2px)
Hover:         Escala 1.05 + transición
Shadow:        Sombra negra con blur
```

---

## ⌨️ Atajos de Teclado

```
NAVEGACIÓN:
  ↑  Arriba en grid
  ↓  Abajo en grid
  ←  Izquierda en grid
  →  Derecha en grid
  
  Enter  Seleccionar elemento
  Escape Volver / Cerrar menú
  F5     Recargar página

BÚSQUEDA:
  Ctrl+F Focus en búsqueda
  Enter  Ejecutar búsqueda

VIDEO:
  Space  Play/Pause
  M      Mute
  F      Pantalla completa
  →      Adelantar 10s
  ←      Retroceder 10s
```

---

## 📱 Responsive Design

### Mobile (< 640px)
```
┌─────────────────────┐
│ 🎬 AnimeTV [≡]      │
├─────────────────────┤
│                     │
│  [    BANNER    ]   │
│                     │
│  Popular:           │
│  [Card]             │
│  [Card]             │
│  [Card]             │
│                     │
│  Reciente:          │
│  [Card]             │
│  [Card]             │
│                     │
└─────────────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────────────────┐
│ 🎬 AnimeTV    🔍 Buscar          │
├──────────────────────────────────┤
│          [    BANNER    ]         │
├──────────────────────────────────┤
│ Popular:                          │
│ [Card]  [Card]  [Card]  [Card]   │
│ [Card]  [Card]  [Card]  [Card]   │
│                                  │
│ Reciente:                         │
│ [Card]  [Card]  [Card]  [Card]   │
│ [Card]  [Card]  [Card]  [Card]   │
└──────────────────────────────────┘
```

### Desktop (> 1024px)
```
┌────────────────────────────────────────────────────┐
│ 🎬 AnimeTV           🔍 Buscar...     Favoritos    │
├────────────────────────────────────────────────────┤
│                 [    BANNER    ]                   │
├────────────────────────────────────────────────────┤
│ Popular:                                           │
│ ◀ [Card] [Card] [Card] [Card] [Card] [Card] ▶    │
│                                                   │
│ Reciente:                                         │
│ ◀ [Card] [Card] [Card] [Card] [Card] [Card] ▶    │
└────────────────────────────────────────────────────┘
```

---

## 🌊 Animaciones

### Entrada de Página
```
Opacidad:  0% ──► 100% (0.5s)
Posición:  y: 20px ──► 0px
Easing:    ease-out
```

### Hover en Card
```
Escala:    1.0 ──► 1.05 (0.3s)
Sombra:    normal ──► aumentada
Overlay:   opaco 0 ──► 0.7
Easing:    ease-out
```

### Transición en Carrusel
```
Smooth scroll: 400px en 0.5s
Easing: ease-in-out
```

---

## 💾 Almacenamiento Local

### Estructura localStorage

```json
{
  "anime_favorites": [
    {
      "animeUrl": "https://...",
      "title": "Naruto",
      "image": "https://...",
      "addedAt": 1234567890
    }
  ],
  "anime_watch_history": [
    {
      "animeUrl": "https://...",
      "episode": 1,
      "timestamp": 1234567890,
      "position": 1200
    }
  ],
  "continue_watching": [
    {
      "animeUrl": "https://...",
      "title": "Naruto",
      "lastWatchedEpisode": 10,
      "addedAt": 1234567890
    }
  ],
  "player_options": {
    "quality": "auto",
    "subtitlesEnabled": true,
    "autoplay": true
  }
}
```

---

## 🔄 Flujo de Datos

```
┌─────────────┐
│   Frontend  │
│  (Next.js)  │
└──────┬──────┘
       │
       │ Axios HTTP
       ▼
┌─────────────┐     ┌─────────────┐
│   Backend   │────▶│  Anime1v    │
│  (Express)  │     │     API     │
│   Proxy     │     │             │
└──────┬──────┘     └─────────────┘
       │
       │ JSON
       ▼
┌─────────────┐
│   Frontend  │
│  (Zustand)  │
│   Display   │
└─────────────┘
```

---

## 🖥️ Ejemplo de Uso Completo

```
1. Usuario abre http://localhost:3000
   ↓
2. Se muestra Home con carruseles
   ↓
3. Usuario presiona flechas o click en card
   ↓
4. Se enfoca la tarjeta (ring rojo)
   ↓
5. Usuario presiona Enter o hace click
   ↓
6. Se navega a /anime?url=...
   ↓
7. Se carga información del anime
   ↓
8. Se muestra reproductor + episodios
   ↓
9. Usuario selecciona episodio
   ↓
10. Se carga el video
    ↓
11. Usuario puede:
    - Reproducir video
    - Cambiar calidad
    - Agregar a favoritos
    - Ver episodios
    ↓
12. Al terminar:
    - Se guarda en "Continuar viendo"
    - Se guarda en historial
    - Opción de ver siguiente episodio
```

---

**¡Disfruta usando AnimeTV! 🎬**
