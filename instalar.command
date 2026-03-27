#!/bin/bash

echo "🔍 Comprobando Python3..."

# -------------------------
# Comprobar Python3
# -------------------------
if ! command -v python3 &> /dev/null
then
    echo "❌ Python3 no está instalado."
    echo "Instálalo desde https://www.python.org/downloads/"
    exit 1
fi

echo "✅ Python3 encontrado"

# -------------------------
# Comprobar pip
# -------------------------
echo "🔍 Comprobando pip..."

if ! python3 -m pip --version &> /dev/null
then
    echo "📦 Instalando pip..."
    python3 -m ensurepip --upgrade
fi

echo "✅ pip listo"

# -------------------------
# Actualizar pip
# -------------------------
echo "⬆️ Actualizando pip..."
python3 -m pip install --upgrade pip

# -------------------------
# Instalar dependencias
# -------------------------
echo "📦 Instalando dependencias..."

python3 -m pip install flask requests

echo "✅ Todo instalado correctamente"

echo ""
echo "👉 Ahora puedes ejecutar tu launcher.py"
read -p "Pulsa ENTER para cerrar..."