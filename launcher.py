import socket
import subprocess
import webbrowser
import time
import requests
import sys
import os

# -------------------------
# Función para obtener IP local
# -------------------------
def obtener_ip_local():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

# -------------------------
# Arrancar Flask en background, terminal oculta
#                                     ,stdout=subprocess.DEVNULL,
#                                    stderr=subprocess.DEVNULL)
# -------------------------
if sys.platform == 'win32':  # Windows
    # SW_HIDE oculta la ventana de la terminal
    si = subprocess.STARTUPINFO()
    si.dwFlags |= subprocess.STARTF_USESHOWWINDOW
    flask_proceso = subprocess.Popen(['python', 'app.py'], startupinfo=si)
else:  # Mac/Linux
    # En Mac, redirigimos stdout/stderr para no mostrar terminal
    flask_proceso = subprocess.Popen(['python3', 'app.py'])


# -------------------------
# Obtener IP local
# -------------------------
ip = obtener_ip_local()
print(f"IP local detectada: {ip}")

# -------------------------
# Esperar a que Flask esté listo
# -------------------------
url = f'http://{ip}:8888'
print("Esperando a que Flask arranque...")

for _ in range(40):  # hasta 40 segundos
    try:
        requests.get(url, timeout=1)
        print("Servidor Flask listo ")
        break
    except:
        time.sleep(1)
else:
    print("Error: Flask no arrancó a tiempo.")
    flask_proceso.terminate()
    exit(1)

# -------------------------
# Abrir navegador en una ventana con dos pestañas
# -------------------------
# Esto abre una nueva ventana de Chrome/Edge/Firefox con dos URLs
chrome_path = None
if sys.platform == 'win32':
    # Buscar Chrome en Windows
    chrome_path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s'
elif sys.platform == 'darwin':
    # Chrome en Mac
    chrome_path = 'open -na "Google Chrome" --args %s'
    
urls = [f'http://{ip}:8888/panel/calendar.html',
        f'http://{ip}:8888/panel/index.html']

if chrome_path:
    for url in urls:
        webbrowser.open_new_tab(url)

