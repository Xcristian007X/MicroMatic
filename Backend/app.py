from flask import Flask, request, jsonify
from flask_pymongo import MongoClient
from flask_cors import CORS
import os

MONGODB_URI = os.environ.get("MONGODB_URI")
app = Flask(__name__)
myclient = MongoClient(MONGODB_URI)
mydb  = myclient["servicio"]
mycol = mydb["microbuses"]
myrut = mydb['rutas']
mypar = mydb['paraderos']

@app.route('/geo',methods=['POST'])
def sendBus():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        id = mycol.insert_one({
            'linea': request.json['linea'],
            'patente': request.json['patente'],
            'coordenadas': request.json['coordenadas']
        })
        return 'success'
    else:
        return 'Content-Type not supported!'

@app.route('/micro',methods=['GET'])
def getBus():
    output=[]
    patente = mycol.distinct("patente")
    for patentes in patente:
        microbuses =  mycol.find({"patente": patentes})
        for micro in (list(reversed(list(microbuses)))[0:1]):
            output.append({'linea': micro['linea'],'patente': micro['patente'], 'coordenadas': micro['coordenadas']})
    return jsonify(output)

@app.route('/micro/<linea>',methods=['GET'])
def getBusLinea(linea):
    
    patente = mycol.distinct( "patente", { "linea": linea } )
    output = []
    for patentes in patente:
        microbuses =  mycol.find({"patente": patentes})
        for micro in (list(reversed(list(microbuses)))[0:1]):
            coor = micro['coordenadas'][0]
            output.append(coor)
    return jsonify(output)

@app.route('/rutas',methods=['POST'])
def sendRutas():
    id = myrut.insert_one({
        'rutalinea': request.json['rutalinea'],
        'coordenadas': request.json['coordenadas'],
        'recorrido': request.json['recorrido']
    })
    return 'success'

@app.route('/rutas',methods=['GET'])
def getRutas():
    rutas = myrut.find()
    output = []
    for ruta in rutas:
        output.append({'features': ruta['features']})
    return jsonify(output)

@app.route('/rutas/<rutalinea>',methods=['GET'])
def getRutasLinea(rutalinea):
    rutas = myrut.find({"features.properties.nameid": rutalinea})
    output = []
    for ruta in rutas:
        output.append({'features': ruta['features']})
    return jsonify(output)

@app.route('/clean',methods=['DELETE'])
def deleteRutas():
    mycol.delete_many({})
       
    return 'success'

CORS(app,resources={r"/*":{"origins":"*"}})
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

