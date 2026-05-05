#!/bin/bash

# 🚀 Script de instalación y setup para AnimeTV
# Este script automatiza la instalación de dependencias y configuración inicial

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir
print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Verificar requisitos
print_header "Verificando requisitos..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    echo "Descargalo desde: https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node -v)
print_success "Node.js $NODE_VERSION instalado"

# Verificar npm
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi
NPM_VERSION=$(npm -v)
print_success "npm $NPM_VERSION instalado"

# Cambiar al directorio del proyecto
print_header "Configurando directorio..."
if [ ! -f "package.json" ]; then
    print_error "No estoy en el directorio correcto (AnimeTV)"
    echo "Por favor ejecuta este script desde el root del proyecto"
    exit 1
fi
print_success "Directorio correcto: $(pwd)"

# Instalar dependencias del workspace
print_header "Instalando dependencias..."
print_warning "Esto puede tomar varios minutos..."

npm install

print_success "Dependencias instaladas"

# Crear archivos .env.local si no existen
print_header "Configurando variables de entorno..."

if [ ! -f "backend/.env.local" ]; then
    cp backend/.env.example backend/.env.local
    print_success "Archivo .env.local creado en backend"
else
    print_warning "backend/.env.local ya existe"
fi

if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.example frontend/.env.local
    print_success "Archivo .env.local creado en frontend"
else
    print_warning "frontend/.env.local ya existe"
fi

# Resumen
print_header "Instalación completada"

echo -e "${GREEN}
✓ AnimeTV está listo para usar

${YELLOW}Próximos pasos:${NC}

1. ${BLUE}Inicia la aplicación:${NC}
   npm run dev

2. ${BLUE}Abre en tu navegador:${NC}
   Frontend:  http://localhost:3000
   Backend:   http://localhost:3001

3. ${BLUE}Documentación:${NC}
   - README.md          → Descripción general
   - DEVELOPMENT.md     → Guía de desarrollo
   - API.md            → Documentación de API
   - SMARTTV.md        → Guía de navegación Smart TV

${YELLOW}Comandos útiles:${NC}
  npm run dev           → Iniciar desarrollo
  npm run build         → Compilar para producción
  npm run lint          → Ejecutar linter
  npm run type-check    → Verificar tipos TypeScript

${GREEN}¡Happy coding! 🚀${NC}
"

print_header "Setup completado"
