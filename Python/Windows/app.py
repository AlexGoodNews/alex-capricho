# old
#    from flask import Flask, request, jsonify, send_from_directory
#    import json
#
#    app = Flask(__name__)
#
#    # rutas
#    RUTA_PANEL = 'panel'
#    RUTA_DATA = 'data/eventos.json'
#
#    #  servir panel (html, js, css, etc)
#    @app.route('/panel/<path:filename>')
#    def servir_panel(filename):
#        return send_from_directory(RUTA_PANEL, filename)
#
#    #  abrir directamente el calendario
#    @app.route('/')
#    def index():
#        return send_from_directory(RUTA_PANEL, 'calendar.html')
#
#    # API GET
#    @app.route('/api/eventos', methods=['GET'])
#    def get_eventos():
#        with open(RUTA_DATA, 'r') as f:
#            return jsonify(json.load(f))
#
#    # API POST
#    @app.route('/api/eventos', methods=['POST'])
#    def guardar_eventos():
#        data = request.json
#        with open(RUTA_DATA, 'w') as f:
#            json.dump(data, f, indent=2)
#        return jsonify({"status": "ok"})
#
#    if __name__ == '__main__':
#        app.run(host='0.0.0.0', port=8888)

import socket
import webbrowser
import time
import threading
import os
import json
from flask import Flask, request, jsonify, send_from_directory

# -------------------------
# CONFIG
# -------------------------
PUERTO = 8888
RUTA_DATA = 'data/eventos.json'

app = Flask(__name__)

# -------------------------
# IP LOCAL
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
# RUTA PRINCIPAL
# -------------------------
@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

# -------------------------
# SERVIR CUALQUIER ARCHIVO / CARPETA
# -------------------------
@app.route('/<path:path>')
def servir_archivos(path):
    return send_from_directory('.', path)

# -------------------------
# PANEL (lo mantenemos claro)
# -------------------------
@app.route('/panel/')
def panel_home():
    return send_from_directory('panel', 'calendar.html')

# -------------------------
# API EVENTOS
# -------------------------
@app.route('/api/eventos', methods=['GET'])
def get_eventos():
    if not os.path.exists(RUTA_DATA):
        return jsonify([])
    with open(RUTA_DATA, 'r') as f:
        return jsonify(json.load(f))

@app.route('/api/eventos', methods=['POST'])
def guardar_eventos():
    data = request.json
    os.makedirs(os.path.dirname(RUTA_DATA), exist_ok=True)
    with open(RUTA_DATA, 'w') as f:
        json.dump(data, f, indent=2)
    return jsonify({"status": "ok"})

# -------------------------
# AUTO ABRIR NAVEGADOR
# -------------------------
def abrir_navegador(ip):
    time.sleep(2)

    # Página principal
    webbrowser.open(f'http://{ip}:{PUERTO}')

    # Panel calendario
    webbrowser.open(f'http://{ip}:{PUERTO}/panel/calendar.html')

    # Panel digital (la que te falta)
    webbrowser.open(f'http://{ip}:{PUERTO}/panel/index.html')
# -------------------------
# MAIN
# -------------------------
if __name__ == '__main__':
    ip = obtener_ip_local()

    print("\n==============================")
    print(" SERVIDOR MUSEO INICIADO")
    print("==============================")
    print(f"Local: http://127.0.0.1:{PUERTO}")
    print(f"Red:   http://{ip}:{PUERTO}")
    print("==============================\n")

    threading.Thread(target=abrir_navegador, args=(ip,)).start()

    app.run(host='0.0.0.0', port=PUERTO)