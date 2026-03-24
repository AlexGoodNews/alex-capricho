from flask import Flask, request, jsonify, send_from_directory
import json

app = Flask(__name__)

# rutas
RUTA_PANEL = 'panel'
RUTA_DATA = 'data/eventos.json'

#  servir panel (html, js, css, etc)
@app.route('/panel/<path:filename>')
def servir_panel(filename):
    return send_from_directory(RUTA_PANEL, filename)

#  abrir directamente el calendario
@app.route('/')
def index():
    return send_from_directory(RUTA_PANEL, 'calendar.html')

# API GET
@app.route('/api/eventos', methods=['GET'])
def get_eventos():
    with open(RUTA_DATA, 'r') as f:
        return jsonify(json.load(f))

# API POST
@app.route('/api/eventos', methods=['POST'])
def guardar_eventos():
    data = request.json
    with open(RUTA_DATA, 'w') as f:
        json.dump(data, f, indent=2)
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888)