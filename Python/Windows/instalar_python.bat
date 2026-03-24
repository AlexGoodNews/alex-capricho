@echo off
echo Comprobando si Python 3 está instalado...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python 3 no encontrado. Abriendo instalador...
    REM Asume que el instalador está en la misma carpeta
    start "" python-3-installer.exe
    pause
    echo Una vez instalado Python, vuelve a ejecutar este script.
    exit /b
) else (
    echo Python 3 encontrado ✅
)

echo Instalando libreria requests...
python -m pip install --upgrade pip
python -m pip install requests
echo Listo! Ahora puedes usar iniciar_panelDigital.bat
pause