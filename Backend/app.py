from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import threading
import requests
import json
import time
import os

# ==============================
# 🔹 Configuración Flask + Mongo
# ==============================
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client["servicio"]
col_micro = db["microbuses"]
col_rutas = db["rutas"]
col_paraderos = db["paraderos"]

# ==============================
# 🔹 Rutas API
# ==============================
@app.route('/geo', methods=['POST'])
def sendBus():
    if request.headers.get('Content-Type') == 'application/json':
        data = request.json
        col_micro.insert_one({
            'linea': data['linea'],
            'patente': data['patente'],
            'coordenadas': data['coordenadas']
        })
        return 'success', 200
    return 'Content-Type not supported!', 400


@app.route('/micro', methods=['GET'])
def getBus():
    output = []
    patentes = col_micro.distinct("patente")
    for pat in patentes:
        microbuses = list(col_micro.find({"patente": pat}))
        if microbuses:
            last = microbuses[-1]
            output.append({
                'linea': last['linea'],
                'patente': last['patente'],
                'coordenadas': last['coordenadas']
            })
    return jsonify(output)


@app.route('/micro/<linea>', methods=['GET'])
def getBusLinea(linea):
    patentes = col_micro.distinct("patente", {"linea": linea})
    output = []
    for pat in patentes:
        microbuses = list(col_micro.find({"patente": pat}))
        if microbuses:
            coor = microbuses[-1]['coordenadas'][0]
            output.append(coor)
    return jsonify(output)


@app.route('/rutas', methods=['POST'])
def sendRutas():
    data = request.json
    col_rutas.insert_one({
        'rutalinea': data['rutalinea'],
        'coordenadas': data['coordenadas'],
        'recorrido': data['recorrido']
    })
    return 'success', 200


@app.route('/rutas', methods=['GET'])
def getRutas():
    rutas = list(col_rutas.find())
    output = [{'features': r['features']} for r in rutas if 'features' in r]
    return jsonify(output)


@app.route('/rutas/<rutalinea>', methods=['GET'])
def getRutasLinea(rutalinea):
    rutas = list(col_rutas.find({"features.properties.nameid": rutalinea}))
    output = [{'features': r['features']} for r in rutas if 'features' in r]
    return jsonify(output)


@app.route('/clean', methods=['DELETE'])
def deleteRutas():
    col_micro.delete_many({})
    return 'success', 200

# =======================================================
# 🔹 Bloque Simulador (solo si SIMULATOR=1 en variables)
# =======================================================
def start_simulador():
    from coordenadas import geo1Aida, geo1Aregreso, geo2Aida, geo2Aregreso

    url = os.getenv("API_URL", "http://127.0.0.1:5000/geo")
    headers = {'Content-type': 'application/json'}

    def crear_bus(linea, patente, coords_fn):
        for x in coords_fn():
            coords = {
                "linea": linea,
                "patente": patente,
                "coordenadas": [x]
            }
            try:
                requests.post(url, headers=headers, data=json.dumps(coords))
            except Exception as e:
                print(f"Error enviando coordenadas de {patente}: {e}")
            time.sleep(5)

    buses = [
        threading.Thread(target=crear_bus, args=("1A", "SDXS23", geo1Aida)),
        threading.Thread(target=crear_bus, args=("1A", "JDFW21", geo1Aida)),
        threading.Thread(target=crear_bus, args=("1A", "YVGW12", geo1Aregreso)),
        threading.Thread(target=crear_bus, args=("1A", "ZZAS23", geo1Aregreso)),
        threading.Thread(target=crear_bus, args=("2A", "WXCF33", geo2Aida)),
        threading.Thread(target=crear_bus, args=("2A", "YJDA43", geo2Aida)),
        threading.Thread(target=crear_bus, args=("2A", "HTHJ42", geo2Aregreso)),
        threading.Thread(target=crear_bus, args=("2A", "XDSD12", geo2Aregreso))
    ]

    for i, hilo in enumerate(buses):
        hilo.daemon = True
        hilo.start()
        if i in [0, 2, 4, 6]:
            time.sleep(30)

# =======================================================
# 🔹 Ejecutar app y simulador (opcional)
# =======================================================
if __name__ == "__main__":
    if os.getenv("SIMULATOR", "0") == "1":
        print("🚌 Iniciando simulador en segundo plano...")
        threading.Thread(target=start_simulador, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)
