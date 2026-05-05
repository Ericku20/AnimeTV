# 📡 Documentación de API

Documentación completa de los endpoints disponibles en AnimeTV.

## Base URL

```
http://localhost:3001/api
```

## Formato de Respuesta

### Success (200)
```json
{
  "success": true,
  "data": {
    // datos aquí
  }
}
```

### Error
```json
{
  "success": false,
  "error": "Descripción del error"
}
```

---

## 📚 Endpoints

### 1. Búsqueda de Anime

#### Endpoint
```
GET /anime/search?q=keyword&page=1
```

#### Parámetros
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|------------|
| q | string | ✅ | Término de búsqueda |
| page | number | ❌ | Número de página (default: 1) |

#### Ejemplo
```bash
curl "http://localhost:3001/api/anime/search?q=naruto&page=1"
```

#### Respuesta
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "title": "Naruto",
        "url": "https://anime.example.com/naruto",
        "image": "https://example.com/naruto.jpg",
        "type": "TV",
        "status": "Completed"
      }
    ],
    "hasNextPage": true,
    "currentPage": 1
  }
}
```

---

### 2. Información del Anime

#### Endpoint
```
GET /anime/info?url=...
```

#### Parámetros
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|------------|
| url | string | ✅ | URL del anime (encoded) |

#### Ejemplo
```bash
curl "http://localhost:3001/api/anime/info?url=https%3A%2F%2Fanime.example.com%2Fnaruto"
```

#### Respuesta
```json
{
  "success": true,
  "data": {
    "title": "Naruto",
    "url": "https://anime.example.com/naruto",
    "image": "https://example.com/naruto.jpg",
    "synopsis": "Naruto is a ninja...",
    "genres": ["Action", "Adventure", "Shounen"],
    "year": 2002,
    "status": "Completed",
    "episodes": [
      {
        "number": 1,
        "title": "Enter: Naruto Uzumaki",
        "url": "https://anime.example.com/naruto/episode/1",
        "image": "https://example.com/ep1.jpg"
      }
    ],
    "rating": 8.5,
    "director": "Hayato Date",
    "studio": "Studio Pierrot"
  }
}
```

---

### 3. Fuentes de Episodio

#### Endpoint
```
GET /anime/episode?url=...
```

#### Parámetros
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|------------|
| url | string | ✅ | URL del episodio (encoded) |

#### Ejemplo
```bash
curl "http://localhost:3001/api/anime/episode?url=https%3A%2F%2Fanime.example.com%2Fnaruto%2Fepisode%2F1"
```

#### Respuesta
```json
{
  "success": true,
  "data": {
    "sources": [
      {
        "url": "https://example.com/stream.m3u8",
        "type": "hls",
        "quality": "1080p"
      },
      {
        "url": "https://example.com/stream_720p.m3u8",
        "type": "hls",
        "quality": "720p"
      }
    ],
    "subtitles": [
      {
        "url": "https://example.com/sub_es.vtt",
        "lang": "es",
        "format": "vtt"
      },
      {
        "url": "https://example.com/sub_en.vtt",
        "lang": "en",
        "format": "vtt"
      }
    ],
    "servers": ["server1", "server2"]
  }
}
```

---

### 4. Anime Popular

#### Endpoint
```
GET /anime/popular?page=1
```

#### Parámetros
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|------------|
| page | number | ❌ | Número de página (default: 1) |

#### Ejemplo
```bash
curl "http://localhost:3001/api/anime/popular?page=1"
```

#### Respuesta
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "title": "Attack on Titan",
        "url": "https://anime.example.com/aot",
        "image": "https://example.com/aot.jpg"
      }
    ],
    "hasNextPage": true,
    "currentPage": 1
  }
}
```

---

### 5. Anime Reciente

#### Endpoint
```
GET /anime/recent?page=1
```

#### Parámetros
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|------------|
| page | number | ❌ | Número de página (default: 1) |

#### Ejemplo
```bash
curl "http://localhost:3001/api/anime/recent?page=1"
```

#### Respuesta
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "title": "New Anime",
        "url": "https://anime.example.com/new",
        "image": "https://example.com/new.jpg"
      }
    ],
    "hasNextPage": true,
    "currentPage": 1
  }
}
```

---

## 🔒 Rate Limiting

- **Límite**: 100 requests por 15 minutos
- **Ventana**: 15 minutos (900,000 ms)
- **Reseteo**: Automático cada 15 minutos

### Headers de Rate Limiting
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

---

## ❌ Códigos de Error

| Código | Descripción |
|--------|------------|
| 400 | Bad Request - Parámetros inválidos |
| 404 | Not Found - Recurso no encontrado |
| 429 | Too Many Requests - Rate limit excedido |
| 500 | Internal Server Error - Error del servidor |

### Ejemplo Error
```json
{
  "success": false,
  "error": "Parámetro de búsqueda requerido"
}
```

---

## 🧪 Testing con cURL

### Búsqueda
```bash
curl -X GET "http://localhost:3001/api/anime/search?q=naruto&page=1" \
  -H "Content-Type: application/json"
```

### Información
```bash
curl -X GET "http://localhost:3001/api/anime/info?url=https%3A%2F%2Fanime.example.com%2Fnaruto" \
  -H "Content-Type: application/json"
```

### Episodio
```bash
curl -X GET "http://localhost:3001/api/anime/episode?url=https%3A%2F%2Fanime.example.com%2Fnaruto%2Fepisode%2F1" \
  -H "Content-Type: application/json"
```

---

## 📝 Notas Importantes

1. **URL Encoding**: Los parámetros `url` deben ser URL-encoded
2. **CORS**: El backend está configurado para aceptar requests desde `http://localhost:3000`
3. **Timeout**: Cada request tiene un timeout de 15 segundos
4. **Cache**: Los resultados se cachean en el cliente (localStorage)

---

## 🚀 Ejemplo Completo (JavaScript)

```javascript
// Búsqueda
const searchAnime = async (query) => {
  const response = await fetch(
    `/api/anime/search?q=${encodeURIComponent(query)}`
  );
  return response.json();
};

// Obtener info
const getAnimeInfo = async (url) => {
  const response = await fetch(
    `/api/anime/info?url=${encodeURIComponent(url)}`
  );
  return response.json();
};

// Obtener episodio
const getEpisode = async (url) => {
  const response = await fetch(
    `/api/anime/episode?url=${encodeURIComponent(url)}`
  );
  return response.json();
};

// Uso
const results = await searchAnime('naruto');
const info = await getAnimeInfo(results.data.results[0].url);
const episode = await getEpisode(info.data.episodes[0].url);
```

---

**Documentación actualizada al 2024** 📅
