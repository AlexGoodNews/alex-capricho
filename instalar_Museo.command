#!/bin/bash

cd "$(dirname "$0")"

echo "Creando entorno virtual..."

python3 -m venv venv

source venv/bin/activate

pip install --upgrade pip
pip install flask requests

echo ""
echo "Instalación completada"

read -p "Pulsa ENTER para cerrar..."
