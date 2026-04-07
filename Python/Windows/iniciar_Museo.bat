@echo off
cd /d %~dp0

echo ==============================
echo   INICIANDO SERVIDOR MUSEO
echo ==============================

start "" pythonw app.py
exit