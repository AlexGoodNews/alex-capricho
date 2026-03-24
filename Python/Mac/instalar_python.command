#!/bin/bash
echo "Comprobando si Python 3 está instalado..."
if ! command -v python3 &> /dev/null
then
    echo "Python 3 no encontrado. Abre https://www.python.org/downloads/ e instalalo"
    echo "Presiona Enter cuando hayas terminado"
    read
else
    echo "Python 3 encontrado "
fi

echo "Actualizando pip e instalando requests..."
python3 -m ensurepip --upgrade
python3 -m pip install --upgrade pip
python3 -m pip install requests
echo "Listo! Ahora puedes usar iniciar_panelDigital.command"
read -p "Presiona Enter para salir"