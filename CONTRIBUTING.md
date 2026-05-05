# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a AnimeTV! Este documento explica cómo hacerlo.

## 📋 Índice

- [Código de Conducta](#código-de-conducta)
- [Cómo Empezar](#cómo-empezar)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)
- [Pull Requests](#pull-requests)
- [Guías de Estilo](#guías-de-estilo)

---

## 📘 Código de Conducta

Este proyecto y todos los participantes están regidos por nuestro Código de Conducta. Al participar, se espera que mantengas este código. Por favor reporta comportamiento inaceptable.

### Nuestro Compromiso

- Ser respetuoso e inclusivo
- Aceptar crítica constructiva
- Enfocarse en lo mejor para la comunidad
- Mostrar empatía hacia otros

---

## 🚀 Cómo Empezar

### 1. Fork el Repositorio
```bash
# En GitHub, haz click en "Fork"
```

### 2. Clona tu Fork
```bash
git clone https://github.com/tu-usuario/AnimeTV.git
cd AnimeTV
```

### 3. Crea una Rama
```bash
git checkout -b feature/tu-feature
# o
git checkout -b fix/tu-fix
```

### 4. Instala Dependencias
```bash
npm install
```

### 5. Realiza tus Cambios
```bash
# Haz cambios en los archivos
npm run dev  # Prueba en desarrollo
```

### 6. Commit y Push
```bash
git add .
git commit -m "feat: descripción clara"
git push origin feature/tu-feature
```

### 7. Crea un Pull Request
En GitHub, ve a tu fork y crea un PR a la rama `main`

---

## 🐛 Reportar Bugs

### Antes de Reportar
- Revisa los issues existentes para no duplicar
- Intenta reproducir el bug en la rama `main`
- Revisa la sección Troubleshooting

### Cómo Reportar

Abre un issue con el siguiente formato:

```markdown
## 🐛 Descripción del Bug

Descripción clara de qué está mal.

## 📋 Pasos para Reproducir

1. Voy a...
2. Presiono...
3. Veo...

## ❌ Comportamiento Esperado

Qué debería pasar.

## ✅ Comportamiento Actual

Qué pasa realmente.

## 📸 Capturas de Pantalla

Si aplica, adjunta capturas.

## 📱 Información del Sistema

- OS: [ej: Ubuntu 22.04]
- Navegador: [ej: Chrome 120]
- Node.js: [ej: 18.0.0]
- npm: [ej: 9.0.0]

## 📝 Logs Adicionales

Copia los logs de consola si hay errores.
```

---

## 💡 Sugerir Mejoras

### Antes de Sugerir
- Revisa si ya existe una sugerencia similar
- Describe el caso de uso claramente

### Cómo Sugerir

Abre un issue con el siguiente formato:

```markdown
## 💡 Descripción de la Mejora

Descripción clara de la mejora.

## 📍 Contexto

¿Dónde se implementaría?

## 🎯 Propósito

¿Qué problema resuelve?

## 💭 Alternativas Consideradas

Otros enfoques posibles.

## 📚 Contexto Adicional

Información relevante.
```

---

## 🔄 Pull Requests

### Checklist Antes de PR

- [ ] Creé una rama para mi feature/fix
- [ ] Mi código sigue las guías de estilo
- [ ] Ejecuté tests (si existen)
- [ ] Actualicé la documentación
- [ ] No hay cambios innecesarios
- [ ] Mi commit message es claro

### Template para PR

```markdown
## 📝 Descripción

Descripción breve de los cambios.

## 🎯 Tipo de Cambio

- [ ] Bug fix (cambio no-breaking que soluciona un issue)
- [ ] Feature (cambio no-breaking que agrega funcionalidad)
- [ ] Breaking change (cambio que causa incompatibilidad)
- [ ] Documentación

## 🔗 Issues Relacionados

Cierra #(número del issue)

## ✅ Checklist

- [ ] Mi código sigue las guías de estilo del proyecto
- [ ] He hecho self-review de mi código
- [ ] He comentado código complejo
- [ ] He actualizado documentación correspondiente
- [ ] No tengo cambios sin documentar

## 📸 Capturas de Pantalla (si aplica)

Adjunta capturas de cambios visuales.

## 🧪 Testing

Describe cómo probaste los cambios.
```

---

## 📖 Guías de Estilo

### Git Commits

Usa formato Conventional Commits:

```
type(scope): message

feat(search): agregar filtro por género
fix(player): corregir issue de audio
docs(readme): actualizar instrucciones
style(components): mejorar estilos CSS
refactor(api): reorganizar servicios
test(hooks): agregar tests para useFetch
chore(deps): actualizar dependencias
```

**Tipos**:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de estilos (no lógica)
- `refactor`: Reorganización de código
- `test`: Agregar o actualizar tests
- `chore`: Cambios en configuración

### TypeScript

```typescript
// Usar interfaces para tipos complejos
interface Anime {
  title: string;
  url: string;
  image?: string; // Opcional
}

// Siempre tipar retornos
function searchAnime(query: string): Promise<Anime[]> {
  // ...
}

// Evitar 'any'
const data: unknown = {};
if (typeof data === 'object' && data !== null) {
  // Use object
}
```

### React Components

```typescript
// Usar componentes funcionales
export default function MyComponent({ prop }: MyComponentProps) {
  return <div>{prop}</div>;
}

// Separar en archivos
// MyComponent.tsx - componente
// myComponent.utils.ts - utilidades
// myComponent.types.ts - tipos

// Nombrar hooks
function useCustomHook() {
  // ...
}
```

### CSS/TailwindCSS

```typescript
// Preferir Tailwind
className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg"

// No duplicar estilos
// ❌ MAL
className={`
  flex items-center 
  flex items items-center
`}

// ✅ BIEN
className="flex items-center gap-4"
```

### Documentación

- Mantén README.md actualizado
- Documenta APIs públicas
- Usa JSDoc para funciones complejas
- Escribe en español o inglés (consistente)

---

## 🧪 Testing

### Antes de PR

```bash
# Lint
npm run lint

# Type check
npm run type-check

# Build
npm run build
```

### Escribir Tests

```typescript
// __tests__/example.test.ts
describe('My Function', () => {
  it('should return expected value', () => {
    expect(myFunction()).toBe(expectedValue);
  });
});
```

---

## 📚 Recursos Útiles

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ❓ Preguntas

Si tienes preguntas:
1. Revisa la documentación (README.md, DEVELOPMENT.md)
2. Abre una discussion en GitHub
3. Contacta a los mantainers

---

## 🙏 Gracias

¡Gracias por tu tiempo y esfuerzo contribuyendo a AnimeTV!

Tu ayuda hace que este proyecto sea mejor para todos.

---

**¡Bienvenido a la comunidad!** 🎉
