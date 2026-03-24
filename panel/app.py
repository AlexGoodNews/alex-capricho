from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)
FILE_JSON = "data/eventos.json"

if not os.path.exists(FILE_JSON):
    with open(FILE_JSON, "w") as f:
        json.dump([], f)

@app.route("/eventos", methods=["GET"])
def get_eventos():
    with open(FILE_JSON, "r") as f:
        eventos = json.load(f)
    return jsonify(eventos)

@app.route("/eventos", methods=["POST"])
def save_eventos():
    eventos = request.json
    with open(FILE_JSON, "w") as f:
        json.dump(eventos, f)
    return jsonify({"status": "ok"})

app.run(port=8888)