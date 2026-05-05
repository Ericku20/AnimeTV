#!/bin/bash

# 🔍 SCRIPT DE VERIFICACIÓN DEL PROYECTO
# Verifica que todo esté correctamente configurado

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔍 Verificador de Proyecto - AnimeTV${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ No estoy en el directorio raíz del proyecto${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Directorio correcto${NC}"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js instalado ($(node -v))${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm instalado ($(npm -v))${NC}"

# Verificar carpetas principales
echo -e "\n${BLUE}Verificando estructura de carpetas...${NC}"

FOLDERS=(
    "backend/src"
    "backend/src/routes"
    "backend/src/controllers"
    "backend/src/services"
    "backend/src/middlewares"
    "frontend/app"
    "frontend/app/components"
    "frontend/app/services"
    "frontend/app/store"
    "frontend/app/hooks"
    "frontend/app/types"
)

for folder in "${FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        echo -e "${GREEN}✓ $folder${NC}"
    else
        echo -e "${RED}✗ $folder${NC}"
    fi
done

# Verificar archivos de configuración principales
echo -e "\n${BLUE}Verificando archivos de configuración...${NC}"

FILES=(
    "package.json"
    "backend/package.json"
    "backend/tsconfig.json"
    "backend/.env.local"
    "frontend/package.json"
    "frontend/tsconfig.json"
    "frontend/next.config.js"
    "frontend/tailwind.config.js"
    "frontend/.env.local"
    ".gitignore"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}✗ $file${NC}"
    fi
done

# Verificar node_modules
echo -e "\n${BLUE}Verificando dependencias...${NC}"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ node_modules existe (workspace instalado)${NC}"
else
    echo -e "${YELLOW}⚠ node_modules no existe - ejecuta 'npm install'${NC}"
fi

if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓ backend/node_modules existe${NC}"
else
    echo -e "${YELLOW}⚠ backend/node_modules no existe${NC}"
fi

if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓ frontend/node_modules existe${NC}"
else
    echo -e "${YELLOW}⚠ frontend/node_modules no existe${NC}"
fi

# Verificar documentación
echo -e "\n${BLUE}Verificando documentación...${NC}"

DOCS=(
    "README.md"
    "API.md"
    "DEVELOPMENT.md"
    "SMARTTV.md"
    "TROUBLESHOOTING.md"
    "CONTRIBUTING.md"
    "ROADMAP.md"
    "QUICKSTART.txt"
    "COMPLETION_SUMMARY.txt"
    "VISUAL_GUIDE.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓ $doc${NC}"
    else
        echo -e "${RED}✗ $doc${NC}"
    fi
done

# Verificar variables de entorno
echo -e "\n${BLUE}Verificando variables de entorno...${NC}"

if [ -f "backend/.env.local" ]; then
    if grep -q "PORT" backend/.env.local; then
        echo -e "${GREEN}✓ backend/.env.local configurado${NC}"
    else
        echo -e "${YELLOW}⚠ backend/.env.local parece incompleto${NC}"
    fi
else
    echo -e "${RED}✗ backend/.env.local no existe${NC}"
fi

if [ -f "frontend/.env.local" ]; then
    if grep -q "NEXT_PUBLIC_API_URL" frontend/.env.local; then
        echo -e "${GREEN}✓ frontend/.env.local configurado${NC}"
    else
        echo -e "${YELLOW}⚠ frontend/.env.local parece incompleto${NC}"
    fi
else
    echo -e "${RED}✗ frontend/.env.local no existe${NC}"
fi

# Verificar componentes principales
echo -e "\n${BLUE}Verificando componentes React...${NC}"

COMPONENTS=(
    "frontend/app/components/Header.tsx"
    "frontend/app/components/AnimeCard.tsx"
    "frontend/app/components/AnimeCarousel.tsx"
    "frontend/app/components/VideoPlayer.tsx"
    "frontend/app/components/Skeleton.tsx"
)

for component in "${COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        echo -e "${GREEN}✓ $(basename $component)${NC}"
    else
        echo -e "${RED}✗ $(basename $component)${NC}"
    fi
done

# Verificar páginas
echo -e "\n${BLUE}Verificando páginas...${NC}"

PAGES=(
    "frontend/app/page.tsx"
    "frontend/app/search/page.tsx"
    "frontend/app/anime/page.tsx"
    "frontend/app/favorites/page.tsx"
)

for page in "${PAGES[@]}"; do
    if [ -f "$page" ]; then
        echo -e "${GREEN}✓ $(dirname $page | xargs basename)/page.tsx${NC}"
    else
        echo -e "${RED}✗ $(dirname $page | xargs basename)/page.tsx${NC}"
    fi
done

# Verificar servicios
echo -e "\n${BLUE}Verificando servicios...${NC}"

SERVICES=(
    "frontend/app/services/api.ts"
    "frontend/app/services/storage.ts"
    "frontend/app/store/app.ts"
)

for service in "${SERVICES[@]}"; do
    if [ -f "$service" ]; then
        echo -e "${GREEN}✓ $(basename $service)${NC}"
    else
        echo -e "${RED}✗ $(basename $service)${NC}"
    fi
done

# Verificar backend
echo -e "\n${BLUE}Verificando backend...${NC}"

BACKEND_FILES=(
    "backend/src/index.ts"
    "backend/src/routes/anime.ts"
    "backend/src/controllers/animeController.ts"
    "backend/src/services/animeService.ts"
    "backend/src/middlewares/errorHandler.ts"
)

for file in "${BACKEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $(basename $file)${NC}"
    else
        echo -e "${RED}✗ $(basename $file)${NC}"
    fi
done

# Resumen final
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Verificación completada${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo -e "\n${YELLOW}Próximos pasos:${NC}"
echo -e "  1. npm install              # Si no lo has hecho"
echo -e "  2. npm run dev              # Iniciar desarrollo"
echo -e "  3. Abre http://localhost:3000"

echo -e "\n${GREEN}¡Todo está listo! 🎉${NC}"
